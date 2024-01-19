import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const LIST_JOB = 'LIST_JOB';
export const LIST_JOB_SUCCESS = 'LIST_JOB_SUCCESS';
export const LIST_JOB_FAILURE = 'LIST_JOB_FAILURE';

export const ListJobAction =
	(page, search = '') =>
	async (dispatch) => {
		dispatch({
			type: LIST_JOB,
		});

		const apiRequest = await ManualAuthApiCall(
			`/job/?page=${page}${search && '&status=' + search}`,
			{
				method: 'GET',
			},
			dispatch,
			LIST_JOB_FAILURE,
			true
		);
		console.log('apiRequest', apiRequest);
		if (apiRequest.error === false) {
			dispatch({ type: LIST_JOB_SUCCESS, apiResponse: apiRequest });
		}
	};
