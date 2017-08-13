var botgram = require("botgram");
var bot = botgram(process.argv[2]);
var bittrex = require('node.bittrex.api');
bittrex.options({ //this key can only view info so fuck off
	'apikey' : "b5704d05ee1b4e1e83ec5a835e4ff1a5",
	'apisecret' : "4fef149067494c3fa808d1074777af8d",
});

var feature = "This feature is either under construction or I'm too retarded to implement it";
/*var rant = "When you say Linux, you probably mean the GNU operating " +
"system, running Linux as the kernel. You should therefore say " +
"GNU/Linux or GNU+Linux.";
var fag = "When you say Raphy, you probably mean the faggot " +
", running Raphy as the kernel. You should therefore say " +
"faggot/Raphy or faggot+Raphy.";
var fag1 = "HAHA yeah what a FAG";*/

bot.text(function (msg, reply, next) {
	var text = msg.text.toLowerCase();
	if (text.includes("linux") && !text.includes("gnu"))
		reply.reply(msg).text(feature);
	if (text.includes("raphy") && !text.includes("faggot"))
		reply.reply(msg).text(feature);
});

bot.command("start", function (msg, reply, next) {
	reply.text(feature);
});

bot.command("price", function (msg, reply, next) {
	reply.text(feature);
});

bot.command("weather", function (msg, reply, next) {
	reply.text(feature);
});
