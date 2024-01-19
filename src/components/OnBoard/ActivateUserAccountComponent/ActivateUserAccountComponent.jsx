import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	resetPasswordAction,
	DriveSignUpAction,
	CreateUserAction,
} from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import style from './ActivateUserAccountComponent.module.css';
import Footer from '../../footer';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/transdata.svg';
import rightImage from '../../../assets/images/ai-img.svg';
import { Formik, validateYupSchema } from 'formik';
import { useDispatch } from 'react-redux';
import { MyTextField } from '../../../Validations/InputField';
import { Button, Form, Spinner } from 'react-bootstrap';
import emailIcon from '../../../assets/images/email.svg';
import passwordIcon from '../../../assets/images/password.svg';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import companyImage from '../../../assets/images/company.svg';
import websiteimage from '../../../assets/images/website.svg';
import * as Yup from 'yup';
import queryString from 'query-string';
import checkoutGif from '../../../assets/images/checkout.gif';
// import Select from 'react-select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { update } from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const validationDriveSchema = Yup.object().shape({
	password: Yup.string()
		.required('* Please enter password')
		.min(8, '* Password should atleast 8 characters')
		.max(20, '* Password is to long, Max 20 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
			'* Password contains a combination of uppercase and lowercase letter, number and a Special Character is required.'
		),
	confirm_password: Yup.string()
		.required('* Please enter confirm password')
		.oneOf([Yup.ref('password')], '* Password does not match'),
	email: Yup.string()
		.email('Email should be in format')
		.required("Email can't be blank"),
	website: Yup.string().required("Email can't be blank"),
	company_name: Yup.string().required("Email can't be blank"),
	gmail: Yup.string()
		.email('Gmail should be in format')
		.required("Gmail can't be blank"),
	// lender: Yup.string().required("Lenders can't be blank"),
});
const validationAppSchema = Yup.object().shape({
	password: Yup.string()
		.required('* Please enter password')
		.min(8, '* Password should atleast 8 characters')
		.max(20, '* Password is to long, Max 20 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
			'* Password contains a combination of uppercase and lowercase letter, number and a Special Character is required.'
		),
	confirm_password: Yup.string()
		.required('* Please enter confirm password')
		.oneOf([Yup.ref('password')], '* Password does not match'),
	email: Yup.string()
		.email('Email should be in format')
		.required("Email can't be blank"),
	website: Yup.string().required("Website can't be blank"),
	company_name: Yup.string(),
});

const ActivateUserAccountComponent = ({
	getUserData: { apiErrors, isLoading, user },
	DriveSignUpAction,
	CreateUserAction,
	createUser,
}) => {
	const [serverError, setServerErrors] = useState({});
	const [show, setShow] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [lenders, setLenders] = useState([]);
	const [uuid, setUuid] = useState(false);

	// const [selectedLender, setSelectedLender0] = useState([]);
	const handleChangeLender = (event, newValue) => {
		
		setLenders(newValue);
	};

	const handleRemove = (value) => {
		const updatedValues = setLenders.filter((item) => item !== value);
		setLenders(updatedValues);
	};

	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);
	useEffect(() => {}, [user]);
	const params = useParams();
	console.log('params====', params);

	useEffect(() => {
		(async () => {
			setUuid(params.uuid);
			await DriveSignUpAction({ uuid: params.uuid });
		})();
	}, []);

	const getUrlParams = () => {
		const params = queryString.parse(window.location.search);

		console.log({ params });
		let payload = {
			uuid: params.uuid,
		};
		if (payload) {
			DriveSignUpAction(payload);
		}
	};
	const showPassword = () => {
		// setShow(true)
		setShow((prevState) => !prevState);
	};
	const hidPassword = () => {
		// setShow(false);
		setShow((prevState) => !prevState);
	};
	const showConfPassword = () => {
		// setShow(true)
		setShowConfirmPassword((prevState) => !prevState);
	};
	const hidConfPassword = () => {
		// setShow(false);
		setShowConfirmPassword((prevState) => !prevState);
	};
	const handleSubmit = (values) => {
		console.log({ values });
		let updatedValues = values;
		if (lenders.length === 0 && user && user.services[0] === 'drive') {
			setServerErrors({
				lender: 'Lender is Required.',
			});
		} else {
			updatedValues = { ...values, uuid, lenders };
			CreateUserAction(updatedValues);
		}

		// let formData = new FormData();
		// formData.append('password', values.password);
		// formData.append('confirm_password', values.confirm_password);
		// resetPasswordAction(formData, params);
	};

	const [lenderValues, setLenderValues] = React.useState([]);
	//   const handleChange = (e, index) => {
	//     let updateLenderCheckbox = [...lenderValues]
	//     updateLenderCheckbox[index].status = e.target.checked
	//     setLenderValues(updateLenderCheckbox);
	//     const user = { ...user }
	//     user.selected_lender = JSON.stringify(updateLenderCheckbox.filter((x) => x.status === true).map((x) => { return x.id }))
	//     setUserCredentials(user)
	//   };
	//   useEffect(() => {
	//     let lenderObject = {}
	//     if (companies) {
	//       lenderObject = companies.map((x) => {
	//         return {
	//           ['status']: false,
	//           ['name']: x.name,
	//           ['id']: x.id
	//         }
	//       })
	//       setLenderValues(lenderObject)
	//     }
	//   }, [companies])

	useEffect(() => {
		console.log({ lenders });
	}, [lenders]);
	// const handleLenderChange = (e, newValue) => {
	// 	const value = parseInt(e.target.value);
	// 	// const updatedValue = newValue.map((lender) => lender.name);
	// 	// setLenders(updatedValue);
	// 	// console.log('new', newValue)
		
	// 	// Create a new array based on the current lenders
	// 	let updatedLenders = [...lenders];
	  
	// 	if (e.target.checked === true && !updatedLenders.includes(value)) {
	// 	  updatedLenders.push(value);
	// 	} else if (e.target.checked === false) {
	// 	  updatedLenders = updatedLenders.filter((lender) => lender !== value);
	// 	}
	  
	// 	// Update the state with the new array of lenders
	// 	setLenders(updatedLenders);
	//   };
	const handleLenderChange = (e) => {
		setLenders(e.target.value);
		let updateLender = lenders;
		const value = parseInt(e.target.value);
		if (e.target.checked === true && !updateLender.includes(value)) {
			updateLender.push(value);
		} else if (e.target.checked === false) {
			updateLender = updateLender.filter((e) => e !== value);
		}
	};
	return (
		<>
			{isLoading === true && (
				<>
					<div className="text-center pt-5">
						<img src={checkoutGif} alt="Checkout" className="pt-5" />
					</div>
				</>
			)}
			{isLoading === false && user && user.id && (
				<section className={`${style.login_section}`}>
					<div className="container-fluid p-0">
						<div className="row m-0">
							<div className="col-md-6 p-0">
								<div className={`${style.login_left_section} text-left`}>
									<div className={`${style.logo_image}`}>
										<img src={logo} alt="" />
									</div>
									<h2 className={`${style.login_left_heading} mb-2`}>
										Account<span>Activation</span>
									</h2>
									<Formik
										enableReinitialize={true}
										// initialValues={{
										// 	email: user && user.email,
										// 	password: '',
										// 	confirm_password:'',
										// 	company_name:
										// 		user && user.user_company_detail.company_name,
										// 	website: user && user.user_company_detail.website,
										// }
										// }
										initialValues={
											user && user.services[0].key === 'drive'
												? {
														email: user && user.email,
														password: '',
														confirm_password: '',
														company_name:
															user && user.user_company_detail.company_name,
														website: user && user.user_company_detail.website,
														gmail: '',
														lenders: [],
												  }
												: {
														email: user && user.email,
														password: '',
														confirm_password: '',
														company_name:
															user && user.user_company_detail.company_name,
														website: user && user.user_company_detail.website,
												  }
										}
										validationSchema={
											user && user.services[0].key === 'drive'
												? validationDriveSchema
												: validationAppSchema
										}
										// validationSchema={ validationAppSchema}
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
												noValidate
												autoomplete="off"
												className={`${style.login_form} `}
											>
												<div className="row">
													<div className="col-md-12">
														<div className="mb-3">
															<label
																htmlFor="lenders"
																className={`${style.email_label} form-label`}
															>
																Select Lenders
															</label>
															<div className="row">
																<div className="col-md-12">
																	<FormControl fullWidth>
																		<Autocomplete
																			multiple
																			id="tags-outlined"
																			options={user.default_lenders}
																			getOptionLabel={(option) => option.name}
																			filterSelectedOptions
																			onChange={handleChangeLender} // Attach the event handler
																			value={lenders} // Set the value of the Autocomplete to the lenders state
																			renderInput={(params) => (
																				<TextField
																					{...params}
																					placeholder="Select Lenders"
																				/>
																			)}
																		/>
																		{/* <Select
																			labelId="demo-multiple-chip-label"
																			id="demo-multiple-chip"
																			multiple
																			value={lenders}
																			onChange={handleChangeLender}
																			sx={{
																				background: '#F9F9F9',
																				border: `1px solid '#CCCCCC'`,
																				height: '48px',
																				
																			}}
																			// input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

																			renderValue={(selected) => (
																				<div>
																					{selected.map((value) => (
																						<Chip key={value} label={value}  />
																					))}
																				</div>
																			)}
																			MenuProps={MenuProps}
																		>
																			{user.default_lenders.map((item) => (
																				<MenuItem
																					key={item.id}
																					value={item.name}
																				>
																					{item.name}
																				</MenuItem>
																			))}
																		</Select> */}
																	</FormControl>
																</div>

																{/* {user.default_lenders &&
																			user.default_lenders.map((lender) => (
																				<>
																					<div className="col-md-6">
																						<div className="position-relative">
																							<input
																								className={`${style.cl_custom_check}`}
																								id={lender.name}
																								type="checkbox"
																								value={lender.id}
																								onChange={(e) =>
																									handleLenderChange(e)
																								}
																								name={lender.name}
																							/>
																							<label
																								className={`${style.cl_custom_check_label}`}
																								htmlFor={lender.name}
																								title="Click for select/unselect"
																							>
																								<span className="fas fa-check pe-2"></span>
																								{lender.name}
																							</label>
																						</div>
																					</div>
																				</>
																			))} */}
																{/* <Select
																	labelId="demo-multiple-name-label"
																	id="demo-multiple-name"
																	multiple
																	value={user.default_lenders.indexOf()}
																	
																	// onChange={(e) => handleCredentials(e, 'lender')}
																	name="selected_lender"
																	// input={<OutlinedInput label="Name" />}
																	// renderValue={(selected) => (
																	// <div>
																	// {selected.map((value) => (
																	// 			<span key={value}>{value}</span>
																	//  		))}
																	//  	</div>
																	//  )}
																> */}
																{/* {user.default_lenders &&
																			user.default_lenders.map((lender) => (
																				<MenuItem key={lender.id} value={lender.name}>
																				  <Checkbox checked={user.default_lenders.indexOf(lender.name) > -1} />
																				  <ListItemText primary={lender.name} />
																				</MenuItem>
																			))} */}
																{/* </Select> 
																{serverError && serverError['lender'] && (
																	<div className="error-text">
																		{serverError['lender']}
																	</div>
																)} */}
															</div>
															<div className="row ">
																{serverError && serverError['lender'] && (
																	<div className="error-text">
																		{serverError['lender']}
																	</div>
																)}
															</div>
														</div>
													</div>
													<div className="col-md-12">
														<MyTextField
															placeholder="Enter your email address"
															inputType="email"
															fieldName="email"
															label="Email"
															inputClasses={`${style.email_input} form-control`}
															labelClasses={`${style.email_label} form-label`}
															groupClasses={``}
															serverError={serverError}
															errors={errors.email || false}
															inputValue={values.email}
															fieldTouch={touched.email}
															setServerErrors={setServerErrors}
															apiErrors={apiErrors}
															handleChange={handleChange}
															fieldIcon={emailIcon}
															disabled={true}
														/>
													</div>
													<div className="col-md-6">
														<MyTextField
															placeholder="Company Name"
															inputType="text"
															fieldName="Company Name"
															label="Company Name"
															inputClasses={`${style.email_input} form-control`}
															labelClasses={`${style.email_label} form-label`}
															groupClasses={``}
															serverError={serverError}
															errors={errors.company_name || false}
															inputValue={values.company_name}
															fieldTouch={touched.company_name}
															setServerErrors={setServerErrors}
															apiErrors={apiErrors}
															handleChange={handleChange}
															fieldIcon={companyImage}
															required={true}
														/>
													</div>

													<div className="col-md-6">
														<MyTextField
															placeholder="Url"
															inputType="text"
															fieldName="website"
															label="Website"
															inputClasses={`${style.email_input} form-control`}
															labelClasses={`${style.email_label} form-label`}
															groupClasses={``}
															serverError={serverError}
															errors={errors.website || false}
															inputValue={values.website}
															fieldTouch={touched.website}
															setServerErrors={setServerErrors}
															apiErrors={apiErrors}
															handleChange={handleChange}
															fieldIcon={websiteimage}
															required={true}
														/>
													</div>
													<div className="col-md-6">
														<div className="position-relative">
															<MyTextField
																placeholder="Enter your password"
																inputType={show ? 'text' : 'password'}
																fieldName="password"
																label="Password"
																inputClasses={`${style.password_input} form-control`}
																labelClasses={`${style.password_label} form-label`}
																groupClasses={``}
																required={true}
																serverError={serverError}
																errors={errors.password || false}
																inputValue={values.password}
																fieldTouch={touched.password}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																fieldIcon={passwordIcon}
															/>
															{values.password === '' ? (
																<> </>
															) : (
																<>
																	{show ? (
																		<span
																			className="eye-icon"
																			onClick={showPassword}
																		>
																			{' '}
																			<AiFillEye color="9e9bd0" />{' '}
																		</span>
																	) : (
																		<span
																			className="eye-icon"
																			onClick={hidPassword}
																		>
																			{' '}
																			<AiFillEyeInvisible color="9e9bd0" />{' '}
																		</span>
																	)}
																</>
															)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="position-relative">
															<MyTextField
																placeholder="Confirm your password"
																inputType={
																	showConfirmPassword ? 'text' : 'password'
																}
																fieldName="confirm_password"
																label="Confirm Password"
																inputClasses={`${style.password_input} form-control`}
																labelClasses={`${style.password_label} form-label`}
																groupClasses={``}
																required={true}
																serverError={serverError}
																errors={errors.confirm_password || false}
																inputValue={values.confirm_password}
																fieldTouch={touched.confirm_password}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																fieldIcon={passwordIcon}
															/>
															{values.confirm_password === '' ? (
																<> </>
															) : (
																<>
																	{showConfirmPassword ? (
																		<span
																			className="eye-icon"
																			onClick={showConfPassword}
																		>
																			{' '}
																			<AiFillEye color="9e9bd0" />{' '}
																		</span>
																	) : (
																		<span
																			className="eye-icon"
																			onClick={hidConfPassword}
																		>
																			{' '}
																			<AiFillEyeInvisible color="9e9bd0" />{' '}
																		</span>
																	)}
																</>
															)}
														</div>
													</div>
													{user && user.services[0].key === 'drive' && (
														<>
															<div className="col-md-12">
																<div className="mb-3">
																	<label
																		htmlFor="lenders"
																		className={`${style.email_label} form-label`}
																	>
																		Select Lenders
																	</label>
																	{/* <div className="row">
																		{user.default_lenders &&
																			user.default_lenders.map((lender) => (
																				<>
																					<div className="col-md-6">
																						<div className="position-relative">
																							<input
																								className={`${style.cl_custom_check}`}
																								id={lender.name}
																								type="checkbox"
																								value={lender.id}
																								onChange={(e) =>
																									handleLenderChange(e)
																								}
																								name={lender.name}
																							/>
																							<label
																								className={`${style.cl_custom_check_label}`}
																								htmlFor={lender.name}
																								title="Click for select/unselect"
																							>
																								<span className="fas fa-check pe-2"></span>
																								{lender.name}
																							</label>
																						</div>
																					</div>
																				</>
																			))}
																		{serverError && serverError['lender'] && (
																			<div className="error-text">
																				{serverError['lender']}
																			</div>
																		)}
																	</div> */}
																	<div className="row">
																		<div className="col-md-12">
																			<div className="position-relative">
																				<input
																					className={`${style.cl_custom_check}`}
																					id="abc"
																					type="checkbox"
																					value="abc"
																					onChange={(e) =>
																						handleLenderChange(e)
																					}
																					name="ABC"
																				/>
																				<label
																					className={`${style.cl_custom_check_label}`}
																					htmlFor="ABC"
																					title="Click for select/unselect"
																				>
																					<span className="fas fa-check pe-2"></span>
																					ABC
																				</label>
																			</div>
																		</div>
																		<div className="col-md-6">
																			<div className="position-relative">
																				<input
																					className={`${style.cl_custom_check}`}
																					id="abc"
																					type="checkbox"
																					value="abc"
																					onChange={(e) =>
																						handleLenderChange(e)
																					}
																					name="ABC"
																				/>
																				<label
																					className={`${style.cl_custom_check_label}`}
																					htmlFor="ABC"
																					title="Click for select/unselect"
																				>
																					<span className="fas fa-check pe-2"></span>
																					ABC
																				</label>
																			</div>
																		</div>

																		{serverError && serverError['lender'] && (
																			<div className="error-text">
																				{serverError['lender']}
																			</div>
																		)}
																	</div>
																</div>
															</div>
															<div className="col-md-12">
																<MyTextField
																	placeholder="Gmail"
																	inputType="email"
																	fieldName="gmail"
																	label="Gmail"
																	inputClasses={`${style.email_input} form-control`}
																	labelClasses={`${style.email_label} form-label`}
																	groupClasses={``}
																	serverError={serverError}
																	errors={errors.gmail || false}
																	inputValue={values.gmail}
																	fieldTouch={touched.gmail}
																	setServerErrors={setServerErrors}
																	apiErrors={apiErrors}
																	handleChange={handleChange}
																	fieldIcon={emailIcon}
																	required={true}
																/>
															</div>
														</>
													)}
												</div>
												<Button
													type="submit"
													variant="flat"
													className={`btn ${style.btn_login} position-relative mt-4`}
													size="xxl"
													disabled={createUser.isLoading ? true : false}
												>
													{createUser.isLoading ? (
														<>
															<Spinner
																animation="border"
																size="sm"
																variant="light"
															/>
														</>
													) : (
														'Activate Account'
													)}
												</Button>
											</Form>
										)}
									</Formik>

									<Footer />
								</div>
							</div>
							<div className="col-md-6 p-0">
								<div className={`${style.login_right_section}`}>
									<h2 className={`${style.login_right_heading} text-center`}>
										Use AI to Automate Title Closing Documents
									</h2>
									<img
										src={rightImage}
										className={`${style.right_section_image}`}
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	getUserData: state.getUserData,
	createUser: state.createUser,
});

export default connect(mapStateToProps, {
	DriveSignUpAction,
	CreateUserAction,
})(ActivateUserAccountComponent);
