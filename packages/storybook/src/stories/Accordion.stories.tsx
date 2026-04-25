import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './stubs';
import { Settings, User, Bell } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
    variant: { control: 'select', options: ['default', 'bordered', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = (openValue: string[], setOpen: (v: string[]) => void) => (
  <>
    <AccordionItem value="item-1">
      <AccordionTrigger icon={<User className="h-4 w-4" />}>Account Settings</AccordionTrigger>
      <AccordionContent>
        Manage your account details, email preferences, and security settings. You can update your password and configure two-factor authentication.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger icon={<Bell className="h-4 w-4" />}>Notifications</AccordionTrigger>
      <AccordionContent>
        Configure which notifications you receive. Choose from email, push, or in-app notifications for different types of activities.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger icon={<Settings className="h-4 w-4" />}>Preferences</AccordionTrigger>
      <AccordionContent>
        Customize your experience with theme settings, language preferences, and display options. Changes save automatically.
      </AccordionContent>
    </AccordionItem>
  </>
);

export const Single: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>([]);
    return (
      <div className="w-96">
        <Accordion type="single" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>(['item-1']);
    return (
      <div className="w-96">
        <Accordion type="multiple" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const Bordered: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>([]);
    return (
      <div className="w-96">
        <Accordion type="single" variant="bordered" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const Ghost: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>([]);
    return (
      <div className="w-96">
        <Accordion type="single" variant="ghost" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>([]);
    return (
      <div className="w-96">
        <Accordion type="single" size="sm" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>([]);
    return (
      <div className="w-96">
        <Accordion type="single" size="lg" value={open} onValueChange={setOpen}>
          {sampleItems(open, setOpen)}
        </Accordion>
      </div>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => {
    const [open, setOpen] = useState<string[]>(['item-1']);
    return (
      <div className="w-96">
        <Accordion type="single" value={open} onValueChange={setOpen}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>
              This section is open by default. Click the header to toggle it closed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>
              This section starts closed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};
