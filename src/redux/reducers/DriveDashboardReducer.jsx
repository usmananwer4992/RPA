// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const DriveDashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.DRIVE_DASHBOARD:
			return { ...state, isLoading: true };
		case ActionTypes.DRIVE_DASHBOARD_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.DRIVE_DASHBOARD_FAILURE:
			return {
				...state,
				isLoading: false,
				data: null,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};
		default:
			return state;
	}
};
export default DriveDashboardReducer;
