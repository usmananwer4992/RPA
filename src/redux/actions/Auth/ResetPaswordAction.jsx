import { ManualApiCall } from '../../../middlewares/apiMiddleware';
import { saveAuthToken } from '../../../utils/index';
import history from 'utils/history';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
// export const LOGOUT = 'LOGOUT';

export const resetPasswordAction = (payload) => async (dispatch) => {
	console.log('params=====params', payload);
	dispatch({
		type: RESET_PASSWORD,
	});

	const apiRequest = await ManualApiCall(
		`/user/password_reset_confirm/`,
		{
			method: 'POST',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	Accept: 'application/json',
			// },
			body: JSON.stringify(payload),
		},
		dispatch,
		RESET_PASSWORD_FAILURE,
		history,
		true
	);
	if (apiRequest.error === false) {
		dispatch({ type: RESET_PASSWORD_SUCCESS, apiResponse: apiRequest });
		history.push('/reset-password-success');
	}
};

// export const logout = () => ({
// 	type: LOGOUT,
// });
