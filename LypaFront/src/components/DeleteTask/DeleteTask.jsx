import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../../rest/tasks.rest";

function DeleteTask() {
    const [selectedTask, setSelectedTask] = useState("");

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function prepareTasks() {
            try {
                const result = await getTasks();
                setTasks(result);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    
        prepareTasks();
    }, []);

    console.log(tasks);
    //TODO figure out why needs to delete one task twise
    const handleDelete = async () => {
        const task = tasks.find((task) => task.name === selectedTask && task.ChatID === 12314213);
        const taskId = task ? task.id : null;
        //TODO remove hardcoded chat id
        const data = {
            id: taskId,
            chatId: 12314213
        }
        try {
            await deleteTask(data);
            console.log("Task deleted successfully");
          } catch (error) {
            console.error("Error deleting task:", error);
          }
    };

    return (
        <div>
            <h2>Delete Task</h2>
            <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.key)}
            >
                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.Name}
                    </option>
                ))}
            </select>
            <button onClick={handleDelete}>Delete</button>
            <Link to={"/"}>Cancel</Link>
        </div>
    );
}

export default DeleteTask;
