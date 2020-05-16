import React from 'react';
import Search from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';

test('checking accessibility', async () => {
    const { container } = render(<Search />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('test filling text search input', () => {
    const searchValue = 'test';
    const { getByTestId } = render(
        <Search />
    );

    const search_text_input = getByTestId('search_text_input');

    fireEvent.change(search_text_input, { target: { value: searchValue } });

    expect(search_text_input.value).toEqual(searchValue);
});

test('get results for a string value typed', async () => {
    const searchValue = 'test';

    const { getByTestId } = render(
        <Search />
    );

    const values = {
        "type": "secret",
        "value": {
            "lazyLoader": {},
            "id": "c6a299df-6294-4149-b334-b58c972f3b0b",
            "secretId": "diauihdahd",
            "createdAt": "2020-04-16T14:53:28.646735",
            "lastUpdate": "0001-01-01T00:00:00",
            "passwordAsString": "iuhdauihdas"
        }
    };

    let value = JSON.stringify(values);

    const search_text_input = getByTestId('search_text_input');

    fireEvent.change(search_text_input, { target: { value: searchValue } });

    axiosMock.get.mockResolvedValueOnce({
        data: value
    });

    fireEvent.keyDown(search_text_input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
    // expect(axiosMock.get).toHaveBeenCalledTimes(1)
});