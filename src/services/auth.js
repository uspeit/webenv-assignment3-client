import store from '@/store/index'
import httpClient from '@/services/httpClient'

export default {

    // Begins authentication process
    login(userCredentials) {
        return store.dispatch("authenticate", userCredentials);
    },

    // Updates current user in our store
    updateCurrentUser(userInfo) {
        return store.dispatch("updateUser", userInfo);
    },

    // Server login request
    authenticate(userCredentials) {
        return new Promise((resolve, reject) => {
            httpClient.post('/authenticate', userCredentials).then(
                response => {
                    this.updateCurrentUser(response.data);
                    resolve(response);
                }
            ).catch(reason => reject(reason));
        });
    },

    // Registers user and authenticates
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
                                            this.updateCurrentUser(response.data);
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
    }
}
