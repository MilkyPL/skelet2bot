var botgram = require("botgram");
var bot = botgram(process.argv[2]);
const rants = require('./rants.json');

bot.text(function (msg, reply, next) {
	var text = msg.text.toLowerCase();
	if (text.includes("linux") && !text.includes("gnu"))
		reply.reply(msg).text(rants.linux[Math.floor(Math.random()*rants.linux.length)]);
	if (text.includes("raphy") && !text.includes("faggot"))
		reply.reply(msg).text(rants.raphy[Math.floor(Math.random()*rants.raphy.length)]);
});

bot.command("start", function (msg, reply, next) {
	reply.text("fuck off");
});

bot.command("price", function (msg, reply, next) {
	reply.text(feature);
});

bot.command("weather", function (msg, reply, next) {
	reply.text(feature);
});
