// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../../actions';
import { DELETE_DOCUMENT } from '../../../actions';
const initialState = {
	isLoading: false,
	response: [],
	apiErrors: [],
	isDeleted: false,
};
const DeleteDocumentReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.DELETE_DOCUMENT:
			return { ...state, isLoading: true };
		case ActionTypes.DELETE_DOCUMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isDeleted: true,
				apiErrors: null,
			};
		case ActionTypes.DELETE_DOCUMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				isDeleted: false,
				apiErrors: action.apiResponse.error ? action.apiResponse.errors : null,
			};

		default:
			return state;
	}
};
export default DeleteDocumentReducer;
