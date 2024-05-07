//import { IStorage } from "@tonconnect/sdk";
const storage = new Map();

class TonConnectStorage {
    constructor(chatId) {
        this.chatId = chatId;
    }
    async setItem(key, value) {
        storage.set(this.getKey(key), value);
    }
    async getItem(key) {
        return storage.get(this.getKey(key)) || null;
    }
    async removeItem(key) {
        storage.delete(this.getKey(key));
    }

    getKey(key) {
        return this.chatId.toString() + key;
    }

}
module.exports = { TonConnectStorage };