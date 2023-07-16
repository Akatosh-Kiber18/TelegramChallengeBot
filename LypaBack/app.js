import express from "express";
import cors from "cors";
import { taskRoutes } from './routes/taskRoutes.js';
import { resultRoutes } from "./routes/resultRoutes.js";
import { userRoutes } from "./routes/userRoutes.js"
import TelegramBot from "node-telegram-bot-api";

const PORT = 8000;

const app = express();

const bot = new TelegramBot(process.env.TOKEN, { polling: true }); 

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if(text === "/start") {
        await bot.sendMessage(chatId, "Hi! This is the challenge telegram webapp. Have fun!");
    }
})
        
function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logRequest);
app.use(taskRoutes);
app.use(resultRoutes);
app.use(userRoutes);

app.listen(PORT, ()=> console.log('Server started on port: ' + PORT ));