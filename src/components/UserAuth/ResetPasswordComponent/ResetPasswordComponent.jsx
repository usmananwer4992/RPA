import React, { useState, useEffect } from 'react';
import { Container, Nav, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "../../../assets/images/transdata.svg";
import forgotPasswordImage from "../../../assets/images/forgot-password.svg"
import { resetPasswordAction } from '../../../redux/actions';
import { useParams, useLocation, Link } from 'react-router-dom';
import style from '../ForgetPasswordComponent/ForgetPasswordComponent.module.css';
import { MyTextField } from '../../../Validations/InputField';
import passwordIcon from '../../../assets/images/password.svg';
import Footer from '../../footer';
import queryString from 'query-string';

const validationSchema = Yup.object().shape({
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
});

const ResetPasswordComponent = ({
												 resetPassword: { apiErrors, isLoading, user },
												 resetPasswordAction,
											 }) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const params = useParams();
	console.log('params====', params);
	// Api Common Errors Method
	const [serverError, setServerErrors] = useState({});
	const [showpassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);




	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);
	/////////////////////////////
	const showPassword = () => {
		// setShow(true)
		setShowPassword((prevState) => !prevState);
	};
	const hidPassword = () => {
		// setShow(false);
		setShowPassword((prevState) => !prevState);
	};
	const showConfPassword = () => {
		// setShow(true)
		setShowConfirmPassword((prevState) => !prevState);
	};
	const hidConfrPassword = () => {
		// setShow(false);
		setShowConfirmPassword((prevState) => !prevState);
	};
	const handleSubmit = (values) => {
		console.log('values', values);
		const payload = {
			uid: queryParams.get("uid"),
			token: queryParams.get("token"),
			password: values.password,
			confirm_password: values.confirm_password,
		};
		console.log(payload);
		// let formData = new FormData();
		// formData.append('password', values.password);
		// formData.append('confirm_password', values.confirm_password);
		resetPasswordAction(payload);
	};

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
								<h2 className={`${style.login_left_heading} mb-4`}>Verification</h2>
								<p>Set the new password for your account so you can login
									and access all features.</p>
								<Formik
									enableReinitialize={true}
									initialValues={{
										password: '',
										confirm_password:'',
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

											<div className="position-relative">
												<MyTextField
													placeholder="Enter your password"
													inputType={showpassword ? 'text' : 'password'}
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
														{showpassword ? (
															<span className="eye-icon" onClick={showPassword}>
                      {' '}
																<AiFillEye color="9e9bd0" />{' '}
                    </span>
														) : (
															<span className="eye-icon" onClick={hidPassword}>
                      {' '}
																<AiFillEyeInvisible color="9e9bd0" />{' '}
                    </span>
														)}
													</>
												)}
											</div>
											<div className="position-relative">
												<MyTextField
													placeholder="Confirm your password"
													inputType={showConfirmPassword ? 'text' : 'password'}
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
															<span className="eye-icon" onClick={showConfPassword}>
                      {' '}
																<AiFillEye color="9e9bd0" />{' '}
                    </span>
														) : (
															<span className="eye-icon" onClick={hidConfrPassword}>
                      {' '}
																<AiFillEyeInvisible color="9e9bd0" />{' '}
                    </span>
														)}
													</>
												)}
											</div>

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
	resetPassword: state.resetPassword,
});

export default connect(mapStateToProps, {
	resetPasswordAction,
})(ResetPasswordComponent);
