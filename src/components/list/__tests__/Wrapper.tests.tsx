/* eslint-disable import/extensions */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import Wrapper from '../Wrapper';

const middlewares: never[] = [];
const mockStore = configureStore(middlewares);

describe('Test Wrapper component', () => {
  it('render empty list', () => {
    const initialState = {
      shoppingLists: [],
      auth: {
        isFetching: false,
        isError: false,
        errorText: '',
      },
    };

    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <Wrapper lists={[]} />
      </Provider>,
    );

    expect(container.innerHTML).toContain('Empty list');
  });

  it('render some shopping list', () => {
    const history = createMemoryHistory();
    const initialState = {
      auth: {
        isFetching: false,
        isError: false,
        errorText: '',
      },
    };

    const shoppigLists = [
      {
        name: 'test',
        id: 1,
        done: false,
        shopping_list_items: [],
      },
      {
        id: 2,
        name: 'test2',
        done: true,
        shopping_list_items: [],
      },
    ];

    const store = mockStore(initialState);

    const { queryByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Wrapper lists={shoppigLists} />
        </Provider>
      </Router>,
    );

    const wrapper = queryByTestId('wrapper');

    if (!wrapper) {
      expect(true).toBe(false);
      return;
    }

    expect(wrapper.children.length).toBe(2);
  });
});
