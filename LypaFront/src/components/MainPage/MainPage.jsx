import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css"

function MainPage() {
    return (
        <div className={styles.MainPage}>
            <h1>Main Page</h1>
            <Link className={styles.link} to="/add-task">Add Task</Link>
            <Link className={styles.link} to="/delete-task">Delete Task</Link>
            <Link className={styles.link} to="/add-result">Add Result</Link>
            <Link className={styles.link} to="/task-list">Task List</Link>
        </div>
    );
}

export default MainPage;
