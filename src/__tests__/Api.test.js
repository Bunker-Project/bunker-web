import Api from '../Api';
import axiosMock from 'axios';
import 'jest-localstorage-mock';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFhYWQ2MWQ2LTUwMTEtNDEyNi04NmZhLWZlNWNjMDhjMTk5NyIsIm5iZiI6MTU4OTgzODAzNiwiZXhwIjoxNTg5OTI0NDM2LCJpYXQiOjE1ODk4MzgwMzZ9.dYawPPqG2GVkSNPQSzl1TmTkM4OHmgQjAWnNf0e8b1Q';
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

afterEach(() => {
    jest.clearAllMocks();
});

describe('general tests', () => {
    test('concatUrl', () => {
        let _api = new Api();

        let result = _api.concatUrl('items');

        expect(result).toBe(`${process.env.REACT_APP_API_URL}/items`);
    });
});

describe('posts methods testing', () => {
    test('handleToken', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        await _api.handleToken();

        expect(localStorage.setItem).toHaveBeenCalledWith("token", token);
    });

    test('login', async () => {

        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce(token);

        let response = await _api.login(login);

        expect(response).toBe(token);
    });

    test('get headers', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        let response = await _api.getHeaders();

        let expected = { "headers": { "Authorization": `Bearer ${token}` } };

        expect(localStorage.getItem).toHaveBeenCalledWith("token");
        expect(response).toStrictEqual(expected);

    });

    test('insert', async () => {
        let _api = new Api();

        //The first post call returns the token and the second is the insert
        axiosMock.post
            .mockResolvedValueOnce({
                data: token
            })
            .mockResolvedValueOnce('e393df28-f451-483d-8680-d7f3b25a8a4f');

        let response = await _api.insert('items', single_item);

        expect(axiosMock.post).toHaveBeenCalledTimes(2);
        expect(response).toBe('e393df28-f451-483d-8680-d7f3b25a8a4f');
    });

    // test('Check if a token is valid(Search the best way to do that', () => {});

});

describe('get methods testing', () => {
    test('get All', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.get.mockResolvedValueOnce({
            data: items
        });

        let response = await _api.getAll('items');

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(items);
    });

    test('get by ID', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.getById('items', 'e0deb807-bc3f-4686-b949-535ac78b2aec');

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(single_item);
    });

    test('search all together', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.searchAllTogether(1);

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(response.data).toStrictEqual(single_item);
    });

    test('search by string', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.get.mockResolvedValueOnce({
            data: single_item
        });

        let response = await _api.searchAllByString('test');

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
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

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.put.mockResolvedValueOnce("Item updated successfully");

        let response = await _api.update({ api: "items", data: { single_item } });

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.put).toHaveBeenCalledTimes(1);
        expect(response).toBe("Item updated successfully");
    });
});

describe('delete methods testing', () => {
    test('delete', async () => {
        let _api = new Api();

        //Login response
        axiosMock.post.mockResolvedValueOnce({
            data: token
        });

        axiosMock.delete.mockResolvedValueOnce("Item deleted successfully");

        let response = await _api.delete({ api: 'items', id: 'e0deb807-bc3f-4686-b949-535ac78b2aec' });

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
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
