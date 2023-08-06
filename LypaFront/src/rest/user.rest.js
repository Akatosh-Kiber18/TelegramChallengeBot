import axios from "axios";

function onError(error) {
    console.error(error);
    return Promise.reject(error);
}

export async function getUsers() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then(res => res.data)
        .catch(onError);
}

export async function postUser(data) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}