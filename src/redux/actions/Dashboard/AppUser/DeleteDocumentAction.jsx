import { ManualAuthApiCall } from '../../../../middlewares/apiMiddleware';
import history from 'utils/history';
import { getToken } from '../../../../utils';
import { SnackBar } from 'components/common';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';

export const DeleteDocumentAction = (id) => async (dispatch) => {
	dispatch({
		type: DELETE_DOCUMENT,
	});

	const apiRequest = await ManualAuthApiCall(
		`/jobDocuments/${id}/`,
		{
			method: 'DELETE',
			// body: JSON.stringify(payload),
		},
		dispatch,
		DELETE_DOCUMENT_SUCCESS,
		true
	);
	console.log('apiRequest', apiRequest);
	if (apiRequest.error === false) {
		dispatch({ type: DELETE_DOCUMENT_SUCCESS, apiResponse: apiRequest });
	}
};
