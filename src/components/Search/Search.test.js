import React from 'react';
import Search from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const secret_values = [{
    "type": "secret",
    "value": {
        "lazyLoader": {},
        "id": "c6a299df-6294-4149-b334-b58c972f3b0b",
        "secretId": "diauihdahd",
        "createdAt": "2020-04-16T14:53:28.646735",
        "lastUpdate": "0001-01-01T00:00:00",
        "passwordAsString": "iuhdauihdas"
    }
}];

const item_values = [{
    "type": "item",
    "value": {
        "keyWords": [
            {
                "id": "b8dd50eb-9d72-41bf-b166-cb16b19a2616",
                "description": "test1",
                "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
            },
            {
                "id": "a42ca7f2-f4c4-40fa-afa8-41f300491b06",
                "description": "test2",
                "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
            }
        ],
        "lazyLoader": {},
        "id": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa",
        "title": "new ui test",
        "description": "dnaouidasdasid",
        "createdAt": "2020-04-14T17:33:05.995076",
        "lastUpdate": "0001-01-01T00:00:00"
    }
}];

//Necessary because the global value isn't cleaned after each test and this generates inconsistency in tests
//executed after the first one

beforeAll(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('general tests', () => {
    test('checking accessibility', async () => {
        const { container } = render(<Search />);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    test('test filling text search input', async () => {
        const searchValue = 'test';
        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        await userEvent.type(search_text_input, searchValue);

        expect(search_text_input.value).toEqual(searchValue);
    });

    test('get results for a string value typed', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //Support to fire the key code is not ready yet https://github.com/testing-library/user-event/pull/235
        // await userEvent.type(search_text_input, searchValue);
        fireEvent.change(search_text_input, { target: { value: searchValue } });

        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

        //Check if the workflow was done correctly and the api was called
        // expect(axiosMock.get).toHaveBeenCalledTimes(1)
        await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
    });

    test('checking boxes values', async () => {
        const searchValue = 'test';

        render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>,
        );

        const values = [{
            "type": "secret",
            "value": {
                "lazyLoader": {},
                "id": "c6a299df-6294-4149-b334-b58c972f3b0b",
                "secretId": "diauihdahd",
                "createdAt": "2020-04-16T14:53:28.646735",
                "lastUpdate": "0001-01-01T00:00:00",
                "passwordAsString": "iuhdauihdas"
            }
        }, {
            "type": "item",
            "value": {
                "keyWords": [
                    {
                        "id": "b8dd50eb-9d72-41bf-b166-cb16b19a2616",
                        "description": "test1",
                        "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
                    },
                    {
                        "id": "a42ca7f2-f4c4-40fa-afa8-41f300491b06",
                        "description": "test2",
                        "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
                    }
                ],
                "lazyLoader": {},
                "id": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa",
                "title": "new ui test",
                "description": "dnaouidasdasid",
                "createdAt": "2020-04-14T17:33:05.995076",
                "lastUpdate": "0001-01-01T00:00:00"
            }
        }];

        const search_text_input = screen.getByRole('textbox', /Search:/);

        await userEvent.type(search_text_input, searchValue);

        axiosMock.get.mockResolvedValueOnce({
            data: values
        });

        act(() => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Check if the text was shown in the document using the library recommended
        await waitFor(() => expect(screen.getByText('diauihdahd')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('new ui test')).toBeInTheDocument());

    });

    test('test searching all values (empty input)', async () => {
        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

        //Check if the dialog was opened
        await waitFor(() => expect(screen.getByRole('dialog', { name: /Search all?/ })).toBeInTheDocument());

        const search_dialog_yes_button = screen.getByRole('button', { name: /Yes/ });

        //Configure the mock
        axiosMock.post.mockResolvedValueOnce(true);
        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        userEvent.click(search_dialog_yes_button);

        //The dialog should not be in the document after button click
        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Search all?/ })).not.toBeInTheDocument());

        //And after closing the dialog the api should be called
        await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
    });

    test('test searching all values (empty input) and cancelling the operation', async () => {
        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

        //Check if the dialog was opened
        await waitFor(() => expect(screen.getByRole('dialog', { name: /Search all?/ })).toBeInTheDocument());

        const search_dialog_yes_button = screen.getByRole('button', { name: /No/ });

        userEvent.click(search_dialog_yes_button);

        //The dialog should not be in the document after button click
        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Search all?/ })).not.toBeInTheDocument());

        //And after closing the dialog the api should be called
        await waitFor(() => expect(axiosMock.get).not.toHaveBeenCalledTimes(1));
    });

    test('closing search all dialog pressing esc', async () => {
        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

        //Check if the dialog was opened
        const search_all_dialog = await waitFor(() => screen.getByRole('dialog', { name: /Search all?/ }));

        fireEvent.keyDown(search_all_dialog, { key: 'Escape', code: 'Escape' });

        //Expect that the dialog isn't in the document anymore
        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Search all?/ })).not.toBeInTheDocument());
    });

    test('pagination test with a text in the input', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //Support to fire the key code is not ready yet https://github.com/testing-library/user-event/pull/235
        // await userEvent.type(search_text_input, searchValue);
        fireEvent.change(search_text_input, { target: { value: searchValue } });

        const header_object = '{ "TotalCount": 2, "PageSize": 1, "CurrentPage": 2, "TotalPages": 2, "HasNext": true, "HasPrevious": false }';

        const header = { "x-pagination": header_object };

        axiosMock.get
            .mockResolvedValueOnce({
                data: secret_values,
                headers: header
            })
            .mockResolvedValueOnce({
                data: secret_values,
                headers: header
            });

        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

        const search_go_to_next_page = await waitFor(() => screen.getByRole('button', { name: /Go to next page/ }));

        userEvent.click(search_go_to_next_page);

        await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(2));
    });

    // test('pagination test without a text in the input', async () => {
    //     render(<Search />);

    //     const search_text_input = screen.getByRole('textbox', /Search:/);

    //     //Support to fire the key code is not ready yet https://github.com/testing-library/user-event/pull/235
    //     // await userEvent.type(search_text_input, searchValue);
    //     fireEvent.change(search_text_input, { target: { value: '' } });

    //     const header_object = '{ "TotalCount": 2, "PageSize": 1, "CurrentPage": 2, "TotalPages": 2, "HasNext": true, "HasPrevious": false }';

    //     const header = { "x-pagination": header_object };

    //     axiosMock.get
    //         .mockResolvedValueOnce({
    //             data: secret_values,
    //             headers: header
    //         })
    //         .mockResolvedValueOnce({
    //             data: secret_values,
    //             headers: header
    //         });

    //     fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

    //     const search_dialog_yes_button = await waitFor(() => screen.getByRole('button', { name: /Yes/ }));

    //     axiosMock.post.mockRestore();
    //     axiosMock.get.mockRestore();
    //     //     //Configure the mock
    //     axiosMock.post.mockResolvedValueOnce(true);
    //     axiosMock.get.mockResolvedValueOnce({
    //         data: secret_values
    //     });

    //     userEvent.click(search_dialog_yes_button);

    //     const search_go_to_next_page = await waitFor(() => screen.getByRole('button', { name: /Go to next page/ }));

    //     userEvent.click(search_go_to_next_page);

    //     await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
    // });
});

describe('secret testing', () => {
    test('test edit secret routing after searching', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        act(() => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        // screen.getByRole('button', { name: /Edit/ });
        const search_edit_secret_button = await waitFor(() => screen.getByRole('button', { name: /Edit/ }));

        userEvent.click(search_edit_secret_button);

        const expected_route_value = {
            "pathname": "/editSecret",
            "state": {
                "isEditing": true,
                "secret": {
                    "id": "c6a299df-6294-4149-b334-b58c972f3b0b",
                    "password": "iuhdauihdas",
                    "secretId": "diauihdahd"
                }
            }
        };

        expect(global.mockHistoryPush).toHaveBeenLastCalledWith(expected_route_value);
    });

    test('test delete a secret after searching it', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        //Fire the event that search calling the api
        act(() => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        const search_delete_secret_button = await waitFor(() => screen.getByRole('button', { name: /Delete/ }));

        //Fire the click on this button
        userEvent.click(search_delete_secret_button);

        //Get the alert and verify if the text shown is correct
        expect(screen.getByRole('dialog', { name: /Delete a secret?/ })).toBeInTheDocument();
        expect(screen.getByText('Are you sure that you want to delete this secret?')).toBeInTheDocument();

        //Get the yes button, after clicked, it should call the delete method in the API
        const search_dialog_yes_secret_button = screen.getByRole('button', { name: /Yes/ });

        //Configures the return from the api when the delete method is called
        axiosMock.delete.mockResolvedValueOnce({
            status: 200,
            message: "Item deleted successfully"
        });

        userEvent.click(search_dialog_yes_secret_button);

        await waitFor(() => expect(axiosMock.delete).toHaveBeenCalledTimes(1));
    });

    test('open dialog when delete a secret and click on No', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        //Fire the event that search calling the api
        await act(async () => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        const search_delete_item_button = screen.getByRole('button', { name: /Delete/ });

        //Fire the click on this button
        userEvent.click(search_delete_item_button);

        //Get the yes button, after clicked, it should call the delete method in the API
        const search_dialog_no_button = screen.getByRole('button', { name: /No/ });

        userEvent.click(search_dialog_no_button)

        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Delete a secret?/ })).not.toBeInTheDocument());

    });

    test('test closing confirmation dialog when the delete button is clicked', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: secret_values
        });

        //Fire the event that search calling the api
        await act(async () => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        const search_delete_item_button = screen.getByRole('button', { name: /Delete/ });

        //Fire the click on this button
        userEvent.click(search_delete_item_button);

        //Check if the dialog was opened
        const search_delete_item_dialog = await waitFor(() => screen.getByRole('dialog', { name: /Delete a secret?/ }));

        fireEvent.keyDown(search_delete_item_dialog, { key: 'Escape', code: 'Escape' });

        //Expect that the dialog isn't in the document anymore
        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Delete a secret?/ })).not.toBeInTheDocument());
    });
});

describe('item testing', () => {
    test('test edit item routing after searching', async () => {
        //Default configuration for search tests
        const searchValue = 'test';

        render(<Search />);

        //Get the search input and sets a value to it 
        const search_text_input = screen.getByRole('textbox', /Search:/);

        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        //Mocking of the api, telling which value is returned when the GET method is called
        axiosMock.get.mockResolvedValueOnce({
            data: item_values
        });

        //Key down is fired to execute the API calls and configure screen with the values returned
        act(() => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Gets the edit button of the value returned
        const search_edit_item_button = await waitFor(() => screen.getByRole('button', { name: /Edit/ }));

        userEvent.click(search_edit_item_button);

        //This is the value that, after clicked, should return from the history (Routes are configured on setupTests.js file on /src page)
        const expected_route_value = {
            "pathname": "/edit",
            "state": {
                "description": "dnaouidasdasid",
                "id": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa",
                "keyWords": [
                    {
                        "description": "test1",
                        "id": "b8dd50eb-9d72-41bf-b166-cb16b19a2616",
                        "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
                    },
                    {
                        "description": "test2",
                        "id": "a42ca7f2-f4c4-40fa-afa8-41f300491b06",
                        "itemId": "76921f1b-06bb-47cd-b2c0-f235dbeb4faa"
                    }
                ],
                "title": "new ui test"
            }
        };

        expect(global.mockHistoryPush).toHaveBeenLastCalledWith(expected_route_value);
    });

    test('test delete an item after searching it', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: item_values
        });

        //Fire the event that search calling the api
        await act(async () => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        // const search_delete_item_button = await waitFor(() => screen.getByRole('button', { name: /Delete/ }));
        const search_delete_item_button = screen.getByRole('button', { name: /Delete/ });

        //Fire the click on this button
        userEvent.click(search_delete_item_button);

        //Get the alert and verify if the text shown is correct
        expect(screen.getByRole('dialog', { name: /Delete an item?/ })).toBeInTheDocument();
        expect(screen.getByText('Are you sure that you want to delete this item?')).toBeInTheDocument();

        //Get the yes button, after clicked, it should call the delete method in the API
        const search_dialog_yes_button = screen.getByRole('button', { name: /Yes/ });

        //Configures the return from the api when the delete method is called
        axiosMock.delete.mockResolvedValueOnce({
            status: 200,
            message: "Item deleted successfully"
        });

        userEvent.click(search_dialog_yes_button)

        await waitFor(() => expect(axiosMock.delete).toHaveBeenCalledTimes(1));
    });

    test('open dialog when delete an item and click on No', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: item_values
        });

        //Fire the event that search calling the api
        await act(async () => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        const search_delete_item_button = screen.getByRole('button', { name: /Delete/ });

        //Fire the click on this button
        userEvent.click(search_delete_item_button);

        //Get the yes button, after clicked, it should call the delete method in the API
        const search_dialog_no_button = screen.getByRole('button', { name: /No/ });

        userEvent.click(search_dialog_no_button)

        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Delete an item?/ })).not.toBeInTheDocument());
    });

    test('test closing confirmation dialog when the delete button is clicked', async () => {
        const searchValue = 'test';

        render(<Search />);

        const search_text_input = screen.getByRole('textbox', /Search:/);

        //set the value for searching
        await userEvent.type(search_text_input, searchValue);

        //this is the mock to call the login, so for test purposes always returns true
        axiosMock.post.mockResolvedValueOnce(true);

        axiosMock.get.mockResolvedValueOnce({
            data: item_values
        });

        //Fire the event that search calling the api
        await act(async () => {
            fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
        });

        //Get the delete button from the HTML generated
        const search_delete_item_button = screen.getByRole('button', { name: /Delete/ });

        //Fire the click on this button
        userEvent.click(search_delete_item_button);

        //Check if the dialog was opened
        const search_delete_item_dialog = await waitFor(() => screen.getByRole('dialog', { name: /Delete an item?/ }));

        fireEvent.keyDown(search_delete_item_dialog, { key: 'Escape', code: 'Escape' });

        //Expect that the dialog isn't in the document anymore
        await waitFor(() => expect(screen.queryByRole('dialog', { name: /Delete an item?/ })).not.toBeInTheDocument());
    });

});
