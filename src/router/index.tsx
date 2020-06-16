import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface PrivateRouteProps {
  children: React.ReactNode;
  isLogged: boolean | undefined;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children, isLogged, ...rest }) => {
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

export default connect(mapStateToProps)(PrivateRoute);
