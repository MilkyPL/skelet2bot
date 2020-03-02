"use strict";

const Telegraf = require("telegraf");
const { Telegram } = require("telegraf");
const { json } = require("req");
const cowsay = require("cowsay");
const key = process.argv[2];
const Danbooru = require("danbooru");
const Gelbooru = require('booru')
const { BooruError } = require('booru')

const args = text => text.split(" ").slice(1);
const argstring = text => args(text).join(" ").trim();

const bot = new Telegraf(key);
bot.telegram.getMe().then(data =>
	bot.options.username = data.username);

const tg = new Telegram(key);

const booru = new Danbooru();

const feature = ({ reply }) =>
	reply("This feature is either under construction " +
	"or I'm too retarded to implement it");

const cow = `<pre>
         (__)
         (oo)
   /------\\/
  / |    ||
 *  /\\---/\\
    ~~   ~~
...."Have you mooed today?"...</pre>`;

const cows = ["beavis.zen", "bong", "bud-frogs", "bunny",
	"cheese", "cower", "daemon", "default", "doge",
	"dragon-and-cow", "dragon", "elephant-in-snake",
	"elephant", "eyes", "flaming-sheep", "ghostbusters",
	"goat", "head-in", "hedgehog", "hellokitty", "kiss",
	"kitty", "koala", "kosh", "luke-koala", "mech-and-cow",
	"meow", "milk", "moofasa", "moose", "mutilated", "ren",
	"satanic", "sheep", "skeleton", "small", "sodomized",
	"squirrel", "stegosaurus", "stimpy", "supermilker",
	"surgery", "telebears", "turkey", "turtle", "tux",
	"vader-koala", "vader", "whale", "www"];

console.log("Bot started!");

bot.command("start", ({ reply }) =>
	reply("fuck off"));

bot.command("moo", ({ reply }) =>
	reply(cow, { parse_mode: "HTML" }));

bot.command("test", feature);

bot.command("sankaku", feature);

bot.command("gelbooru", ({ message, reply, replyWithPhoto }) => {
	const tags = args(message.text);
	if(tags == "")
		reply("you forgot to specify tags retard");
	else Gelbooru.search("gelbooru", tags, { random: true })
		.then(posts => {
			const caption = `Source: ${posts[0].source}`
			replyWithPhoto(posts[0].file_url, { caption });
		})
		.catch(err => {
			reply(err);
		});
});

bot.command("danbooru", ({ message, reply, replyWithPhoto }) => {
	const tags = args(message.text);
	let errors = "Following errors occured:\n";
	if(tags == "")
		reply("you forgot to specify tags retard\nCommand help: Search Danbooru for specified tags. Use " +
		"up to 2 tags:\n<pre>/danbooru tag1 tag2</pre>", { parse_mode: "HTML"});
	else booru.posts(tags)
		.then(posts => posts[Math.floor(Math.random()*posts.length)])
		.then(post => booru.posts.get(post))
		.catch(function(e) {
			errors += e + "\n";
		})
		.then(postInfo => {
			const file = postInfo.file;
			const caption = `Post ID: ${postInfo.id}\n` + 
			`Artist: ${postInfo.tags.artist}\n` +
			`Characters: ${postInfo.tags.character}\n` +
			`Copyright info: ${postInfo.tags.copyright}\n` +
			`https://danbooru.donmai.us/posts/${postInfo.id}\n`;
			if(!("request" in file))
				reply("image unavailable\n" + caption);
			else replyWithPhoto(`https://danbooru.donmai.us/data/${file.name}`, { caption })
				.catch(function(e) {
					if(e.toString().includes("400"))
						replyWithPhoto(`https://danbooru.donmai.us/cached/data/${file.name}`, { caption });
					else {
						errors += e + " (image unavailable)\n";
						reply(errors);
					}
				});
		})
		.catch(function(e) {
			errors += e + "\n";
			reply(errors + "Try again later or use different tags.");
		});
});

bot.command("price", ({ message, reply }) => {
	if(args(message.text)[0] == undefined)
		reply("input a valid ticker symbol retard");
	else json("https://api.coinmarketcap.com/v1/ticker/?limit=0")
		.then(crap => crap.find(obj =>
			obj.symbol === args(message.text)[0].toUpperCase()))
		.catch(function(e) {
			reply(e);
		})
		.then(balls => {
			if(balls == undefined)
				reply("input a valid ticker symbol retard");
			else balls.percent_change_24h.includes("-")
				? reply(balls.name + ": " + balls.price_usd + "$ " + balls.percent_change_24h + "% 📉")
				: reply(balls.name + ": " + balls.price_usd + "$ +" + balls.percent_change_24h + "% 📈");
		})
		.catch(function(e) {
			reply(e);
		});
});

bot.command("weather", ({ message, reply }) => {
	const K = 273.15;
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
	return json("http://api.openweathermap.org/data/2.5/weather?q=" +
		encodeURIComponent(argstring(message.text)) +
		"&APPID=1566ed87c9944f0df94332da29ee817c").then(data =>
		data.cod !== 200
			? reply(`Error:\n${data.cod}: ${data.message}`)
			: reply(
				"Weather in " +
				data.name + ", " + 
				data.sys.country + ": " +
				Math.floor(data.main.temp - K) + "°C, " +
				data.weather[0].description + " " +
				(icons[data.weather[0].icon] || "") + "\n" +
				" Humidity: " + Math.floor(data.main.humidity) + "%\n" +
				" Air pressure: " + Math.floor(data.main.pressure) + " hPa"));
});

bot.command("skelet", ({ reply }) => {
	let skelets = "";
	for (let i = 0; i < Math.floor((Math.random() * 20) + 1 ); i++)
		skelets += Math.random() < 0.5 ? "💀" : "☠";
	return reply(skelets);
});

bot.command("cowsay", ({ message, reply }) => {
	const arg = args(message.text);
	let text = arg.slice();
	let notCow = false;
	text.splice(0,1);
	if(arg[0] == undefined) {
		reply("specify animal and/or text\nuse <pre>/cowsay list</pre> to see supported cows", 
		{ parse_mode: "HTML" });
	} else {
		for(let i = 0; i < cows.length; i++){
			if(arg[0].includes(cows[i])) {
				reply("```" + cowsay.say({
					text : text.join(" ") || "I'm too dumb to type some text",
					f : arg[0]
				}) + "```", { parse_mode: "Markdown" });
				notCow = true;
				break;
			} else continue;
		} if(arg[0].includes("list") && notCow === false) {
			reply(cows);
		} else if(notCow === false) {
			reply("```" + cowsay.say({
				text : arg.join(" ") || "Have you mooed today?",
			}) + "```", { parse_mode: "Markdown" });
		}
	}
});

bot.on("message", ({ message, reply, replyWithSticker }) => {
	if(message.new_chat_members !== undefined) {
		reply(message.new_chat_members);
		replyWithSticker("CAADBAADAQADSb69LZb11aFomO9mAg");
	};
});

bot.startPolling();
