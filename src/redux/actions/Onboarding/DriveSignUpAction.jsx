import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { SnackBar } from 'components/common';
import { ManualApiCall } from 'middlewares/apiMiddleware';
import history from 'utils/history';
export const DRIVE_SIGNUP_GET = 'DRIVE_SIGNUP_GET';
export const DRIVE_SIGNUP_GET_SUCCESS = 'DRIVE_SIGNUP_GET_SUCCESS';
export const DRIVE_SIGNUP_GET_FAILURE = 'DRIVE_SIGNUP_GET_FAILURE';

export const DriveSignUpAction = (body) => async (dispatch) => {
	dispatch({
		type: DRIVE_SIGNUP_GET,
	});

	const apiRequest = await ManualApiCall(
		`/g_drive_signup/`,
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
		dispatch,
		DRIVE_SIGNUP_GET_FAILURE,
		false
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: DRIVE_SIGNUP_GET_SUCCESS, apiResponse: apiRequest });
	}
	if (apiRequest.error === true && apiRequest.status_code == 500) {
		dispatch({ type: DRIVE_SIGNUP_GET_FAILURE, apiResponse: apiRequest });
		SnackBar('error', apiRequest.message);
		history.push('/');
	}
};
