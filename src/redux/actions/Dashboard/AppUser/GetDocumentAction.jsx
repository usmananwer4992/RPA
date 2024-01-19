import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const GET_DOCUMENT = 'GET_DOCUMENT';
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS';
export const GET_DOCUMENT_FAILURE = 'GET_DOCUMENT_FAILURE';
export const GET_DOCUMENT_COMPLETED = 'GET_DOCUMENT_COMPLETED';

export const GetDocumentAction = () => async (dispatch) => {
	dispatch({
		type: GET_DOCUMENT,
	});

	const apiRequest = await ManualAuthApiCall(
		`/documenttype/?all_data=true`,
		{
			method: 'GET',
		},
		dispatch,
		GET_DOCUMENT_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: GET_DOCUMENT_SUCCESS, apiResponse: apiRequest });
	}
};
