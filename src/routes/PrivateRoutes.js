import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { getAllowedRoutes, isLoggedIn } from 'utils';
import { PrivateRoutesConfig } from 'routeConfiguration';
import MapAllowedRoutes from 'routes/MapAllowedRoutes';

function PrivateRoutes() {
  const match = useRouteMatch('/app');
  let allowedRoutes = [];

  if (isLoggedIn()) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
  else return <Redirect to="/" />;

  return (
    <Fragment>
      <MapAllowedRoutes routes={allowedRoutes} basePath="/dashboard" isAddNotFound />
    </Fragment>
  );
}

export default PrivateRoutes;
