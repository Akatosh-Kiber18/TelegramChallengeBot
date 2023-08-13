import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../../rest/tasks.rest.js";
import { saveResult } from "../../rest/result.rest.js";
import { getUsers, postUser } from "../../rest/user.rest.js";
import styles from  "./ResultForm.module.css";

function ResultForm({userData: { first_name, last_name, id }, tgApp}) {
    const [selectedTask, setSelectedTask] = useState();
    const [user, setUser] = useState({ name: "", tgId: "" });
    const [tasks, setTasks] = useState([]);
    const [result, setResult] = useState("");
    const [desctiption, setDescription] = useState("");

    useEffect(() => {
        const userName = `${first_name} ${last_name}`;
        setUser({ name: userName, tgId: id });
    }, [first_name, last_name, id]);
    
    const userExist = async () => {
        try {
            const result = await getUsers();
            const exist = result.some((element) => element.TgId === user.tgId);
            return exist;
        } catch (error) {
            console.error(error);
        }
    };
  
    const addUser = async () => {
        try {
            const exist = await userExist(); 
            if (!exist) {
                await postUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function prepareTasksToDisplay() {
            try {
                const result = await getTasks();
                setTasks(result);
                if(result.length > 0) {
                    setSelectedTask(result[0].Name);
                    setDescription(result[0].Description);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    
        prepareTasksToDisplay();
    }, []);

    const handleSave = async () => {
        await addUser();
        const users = await getUsers();
        const curUser = users.find((usr) => usr.TgID == user.tgId)
        const task = tasks.find((task) => task.Name == selectedTask);
        const taskId = task ? task.id : null;
        const data = {
            taskId: taskId,
            userId: curUser.id,
            score: result,
        };

        const scoreRegex = /^[0-9]+$/;
        if (!scoreRegex.test(data.score)) {
            tgApp.showAlert("Invalid score. Score must be a number.");
            setResult("");
            return;
        }

        try {
            await saveResult(data);
            tgApp.showAlert(`Score added for ${task.Name}`);
            setResult("");
        } catch (error) {
            tgApp.showAlert(`Failed while adding result for ${task.Name}`);
            console.error("Error while adding result:", error);
        }
    };

    const updateDescription = async (taskName) => {
        const task = await tasks.find((task) => task.Name == taskName);
        setDescription(task.Description);
    }

    const handleCancel = () => {
        setResult("");
    };

    return (
        <div>
            <h2>Add Result</h2>
            <select
                className={styles.optionField}
                value={selectedTask}
                onChange={(e) => {setSelectedTask(e.target.value); updateDescription(e.target.value)}}
            >
                {tasks.map((task) => (
                    <option key={task.id} value={task.Name}>
                        {task.Name}
                    </option>
                ))}
            </select>
            <input type="text" value={result} onChange={(e) => setResult(e.target.value)}/>
            <h3>Description of the task:</h3>
            <p>{desctiption ? desctiption : "No description"}</p>
            <div className={styles.buttonContainer}>
                <button onClick={handleSave}>Save</button>
                <button><Link to={"/"} className={styles.linkButton} onClick={handleCancel}>Cancel</Link></button>
            </div>
        </div>
    );
}

export default ResultForm;
