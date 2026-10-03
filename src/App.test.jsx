import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio owner name', () => {
  render(<App />);
  expect(screen.getAllByText(/Muthupriya S/i).length).toBeGreaterThan(0);
});
