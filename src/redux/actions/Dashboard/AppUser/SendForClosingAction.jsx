import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const SEND_FOR_CLOSING = 'SEND_FOR_CLOSING';
export const SEND_FOR_CLOSING_SUCCESS = 'SEND_FOR_CLOSING_SUCCESS';
export const SEND_FOR_CLOSING_FAILURE = 'SEND_FOR_CLOSING_FAILURE';
export const SEND_FOR_CLOSING_COMPLETED = 'SEND_FOR_CLOSING_COMPLETED';

export const SendForClosingAction = (payload,id) => async (dispatch) => {
	dispatch({
		type: SEND_FOR_CLOSING,
	});

	const apiRequest = await ManualAuthApiCall(
		`/job/${id}/send_for_closing/`,
		{
			method: 'POST',
			body: JSON.stringify(payload),
		},
		dispatch,
		SEND_FOR_CLOSING_FAILURE,
		true,true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: SEND_FOR_CLOSING_SUCCESS, apiResponse: apiRequest });
	}
};
