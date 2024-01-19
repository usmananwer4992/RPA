import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_HOST } from '../config';
import { getToken, checkBrowser } from '../utils';
import qs from 'query-string';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import { SnackBar } from '../components/common';
export const CALL_AUTH_API = Symbol('CALL_AUTH_API');
export const CALL_API = Symbol('CALL_API');
const apiSourceDefault = API_HOST;
// Get the current location.
// const location = history.location;
export const apiMiddleware = (store) => (next) => (action) => {
  if (action[CALL_AUTH_API]) {
    const {
      endpoint,
      types,
      apiSource = null,
      options,
      meta = null,
      parameters = null,
    } = action[CALL_API];
    const source = apiSource || apiSourceDefault;
    const url = `${source}${endpoint}${qs.stringify(parameters)}`;
    const [FETCH, SUCCESS, FAILURE] = types;
    /**
     * todo:
     * add auth headers if api source is default
     */
    store.dispatch({ type: FETCH, meta });
    getToken().then((token) => {
      return fetch(url, {
        ...options,
        headers: {
          ..._.get(options, 'headers', {}),
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          store.dispatch({ type: SUCCESS, payload: json, meta });
        })
        .catch((err) => {
          store.dispatch({ type: FAILURE, error: err, meta });
        });
    });
  } else if (action[CALL_API]) {
    const {
      endpoint,
      types,
      apiSource = null,
      options,
      meta = null,
      parameters = null,
    } = action[CALL_API];
    const source = apiSource || apiSourceDefault;
    const url = `${source}${endpoint}${qs.stringify(parameters)}`;
    const [FETCH, SUCCESS, FAILURE] = types;
    /**
     * todo:
     * add auth headers if api source is default
     */
    store.dispatch({ type: FETCH, meta });
    checkBrowser().then((token) => {
      return fetch(url, {
        ...options,
        headers: {
          ..._.get(options, 'headers', {}),
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          store.dispatch({ type: SUCCESS, payload: json, meta });
        })
        .catch((err) => {
          store.dispatch({ type: FAILURE, error: err, meta });
        });
    });
  } else {
    next(action);
  }
};
/**
 *
 * TO CALL THE AUTHENTICATED API CALLS
 */
export const ManualAuthApiCall = (
  endpoint,
  options,
  dispatch,
  actionType,
  history,
  notification = false
) => {
  const apiSourceDefault = API_HOST;
  const url = `${apiSourceDefault}${endpoint}`;
  // const history = useHistory();

  return new Promise((resolve, reject) => {
    return fetch(url, {
      ...options,
      headers: {
        ..._.get(options, 'headers', {}),
        'Content-Type': 'application/json',
        Authorization: `${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status_code === 401) {
          notification && SnackBar('error', json.message);
          localStorage.clear();
          // history && history.push('/');
          notification && SnackBar('error', 'Token has been invalidated, please login again.');
        } else if (json.status_code === 400) {
          dispatch({ type: actionType, apiResponse: json });
          // SnackBar('error', json.message);
        } else if (json.status_code === 500) {
          notification && SnackBar('error', 'Internal Server Error');
        }
        else if (json.status_code === 204) {
          notification && SnackBar('success', json.message || 'The selected item has been deleted');
          dispatch({ type: actionType });
        } else if (json.status_code === 404) {
          notification && SnackBar('error', 'Page Not Found');
        } else {
          if (json.message != 'Profile Data!') {
            notification && SnackBar('success', json.message);
          }
        }
        resolve(json);
      })
      .catch((err) => {
        SnackBar('error', '🤷 Oops ! Server not responding.');
        reject(err);
      });
  });

};
/**
 *
 * TO CALL THE UN-AUTHENTICATED API CALLS
 */
export const ManualApiCall = (
  endpoint,
  options,
  dispatch,
  actionType,
  notification = false
) => {
  const apiSourceDefault = API_HOST;
  const url = `${apiSourceDefault}${endpoint}`;
  console.log('options', options);
  return new Promise((resolve, reject) => {
    const forceheader = options.headers && options.headers['Content-Type'] === 'multipart/form-data' ? true : 'application/json'
    // const updateOptions = { ...options, 'Content-Type': 'application/json' }
    console.log({ options })
    return fetch(url, {
      ...options,
      headers: forceheader === true ? {} : {
        ..._.get(options, 'headers', {}), 'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status_code === 401) {
          // notification && SnackBar('error', json.message);
          localStorage.clear();
          dispatch({ type: actionType, apiResponse: { ...json, errors: { 'email': json.message } } });
        } else if (json.status_code === 400) {
          dispatch({ type: actionType, apiResponse: json });
          // if (json.message != 'Bad Request, Please check request') {
          // 	SnackBar('error', json.message);
          // }
          //  SnackBar('error', json.message);
          //  SnackBar('error', json.errors.message);
        } else if (json.status_code === 500) {

          notification && SnackBar('error', 'Internal Server Error');
        } else if (json.status_code === 204) {
          notification && SnackBar('success', json.message || 'The selected item has been deleted');
          dispatch({ type: actionType });
        } else if (json.message != 'Profile Data!') {
          notification && SnackBar('success', json.message);
        }
        resolve(json);
      })
      .catch((err) => {
        SnackBar('error', '🤷 Oops ! Server not responding.');
        reject(err);
      });
  });
};
