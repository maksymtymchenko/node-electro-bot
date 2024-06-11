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

export const  isValidIPAddress = (ipAddress) => {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/;

    return ipv4Pattern.test(ipAddress) || ipv6Pattern.test(ipAddress);
}
