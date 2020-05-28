import jwt from 'jsonwebtoken';
const axios = require('axios');


class Api {
    constructor() {
        this.state = {
            url: process.env.REACT_APP_API_URL,
            errorMessage: '',
            defaultUser: {
                username: 'doug',
                password: 'apiapi'
            }
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
        this.setDefaultUser = this.setDefaultUser.bind(this);

    }

    setDefaultUser(data){
        this.setState({
            defaultUser: data
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
        let response = await this.login();

        if (response !== undefined)
            localStorage.setItem("token", response.data);
    }

    async login(data) {
        
        if (data == null) 
            data = this.state.defaultUser;

        return await axios.post(`${this.state.url}/login`, data);
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
        return axios.post(this.concatUrl(api), data, await this.getHeaders());
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

    //Generic delete method for all entities
    async delete({ api, id }) {
        try {
            return axios.delete(`${this.concatUrl(api)}/${id}`, await this.getHeaders());
        } catch{
            return null;
        }
    }

    //Check if a username is available
    async checkUsername(username) {
        try {
            return axios.get(`${this.concatUrl("users")}/username/${username}`);
        } catch{
            return null;
        }
    }
}

export default Api;