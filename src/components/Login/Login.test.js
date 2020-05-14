import React from 'react';
import Login from './index';
import { getByRole } from '@testing-library/react';
import { render, fireEvent } from '../../test-utils';
import { Router, useHistory } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));


test('should have correct values', () => {
    const username = "bunker@unitteste.com";
    const password = "bunkerpassword123";
    const { getByTestId } = render(
        <Login />
    );

    const email_input = getByTestId('email_input');
    const password_input = getByTestId('password_input');

    fireEvent.change(email_input, {
        target: {
            value: username
        }
    });

    fireEvent.change(password_input, {
        target: {
            value: password
        }
    });

    expect(email_input.value).toEqual(username);
    expect(password_input.value).toEqual(password);

});

test('checking accessibility', async () => {
    const { container } = render(<Login />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

// test('test complete calling the form', () => {
//     const { getByTestId } = render(
//         <Login />
//     );

//     const form = getByTestId('form_login');

// });