import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonDestructive from '.';

describe('ButtonDestructive', () => {
  test('renders destructive button with label', () => {
    render(<ButtonDestructive label="Delete" />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--destructive');
  });

  test('applies active class when isActive is true', () => {
    render(<ButtonDestructive label="Delete" isActive />);

    // Check if the button has the active class when isActive is true
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    render(<ButtonDestructive label="Delete" isDisabled />);

    // Check if the button is disabled when isDisabled is true
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeDisabled();
  });

  test('renders with icon when hasIcon is true', () => {
    render(<ButtonDestructive label="Click me" hasIcon />);
    // Check if the SVG icon is present when hasIcon is true
    const svgElement = screen.getByTestId('svg-component')
    expect(svgElement).toHaveClass('wmnds-btn__icon', 'wmnds-btn__icon--right');
  });

  test('does not render icon when hasIcon is false', () => {
    render(<ButtonDestructive label="Delete" hasIcon={false} />);

    // Check if the button does not render an icon when hasIcon is false
    const icon = screen.queryByRole('img', { name: /chevron right/i });
    expect(icon).not.toBeInTheDocument();
  });
});
