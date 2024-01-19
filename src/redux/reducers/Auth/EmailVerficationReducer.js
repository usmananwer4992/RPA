// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions';

const initialState = {
	isLoading: false,
	message: null,
	apiErrors: [],
};

const EmailVerficationReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.RESEND_EMAIL_VERFICATION:
			return { ...state, isLoading: true };

		case ActionTypes.RESEND_EMAIL_VERFICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				message:
					action.apiResponse && action.apiResponse.message
						? action.apiResponse.message
						: null,
				apiErrors: null,
			};

		case ActionTypes.RESEND_EMAIL_VERFICATION_FAILURE:
			return {
				...state,
				isLoading: false,
				message:
					action.apiResponse && action.apiResponse.message
						? action.apiResponse.message
						: null,
				apiErrors: null,
			};
		default:
			return state;
	}
};

export default EmailVerficationReducer;
