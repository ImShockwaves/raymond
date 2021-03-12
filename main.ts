import dotenv from 'dotenv';
dotenv.config();
import _config from './config.json';
import Discord from 'discord.js';
import { Utils } from './classes/utils/utils';
const _utils = new Utils;
import { Parser } from './classes/parser';
import { Villagers_name } from './models/villagers';
const _parser = new Parser();
import fs from "fs";
import { exec, execSync } from 'child_process';


declare global {
  namespace NodeJS {
    interface Global {
      villagers: Villagers_name[];
      message: Discord.Message;
      lang: string;
    }
  }
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

if (!fs.existsSync('./data')) {
  execSync('git clone https://github.com/alexislours/ACNHAPI.git data');
}

console.log('_____________________________________________________'); 
console.log('88""Yb    db    Yb  dP 8b    d8  dP"Yb  88b 88 8888b.'); 
console.log("88__dP   dPYb    YbdP  88b  d88 dP   Yb 88Yb88 8I  Yb"); 
console.log('88"Yb   dP__Yb    8P   88YbdP88 Yb   dP 88 Y88 8I  dY'); 
console.log('88  Yb dP""""Yb  dP    88 YY 88  YbodP  88  Y8 8888Y"');
console.log('_____________________________________________________'); 

const client = new Discord.Client();

client.once('ready', async () => {
	console.log('Discord ready !');
});

client.login(process.env.TOKEN);

client.on('message', async message => {
  // console.log('MESSAGE', message);
	if (message.content[0] && message.content[0] === _config.PREFIX) {
    global.message = message;
    await _parser.commandParser();
  }
});
