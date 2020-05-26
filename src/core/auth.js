// export default class AuthModule {
//     login(user) {
//         return axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
//     }

//     register(user) {
//         return axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
//     }
// }

export default class AuthModule {
    login(user) {
        user.firstName = "FIRST_NAME";
        return new Promise((resolve) => {
            resolve({
                data: {
                    token: 'TEST_TOKEN',
                    user: user
                }
            });
        })
    }

    register(user) {
        user.firstName = "FIRST_NAME";
        return new Promise((resolve) => {
            resolve({
                data: {
                    token: 'TEST_TOKEN',
                    user: user
                }
            });
        })
    }
}