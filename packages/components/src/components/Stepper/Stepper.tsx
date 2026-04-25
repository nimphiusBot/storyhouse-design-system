import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface Step {
  /** Unique identifier for the step */
  id: string;
  /** Step label */
  label: string;
  /** Optional description shown below the label */
  description?: string;
  /** Optional icon override */
  icon?: React.ReactNode;
  /** Whether this step is disabled */
  disabled?: boolean;
}

export interface StepperProps {
  /** Array of steps */
  steps: Step[];
  /** Currently active step index */
  activeStep: number;
  /** Visual variant */
  variant?: 'default' | 'numbers' | 'dots';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when a previous step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Whether to allow clicking on completed steps to go back */
  allowStepClick?: boolean;
  /** Class name override */
  className?: string;
  /** Custom content shown after the stepper */
  children?: React.ReactNode;
}

const sizeConfig: Record<string, { step: string; label: string; desc: string }> = {
  sm: { step: 'h-6 w-6 text-xs', label: 'text-xs', desc: 'text-[10px]' },
  md: { step: 'h-8 w-8 text-sm', label: 'text-sm', desc: 'text-xs' },
  lg: { step: 'h-10 w-10 text-base', label: 'text-base', desc: 'text-sm' },
};

/**
 * Stepper
 *
 * Multi-step progress indicator for forms, wizards, and onboarding flows.
 * Supports three visual variants (default with checkmarks, numbers, dots),
 * two orientations (horizontal/vertical), and clickable step navigation.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'info', label: 'Information' },
 *   { id: 'payment', label: 'Payment' },
 *   { id: 'confirm', label: 'Confirmation' },
 * ];
 *
 * <Stepper steps={steps} activeStep={1} />
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  onStepClick,
  allowStepClick = true,
  className,
  children,
}) => {
  const s = sizeConfig[size]!;
  const isVertical = orientation === 'vertical';

  return (
    <div className={cn(isVertical ? 'flex flex-col' : 'flex flex-col', className)}>
      <div
        className={cn(
          isVertical ? 'flex-col gap-0' : 'flex-row items-start',
          'flex'
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isClickable = allowStepClick && index < activeStep;

          const stepCircle = (() => {
            if (variant === 'dots') {
              return (
                <div
                  className={cn(
                    'rounded-full transition-all duration-200',
                    s.step,
                    'flex items-center justify-center',
                    isActive && 'bg-orange-500 shadow-sm shadow-orange-500/25 scale-110',
                    isCompleted && 'bg-orange-400',
                    !isActive && !isCompleted && 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              );
            }

            if (variant === 'numbers') {
              return (
                <div
                  className={cn(
                    'rounded-full border-2 font-semibold flex items-center justify-center transition-all duration-200',
                    s.step,
                    isActive && 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
                    isCompleted && 'border-orange-400 bg-orange-400 text-white',
                    !isActive && !isCompleted && 'border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </div>
              );
            }

            // Default: checkmark on completed, circle on active/upcoming
            return (
              <div
                className={cn(
                  'rounded-full flex items-center justify-center transition-all duration-200',
                  s.step,
                  isActive && 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 ring-2 ring-orange-200 dark:ring-orange-800',
                  isCompleted && 'bg-orange-500 text-white',
                  !isActive && !isCompleted && 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : isActive ? index + 1 : index + 1}
              </div>
            );
          })();

          const connector = index < steps.length - 1 && (
            <div
              className={cn(
                isVertical
                  ? 'ml-3 h-8 w-0.5'
                  : 'mt-4 h-0.5 flex-1 min-w-[2rem] mx-2',
                'transition-colors duration-300',
                index < activeStep
                  ? 'bg-orange-400'
                  : 'bg-gray-200 dark:bg-gray-700'
              )}
            />
          );

          return (
            <div
              key={step.id}
              className={cn(
                isVertical
                  ? 'flex items-start gap-3'
                  : 'flex flex-col items-center flex-1',
                step.disabled && 'opacity-50 pointer-events-none'
              )}
            >
              <div className={cn(
                'flex items-center',
                isVertical ? 'w-full' : 'flex-col items-center'
              )}>
                {/* Clickable step circle */}
                {isClickable && isVertical ? (
                  <div className="flex items-start gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => onStepClick?.(index)}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full"
                    >
                      {stepCircle}
                    </button>
                    <div className="flex flex-col py-0.5 cursor-pointer" onClick={() => onStepClick?.(index)}>
                      <span className={cn('font-medium', s.label, isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-gray-100')}>
                        {step.label}
                      </span>
                      {step.description && (
                        <span className={cn(s.desc, 'text-gray-500 dark:text-gray-400')}>
                          {step.description}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {isClickable ? (
                      <button
                        type="button"
                        onClick={() => onStepClick?.(index)}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full cursor-pointer hover:opacity-80"
                      >
                        {stepCircle}
                      </button>
                    ) : (
                      stepCircle
                    )}
                    {!isVertical && (
                      <div className={cn('text-center mt-2', isClickable && 'cursor-pointer')} onClick={() => isClickable && onStepClick?.(index)}>
                        <span className={cn('block font-medium', s.label, isActive ? 'text-orange-600 dark:text-orange-400' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400')}>
                          {step.label}
                        </span>
                        {step.description && (
                          <span className={cn(s.desc, 'text-gray-400 dark:text-gray-500')}>
                            {step.description}
                          </span>
                        )}
                      </div>
                    )}
                    {isVertical && (
                      <div className="flex flex-col py-0.5">
                        <span className={cn('font-medium', s.label, isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-gray-100')}>
                          {step.label}
                        </span>
                        {step.description && (
                          <span className={cn(s.desc, 'text-gray-500 dark:text-gray-400')}>
                            {step.description}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Connector line */}
              {!isVertical && connector}

              {isVertical && (
                <div className="ml-3">
                  {connector}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {children && (
        <div className={cn('mt-6', isVertical && 'ml-11')}>
          {children}
        </div>
      )}
    </div>
  );
};

Stepper.displayName = 'Stepper';
