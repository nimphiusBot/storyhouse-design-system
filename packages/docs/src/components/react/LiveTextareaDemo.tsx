import React, { useState } from 'react';

const DemoTextarea: React.FC<{
  label?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
}> = ({ label, error, helpText, placeholder, disabled }) => {
  const [value, setValue] = useState('');
  const id = React.useId();
  const borderClass = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500';

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className={`text-sm font-medium ${error ? 'text-red-700' : 'text-gray-700'} ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${borderClass} focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600`}
      />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default function LiveTextareaDemo(): React.ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-col gap-4">
          <DemoTextarea label="Default" placeholder="Enter text..." />
          <DemoTextarea label="With Error" placeholder="Invalid value" error="This field is required." />
          <DemoTextarea label="With Help Text" placeholder="Type something..." helpText="A helpful description." />
          <DemoTextarea label="Disabled" disabled value="This is disabled" />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Textareas support labels, error states, help text, and disabled mode.
      </p>
    </div>
  );
}
