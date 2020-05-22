// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

//This enables to get the value to check if a route was correctly called
global.mockHistoryPush = mockHistoryPush;

//Creates a default mock for routes to be used for all tests
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockHistoryGoBack
    })
}));

//Creates a default mock for axios to be used for all tests
jest.mock('axios');

