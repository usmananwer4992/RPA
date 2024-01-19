import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const JOB_DETAIL = 'JOB_DETAIL';
export const JOB_DETAIL_SUCCESS = 'JOB_DETAIL_SUCCESS';
export const JOB_DETAIL_FAILURE = 'JOB_DETAIL_FAILURE';
export const JOB_DETAIL_COMPLETED = 'JOB_DETAIL_COMPLETED';

export const JobDetailAction = (id) => async (dispatch) => {
	dispatch({
		type: JOB_DETAIL,
	});

	const apiRequest = await ManualAuthApiCall(
		`/job/${id}/classifications/`,
		{
			method: 'GET',
		},
		dispatch,
		JOB_DETAIL_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: JOB_DETAIL_SUCCESS, apiResponse: apiRequest, jobId: id });
	}
};
