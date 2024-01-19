// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
import { GET_DOCUMENT } from '../../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const GetDocumentReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_DOCUMENT:
			return { ...state, isLoading: true };
		case ActionTypes.GET_DOCUMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.GET_DOCUMENT_FAILURE:
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
export default GetDocumentReducer;
