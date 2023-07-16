import React from "react";
import TaskForm from "../../components/TaskForm/TaskForm.jsx";

function AddTaskPage({ initData, tgApp }) {
    return (
        <div>
            <h1>Add Task Page</h1>
            <TaskForm userData={initData?.user} tgApp={tgApp}/>
        </div>
    );
}

export default AddTaskPage;
