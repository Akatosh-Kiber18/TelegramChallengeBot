import {Router} from "express";
import Task from "../models/Task.js";
import Result from "../models/Result.js";
import User from "../models/User.js";

export const taskRoutes = new Router();

taskRoutes.post('/tasks', addTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.delete('/tasks/:id/:chatId', deleteTaskHandler);
taskRoutes.get('/tasklist/:chatId', getTaskList);

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
    Task.destroy({
        where: {
            id: id,
            ChatID: chatId
        }
    })
    .then(() => {
        Result.destroy({
            where: {
                TaskID: id,
                ChatID: chatId
            }
        });
        res.json({ message: 'Task deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
      });
}

async function getTaskList (req, res) {
    try {
        const {chatId} = req.params;
        // Fetch data from each entity
        const tasks = await Task.findAll({
            where : {ChatID: chatId},
        });
        const results = await Result.findAll({
            where : {ChatID: chatId},
        });
        const users = await User.findAll({
            where : {ChatID: chatId},
        });
   
        const taskList = results.reduce((acc, result) => {
            const task = tasks.find((task) => task.id === result.TaskID);
            const user = users.find((user) => user.id === result.UserID);
            const score = result.Score;
          
            const existingObject = acc.find(obj => obj[task.Name]);
            if (existingObject) {
              existingObject[task.Name][user.Name] = score;
            } else {
              const newObj = {
                [task.Name]: {
                  [user.Name]: score
                }
              };
              acc.push(newObj);
            }
            return acc;
          }, []);
        
        res.json(taskList);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}