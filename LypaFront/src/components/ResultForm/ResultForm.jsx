import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../../rest/tasks.rest.js";
import { saveResult } from "../../rest/result.rest.js";

function ResultForm({initData}) {
    const [selectedTask, setSelectedTask] = useState({});
    const [tasks, setTasks] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() => {
        async function prepareTasksToDisplay() {
            try {
                const result = await getTasks();
                setTasks(result);
                console.log(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    
        prepareTasksToDisplay();
    }, []);
    //TODO get rid of hardcoded chatID and userID
    const handleSave = async () => {
        const task = tasks.find((task) => task.id == selectedTask && task.ChatID === 12314213);
        const taskId = task ? task.id : null;
        const data = {
            taskId: taskId,
            userId: 5,
            score: result,
            chatId: 12314213
        };
        try {
            await saveResult(data);
            setResult("");
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleCancel = () => {
        // Logic to handle cancel
        console.log("Adding result canceled");
        // Clear the input field
        setResult("");
    };

    return (
        <div>
            <h2>Add Result</h2>
            <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
            >
                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.Name}
                    </option>
                ))}
            </select>
            <input type="text" value={result} onChange={(e) => setResult(e.target.value)}/>
            <button onClick={handleSave}>Save</button>
            <button><Link to={"/"} onClick={handleCancel}>Cancel</Link></button>
        </div>
    );
}

export default ResultForm;
