import React, { useState } from "react";
import { Link } from "react-router-dom";
import saveResultTask from './saveResultTask.js';

function ResultForm() {
    const [selectedTask, setSelectedTask] = useState("");
    const [result, setResult] = useState("");

    const handleTaskChange = (e) => {
        saveResultTask(e, setSelectedTask);
    };

    const handleResultChange = (e) => {
        setResult(e.target.value);
    };

    const handleSave = () => {
    // Logic to save the result
        console.log("Result saved:", result);
        // Clear the input fields
        setSelectedTask("");
        setResult("");
    };


    const handleCancel = () => {
        // Logic to handle cancel
        console.log("Adding result canceled");
        // Clear the input field
        setResult("");
    };

    return (
        <div>
            <h2>Add Result</h2>
            <select value={selectedTask} onChange={handleTaskChange}>
                <option value="">Select Task</option>
                {/* Render options dynamically based on the tasks in the database */}
                <option value="task1">Task 1</option>
                <option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
            </select>
            <input type="text" value={result} onChange={handleResultChange} />
            <button onClick={handleSave}>Save</button>
            <Link to={"/"} onClick={handleCancel}>Cancel</Link>
        </div>
    );
}

export default ResultForm;
