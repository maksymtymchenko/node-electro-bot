import axios from "axios";

export const generateUrl = (ip) => `http://${ip}`;

export const ping = async (url) => {
    try {
        const response = await axios.get(url);

        if(response) return true;

        return false;
    } catch (e) {
        console.error('Error: ', e);
        return false;
    }
}

export const createListMessage = (items) => {
    let message = 'Доступні команди:\n\n';

    items.forEach((item, index) => {
        message += `${index + 1}. ${item}\n`;
    });

    return message;
};
