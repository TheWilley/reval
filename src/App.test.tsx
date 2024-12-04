import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('it renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/reval/i);
  expect(linkElement).toBeDefined();
});

test('it adds new row', () => {
  render(<App />);
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const row = screen.getByTestId('expression');
  expect(row).toBeDefined();
});

test('it adds 5 new rows', () => {
  render(<App />);
  const linkElement = screen.getByText('Alt + Enter or click here to add row');

  for (let i = 0; i < 5; i++) {
    fireEvent.click(linkElement);
  }

  const expressions = screen.getAllByTestId('expression');
  expect(expressions.length).toBe(5);
});

import { waitFor } from '@testing-library/react'; // Ensure this import is present

test('it adds 5 new rows, then removes 1', async () => {
  render(<App />);
  const linkElement = screen.getByText('Alt + Enter or click here to add row');

  for (let i = 0; i < 5; i++) {
    fireEvent.click(linkElement);
  }

  const remove = screen.getAllByTestId('remove');
  fireEvent.click(remove[0]);

  await waitFor(() => {
    expect(screen.queryAllByTestId('expression').length).toBe(4);
  });
});

test('it adds new row and adds an expression (3+3) which results in 6', () => {
  render(<App />);
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const expression = screen.getByTestId('expression');
  const result = screen.getByTestId('result');
  fireEvent.change(expression, { target: { value: '3+3' } });
  expect(result.innerHTML).toBe('6');
});
