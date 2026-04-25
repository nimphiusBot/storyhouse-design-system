import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUpload } from './stubs';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    accept: { control: 'text', description: 'Accepted file types (MIME types and/or extensions)' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Upload File',
    helpText: 'Supports all file types.',
  },
};

/**
 * Restricts the file picker and validation to images only
 * using the `<code>accept="image/*"</code> prop.
 */
export const ImagesOnly: Story = {
  args: {
    label: 'Upload Profile Image',
    accept: 'image/*',
    helpText: 'Upload a profile image. Accepted: JPEG, PNG, GIF, WebP.',
    maxSize: 5 * 1024 * 1024,
  },
};

/**
 * Restricts to specific image formats (JPEG and PNG only)
 * using exact MIME types.
 */
export const ExactImageFormats: Story = {
  args: {
    label: 'Upload JPEG or PNG',
    accept: 'image/jpeg,image/png',
    helpText: 'Only JPEG and PNG files are accepted.',
    maxSize: 10 * 1024 * 1024,
  },
};

/**
 * Restricts to document formats using file extensions.
 */
export const DocumentsOnly: Story = {
  args: {
    label: 'Upload Documents',
    multiple: true,
    maxFiles: 5,
    accept: '.pdf,.doc,.docx',
    helpText: 'Upload up to 5 documents (PDF, DOC, DOCX).',
    maxSize: 20 * 1024 * 1024,
  },
};

/**
 * Accepts multiple media types using a combination
 * of MIME patterns and extensions.
 */
export const MediaAndDocuments: Story = {
  args: {
    label: 'Upload Media or Documents',
    multiple: true,
    maxFiles: 10,
    accept: 'image/*,video/*,.pdf',
    helpText: 'Accepts images, videos, and PDF documents.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Upload File',
    error: 'File size exceeds the maximum limit of 5 MB.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Upload File',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FileUpload size="sm" label="Small" accept="image/*" />
      <FileUpload size="md" label="Medium" accept="image/*" />
      <FileUpload size="lg" label="Large" accept="image/*" />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    label: 'Upload File',
    icon: (
      <span className="text-2xl">📁</span>
    ),
  },
};

/**
 * Interactive example with file type validation feedback.
 * Try dropping a non-image file to see the error state.
 */
export const ValidationFeedback: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-500">Drop any file — only images are accepted:</p>
        <FileUpload
          label="Upload Images Only"
          accept="image/*"
          multiple
          maxFiles={3}
          maxSize={10 * 1024 * 1024}
          onFilesChange={setFiles}
        />
        {files.length > 0 && (
          <p className="text-xs text-green-600">
            {files.length} file{files.length !== 1 ? 's' : ''} uploaded successfully
          </p>
        )}
      </div>
    );
  },
};
