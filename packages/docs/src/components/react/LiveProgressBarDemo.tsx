import React, { useState, useEffect } from 'react';

const DemoProgressBar: React.FC<{ value: number; label?: string; colorClass?: string }> = ({
  value,
  label,
  colorClass = 'bg-orange-600',
}) => {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{pct}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default function LiveProgressBarDemo(): React.ReactNode {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 20;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const getColorClass = (val: number) => {
    if (val < 50) return 'bg-green-500';
    if (val < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Animated Progress</p>
        <div className="space-y-4">
          <DemoProgressBar
            value={Math.round(progress)}
            label="Loading..."
            colorClass={getColorClass(progress)}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="space-y-4">
          <DemoProgressBar value={25} label="Success" colorClass="bg-green-500" />
          <DemoProgressBar value={65} label="Warning" colorClass="bg-orange-500" />
          <DemoProgressBar value={90} label="Error" colorClass="bg-red-500" />
          <DemoProgressBar value={50} label="Info / Primary" colorClass="bg-orange-600" />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Progress indicators with animated transitions, threshold-based color coding, and label support.
      </p>
    </div>
  );
}
