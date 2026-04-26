import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialIcon } from './index';

describe('SocialIcon', () => {
  it('renders YouTube icon', () => {
    render(<SocialIcon type="youtube" />);
    const icon = screen.getByLabelText('YouTube');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('renders TikTok icon', () => {
    render(<SocialIcon type="tiktok" />);
    const icon = screen.getByLabelText('TikTok');
    expect(icon).toBeInTheDocument();
  });

  it('renders Instagram icon', () => {
    render(<SocialIcon type="instagram" />);
    const icon = screen.getByLabelText('Instagram');
    expect(icon).toBeInTheDocument();
  });

  it('renders Facebook icon', () => {
    render(<SocialIcon type="facebook" />);
    const icon = screen.getByLabelText('Facebook');
    expect(icon).toBeInTheDocument();
  });

  it('renders as anchor when href is provided', () => {
    render(<SocialIcon type="youtube" href="https://youtube.com" />);
    const link = screen.getByLabelText('YouTube');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://youtube.com');
  });

  it('opens link in new tab by default', () => {
    render(<SocialIcon type="youtube" href="https://youtube.com" />);
    const link = screen.getByLabelText('YouTube');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not open in new tab when external is false', () => {
    render(<SocialIcon type="youtube" href="https://youtube.com" external={false} />);
    const link = screen.getByLabelText('YouTube');
    expect(link).not.toHaveAttribute('target');
  });

  it('renders with custom label', () => {
    render(<SocialIcon type="youtube" label="My Channel" />);
    expect(screen.getByLabelText('My Channel')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<SocialIcon type="youtube" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders svg with aria-hidden', () => {
    const { container } = render(<SocialIcon type="instagram" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<SocialIcon type="facebook" className="custom-icon" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-icon');
  });

  it('applies hover opacity transition when rendered as link', () => {
    render(<SocialIcon type="youtube" href="https://youtube.com" />);
    const link = screen.getByLabelText('YouTube');
    expect(link.className).toContain('hover:opacity-80');
  });
});
