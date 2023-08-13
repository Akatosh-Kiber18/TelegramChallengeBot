import React from "react";
import DeleteTask from "../../components/DeleteTask/DeleteTask.jsx";

function DeleteTaskPage({tgApp}) {
    return (
        <div>
            <DeleteTask tgApp={tgApp}/>
        </div>
    );
}

export default DeleteTaskPage;
