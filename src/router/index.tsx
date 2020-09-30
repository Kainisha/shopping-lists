import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';
import { LOCAL_STORAGE } from 'constants.js';
import { logout as logoutAction } from 'actions';

interface CheckIsTokenExpired {
  (logout: () => void): void;
}

const checkIsTokenExpired: CheckIsTokenExpired = (logout) => {
  const { TOKEN_EXPIRES_KEY } = LOCAL_STORAGE;
  const expiresInStorage = localStorage.getItem(TOKEN_EXPIRES_KEY);

  if (expiresInStorage === null) {
    return;
  }

  const expiresIn = moment.unix(parseInt(expiresInStorage, 10));
  const nowDate = moment();

  if (nowDate.isAfter(expiresIn)) {
    logout();
  }
};

interface PrivateRouteProps {
  children: React.ReactNode;
  isLogged: boolean | undefined;
  logout: () => void;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  isLogged,
  logout,
  ...rest
}) => {
  checkIsTokenExpired(logout);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isLogged: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  isLogged: false,
};

interface State {
  auth: { isLogged: boolean };
}

const mapStateToProps = (state: State) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
