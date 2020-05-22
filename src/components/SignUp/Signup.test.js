import React from 'react';
import SignUp from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';

test('checking accessibility', async () => {
    const { container } = render(<SignUp />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('all fields empty validation test', async () => {
    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    userEvent.click(sign_submit_button);

    const pwd_input_errors = await screen.findAllByTestId("input_pwd_error_label");
    const normal_input_errors = await screen.findAllByTestId("input_error_label_no_pwd");

    expect(pwd_input_errors).toHaveLength(1);
    expect(normal_input_errors).toHaveLength(4);
});

test('test validation without first name', async () => {

    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_lastName_input = screen.getByRole('textbox', { name: /Last name:/ });
    const sign_email_input = screen.getByRole('textbox', { name: /Email:/ });
    const sign_username_input = screen.getByRole('textbox', { name: /Username:/ });
    const sign_password_input = screen.getByPlaceholderText('Your password');
    const sign_password_confirmation_input = screen.getByPlaceholderText('Confirm your password');

    userEvent.type(sign_lastName_input, last_name);
    userEvent.type(sign_email_input, email);
    userEvent.type(sign_username_input, username);
    userEvent.type(sign_password_input, password);
    userEvent.type(sign_password_confirmation_input, password);

    userEvent.click(sign_submit_button);

    await waitFor(() => expect(screen.getByTestId("input_error_label_no_pwd")).toHaveTextContent('Name is required'));

    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without last name', async () => {

    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    const first_name = 'First name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = screen.getByRole('textbox', { name: /First name:/ });
    const sign_email_input = screen.getByRole('textbox', { name: /Email:/ });
    const sign_username_input = screen.getByRole('textbox', { name: /Username:/ });
    const sign_password_input = screen.getByPlaceholderText('Your password');
    const sign_password_confirmation_input = screen.getByPlaceholderText('Confirm your password');

    userEvent.type(sign_name_input, first_name);
    userEvent.type(sign_email_input, email);
    userEvent.type(sign_username_input, username);
    userEvent.type(sign_password_input, password);
    userEvent.type(sign_password_confirmation_input, password);

    userEvent.click(sign_submit_button);

    await waitFor(() => expect(screen.getByTestId("input_error_label_no_pwd")).toHaveTextContent('Last name is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without email', async () => {

    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    const first_name = 'First name';
    const last_name = 'Last name';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = screen.getByRole('textbox', { name: /First name:/ });
    const sign_lastName_input = screen.getByRole('textbox', { name: /Last name:/ });
    const sign_username_input = screen.getByRole('textbox', { name: /Username:/ });
    const sign_password_input = screen.getByPlaceholderText('Your password');
    const sign_password_confirmation_input = screen.getByPlaceholderText('Confirm your password');

    userEvent.type(sign_name_input, first_name);
    userEvent.type(sign_lastName_input, last_name);
    userEvent.type(sign_username_input, username);
    userEvent.type(sign_password_input, password);
    userEvent.type(sign_password_confirmation_input, password);

    userEvent.click(sign_submit_button);

    await waitFor(() => expect(screen.getByTestId("input_error_label_no_pwd")).toHaveTextContent('Email is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without username', async () => {

    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    const first_name = 'First name';
    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const password = 'defaultpwd123';

    const sign_name_input = screen.getByRole('textbox', { name: /First name:/ });
    const sign_lastName_input = screen.getByRole('textbox', { name: /Last name:/ });
    const sign_email_input = screen.getByRole('textbox', { name: /Email:/ });
    const sign_password_input = screen.getByPlaceholderText('Your password');
    const sign_password_confirmation_input = screen.getByPlaceholderText('Confirm your password');

    userEvent.type(sign_name_input, first_name);
    userEvent.type(sign_lastName_input, last_name);
    userEvent.type(sign_email_input, email);
    userEvent.type(sign_password_input, password);
    userEvent.type(sign_password_confirmation_input, password);

    userEvent.click(sign_submit_button);

    await waitFor(() => expect(screen.getByTestId("input_error_label_no_pwd")).toHaveTextContent('Username is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without password', async () => {

    render(<SignUp />);

    const sign_submit_button = screen.getByRole('button', { name: /SIGN UP/ });

    const first_name = 'First name';
    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = screen.getByRole('textbox', { name: /First name:/ });
    const sign_lastName_input = screen.getByRole('textbox', { name: /Last name:/ });
    const sign_email_input = screen.getByRole('textbox', { name: /Email:/ });
    const sign_username_input = screen.getByRole('textbox', { name: /Username:/ });
    const sign_password_confirmation_input = screen.getByPlaceholderText('Confirm your password');

    //Sets to all the inputs the defaults values
    userEvent.type(sign_name_input, first_name);
    userEvent.type(sign_lastName_input, last_name);
    userEvent.type(sign_email_input, email);
    userEvent.type(sign_username_input, username);
    userEvent.type(sign_password_confirmation_input, password);

    //Executes the click on the submit button
    userEvent.click(sign_submit_button);

    //Get the labels with errors that should have shown
    const pwd_input_errors = await screen.findAllByTestId("input_pwd_error_label");

    //Makes the checks
    expect(pwd_input_errors).toHaveLength(2);
    expect(pwd_input_errors[0]).toHaveTextContent('Password is required');
    expect(pwd_input_errors[1]).toHaveTextContent('Passwords do not match');
    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_confirmation_input.value).toEqual(password);
});



