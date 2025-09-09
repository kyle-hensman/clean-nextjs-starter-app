import { expect, test, suite } from 'vitest';
import { render, screen } from '@testing-library/react';

import LoginPage from '@/app/(auth)/login/page';

suite('LoginPage', () => {
  render(<LoginPage />);

  test('should load the correct heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'Log in' })).toBeDefined();
  });

  test('should have an "Email" input', async () => {
    const getStartedButton = screen.getByLabelText('Email');

    expect(getStartedButton).toBeDefined();
  });

  test('should have "Password" input', async () => {
    const getStartedButton = screen.getByLabelText('Password');

    expect(getStartedButton).toBeDefined();
  });

  test('should have form submit button', async () => {
    const submitButton = screen.getByRole('button', { name: 'Login' });

    expect(submitButton).toBeDefined();
  });


  test('should have a link to the "/signup" page', async () => {
    const submitButton = screen.getByRole('link', { name: 'Sign up' });

    expect(submitButton).toBeDefined();
  });
});
