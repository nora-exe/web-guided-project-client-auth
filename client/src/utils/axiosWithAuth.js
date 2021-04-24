import axios from 'axios';

export const axiosWithAuth = () => {
    // returns a new instance of axios with config object built in
    return axios.create({
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem('token')),
        },
        baseURL:"http://localhost:5000",
    });
};