// import jwt from 'jsonwebtoken';
import { store } from './store';
const axios = require('axios');


class Api {
    constructor() {
        this.url = process.env.REACT_APP_API_URL;

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
        console.log("Validating token", store.getState().auth);

        if (store.getState().auth.token !== null) {
            const { expiration } = store.getState().auth.token;

            console.log("Expiration date", expiration);

            if (Date.parse(expiration) > Date.now())
                return true;
        }
        // let { accessToken, expiration } = store.getState().auth.token; //localStorage.getItem("token");
        

        // if (accessToken === null || accessToken === "null")
        //     return false;

        // jwt.verify(token, 'anVzdGF0ZXN0Zm9ydGhlYXBp', async function (err, decoded) {
        //     if (err) {
        //         // if (err.name === 'TokenExpiredError') {
        //         // localStorage.setItem("token", null);
        //         validated = false;
        //         // }

        //     }
        // });

        return false;
    }

    // async handleToken() {
    //     let response = await this.login();

    //     // if (response !== undefined)
    //     //     localStorage.setItem("token", response.data.accessToken);
    // }

    async login(data) {

        if (data == null) {
            console.log("Data is null");
        }

        if (this.validateToken()) {
            // return localStorage.getItem("token");
            console.log("Token is valid", store.getState().auth.token);
            return store.getState().auth.token.accessToken;
        }

        //After login the store should be updated
        // return await axios.post(`${this.url}/login`, data);
        return await axios.post(`${this.url}/login`, data);
    }

    async getHeaders() {
        let token = await this.login();
        return {
            headers: {
                Authorization: `Bearer ${token}`
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

    async insert({ api, data, isSignUp }) {
        console.log("Chamando insert", this.concatUrl(api));
        if (isSignUp)
            return axios.post(this.concatUrl(api), data);
        else
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