var botgram = require("botgram");
var bot = botgram(process.argv[2]);

var feature = "This feature is either under construction or I'm too retarded to implement it";
var rant = "When you say Linux, you probably mean the GNU operating " +
"system, running Linux as the kernel. You should therefore say " +
"GNU/Linux or GNU+Linux.";
var fag = "When you say Raphy, you probably mean the faggot " +
", running Raphy as the kernel. You should therefore say " +
"faggot/Raphy or faggot+Raphy.";
var fag1 = "HAHA yeah what a FAG";

bot.text(function (msg, reply, next) {
	var text = msg.text.toLowerCase();
	if (text.includes("linux") && !text.includes("gnu"))
		reply.reply(msg).text(rant);
	if (text.includes("raphy") && !text.includes("faggot"))
		reply.reply(msg).text(fag);
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
