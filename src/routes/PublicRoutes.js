import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  SignInComponent,
  ResetPasswordSuccessComponent,
  CheckoutSuccessComponent,
  ActivateUserAccountComponent,
  // ChangePasswordComponent,
  //  ResetPassword,
} from 'components';
import ForgetPasswordComponent from '../components/UserAuth/ForgetPasswordComponent/ForgetPasswordComponent';
import ResetPasswordComponent from '../components/UserAuth/ResetPasswordComponent/ResetPasswordComponent';
import { NotFound } from 'components/common';

function PublicRoutes() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <SignInComponent />
        </Route>
        <Route exact path="/forgot-password">
          <ForgetPasswordComponent />
        </Route>

        <Route exact path="/reset-password">
          <ResetPasswordComponent />
        </Route>
        <Route exact path="/reset-password-success">
          <ResetPasswordSuccessComponent />
        </Route>
        <Route exact path="/checkout-success">
          <CheckoutSuccessComponent />
        </Route>
        <Route exact path="/activate-user-account/:uuid">
          <ActivateUserAccountComponent />
        </Route>
        {/* <Route exact path="/password-reset/:resetPasswordCode">
					<ResetPassword />
				</Route> */}

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default PublicRoutes;
