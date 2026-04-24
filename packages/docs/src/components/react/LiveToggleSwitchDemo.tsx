import React, { useState } from 'react';

const DemoSwitch: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}> = ({ checked, onChange, label, disabled }) => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${checked ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`
          pointer-events-none inline-block w-4 h-4 rounded-full bg-white shadow transform ring-0
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
    <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{label}</span>
  </div>
);

export default function LiveToggleSwitchDemo(): React.ReactNode {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Settings</p>
        <div className="flex flex-col gap-4">
          <DemoSwitch checked={darkMode} onChange={setDarkMode} label="Dark Mode" />
          <DemoSwitch checked={notifications} onChange={setNotifications} label="Notifications" />
          <DemoSwitch checked={autoSave} onChange={setAutoSave} label="Auto-save" />
          <DemoSwitch checked={false} onChange={() => {}} label="Disabled" disabled />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Toggle switches for binary settings with on, off, and disabled states.
      </p>
    </div>
  );
}
