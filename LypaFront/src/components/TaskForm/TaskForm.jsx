import React, { useState } from "react";
import { Link } from "react-router-dom";

function TaskForm() {
    const [task, setTask] = useState("");

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleSave = () => {
    // Logic to save the task
        console.log("Task saved:", task);
        // Clear the input field
        setTask("");
    };

    const handleCancel = () => {
    // Logic to handle cancel
        console.log("Task creation canceled");
        // Clear the input field
        setTask("");
    };

    return (
        <div>
            <h2>Add Task</h2>
            <input type="text" value={task} onChange={handleInputChange} />
            <button onClick={handleSave}>Save</button>
            <Link to={"/"} onClick={handleCancel}>Cancel</Link>
        </div>
    );
}

export default TaskForm;
