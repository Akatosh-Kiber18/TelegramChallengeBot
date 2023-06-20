import axios from "axios";

function onError(error) {
    alert(error);
    return Promise.reject(error);
}
//TODO get rid of hardcoded url. use env
export async function getTasks() {
    return axios.get("http://localhost:8000/tasks")
        .then(res => res.data)
        .catch(onError);
}

export async function postTask(data) {
    try {
        const response = await axios.post("http://localhost:8000/tasks", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTask(data) {
    return axios.delete(`http://localhost:8000/tasks/${data.id}/${data.chatId}`)
        .then(res => res.data)
        .catch(onError);
}