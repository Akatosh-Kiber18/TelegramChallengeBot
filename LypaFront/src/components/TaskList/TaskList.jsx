import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../../rest/tasks.rest";

function TaskList() {
    // Assuming you receive the task list as a prop
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

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.Name}
                    </li>
                ))}
            </ul>
            <Link to={"/"}>Cancel</Link>
        </div>
    );
}

export default TaskList;
