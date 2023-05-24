import { token } from './config/default.js';
import { Telegraf } from 'telegraf';
import commands from './commands/index.js';
import controllers from './controllers/index.js';
import middleware from './middleware/index.js';

const bot = new Telegraf(token);
middleware(bot);
commands(bot);
controllers(bot);
bot.launch();
