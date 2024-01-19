// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
import { CREATE_DOCUMENT } from '../../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
};
const CreateDocumentReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.CREATE_DOCUMENT:
			return { ...state, isLoading: true };
		case ActionTypes.CREATE_DOCUMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.CREATE_DOCUMENT_FAILURE:
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
export default CreateDocumentReducer;
