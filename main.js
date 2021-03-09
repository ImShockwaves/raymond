const _express = require('express');
const _cors = require('cors');

const _routes = _express();
const httpServer = require('http').Server(_routes);

const dotenv = require('dotenv');
dotenv.config();

_routes.use(_cors());

_routes.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(err.status).send("Token error");
      return;
  }
  next();
});

    // _routes.use('/student/account', require('@routes/student/account.student.routes'));
    httpServer.listen(3000);

    console.log('88""Yb    db    Yb  dP 8b    d8  dP"Yb  88b 88 8888b. '); 
    console.log("88__dP   dPYb    YbdP  88b  d88 dP   Yb 88Yb88  8I  Yb"); 
    console.log('88"Yb   dP__Yb    8P   88YbdP88 Yb   dP 88 Y88  8I  dY'); 
    console.log('88  Yb dP""""Yb  dP    88 YY 88  YbodP  88  Y8 8888Y" '); 

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Discord ready !');
});

client.login(process.env.TOKEN);

client.on('message', message => {
  console.log('MESSAGE');
	if (message.content[0] && message.content[0] === process.env.PREFIX) {
    console.log('You use the right prefix !');
  }
});
