import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, ConfirmModal, Button } from './stubs';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    variant: { control: 'select', options: ['default', 'danger', 'success', 'info', 'warning'] },
    showCloseButton: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
            </>
          }
        />
      </>
    );
  },
  args: {
    title: 'Modal Title',
    description: 'This is a description of what this modal is for.',
    children: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This is the modal content. You can put anything here - forms, text, images, etc.
        </p>
        <p className="text-sm text-gray-600">The modal is centered on the screen and has a backdrop.</p>
      </div>
    ),
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [OpenLg, setOpenLg] = useState(false);

    return (
      <div className="flex gap-3">
        <Button onClick={() => setOpenSm(true)}>Small</Button>
        <Button onClick={() => setOpenMd(true)}>Medium</Button>
        <Button onClick={() => setOpenLg(true)}>Large</Button>

        <Modal size="sm" isOpen={openSm} onClose={() => setOpenSm(false)}
          title="Small Modal"
          footer={<Button variant="primary" onClick={() => setOpenSm(false)}>OK</Button>}
        >
          <p className="text-sm text-gray-600">Compact modal content.</p>
        </Modal>

        <Modal size="md" isOpen={openMd} onClose={() => setOpenMd(false)}
          title="Medium Modal"
          footer={<Button variant="primary" onClick={() => setOpenMd(false)}>OK</Button>}
        >
          <p className="text-sm text-gray-600">Standard modal content.</p>
        </Modal>

        <Modal size="lg" isOpen={OpenLg} onClose={() => setOpenLg(false)}
          title="Large Modal"
          footer={<Button variant="primary" onClick={() => setOpenLg(false)}>OK</Button>}
        >
          <p className="text-sm text-gray-600">Large modal content with more space.</p>
        </Modal>
      </div>
    );
  },
};

export const WithLongContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Accept</Button>
            </>
          }
        />
      </>
    );
  },
  args: {
    title: 'Terms & Conditions',
    children: (
      <div className="space-y-4 text-sm text-gray-600">
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    ),
  },
};

export const Danger: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>Delete</Button>
            </>
          }
        />
      </>
    );
  },
  args: {
    variant: 'danger',
    title: 'Delete Account',
    description: 'This action cannot be undone. All your data will be permanently deleted.',
    children: <p className="text-sm text-gray-600">Are you sure you want to proceed?</p>,
  },
};

export const Loading: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} loading />
      </>
    );
  },
  args: {
    title: 'Loading',
  },
};
