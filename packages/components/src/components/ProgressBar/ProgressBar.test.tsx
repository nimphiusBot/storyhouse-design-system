import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  describe('ARIA accessibility attributes', () => {
    it('renders with role="progressbar" on the track container', () => {
      render(<ProgressBar value={60} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toBeInTheDocument();
    });

    it('sets aria-valuenow, aria-valuemin, aria-valuemax', () => {
      render(<ProgressBar value={42} max={100} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '42');
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });

    it('uses custom max value for aria-valuemax', () => {
      render(<ProgressBar value={3} max={5} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '3');
      expect(bar).toHaveAttribute('aria-valuemax', '5');
    });

    it('links visible label via aria-labelledby when label prop is provided', () => {
      render(<ProgressBar value={75} label="Upload progress" />);
      const bar = screen.getByRole('progressbar');
      const labelId = bar.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      const labelEl = document.getElementById(labelId!);
      expect(labelEl).toBeInTheDocument();
      expect(labelEl).toHaveTextContent('Upload progress');
      expect(screen.getByText('Upload progress')).toBeInTheDocument();
    });

    it('sets a default accessible label when no custom label is provided', () => {
      render(<ProgressBar value={50} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-label', 'Progress');
    });

    it('sets aria-valuetext when valueText prop is provided', () => {
      render(<ProgressBar value={2} max={5} valueText="Step 2 of 5" />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuetext', 'Step 2 of 5');
    });

    it('sets aria-valuetext from showValues when valueText is not provided', () => {
      render(<ProgressBar value={3} max={5} showValues />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuetext', '3 of 5');
    });

    it('does not set aria-valuetext by default', () => {
      render(<ProgressBar value={50} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-valuetext');
    });
  });

  describe('aria-labelledby', () => {
    it('links visible label via aria-labelledby when showLabel is true', () => {
      render(<ProgressBar value={65} showLabel />);
      const bar = screen.getByRole('progressbar');
      const labelId = bar.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      const labelEl = document.getElementById(labelId!);
      expect(labelEl).toBeInTheDocument();
      expect(labelEl).toHaveTextContent('Progress');
    });

    it('does not set aria-label when aria-labelledby is present (from showLabel)', () => {
      render(<ProgressBar value={65} showLabel />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-label');
    });

    it('does not set aria-label when aria-labelledby is present (from label)', () => {
      render(<ProgressBar value={75} label="Upload progress" />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-label');
    });

    it('uses explicit labelledBy prop over internal label', () => {
      render(
        <>
          <span id="ext-label">Custom Label</span>
          <ProgressBar value={50} labelledBy="ext-label" />
        </>
      );
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-labelledby', 'ext-label');
      expect(bar).not.toHaveAttribute('aria-label');
    });

    it('still sets aria-label when neither showLabel nor labelledBy is used', () => {
      render(<ProgressBar value={50} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-label', 'Progress');
      expect(bar).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('aria-describedby', () => {
    it('sets aria-describedby from describedBy prop', () => {
      render(
        <>
          <span id="desc-text">File upload progress</span>
          <ProgressBar value={50} describedBy="desc-text" />
        </>
      );
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-describedby', 'desc-text');
    });
  });

  describe('aria-hidden on fill bar', () => {
    it('marks the inner fill div as aria-hidden', () => {
      const { container } = render(<ProgressBar value={50} />);
      const track = container.querySelector('[role="progressbar"]');
      const fill = track?.querySelector('[aria-hidden="true"]');
      expect(fill).toBeInTheDocument();
    });
  });

  describe('indeterminate mode', () => {
    it('sets aria-busy="true" when indeterminate', () => {
      render(<ProgressBar indeterminate label="Loading..." />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-busy', 'true');
    });

    it('does not set aria-valuenow when indeterminate', () => {
      render(<ProgressBar indeterminate label="Loading..." />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-valuenow');
    });

    it('still has aria-valuemin and aria-valuemax when indeterminate', () => {
      render(<ProgressBar indeterminate label="Loading..." />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });

    it('does not set aria-busy when not indeterminate', () => {
      render(<ProgressBar value={50} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).not.toHaveAttribute('aria-busy');
    });
  });

  describe('rendering', () => {
    it('clamps value between 0 and max', () => {
      render(<ProgressBar value={-10} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '0');
    });

    it('clamps value above max', () => {
      render(<ProgressBar value={200} max={100} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '100');
    });

    it('shows percentage label when showLabel is true', () => {
      render(<ProgressBar value={65} showLabel />);
      expect(screen.getByText('65%')).toBeInTheDocument();
    });

    it('shows values format when showValues is true', () => {
      render(<ProgressBar value={3} max={5} showLabel showValues />);
      expect(screen.getByText('3 / 5')).toBeInTheDocument();
    });

    it('applies custom className to the outer wrapper', () => {
      const { container } = render(<ProgressBar value={50} className="my-custom-class" />);
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('my-custom-class');
    });

    it('renders indeterminate indicator with pulse animation', () => {
      const { container } = render(<ProgressBar indeterminate label="Loading" />);
      const fillDiv = container.querySelector('[class*="animate-pulse"]');
      expect(fillDiv).toBeInTheDocument();
    });
  });
});
