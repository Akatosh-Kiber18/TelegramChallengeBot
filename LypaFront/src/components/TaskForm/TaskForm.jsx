import React, { useState } from 'react';

function TaskForm() {
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSave = () => {
    // Logic to save the task
    console.log('Task saved:', task);
    // Clear the input field
    setTask('');
  };

  const handleCancel = () => {
    // Logic to handle cancel
    console.log('Task creation canceled');
    // Clear the input field
    setTask('');
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input type="text" value={task} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default TaskForm;
