const { Telegraf, Scenes, Markup, Telegram } = require('telegraf');
const { TonConnectStorage } = require("./Storage.js")
const { create, toBuffer } = require("qrcode");
const { getWallets, getWalletInfo } = require("./wallet.js");
const { default: TonConnect } = require('@tonconnect/sdk');
require("dotenv").config();

var CallbackType = {
    PickAGame: "gameSelection",
    BackToMainMenu: "⬅️ Go back to Main Menu"
}
var UI = {
    MainMenu: {
        PickAGame: "🕹️ Pick a game",
        ChallengeFriends: "💪 Challenge friends",
        JoinCommunity: "🤝 Join community",
        GetOurApp: "📲 Get our cash winning app"
    },
    GamName: {
        RocketBlitz: "Rocket Blitzz",
        BallPool: "8 Ball Pool",
        Merzi: "Merzi",
    }
}
//AIzaSyD68AhIdFbXnRh2y1YsI41huVN4-zZZJYY
const imgSoruce = "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U";
const gameSelectionImg = "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI";
const greetingMessage = `#1 Gaming on Telegram. Powered by $PZP token.🚀 
🎮 Play games with friends
⛏️ Mine currencies with your team
🎰 Spin the Fortune Wheel
💰 Collect your rewards!`;


const bot = new Telegraf(process.env.BOT_TOKEN);


// const stage = new Scenes.Stage([settings]); // Register our scenes
// bot.use(stage.middleware()); // Stage middleware
// bot.hears("settings", Scenes.Stage.enter("settings"));
let chatId = null;

bot.start(async (ctx) => {
    //ctx.reply("Welcome ");
    chatId = ctx.chat.id;
    await createChatButton(ctx);
    ctx.replyWithAnimation("https://media.tenor.com/dzdxV75KPbcAAAPo/zooracers-zooecosystem.mp4", {
        caption: greetingMessage,
        reply_markup: {
            inline_keyboard: [
                [{ text: "🕹️Pick a game", callback_data: CallbackType.PickAGame }],
                [{ text: "Rewards", web_app: { url: "https://arena.playzap.games/rewards" } }],
            ]
        }

    })
});
bot.on("callback_query", async (ctx) => {
    switch (ctx.update.callback_query.data) {
        case CallbackType.PickAGame:
            ctx.answerCbQuery();
            await ctx.reply("Try Merzi or pick your favourite game below 👇");
            await ctx.replyWithGame("merzi", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🕹️ Play", callback_game: {},
                            },
                            { text: "⚔️ Challenge", web_app: { url: "https://arena.playzap.games/multiplayer/1MYKVR6VGEeD" } }]
                    ]
                }
            })
            await ctx.replyWithHTML("<b>Games</b>", Markup.keyboard(
                [
                    [{ text: UI.GamName.BallPool }, { text: UI.GamName.RocketBlitz }],

                    [CallbackType.BackToMainMenu],
                ]
            ));
            break;
    }
    if (ctx.update.callback_query.game_short_name == "merzi") {
        ctx.answerGameQuery("https://arena.playzap.games/multiplayer/J1qxjk53G6NA");
        ctx.reply("merzi requested to play");
    }
    switch (ctx.update.callback_query.data) {
        case UI.GamName.BallPool:
            await ctx.answerCbQuery();
            await ctx.reply(ctx.update.callback_query.data + " selected!!")
            break;
        case UI.GamName.Merzi:
            await ctx.answerCbQuery();
            await ctx.reply(ctx.update.callback_query.data + " selected!!")
            break;
        case UI.GamName.RocketBlitz:
            await ctx.answerCbQuery();
            await ctx.reply(ctx.update.callback_query.data + " selected!!")
            break;
    }
})

bot.command("allgames", async (ctx) => {
    ctx.replyWithHTML("<b>Games</b>", Markup.keyboard(
        [
            [{ text: UI.GamName.BallPool }, { text: UI.GamName.RocketBlitz }],
            // ["Merzi", "Fruit Slize"],
            // ["Temple Run", "Doge Run"],
            // ["Tree Mania", "Camel Rush"],
            // ["DnD", "Boom Blaster"],
            [{ text: CallbackType.BackToMainMenu }],
        ]
    ))

});

bot.command("connect", async (ctx) => {
    const chatId = ctx.msg.chat.id;
    const wallets = await getWallets();
    const connector = new TonConnect({
        storage: new TonConnectStorage(chatId),
        manifestUrl: process.env.MANIFEST_URL
    });

    connector.onStatusChange((wallet) => {
        if (wallet)
            ctx.sendMessage(`${wallet.device.appName} wallet connected!`);
    })
    const tonKeeper = wallets.find(x => x.appName === "tonkeeper");

    const link = connector.connect({
        bridgeUrl: tonKeeper.bridgeUrl,
        universalLink: tonKeeper.universalLink
    });
    const qrcode = await toBuffer(link);
    const qrBase64 = uint8ArrayToBase64(qrcode);
    console.log(qrBase64);
    ctx.replyWithPhoto({ source: Buffer.from(qrBase64, 'base64') });
})
function uint8ArrayToBase64(uint8Array) {
    let binary = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
}
bot.hears(CallbackType.BackToMainMenu, async (ctx) => {

    ctx.reply("backing to menu");

    ctx.replyWithHTML("<b>Pick from the menu below 👇</b>", Markup.keyboard(
        [
            [{ text: UI.MainMenu.PickAGame }, { text: UI.MainMenu.ChallengeFriends }],
            [{ text: UI.MainMenu.JoinCommunity }, { text: UI.MainMenu.GetOurApp }]
        ]
    ));
});


bot.hears(UI.GamName.BallPool, async (ctx) => {
    await ctx.reply("Ball pool selected");
})

bot.hears(UI.GamName.RocketBlitz, async (ctx) => {
    await ctx.reply("Rocket blitzz selected");
})


const createChatButton = async function (ctx) {
    await ctx.setChatMenuButton({
        type: "web_app",
        text: "🎮 Open App",
        web_app: { url: "https://narendrareddydasag.wixsite.com/naren" }
    })
}



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))