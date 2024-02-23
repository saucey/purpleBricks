import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonPayment from '.';

describe('ButtonPayment', () => {
  test('renders payment button with label and icons', () => {
    const label = 'Pay Now';
    render(<ButtonPayment label={label} />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Pay Now' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--primary');

    // Check if the SVG elements are present with the specified icons
    const swiftLogoIcon = screen.getByTestId('svg-component');
    expect(swiftLogoIcon).toBeInTheDocument();

    // Use querySelector to get the 'use' element within the SVG
    const useElement = swiftLogoIcon.querySelector('use');
    expect(useElement).toHaveAttribute('xlink:href', '#wmnds-swift-full-logo');
  });

  test('applies active class when isActive is true', () => {
    const label = 'Pay Now';
    render(<ButtonPayment label={label} isActive />);

    // Check if the button applies the active class when isActive is true
    const activeButton = screen.getByRole('button', { name: 'Pay Now' });
    expect(activeButton).toHaveClass('wmnds-btn', 'wmnds-btn--primary', 'wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    const label = 'Pay Now';
    render(<ButtonPayment label={label} isDisabled />);

    // Check if the button applies the disabled attribute when isDisabled is true
    const disabledButton = screen.getByRole('button', { name: 'Pay Now' });
    expect(disabledButton).toBeDisabled();
  });

  test('renders right icon when hasRightIcon is true', () => {
    const label = 'Pay Now';
    render(<ButtonPayment label={label} hasRightIcon />);

    // Check if the button renders the right icon when hasRightIcon is true
    const rightIcon = screen.getByTestId('svg-component-right-icon');
    expect(rightIcon).toBeInTheDocument();
  });
});
