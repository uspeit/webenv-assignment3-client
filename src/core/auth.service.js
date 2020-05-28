// export default class AuthService {
//     login(user) {
//         return axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
//     }

//     register(user) {
//         return axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
//     }
// }

const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiRWl0YW4iLCJsYXN0TmFtZSI6IkZlZGVua28iLCJpYXQiOjE1MTYyMzkwMjJ9.6b4DBqbFowolu0HMwEHNkM7dZGtOWrsRFI7Yk6QHwRM';

export default class AuthService {
    login() {
        return new Promise((resolve) => {
            resolve({
                data: {
                    token: TEST_TOKEN
                }
            });
        })
    }

    register() {
        return new Promise((resolve) => {
            resolve({
                data: {
                    token: TEST_TOKEN
                }
            });
        })
    }
}