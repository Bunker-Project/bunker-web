import React from 'react';
import NavBar from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';

// This is the logo, it's just simple image where is written Bunker, nothing else and also it is used to return to main page if you want
test('check accessibility', async () => {
    const { container } = render(<NavBar />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('check if click in icon redirect to the main page', () => {

    render(<NavBar />);

    const navbar_icon_button = screen.getByRole('button', {name: /This is the logo, it's just simple image where is written Bunker, nothing else and also it is used to return to main page if you want/});

    userEvent.click(navbar_icon_button);

    expect(global.mockHistoryPush).toHaveBeenCalledWith('/');
});