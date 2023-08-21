import React from "react";
import TaskList from "../../components/TaskList/TaskList.jsx";

function TaskListPage({tgApp}) {
    return (
        <div>
            <TaskList tgApp={tgApp}/>
        </div>
    );
}

export default TaskListPage;
