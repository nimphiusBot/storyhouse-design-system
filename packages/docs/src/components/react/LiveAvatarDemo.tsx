import React from 'react';
import { Avatar } from '@storyhouse/components';

const names = [
  { name: 'Alice Doe', initials: 'AD' },
  { name: 'Bob King', initials: 'BK' },
  { name: 'Carol Lee', initials: 'CL' },
  { name: 'Diana Moss', initials: 'DM' },
  { name: 'Eric Nash', initials: 'EN' },
];

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function LiveAvatarDemo() {
  return (
    <div className="space-y-8">
      {/* Sizes */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <Avatar name="Jane Doe" size={size} />
              <span className="text-xs text-gray-400">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Initials with automatic colors */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Initials (deterministic colors)</p>
        <div className="flex flex-wrap items-center gap-3">
          {names.map((person) => (
            <div key={person.name} className="flex flex-col items-center gap-1">
              <Avatar name={person.name} />
              <span className="text-xs text-gray-400">{person.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shapes */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Shapes</p>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Avatar name="Jane Doe" variant="circle" />
            <span className="text-xs text-gray-400">Circle</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar name="Jane Doe" variant="square" />
            <span className="text-xs text-gray-400">Square</span>
          </div>
        </div>
      </div>

      {/* Fallback */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Fallback</p>
        <div className="flex flex-wrap items-center gap-3">
          <Avatar alt="User" />
          <span className="text-xs text-gray-400">Default icon fallback</span>
        </div>
      </div>
    </div>
  );
}
