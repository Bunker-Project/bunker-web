import React from 'react';
import Main from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    jest.clearAllMocks();
});

test('checking accessibility', async () => {
    const { container } = render(<Main />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

describe('testing if all the buttons redirect to the correct pages', () => {
    test('search', () => {

        render(<Main />);

        const main_search_button = screen.getByRole('button', { name: /Go to search page and find your things/ });

        userEvent.click(main_search_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith('/search');
    });

    test('register an item', () => {

        render(<Main />);

        const main_register_button = screen.getByRole('button', { name: /Go to item's registration/ });

        userEvent.click(main_register_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith('/register');
    });

    test('register a secret', () => {

        render(<Main />);

        const main_secret_button = screen.getByRole('button', { name: /Go to secret's registration/ });

        userEvent.click(main_secret_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith({ "pathname": "/secret", "state": { "isEditing": false } });
    });

    test('go to a profile', () => {

        render(<Main />);

        const main_profile_button = screen.getByRole('button', { name: /Go to user's profile/ });

        userEvent.click(main_profile_button);

        expect(global.mockHistoryPush).toHaveBeenCalledWith('/profile');
    });
});