const axios = require('axios');

class Api {
    constructor({ isDev }) {
        this.state = {
            url: isDev ? 'https://localhost:44305/api' : '',
            errorMessage: ''
        }

        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }

    //Concats the url 
    concatUrl(api) {
        return `${this.state.url}/${api}`;
    }

    //Returns all the data of an object
    getAll({ api }) {
        return axios.get(this.concatUrl(api));
    }

    getById({ api, id }) {
        return axios.get(`${this.concatUrl(api)}/${id}`);
    }

    insert({ api, data }) {
        return axios.post(this.concatUrl(api), data).then(response => {
            return response
        });
    }

    search({api, searchString}) {
        return axios.get(`${this.concatUrl(api)}/search/${searchString}`).then( response => {
            return response
        });
    }

    setMessageText(value) {
        this.setState({
            errorMessage: value
        });
    }

    getErrorMessage() {
        return this.state.errorMessage;
    }
    
    update({api, data}){
        return axios.put(`${this.concatUrl(api)}/${data.id}`, data).then( response => {
            return response
        });

    }
}

export default Api;