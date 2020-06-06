import React from 'react';
import Loading from './index';
import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

test('checking accessibility', async () => {
    const { container } = render(<Loading />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('checking rendering visibilty false', () => {
    render(<Loading visible={false} />);

    expect(screen.getByTestId('loading_div')).toHaveAttribute('class', 'lds-ellipsis-hidden');
});

test('checking rendering visibilty true', () => {
    render(<Loading visible={true} />);

    expect(screen.getByTestId('loading_div')).toHaveAttribute('class', 'lds-ellipsis');
});