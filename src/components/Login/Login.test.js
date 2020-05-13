import React from 'react';
import Login from './index';
import { getByRole, render } from '@testing-library/react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store';

test('login successful', () => {
    const username = "testform";
    const password = "pwd123";
    const container = render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    // const form = getByRole('form');
    // console.log(form);
});