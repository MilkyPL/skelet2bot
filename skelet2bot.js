const Telegraf = require('telegraf')
const { reply } = Telegraf

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.command('/start', (ctx) => ctx.reply('fuck off'))
bot.hears('raphy', (ctx) => ctx.reply('what a fag'))
bot.startPolling()
