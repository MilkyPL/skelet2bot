const botgram = require("botgram");
const { json } = require("req");
const bot = botgram(process.argv[2]);
const rants = require("./rants.json");
const feature = "This feature is either under construction or i'm too retarded to implement it";

bot.text(function (msg, reply, next) {
    const text = msg.text.toLowerCase();
    if(text.includes("linux") && !text.includes("gnu"))
		    reply.reply(msg).text(rants.linux[Math.floor(Math.random()*rants.linux.length)]);
    if(text.includes("raphy") && !text.includes("faggot"))
		    reply.reply(msg).text(rants.raphy[Math.floor(Math.random()*rants.raphy.length)]);
    if(text.includes("fighting games"))
        reply.reply(msg).text("fuck off with your gay fighting games nigger");
    if(text.includes("😂"))
        reply.reply(msg).text("fuck off faggot");
});

bot.command("start", function (msg, reply, next) {
    reply.text("fuck off");
});

bot.command("price", function (msg, reply, next) {
    const coin = msg.args();
    let crap;
    json("https://api.coinmarketcap.com/v1/ticker/")
        .then(data => crap = data)
        .then(()=> {
            let balls = crap.find(obj => obj.symbol === coin.toUpperCase());
            if(balls == undefined)
                reply.text("give me a valid symbol retard");
            reply.text(balls.name + ": " + balls.price_usd + "$");
        });
});

bot.command("weather", function (msg, reply, next) {
    const K = 273.15;
    const city = msg.args();
    let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1566ed87c9944f0df94332da29ee817c`;
    let ass;
    json(link)
        .then(data => {
            if (data.cod !== 200)
                reply.text(`gay error:\n${data.cod}: ${data.message}`);
            reply.text(`Weather in ${data.name}, ${data.sys.country}: ${Math.floor(data.main.temp - K)}°C, ${data.weather[0].description}
Max: ${Math.floor(data.main.temp_max - K)}°C
Min: ${Math.floor(data.main.temp_min - K)}°C
Humidity: ${Math.floor(data.main.humidity)}%
Air pressure: ${Math.floor(data.main.pressure)} hPa
`);
});
});
