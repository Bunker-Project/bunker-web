import jwt from 'jsonwebtoken';
const axios = require('axios');


class Api {
    url = '';
    // errorMessage = '';
    defaultUser = null;

    constructor() {
        this.url = process.env.REACT_APP_API_URL;
        this.defaultUser = {
            username: 'doug',
            password: 'apiapi'
        };

        axios.interceptors.response.use(function (response) {

            return response;
        }, function (error) {

            var response =
            {
                data: error,
                hasError: true
            }

            return response;
        });

        this.login = this.login.bind(this);
        this.insert = this.insert.bind(this);

    }

    validateToken() {
        let token = localStorage.getItem("token");
        let validated = true;

        if (token === null || token === "null")
            return false;

        jwt.verify(token, 'anVzdGF0ZXN0Zm9ydGhlYXBp', async function (err, decoded) {
            if (err) {
                // if (err.name === 'TokenExpiredError') {
                localStorage.setItem("token", null);
                validated = false;
                // }

            }
        });

        return validated;
    }

    async handleToken() {
        let response = await this.login();

        if (response !== undefined)
            localStorage.setItem("token", response.data);
    }

    async login(data) {
        
        if (data == null)
            data = this.defaultUser;//this has to be removed and it should get this info from the profile 

        if (this.validateToken()) {
            return localStorage.getItem("token");
        }
        return await axios.post(`${this.url}/login`, data);
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
        return `${this.url}/${api}`;
    }

    //Returns all the data of an object
    async getAll({ api }) {
        return axios.get(this.concatUrl(api), await this.getHeaders());

    }

    async getById({ api, id }) {
        return axios.get(`${this.concatUrl(api)}/${id}`, await this.getHeaders());

    }

    async insert({ api, data }) {
        return axios.post(this.concatUrl(api), data, await this.getHeaders());
    }

    // async searchByEntity({ api, searchString }) {
    //     try {
    //         return axios.get(`${this.concatUrl(api)}/search/${searchString}`, await this.getHeaders());
    //     } catch {
    //         return null;
    //     }
    // }

    // setMessageText(value) {
    //     this.errorMessage = value;
    // }

    // getErrorMessage() {
    //     return this.errorMessage;
    // }

    async update({ api, data }) {
        return axios.put(`${this.concatUrl(api)}/${data.id}`, data, await this.getHeaders());
    }

    async searchAllTogether(pageNumber) {
        return axios.get(`${this.url}/search?pageNumber=${pageNumber}`, await this.getHeaders());
    }

    async searchAllByString(searchString) {
        return axios.get(`${this.url}/search/${searchString}`, await this.getHeaders());
    }

    //Generic delete method for all entities
    async delete({ api, id }) {
        return axios.delete(`${this.concatUrl(api)}/${id}`, await this.getHeaders());
    }

    //Check if a username is available
    async checkUsername(username) {
        return axios.get(`${this.concatUrl("users")}/username/${username}`);
    }
}

export default Api;