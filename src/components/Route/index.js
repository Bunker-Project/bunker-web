import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../../store';

//To control the routes internally. If the user isn't logged in and try to access some private route, he is 
// redirect to the login. If he's logged in, he's redirected to the home page or the page he typed
export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {

  let signed = store.getState().auth.signed;

  // const { authenticated } = store.getState().auth.token;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};