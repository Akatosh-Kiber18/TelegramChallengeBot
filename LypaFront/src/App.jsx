import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.jsx";
import AddTaskPage from "./pages/AddTaskPage/AddTaskPage.jsx";
import AddResultPage from "./pages/AddResultPage/AddResultPage.jsx";
import TaskListPage from "./pages/TaskListPage/TaskListPage.jsx";
import DeleteTaskPage from "./pages/DeleteTaskPage/DeleteTaskPage.jsx";

const tgApp = window.Telegram.WebApp;
const initData = tgApp.initDataUnsafe;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/add-task" element={<AddTaskPage initData={initData} tgApp={tgApp}/>} />
                <Route path="/delete-task" element={<DeleteTaskPage tgApp={tgApp}/>} />
                <Route path="/add-result" element={<AddResultPage initData={initData} tgApp={tgApp}/>} />
                <Route path="/task-list" element={<TaskListPage tgApp={tgApp}/>} />
            </Routes>
        </Router>
    );
}

export default App;
