const { isWalletInfoRemote, WalletInfoRemote, WalletsListManager } = require("@tonconnect/sdk")

const walletListManager = new WalletsListManager({
    cacheTTLMs: process.env.WALLETS_LIST_CAHCE_TTL_MS
});

async function getWallets() {
    const wallets = await walletListManager.getWallets();
    return wallets.filter(isWalletInfoRemote);
};

async function getWalletInfo(appName) {
    const filteredWallets = (await getWallets()).filter(wallet => wallet.appName.toLowerCase() === appName.toLowerCase())
    return filteredWallets;
}
module.exports = { getWallets, getWalletInfo }