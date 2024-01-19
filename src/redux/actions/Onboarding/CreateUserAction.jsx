import { ManualApiCall } from 'middlewares/apiMiddleware';
import history from 'utils/history';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const CreateUserAction = (body) => async (dispatch) => {
	dispatch({
		type: CREATE_USER,
	});

	const apiRequest = await ManualApiCall(
		`/g_drive_create_user/`,
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
		dispatch,
		CREATE_USER_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: CREATE_USER_SUCCESS, apiResponse: apiRequest });
		if (apiRequest.status_code === 200) {
			history.push(`/`);
		}
		// if (apiRequest.data.user.role === 'APP_USER') {
		// 	history.push('/app/dashboard/app');
		// }
		// if (apiRequest.data.user.role === 'DRIVE_USER') {
		// 	history.push('/app/drive');
		// }
	}
};
