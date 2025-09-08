import { expect, test, suite } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignupPage from './page';

suite('SignupPage', () => {
  render(<SignupPage />);

  test('should load the correct heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'Sign up' })).toBeDefined();
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
    const submitButton = screen.getByRole('button', { name: 'Create an account' });

    expect(submitButton).toBeDefined();
  });


  test('should have a link to the "/login" page', async () => {
    const submitButton = screen.getByRole('link', { name: 'Log in' });

    expect(submitButton).toBeDefined();
  });
});
