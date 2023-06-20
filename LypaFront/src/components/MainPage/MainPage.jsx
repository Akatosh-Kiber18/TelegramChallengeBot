import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <h1>Main Page</h1>
            <Link to="/add-task">Add Task</Link>
            <Link to="/delete-task">Delete Task</Link>
            <Link to="/add-result">Add Result</Link>
            <Link to="/task-list">Task List</Link>
        </div>
    );
}

export default MainPage;
