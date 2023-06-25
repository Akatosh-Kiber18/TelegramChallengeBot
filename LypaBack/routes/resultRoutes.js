import {Router} from "express";
import Result from "../models/Result.js";

export const resultRoutes = new Router();

resultRoutes.post("/result", addResult);
resultRoutes.get("/results", getResults);

function addResult (req, res) {
    const {taskId, chatId, userId, score} = req.body;

    const newResult = Result.build({
        TaskID: taskId,
        UserID: userId,
        Score: score,
        ChatID: chatId
    })
    newResult.save()
        .then(savedResult => res.json(savedResult))
        .catch(error => res.json(error));
}

function getResults (req, res) {
    Result.findAll()
    .then(results => res.json(results))
    .catch(error => res.json(error));
}