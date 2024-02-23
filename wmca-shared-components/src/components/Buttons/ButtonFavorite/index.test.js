import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonFavorite from '.';

describe('ButtonFavorite', () => {
  test('renders favorite button with label', () => {
    render(<ButtonFavorite label="Add to Favorites" />);

    // Check if the button is rendered with the correct label and base classes
    const button = screen.getByRole('button', { name: 'Add to Favorites' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('wmnds-btn', 'wmnds-btn--favourite');
  });

  test('renders empty star icon when isFavorited is false', () => {
    render(<ButtonFavorite label="Add to Favorites" />);

    // Check if the button renders with a empty star icon when isFavorited is false
    const filledStarIcon = screen.getByTestId('svg-component').querySelector('use');
    expect(filledStarIcon).toBeInTheDocument();

    // You can add more specific checks for the empty star icon if needed
    expect(filledStarIcon).toHaveAttribute('href', '#wmnds-general-star-empty');
  });

  test('renders filled star icon when isFavorited is true', () => {
    render(<ButtonFavorite label="Add to Favorites" isFavorited />);

    // Check if the button renders with a filled star icon when isFavorited is true
    const filledStarIcon = screen.getByTestId('svg-component').querySelector('use');
    expect(filledStarIcon).toBeInTheDocument();

    // You can add more specific checks for the filled star icon if needed
    expect(filledStarIcon).toHaveAttribute('href', '#wmnds-general-star');
  });


  test('does not render star icon when isFavorited is not provided', () => {
    render(<ButtonFavorite label="Add to Favorites" />);

    // Check if the button does not render a star icon when isFavorited is not provided
    const starIcon = screen.queryByRole('img', { name: /star/i });
    expect(starIcon).not.toBeInTheDocument();
  });
});
