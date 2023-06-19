import {Router} from "express";
import Task from "../models/Task.js";

export const taskRoutes = new Router();

taskRoutes.post('/tasks', addTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.delete('/tasks/:id', deleteTaskHandler);

function addTaskHandler (req, res) {
    const {name, chatId} = req.body;

    const newTask = Task.build({
        Name: name,
        ChatID: chatId
      });

    newTask.save()
        //need to replace with res in future
        .then(savedTask => res.json(savedTask))
        .catch(error => res.json(error));
}

function getTasksHandler (req, res) {
    Task.findAll()
    .then(tasks => res.json(tasks))
    .catch(error => res.json(error));
}

function deleteTaskHandler () {

}