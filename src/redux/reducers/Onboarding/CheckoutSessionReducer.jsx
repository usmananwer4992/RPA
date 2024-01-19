// import * as ActionTypes from '../../actions/home'
import * as ActionTypes from '../../actions';
const initialState = {
	isLoading: true,
	response: [],
	apiErrors: [],
};
const CheckoutSessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.CHECKOUT_SESSSION:
			return { ...state, isLoading: true };
		case ActionTypes.CHECKOUT_SESSSION_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.apiResponse.data ? action.apiResponse.data : null,
				apiErrors: null,
			};
		case ActionTypes.CHECKOUT_SESSSION_FAILURE:
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
export default CheckoutSessionReducer;
