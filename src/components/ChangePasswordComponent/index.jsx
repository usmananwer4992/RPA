import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ChangePasswordAction } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import style from './ChangePassword.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from '../Navbar/NavbarComponent';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Button, Form, Spinner } from 'react-bootstrap';
import { MyTextField } from '../../Validations/InputField';
import passwordIcon from '../../assets/images/password.svg';
import { Formik } from 'formik';
import SnackBar from '../common/SnackBar';
const validationSchema = Yup.object().shape({
	old_password: Yup.string()
		.required('* Please enter password')
		.min(8, '* Password should atleast 8 characters')
		.max(20, '* Password is to long, Max 20 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
			'* Password contains a combination of uppercase and lowercase letter, number and a Special Character is required.'
		),
	new_password: Yup.string()
		.required('* Please enter new password')
		.min(8, '* Password should atleast 8 characters')
		.max(20, '* Password is to long, Max 20 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
			'* Password contains a combination of uppercase and lowercase letter, number and a Special Character is required.'
		)
		.notOneOf(
			[Yup.ref('old_password')],
			'* Password should not be same as old password'
		),
	confirm_new_password: Yup.string()
		.required('* Please enter confirm password')
		.min(8, '* Password should atleast 8 characters')
		.max(20, '* Password is to long, Max 20 characters')
		.oneOf([Yup.ref('new_password')], '* Password does not match'),
});

const ChangePasswordComponent = ({
	changePassword: { apiErrors, isLoading, user },
	ChangePasswordAction,
}) => {
	const [serverError, setServerErrors] = useState({});
	const [showNew, setShowNew] = useState(false);
	const [showOld, setShowOld] = useState(false);
	const [showConfirmNew, setShowConfirmNew] = useState(false);
	useEffect(() => {
		setServerErrors(apiErrors);
	}, [apiErrors]);
	const showOldPassword = () => {
		// setShow(true)
		setShowOld((prevState) => !prevState);
	};
	const hidOldPassword = () => {
		// setShow(false);
		setShowOld((prevState) => !prevState);
	};
	const showNewPassword = () => {
		// setShow(true)
		setShowNew((prevState) => !prevState);
	};
	const hidNewPassword = () => {
		// setShow(false);
		setShowNew((prevState) => !prevState);
	};
	const showConfirmPassword = () => {
		// setShow(true)
		setShowConfirmNew((prevState) => !prevState);
	};
	const hidConfirmPassword = () => {
		// setShow(false);
		setShowConfirmNew((prevState) => !prevState);
	};

	const handleSubmit = (values) => {
		console.log('values', values);

		const payload = {
			old_password: values.old_password,
			new_password: values.new_password,
			confirm_new_password: values.confirm_new_password,
		};
		ChangePasswordAction(payload);
	};

	useEffect(() => {
		console.log({ apiErrors });
	}, [apiErrors]);
	return (
		<>
			<ToastContainer />
			<NavbarComponent />
			<section className="pt-5">
				<div className="container-fluid p-0">
					<div className={`card ${style.cstm_card} p-5`}>
						<div className="card-body p-0">
							<Formik
								enableReinitialize={true}
								initialValues={{
									old_password: '',
									new_password: '',
									confirm_new_password: '',
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
									<Form
										onSubmit={handleSubmit}
										noValidate
										autoomplete="off"
										className={`${style.login_form} `}
									>
										<div className="position-relative">
											<MyTextField
												placeholder="Enter your Old Password"
												inputType={showOld ? 'text' : 'password'}
												fieldName="old_password"
												label="Old Password"
												inputClasses={`${style.password_input} form-control`}
												labelClasses={`${style.password_label} form-label`}
												groupClasses={``}
												required={true}
												serverError={serverError}
												errors={errors.old_password || false}
												inputValue={values.old_password}
												fieldTouch={touched.old_password}
												setServerErrors={setServerErrors}
												apiErrors={apiErrors}
												handleChange={handleChange}
												fieldIcon={passwordIcon}
											/>
											{values.old_password === '' ? (
												<> </>
											) : (
												<>
													{showOld ? (
														<span
															className="eye-icon"
															onClick={showOldPassword}
														>
															{' '}
															<AiFillEye color="9e9bd0" />{' '}
														</span>
													) : (
														<span className="eye-icon" onClick={hidOldPassword}>
															{' '}
															<AiFillEyeInvisible color="9e9bd0" />{' '}
														</span>
													)}
												</>
											)}
										</div>
										<div className="position-relative">
											<MyTextField
												placeholder="Enter your New Password"
												inputType={showNew ? 'text' : 'password'}
												fieldName="new_password"
												label="New Password"
												inputClasses={`${style.password_input} form-control`}
												labelClasses={`${style.password_label} form-label`}
												groupClasses={``}
												required={true}
												serverError={serverError}
												errors={errors.new_password || false}
												inputValue={values.new_password}
												fieldTouch={touched.new_password}
												setServerErrors={setServerErrors}
												apiErrors={apiErrors}
												handleChange={handleChange}
												fieldIcon={passwordIcon}
											/>
											{values.new_password === '' ? (
												<> </>
											) : (
												<>
													{showNew ? (
														<span
															className="eye-icon"
															onClick={showNewPassword}
														>
															{' '}
															<AiFillEye color="9e9bd0" />{' '}
														</span>
													) : (
														<span className="eye-icon" onClick={hidNewPassword}>
															{' '}
															<AiFillEyeInvisible color="9e9bd0" />{' '}
														</span>
													)}
												</>
											)}
										</div>

										<div className="position-relative">
											<MyTextField
												placeholder="Confirm your New Password"
												inputType={showConfirmNew ? 'text' : 'password'}
												fieldName="confirm_new_password"
												label="Confirm New Password"
												inputClasses={`${style.password_input} form-control`}
												labelClasses={`${style.password_label} form-label`}
												groupClasses={``}
												required={true}
												serverError={serverError}
												errors={errors.confirm_new_password || false}
												inputValue={values.confirm_new_password}
												fieldTouch={touched.confirm_new_password}
												setServerErrors={setServerErrors}
												apiErrors={apiErrors}
												handleChange={handleChange}
												fieldIcon={passwordIcon}
											/>
											{values.confirm_new_password === '' ? (
												<> </>
											) : (
												<>
													{showConfirmNew ? (
														<span
															className="eye-icon"
															onClick={showConfirmPassword}
														>
															{' '}
															<AiFillEye color="9e9bd0" />{' '}
														</span>
													) : (
														<span
															className="eye-icon"
															onClick={hidConfirmPassword}
														>
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

							{/*<form className={`${style.login_form} `} onSubmit={handleLogin}>*/}
							{/*	<div className="mb-3">*/}
							{/*		<label*/}
							{/*			htmlFor="exampleInputPassword1"*/}
							{/*			className={`${style.password_label} form-label`}*/}
							{/*		>*/}
							{/*			Old Password*/}
							{/*		</label>*/}
							{/*		<div className="position-relative">*/}
							{/*			<img*/}
							{/*				src="/assets/password.svg"*/}
							{/*				className={`${style.input_password_icon}`}*/}
							{/*				alt=""*/}
							{/*			/>*/}
							{/*			<input*/}
							{/*				type={`${!showPassword ? 'password' : 'text'}`}*/}
							{/*				name="old_password"*/}
							{/*				value={userCredentials.old_password}*/}
							{/*				className={`${style.password_input} form-control`}*/}
							{/*				placeholder="**********"*/}
							{/*				id="exampleInputPassword"*/}
							{/*				onChange={(e) => handleCredentials(e)}*/}
							{/*				required*/}
							{/*			/>*/}
							{/*			<i*/}
							{/*				className={`${style.eye} fas  ${*/}
							{/*					!showPassword ? 'fa-eye' : 'fa-eye-slash'*/}
							{/*				}`}*/}
							{/*				onClick={() =>*/}
							{/*					setShowPassword((prevCheck) => !prevCheck)*/}
							{/*				}*/}
							{/*			></i>*/}
							{/*		</div>*/}
							{/*	</div>*/}
							{/*	<div className="mb-3">*/}
							{/*		<label*/}
							{/*			htmlFor="exampleInputPassword1"*/}
							{/*			className={`${style.password_label} form-label`}*/}
							{/*		>*/}
							{/*			New Password*/}
							{/*		</label>*/}
							{/*		<div className="position-relative">*/}
							{/*			<img*/}
							{/*				src="/assets/password.svg"*/}
							{/*				className={`${style.input_password_icon}`}*/}
							{/*				alt=""*/}
							{/*			/>*/}
							{/*			<input*/}
							{/*				type={`${!showNewPassword ? 'password' : 'text'}`}*/}
							{/*				name="new_password"*/}
							{/*				value={userCredentials.new_password}*/}
							{/*				className={`${style.password_input} form-control`}*/}
							{/*				placeholder="**********"*/}
							{/*				id="exampleInputPassword"*/}
							{/*				onChange={(e) => handleCredentials(e)}*/}
							{/*				required*/}
							{/*			/>*/}
							{/*			<i*/}
							{/*				className={`${style.eye} fas  ${*/}
							{/*					!showNewPassword ? 'fa-eye' : 'fa-eye-slash'*/}
							{/*				}`}*/}
							{/*				onClick={() =>*/}
							{/*					setShowNewPassword((prevCheck) => !prevCheck)*/}
							{/*				}*/}
							{/*			></i>*/}
							{/*		</div>*/}
							{/*	</div>*/}
							{/*	<div className="mb-3">*/}
							{/*		<label*/}
							{/*			htmlFor="exampleInputPassword1"*/}
							{/*			className={`${style.password_label} form-label`}*/}
							{/*		>*/}
							{/*			Confirm New Password*/}
							{/*		</label>*/}
							{/*		<div className="position-relative">*/}
							{/*			<img*/}
							{/*				src="/assets/password.svg"*/}
							{/*				className={`${style.input_password_icon}`}*/}
							{/*				alt=""*/}
							{/*			/>*/}
							{/*			<input*/}
							{/*				type={`${!showConfirmPassword ? 'password' : 'text'}`}*/}
							{/*				name="confirm_password"*/}
							{/*				value={userCredentials.confirm_password}*/}
							{/*				className={`${style.password_input} form-control`}*/}
							{/*				placeholder="**********"*/}
							{/*				id="exampleInputPassword1"*/}
							{/*				onChange={(e) => handleCredentials(e)}*/}
							{/*				required*/}
							{/*			/>*/}
							{/*			<i*/}
							{/*				className={`${style.eye} fas  ${*/}
							{/*					!showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'*/}
							{/*				}`}*/}
							{/*				onClick={() =>*/}
							{/*					setShowConfirmPassword((prevCheck) => !prevCheck)*/}
							{/*				}*/}
							{/*			></i>*/}
							{/*		</div>*/}
							{/*	</div>*/}

							{/*	<button*/}
							{/*		type="submit"*/}
							{/*		className={`btn ${style.btn_login} position-relative mt-4`}*/}
							{/*	>*/}
							{/*		Change Password*/}

							{/*	</button>*/}
							{/*</form>*/}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	changePassword: state.changePassword,
});

export default connect(mapStateToProps, {
	ChangePasswordAction,
})(ChangePasswordComponent);
