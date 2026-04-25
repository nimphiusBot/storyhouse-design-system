import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Stepper } from './stubs';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'numbers', 'dots'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    activeStep: { control: { type: 'number', min: 0, max: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { id: 'info', label: 'Information', description: 'Basic details' },
  { id: 'payment', label: 'Payment', description: 'Payment method' },
  { id: 'confirm', label: 'Confirmation', description: 'Review & confirm' },
];

export const Default: Story = {
  args: { steps: defaultSteps, activeStep: 1 },
};

export const Completed: Story = {
  args: { steps: defaultSteps, activeStep: 3 },
};

export const FirstStep: Story = {
  args: { steps: defaultSteps, activeStep: 0 },
};

export const Numbers: Story = {
  args: { steps: defaultSteps, activeStep: 1, variant: 'numbers' },
};

export const Dots: Story = {
  args: { steps: defaultSteps, activeStep: 1, variant: 'dots' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10 w-96">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">Small</p>
        <Stepper steps={defaultSteps} activeStep={1} size="sm" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">Medium</p>
        <Stepper steps={defaultSteps} activeStep={1} size="md" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">Large</p>
        <Stepper steps={defaultSteps} activeStep={1} size="lg" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    const steps = [
      { id: 'info', label: 'Information', description: 'Your details', disabled: false },
      { id: 'payment', label: 'Payment', description: 'Payment method', disabled: active < 1 },
      { id: 'review', label: 'Review', description: 'Final review', disabled: active < 2 },
    ];
    return (
      <div className="w-96 space-y-6">
        <Stepper
          steps={steps}
          activeStep={active}
          variant="numbers"
          allowStepClick
          onStepClick={setActive}
        />
        <div className="flex justify-between">
          <button
            disabled={active === 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Back
          </button>
          <button
            disabled={active === steps.length}
            onClick={() => setActive((a) => Math.min(steps.length, a + 1))}
            className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg disabled:opacity-50"
          >
            {active === steps.length ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    return (
      <div className="w-72">
        <Stepper
          steps={defaultSteps}
          activeStep={active}
          orientation="vertical"
          allowStepClick
          onStepClick={setActive}
        />
      </div>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    const steps = [
      { id: 'info', label: 'Information', description: 'Step 1 of 3' },
      { id: 'payment', label: 'Payment', description: 'Step 2 of 3' },
      { id: 'confirm', label: 'Confirmation', description: 'Step 3 of 3' },
    ];
    const content = [
      <p key="1" className="text-sm text-gray-600">Please fill in your personal details to get started.</p>,
      <p key="2" className="text-sm text-gray-600">Enter your payment information to complete the setup.</p>,
      <p key="3" className="text-sm text-gray-600">Review all the information before submitting.</p>,
    ];
    return (
      <div className="w-96">
        <Stepper steps={steps} activeStep={active}>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            {content[active]}
          </div>
          <div className="flex justify-between mt-4">
            <button
              disabled={active === 0}
              onClick={() => setActive((a) => a - 1)}
              className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg disabled:opacity-50"
            >
              Back
            </button>
            <button
              disabled={active === steps.length - 1}
              onClick={() => setActive((a) => a + 1)}
              className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </Stepper>
      </div>
    );
  },
};
