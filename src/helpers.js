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