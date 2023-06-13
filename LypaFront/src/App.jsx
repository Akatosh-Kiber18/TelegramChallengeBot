import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import AddTaskPage from "./pages/AddTaskPage";
import AddResultPage from "./pages/AddResultPage";
import TaskListPage from "./pages/TaskListPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/add-task" component={AddTaskPage} />
                <Route path="/add-result" component={AddResultPage} />
                <Route path="/task-list" component={TaskListPage} />
            </Switch>
        </Router>
    );
}

export default App;
