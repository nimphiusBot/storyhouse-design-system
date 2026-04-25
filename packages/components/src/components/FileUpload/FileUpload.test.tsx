import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from './index';

// Mock URL.createObjectURL for jsdom
URL.createObjectURL = vi.fn(() => 'blob:mock');

// Helper to create a mock File
function createMockFile(name: string, size: number, type: string): File {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
}

/**
 * Find the dropzone element — the outer div with drag/drop/click handlers.
 * It's the grandparent of the "Drag and drop files here" text node.
 */
function getDropzone(): HTMLElement {
  const textEl = screen.getByText('Drag and drop files here');
  // text <p> → parent <div class="flex"> → parent <div class="dropzone">
  return textEl.parentElement!.parentElement!;
}

/**
 * Create a DataTransfer-like object compatible with jsdom.
 */
function createFileList(files: File[]): { files: File[]; types: string[] } {
  return { files, types: ['Files'] };
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

  it('renders a native file input with type="file"', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
  });

  // ─── accept prop tests ───────────────────────────────────────────────

  describe('accept prop', () => {
    it('passes accept attribute to native input element', () => {
      render(<FileUpload accept="image/*" />);
      const input = document.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('shows human-readable accepted file types in the UI', () => {
      render(<FileUpload accept="image/*,.pdf" />);
      expect(screen.getByText(/Accepts:/)).toBeInTheDocument();
      expect(screen.getByText(/Images/)).toBeInTheDocument();
      expect(screen.getByText(/PDF Files/)).toBeInTheDocument();
    });

    it('handles multiple MIME type patterns', () => {
      render(<FileUpload accept="image/jpeg,image/png" />);
      expect(screen.getByText(/JPEG Images/)).toBeInTheDocument();
      expect(screen.getByText(/PNG Images/)).toBeInTheDocument();
    });

    it('handles wildcard MIME type patterns', () => {
      render(<FileUpload accept="image/*,video/*,audio/*" />);
      expect(screen.getByText(/Images/)).toBeInTheDocument();
      expect(screen.getByText(/Videos/)).toBeInTheDocument();
      expect(screen.getByText(/Audio/)).toBeInTheDocument();
    });

    it('validates files by MIME type on drop — rejects invalid files', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const pdf = createMockFile('doc.pdf', 1024, 'application/pdf');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([pdf]) });
      expect(onFilesChange).not.toHaveBeenCalled();
      expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
    });

    it('validates files by MIME type on drop — accepts valid files', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const jpg = createMockFile('photo.jpg', 1024, 'image/jpeg');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([jpg]) });
      expect(onFilesChange).toHaveBeenCalledWith([jpg]);
      expect(screen.getByText('photo.jpg')).toBeInTheDocument();
    });

    it('validates files by extension on drop — rejects invalid files', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept=".pdf,.doc" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const image = createMockFile('photo.jpg', 1024, 'image/jpeg');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([image]) });
      expect(onFilesChange).not.toHaveBeenCalled();
      expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
    });

    it('validates files by extension on drop — accepts valid files', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept=".pdf,.doc" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const pdf = createMockFile('doc.pdf', 1024, 'application/pdf');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([pdf]) });
      expect(onFilesChange).toHaveBeenCalledWith([pdf]);
      expect(screen.getByText('doc.pdf')).toBeInTheDocument();
    });

    it('accepts files matching wildcard MIME type', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const png = createMockFile('photo.png', 2048, 'image/png');
      const gif = createMockFile('anim.gif', 4096, 'image/gif');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([png, gif]) });
      expect(onFilesChange).toHaveBeenCalledWith([png, gif]);
    });

    it('accepts exact MIME types but rejects others', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept="application/pdf,text/plain" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const pdf = createMockFile('doc.pdf', 1024, 'application/pdf');
      const txt = createMockFile('notes.txt', 512, 'text/plain');
      const jpg = createMockFile('img.jpg', 2048, 'image/jpeg');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([pdf, txt, jpg]) });
      expect(onFilesChange).toHaveBeenCalledWith([pdf, txt]);
      expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
    });

    it('accepts files with no MIME type when extension matches', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept=".csv" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const csv = createMockFile('data.csv', 256, '');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([csv]) });
      expect(onFilesChange).toHaveBeenCalledWith([csv]);
    });

    it('rejects files with no MIME type when no extension match', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload accept=".csv" onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const unknown = createMockFile('data.bin', 256, '');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([unknown]) });
      expect(onFilesChange).not.toHaveBeenCalled();
      expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
    });

    it('accepts all file types when accept prop is not set', () => {
      const onFilesChange = vi.fn();
      render(<FileUpload onFilesChange={onFilesChange} />);
      const dropZone = getDropzone();
      const jpg = createMockFile('photo.jpg', 1024, 'image/jpeg');
      const pdf = createMockFile('doc.pdf', 2048, 'application/pdf');
      fireEvent.drop(dropZone, { dataTransfer: createFileList([jpg, pdf]) });
      expect(onFilesChange).toHaveBeenCalledWith([jpg, pdf]);
    });

    it('shows accept info with max size and max files', () => {
      render(<FileUpload accept="image/*" maxSize={5 * 1024 * 1024} maxFiles={3} />);
      expect(screen.getByText(/Accepts:/)).toBeInTheDocument();
      expect(screen.getByText(/Images/)).toBeInTheDocument();
      expect(screen.getByText(/Max:/)).toBeInTheDocument();
      expect(screen.getByText(/5 MB/)).toBeInTheDocument();
      expect(screen.getByText(/Up to 3 files/)).toBeInTheDocument();
    });
  });

  // ─── end accept prop tests ───────────────────────────────────────────

  it('shows max file size', () => {
    render(<FileUpload maxSize={10485760} />);
    expect(screen.getByText(/Max:/)).toBeInTheDocument();
  });

  it('shows max files count', () => {
    render(<FileUpload maxFiles={5} />);
    expect(screen.getByText(/Up to 5 files/)).toBeInTheDocument();
  });

  it('handles file drop', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const dropZone = getDropzone();
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file]) });
    expect(onFilesChange).toHaveBeenCalled();
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('removes a file on remove click', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const dropZone = getDropzone();
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file]) });
    const removeButton = document.querySelector('button[aria-label="Remove test.jpg"]');
    fireEvent.click(removeButton!);
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it('displays file size after upload', () => {
    render(<FileUpload />);
    const dropZone = getDropzone();
    const file = createMockFile('test.jpg', 1024 * 5, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file]) });
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
    expect(screen.getByText(/KB/)).toBeInTheDocument();
  });

  it('shows error when file exceeds max size', () => {
    render(<FileUpload maxSize={100} />);
    const dropZone = getDropzone();
    const file = createMockFile('large.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file]) });
    expect(screen.getByText(/exceeds the maximum size/)).toBeInTheDocument();
  });

  it('shows error when file type is not accepted', () => {
    render(<FileUpload accept=".png" />);
    const dropZone = getDropzone();
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file]) });
    expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();
  });

  it('shows error when max files exceeded', () => {
    render(<FileUpload maxFiles={1} multiple />);
    const dropZone = getDropzone();
    const file1 = createMockFile('test1.jpg', 1024, 'image/jpeg');
    const file2 = createMockFile('test2.png', 1024, 'image/png');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([file1, file2]) });
    expect(screen.getByText(/Maximum 1 file allowed/)).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<FileUpload label="Upload" disabled />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });

  it('renders required indicator via CSS pseudo-element', () => {
    render(<FileUpload label="Upload" required />);
    const label = screen.getByText('Upload');
    expect(label.className).toContain('after:content-');
  });

  it('has role="alert" for error messages', () => {
    render(<FileUpload error="Required" />);
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBeGreaterThanOrEqual(1);
  });

  it('shows alert icon in error messages', () => {
    render(<FileUpload error="Something went wrong" />);
    const alertEl = screen.getByRole('alert');
    const svg = alertEl.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies isDragging state classes', () => {
    render(<FileUpload />);
    const dropzone = getDropzone();
    fireEvent.dragOver(dropzone);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<FileUpload size="sm" />);
    const dropZoneSm = getDropzone();
    expect(dropZoneSm.className).toContain('p-4');

    rerender(<FileUpload size="lg" />);
    const dropZoneLg = getDropzone();
    expect(dropZoneLg.className).toContain('p-8');
  });

  it('clears file errors when clicking the dropzone again', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
    const dropZone = getDropzone();

    // Drop a rejected file first
    const pdf = createMockFile('doc.pdf', 1024, 'application/pdf');
    fireEvent.drop(dropZone, { dataTransfer: createFileList([pdf]) });
    expect(screen.getByText(/not an accepted file type/)).toBeInTheDocument();

    // Click the dropzone to clear errors
    fireEvent.click(dropZone);
    expect(screen.queryByText(/not an accepted file type/)).not.toBeInTheDocument();
  });

  it('has accessible attributes on the dropzone', () => {
    render(<FileUpload />);
    const dropZone = getDropzone();
    expect(dropZone).toHaveAttribute('role', 'button');
    expect(dropZone).toHaveAttribute('tabIndex', '0');
  });

  it('does not respond to keyboard interaction when disabled', () => {
    render(<FileUpload disabled />);
    const dropzone = getDropzone();
    expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    expect(dropzone).toHaveAttribute('tabIndex', '-1');
  });
});
