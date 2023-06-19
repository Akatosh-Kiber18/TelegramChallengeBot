import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postTask } from "../../rest/tasks.rest";

function TaskForm() {
    const [taskData, setTaskData] = useState({
        name:"",
        chatId:""
    });

    const handleInputChange = (e) => {
        setTaskData({
            name: e.target.value,
            chatId: 12314213
        })
    };

    const handleSave = async () => {
        try {
          await postTask(taskData);
        } catch (error) {
          console.log(error);
        }
        setTaskData({ 
            name:"",
            chatId:""
        });
    };

    const handleCancel = () => {
        console.log("Task creation canceled");
        setTaskData({ 
            name:"",
            chatId:""
        });
    };

    return (
        <div>
            <h2>Add Task</h2>
            <input type="text" value={taskData.name} onChange={handleInputChange} />
            <button onClick={handleSave}>Save</button>
            <Link to={"/"} onClick={handleCancel}>Cancel</Link>
        </div>
    );
}

export default TaskForm;
