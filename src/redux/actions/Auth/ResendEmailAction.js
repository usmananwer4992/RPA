import {
	ManualApiCall,
	ManualAuthApiCall,
} from '../../../middlewares/apiMiddleware';
import { saveAuthToken } from '../../../utils/index';
import history from 'utils/history';
import { SnackBar } from '../../../components/common';

export const RESEND_EMAIL_VERFICATION = 'RESEND_EMAIL_VERFICATION';
export const RESEND_EMAIL_VERFICATION_SUCCESS =
	'RESEND_EMAIL_VERFICATION_SUCCESS';
export const RESEND_EMAIL_VERFICATION_FAILURE =
	'RESEND_EMAIL_VERFICATION_FAILURE';
////////////////// EMAIL VERFICATION /////////////////

export const EmailVerfication = () => async (dispatch) => {
	dispatch({
		type: RESEND_EMAIL_VERFICATION,
	});

	const apiRequest = await ManualAuthApiCall(
		`/resend_verfication`,
		{
			method: 'GET',
			// headers: {
			// 	'Content-Type': "multipart/form-data; boundary=------WebKitFormBoundary0BtBuNhdkt5jAgwE",
			// 	// 'Content-Type': 'multipart/form-data',
			// 	Accept: 'application/json',
			// },
			// body: formData,
		},
		dispatch,
		RESEND_EMAIL_VERFICATION_FAILURE
	);
	if (apiRequest.error === false) {
		dispatch({
			type: RESEND_EMAIL_VERFICATION_SUCCESS,
			apiResponse: apiRequest,
		});
		console.log('apiRequest', apiRequest);
		SnackBar('success', apiRequest.message);
	}
};
