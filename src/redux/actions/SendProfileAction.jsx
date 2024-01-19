import {
	ManualApiCall,
	ManualAuthApiCall,
} from '../../middlewares/apiMiddleware';
import history from 'utils/history';
import { SnackBar } from 'components/common';

import { getToken, getUserID } from '../../utils';
export const SEND_PROFILE = 'SEND_PROFILE';
export const SEND_PROFILE_SUCCESS = 'SEND_PROFILE_SUCCESS';
export const SEND_PROFILE_FAILURE = 'SEND_PROFILE_FAILURE';

export const SendProfileAction = (payload) => async (dispatch) => {
	dispatch({
		type: SEND_PROFILE,
	});
	let userId = getUserID();
	const apiRequest = await ManualAuthApiCall(
		`/user/${userId}/`,
		{
			method: 'PATCH',

			body: JSON.stringify(payload),
		},
		dispatch,
		SEND_PROFILE_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: SEND_PROFILE_SUCCESS, apiResponse: apiRequest });
		SnackBar('success', apiRequest.message);
	}

	if (apiRequest.error === true) {
		const getCompanyErrorsErrors =
			apiRequest.errors && apiRequest.errors.user_company_detail;

		if (getCompanyErrorsErrors.phone) {
			const updateResponse = {
				...apiRequest,
				errors: {
					...apiRequest.errors,
					company_phone: getCompanyErrorsErrors.phone,
				},
			};
			dispatch({ type: SEND_PROFILE_FAILURE, apiResponse: updateResponse });
		}

		// dispatch({ type: SEND_PROFILE_SUCCESS, apiResponse: apiRequest });
	}
};
