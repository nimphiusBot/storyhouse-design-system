import React from 'react';
import { Input } from '@storyhouse/components';

export default function LiveInputDemo() {
  const [emailValue, setEmailValue] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const showError = submitted && emailValue.length > 0 && !isValidEmail;

  return (
    <div className="space-y-6">
      {/* Basic */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Basic Input</p>
        <Input
          label="Full Name"
          placeholder="Enter your name"
        />
      </div>

      {/* With Icons */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">With Icons</p>
        <Input
          label="Search"
          placeholder="Search..."
          leftIcon={
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        <div className="mt-3">
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            rightIcon={
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Sizes</p>
        <div className="flex flex-col gap-3">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>

      {/* Validation */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Validation</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={emailValue}
            onChange={(e) => { setEmailValue(e.target.value); setSubmitted(false); }}
            error={showError ? 'Please enter a valid email address.' : undefined}
            helperText="We'll never share your email."
          />
          <div className="mt-3">
            <Input label="Disabled" value="johndoe" disabled />
          </div>
          {!showError && (
            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Validate
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
