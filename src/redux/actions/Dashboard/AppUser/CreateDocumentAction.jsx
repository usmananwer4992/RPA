import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
export const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';
export const CREATE_DOCUMENT_COMPLETED = 'CREATE_DOCUMENT_COMPLETED';

export const CreateDocumentAction = (id) => async (dispatch) => {
	dispatch({
		type: CREATE_DOCUMENT,
	});

	const apiRequest = await ManualAuthApiCall(
		`/job/${id}/documents/`,
		{
			method: 'GET',
		},
		dispatch,
		CREATE_DOCUMENT_FAILURE,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: CREATE_DOCUMENT_SUCCESS, apiResponse: apiRequest });
	}
};
