import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux';
import App from './App';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const mockStore = configureStore();
const store = mockStore({
  user: {
    user: null,
    isAuthenticated: false
  }
});

test('renders learn react link', () => {
  useSelector.mockReturnValue();
  useDispatch.mockReturnValue(jest.fn());
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
