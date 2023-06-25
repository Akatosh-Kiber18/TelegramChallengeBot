import axios from "axios";

function onError(error) {
    alert(error);
    return Promise.reject(error);
}

export async function saveResult(data) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/result`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getResults() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/results`)
        .then(res => res.data)
        .catch(onError);
}









