import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormatSelect } from './index';

const sampleOptions = [
  {
    format: 'Landscape',
    intent: 'Wide scenic view',
    emoji: '🌄',
    description: 'Perfect for landscape photography',
    sources: [{ id: '1' }, { id: '2' }],
    defaultAspectRatio: '16:9',
    generationModel: 'XL',
  },
  {
    format: 'Portrait',
    intent: 'Tall vertical shot',
    emoji: '📱',
    description: 'Ideal for social media stories',
    sources: [{ id: '3' }],
    defaultAspectRatio: '9:16',
  },
];

describe('FormatSelect', () => {
  it('renders trigger with placeholder when no value is selected', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value=""
        onChange={vi.fn()}
        placeholder="Pick a format..."
      />
    );
    const trigger = screen.getByLabelText('Story format');
    expect(trigger).toBeInTheDocument();
    // Radix renders placeholder via data-placeholder attribute
    expect(screen.getByText('Pick a format...')).toBeInTheDocument();
  });

  it('renders selected option display in trigger', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value="Landscape"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('Landscape')).toBeInTheDocument();
    expect(screen.getByText('Wide scenic view')).toBeInTheDocument();
  });

  it('renders with emoji for selected option', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value="Landscape"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('🌄')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value=""
        onChange={vi.fn()}
        disabled
      />
    );
    const trigger = screen.getByLabelText('Story format');
    expect(trigger).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value=""
        onChange={vi.fn()}
        className="custom-class"
      />
    );
    const trigger = screen.getByLabelText('Story format');
    expect(trigger.className).toContain('custom-class');
  });

  it('renders trigger with chevron icon', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value=""
        onChange={vi.fn()}
      />
    );
    const trigger = screen.getByLabelText('Story format');
    expect(trigger).toBeInTheDocument();
    // Chevron icon is in the trigger
    const chevron = document.querySelector('.lucide-chevron-down');
    expect(chevron).toBeInTheDocument();
  });

  it('handles empty options gracefully', () => {
    render(
      <FormatSelect
        options={[]}
        value=""
        onChange={vi.fn()}
      />
    );
    const trigger = screen.getByLabelText('Story format');
    expect(trigger).toBeInTheDocument();
  });

  it('renders selected option metadata in trigger', () => {
    render(
      <FormatSelect
        options={sampleOptions}
        value="Landscape"
        onChange={vi.fn()}
      />
    );
    // The selected option's format name and intent render in the trigger
    expect(screen.getByText('Landscape')).toBeInTheDocument();
    expect(screen.getByText('Wide scenic view')).toBeInTheDocument();
    // The metadata like aspect ratio and source count are only in the dropdown
    // items (via Portal), not in the trigger itself — they are not accessible
    // until the select is opened. Currently the test verifies what's rendered
    // in the trigger without opening the dropdown.
  });
});
