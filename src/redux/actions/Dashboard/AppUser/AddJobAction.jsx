import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const ADD_JOB = 'ADD_JOB';
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const ADD_JOB_FAILURE = 'ADD_JOB_FAILURE';
export const ADD_JOB_COMPLETED = 'ADD_JOB_COMPLETED';

export const AddJobAction = (payload) => async (dispatch) => {
	dispatch({
		type: ADD_JOB,
	});
	const apiRequest = await ManualAuthApiCall(
		`/job/`,
		{
			
			method: 'POST',
			body: payload,
		},
	
		dispatch,
		ADD_JOB_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: ADD_JOB_SUCCESS, apiResponse: apiRequest });
	}
};
