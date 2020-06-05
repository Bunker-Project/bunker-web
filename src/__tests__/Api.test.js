import Api from '../Api';
import axiosMock from 'axios';
import 'jest-localstorage-mock';
import { setTokenInfo } from '../config/AccessTokenInfo';
import { signInSuccess, signInFail } from '../store/modules/auth/actions';
import auth from '../store/modules/auth/reducer';
import { store } from '../store';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiLCJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiXSwianRpIjoiN2U5NWVhYTIxYjI0NDYxMjk3OTczZjM5NzVmNzkyMjkiLCJuYmYiOjE1OTExMzg3NDksImV4cCI6MTU5MTE0MjM0OSwiaWF0IjoxNTkxMTM4NzQ5fQ.qMQRcp02hqICzlSVQcnlTLrgVZxH7xchML0y4XbbgDw';
const login =
{
    "username": "test",
    "password": "test123"
};
const items = [{
    "id": "ed655746-9812-4b9e-917f-c070fceaba2d",
    "title": "da5s4d09asd40a9s",
    "description": "dasd04a9sd",
    "keyWords": [
        {
            "id": "5c63fe07-4238-4965-92dd-8489ffa0dbba",
            "description": "da54s0d9a8",
            "itemId": "ed655746-9812-4b9e-917f-c070fceaba2d"
        }
    ],
    "createdAt": "2020-04-10T19:34:52.624756",
    "lastUpdate": "0001-01-01T00:00:00"
},
{
    "id": "e0deb807-bc3f-4686-b949-535ac78b2aec",
    "title": "d5a4s0d98as",
    "description": "da9s4d098sa",
    "keyWords": [
        {
            "id": "b7ff1284-d341-4377-be45-ee21cf22b9dd",
            "description": "dasd94sa",
            "itemId": "e0deb807-bc3f-4686-b949-535ac78b2aec"
        }
    ],
    "createdAt": "2020-04-10T19:34:57.504165",
    "lastUpdate": "0001-01-01T00:00:00"
}];

const single_item = {
    "id": "e393df28-f451-483d-8680-d7f3b25a8a4f",
    "title": "Test 1",
    "description": "Description for tests purpose",
    "keywords": [
        {
            "id": "65099c91-6071-4117-81ef-f7e1b53b0cc7",
            "description": "test insert keyword",
            "itemId": "e393df28-f451-483d-8680-d7f3b25a8a4f"
        }
    ]
};

const INITIAL_STATE = {
    refreshToken: null,
    id: null,
    signed: false,
    loading: false
};

var dt = new Date();
dt.setHours(dt.getHours() + 2);
const tokenMock = {
    "id": "c702eb0b-9541-4f03-9993-3f6bf9a2e49b",
    "authenticated": true,
    "createdAt": "2020-06-02 19:59:09",
    "expiration": dt.toString("yyyy-MM-dd HH:mm:ss"),
    "accessToken": token,
    "refreshToken": "99415b0490cd4591862caef8850f6e5a"
};

afterEach(() => {
    jest.clearAllMocks();
    //Clean the token's info
    setTokenInfo('');
    //To clean the properties from local storage
    store.dispatch(signInFail());
});

describe('general tests', () => {
    test('concatUrl', () => {
        let _api = new Api();

        let result = _api.concatUrl('items');

        expect(result).toBe(`${process.env.REACT_APP_API_URL}/items`);
    });

    test('validate token', () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        let response = _api.validateToken();

        expect(response).toBeTruthy();
    });

    test('validate null token', () => {
        let _api = new Api();

        let response = _api.validateToken();

        expect(response).toBeFalsy();
    });
});

describe('posts methods testing', () => {
    test('getToken when the access token is null', async () => {
        let _api = new Api();

        const tokenMock = {
            "id": "c702eb0b-9541-4f03-9993-3f6bf9a2e49b",
            "authenticated": true,
            "createdAt": "2020-06-02 19:59:09",
            "expiration": "2020-06-02 19:59:09",
            "accessToken": null,
            "refreshToken": "99415b0490cd4591862caef8850f6e5a"
        };

        setTokenInfo(tokenMock);

        let response = await _api.getToken();

        expect(response).toBeNull();
    });

    test('getToken no expired', async () => {

        store.dispatch(signInSuccess(tokenMock));

        setTokenInfo(tokenMock);

        let _api = new Api();

        let response = await _api.getToken();

        expect(response).toBe(token);
    });

    test('login', async () => {

        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: tokenMock
        });

        let response = await _api.login(login);

        expect(response.data.accessToken).toBe(token);
        expect(response.data.refreshToken).toBe('99415b0490cd4591862caef8850f6e5a');
    });

    test('get headers', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        //Login response
        // axiosMock.post.mockResolvedValueOnce({
        //     data: token
        // });

        let response = await _api.getHeaders();

        let expected = { "headers": { "Authorization": `Bearer ${token}` } };

        expect(response).toStrictEqual(expected);

    });

    test('insert', async () => {
        let _api = new Api();

        //The first post call returns the token and the second is the insert
        axiosMock.post
            .mockResolvedValueOnce('e393df28-f451-483d-8680-d7f3b25a8a4f');

        let response = await _api.insert('items', single_item);

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(response).toBe('e393df28-f451-483d-8680-d7f3b25a8a4f');
    });

    test('refresh token', async () => {

        let _api = new Api();

        let tokenExpired = {
            "id": "c702eb0b-9541-4f03-9993-3f6bf9a2e49b",
            "authenticated": true,
            "createdAt": "2020-06-02 19:59:09",
            "expiration": "2020-06-02 20:59:09",
            "refreshToken": "99415b0490cd4591862caef8850f6e5a",
            "accessToken": token,

        };

        //Need to set the local storage because it is used for the api and can't be null
        store.dispatch(signInSuccess(tokenExpired));

        setTokenInfo(tokenExpired);

        //Configures the post method on login
        axiosMock.post
            .mockResolvedValueOnce({
                data: tokenMock,
                status: 200
            });

        let response = await _api.getToken();
        expect(response).toBe(token);
    });

    test('test null refresh token', async () => {
        let _api = new Api();

        let response = await _api.refreshToken();

        expect(response).toBeNull();
    });

    test('sign up insert', async () => {
        let _api = new Api();

        //The first post call returns the token and the second is the insert
        axiosMock.post
            .mockResolvedValueOnce(tokenMock);

        let user = {
            "Id": "c702eb0b-9541-4f03-9993-3f6bf9a2e49b",
            "FirstName": "Zekinha",
            "LastName": "Breda",
            "Email": "zekinha@gmail.com",
            "Username": "zekinha",
            "PasswordAsString": "123"
        }

        let response = await _api.insert({ api: 'user', data: user, isSignUp: true });

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(response).toStrictEqual(tokenMock);
    });

});

describe('get methods testing', () => {
    test('get All', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.get.mockResolvedValueOnce({
            data: items
        });

        let response = await _api.getAll('items');

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(items);
    });

    test('get by ID', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.getById('items', 'e0deb807-bc3f-4686-b949-535ac78b2aec');

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(single_item);
    });

    test('search all together', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.searchAllTogether(1);

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(single_item);
    });

    test('search by string', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.searchAllByString('test');

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(single_item);
    });

    test('check username', async () => {
        let _api = new Api();

        axiosMock.get.mockResolvedValueOnce({
            data: true
        });

        let response = await _api.checkUsername('test');

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response).toBeTruthy();
    });
});

describe('put methods testing', () => {
    test('update', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.put.mockResolvedValueOnce("Item updated successfully");

        let response = await _api.update({ api: "items", data: { single_item } });

        expect(axiosMock.put).toHaveBeenCalledTimes(1);
        expect(response).toBe("Item updated successfully");
    });
});

describe('delete methods testing', () => {
    test('delete', async () => {
        let _api = new Api();

        setTokenInfo(tokenMock);

        axiosMock.delete.mockResolvedValueOnce("Item deleted successfully");

        let response = await _api.delete({ api: 'items', id: 'e0deb807-bc3f-4686-b949-535ac78b2aec' });

        expect(axiosMock.delete).toHaveBeenCalledTimes(1);
        expect(response).toBe("Item deleted successfully")
    });
});

// describe('exceptions', () => {
//     test('checking error when a exception occurs', async () => {
//         let _api = new Api();

//         //Login response
//         axiosMock.post.mockResolvedValueOnce({
//             data: token
//         });

//         axiosMock.get.mockRejectedValue("Server not responding");

//         let response = await _api.getAll({ api: 'items' });
//         console.log(axiosMock.interceptors.response);

//         // expect(response.data).toBe("Server not responding");
//         // expect(response.hasError).toBeTruthy();
//     });
// });
