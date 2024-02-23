import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import CheckboxButtons from '.';

describe('CheckboxButtons Component', () => {
  it('renders with default selected days', () => {
    const title = "Select all options that apply"
    const options = ['2Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const defaultSelectedOptions = ['Fri', 'Sat', 'Sun'];

    render(
      <CheckboxButtons
        title={title}
        options={options}
        defaultSelectedOptions={defaultSelectedOptions}
      />
    );

    // Check that checkboxes are rendered and selected correctly
    options.forEach((day) => {
      const checkbox = screen.getByLabelText(day);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBe(defaultSelectedOptions.includes(day));
    });
  });

  it('handles checkbox click', () => {
    const title = "Select all options that apply"
    const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    render(<CheckboxButtons
      title={title}
      options={options} />);

    // Check that clicking on a checkbox updates the state
    const checkbox = screen.getByLabelText('Mon');
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
