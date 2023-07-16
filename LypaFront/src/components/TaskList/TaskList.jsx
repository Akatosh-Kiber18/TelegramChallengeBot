import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTaskList } from "../../rest/tasks.rest";

function TaskList() {
    // Assuming you receive the task list as a prop
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        async function prepareTasks() {
            try {
                const data = {
                    chatId: 12314213
                };
                const result = await getTaskList(data);
                setTaskList(result);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
  
        prepareTasks();
    }, []);
    console.log(taskList);
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {taskList.map((taskObj, index) => {
                    const taskName = Object.keys(taskObj)[0];
                    const userScores = taskObj[taskName];

                    return (
                        <li key={index}>
                            <strong>{taskName}:</strong>
                            <ul>
                                {Object.entries(userScores).map(([userName, score]) => (
                                    <li key={userName}>
                                        {userName}: {score}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <button><Link to={"/"} >Cancel</Link></button>
        </div>
    );
}

export default TaskList;
