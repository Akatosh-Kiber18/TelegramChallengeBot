import React from "react";

function TaskList() {
    // Assuming you receive the task list as a prop
    const tasks = [
        { id: 1, name: "Task 1" },
        { id: 2, name: "Task 2" },
        { id: 3, name: "Task 3" },
    ];

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.name} - {/* Render the corresponding result for each task */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
