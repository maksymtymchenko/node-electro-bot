import TelegramBot from 'node-telegram-bot-api';
import mongoose from 'mongoose';

import UserController from "./api/controllers/UserController.js";

import {generateUrl, ping, createListMessage} from './helpers.js';
import {token, commands, listOfCommands, MONGO_DB_URL} from './constants.js'

const bot = new TelegramBot(token, {
    polling: true
});

async function startBot() {
    try {
        await mongoose.connect(MONGO_DB_URL);
        await bot.setMyCommands(commands);
    } catch (e) {
        console.error(e);
    }
}

startBot();

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = await UserController.getOneUser(chatId);

    if (user && user.userId === chatId) {
        return await bot.sendMessage(chatId, 'Привіт! Для перевірки наявності електроенергії вдома пиши /check');
    } else {
        return await bot.sendMessage(chatId, 'Привіт! Будь ласка, зареєструйтеся за допомогою команди /register');
    }

    return;
});
bot.onText(/\/register/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.chat.username;

    await bot.sendMessage(chatId, 'Привіт! Будь ласка, надішліть свою ІР адресу');

    const ipHandler = async (msg) => {
        if (msg.chat.id !== chatId) return;

        const userData = {
            userId: chatId,
            userName: userName,
            userIp: msg.text,
        };

        await UserController.createUser(userData);
        await bot.sendMessage(chatId, 'ІР адресса додана! Для перевірки наявності електроенергії скористайтеся командою /check');
        bot.removeListener('message', ipHandler);
    };

    bot.on('message', ipHandler);
});

bot.onText(/\/check/, async (msg) => {
    const chatId = msg.chat.id;
    const user = await UserController.getOneUser(chatId);

    if (!user) {
        return await bot.sendMessage(chatId, 'Будь ласка, зареєструйтеся за допомогою команди /register');
    }

    const url = generateUrl(user.userIp);

    const hasElectricity = await ping(url);

    if (hasElectricity) {
        return await bot.sendMessage(chatId, 'Вітаю! У вашому будинку є електроенергія!');
    }

    return await bot.sendMessage(chatId, 'Співчуваю! Електроенергія відсутня! Тримайтеся!');
});

bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id;

    const listMessage = createListMessage(listOfCommands);
    await bot.sendMessage(chatId, listMessage);
});
