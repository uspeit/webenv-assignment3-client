import axios from 'axios'

const getToken = () => localStorage.getItem('token');

// Create client
export default axios.create({
    baseURL: `https://soupify.herokuapp.com/api`,
    withCredentials: false,
    // Using lambda function to create headers on each request
    transformRequest: [function (data, headers) {
        const token = getToken();
        if (token)
            headers['Authorization'] = `Bearer ${token}`;
        return JSON.stringify(data)
    }],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})