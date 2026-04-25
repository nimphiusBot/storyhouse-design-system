import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from './index';

// Helper to create a mock File
function createMockFile(name: string, size: number, type: string): File {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
}

function createFileList(files: File[]): FileList {
  const dt = new DataTransfer();
  files.forEach(f => dt.items.add(f));
  return dt.files;
}

describe('FileUpload', () => {
  it('renders with default props', () => {
    render(<FileUpload />);
    expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileUpload label="Upload files" />);
    expect(screen.getByText('Upload files')).toBeInTheDocument();
  });

  it('renders with help text', () => {
    render(<FileUpload helpText="Max 10MB" />);
    expect(screen.getByText('Max 10MB')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<FileUpload error="File is required" />);
    expect(screen.getByText('File is required')).toBeInTheDocument();
  });

  it('renders with custom drag text', () => {
    render(<FileUpload dragText="Drop your files here" />);
    expect(screen.getByText('Drop your files here')).toBeInTheDocument();
  });

  it('renders with custom browse text', () => {
    render(<FileUpload browseText="click to upload" />);
    expect(screen.getByText('click to upload')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(<FileUpload icon={<span data-testid="custom-icon">📁</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('shows accepted file types', () => {
    render(<FileUpload accept=".jpg,.png" />);
    expect(screen.getByText(/Accepted:/)).toBeInTheDocument();
  });

  it('shows max file size', () => {
    render(<FileUpload maxSize={10485760} />); // 10MB
    expect(screen.getByText(/Max size:/)).toBeInTheDocument();
  });

  it('shows max files count', () => {
    render(<FileUpload maxFiles={5} />);
    expect(screen.getByText(/Max files:/)).toBeInTheDocument();
  });

  it('handles file drop', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;

    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file]) } });

    expect(onFilesChange).toHaveBeenCalled();
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('removes a file on remove click', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file]) } });

    const removeButton = document.querySelector('button[type="button"]');
    fireEvent.click(removeButton!);
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it('displays file size after upload', () => {
    render(<FileUpload />);
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;
    const file = createMockFile('test.jpg', 1024 * 5, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file]) } });
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
    expect(screen.getByText(/KB/)).toBeInTheDocument();
  });

  it('shows error when file exceeds max size', () => {
    render(<FileUpload maxSize={100} />); // 100 bytes max
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;
    const file = createMockFile('large.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file]) } });
    expect(screen.getByText(/exceeds maximum size/)).toBeInTheDocument();
  });

  it('shows error when file type is not accepted', () => {
    render(<FileUpload accept=".png" />);
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file]) } });
    expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
  });

  it('shows error when max files exceeded', () => {
    render(<FileUpload maxFiles={1} multiple />);
    const dropZone = screen.getByText('Drag and drop files here').parentElement!;
    const file1 = createMockFile('test1.jpg', 1024, 'image/jpeg');
    const file2 = createMockFile('test2.png', 1024, 'image/png');
    fireEvent.drop(dropZone, { dataTransfer: { files: createFileList([file1, file2]) } });
    expect(screen.getByText(/Maximum 1 file allowed/)).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<FileUpload label="Upload" disabled />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });

  it('renders required indicator', () => {
    render(<FileUpload label="Upload" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('has role="alert" for error messages', () => {
    render(<FileUpload error="Required" />);
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBeGreaterThanOrEqual(1);
  });

  it('applies isDragging state classes', () => {
    render(<FileUpload />);
    const container = screen.getByText('Drag and drop files here').parentElement!;
    fireEvent.dragOver(container);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { container, rerender } = render(<FileUpload size="sm" />);
    let dropZone = container.firstChild as HTMLElement;
    expect(dropZone.className).toContain('p-4');

    rerender(<FileUpload size="lg" />);
    dropZone = container.firstChild as HTMLElement;
    expect(dropZone.className).toContain('p-8');
  });
});
