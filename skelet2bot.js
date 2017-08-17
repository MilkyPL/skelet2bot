"use strict";

const Telegraf = require("telegraf");
const { json } = require("req");
const cowsay = require("cowsay");
// const cron = require("node-cron");
// const rants = require("./rants.json");

const args = text => text.split(" ").slice(1);

const bot = new Telegraf(process.argv[2]);
const feature = "This feature is either under construction or i'm too retarded to implement it";
const cow = `<pre>
         (__)
         (oo)
   /------\\/
  / |    ||
 *  /\\---/\\
    ~~   ~~
...."Have you mooed today?"...</pre>`;
/*
bot.text(({ message, reply }) => {
	const text = msg.text.toLowerCase();
	if(text.includes("linux") && !text.includes("gnu"))
			reply.reply(msg).text(rants.linux[Math.floor(Math.random()*rants.linux.length)]);
	if(text.includes("raphy") && !text.includes("faggot"))
			reply.reply(msg).text(rants.raphy[Math.floor(Math.random()*rants.raphy.length)]);
	if(text.includes("fighting games"))
		reply.reply(msg).text("fuck off with your gay fighting games nigger");
	if(text.includes("😂"))
		reply.reply(msg).text("fuck off faggot");
	if(text == undefined)
		reply("unknown error");
*/
bot.command("start", ({ message, reply }) => {
	if(args(message.text).includes("moo"))
		reply(cow, { parse_mode: "HTML" });
	reply("fuck off");
});

bot.command("price", ({ message, reply }) => {
	if(args(message.text).includes("moo"))
		reply(cow, { parse_mode: "HTML" });
	const coin = String(args(message.text));
	json("https://api.coinmarketcap.com/v1/ticker/")
		.then(crap => {
			let balls = crap.find(obj => obj.symbol === coin.toUpperCase());
			if(balls == undefined)
				reply("give me a valid symbol retard");
			reply(balls.name + ": " + balls.price_usd + "$");
		});
});

bot.command("weather", ({ message, reply }) => {
	if(args(message.text).includes("moo"))
		reply(cow, { parse_mode: "HTML" });
	const K = 273.15;
	const city = args(message.text);
	let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1566ed87c9944f0df94332da29ee817c`;
	let icon;
	json(link)
		.then(data => {
			switch(data.weather[0].icon) {
			case "01d":
				icon = "☀";
				break;
			case "01n":
				icon = "🌕";
				break;
			case "02d":
			case "02n":
				icon = "🌤";
				break;
			case "03d":
			case "03n":
				icon = "⛅";
				break;
			case "04d":
			case "04n":
				icon = "☁";
				break;
			case "09d":
			case "09n":
				icon = "🌧";
				break;
			case "10d":
			case "10n":
				icon = "🌦";
				break;
			case "11d":
			case "11n":
				icon = "🌩";
				break;
			case "13d":
			case "13n":
				icon = "🌨";
				break;
			case "50d":
			case "50n":
				icon = "🌫";
				break;
			}
			reply(`Weather in ${data.name}, ${data.sys.country}: ${Math.floor(data.main.temp - K)}°C, ${data.weather[0].description} ` + icon + `
 Humidity: ${Math.floor(data.main.humidity)}%
 Air pressure: ${Math.floor(data.main.pressure)} hPa
`);
		});
});

bot.command("skelet", ({ message, reply }) => {
	if(args(message.text).includes("moo"))
		reply(cow, { parse_mode: "HTML" });
	let skelets = "";
	for (let i = 0; i < Math.floor((Math.random() * 20) + 1 ); i++)
		skelets += Math.random() < 0.5 ? "💀" : "☠";
	reply(skelets);
});

bot.command("cowsay", ({ message, reply }) => {
	const moo = args(message.text);
	if(moo == undefined || moo == "moo" || moo == "")
		reply("```" + cowsay.say({
			text : "Have you mooed today?"
		}) + "```", "Markdown");
	else
		reply("```" + cowsay.say({
			text : moo
		}) + "```", "Markdown");
});

bot.command("papiez", ({ message, reply, replyWithVideo }) => {
	if(args(message.text).includes("moo"))
		reply(cow, { parse_mode: "HTML" });
	replyWithVideo("https://vignette4.wikia.nocookie.net/nonsensopedia/images/c/cf/Patron.gif/revision/latest?cb=20130929184445");
});

bot.command("moo", ({ reply }) => {
	reply(cow, { parse_mode: "HTML" });
});

bot.command("rogue", ({ reply }) => {
	reply(feature);
});

/*
bot.all(({ message, reply }) => {
	cron.schedule("37 21 * * *", function() {
		reply("testing cron");
	});
});
*/

bot.startPolling();
