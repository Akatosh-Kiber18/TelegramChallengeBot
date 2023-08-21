import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTaskList, getTask } from "../../rest/tasks.rest";
import styles from "./TaskList.module.css";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    async function prepareTasks() {
      try {
        const result = await getTaskList();

        const tasksArray = [];
        result.forEach((taskObj) => {
          const taskName = Object.keys(taskObj)[0];
          const userAndScores = taskObj[taskName];

          Object.entries(userAndScores).forEach(([user, result]) => {
            tasksArray.push({ task: taskName, user, result });
          });
        });

        setTaskList(tasksArray);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    prepareTasks();
  }, []);

  const handleSort = (column) => {
    if (column === sortBy) {
      setTaskList([...taskList].reverse());
    } else {
      setTaskList([...taskList].sort((a, b) => (a[column] > b[column] ? 1 : -1)));
    }
    setSortBy(column);
  };

  const showTaskDescription = async (name) => {
    const task = await getTask(name);
    tgApp.showAlert(`${task.Description}`);
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>Scoreboard</h2>
        <button className={styles.buttonContainer}>
          <Link className={styles.linkButton} to={"/"}>Cancel</Link>
        </button>
      </div>
    <div className={styles.tableContainer}>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort("task")}>Task</th>
            <th onClick={() => handleSort("user")}>User</th>
            <th onClick={() => handleSort("result")}>Result</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((taskObj, index) => (
            <tr key={index}>
              <td onClick={() => showTaskDescription(taskObj.task)}>{taskObj.task}</td>
              <td>{taskObj.user}</td>
              <td>{taskObj.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default TaskList;
