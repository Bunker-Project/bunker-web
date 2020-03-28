import jwt from 'jsonwebtoken';
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

    validateToken() {
        let token = localStorage.getItem("token");
        let validated = true;

        if (token === null || token === "null")
            return false;

        jwt.verify(token, 'anVzdGF0ZXN0Zm9ydGhlYXBp', async function (err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    localStorage.setItem("token", null);
                    validated = false;
                }
            }
        });

        return validated;
    }

    async handleToken() {
        let response = await this.getToken();
        localStorage.setItem("token", response.data);
    }

    async getToken() {
        return await axios.post(`${this.state.url}/login`, {
            username: 'doug',
            password: 'apiapi'
        });
    }

    getHeaders() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    }

    //Concats the url 
    concatUrl(api) {
        return `${this.state.url}/${api}`;
    }

    //Returns all the data of an object
    async getAll({ api }) {
        if (!this.validateToken())
            await this.handleToken();

        return axios.get(this.concatUrl(api), this.getHeaders());
    }

    getById({ api, id }) {
        return axios.get(`${this.concatUrl(api)}/${id}`, this.getHeaders());
    }

    insert({ api, data }) {
        return axios.post(this.concatUrl(api), data, this.getHeaders());
    }

    search({ api, searchString }) {
        return axios.get(`${this.concatUrl(api)}/search/${searchString}`, this.getHeaders());
    }

    setMessageText(value) {
        this.setState({
            errorMessage: value
        });
    }

    getErrorMessage() {
        return this.state.errorMessage;
    }

    update({ api, data }) {
        return axios.put(`${this.concatUrl(api)}/${data.id}`, data, this.getHeaders());
    }
}

export default Api;