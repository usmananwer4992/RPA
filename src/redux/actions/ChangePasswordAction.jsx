import { ManualAuthApiCall } from '../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../utils';
import { SnackBar } from 'components/common';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const ChangePasswordAction = (payload) => async (dispatch) => {
	dispatch({
		type: CHANGE_PASSWORD,
	});

	const apiRequest = await ManualAuthApiCall(
		`/user/change_password/`,
		{
			method: 'POST',
			body: JSON.stringify(payload),
		},
		dispatch,
		CHANGE_PASSWORD_FAILURE,
		false
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: CHANGE_PASSWORD_SUCCESS, apiResponse: apiRequest });
		if (apiRequest.status_code === 200) {
			SnackBar('success', apiRequest.message);
			history.push('/');
		}
	}
};
