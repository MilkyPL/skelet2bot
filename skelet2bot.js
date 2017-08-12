const Telegraf = require('telegraf')

const app = new Telegraf(process.env.BOT_TOKEN)
app.command('start', ({ from, reply }) => {
  console.log('start', from)
  return reply('fuck off')
})
app.startPolling()
