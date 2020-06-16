// import jwt from 'jsonwebtoken';
import { store } from './store';
import { getTokenInfo, setTokenInfo } from './config/AccessTokenInfo';
import { setRefreshToken } from './store/modules/auth/actions';
const axios = require('axios');


class Api {

    constructor() {
        this.url = process.env.REACT_APP_API_URL;

        axios.interceptors.response.use(function (response) {
            console.log("The response returned", response);
            return response;
        }, function (error) {

            //Check if has the property data which indicates that the API returned a custom error
            if (error.hasOwnProperty('data')){
                return {
                    status: error.response.data.Status,
                    message: error.response.data.Message
                }
            }
            else if(error.toString().toLowerCase().includes("network error")){
                //Otherwise, the server wasn't reached and perhaps is out of service
                return {
                    status: 500,
                    message: "😔 Unable to connect with the server"
                };
            }
                
        });

        this.login = this.login.bind(this);
        this.insert = this.insert.bind(this);

    }

    validateToken() {
        let tokenInfo = getTokenInfo();

        if (tokenInfo.accessToken !== null) {
            if (Date.parse(tokenInfo.expiration) > Date.now())
                return true;
        }

        return false;
    }

    async login(data) {
        let response = await axios.post(`${this.url}/login`, data);
        return response;
    }

    async refreshToken() {
        const { refreshToken, id } = store.getState().auth;

        if (refreshToken) {
            let data = {
                grantType: 'refresh_token',
                id: id,
                refreshToken: refreshToken
            };

            let response = await this.login(data);

            if (response.status === 200) {
                setTokenInfo(response.data);
                setRefreshToken(response.data);

                return response.data;
            }
        }
        else
            return null;
    }

    //Validates and make a request to refresh the token in case of it is invalid
    async getToken() {
        let tokenInfo = getTokenInfo();

        if (tokenInfo.accessToken !== null) {
            if (Date.parse(tokenInfo.expiration) < Date.now()) {
                let { accessToken } = await this.refreshToken(tokenInfo.id);

                if (accessToken !== null)
                    return accessToken;
            } else
                return tokenInfo.accessToken;
        }

        return null;
    }

    async getHeaders() {
        let token = await this.getToken();
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
        if (isSignUp)
            return axios.post(this.concatUrl(api), data);
        else
            return axios.post(this.concatUrl(api), data, await this.getHeaders());

    }

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