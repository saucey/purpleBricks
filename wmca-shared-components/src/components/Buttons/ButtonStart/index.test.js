import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonStart from '.';

describe('ButtonStart', () => {
  test('renders start button with label', () => {
    const label = 'Start';
    render(<ButtonStart label={label} />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Start' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--start');
  });

  test('applies active class when isActive is true', () => {
    const label = 'Start';
    render(<ButtonStart label={label} isActive />);

    // Check if the button applies the active class when isActive is true
    const activeButton = screen.getByRole('button', { name: 'Start' });
    expect(activeButton).toHaveClass('wmnds-btn', 'wmnds-btn--start', 'wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    const label = 'Start';
    render(<ButtonStart label={label} isDisabled />);

    // Check if the button applies the disabled attribute when isDisabled is true
    const disabledButton = screen.getByRole('button', { name: 'Start' });
    expect(disabledButton).toBeDisabled();
  });

  test('renders right icon when hasIcon is true', () => {
    const label = 'Start';
    render(<ButtonStart label={label} hasIcon />);

    // Check if the button renders the right icon when hasIcon is true
    const rightIcon = screen.getByTestId('svg-component');
    expect(rightIcon).toBeInTheDocument();
  });

  test('does not render right icon when hasIcon is false', () => {
    const label = 'Start';
    render(<ButtonStart label={label} />);

    // Check if the button does not render the right icon when hasIcon is false
    const noRightIcon = screen.queryByTestId('svg-component');
    expect(noRightIcon).not.toBeInTheDocument();
  });
});
