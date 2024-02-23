import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModeButton from '.';

describe('ModeButton', () => {
  test('renders mode button with label and icon', () => {
    const label = 'Bus';
    const icon = '#wmnds-modes-isolated-bus';
    render(<ModeButton label={label} icon={icon} />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Bus' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--mode');

    // Check if the SVG element is present with the specified icon
    // const svgElement = screen.getByTestId('svg-component');
    const svgElement = screen.getByTestId('svg-component').querySelector('use');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('xlink:href', '#wmnds-modes-isolated-bus');
  });

  test('applies active class when isActive is true', () => {
    const label = 'Bus';
    const icon = '#wmnds-modes-isolated-bus';
    render(<ModeButton label={label} icon={icon} isActive />);

    // Check if the button applies the active class when isActive is true
    const activeButton = screen.getByRole('button', { name: 'Bus' });
    expect(activeButton).toHaveClass('wmnds-btn', 'wmnds-btn--mode', 'wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    const label = 'Bus';
    const icon = '#wmnds-modes-isolated-bus';
    render(<ModeButton label={label} icon={icon} isDisabled />);

    // Check if the button applies the disabled attribute when isDisabled is true
    const disabledButton = screen.getByRole('button', { name: 'Bus' });
    expect(disabledButton).toBeDisabled();
  });
});
