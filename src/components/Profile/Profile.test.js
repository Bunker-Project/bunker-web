import React from 'react';
import NavBar from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';

test('checking accessibility', async () => {
    const { container } = render(<NavBar />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('should redirect to the initial page', () => {
    render(<NavBar />);

    const profile_logout_button = screen.getByRole('button', { name: /Logout/ });

    userEvent.click(profile_logout_button);

    expect(global.mockHistoryPush).toHaveBeenCalledWith('/');
});