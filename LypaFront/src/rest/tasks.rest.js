import axios from "axios";

function onError(error) {
    alert(error);
    return Promise.reject(error);
}

export async function getTasks() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`)
        .then(res => res.data)
        .catch(onError);
}

export async function postTask(data) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTask(data) {
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${data.id}/${data.chatId}`)
        .then(res => res.data)
        .catch(onError);
}