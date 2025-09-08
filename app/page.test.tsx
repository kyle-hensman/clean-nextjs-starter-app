import { expect, test, suite } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

suite('HomePage', () => {
  render(<HomePage />);

  test('should load the correct heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: 'My Todo App' })).toBeDefined();
  });

  test('should have a link to "Get Started"', async () => {
    const getStartedButton = screen.getByRole('button', { name: 'Get Started' });

    expect(getStartedButton).toBeDefined();
  });
});
