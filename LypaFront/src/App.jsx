import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.jsx";
import AddTaskPage from "./pages/AddTaskPage/AddTaskPage.jsx";
import AddResultPage from "./pages/AddResultPage/AddResultPage.jsx";
import TaskListPage from "./pages/TaskListPage/TaskListPage.jsx";
import DeleteTaskPage from "./pages/DeleteTaskPage/DeleteTaskPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/add-task" element={<AddTaskPage />} />
                <Route path="/delete-task" element={<DeleteTaskPage />} />
                <Route path="/add-result" element={<AddResultPage />} />
                <Route path="/task-list" element={<TaskListPage />} />
            </Routes>
        </Router>
    );
}

export default App;
