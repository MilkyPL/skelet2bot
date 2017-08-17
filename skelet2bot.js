"use strict";

const Telegraf = require("telegraf");
const { json } = require("req");
const cowsay = require("cowsay");
// const cron = require("node-cron");
// const rants = require("./rants.json");

const args = text => text.split(" ").slice(1);

const bot = new Telegraf(process.argv[2]);

const feature =
	"This feature is either under construction " +
	"or i'm too retarded to implement it";
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
			reply.reply(msg).text(rants.linux[Math.floor(Math.random()*
				rants.linux.length)]);
	if(text.includes("raphy") && !text.includes("faggot"))
			reply.reply(msg).text(rants.raphy[Math.floor(Math.random()*
				rants.raphy.length)]);
	if(text.includes("fighting games"))
		reply.reply(msg).text("fuck off with your gay fighting games nigger");
	if(text.includes("😂"))
		reply.reply(msg).text("fuck off faggot");
	if(text == undefined)
		reply("unknown error");
*/
bot.command("start", ({ reply }) =>
	reply("fuck off"));

bot.command("price", ({ message, reply }) =>
	json("https://api.coinmarketcap.com/v1/ticker/")
		.then(crap => {
			const balls = crap.find(obj =>
				obj.symbol === String(args(message.text)).toUpperCase());
			if(balls == undefined)
				reply("give me a valid symbol retard");
			reply(balls.name + ": " + balls.price_usd + "$");
		}));

bot.command("weather", ({ message, reply }) => {
	const K = 273.15;
	const city = args(message.text);
	const link =
		"http://api.openweathermap.org/data/2.5/weather?q=" +
		encodeURIComponent(city) +
		"&APPID=1566ed87c9944f0df94332da29ee817c";
	const icons = {
		"01d": "☀", "01n": "🌕",
		"02d": "🌤", "02n": "🌤",
		"03d": "⛅", "03n": "⛅",
		"04d": "☁", "04n": "☁",
		"09d": "🌧", "09n": "🌧",
		"10d": "🌦", "10n": "🌦",
		"11d": "🌩", "11n": "🌩",
		"13d": "🌨", "13n": "🌨",
		"50d": "🌫", "50n": "🌫"
	};
	return json(link).then(data =>
		reply(
			"Weather in " +
			data.name + ", " + 
			data.sys.country + ": " +
			Math.floor(data.main.temp - K) + "°C, " +
			data.weather[0].description +
			(icons[data.weather[0].icon] || "") + "\n" +
			" Humidity: " + Math.floor(data.main.humidity) + "%" +
			" Air pressure: " + Math.floor(data.main.pressure) + " hPa"));
});

bot.command("skelet", ({ reply }) => {
	let skelets = "";
	for (let i = 0; i < Math.floor((Math.random() * 20) + 1 ); i++)
		skelets += Math.random() < 0.5 ? "💀" : "☠";
	reply(skelets);
});

bot.command("cowsay", ({ message, reply }) =>
	reply("```" + cowsay.say({
		text : String(args(message.text)) || "Have you mooed today?"
	}) + "```", { parse_mode: "Markdown" }));

bot.command("papiez", ({ replyWithVideo }) =>
	replyWithVideo("https://vignette4.wikia.nocookie.net" +
		"/nonsensopedia/images/c/cf/Patron.gif/revision/latest" +
		"?cb=20130929184445"));

bot.command("moo", ({ reply }) =>
	reply(cow, { parse_mode: "HTML" }));

bot.command("rogue", ({ reply }) =>
	reply(feature));

/*
bot.all(({ message, reply }) => {
	cron.schedule("37 21 * * *", function() {
		reply("testing cron");
	});
});
*/

bot.startPolling();
