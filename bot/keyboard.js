
const { Markup } = require("telegraf");

exports.getMainKeyboard = () => {
    let mainKeyboard = Markup.keyboard([
        ["Movies", "Settings"],
    ]);
    mainKeyboard = mainKeyboard.oneTime();

    return mainKeyboard;

};
exports.getBackKeyboard = () => {
    let backKeyboard = Markup.keyboard(["Back"]);
    backKeyboard = backKeyboard.oneTime();
    return backKeyboard;
};
