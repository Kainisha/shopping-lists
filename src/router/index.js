import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, isLogged, ...rest }) => {
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

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
