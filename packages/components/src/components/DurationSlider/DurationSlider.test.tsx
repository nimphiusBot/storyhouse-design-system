import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DurationSlider } from './index';

describe('DurationSlider', () => {
  it('renders with default value', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('(60s)')).toBeInTheDocument();
  });

  it('renders all duration options', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    expect(screen.getByText('Short')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('Extended')).toBeInTheDocument();
    expect(screen.getByText('Long Form')).toBeInTheDocument();
  });

  it('renders sublabel values', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    expect(screen.getByText('20s')).toBeInTheDocument();
    expect(screen.getByText('60s')).toBeInTheDocument();
    expect(screen.getByText('90s')).toBeInTheDocument();
    expect(screen.getByText('15min')).toBeInTheDocument();
  });

  it('highlights the selected option in the top label row', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    const standardButton = screen.getByText('Standard');
    expect(standardButton.className).toContain('text-orange-600');
  });

  it('renders slider role with proper ARIA attributes', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '900');
    expect(slider).toHaveAttribute('aria-valuenow', '60');
  });

  it('enters edit mode when clicking the display label', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    const displayButton = screen.getByText('Standard').closest('button');
    fireEvent.click(displayButton!);
    // Should now show an input
    const input = document.querySelector('input[type="number"]');
    expect(input).toBeInTheDocument();
  });

  it('confirms edit on Enter key', () => {
    const onChange = vi.fn();
    render(<DurationSlider value={60} onChange={onChange} />);
    const displayButton = screen.getByText('Standard').closest('button');
    fireEvent.click(displayButton!);
    const input = document.querySelector('input[type="number"]')!;
    fireEvent.change(input, { target: { value: '90' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(90);
  });

  it('cancels edit on Escape key', () => {
    const onChange = vi.fn();
    render(<DurationSlider value={60} onChange={onChange} />);
    const displayButton = screen.getByText('Standard').closest('button');
    fireEvent.click(displayButton!);
    const input = document.querySelector('input[type="number"]')!;
    fireEvent.keyDown(input, { key: 'Escape' });
    // Should return to display mode
    expect(screen.getByText('Standard')).toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', () => {
    const onChange = vi.fn();
    render(<DurationSlider value={60} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(20);
  });

  it('handles keyboard navigation with Home key', () => {
    const onChange = vi.fn();
    render(<DurationSlider value={90} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(20);
  });

  it('handles keyboard navigation with End key', () => {
    const onChange = vi.fn();
    render(<DurationSlider value={20} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(900);
  });

  it('renders in disabled state', () => {
    render(<DurationSlider value={60} onChange={() => {}} disabled={true} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DurationSlider value={60} onChange={() => {}} className="custom-class" />
    );
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.className).toContain('custom-class');
  });

  it('renders with 900 value (15min)', () => {
    render(<DurationSlider value={900} onChange={() => {}} />);
    expect(screen.getByText('Long Form')).toBeInTheDocument();
    expect(screen.getByText('(15min)')).toBeInTheDocument();
  });

  it('provides accessible label on the slider thumb', () => {
    render(<DurationSlider value={60} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-label')).toContain('Standard');
    expect(slider.getAttribute('aria-valuetext')).toContain('Standard');
    expect(slider.getAttribute('aria-valuetext')).toContain('60s');
  });
});
