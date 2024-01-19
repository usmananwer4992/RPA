import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utils';
import PublicRoutes from './PublicRoutes';

/*
 * TODO: when user loggedIn he/she unable to goto public routes
 *  ie: ('/about', '/contact', 'any other public route')
 */
function Auth() {
  // TODO: temp logged-in check, update as per your app logic
  if (isLoggedIn()) {
    return localStorage.getItem('user') !== null &&
      JSON.parse(localStorage.getItem('user')).services &&
      JSON.parse(localStorage.getItem('user')).services[0].key === 'app' ? (
      <Redirect to="/dashboard/app" />
    ) : (
      <Redirect to="/dashboard/drive" />
    );
  } else {
    return <PublicRoutes />;
  }
}

export default memo(Auth);
