import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonOpenClose from '.';

describe('ButtonOpenClose', () => {
  test('renders primary button with label', () => {
    render(<ButtonOpenClose label="Open" />);

    // Check if the button is rendered with the correct label
    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--primary');
  });

  test('renders with extra margin when isClose is true', () => {
    render(<ButtonOpenClose label="Close" isClose />);

    // Check if the button has extra margin when isClose is true
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toHaveClass('wmnds-m-l-xs');
  });

  test('does not have extra margin when isClose is false', () => {
    render(<ButtonOpenClose label="Open" isClose={false} />);

    // Check if the button does not have extra margin when isClose is false
    const button = screen.getByRole('button', { name: 'Open' });
    expect(button).not.toHaveClass('wmnds-m-l-xs');
  });
});
