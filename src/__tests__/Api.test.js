import Api from '../Api';
import axiosMock from 'axios';
import 'jest-localstorage-mock';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFhYWQ2MWQ2LTUwMTEtNDEyNi04NmZhLWZlNWNjMDhjMTk5NyIsIm5iZiI6MTU4OTgzODAzNiwiZXhwIjoxNTg5OTI0NDM2LCJpYXQiOjE1ODk4MzgwMzZ9.dYawPPqG2GVkSNPQSzl1TmTkM4OHmgQjAWnNf0e8b1Q';
const login =
{
    "username": "test",
    "password": "test123"
};

describe('all posts methods testing', () => {
    test('handleToken', async () => {
        var _api = new Api();

        axiosMock.post.mockResolvedValueOnce(token);

        _api.setDefaultUser(login);

        await _api.handleToken();

        expect(localStorage.setItem).toHaveBeenCalledWith("token", undefined);
    });

    test('login', async () => {

        var _api = new Api();

        axiosMock.post.mockResolvedValueOnce(token);

        let response = await _api.login(login);

        expect(response).toBe(token);
    });

    test('get headers', () => {
        var _api = new Api();

        _api.setDefaultUser(login);

        axiosMock.post.mockResolvedValueOnce(token);
    });

    // test('Check if a token is valid(Search the best way to do that', () => {});

    
    
});
