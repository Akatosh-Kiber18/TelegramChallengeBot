import {Router} from "express";
import Task from "../models/Task.js";
import Result from "../models/Result.js";
import User from "../models/User.js";

export const taskRoutes = new Router();

taskRoutes.post('/api/tasks', addTaskHandler);
taskRoutes.get('/api/tasks', getTasksHandler);
taskRoutes.delete('/api/tasks/:id', deleteTaskHandler);
taskRoutes.get('/api/tasklist', getTaskListHandler);

async function addTaskHandler (req, res) {
  try {
    const { name } = req.body;

    const existingTask = await Task.findOne({
      where: {
        Name: name,
      },
    });

    if (!existingTask) {
      const newTask = await Task.create({
        Name: name,
      });

      res.json(newTask);
    } else {
      res.status(409).json({ error: "Task already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTasksHandler (req, res) {
    Task.findAll()
    .then(tasks => res.json(tasks))
    .catch(error => res.json(error));
}

async function deleteTaskHandler (req, res) {
    const {id} = req.params;
    Task.destroy({
        where: {
            id: id
        }
    })
    .then(() => {
        Result.destroy({
            where: {
                TaskID: id
            }
        });
        res.json({ message: 'Task deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
      });
}

async function getTaskListHandler (req, res) {
    try {
        // Fetch data from each entity
        const tasks = await Task.findAll();
        const results = await Result.findAll();
        const users = await User.findAll();
   
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