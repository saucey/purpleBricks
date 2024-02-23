import { render, screen } from '@testing-library/react';
import Start from './ReportingForm';

test('renders learn react link', () => {
  render(<Start />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});