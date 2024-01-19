import { ManualApiCall } from '../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../utils';
export const DRIVE_DASHBOARD= 'DRIVE_DASHBOARD';
export const DRIVE_DASHBOARD_SUCCESS = 'DRIVE_DASHBOARD_SUCCESS';
export const DRIVE_DASHBOARD_FAILURE = 'DRIVE_DASHBOARD_FAILURE';

export const DriveDashboardAction = (id) => async (dispatch) => {
	dispatch({
		type: DRIVE_DASHBOARD,
	});
	let token = getToken();
	const apiRequest = await ManualApiCall(
		`/googledrive_dashboard/`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,

			},
		},
		dispatch,
		DRIVE_DASHBOARD_FAILURE,
		false
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: DRIVE_DASHBOARD_SUCCESS, apiResponse: apiRequest });
	}
};
