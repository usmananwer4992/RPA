import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import style from './CreateOrderComponent.module.css';
import uploadImage from '../../assets/images/upload-icon.svg';
// import TextField from '@mui/material/TextField';
// import { Autocomplete } from '@mui/material';
// import { debounce } from 'lodash';
import {
	ADD_JOB_COMPLETED,
	AddJobAction,
	ListJobAction,
	CreateDocumentAction,
} from '../../redux/actions';
import { createJobDetail } from '../../Services/createJobDetail';
import { getFileURL } from '../../utils';
import { SnackBar } from 'components/common';
import CrossIcon from '../../assets/images/crossIcon.svg';
import { Button, Form, Spinner } from 'react-bootstrap';
import { MyTextField } from '../../Validations/InputField';
// import passwordIcon from '../../assets/images/password.svg';
import { Formik } from 'formik';
// import emailIcon from '../../assets/images/email.svg';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import fileImage from '../../assets/images/file-icon.svg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getToken, checkBrowser } from '../../utils';
// import * as ActionTypes from '../../redux/actions';
import {
	AddressAutofill,
	// AddressMinimap,
	// useConfirmAddress,
	config,
} from '@mapbox/search-js-react';

const validationSchema = Yup.object().shape({
	// package_address: Yup.string().required('* Please enter address'),
	notes: Yup.string().required('* Please enter new notes'),
	fileNo: Yup.string().required('* Please enter confirm File No'),
});
const CreateOrderComponent = ({
	addJob: { apiErrors,data },
	jobs,
	AddJobAction,
	notification = false,
	actionType,
	showCreateOrder,
	setShowCreateOrder,
	ListJobAction,
	CreateDocumentAction,
}) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [job, setJob] = useState({
		packTitle: null,
		packLender: null,
	});
	const [fileError, setFileError] = useState(false);

	// const [createdJobID, setCreatedJobID] = useState(null);
	const [serverError, setServerErrors] = useState({});
	const [token, setToken] = useState('');
	const [address, setAddress] = useState('');

	useEffect(() => {
		const accessToken =
			'pk.eyJ1IjoiemVlc2hhbjUyNyIsImEiOiJja2ViNXZsaGkwM3dyMzBua3B5aDk2Zm9iIn0.LAUWebcZsd7Mqryc_N8Rwg';
		setToken(accessToken);
		config.accessToken = accessToken;
	}, []);

	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);

	const handleSubmit = (values) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		  }, 5000);
		if (!job.packLender) {
			setFileError(true);
			return;
		}
		const getData = JSON.parse(localStorage.getItem('user') || {});
		const formData = new FormData();
		formData.append('notes', values.notes);
		formData.append('file_no', values.fileNo);
		formData.append('user', getData.id);
		formData.append('is_executed', 0);
		formData.append('package_address', address);

		console.log('job.packLender:', job.packLender);

		if (job.packLender instanceof File) {
			formData.append('file_path', job.packLender);
		} else {
			console.log('job.packLender is not a file object.');
		}

		formData.append('file_path', job.packLender);

		// url: 'http://192.168.0.106:8000/api/job/',
		const config = {
			method: 'post',
			url: 'https://demo-doc-manager.transdatadigital.com/api/job/',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getToken()}`,
			},
			data: formData,
		};
		
		axios(config)
			.then((response) => {
				// response.json();
				console.log(response)
				dispatch({ type: ADD_JOB_COMPLETED });
				ListJobAction(1, '');
				setShowCreateOrder(false);
				setJob({
					address: '',
					notes: '',
					fileNo: '',
					packTitle: null,
					packLender: null,
				});
				dispatch({ type: ADD_JOB_COMPLETED });
			})
			.catch((error) => {
				console.error('Error:', error);
				// Handle errors
			});
		// AddJobAction(formData);
	};

	useEffect(() => {
		async function uploadDoc() {
			try {
				if (data.id) {
					let getResults;
					if (getResults === 'ok') {
						dispatch({ type: ADD_JOB_COMPLETED });
						ListJobAction(0, '');
						setShowCreateOrder(false);
						setJob({
							address: '',
							notes: '',
							fileNo: '',
							packTitle: null,
							packLender: null,
						});
						
					}
				}
			} catch (error) {}
		}
		uploadDoc();
	}, [data]);

	const handleFileChange = (e) => {
		setJob((prev) => ({
			...prev,
			packLender: e.target.files[0],
		}));

		setFileError(false);
	};

	return (
		<div className={`${style.create_order_wrapcper}`}>
			<div className={`${style.create_order_header} px-3`}>
				<h4 className={`${style.create_order_title} `}>Create Order</h4>
				<img
					style={{ cursor: 'pointer' }}
					src={CrossIcon}
					alt=""
					width={15}
					onClick={() => setShowCreateOrder(!showCreateOrder)}
				/>
			</div>
			<div>
				<Formik
					enableReinitialize={true}
					initialValues={{
						package_address: '',
						fileNo: '',
						notes: '',
						// file_path: null,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						errors,
						touched,
					}) => (
						<Form
							onSubmit={handleSubmit}
							autoComplete="off"
							className={`${style.create_order_form}`}
						>
							<AddressAutofill accessToken={token}>
								<label className="form-label"> Address</label>
								<input
									autoComplete="shipping address-line1"
									name="package_address"
									value={address}
									className="form-control"
									onChange={(e) => setAddress(e.target.value)}
									required={true}
								/>
							</AddressAutofill>
							{/*<MyTextField*/}
							{/*	placeholder="Enter your Address"*/}
							{/*	inputType="text"*/}
							{/*	fieldName="package_address"*/}
							{/*	label="Address"*/}
							{/*	autoComplete="address-line1"*/}
							{/*	inputClasses={`form-control`}*/}
							{/*	labelClasses={` form-label`}*/}
							{/*	groupClasses={``}*/}
							{/*	serverError={serverError}*/}
							{/*	errors={errors.package_address || false}*/}
							{/*	inputValue={values.package_address}*/}
							{/*	fieldTouch={touched.package_address}*/}
							{/*	setServerErrors={setServerErrors}*/}
							{/*	apiErrors={apiErrors}*/}
							{/*	handleChange={handleChange}*/}
							{/*	required={true}*/}
							{/*/>*/}
							<MyTextField
								placeholder="File ID#"
								inputType="text"
								fieldName="fileNo"
								label="File ID#"
								inputClasses={`form-control`}
								labelClasses={` form-label`}
								groupClasses={``}
								serverError={serverError}
								errors={errors.fileNo || false}
								inputValue={values.fileNo}
								fieldTouch={touched.fileNo}
								setServerErrors={setServerErrors}
								apiErrors={apiErrors}
								handleChange={handleChange}
								// required={true}
							/>
							<MyTextField
								placeholder="Notes"
								inputType="textarea"
								fieldName="notes"
								label="Notes"
								inputClasses={`form-control`}
								labelClasses={` form-label`}
								groupClasses={``}
								serverError={serverError}
								errors={errors.notes || false}
								inputValue={values.notes}
								fieldTouch={touched.notes}
								setServerErrors={setServerErrors}
								apiErrors={apiErrors}
								handleChange={handleChange}
							/>
							<div className="text-center py-3">
								{job.packLender !== null || job.packTitle !== null ? (
									<div className="showFile">
										<img src={fileImage} alt="" />
										<span>{job.packLender.name || job.packTitle.name}</span>
									</div>
								) : (
									''
								)}
							</div>

							<div className={`${style.file_upload_wrapper}`}>
								<div
									className={` ${style.disabled_wrapper} position-relative `}
								>
									<div className={`${style.upload_title_box}`}>
										<img src={uploadImage} className="me-2" alt="" />
										<span>Upload Title Package</span>
									</div>
									<input
										id="fileUpload2"
										className={`${style.upload_input}`}
										onChange={(e) =>
											setJob((prev) => ({
												...prev,
												packTitle: e.target.files[0],
											}))
										}
										accept=".pdf, .zip"
										multiple
										type="file"
										disabled
									/>
								</div>
								<div className={`${style.upload_lender_pkg} position-relative`}>
									<div className={`${style.upload_lender_box}`}>
										<img src={uploadImage} className="me-2" alt="" />
										<span>Upload Lender Package</span>
									</div>
									<input
										id="fileUpload"
										className={`${style.upload_input}`}
										onChange={handleFileChange}
										accept=".pdf, .zip"
										// multiple
										type="file"
									/>
									{fileError && (
										<p style={{ fontSize: '12px', color: 'red' }}>
											* Document has not been uploaded yet.
										</p>
									)}
								</div>
							</div>

							<Button
								type="submit"
								variant="flat"
								className={`${style.btn_submit} btn position-relative mt-4`}
								size="xxl"
								// disabled={!job.packLender}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Spinner animation="border" size="sm" variant="light" />
									</>
								) : (
									'Submit'
								)}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	addJob: state.addJob,
	jobs: state.jobs,
	createDocument: state.createDocument,
});

export default connect(mapStateToProps, {
	AddJobAction,
	ListJobAction,
	CreateDocumentAction,
})(CreateOrderComponent);
