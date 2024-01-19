import { ManualApiCall } from 'middlewares/apiMiddleware';
import history from 'utils/history';
import { SnackBar } from 'components/common';
export const CHECKOUT_SESSSION = 'CHECKOUT_SESSSION';
export const CHECKOUT_SESSSION_SUCCESS = 'CHECKOUT_SESSSION_SUCCESS';
export const CHECKOUT_SESSSION_FAILURE = 'CHECKOUT_SESSSION_FAILURE';

export const CheckoutSessionAction = (body) => async (dispatch) => {
	console.log({ body });
	dispatch({
		type: CHECKOUT_SESSSION,
	});

	const apiRequest = await ManualApiCall(
		`/g_drive_checkout_session/`,
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
		dispatch,
		CHECKOUT_SESSSION_FAILURE,
		history
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: CHECKOUT_SESSSION_SUCCESS, apiResponse: apiRequest });
		if (apiRequest.data.uuid) {
			history.push(`/activate-user-account/${apiRequest.data.uuid}`);
		}
		// if (apiRequest.data.user.role === 'APP_USER') {
		// 	history.push('/app/dashboard/app');
		// }
		// if (apiRequest.data.user.role === 'DRIVE_USER') {
		// 	history.push('/app/drive');
		// }
	}
	if (apiRequest.error === true) {
		dispatch({ type: CHECKOUT_SESSSION_FAILURE, apiResponse: apiRequest });
		// SnackBar('error', apiRequest.message);


		// if (apiRequest.data.user.role === 'APP_USER') {
		// 	history.push('/app/dashboard/app');
		// }
		// if (apiRequest.data.user.role === 'DRIVE_USER') {
		// 	history.push('/app/drive');
		// }
	}
};
