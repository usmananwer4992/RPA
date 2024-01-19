import { ManualApiCall } from '../../../middlewares/apiMiddleware';
import { saveAuthToken } from '../../../utils/index';
import ROLES from '../../../routeConfiguration/Roles';
import history from 'utils/history';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_FAILURE_RESET = 'LOGIN_USER_FAILURE_RESET';

export const LOGOUT = 'LOGOUT';

export const loginUserAction = (formData, rember_me) => async (dispatch) => {
	console.log('rember_me', rember_me);
	dispatch({
		type: LOGIN_USER,
	});

	const apiRequest = await ManualApiCall(
		`/authenticate/`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		},
		dispatch,
		LOGIN_USER_FAILURE,
		history
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		saveAuthToken(apiRequest && apiRequest.data && apiRequest.data);
		// console.log(apiRequest.data.services[0].key);
		// console.log(ROLES);

		dispatch({ type: LOGIN_USER_SUCCESS, apiResponse: apiRequest });
		if (rember_me) {
			localStorage.setItem('rember_me', rember_me);
		}

		if (apiRequest.data.services[0].key === ROLES.APP_USER) {
			history.push('/dashboard/app');
		}
		
		// console.log("mmmmmmmmmmmmmmmmmmmmmmmm", apiRequest.data.services[0])
		if (apiRequest.data.services[0].key === ROLES.DRIVE_USER) {
			history.push('/dashboard/drive');
		}
	}
};

export const logout = () => ({
	type: LOGOUT,
});
