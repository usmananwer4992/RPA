import { ManualApiCall } from '../../../middlewares/apiMiddleware';
import { saveAuthToken } from '../../../utils/index';
import history from 'utils/history';

export const EMAIL_ENTER = 'EMAIL_ENTER';
export const EMAIL_ENTER_SUCCESS = 'EMAIL_ENTER_SUCCESS';
export const EMAIL_ENTER_FAILURE = 'EMAIL_ENTER_FAILURE';
// export const LOGOUT = 'LOGOUT';

export const emailEnterAction = (formData) => async (dispatch) => {
	dispatch({
		type: EMAIL_ENTER,
	});

	const apiRequest = await ManualApiCall(
		`/user/password_reset/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				// Accept: 'application/json',
			},
			body: formData,
		},
		dispatch,
		EMAIL_ENTER_FAILURE,
		history
		// For Errors Flag///////
		// true
	);
	if (apiRequest.error === false) {
		// saveAuthToken(apiRequest.data);
		dispatch({ type: EMAIL_ENTER_SUCCESS, apiResponse: apiRequest });
		// alert('Your password has been changed successfully');
		// window.location.href('/');
		// window.location.href = '/';
	}
};

// export const logout = () => ({
// 	type: LOGOUT,
// });
