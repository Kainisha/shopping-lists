import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'router';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'layout/globalStyles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';

import Login from 'views/Login';
import List from 'views/List';
import Create from 'views/Create';
import Archived from 'views/Archived';
import theme from 'layout/theme';

const App = () => (
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
          <PrivateRoute path="/create/:id?">
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

export default App;
