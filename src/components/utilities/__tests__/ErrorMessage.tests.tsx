import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/extensions
import ErrorMessage from '../ErrorMessage';

const middlewares: never[] = [];
const mockStore = configureStore(middlewares);
const errorText = 'Test error text';

describe('Test Error Message component', () => {
  it('displays error text', () => {
    const initialState = {
      auth: {
        isError: true,
        errorText,
      },
    };
    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>,
    );

    expect(container.innerHTML).toMatch(errorText);
  });

  it('displays anything', () => {
    const initialState = {
      auth: {
        isError: false,
        errorText,
      },
    };
    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>,
    );

    expect(container.innerHTML).not.toMatch(errorText);
  });
});
