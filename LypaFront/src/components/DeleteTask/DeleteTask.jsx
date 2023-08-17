import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../../rest/tasks.rest.js";
import styles from  "./DeleteTask.module.css";

function DeleteTask({tgApp}) {
    const [selectedTask, setSelectedTask] = useState();
    const [tasks, setTasks] = useState([]);
    const [desctiption, setDescription] = useState("");

    useEffect(() => {
        async function prepareTasksToDisplay() {
            try {
                const result = await getTasks();
                setTasks(result);
                if(result.length > 0) {
                    setSelectedTask(result[0].Name);
                    setDescription(result[0].Description);
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

    const updateDescription = (taskName) => {
        const task = tasks.find((task) => task.Name == taskName);
        setDescription(task.Description);
    }
    
    return (
        <div>
            <h3>Delete Task</h3>
            <select
                className={styles.optionField}
                value={selectedTask}
                onChange={(e) => {setSelectedTask(e.target.value); updateDescription(e.target.value);}}
            >
                {tasks.map((task) => (
                    <option key={task.id} value={task.Name}>
                        {task.Name}
                    </option>
                ))}
            </select>
            <h3>Description of the task:</h3>
            <p>{desctiption ? desctiption : "No description"}</p>
            <div className={styles.buttonContainer}>
                <button onClick={() => 
                {tgApp.showConfirm(`This action will delete all score related to this task to.
                \nAre you sure?`,
                    async (confirm) => await handleDelete(confirm) );}
                }
                >Delete</button>
                <button><Link className={styles.linkButton} to={"/"}>Cancel</Link></button>
            </div>
        </div>
    );
}

export default DeleteTask;
