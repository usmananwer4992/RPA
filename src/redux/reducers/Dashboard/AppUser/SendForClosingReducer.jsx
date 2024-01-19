// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
import { SEND_FOR_CLOSING } from '../../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const SendForClosingReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SEND_FOR_CLOSING:
			return { ...state, isLoading: true };
		case ActionTypes.SEND_FOR_CLOSING_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.SEND_FOR_CLOSING_FAILURE:
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
export default SendForClosingReducer;
