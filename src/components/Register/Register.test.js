import React from 'react';
import Register from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { setTokenInfo } from '../../config/AccessTokenInfo';

const _description = 'test register';
const _keyDescription = 'keyword 1';
const _title = 'title';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiLCJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiXSwianRpIjoiN2U5NWVhYTIxYjI0NDYxMjk3OTczZjM5NzVmNzkyMjkiLCJuYmYiOjE1OTExMzg3NDksImV4cCI6MTU5MTE0MjM0OSwiaWF0IjoxNTkxMTM4NzQ5fQ.qMQRcp02hqICzlSVQcnlTLrgVZxH7xchML0y4XbbgDw';

test('check accessibility', async () => {
    const { container } = render(<Register />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('test calling the api', async () => {
    render(<Register />);

    var dt = new Date();
    dt.setHours(dt.getHours() + 2);
    let tokenMock = {
        "id": "c702eb0b-9541-4f03-9993-3f6bf9a2e49b",
        "authenticated": true,
        "createdAt": "2020-06-02 19:59:09",
        "expiration": dt.toString("yyyy-MM-dd HH:mm:ss"),
        "accessToken": token,
        "refreshToken": "99415b0490cd4591862caef8850f6e5a"
    };

    setTokenInfo(tokenMock);

    const create_item_save_button = screen.getByRole('button', { name: /SAVE/ });
    const register_title_input = screen.getByLabelText('Title:');
    const register_content_input = screen.getByLabelText('Content:');

    userEvent.type(register_title_input, _title);
    userEvent.type(register_content_input, _description);

    //Add a chip
    const register_keywords_input = screen.getByLabelText('Keywords:');
    userEvent.type(register_keywords_input, _keyDescription);
    fireEvent.keyDown(register_keywords_input, { key: 'Enter', code: 'Enter' });

    //Set the mock. First call for login call and the second for the insert command call
    axiosMock.post
        .mockResolvedValueOnce({ status: 201 });

    userEvent.click(create_item_save_button);

    await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));
});

test('test calling the api and returning error', async () => {
    render(<Register />);

    const error_message = "It wasn't possible to update. Check the internet connection";
    const create_item_save_button = screen.getByRole('button', { name: /SAVE/ });
    const register_title_input = screen.getByLabelText('Title:');
    const register_content_input = screen.getByLabelText('Content:');

    userEvent.type(register_title_input, _title);
    userEvent.type(register_content_input, _description);

    //Add a chip
    const register_keywords_input = screen.getByLabelText('Keywords:');
    userEvent.type(register_keywords_input, _keyDescription);
    fireEvent.keyDown(register_keywords_input, { key: 'Enter', code: 'Enter' });

    //Set the mock. First call for login call and the second for the insert command call
    axiosMock.post
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce({ status: 500, statusText: error_message });

    userEvent.click(create_item_save_button);

    //It's gonna be called twice because the first time is to do the login, the second is the insert call
    await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.getByText(error_message)).toBeInTheDocument());
});

test('test validations', async () => {
    render(<Register />);

    //This was necessary because the axios mock was considering the call for put method called in the test above
    jest.clearAllMocks();

    const register_item_save_button = screen.getByRole('button', { name: /SAVE/ });

    //Set the mock to return status code 200 if called
    axiosMock.post.mockResolvedValueOnce({ status: 200 });

    await act(async () => { userEvent.click(register_item_save_button) });

    expect(screen.getByText('The description must have a value')).toBeInTheDocument();
    expect(axiosMock.post).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required')).toBeInTheDocument();

});

test('test chips', () => {
    render(<Register />);

    const register_keywords_input = screen.getByLabelText('Keywords:');

    userEvent.type(register_keywords_input, _keyDescription);
    fireEvent.keyDown(register_keywords_input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(_keyDescription)).toBeInTheDocument();
});

test('test when cancel is clicked', () => {
    render(<Register />);

    const register_go_back_button = screen.getByRole('button', { name: /BACK/ });

    userEvent.click(register_go_back_button);

    expect(global.mockHistoryPush).toHaveBeenCalledWith('/');
});

test('test removing chips', async () => {
    render(<Register />);

    const register_keywords_input = screen.getByLabelText('Keywords:');

    userEvent.type(register_keywords_input, _keyDescription);

    fireEvent.keyDown(register_keywords_input, { key: 'Enter', code: 'Enter' });

    const chip_close_button = screen.getByRole('button', { name: /Close button/ });

    userEvent.click(chip_close_button);

    await waitFor(() => expect(screen.queryByRole(_keyDescription)).not.toBeInTheDocument());
});