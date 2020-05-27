import Api from '../Api';
import axiosMock from 'axios';

test('testing login', () => {

    console.log(process.env.REACT_APP_API_URL);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFhYWQ2MWQ2LTUwMTEtNDEyNi04NmZhLWZlNWNjMDhjMTk5NyIsIm5iZiI6MTU4OTgzODAzNiwiZXhwIjoxNTg5OTI0NDM2LCJpYXQiOjE1ODk4MzgwMzZ9.dYawPPqG2GVkSNPQSzl1TmTkM4OHmgQjAWnNf0e8b1Q';
    axiosMock.post.mockResolvedValueOnce(token);

});