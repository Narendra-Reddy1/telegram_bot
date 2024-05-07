import { Telegraf } from "telegraf";
import { config } from "dotenv"
config();

const bot = new Telegraf("");
const imgSoruce = "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U";
const greetingMessage = `#1 Gaming on Telegram. Powered by $GMEE token.🚀 
🎮 Play games with friends
⛏️ Mine currencies with your team
🎰 Spin the Fortune Wheel
💰 Collect your rewards!`;

bot.start(async (ctx) => {
    await ctx.replyWithPhoto(imgSoruce, {
        caption: greetingMessage,
        reply_markup: {
            inline_keyboard: [[{ text: "Hello!", callback_data: "Hello" }]]
        }
    })
})