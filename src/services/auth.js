import store from '@/store/index'
import httpClient from '@/services/httpClient'

export default {

    // Begin login process
    login(userCredentials) {
        return store.dispatch("authenticate", userCredentials);
    },

    // Server authentication request
    authenticate(userCredentials) {
        return new Promise((resolve, reject) => {
            httpClient.post('/authenticate', userCredentials).then(
                response => {
                    store.dispatch("updateUser", response.data);
                    resolve(response);
                }
            ).catch(reason => reject(reason));
        });
    },

    // Perform registration
    register(userCredentials, userInfo) {
        return new Promise((resolve, reject) => {
            httpClient.post('/users', userCredentials)
                .then(
                    response => {
                        // Authenticate so we can PUT user info
                        this.login(userCredentials)
                            .then(token => {
                                if (response.data)
                                    var userId = response.data.id;

                                if (userId !== undefined) {
                                    httpClient.put(`/users/${userId}`, userInfo, {
                                        headers: { 'Authorization': `Bearer ${token}` }
                                    })
                                        .then(response => {
                                            store.dispatch("updateUser", response.data);
                                            resolve(response);
                                        })
                                        .catch(reason => reject(reason))
                                }
                            })
                            .catch(err => console.log(err));
                    }
                )
                .catch(reason => reject(reason))
        })
    },

    fetchUserData() {
        return new Promise((resolve, reject) => {
            if (store.getters.tokenPresent) {
                httpClient.get('/account').then(
                    response => {
                        store.dispatch("updateUser", response.data);
                        resolve(response);
                    }
                ).catch(reason => reject(reason));
            }
            else {
                resolve(undefined);
            }
        });
    }
}
