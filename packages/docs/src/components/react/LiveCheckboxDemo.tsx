import React, { useState } from 'react';

// Inline Checkbox component for demo
const DemoCheckbox: React.FC<{
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}> = ({ checked, onChange, label, error, disabled, indeterminate }) => {
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center pt-0.5">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <label
          htmlFor={id}
          className={`relative flex items-center justify-center h-5 w-5 rounded border transition-all duration-200 cursor-pointer peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${
            checked
              ? 'bg-orange-600 border-orange-600'
              : error
                ? 'border-red-500 bg-white'
                : 'border-gray-300 bg-white hover:border-orange-500'
          }`}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </label>
      </div>
      <div className="flex-1">
        <label htmlFor={id} className={`text-sm font-medium cursor-pointer select-none ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </label>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default function LiveCheckboxDemo(): React.ReactNode {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-wrap gap-4">
          <DemoCheckbox label="Unchecked" checked={checked} onChange={setChecked} />
          <DemoCheckbox label="Checked" checked={checked2} onChange={setChecked2} />
          <DemoCheckbox label="Disabled" checked disabled />
          <DemoCheckbox label="With Error" error="This field is required" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Grouped</p>
        <div className="flex flex-col gap-3">
          <DemoCheckbox label="React" />
          <DemoCheckbox label="TypeScript" checked />
          <DemoCheckbox label="Tailwind CSS" />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Checkboxes support checked, unchecked, disabled, and error states.
      </p>
    </div>
  );
}
