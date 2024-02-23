import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload from '.';

describe('FileUpload component', () => {

  let mockOnFileUpload;
  let mockOnFileRemove;

  beforeEach(() => {
    mockOnFileUpload = jest.fn();
    mockOnFileRemove = jest.fn();
  });
  it('calls onFileUpload when a valid file is selected', () => {
    const file = new File(['file content'], 'example.txt', { type: 'text/plain' });

    render(<FileUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = screen.getByLabelText('Choose file');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  xit('does not call onFileUpload when an invalid file is selected', () => {
    const largeFile = new File(['file content'], 'largeFile.txt', { type: 'text/plain', size: 3 * 1024 * 1024 });

    render(<FileUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = screen.getByLabelText('Choose file');
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });

  it('calls onFileRemove when the "Remove file" button is clicked', () => {

    render(<FileUpload onFileRemove={mockOnFileRemove} selectedFile={new File(['file content'], 'example.txt', { type: 'text/plain' })} />);

    const removeButton = screen.getByText('Remove file');
    fireEvent.click(removeButton);

    expect(mockOnFileRemove).toHaveBeenCalled();
  });

  it('displays an error message when an invalid file is selected', () => {
    const largeFile = new File(['file content'], 'largeFile.txt', { type: 'text/plain', size: 3 * 1024 * 1024 });

    render(<FileUpload error onFileUpload={() => { }} />);

    const fileInput = screen.getByLabelText('Choose file');
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    const errorMessage = screen.getByText('File must be less than 2mb');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays the selected file name when a file is selected', () => {
    const selectedFile = new File(['file content'], 'example.txt', { type: 'text/plain' });

    render(<FileUpload selectedFile={selectedFile} />);

    const fileNameText = screen.getByText('example.txt');
    expect(fileNameText).toBeInTheDocument();
  });

  it('displays "no file selected" when no file is selected', () => {
    render(<FileUpload />);

    const noFileText = screen.getByText('no file selected');
    expect(noFileText).toBeInTheDocument();
  });
});
