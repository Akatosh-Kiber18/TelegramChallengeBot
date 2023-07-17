import {Router} from "express";
import Result from "../models/Result.js";
import { where } from "sequelize";

export const resultRoutes = new Router();

resultRoutes.post("/api/result", addResultHandler);
resultRoutes.get("/api/results", getResultsHandler);

async function addResultHandler (req, res) {
    const {taskId, userId, score} = req.body;

    const existingResult = await Result.findOne({
        where: {
            TaskID: taskId,
            UserID: userId
        }
    })

    if (!existingResult) {
        const newResult = Result.build({
            TaskID: taskId,
            UserID: userId,
            Score: score
        })
        newResult.save()
            .then(savedResult => res.json(savedResult))
            .catch(error => res.json(error));
    } else {
        Result.update({
            Score: score
        },
        {
            where: {
                TaskID: taskId,
                UserID: userId
            }
        }
        )
        .then(savedResult => res.json(savedResult))
        .catch(error => res.json(error));
    }
}

function getResultsHandler (req, res) {
    Result.findAll()
    .then(results => res.json(results))
    .catch(error => res.json(error));
}