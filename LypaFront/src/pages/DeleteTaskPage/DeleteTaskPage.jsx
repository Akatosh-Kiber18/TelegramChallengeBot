import React from "react";
import DeleteTask from "../../components/DeleteTask/DeleteTask.jsx";

function DeleteTaskPage({tgApp}) {
    return (
        <div>
            <h1>Delete Task Page</h1>
            <DeleteTask tgApp={tgApp}/>
        </div>
    );
}

export default DeleteTaskPage;
