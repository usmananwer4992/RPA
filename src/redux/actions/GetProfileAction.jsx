import { ManualApiCall } from '../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken, getUserID } from '../../utils';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const GetProfileAction = (id) => async (dispatch) => {
	dispatch({
		type: GET_PROFILE,
	});
	let token = getToken();
	let userId = getUserID();
	const apiRequest = await ManualApiCall(
		`/user/${userId}/`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		},
		dispatch,
		GET_PROFILE_FAILURE,
		false
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: GET_PROFILE_SUCCESS, apiResponse: apiRequest });
	}
};
