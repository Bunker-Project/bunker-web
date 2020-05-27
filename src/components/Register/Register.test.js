import React from 'react';
import Register from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';

const _description = 'test register';
const _keyDescription = 'keyword 1';
const _title = 'title';

test('check accessibility', async () => {
    const { container } = render(<Register />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('test calling the api', async () => {
    render(<Register />);

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
        .mockResolvedValueOnce({ status: 201 });

    userEvent.click(create_item_save_button);

    //It's gonna be called twice because the first time is to do the login, the second is the insert call
    await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(2));
});

test('test calling the api and returning error', async () => {
    render(<Register />);

    const error_message = 'An error occurred. Check your internet';
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