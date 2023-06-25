import {Router} from "express";
import Task from "../models/Task.js";
import Result from "../models/Result.js";

export const taskRoutes = new Router();

taskRoutes.post('/tasks', addTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.delete('/tasks/:id/:chatId', deleteTaskHandler);

function addTaskHandler (req, res) {
    const {name, chatId} = req.body;

    const newTask = Task.build({
        Name: name,
        ChatID: chatId
      });

    newTask.save()
        .then(savedTask => res.json(savedTask))
        .catch(error => res.json(error));
}

function getTasksHandler (req, res) {
    Task.findAll()
    .then(tasks => res.json(tasks))
    .catch(error => res.json(error));
}

function deleteTaskHandler (req, res) {
    const {id, chatId} = req.params;
    Result.destroy({
        where: {
            TaskID: id,
            ChatID: chatId
        }
    });
    Task.destroy({
        where: {
            id: id,
            ChatID: chatId
        }
    })
    .then(() => {
        res.json({ message: 'Task deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
      });
}