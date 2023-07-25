import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../../rest/tasks.rest.js";

function DeleteTask({tgApp}) {
    const [selectedTask, setSelectedTask] = useState();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function prepareTasksToDisplay() {
            try {
                const result = await getTasks();
                setTasks(result);
                if(result.length > 0) {
                    setSelectedTask(result[0].Name);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    
        prepareTasksToDisplay();
    }, []);

    const handleDelete = async (confirm) => {
        if(confirm) {
            const task = tasks.find((task) => task.Name == selectedTask);
            const taskId = task ? task.id : null;
            const data = {
                id: taskId
            };
            try {
                await deleteTask(data);
                const filteredTasks = tasks.filter(task => task.id !== taskId);
                setTasks(filteredTasks);
                tgApp.showAlert(`"${task.Name}" deleted.`);
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        } else {
            tgApp.showAlert("Thanks God you hold it!");
        }
    };
    
    return (
        <div>
            <h2>Delete Task</h2>
            <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
            >
                {tasks.map((task) => (
                    <option key={task.id} value={task.Name}>
                        {task.Name}
                    </option>
                ))}
            </select>
            <button onClick={() => 
            {tgApp.showConfirm(`This action will delete all score related to this task to.
            \nAre you sure?`,
                async (confirm) => await handleDelete(confirm) );}
            }
            >Delete</button>
            <button><Link to={"/"}>Cancel</Link></button>
        </div>
    );
}

export default DeleteTask;
