import express from "express";
import cors from "cors";
import { taskRoutes } from './routes/taskRoutes.js';
import { resultRoutes } from "./routes/resultRoutes.js";
import { userRoutes } from "./routes/userRoutes.js"
import TelegramBot from "node-telegram-bot-api";

const PORT = 8000;

const app = express();

const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true }); 

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if(text === "/start") {
        await bot.sendMessage(chatId, `Hi! This is the challenge telegram webapp. Use /help command to see more details! 
                                       \nTo start use the button in the bottom left of your screen.`);
    } else if (text === "/help") {

        const message = `
        <code>This bot helps you manage tasks and track your progress.</code>\n
        
        <b>Here are the pages list and tips on how to use them:</b>
        
        <b>1. Add Task</b> - Use this page to add a new task to the list.\n
           <i>Tip:</i> When adding a task, make it descriptive and concise, so you will know what it is about later.\n
        
        <b>2. Delete Task</b> - This page allows you to delete a task from the list.\n
           <i>Tip:</i> Be careful when using this page, as deleted tasks cannot be recovered. Also, it will delete all users' results related to this task.\n
        
        <b>3. Add Result</b> - Use this page to add your score or result for a specific task.\n
           <i>Tip:</i> Currently, it can only save numbers. Each time you add a result for the same task, it will overwrite your previous score for that task.\n
        
        <b>4. Task List</b> - View the list of tasks and their corresponding results for each user.\n
           <i>Tip:</i> Regularly check the list to monitor your progress and see how you are doing.
        `

        await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
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