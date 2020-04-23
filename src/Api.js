import jwt from 'jsonwebtoken';
const axios = require('axios');


class Api {
    constructor({ isDev }) {
        this.state = {
            url: isDev ? 'http://localhost:44305/api' : '',
            errorMessage: ''
        };

        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return error.response;
        });

        this.login = this.login.bind(this);

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
        let response = await this.login();
        localStorage.setItem("token", response.data);
    }

    async login(data) {
        return await axios.post(`${this.state.url}/login`, data);
        // {
        //     username: 'doug',
        //     password: 'apiapi'
        // });
    }

    

    async getHeaders() {
        await this.handleToken();
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
        try {
            if (!this.validateToken())
                await this.handleToken();

            return axios.get(this.concatUrl(api), await this.getHeaders());
        } catch{
            return null;
        }
    }

    async getById({ api, id }) {
        try {
            return axios.get(`${this.concatUrl(api)}/${id}`, await this.getHeaders());
        } catch {
            return null;
        }
    }

    async insert({ api, data }) {
        try {
            return axios.post(this.concatUrl(api), data, await this.getHeaders());
        } catch {
            return null;
        }
    }

    async searchByEntity({ api, searchString }) {
        try {
            return axios.get(`${this.concatUrl(api)}/search/${searchString}`, await this.getHeaders());
        } catch {
            return null;
        }
    }

    setMessageText(value) {
        this.setState({
            errorMessage: value
        });
    }

    getErrorMessage() {
        return this.state.errorMessage;
    }

    async update({ api, data }) {
        try {
            return axios.put(`${this.concatUrl(api)}/${data.id}`, data, await this.getHeaders());
        } catch{
            return null;
        }
    }

    async searchAllTogether(pageNumber) {
        try {
            return axios.get(`${this.state.url}/search?pageNumber=${pageNumber}`, await this.getHeaders());
        } catch{
            return null;
        }
    }

    async searchAllByString(searchString) {
        try {
            return axios.get(`${this.state.url}/search/${searchString}`, await this.getHeaders());
        } catch {
            return null;
        }
    }

    async delete({ api, id }) {
        try {
            return axios.delete(`${this.concatUrl(api)}/${id}`, await this.getHeaders());
        } catch{
            return null;
        }
    }
}

export default Api;