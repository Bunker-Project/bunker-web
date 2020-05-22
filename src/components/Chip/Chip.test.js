import React from 'react';
import Chip from './index';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, act, screen } from '../../test-utils';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import userEvent from '@testing-library/user-event';


const onDeleteMock = jest.fn();
const labelMock = "chipTest";

test('check accessibility', async () => {
    const { container } = render(<Chip label={labelMock} onDelete={onDeleteMock} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
});

test('check if the text send in label parameter was corrected set', () => {
    render(<Chip label={labelMock} onDelete={onDeleteMock} />);

    const chip_text_label = screen.getByTestId('chip_text_label');

    expect(chip_text_label).toHaveTextContent(labelMock);
});

test('check if when the button is clicked the onClose method is called', () => {
    render(<Chip label={labelMock} onDelete={onDeleteMock} />);

    const chip_close_button = screen.getByRole('button', { name : /Close button/ });

    userEvent.click(chip_close_button);

    expect(onDeleteMock).toHaveBeenCalled();
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
});