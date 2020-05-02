import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'layout/globalStyles';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import Login from 'components/sites/login/Login';
import List from 'components/sites/list/List';
import NewItem from 'components/sites/newItem/NewItem';
import theme from 'layout/theme';

import saga from 'saga';
import createRootReducer from 'reducer';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store = createStore(createRootReducer(history), middleware);

sagaMiddleware.run(saga);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/new">
              <NewItem />
            </Route>
          </Switch>
          <GlobalStyles />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
