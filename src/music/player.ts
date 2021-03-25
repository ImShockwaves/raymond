import Discord from 'discord.js';
import musics from '../../data/v1a/music.json';
import hourlies from '../../data/v1a/hourly.json';

export class Player {

  async execute(message: Discord.Message, serverQueue: any) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member!.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user!);
    if (!permissions!.has("CONNECT") || !permissions!.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    args.shift();
    const musicToFound = args.join(" ");
    console.log("MUSIC TO PLAY", musicToFound);
    
    const findByName: any = musics.find(music => {
            
      for (const [key, value] of Object.entries(music.name)) {
          
          if (musicToFound.toLocaleLowerCase() === value.toLowerCase()) return music;       
      }
      for (const hourly of hourlies) {
        if (musicToFound.toLocaleLowerCase() === hourly['file-name'].toLowerCase()) return hourly;    
      }
    });

    const song = findByName.music_uri;
  
    if (!serverQueue) {
      const queueContruct: any = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      global.queue.set(message.guild!.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        this.play(message.guild!, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        global.queue.delete(message.guild!.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }
  
  skip(message: Discord.Message, serverQueue: any) {
    if (!message.member!.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  stop(message: Discord.Message, serverQueue: any) {
    if (!message.member!.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
      
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  play(guild: Discord.Guild, song: any) {
    const serverQueue = global.queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      global.queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(song)
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(guild, serverQueue.songs[0]);
      })
      .on("error", (error: any) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
}
