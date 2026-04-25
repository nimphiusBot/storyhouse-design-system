import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from './Stepper';

describe('Stepper', () => {
  const steps = [
    { id: 'step-1', label: 'Information' },
    { id: 'step-2', label: 'Payment' },
    { id: 'step-3', label: 'Confirmation' },
  ];

  it('renders all step labels', () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });

  it('renders completed state', () => {
    render(<Stepper steps={steps} activeStep={3} />);
    expect(screen.getByText('Information')).toBeInTheDocument();
  });

  it('calls onStepClick when clicking previous step', () => {
    const fn = vi.fn();
    render(<Stepper steps={steps} activeStep={2} allowStepClick onStepClick={fn} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]!);
    expect(fn).toHaveBeenCalledWith(0);
  });

  it('renders with children', () => {
    render(
      <Stepper steps={steps} activeStep={0}>
        <div>Step content</div>
      </Stepper>
    );
    expect(screen.getByText('Step content')).toBeInTheDocument();
  });

  it('renders variant numbers', () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} variant="numbers" />);
    expect(container.querySelectorAll('.border-2').length).toBeGreaterThan(0);
  });

  it('renders variant dots', () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} variant="dots" />);
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it('renders with descriptions', () => {
    const stepsWithDesc = [
      { id: '1', label: 'Step 1', description: 'First step' },
      { id: '2', label: 'Step 2', description: 'Second step' },
    ];
    render(<Stepper steps={stepsWithDesc} activeStep={0} />);
    expect(screen.getByText('First step')).toBeInTheDocument();
  });
});
