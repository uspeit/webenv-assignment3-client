import { BASE_URL } from '@/services/httpClient'
import store from '@/store/index'


export default {
    uploadImg(formData) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open("POST", BASE_URL + '/upload');

            request.setRequestHeader('Authorization', 'Bearer ' + store.getters.token);
            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    let response = JSON.parse(request.response);
                    resolve(response.url);
                } else {
                    reject("Error " + request.status + " occurred when trying to upload your file.");
                }
            };
            request.send(formData);
        })
    }
}