import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio owner name', () => {
  render(<App />);
  expect(screen.getAllByText(/S. Muthupriya/i).length).toBeGreaterThan(0);
});
