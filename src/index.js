import TelegramBot from 'node-telegram-bot-api';

import { generateUrl, ping } from './helpers.js';
import { token, MY_IP, commands } from './constants.js'

const bot = new TelegramBot(token, {
    polling: true
});

bot.setMyCommands(commands);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
        await bot.sendMessage(chatId, 'Привіт! Для перевірки наявності електроенергії вдома пиши /check');
    }

    if (messageText === '/check') {
        const url = generateUrl(MY_IP);

        const hasElectricity = await ping(url);

        if (hasElectricity) {
            return await bot.sendMessage(chatId, 'Вітаю! У вашому будинку є електроенергія!');
        }
        
        return await bot.sendMessage(chatId, 'Співчуваю! Електроенергія відсутня! Тримайтеся!');
    }
});