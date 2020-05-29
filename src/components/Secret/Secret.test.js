import React from 'react';
import Secret from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';

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

        //Configure the mock when the login is done
        axiosMock.post.mockResolvedValueOnce(true);
        //Configure the put result on update 
        axiosMock.put.mockResolvedValueOnce({ status: 201 });

        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.click(secret_save_button);

        await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));
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

        //Restore the implementations because .mockClear resets usage data but not implementation. mockRestore() resets everything, which includes usage data, implementation and mock name
        // axiosMock.post.mockRestore();

        //Configure the mock when the login is done and the second call that is the update call
        axiosMock.post
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce({ status: 201 });

        const secret_id_input = screen.getByLabelText('Your ID:');
        const secret_password_input = screen.getByLabelText('Your password:');
        const secret_save_button = screen.getByRole('button', { name: /SAVE/ });

        userEvent.type(secret_id_input, new_secret_secretId);
        userEvent.type(secret_password_input, new_secret_password);

        userEvent.click(secret_save_button);

        await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(2));
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








