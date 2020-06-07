import axios from 'axios'

// Prepare headers
let requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const token = localStorage.getItem('token')

if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`
}

// Create client
export default axios.create({
    baseURL: `https://soupify.herokuapp.com/api`,
    withCredentials: false,
    headers: requestHeaders
})