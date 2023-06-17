import React from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../../rest/tasks.rest";

function TaskList() {
    // Assuming you receive the task list as a prop
    const tasks = getTasks();

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.name}
                    </li>
                ))}
            </ul>
            <Link to={"/"}>Cancel</Link>
        </div>
    );
}

export default TaskList;
