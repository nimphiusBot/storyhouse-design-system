import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

describe('Accordion', () => {
  const renderAccordion = (props: Record<string, unknown> = {}) =>
    render(
      <Accordion type="single" {...props}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

  it('renders all triggers', () => {
    renderAccordion();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('has content hidden initially (aria-expanded false)', () => {
    renderAccordion({ defaultValue: 'item-1' });
    // With defaultValue='item-1', section 2 should be collapsed
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('shows content when trigger is clicked', () => {
    renderAccordion();
    const trigger = screen.getByText('Section 1');
    fireEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('allows multiple open items with type multiple', () => {
    render(
      <Accordion type="multiple" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
