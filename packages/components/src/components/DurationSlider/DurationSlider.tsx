import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Edit3, Check, X } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface DurationOption {
  value: 20 | 60 | 90 | 900;
  label: string;
  sublabel: string;
}

export interface DurationSliderProps {
  /** Current duration value (snap to 20, 60, 90, or 900 seconds) */
  value: 20 | 60 | 90 | 900;
  /** Change handler */
  onChange: (value: 20 | 60 | 90 | 900) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const DURATION_OPTIONS: DurationOption[] = [
  { value: 20, label: 'Short', sublabel: '20s' },
  { value: 60, label: 'Standard', sublabel: '60s' },
  { value: 90, label: 'Extended', sublabel: '90s' },
  { value: 900, label: 'Long Form', sublabel: '15min' },
];

/**
 * DurationSlider
 *
 * A beautiful segmented slider for duration selection with snap-to-detent behavior.
 * Snaps to predefined values: 20s, 60s, 90s, 900s (15min).
 *
 * Features:
 * - Snap-to-detent behavior with visual feedback
 * - Keyboard navigation (arrow keys, Home, End)
 * - Manual input mode for custom values
 * - Touch-friendly with 48px tap targets
 * - Full accessibility with slider role and ARIA attributes
 *
 * @example
 * ```tsx
 * <DurationSlider
 *   value={duration}
 *   onChange={setDuration}
 * />
 * ```
 */
export const DurationSlider: React.FC<DurationSliderProps> = ({
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const trackRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentIndex = DURATION_OPTIONS.findIndex((opt: DurationOption) => opt.value === value);
  const isCustomValue = currentIndex === -1;
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const displayLabel = isCustomValue ? 'Custom' : DURATION_OPTIONS[safeIndex]!.label;
  const displaySubLabel = isCustomValue ? `${value}s` : DURATION_OPTIONS[safeIndex]!.sublabel;

  // Calculate percentage position (0-100) with evenly-spaced detents
  const calcCustomPercentage = (): number => {
    for (let i = 0; i < DURATION_OPTIONS.length - 1; i++) {
      const current = DURATION_OPTIONS[i]!.value;
      const next = DURATION_OPTIONS[i + 1]!.value;
      if (value >= current && value <= next) {
        const ratio = (value - current) / (next - current);
        const currentPct = (i / (DURATION_OPTIONS.length - 1)) * 100;
        const nextPct = ((i + 1) / (DURATION_OPTIONS.length - 1)) * 100;
        return currentPct + ratio * (nextPct - currentPct);
      }
    }
    return value >= DURATION_OPTIONS[DURATION_OPTIONS.length - 1]!.value ? 100 : 0;
  };

  const percentage = isCustomValue
    ? calcCustomPercentage()
    : (safeIndex / (DURATION_OPTIONS.length - 1)) * 100;

  // Start editing
  const handleStartEdit = () => {
    if (disabled) return;
    setInputValue(value.toString());
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setInputValue('');
  };

  // Confirm editing — snap to nearest valid duration option
  const handleConfirmEdit = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 900) {
      const valid = DURATION_OPTIONS.find((o: DurationOption) => o.value === numValue);
      if (valid) {
        onChange(valid.value);
      } else {
        // Snap to nearest valid value
        const snapped = DURATION_OPTIONS.reduce((prev: DurationOption, curr: DurationOption) =>
          Math.abs(curr.value - numValue) < Math.abs(prev.value - numValue) ? curr : prev
        );
        onChange(snapped.value);
      }
    }
    setIsEditing(false);
    setInputValue('');
  };

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirmEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = (clickX / rect.width) * 100;

    const nearestIndex = Math.round((clickPercentage / 100) * (DURATION_OPTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(DURATION_OPTIONS.length - 1, nearestIndex));

    onChange(DURATION_OPTIONS[clampedIndex]!.value);
  };

  const handleMouseDown = () => {
    if (!disabled) setIsDragging(true);
  };

  const handleTouchStart = () => {
    if (!disabled) setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const movePercentage = (moveX / rect.width) * 100;

    const nearestIndex = Math.round((movePercentage / 100) * (DURATION_OPTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(DURATION_OPTIONS.length - 1, nearestIndex));

    if (DURATION_OPTIONS[clampedIndex]!.value !== value) {
      onChange(DURATION_OPTIONS[clampedIndex]!.value);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || disabled || !trackRef.current || !e.touches[0]) return;
    // Prevent page scroll while dragging the slider
    e.preventDefault();

    const rect = trackRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const moveX = touch.clientX - rect.left;
    const movePercentage = (moveX / rect.width) * 100;

    const nearestIndex = Math.round((movePercentage / 100) * (DURATION_OPTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(DURATION_OPTIONS.length - 1, nearestIndex));

    if (DURATION_OPTIONS[clampedIndex]!.value !== value) {
      onChange(DURATION_OPTIONS[clampedIndex]!.value);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (safeIndex > 0) {
        onChange(DURATION_OPTIONS[safeIndex - 1]!.value);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (safeIndex < DURATION_OPTIONS.length - 1) {
        onChange(DURATION_OPTIONS[safeIndex + 1]!.value);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(DURATION_OPTIONS[0]!.value);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(DURATION_OPTIONS[DURATION_OPTIONS.length - 1]!.value);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Labels Above Track */}
      <div className="flex justify-between mb-2 px-1">
        {DURATION_OPTIONS.map((option: DurationOption) => (
          <button
            key={option.value}
            onClick={() => !disabled && onChange(option.value)}
            disabled={disabled}
            className={cn(
              'text-xs font-medium transition-colors cursor-pointer',
              'hover:text-orange-600 dark:hover:text-orange-400',
              'disabled:cursor-not-allowed disabled:opacity-50',
              value === option.value ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'
            )}
            style={{ width: `${100 / DURATION_OPTIONS.length}%` }}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Track Container */}
      <div className="relative pt-2 pb-2">
        {/* Track Background */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className={cn(
            'relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full',
            !disabled && 'cursor-pointer'
          )}
        >
          {/* Filled Track */}
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 dark:bg-orange-400 rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />

          {/* Detent Dots */}
          {DURATION_OPTIONS.map((option: DurationOption) => {
            const dotIndex = DURATION_OPTIONS.indexOf(option);
            const dotPercentage = (dotIndex / (DURATION_OPTIONS.length - 1)) * 100;
            const isActiveDot = isCustomValue ? value >= option.value : dotIndex <= safeIndex;
            return (
              <div
                key={option.value}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors',
                  isActiveDot ? 'bg-white' : 'bg-gray-400 dark:bg-gray-500'
                )}
                style={{ left: `${dotPercentage}%`, transform: 'translate(-50%, -50%)' }}
              />
            );
          })}

          {/* Thumb */}
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              'w-6 h-6 bg-white dark:bg-gray-200 rounded-full',
              'border-2 border-orange-500 dark:border-orange-400',
              'shadow-lg',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              'disabled:cursor-not-allowed disabled:opacity-50',
              !disabled && 'hover:scale-110 hover:shadow-xl',
              isDragging && 'scale-110 shadow-xl'
            )}
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
            aria-label={`Duration: ${displayLabel} (${displaySubLabel})`}
            aria-valuemin={0}
            aria-valuemax={900}
            aria-valuenow={value}
            aria-valuetext={`${displayLabel} - ${displaySubLabel}`}
            role="slider"
          />
        </div>
      </div>

      {/* Labels Below Track */}
      <div className="flex justify-between mt-2 px-1">
        {DURATION_OPTIONS.map((option: DurationOption) => (
          <div
            key={option.value}
            className={cn(
              'text-xs transition-colors',
              value === option.value ? 'text-orange-600 dark:text-orange-400 font-semibold' : 'text-gray-400 dark:text-gray-500'
            )}
            style={{ width: `${100 / DURATION_OPTIONS.length}%`, textAlign: 'center' }}
          >
            {option.sublabel}
          </div>
        ))}
      </div>

      {/* Current Selection Display / Manual Input */}
      <div className="text-center mt-3">
        {isEditing ? (
          <div className="flex items-center justify-center gap-2">
            <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleConfirmEdit}
              placeholder="Seconds"
              min="1"
              max="900"
              className={cn(
                'w-24 px-3 py-1.5 text-sm text-center',
                'border-2 border-orange-500 rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              )}
            />
            <button
              type="button"
              onClick={handleConfirmEdit}
              className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 rounded transition-colors"
              title="Confirm"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStartEdit}
            disabled={disabled}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
              'transition-colors group',
              !disabled && 'hover:bg-gray-100 dark:hover:bg-gray-800',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {displayLabel}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({displaySubLabel})
            </span>
            {!disabled && (
              <Edit3 className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DurationSlider;
