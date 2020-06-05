import React from 'react';
import Secret from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { setTokenInfo } from '../../config/AccessTokenInfo';

const edit_location_values = {
    "pathname": "/editSecret",
    "state": {
        "isEditing": true,
        "secret": {
            "id": "c6a299df-6294-4149-b334-b58c972f3b0b",
            "password": "editing123",
            "secretId": "editing"
        }
    }
};

const register_location_values = {
    "pathname": "/editSecret",
    "state": {
        "isEditing": false
    }
};

const new_secret_password = "inserting123";
const new_secret_secretId = "inserting";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiLCJjNzAyZWIwYi05NTQxLTRmMDMtOTk5My0zZjZiZjlhMmU0OWIiXSwianRpIjoiN2U5NWVhYTIxYjI0NDYxMjk3OTczZjM5NzVmNzkyMjkiLCJuYmYiOjE1OTExMzg3NDksImV4cCI6MTU5MTE0MjM0OSwiaWF0IjoxNTkxMTM4NzQ5fQ.qMQRcp02hqICzlSVQcnlTLrgVZxH7xchML0y4XbbgDw';

test('checking accessibility', async () => {
    const { container } = render(<Secret location={edit_location_values} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

describe('test in edition mode', () => {
    test('checking if the inputs are correctly fullfiled when in editing mode', async () => {
        render(<Secret location={edit_location_values} />);

        const secret_id_input = screen.getByLabelText('Your ID:');
        const secret_password_input = screen.getByLabelText('Your password:');

        expect(secret_id_input).toHaveValue('editing');
        expect(secret_password_input).toHaveValue('editing123');
    });

    test('test editing values', async () => {

        jest.clearAllMocks();

        render(<Secret location={edit_location_values} />);

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

        //Configure the mock when the login is done
        // axiosMock.post.mockResolvedValueOnce(true);
        //Configure the put result on update 
        axiosMock.put.mockResolvedValueOnce({ status: 201 });

        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.click(secret_save_button);

        // await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(axiosMock.put).toHaveBeenCalledTimes(1));
    });

    test('checking routes when an edition is cancelled', async () => {
        render(<Secret location={edit_location_values} />);

        const secret_back_button = screen.getByRole('button', { name: /BACK/ });

        userEvent.click(secret_back_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith('/search');
    });

    test('check error message', async () => {

        render(<Secret location={edit_location_values} />);

        const error_message = 'error during update';
        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        //Configure the mock when the login is done
        axiosMock.post.mockResolvedValueOnce(true);
        //Configure the put result on update 
        axiosMock.put.mockResolvedValueOnce({ status: 500, statusText: error_message });

        userEvent.click(secret_save_button);

        await waitFor(() => expect(screen.getByText(error_message)).toBeInTheDocument());

    });

});


describe('tests in insert mode', () => {
    test('checking if in insert mode the inputs are empty', () => {
        render(<Secret location={register_location_values} />);

        const secret_id_input = screen.getByLabelText('Your ID:');
        const secret_password_input = screen.getByLabelText('Your password:');

        expect(secret_id_input).toBeEmpty();
        expect(secret_password_input).toBeEmpty();

    });

    test('test inserting values', async () => {
        render(<Secret location={register_location_values} />);

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

        //Restore the implementations because .mockClear resets usage data but not implementation. mockRestore() resets everything, which includes usage data, implementation and mock name
        axiosMock.post.mockRestore();

        //Configure the mock when the login is done and the second call that is the update call
        axiosMock.post
            .mockResolvedValueOnce({ status: 201 });

        const secret_id_input = screen.getByLabelText('Your ID:');
        const secret_password_input = screen.getByLabelText('Your password:');
        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.type(secret_id_input, new_secret_secretId);
        userEvent.type(secret_password_input, new_secret_password);

        userEvent.click(secret_save_button);

        
        await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(screen.getByText('Secret created successfully')).toBeInTheDocument());
    });

    test('checking validations', async () => {

        render(<Secret location={register_location_values} />);

        axiosMock.post
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce({ status: 201 });

        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.click(secret_save_button);

        await waitFor(() => expect(screen.getByText('The ID is required')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('The password is required')).toBeInTheDocument());

    });

    test('checking routes when an insertion is cancelled', async () => {
        render(<Secret location={register_location_values} />);

        const secret_back_button = screen.getByRole('button', { name: /BACK/ });

        userEvent.click(secret_back_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith('/');
    });

    test('check error message', async () => {

        render(<Secret location={register_location_values} />);

        const error_message = "It wasn't possible to update. Check the internet connection";
        
        const secret_id_input = screen.getByLabelText('Your ID:');
        const secret_password_input = screen.getByLabelText('Your password:');
        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.type(secret_id_input, new_secret_secretId);
        userEvent.type(secret_password_input, new_secret_password);

        //Restore the implementations because .mockClear resets usage data but not implementation. mockRestore() resets everything, which includes usage data, implementation and mock name
        axiosMock.post.mockRestore();
        //Configure the mock when the login is done
        axiosMock.post
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce({ status: 500 });

        userEvent.click(secret_save_button);

        await waitFor(() => expect(screen.getByText(error_message)).toBeInTheDocument());

    });
});








