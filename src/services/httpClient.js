import axios from 'axios'

// Define our token source for lazy loading later
const getToken = () => localStorage.getItem('token');

// Create client
export default axios.create({
    baseURL: `https://soupify.herokuapp.com/api`,
    withCredentials: false,
    // Try attaching token upon sending a request
    transformRequest: [function (data, headers) {
        const token = getToken();
        if (token)
            headers['Authorization'] = `Bearer ${token}`;
        return JSON.stringify(data)
    }],
    // Headers
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})