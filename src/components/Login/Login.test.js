import React from 'react';
import Login from './index';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';

test('should have correct values', async () => {
    const username = "bunker@unitteste.com";
    const password = "bunkerpassword123";
    render(<Login />);

    //Get the inputs using their text
    const email_input = screen.getByLabelText(/Username:/);
    const password_input = screen.getByLabelText(/Password:/);

    //Simulates an user typing in the input
    await userEvent.type(email_input, username);
    await userEvent.type(password_input, password);

    expect(email_input.value).toEqual(username);
    expect(password_input.value).toEqual(password);

});

test('checking accessibility', async () => {
    const { container } = render(<Login />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});


test('test complete calling the form', async () => {
    const email = "bunker@unitteste.com";
    const pwd = "bunkerpassword123";
    render(<Login />);

    const email_input = screen.getByLabelText(/Username:/);
    const password_input = screen.getByLabelText(/Password:/);
    const login_submit = screen.getByRole('button', { name: /LOGIN/ });

    await userEvent.type(email_input, email);
    await userEvent.type(password_input, pwd);

    axiosMock.post.mockResolvedValueOnce({
        data: {
            username: email,
            password: pwd
        }
    });

    userEvent.click(login_submit);

    await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));

});


test('login invalid without password', async () => {

    const email = "bunker@unitteste.com";
    render(<Login />);

    const email_input = screen.getByLabelText(/Username:/);
    const login_submit = screen.getByRole('button', { name: /LOGIN/ });

    await userEvent.type(email_input, email);

    userEvent.click(login_submit);

    await waitFor(() => expect(screen.getByTestId("input_pwd_error_label")).toHaveTextContent('The password is required'));
});

test('login invalid without username', async () => {

    const pwd = "bunkerpassword123";
    render(<Login />);

    const password_input = screen.getByLabelText(/Password:/);
    const login_submit = screen.getByRole('button', { name: /LOGIN/ });

    await userEvent.type(password_input, pwd);

    userEvent.click(login_submit);

    await waitFor(() => expect(screen.getByTestId("input_error_label_no_pwd")).toHaveTextContent('The email or username is required'));
});

test('test redirect to sign up page', () => {
    render(<Login />);

    const sign_button = screen.getByRole('button', { name: /SIGN UP/ });

    userEvent.click(sign_button);

    //Gets the global value of the push methdo to see if it was called with the correct value/route
    expect(global.mockHistoryPush).toHaveBeenLastCalledWith('/signUp');

});

