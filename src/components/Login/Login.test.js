import React from 'react';
import Login from './index';
import { render, fireEvent, waitFor, act } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import axiosMock from 'axios';


test('should have correct values', () => {
    const username = "bunker@unitteste.com";
    const password = "bunkerpassword123";
    const { getByTestId } = render(
        <Login />
    );

    const email_input = getByTestId('login_email_input');
    const password_input = getByTestId('login_password_input');

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


test('test complete calling the form', async () => {
    const email = "bunker@unitteste.com";
    const pwd = "bunkerpassword123";
    const { getByTestId } = render(
        <Login />
    );

    const email_input = getByTestId('login_email_input');
    const password_input = getByTestId('login_password_input');
    const login_submit = getByTestId('login_submit_button');

    fireEvent.change(email_input, {
        target: {
            value: email
        }
    });

    fireEvent.change(password_input, {
        target: {
            value: pwd
        }
    });

    axiosMock.post.mockResolvedValueOnce({
        data: {
            username: email,
            password: pwd
        }
    });

    fireEvent.click(login_submit);

    await waitFor(() => expect(axiosMock.post).toHaveBeenCalledTimes(1));
    
});


test('login invalid without password', async () => {

    const email = "bunker@unitteste.com";
    const { getByTestId } = render(
        <Login />
    );

    const email_input = getByTestId('login_email_input');
    const login_submit = getByTestId('login_submit_button');

    fireEvent.change(email_input, {
        target: {
            value: email
        }
    });

    act(() => {
        fireEvent.click(login_submit);
    });

    await waitFor(() => expect(getByTestId("input_pwd_error_label")).toHaveTextContent('The password is required'));
});

test('login invalid without username', async () => {
    
    const pwd = "bunkerpassword123";
    const { getByTestId } = render(
        <Login />
    );

    const password_input = getByTestId('login_password_input');
    const login_submit = getByTestId('login_submit_button');

    fireEvent.change(password_input, {
        target: {
            value: pwd
        }
    });

    act(() => {
        fireEvent.click(login_submit);
    });

    await waitFor(() => expect(getByTestId("input_error_label_no_pwd")).toHaveTextContent('The email or username is required'));
});

