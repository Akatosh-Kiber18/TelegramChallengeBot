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
        .then(savedTask => {
            console.log('New task saved successfully:', savedTask);
        })
        .catch(error => {
            console.error('Error saving new task:', error);
        });
}

function getTasksHandler () {
    Task.findAll()
    .then(tasks => {
      console.log('All tasks:', tasks);
    })
    .catch(error => {
      console.error('Error while returned tasks:', error);
    });
}

function deleteTaskHandler () {

}