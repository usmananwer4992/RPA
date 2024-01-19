import React from 'react';
import { toast } from 'react-toastify';
const SnackBar = (type, message) => {
	type !== 'success'
		? toast[type](message, {
				autoClose: 2.5 * 1000,
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				// progress: undefined,
		  })
		: toast(message, {
				autoClose: 2.5 * 1000,
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				// progress: undefined,
		  });
	return true;
};
export default SnackBar;
