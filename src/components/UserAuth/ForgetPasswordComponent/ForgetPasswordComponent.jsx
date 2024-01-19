import React, { useState, useEffect } from 'react';
import {
	Container,
	Nav,
	Form,
	Button,
	Row,
	Col,
	Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { MyTextField } from '../../../Validations/InputField';
import Footer from '../../footer';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import style from "./ForgetPasswordComponent.module.css";
import { emailEnterAction } from '../../../redux/actions';
import emailIcon from '../../../assets/images/email.svg';
import passwordIcon from '../../../assets/images/password.svg';
import forgotPasswordImage from '../../../assets/images/forgot-password.svg';
import logo from '../../../assets/images/transdata.svg';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('* Email must be a valid email')
		.required('* Please enter your email address'),
});

const ForgetPasswordComponent = ({
	auth: { apiErrors, isLoading, user },
	emailEnterAction,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	// Api Common Errors Method
	const [serverError, setServerErrors] = useState({});
	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);
	/////////////////////////////
	const handleSubmit = (values) => {
		console.log('values', values);
		let formData = new FormData();
		formData.append('email', values.email);
		emailEnterAction(formData);
	};
	console.log('api_error', apiErrors);
	return (
		<>
			<section className={`${style.login_section}`}>
				<div className="container-fluid p-0">
					<div className="row m-0">
						<div className="col-md-6 p-0">
							<div className={`${style.login_left_section} text-left`}>
								<div className={`${style.logo_image}`}>
									<Link to={'/'}><img src={logo} alt="" /></Link>
								</div>
								<h2 className={`${style.login_left_heading} mb-4`}>Forgot<span>Password</span></h2>
								<p>Enter your email for the verification process.</p>
								<Formik
									enableReinitialize={true}
									initialValues={{
										email: '',
										tandc: false,
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
										<Form onSubmit={handleSubmit} noValidate autoomplete="off" className={`${style.login_form} `}>

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
												required={true}
											/>


											<Button
												type="submit"
												variant="flat"
												className={`btn ${style.btn_login} position-relative mt-4`}
												size="xxl"
												disabled={isLoading ? true : false}
											>
												{isLoading ? (
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

										</Form>
									)}
								</Formik>

								<Footer/>
								{/*<form className={`${style.login_form} `} onSubmit={}>*/}
								{/*	<div className="mb-3">*/}
								{/*		<label htmlFor="exampleInputEmail1" className={`${style.email_label} form-label`}>Email</label>*/}
								{/*		<div className='position-relative'>*/}
								{/*			<img src="/assets/email.svg" className={`${style.input_email_icon}`} alt=""/>*/}
								{/*			<input type="email" name='email' value={} className={`${style.email_input} form-control`} placeholder="Enter Email Address" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={}  required />*/}
								{/*		</div>*/}
								{/*	</div>*/}


								{/*	<button type="submit" className={`btn ${style.btn_login} position-relative mt-4`} >*/}

								{/*		{!loader && <>Submit</>}*/}
								{/*		<ThreeCircles*/}
								{/*			height="40"*/}
								{/*			width="40"*/}
								{/*			color="#ffffff"*/}
								{/*			wrapperStyle={{ margin: "auto" }}*/}
								{/*			wrapperClass="loader"*/}
								{/*			visible={loader}*/}
								{/*			ariaLabel="three-circles-rotating"*/}
								{/*			outerCircleColor=""*/}
								{/*			innerCircleColor=""*/}
								{/*			middleCircleColor=""*/}
								{/*		/>*/}
								{/*	</button>*/}
								{/*</form>*/}



							</div>

						</div>
						<div className="col-md-6 p-0">
							<div className={`${style.login_right_section}`}>
								<h2 className={`${style.login_right_heading} text-center`}>Use AI to Automate
									Title Closing Documents</h2>
								<img src={forgotPasswordImage} className={`${style.right_section_image}`} alt="" />
							</div>

						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	auth: state.sendEmail,
});

export default connect(mapStateToProps, {
	emailEnterAction,
})(ForgetPasswordComponent);
