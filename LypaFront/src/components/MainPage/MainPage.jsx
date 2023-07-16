import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
return (
        <div>
            <h1>Main Page</h1>
            <button><Link to="/add-task">Add Task</Link></button>
            <button><Link to="/delete-task">Delete Task</Link></button>
            <button><Link to="/add-result">Add Result</Link></button>
            <button><Link to="/task-list">Task List</Link></button>
        </div>
    );
}

export default MainPage;
