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

    const scoreRegex = /^[0-9]+$/;
    if (!scoreRegex.test(score)) {
        return res.status(400).json({ error: "Invalid score. Score must be a whole number." });
    }

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