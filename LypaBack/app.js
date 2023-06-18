import express from "express";
import {taskRoutes} from './routes/taskRoutes.js';
import cors from "cors";

const PORT = 8000;

const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logRequest)
app.use(taskRoutes)

app.listen(PORT, ()=> console.log('Server started on port: ' + PORT ));