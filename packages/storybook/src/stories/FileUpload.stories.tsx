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
    accept: { control: 'text' },
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

export const SingleImage: Story = {
  args: {
    label: 'Upload Profile Image',
    accept: 'image/*',
    helpText: 'Recommended: Square image, max 5MB.',
    maxSize: 5 * 1024 * 1024,
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload Documents',
    multiple: true,
    maxFiles: 5,
    accept: '.pdf,.doc,.docx',
    helpText: 'Upload up to 5 documents (PDF, DOC).',
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
      <FileUpload size="sm" label="Small" />
      <FileUpload size="md" label="Medium" />
      <FileUpload size="lg" label="Large" />
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
