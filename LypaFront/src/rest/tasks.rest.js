import axios from "axios";

function onError(error) {
    alert(error);
    return Promise.reject(error);
}

export function getTasks() {
    return function () {
        axios.get("http://localhost:8000/tasks")
            .then(res => {return res.data;})
            .catch(onError);
    };
}