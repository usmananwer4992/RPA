import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { resetPasswordAction } from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import style from './ResetPasswordSuccessComponent.module.css';
import {Link} from "react-router-dom";


const ResetPasswordSuccessComponent = ({
																	// resetPassword: { apiErrors, isLoading, user },
																	// resetPasswordAction,
																}) => {
	const params = useParams();
	console.log('params====', params);
	// Api Common Errors Method

	// useEffect(() => {
	// 	setServerErrors(apiErrors);
	// }, [apiErrors]);
	/////////////////////////////

	const handleSubmit = (values) => {
		console.log('values', values);
		let formData = new FormData();
		formData.append('password', values.password);
		formData.append('confirm_password', values.confirm_password);
		resetPasswordAction(formData, params);
	};

	return (
		<>
			<section className="pt-5">
				<div className="container-fluid p-0">
					<div className= {`card ${style.cstm_card} p-5`}>
						<div className="card-body p-0">
							<div className={`${style.checkout_failure_img} text-center pt-4`}>
								<img src="/assets/successfull.svg" alt="" className="mb-5"/>
								<h1 className={`${style.checkout_failure_heading} text-center mb-4`}>Successfull</h1>
								<p>Your password has been reset successfully</p>
								<button className={`btn ${style.cont_btn}`}><Link to={"/"}>Continue</Link></button>
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
})(ResetPasswordSuccessComponent);
