const axios = require('axios');

class Api {
    constructor({ isDev }) {
        this.state = {
            url: isDev ? 'https://localhost:44305/api' : '',
        }
    }

    //Concats the url 
    concatUrl(api){
        return `${this.state.url}/${api}`;
    }

    //Returns all the data of an object
    getAll({ api }) {
        return axios.get(this.concatUrl(api));
    }

    getById({ api, id }) {
        return axios.get(`${this.concatUrl(api)}/${id}`);
    }

}

export default Api;