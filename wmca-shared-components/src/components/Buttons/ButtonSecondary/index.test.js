import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryButton from '.';

describe('SecondaryButton', () => {
  test('renders secondary button with label', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--secondary');
  });

  test('applies dark background class when isDarkBg is true', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} isDarkBg />);

    // Check if the button applies the dark background class when isDarkBg is true
    const darkBgButton = screen.getByRole('button', { name: 'Secondary Button' });
    expect(darkBgButton).toHaveClass('wmnds-btn', 'wmnds-btn--secondary', 'wmnds-btn--dark-bg');
  });

  test('applies active class when isActive is true', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} isActive />);

    // Check if the button applies the active class when isActive is true
    const activeButton = screen.getByRole('button', { name: 'Secondary Button' });
    expect(activeButton).toHaveClass('wmnds-btn', 'wmnds-btn--secondary', 'wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} isDisabled />);

    // Check if the button applies the disabled attribute when isDisabled is true
    const disabledButton = screen.getByRole('button', { name: 'Secondary Button' });
    expect(disabledButton).toBeDisabled();
  });

  test('renders right icon when hasIcon is true', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} hasIcon />);

    // Check if the button renders the right icon when hasIcon is true
    const rightIcon = screen.getByTestId('svg-component');
    expect(rightIcon).toBeInTheDocument();
  });

  test('does not render right icon when hasIcon is false', () => {
    const label = 'Secondary Button';
    render(<SecondaryButton label={label} />);

    // Check if the button does not render the right icon when hasIcon is false
    const noRightIcon = screen.queryByTestId('svg-component');
    expect(noRightIcon).not.toBeInTheDocument();
  });
});
