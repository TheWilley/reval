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
  fireEvent.change(expression, { target: { value: 'return 3+3' } });
  window.localStorage.clear();

  expect(result.innerHTML).toContain('6');
});

test('it adds a new row and changes to math mode', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const selectElement = screen.getByTestId('mode');
  const selectElemetOptions = selectElement.childNodes;
  fireEvent.change(selectElement, { target: { value: 'math' } });
  window.localStorage.clear();

  expect((selectElemetOptions[0] as HTMLOptionElement).selected).toBeFalsy();
  expect((selectElemetOptions[1] as HTMLOptionElement).selected).toBeFalsy();
  expect((selectElemetOptions[2] as HTMLOptionElement).selected).toBeTruthy();
});

test('it changes placeholder', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const selectElement = screen.getByTestId('mode');
  fireEvent.change(selectElement, { target: { value: 'math' } });
  window.localStorage.clear();

  expect(screen.getByPlaceholderText('Write a math expression here...')).toBeTruthy();
});

test('it adds a new row, changes to math mode and inserts "sin(45 deg) ^ 2" which results in 0.4999999999999999', () => {
  const linkElement = screen.getByText('Alt + Enter or click here to add row');
  fireEvent.click(linkElement);
  const selectElement = screen.getByTestId('mode');
  fireEvent.change(selectElement, { target: { value: 'math' } });
  const expression = screen.getByTestId('expression');
  const result = screen.getByTestId('result');
  fireEvent.change(expression, { target: { value: 'sin(45 deg) ^ 2' } });
  window.localStorage.clear();

  expect(result.innerHTML).toContain('0.4999999999999999');
});
