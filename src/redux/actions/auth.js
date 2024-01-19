import { CALL_API } from '../../middlewares/apiMiddleware';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (payload) => (dispatch) => {
  return {
    [CALL_API]: {
      types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
      endpoint: `/auth/advertiser/login`,
      options: {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    },
  };
};

export const logout = () => ({
  type: LOGOUT,
});
