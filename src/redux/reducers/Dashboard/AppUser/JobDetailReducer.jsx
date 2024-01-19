// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
import { JOB_DETAIL } from '../../../actions';
const initialState = {
	isLoading: false,
	data: null,
	apiErrors: [],
};
const JobDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.JOB_DETAIL:
			return { ...state, isLoading: true };
		case ActionTypes.JOB_DETAIL_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data
					? { ...action.apiResponse.data, jobId: action.jobId }
					: null,
				apiErrors: null,
			};
		case ActionTypes.JOB_DETAIL_FAILURE:
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
export default JobDetailReducer;
