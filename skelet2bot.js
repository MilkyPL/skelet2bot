const botgram = require("botgram");
const { json } = require("req");
const cron = require('node-cron');
const cowsay = require("cowsay");
const bot = botgram(process.argv[2]);
const rants = require("./rants.json");
const feature = "This feature is either under construction or i'm too retarded to implement it";
const cow = `<pre>
         (__)
         (oo)
   /------\\/
  / |    ||
 *  /\\---/\\
    ~~   ~~
...."Have you mooed today?"...</pre>`;

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
    if(text == undefined)
        reply.text("unknown error");
});

bot.command("start", function (msg, reply, next) {
    if(msg.args().includes("moo"))
        reply.text(cow, 'HTML');
    reply.text("fuck off");
});

bot.command("price", function (msg, reply, next) {
    if(msg.args().includes("moo"))
        reply.text(cow, 'HTML');
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
    if(msg.args().includes("moo"))
        reply.text(cow, 'HTML');
    const K = 273.15;
    const city = msg.args();
    let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1566ed87c9944f0df94332da29ee817c`;
    let ass;
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
            reply.text(`Weather in ${data.name}, ${data.sys.country}: ${Math.floor(data.main.temp - K)}°C, ${data.weather[0].description} ` + icon + `
 Humidity: ${Math.floor(data.main.humidity)}%
 Air pressure: ${Math.floor(data.main.pressure)} hPa
`);
        });
});

bot.command("skelet", function (msg, reply, next) {
    if(msg.args().includes("moo"))
        reply.text(cow, 'HTML');
    let skelets = "";
    for (let i = 0; i < Math.floor((Math.random() * 20) + 1 ); i++)
        skelets += Math.random() < 0.5 ? '💀' : '☠';
    reply.text(skelets);
});

bot.command("cowsay", function (msg, reply, next) {
    const moo = msg.args();
    if(moo == undefined || moo == "moo")
        reply.text(cowsay.say({
            text : "Have you mooed today?"
        }));
    else
        reply.text(cowsay.say({
            text : moo
        }));
});

bot.command("papiez", function (msg, reply, next) {
    if(msg.args().includes("moo"))
        reply.text(cow, 'HTML');
    reply.video("https://vignette4.wikia.nocookie.net/nonsensopedia/images/c/cf/Patron.gif/revision/latest?cb=20130929184445");
});

bot.command("moo", function (msg, reply, next) {
    reply.text(cow, 'HTML')
});

bot.command(function (msg, reply, next) {
    reply.text("invalid command dumbass");
});
/*
bot.all(function (msg, reply, next) {
    cron.schedule("37 21 * * *", function() {
        reply.text("testing cron");
    });
});
*/
