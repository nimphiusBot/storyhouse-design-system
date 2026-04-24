import React from 'react';
import { DateTimePicker } from '@storyhouse/components';

export default function LiveDateTimePickerDemo(): React.ReactNode {
  const [dateValue, setDateValue] = React.useState<string | null>(null);
  const [timeValue, setTimeValue] = React.useState<string | null>(null);
  const [dateTimeValue, setDateTimeValue] = React.useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Date Mode */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date Mode</p>
        <DateTimePicker
          label="Event Date"
          mode="date"
          value={dateValue}
          onChange={setDateValue}
        />
        {dateValue && (
          <p className="mt-2 text-xs text-gray-400">
            Selected: {new Date(dateValue).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Time Mode */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Time Mode</p>
        <DateTimePicker
          label="Start Time"
          mode="time"
          value={timeValue}
          onChange={setTimeValue}
        />
        {timeValue && (
          <p className="mt-2 text-xs text-gray-400">
            Selected: {new Date(timeValue).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* DateTime Mode */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date &amp; Time Mode</p>
        <DateTimePicker
          label="Appointment"
          mode="datetime"
          value={dateTimeValue}
          onChange={setDateTimeValue}
        />
        {dateTimeValue && (
          <p className="mt-2 text-xs text-gray-400">
            Selected: {new Date(dateTimeValue).toLocaleString()}
          </p>
        )}
      </div>

      {/* Error State */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Error State</p>
        <DateTimePicker
          label="Due Date"
          mode="date"
          error="Please select a valid date"
          value={dateValue}
          onChange={setDateValue}
        />
      </div>
    </div>
  );
}
