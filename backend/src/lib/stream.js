import { StreamChat } from "stream-chat"
import dotenv from "dotenv"

dotenv.config();

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("STream API key or secret missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.log("Error occured while creating new user in stream", error);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();

        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.error("Error generating Stream token:", error); 
    }
}