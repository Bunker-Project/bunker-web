import React from 'react';
import Search from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

//Necessary because the global value isn't cleaned after each test and this generates inconsistency in tests
//executed after the first one
afterEach(() => {
    jest.clearAllMocks();
});

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

    const search_text_input = screen.getByRole('textbox', /Search:/);

    //Support to fire the key code is not ready yet https://github.com/testing-library/user-event/pull/235
    // await userEvent.type(search_text_input, searchValue);
    fireEvent.change(search_text_input, { target: { value: searchValue } });

    axiosMock.get.mockResolvedValueOnce({
        data: values
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

test('test edit secret routing after searching', async () => {
    const searchValue = 'test';

    render(<Search />);

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
    }];

    const search_text_input = screen.getByRole('textbox', /Search:/);

    await userEvent.type(search_text_input, searchValue);

    axiosMock.get.mockResolvedValueOnce({
        data: values
    });

    act(() => {
        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
    });

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

test('test edit item routing after searching', async () => {
    //Default configuration for search tests
    const searchValue = 'test';

    render(<Search />);

    //Item used as returning value for the search event
    const values = [{
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

    //Get the search input and sets a value to it 
    const search_text_input = screen.getByRole('textbox', /Search:/);

    await userEvent.type(search_text_input, searchValue);

    //Mocking of the api, telling which value is returned when the GET method is called
    axiosMock.get.mockResolvedValueOnce({
        data: values
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

    //Values simulating an item
    const values = [{
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

    //set the value for searching
    await userEvent.type(search_text_input, searchValue);

    axiosMock.get.mockResolvedValueOnce({
        data: values
    });

    //Fire the event that search calling the api
    act(() => {
        fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });
    });

    //Get the delete button from the HTML generated
    const search_delete_item_button = await waitFor(() => screen.getByRole('button', { name: /Delete/ }));

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

test('test delete a secret after searching it', async () => {
    const searchValue = 'test';

    render(<Search />);

    //Values simulating an item
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
    }];

    const search_text_input = screen.getByRole('textbox', /Search:/);

    //set the value for searching
    await userEvent.type(search_text_input, searchValue);

    axiosMock.get.mockResolvedValueOnce({
        data: values
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