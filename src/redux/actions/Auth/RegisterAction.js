import { ManualApiCall } from '../../../middlewares/apiMiddleware';
import { saveAuthToken } from '../../../utils/index';
import history from 'utils/history';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REGISTER_USER_FAILURE_RESET = 'REGISTER_USER_FAILURE_RESET';

export const RegisterUserAction = (formData) => async (dispatch) => {
	console.log('i am rigister action');
	dispatch({
		type: REGISTER_USER,
	});

	const apiRequest = await ManualApiCall(
		`/email_signup`,
		{
			method: 'POST',
			// headers: {
			// 	'Content-Type': "multipart/form-data; boundary=------WebKitFormBoundary0BtBuNhdkt5jAgwE",
			// 	// 'Content-Type': 'multipart/form-data',
			// 	Accept: 'application/json',
			// },
			body: formData,
		},
		dispatch,
		REGISTER_USER_FAILURE,
		history
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		saveAuthToken(apiRequest && apiRequest.data && apiRequest.data);
		dispatch({ type: REGISTER_USER_SUCCESS, apiResponse: apiRequest });
		if (apiRequest.data.user.role === 'Employer') {
			history.push('/app/employer_profile');
		}
		if (apiRequest.data.user.role === 'Freelancer') {
			history.push('/app/freelancer_profile');
		}
	}
};
