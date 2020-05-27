import React from 'react';
import Edit from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';

const _guid = '5710d6bc-6201-4ddf-aedb-0abf88b34934'
const _keyGuid = '37faf287-7dbb-4908-93a5-91d8d7c8a51c'
const _description = 'test edition'
const _keyDescription = 'keyword 1'
const _title = 'title'

//Mock to be used to send as parameter because the edit page use it to get the info to set the fields to edit
var stateParam = {
    state: {
        id: _guid,
        description: _description,
        title: _title,
        keyWords: [
            {
                id: _keyGuid,
                description: _keyDescription,
            }
        ],
    }
}

test('check accessibility', async () => {
    const { container } = render(<Edit location={stateParam} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('check if the fields were correctly fullfiled with the values passed by parameter', () => {
    render(<Edit location={stateParam} />);

    const edit_item_title_input = screen.getByLabelText(/Title:/);
    const edit_item_description_input = screen.getByLabelText(/Content:/);
    const chip_text_label = screen.getByTestId('chip_text_label');

    expect(edit_item_title_input).toHaveValue(_title);
    expect(edit_item_description_input).toHaveValue(_description);
    expect(chip_text_label).toHaveTextContent(_keyDescription);
});

test('test calling the api', async () => {
    render(<Edit location={stateParam} />);

    const edit_item_save_button = screen.getByRole('button', { name: /SAVE/ });

    //Set the mock to return status code 200 if called
    axiosMock.put.mockResolvedValueOnce({ status: 200 });

    await waitFor(() => userEvent.click(edit_item_save_button));

    expect(axiosMock.put).toHaveBeenCalledTimes(1);
});

test('test validations', async () => {
    render(<Edit location={stateParam} />);

    //This was necessary because the axios mock was considering the call for put method called in the test above
    jest.clearAllMocks();

    const edit_item_title_input = screen.getByLabelText(/Title:/);
    const edit_item_description_input = screen.getByLabelText(/Content:/);
    const edit_item_save_button = screen.getByRole('button', { name: /SAVE/ });

    //Currently, the user-event library doesn't replace the values, this is already done but is not released yet
    //https://github.com/testing-library/user-event/issues/232
    fireEvent.change(edit_item_title_input, { target: { value: '' } });
    fireEvent.change(edit_item_description_input, { target: { value: '' } });

    //Set the mock to return status code 200 if called
    axiosMock.put.mockResolvedValueOnce({ status: 200 });

    await act(async () => { fireEvent.click(edit_item_save_button) });

    expect(screen.getByTestId('edit_item_error_description_label')).toHaveTextContent('The description must have a value');
    expect(axiosMock.put).not.toHaveBeenCalled();
    expect(screen.getByTestId('input_error_label_no_pwd')).toHaveTextContent('Title is required');

});

test('test dialog when cancel is clicked and yes inside the dialog is clicked', async () => {
    render(<Edit location={stateParam} />);

    const edit_item_cancel_button = screen.getByRole('button', { name: /CANCEL/ });

    userEvent.click(edit_item_cancel_button);

    //Check if the dialog to confirm the cancelling is opened
    expect(screen.getByRole('dialog', { name: /Are you sure?/ })).toBeInTheDocument();

    //Gets the button inside the dialog that is opened
    const edit_dialog_yes_button = screen.getByRole('button', { name: /Yes/ });

    //Click that button
    userEvent.click(edit_dialog_yes_button);

    expect(global.mockHistoryGoBack).toHaveBeenCalled();
});

test('test dialog when cancel is clicked and no inside the dialog is clicked', async () => {

    //To clear the global mocks used by the react-router-dom mock
    jest.clearAllMocks();

    render(<Edit location={stateParam} />);

    const edit_item_cancel_button = screen.getByRole('button', { name: /CANCEL/ });

    userEvent.click(edit_item_cancel_button);

    //Check if the dialog to confirm the cancelling is opened
    expect(screen.getByRole('dialog', { name: /Are you sure?/ })).toBeInTheDocument();

    //Gets the button inside the dialog that is opened
    const edit_dialog_no_button = screen.getByRole('button', { name: /No/ });

    userEvent.click(edit_dialog_no_button);

    //Check if the dialog has desapeared
    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Are you sure?/ })).not.toBeInTheDocument());
    //Check also if the goBack wasn't called accidentally
    expect(global.mockHistoryGoBack).not.toHaveBeenCalled();
});

test('checking error during update', async () => {
    render(<Edit location={stateParam} />);

    const edit_item_save_button = screen.getByRole('button', { name: /SAVE/ });

    //Set the mock to return status code 500 if called and show error message
    axiosMock.put.mockResolvedValueOnce({ status: 500 });

    userEvent.click(edit_item_save_button);

    await waitFor(() => expect(axiosMock.put).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText("It wasn't possible to update. Check the internet connection")).toBeInTheDocument());
});

test('test closing dialog when cancel is clicked', async () => {

    //To clear the global mocks used by the react-router-dom mock
    jest.clearAllMocks();

    render(<Edit location={stateParam} />);

    const edit_item_cancel_button = screen.getByRole('button', { name: /CANCEL/ });

    userEvent.click(edit_item_cancel_button);

    //Check if the dialog to confirm the cancelling is opened
    const edit_confirm_dialog = await waitFor(() => screen.getByRole('dialog', { name: /Are you sure?/ }));

    fireEvent.keyDown(edit_confirm_dialog, { key: 'Escape', code: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Are you sure?/ })));
});
