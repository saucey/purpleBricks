import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonCta from '.';

describe('ButtonCta', () => {
  test('renders button with label', () => {
    render(<ButtonCta label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('applies active class when isActive is true', () => {
    render(<ButtonCta label="Active Button" isActive />);
    const button = screen.getByText('Active Button');
    expect(button).toHaveClass('wmnds-is--active');
  });

  test('applies disabled attribute when isDisabled is true', () => {
    render(<ButtonCta label="Disabled Button" isDisabled />);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  test('applies dark background class when isDarkBg is true', () => {
    render(<ButtonCta label="Dark Background Button" isDarkBg />);
    const button = screen.getByText('Dark Background Button');
    expect(button).toHaveClass('wmnds-btn--dark-bg');
  });

  test('renders with icon when hasIcon is true', () => {
    render(<ButtonCta label="Click me" hasIcon />);
    // Check if the SVG icon is present when hasIcon is true
    const svgElement = screen.getByTestId('svg-component')
    expect(svgElement).toHaveClass('wmnds-btn__icon', 'wmnds-btn__icon--right');
  });


  test('renders loader when isLoading is true', () => {
    render(<ButtonCta label="Button with Loader" isLoading />);
    const loader = screen.getByRole('alert');
    console.log(loader.outerHTML); // Log the rendered HTML of the loader
    expect(loader).toBeInTheDocument();
  });
});
