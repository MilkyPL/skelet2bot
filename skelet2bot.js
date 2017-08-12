var botgram = require("botgram");
var bot = botgram(process.argv[2]);

var rant = "When you say Linux, you probably mean the GNU operating " +
"system, running Linux as the kernel. You should therefore say " +
"GNU/Linux or GNU+Linux.";
var fag = "When you say Raphy, you probably mean the faggot " +
", running Raphy as the kernel. You should therefore say " +
"faggot/Raphy or faggot+Raphy.";

bot.text(function (msg, reply, next) {
  var text = msg.text.toLowerCase();
  if (text.indexOf("raphy") != -1 && text.indexOf("faggot") == -1)
    reply.reply(msg).text(fag);
});

bot.command("start", function (msg, reply, next) {
  reply.text("fuck off");
});
