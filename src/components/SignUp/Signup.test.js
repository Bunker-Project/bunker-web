import React from 'react';
import SignUp from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

test('checking accessibility', async () => {
    const { container } = render(<SignUp />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('all fields empty validation test', async () => {
    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    const pwd_input_errors = await findAllByTestId("input_pwd_error_label");
    const normal_input_errors = await findAllByTestId("input_error_label_no_pwd");

    expect(pwd_input_errors).toHaveLength(1);
    expect(normal_input_errors).toHaveLength(4);
});

test('test validation without first name', async () => {

    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_lastName_input = getByTestId('sign_lastName_input');
    const sign_email_input = getByTestId('sign_email_input');
    const sign_username_input = getByTestId('sign_username_input');
    const sign_password_input = getByTestId('sign_password_input');
    const sign_password_confirmation_input = getByTestId('sign_password_confirmation_input');

    fireEvent.change(sign_lastName_input, { target: { value: last_name } });
    fireEvent.change(sign_email_input, { target: { value: email } });
    fireEvent.change(sign_username_input, { target: { value: username } });
    fireEvent.change(sign_password_input, { target: { value: password } });
    fireEvent.change(sign_password_confirmation_input, { target: { value: password } });

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    await waitFor(() => expect(getByTestId("input_error_label_no_pwd")).toHaveTextContent('Name is required'));

    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without last name', async () => {

    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    const first_name = 'First name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = getByTestId('sign_name_input');
    const sign_email_input = getByTestId('sign_email_input');
    const sign_username_input = getByTestId('sign_username_input');
    const sign_password_input = getByTestId('sign_password_input');
    const sign_password_confirmation_input = getByTestId('sign_password_confirmation_input');

    fireEvent.change(sign_name_input, { target: { value: first_name } });
    fireEvent.change(sign_email_input, { target: { value: email } });
    fireEvent.change(sign_username_input, { target: { value: username } });
    fireEvent.change(sign_password_input, { target: { value: password } });
    fireEvent.change(sign_password_confirmation_input, { target: { value: password } });

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    await waitFor(() => expect(getByTestId("input_error_label_no_pwd")).toHaveTextContent('Last name is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without email', async () => {

    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    const first_name = 'First name';
    const last_name = 'Last name';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = getByTestId('sign_name_input');
    const sign_lastName_input = getByTestId('sign_lastName_input');
    const sign_username_input = getByTestId('sign_username_input');
    const sign_password_input = getByTestId('sign_password_input');
    const sign_password_confirmation_input = getByTestId('sign_password_confirmation_input');

    fireEvent.change(sign_name_input, { target: { value: first_name } });
    fireEvent.change(sign_lastName_input, { target: { value: last_name } });
    fireEvent.change(sign_username_input, { target: { value: username } });
    fireEvent.change(sign_password_input, { target: { value: password } });
    fireEvent.change(sign_password_confirmation_input, { target: { value: password } });

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    await waitFor(() => expect(getByTestId("input_error_label_no_pwd")).toHaveTextContent('Email is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without username', async () => {

    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    const first_name = 'First name';
    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const password = 'defaultpwd123';

    const sign_name_input = getByTestId('sign_name_input');
    const sign_lastName_input = getByTestId('sign_lastName_input');
    const sign_email_input = getByTestId('sign_email_input');
    const sign_password_input = getByTestId('sign_password_input');
    const sign_password_confirmation_input = getByTestId('sign_password_confirmation_input');

    fireEvent.change(sign_name_input, { target: { value: first_name } });
    fireEvent.change(sign_lastName_input, { target: { value: last_name } });
    fireEvent.change(sign_email_input, { target: { value: email } });
    fireEvent.change(sign_password_input, { target: { value: password } });
    fireEvent.change(sign_password_confirmation_input, { target: { value: password } });

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    await waitFor(() => expect(getByTestId("input_error_label_no_pwd")).toHaveTextContent('Username is required'));

    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_password_input.value).toEqual(password);
    expect(sign_password_confirmation_input.value).toEqual(password);
});

test('test validation without password', async () => {

    const { getByTestId, findAllByTestId } = render(<SignUp />);

    const sign_submit_button = getByTestId('sign_submit_button');

    const first_name = 'First name';
    const last_name = 'Last name';
    const email = 'bunker@bunker.com';
    const username = 'bunker_test';
    const password = 'defaultpwd123';

    const sign_name_input = getByTestId('sign_name_input');
    const sign_lastName_input = getByTestId('sign_lastName_input');
    const sign_email_input = getByTestId('sign_email_input');
    const sign_username_input = getByTestId('sign_username_input');
    const sign_password_confirmation_input = getByTestId('sign_password_confirmation_input');

    fireEvent.change(sign_name_input, { target: { value: first_name } });
    fireEvent.change(sign_lastName_input, { target: { value: last_name } });
    fireEvent.change(sign_email_input, { target: { value: email } });
    fireEvent.change(sign_username_input, { target: { value: username } });
    fireEvent.change(sign_password_confirmation_input, { target: { value: password } });

    act(() => {
        fireEvent.click(sign_submit_button);
    });

    // await waitFor(() => expect(getByTestId("input_pwd_error_label")).toHaveTextContent('Password is required'));
    const pwd_input_errors = await findAllByTestId("input_pwd_error_label");

    
    expect(pwd_input_errors).toHaveLength(2);

    expect(pwd_input_errors[0]).toHaveTextContent('Password is required');
    expect(pwd_input_errors[1]).toHaveTextContent('Passwords do not match');
    expect(sign_name_input.value).toEqual(first_name);
    expect(sign_lastName_input.value).toEqual(last_name);
    expect(sign_email_input.value).toEqual(email);
    expect(sign_username_input.value).toEqual(username);
    expect(sign_password_confirmation_input.value).toEqual(password);
});



