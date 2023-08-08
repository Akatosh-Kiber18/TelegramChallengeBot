import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, postTask } from "../../rest/tasks.rest.js";
import { getUsers, postUser } from "../../rest/user.rest.js";

function TaskForm({ userData: { first_name, last_name, id }, tgApp }) {
    const [task, setTaskData] = useState({ name: "" });
    const [user, setUser] = useState({ name: "", tgId: "" });
    const [description, setDescription] = useState();

    useEffect(() => {
        const userName = `${first_name} ${last_name}`;
        setUser({ name: userName, tgId: id });
    }, [first_name, last_name, id]);

    const taskExist = async () => {
        try {
            const result = await getTasks();
            const exist = result.some((element) => element.Name === task.name.trim());
            return exist;
        } catch (error) {
            console.error(error);
        }
    };
    
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
  
    const handleSave = async () => {
        try {
            const exist = await taskExist();
            if (!exist) {
                await addUser(user);
                await postTask({
                    name: task.name.trim(),
                    description: description.trim()
                });
                tgApp.showAlert("Task '" + task.name + "' added!");
            } else {
                tgApp.showAlert("Task '" + task.name + "' already exists!");
            }
        } catch (error) {
            console.error(error);
        }
        setTaskData({name: ""});
        setDescription("");
    };
  
    const updateDesscription = (e) => {
        setDescription(e.target.value);
    }
  
    const handleInputChange = (e) => {
        setTaskData({
            name: e.target.value
        });
    };
  
    const handleCancel = () => {
        setTaskData({
            name: ""
        });
        setDescription("");
    };

    return (
        <div>
            <h2>Add Task</h2>
            <div>
                <input type="text" value={task.name} onChange={handleInputChange} />
                <span>
                    <h4>Description</h4>
                </span>
                <input type="text" value={description} onChange={updateDesscription}/>
            </div>
            <button onClick={handleSave}>Save</button>
            <button>
                <Link to={"/"} onClick={handleCancel}>
                    Cancel
                </Link>
            </button>
        </div>
    );
}  

export default TaskForm;
