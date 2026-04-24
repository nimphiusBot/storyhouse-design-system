import React, { useState } from 'react';

const DemoRadio: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
  name: string;
}> = ({ checked, onChange, label, name }) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center">
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <label
          htmlFor={id}
          className={`flex items-center justify-center h-5 w-5 rounded-full border-2 transition-all duration-200 cursor-pointer peer-focus:ring-2 peer-focus:ring-orange-500 peer-focus:ring-offset-1 ${
            checked ? 'border-orange-600' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {checked && <div className="h-2.5 w-2.5 rounded-full bg-orange-600" />}
        </label>
      </div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default function LiveRadioDemo(): React.ReactNode {
  const [selected, setSelected] = useState('option1');

  const options = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Radio Group</p>
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <DemoRadio
              key={opt.value}
              name="demo"
              checked={selected === opt.value}
              onChange={() => setSelected(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Selected: <span className="font-medium text-orange-600">{selected}</span>
        </p>
      </div>
      <p className="text-xs text-gray-400">
        Radio buttons for single-select choices with proper keyboard and screen reader support.
      </p>
    </div>
  );
}
