const { Scenes } = require("telegraf");
const Scene = Scenes.BaseScene;
const { getMainKeyboard, getBackKeyboard } = require("./keyboard");
const { leave } = Scenes.Stage;
const settings = new Scene("settings");

settings.enter(async (ctx) => {
    const { backKeyboard } = getBackKeyboard();
    await ctx.reply("settings.what_to_change", backKeyboard);
});
settings.leave(async (ctx) => {
    const { mainKeyboard } = getMainKeyboard();
    await ctx.reply("shared.what_next", mainKeyboard);
    await ctx.scene.leave();
});
settings.hears("Back", leave());
settings.action("backButtonId", (x) => console.log("Back button was clicked"));
module.exports = settings;