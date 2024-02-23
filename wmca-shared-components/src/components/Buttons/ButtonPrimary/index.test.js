import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonPrimary from '.';

describe('ButtonPrimary', () => {
  test('renders primary button with label', () => {
    const label = 'Primary Button';
    render(<ButtonPrimary label={label} />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--primary');
  });

  test('applies active class when isActive is true', () => {
    const label = 'Primary Button';
    render(<ButtonPrimary label={label} isActive />);

    // Check if the button applies the active class when isActive is true
    const activeButton = screen.getByRole('button', { name: 'Primary Button' });
    expect(activeButton).toHaveClass('wmnds-btn', 'wmnds-btn--primary', 'wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    const label = 'Primary Button';
    render(<ButtonPrimary label={label} isDisabled />);

    // Check if the button applies the disabled attribute when isDisabled is true
    const disabledButton = screen.getByRole('button', { name: 'Primary Button' });
    expect(disabledButton).toBeDisabled();
  });

  test('renders right icon when hasIcon is true', () => {
    const label = 'Primary Button';
    render(<ButtonPrimary label={label} hasIcon />);

    // Check if the button renders the right icon when hasIcon is true
    const rightIcon = screen.getByTestId('svg-component');
    expect(rightIcon).toBeInTheDocument();
  });

  test('does not render right icon when hasIcon is false', () => {
    const label = 'Primary Button';
    render(<ButtonPrimary label={label} />);

    // Check if the button does not render the right icon when hasIcon is false
    const noRightIcon = screen.queryByTestId('svg-component');
    expect(noRightIcon).not.toBeInTheDocument();
  });
});
