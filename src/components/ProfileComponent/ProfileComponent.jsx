import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './ProfileComponent.module.css';
import NavbarComponent from '../Navbar/NavbarComponent';
import { Button, Form, Spinner } from 'react-bootstrap';
import { MyTextField } from '../../Validations/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GetProfileAction, SendProfileAction } from '../../redux/actions';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { ClipLoader } from 'react-spinners';
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email should be in format')
		.required("Email can't be blank"),
	// gmail: Yup.string()
	// 	.email('Gmail should be in format')
	// 	.required("Gmail can't be blank"),
	gmail: Yup.string().when('isGdrive', {
		is: (value) => Boolean(value),
		then: Yup.string().email('Gmail should be in format')
			.required("Gmail can't be blank"),
		otherwise: Yup.string().nullable(),
	}),
	first_name: Yup.string().required("First Name can't be blank"),
	last_name: Yup.string().required("Last Name  can't be blank"),
	company_name: Yup.string().required("Company Name can't be blank"),
	website: Yup.string().required("Website can't be blank"),
	address: Yup.string().required("Address can't be blank"),
	state: Yup.string().required("State can't be blank"),
	zip: Yup.string().required("Zip can't be blank"),
});



const ProfileComponent = ({
	profile: { apiErrors, isLoading, data },
	GetProfileAction,
	SendProfileAction,
	sendProfile,
}) => {
	const [lenders, setLenders] = useState([]);
	const [lendersChecked, setLendersChecked] = useState([]);
	const [userCredentials, setUserCredentials] = useState({});
	const [serverError, setServerErrors] = useState({});

	const [showDriveInfo, setShowDriveInfo] = useState(false);
	useEffect(() => {

		GetProfileAction();

		const getData = JSON.parse(localStorage.getItem('user') || {});
		console.log(getData.services[0].key);
		if(getData.services[0].key === 'drive'){
			setShowDriveInfo(true);
		}else{
			setShowDriveInfo(false);
		}
	}, [GetProfileAction]);
	useEffect(() => {
		setServerErrors(sendProfile.apiErrors);
	}, [sendProfile]);
	useEffect(() => {

	}, [lendersChecked]);
	useEffect(() => {
		// let updatedlenders = [];
		if (data && data.lenders) {
			const updatedArray1 = data.default_lenders.map((item1) => {
				const match = data.lenders.find((item2) => item2.id === item1.id);
				if (match) {
					return { ...item1, checked: true };
				} else {
					return { ...item1, checked: false };
				}
			});



			// for (let index = 0; index < data.default_lenders.length; ++index) {
			// 	let item = data.default_lenders[index];
			// 	for (let index2 = 0; index2 < data.lenders.length; ++index2) {
			// 		let item2 = data.lenders[index2];
			// 		if (item.id === item2.id){
			// 			   console.log(item.name,item2.name);
			// 			updatedlenders.push({id: item.id ,name:item.name,file_id:item.file_id,created_at:item.created_at,checked:true});
			// 		}else{
			// 			updatedlenders.push({id: item.id ,name:item.name,file_id:item.file_id,created_at:item.created_at,checked:false});
			//
			// 		}
			//
			// 	}
			// }
			setLendersChecked(updatedArray1);
			setLenders(data.lenders);
		}
	}, [data]);
	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);
	useEffect(() => {
		const obj = {
			company_phone: data && data.user_company_detail.phone,
			phone: data && data.phone,
		};
		setUserCredentials(obj);
	}, [data]);
	const handleSubmit = (values) => {
console.log('here');
		const companyPhone = userCredentials.company_phone;
		const personalPhone = userCredentials.phone;

		console.log({ companyPhone, personalPhone });
		if (
			companyPhone === '' ||
			personalPhone === '' ||
			companyPhone === undefined ||
			personalPhone === undefined
		) {
			const errorObj = {};
			if (companyPhone === '' || companyPhone === undefined) {
				errorObj.company_phone = `Company Phone can't be blank`;
			}
			if (personalPhone === '' || personalPhone === undefined) {
				errorObj.phone = `Phone can't be blank`;
			}
			console.log({ errorObj });
			setServerErrors({
				...serverError,
				...errorObj,
			});
			return;
		}

		let lenders = lendersChecked.filter((x) => x.checked === true);
		lenders = lenders.map((x) => {
			return {
				id: x['id'],
				created_at: x['created_at'],
				name: x['name'],
				file_id: x['file_id'],
			};
		});
		let updatedValues = values;
		updatedValues = {
			...values,
			lenders,
			phone: personalPhone,
			user_company_detail: {
				phone: companyPhone,
				company_name: values.company_name,
				website: values.website,
				city: values.city,
				state: values.state,
				zipcode: values.zip,
			},
		};
		SendProfileAction(updatedValues);
	};
	useEffect(() => {
		console.log({ lenders });
	}, [lenders]);
	const handleLenderChange = (e, index) => {
		// let updateLender = lenders;
		// const value = parseInt(e.target.value);
		if (e.target.checked === true && lendersChecked[index].checked === false) {
			const x = [...lendersChecked];

			x[index].checked = true;

			setLendersChecked(x);
		} else if (
			e.target.checked === false &&
			lendersChecked[index].checked === true
		) {
			const x = [...lendersChecked];

			x[index].checked = false;

			setLendersChecked(x);
		}
	};
	const handleCredentials = (value, type) => {
		const obj = {
			company_phone: data && data.user_company_detail.phone,
			phone: data && data.phone,
			...userCredentials,
			[type]: value,
		};
		setUserCredentials(obj);

		if (serverError && serverError[type]) {
			delete serverError[type];
			setServerErrors(serverError);
		}
	};
	useEffect(() => {
	}, [userCredentials]);
	return (
		<>
			<NavbarComponent />
			<div className="row m-0">
				<div
					className="col-xl-12 "
					style={{ textAlign: 'center', position: 'absolute', top: '50%' }}
				>
					<ClipLoader
						color="#F27405"
						size={50}
						loading={isLoading}
						cssOverride={{ textAlign: 'center' }}
					/>
				</div>
			</div>

			{isLoading === false && data && data.id && (
				<section className={`${style.profile_section}`}>
					<div className="row m-0">
						<div className="col-xl-5 col-md-0">
							<div
								className={`${style.profile_left_img} ${style['profile_left_img--tabletScreen']} ${style['profile_left_img--mobileScreen']}`}
							></div>
						</div>
						<div className="col-md-12 col-xl-7">
							<div className={`${style.form_wrapper}`}>
								<Formik
									enableReinitialize={true}
									initialValues={{
										first_name: data && data.first_name,
										last_name: data && data.last_name,
										email: data && data.email,
										phone: data && data.phone,
										company_name: data && data.user_company_detail.company_name,
										website: data && data.user_company_detail.website,
										address: data && data.user_company_detail.address_1,
										zip: data && data.user_company_detail.zipcode,
										city: data && data.user_company_detail.city,
										state: data && data.user_company_detail.state,
										gmail: data && data.gmail,
										company_phone: data && data.user_company_detail.phone,
										tandc: false,
										isGdrive: showDriveInfo,

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
											noValidate
											autoomplete="off"
											className={`${style.login_form} `}
										>
											<div
												className={`${style.personal_info_wrapper} ${style['personal_info_wrapper--tabletScreen']}`}
											>
												<div className="row">
													<div className="col-md-12">
														<h4 className={`${style.personal_info_header}`}>
															Personal Information
														</h4>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="first_name"
																label="First Name"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.first_name || false}
																inputValue={values.first_name}
																fieldTouch={touched.first_name}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="last_name"
																label="Last Name"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.last_name || false}
																inputValue={values.last_name}
																fieldTouch={touched.last_name}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<label htmlFor="phone" className="form-label">
																Phone <span style={{ color: 'red' }}>*</span>
															</label>
															<PhoneInput
																name="phone"
																className={`${style.phone_field}`}
																placeholder="Enter phone number"
																value={values.phone}
																serverError={serverError}
																errors={errors.phone || false}
																inputValue={values.phone}
																fieldTouch={touched.phone}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																onChange={(e) => handleCredentials(e, 'phone')}
																// handleChange={handleChange}
															/>
															{serverError && serverError['phone'] && (
																<div className="error-text">
																	{serverError['phone']}
																</div>
															)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="email"
																fieldName="email"
																label="Email Address"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.email || false}
																inputValue={values.email}
																fieldTouch={touched.email}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
												</div>
											</div>
											<div
												className={`${style.company_info_wrapper} ${style['company_info_wrapper--tabletScreen']}`}
											>
												<div className="row">
													<div className="col-md-12">
														<h4 className={`${style.company_info_header}`}>
															Company Information
														</h4>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="company_name"
																label="Company Name"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.company_name || false}
																inputValue={values.company_name}
																fieldTouch={touched.company_name}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="website"
																label="Website"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.website || false}
																inputValue={values.website}
																fieldTouch={touched.website}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-12">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="address"
																label="Address"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.address || false}
																inputValue={values.address}
																fieldTouch={touched.address}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="zip"
																label="Zip"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.zip || false}
																inputValue={values.zip}
																fieldTouch={touched.zip}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="city"
																label="City"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.city || false}
																inputValue={values.city}
																fieldTouch={touched.city}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={false}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<MyTextField
																placeholder=""
																inputType="text"
																fieldName="state"
																label="State"
																inputClasses={`form-control`}
																labelClasses={`form-label`}
																groupClasses={``}
																serverError={serverError}
																errors={errors.state || false}
																inputValue={values.state}
																fieldTouch={touched.state}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																handleChange={handleChange}
																required={true}
															/>
														</div>
													</div>
													<div className="col-md-6">
														<div className="mb-3 px-3">
															<label htmlFor="phone" className="form-label">
																Phone
																<span style={{ color: 'red' }}>*</span>
															</label>
															<PhoneInput
																name="company_phone"
																className={`${style.phone_field}`}
																placeholder="Enter phone number"
																value={values.company_phone}
																serverError={serverError}
																errors={errors.company_phone || false}
																inputValue={values.company_phone}
																fieldTouch={touched.company_phone}
																setServerErrors={setServerErrors}
																apiErrors={apiErrors}
																onChange={(e) => {
																	handleCredentials(e, 'company_phone');
																}}
															/>

															{serverError && serverError['company_phone'] && (
																<div className="error-text">
																	{serverError['company_phone']}
																</div>
															)}
														</div>
													</div>
													{
														showDriveInfo &&
															<>
																<div className="col-md-12">
																	<div className="mb-3 px-3">
																		<MyTextField
																			placeholder=""
																			inputType="email"
																			fieldName="gmail"
																			label="Gmail"
																			inputClasses={`form-control`}
																			labelClasses={`form-label`}
																			groupClasses={``}
																			serverError={serverError}
																			errors={errors.gmail || false}
																			inputValue={values.gmail}
																			fieldTouch={touched.gmail}
																			setServerErrors={setServerErrors}
																			apiErrors={apiErrors}
																			handleChange={handleChange}
																			required={true}
																		/>
																	</div>
																</div>
																<div className="col-md-12">
																	<div className="mb-3 px-3">
																		<label
																			htmlFor="lenders"
																			className={`${style.email_label} form-label`}
																		>
																			Lenders
																		</label>
																		<div className="row">
																			{lendersChecked &&
																			lendersChecked.length > 0 &&
																			lendersChecked.map((lender, i) => (
																				<>
																					<div className="col-md-6">
																						<div className="position-relative">
																							<input
																								className={`${style.cl_custom_check}`}
																								id={lender.name}
																								key={i}
																								type="checkbox"
																								value={lender.id}
																								checked={lender.checked}
																								onChange={(e) =>
																									handleLenderChange(e, i)
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
																		</div>
																	</div>
																</div>
															</>
													}

													<div className="col-md-12 px-4">
														<Button
															type="submit"
															variant="flat"
															className={`btn ${style.btn_login} position-relative mt-4 mb-4`}
															size="xxl"
															disabled={sendProfile.isLoading ? true : false}

														>
															{sendProfile.isLoading ? (
																<>
																	<Spinner
																		animation="border"
																		size="sm"
																		variant="light"
																	/>
																</>
															) : (
																'Submit'
															)}
														</Button>
													</div>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	sendProfile: state.sendProfile,
});
export default connect(mapStateToProps, {
	GetProfileAction,
	SendProfileAction,
})(ProfileComponent);
