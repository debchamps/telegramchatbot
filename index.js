const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const firebase = require('firebase');
const manager = require('./manager.js');

const token = '996089588:AAFhR4B5U06tvuzrfA-OC3MLNhVFPT6Uqws';
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {

  manager.processMessage(msg, function(response)  {
    bot.sendMessage(msg.chat.id, response);
  });

});
