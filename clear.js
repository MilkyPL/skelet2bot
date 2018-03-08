"use strict";

const Telegraf = require("telegraf");
const key = process.argv[2];
const bot = new Telegraf(key);

bot.startPolling();
