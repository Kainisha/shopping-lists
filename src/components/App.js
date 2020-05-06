import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'layout/globalStyles';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import Login from 'views/Login';
import List from 'views/List';
import Create from 'views/Create';
import Archived from 'views/Archived';
import theme from 'layout/theme';

import saga from 'saga';
import createRootReducer from 'reducer';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store = createStore(createRootReducer(history), middleware);

sagaMiddleware.run(saga);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/list">
              <List />
            </PrivateRoute>
            <PrivateRoute path="/create/:id">
              <Create />
            </PrivateRoute>
            <PrivateRoute to="/archived">
              <Archived />
            </PrivateRoute>
          </Switch>
          <GlobalStyles />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
