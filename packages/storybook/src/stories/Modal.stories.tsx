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

// Accessibility stories
export const A11yFocusTrap: Story = {
  name: 'A11y — Focus Trap',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Test Focus Trap</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
            </>
          }
        />
      </>
    );
  },
  parameters: {
    a11y: { element: '[role="dialog"]' },
    docs: {
      description: {
        story: 'When open, focus is trapped inside the modal. Tab cycles through interactive elements within the dialog. Pressing Escape closes the modal. Focus returns to the trigger element on close.',
      },
    },
  },
  args: {
    title: 'Focus Trap Demo',
    children: <p className="text-sm text-gray-600">Press Tab to cycle focus. Focus stays within the dialog until closed.</p>,
  },
};

export const A11yAriaAttributes: Story = {
  name: 'A11y — ARIA Attributes',
  parameters: {
    docs: {
      description: {
        story: 'Modal uses role="dialog", aria-modal="true", aria-labelledby pointing to the title, and aria-describedby pointing to the description. The backdrop uses aria-hidden="true". Body scroll is locked when the modal is open.',
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Test ARIA</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={<Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>}
        />
      </>
    );
  },
  args: {
    title: 'ARIA Demo',
    description: 'Check the rendered HTML for role, aria-modal, aria-labelledby, and aria-describedby attributes.',
    children: <p className="text-sm text-gray-600">This dialog has full ARIA support.</p>,
  },
};

export const A11yKeyboardNavigation: Story = {
  name: 'A11y — Keyboard Navigation',
  parameters: {
    docs: {
      description: {
        story: 'Full keyboard support: Escape to close, Tab to cycle forward through focusable elements, Shift+Tab to cycle backward. All interactive elements inside the modal are reachable via keyboard.',
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Test Keyboard</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Save</Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Discard</Button>
            </>
          }
        />
      </>
    );
  },
  args: {
    title: 'Keyboard Test',
    children: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Use keyboard to navigate between Cancel, Save, and Discard.</p>
        <input type="text" placeholder="Focusable input" className="w-full px-3 py-2 border rounded" />
      </div>
    ),
  },
};
