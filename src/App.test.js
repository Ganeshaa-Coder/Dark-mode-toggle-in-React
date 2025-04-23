import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App Component Theme Toggling', () => {
  beforeEach(() => {
    // Clear localStorage and reset body class before each test
    window.localStorage.clear();
    document.body.className = '';
    // Reset the component state by rendering it fresh
    // Note: In a real app, you might need a more robust state reset
  });

  test('renders with light theme by default', () => {
    render(<App />);
    expect(document.body.className).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  test('toggles theme to dark mode on button click', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });

    act(() => {
      fireEvent.click(toggleButton);
    });


    expect(document.body.className).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  test('persists dark theme after simulated refresh', () => {
    // Set initial theme to dark in mock localStorage
    window.localStorage.setItem('theme', 'dark');

    render(<App />);

    // Should load the dark theme from localStorage
    expect(document.body.className).toBe('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  test('toggles theme back to light mode', () => {
    // Start in dark mode
     window.localStorage.setItem('theme', 'dark');
     render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });


    act(() => {
        fireEvent.click(toggleButton);
    });


    expect(document.body.className).toBe('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  test('persists light theme after simulated refresh', () => {
    // Set initial theme to light (or leave it default)
    window.localStorage.setItem('theme', 'light');

    render(<App />);

    // Should load the light theme
    expect(document.body.className).toBe('light');
     expect(window.localStorage.getItem('theme')).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();

     // Optional: Toggle to dark and back to light to ensure persistence works after changes
     const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
     act(() => {
        fireEvent.click(toggleButton); // -> dark
     });
      act(() => {
        fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i })); // -> light
     });


     // Re-render to simulate refresh after toggling
     render(<App/>);
     expect(document.body.className).toBe('light');
     expect(window.localStorage.getItem('theme')).toBe('light');
  });
});
