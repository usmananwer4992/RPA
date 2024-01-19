import * as _ from 'lodash';
export function isLoggedIn() {
  /*
   * Note:
   *  This app assume if local storage have roles it means
   *  user is authenticated you can update this logic as per your app.
   */
  // return !!localStorage.getItem('user');
  return !_.isNull(localStorage.getItem('user'))
    ? localStorage.getItem('user')
    : false;
  // return !!localStorage.getItem('roles');
}
export function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}
export function getAllowedRoutes(routes) {
  // const getUser = localStorage.getItem('roles');
  const getUsers = JSON.parse(localStorage.getItem('user'));


  const role = !_.isNull(getUsers) ? getUsers.services[0].key : null;

  // console.log(role);
  // const roles = JSON.parse(getUser);
  return routes.filter(({ permission }) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    else {
      // console.log([role]);
      const resp = _.intersection(permission, [role]).length;
      // console.log({ resp });
      return resp;
    }
  });
}
export const getToken = () => {
  if (_.isNull(localStorage.getItem('user'))) return null;
  return `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`;
};
export const getUserID = () => {
  if (_.isNull(localStorage.getItem('user'))) return null;
  return `${JSON.parse(localStorage.getItem('user')).id}`;
};
export const checkBrowser = () => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
export const getFileURL = (file) => {
  return window.URL.createObjectURL(file);
}
export const saveAuthToken = (token) =>
  token ? localStorage.setItem('user', JSON.stringify(token)) : false;
export const toQueryString = (paramsObject) =>
  Object.keys(paramsObject)
    .map((key) => `${encodeURI(key)}=${encodeURI(paramsObject[key])}`)
    .join('&');

export const domainToUserName = (res) => {
  const userName =
    res.url.length > 10
      ? new URL(res.url).pathname.replace('/', '').length > 0
        ? new URL(res.url).pathname.replace('/', '')
        : new URL(res.url).hostname
      : res.url;

  return userName.length > 16 ? userName.substring(0, 16) + '..' : userName;
};
