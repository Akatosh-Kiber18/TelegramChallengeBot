import React from "react";
import TaskForm from "../../components/TaskForm/TaskForm.jsx";

function AddTaskPage({ initData, tgApp }) {
    return (
        <div>
            <TaskForm userData={initData?.user} tgApp={tgApp}/>
        </div>
    );
}

export default AddTaskPage;
