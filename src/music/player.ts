import Discord from 'discord.js';
import musics from '../../data/v1a/music.json';
import hourlies from '../../data/v1a/hourly.json';
import { Sender } from '../sender';

const _sender = new Sender;

export class Player {

  async execute(message: Discord.Message, serverQueue: any) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member!.voice.channel;
    if (!voiceChannel) {
      _sender.send("You need to be in a voice channel to play music!");
      return;
    }
    const permissions = voiceChannel.permissionsFor(message.client.user!);
    if (!permissions!.has("CONNECT") || !permissions!.has("SPEAK")) {
      _sender.send("I need the permissions to join and speak in your voice channel!");
      return;
    }

    args.shift();
    const musicToFound = args.join(" ");
    console.log("MUSIC TO PLAY", musicToFound);
    
    let findByName: any, name: string;

    if (args[0] === 'hourly') {
      let hour: number, weather: string;
      if (/^\d+$/.test(args[1])) {
        hour = parseInt(args[1]);
        weather = args[2].capitalize();
      } else {
        hour = parseInt(args[2]);
        weather = args[1].capitalize();
      }
      
      name = `hourly ${hour} ${weather}`;
      findByName = hourlies.find(hourly => hourly.hour === hour && hourly.weather === weather);
    } else {
      name = musicToFound;
      findByName = musics.find(music => {
              
        for (const [key, value] of Object.entries(music.name)) {
            
            if (musicToFound.toLocaleLowerCase() === value.toLowerCase()) return music;       
        }
        for (const hourly of hourlies) {
          if (musicToFound.toLocaleLowerCase() === hourly['file-name'].toLowerCase()) return hourly;    
        }
      });
    }

    const song = findByName.music_uri;
  
    console.log(`Found song ${name}`);
    

    if (!serverQueue) {
      const queueContruct: any = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        names: [],
        songs: [],
        volume: 5,
        playing: true
      };
  
      global.queue.set(message.guild!.id, queueContruct);
  
      queueContruct.songs.push(song);
      queueContruct.names.push(name);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        this.play(message.guild!, queueContruct.songs[0], queueContruct.names[0]);
      } catch (err) {
        console.log(err);
        global.queue.delete(message.guild!.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      serverQueue.names.push(name);
      console.log(`**${name}** has been added to the queue!`);
      _sender.send(`**${name}** has been added to the queue!`);
      return;
    }
  }
  
  skip(message: Discord.Message, serverQueue: any) {
    if (!message.member!.voice.channel) {
      _sender.send("You have to be in a voice channel to stop the music!");
      return;
    }
    if (!serverQueue) {
      _sender.send("There is no song that I could skip!");
      return;
    }
    serverQueue.connection.dispatcher.end();
  }
  
  stop(message: Discord.Message, serverQueue: any) {
    if (!message.member!.voice.channel) {
      _sender.send("You have to be in a voice channel to stop the music!");
      return;
    }
    if (!serverQueue) {
      _sender.send("There is no song that I could stop!");
      return;
    }
      
    serverQueue.songs = [];
    serverQueue.names = [];
    serverQueue.connection.dispatcher.end();
  }
  
  play(guild: Discord.Guild, song: string, name: string) {
    const serverQueue = global.queue.get(guild.id);
  
    const dispatcher = serverQueue.connection
      .play(song)
      .on("finish", () => {
        serverQueue.songs.shift();
        serverQueue.names.shift();
        this.play(guild, serverQueue.songs[0], serverQueue.names[0]);
      })
      .on("error", (error: any) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${name}**`);
  }

  leave(message: Discord.Message, serverQueue: any) {
    serverQueue.songs = [];
    serverQueue.names = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.voiceChannel.leave();
    global.queue.delete(message.guild!.id);
    return;
  }
}
