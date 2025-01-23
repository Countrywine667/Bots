const env = require('../.env'); 
const Telegraf = require('telegraf'); 
const session = require('telegraf/session'); 
 
const bot = new Telegraf(env.token); 
 
bot.use(session()); 
 
bot.start(ctx => { 
    const from = ctx.update.message.from; 
    console.log(from); 
    ctx.reply(`Welcome, ${from.first_name}!\nType 1`); 
}); 
 
bot.on('text', async (ctx) => { 
    const message = ctx.message.text; 
 
    if (message === '1') { 
        await ctx.reply('You will be connected to one of our operators. Please choose one of the links below: \n\n1. Adm 1\n2. Adm 2'); 
    } else { 
        await ctx.reply('Invalid option'); 
    } 
}); 
 
bot.startPolling();
