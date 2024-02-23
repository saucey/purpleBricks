import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonLink from '.';

describe('ButtonLink', () => {
  test('renders button with label', () => {
    render(<ButtonLink label="Click me" />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--link');
  });
});