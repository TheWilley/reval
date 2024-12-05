import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Define a type alias for the storage object. It is a key-value pair where both key and value are strings.
type Store = { [key: string]: string };

const localStorageMock = (function () {
  // Private variable `store` acts as the storage for all key-value pairs.
  let store: Store = {};

  return {
    /**
     * Retrieves the value associated with the given key.
     * @param key - The key of the item to retrieve.
     * @returns The value as a string if the key exists, or `null` if the key is not found.
     */
    getItem(key: string): string | null {
      return store[key] || null;
    },

    /**
     * Stores a value with the given key in the mock localStorage.
     * @param key - The key to associate with the value.
     * @param value - The value to store.
     */
    setItem(key: string, value: string): void {
      store[key] = value;
    },

    /**
     * Clears all items from the mock localStorage.
     */
    clear(): void {
      store = {};
    },

    /**
     * Removes the item with the specified key from the mock localStorage.
     * @param key - The key of the item to remove.
     */
    removeItem(key: string): void {
      delete store[key];
    },

    /**
     * Retrieves the entire `store` object for debugging or inspection.
     * @returns The current state of the mock localStorage as an object.
     */
    getAll(): Store {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  render(<App />);
});

test('it renders header', () => {
  const linkElement = screen.getByText(/reval/i);
  expect(linkElement).toBeDefined();
});

test('it adds new row', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const row = screen.getByTestId('expression');
  window.localStorage.clear();
  expect(row).toBeDefined();
});

test('it adds 5 new rows', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');

  for (let i = 0; i < 5; i++) {
    fireEvent.click(linkElement);
  }

  const expressions = screen.getAllByTestId('expression');
  window.localStorage.clear();
  expect(expressions.length).toBe(5);
});

test('it adds 5 new rows, then removes 1', async () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');

  for (let i = 0; i < 5; i++) {
    fireEvent.click(linkElement);
  }

  const remove = screen.getAllByTestId('remove');
  fireEvent.click(remove[0]);
  await waitFor(() => {
    window.localStorage.clear();
    expect(screen.queryAllByTestId('expression').length).toBe(4);
  });
});

test('it adds new row and adds an expression (3+3) which results in 6', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const expression = screen.getByTestId('expression');
  const result = screen.getByTestId('result');
  fireEvent.change(expression, { target: { value: '3+3' } });
  expect(result.innerHTML).toBe('6');
});
