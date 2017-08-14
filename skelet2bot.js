const botgram = require("botgram");
const { json } = require('req');
const bot = botgram(process.argv[2]);
const rants = require('./rants.json');
const feature = "This feature is either under construction or i'm too retarded to implement it"

bot.text(function (msg, reply, next) {
    const text = msg.text.toLowerCase();
    if (text.includes("linux") && !text.includes("gnu"))
		    reply.reply(msg).text(rants.linux[Math.floor(Math.random()*rants.linux.length)]);
    if (text.includes("raphy") && !text.includes("faggot"))
		    reply.reply(msg).text(rants.raphy[Math.floor(Math.random()*rants.raphy.length)]);
});

bot.command("start", function (msg, reply, next) {
    reply.text("fuck off");
});

bot.command("price", function (msg, reply, next) {
    const coin = msg.args(2)
    json('https://api.coinmarketcap.com/v1/ticker/')
        .then(data =>
              data.forEach(obj =>
                           reply.text(obj.name.filter(includes(coin)) +
                                      ': ' + obj.price_usd)));
});

bot.command("weather", function (msg, reply, next) {
    reply.text(feature);
});
