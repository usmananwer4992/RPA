import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CheckoutSessionAction } from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import style from './CheckoutSuccessComponent.module.css';
import { Link } from 'react-router-dom';
import closeImage from '../../../assets/images/close.svg';
import checkoutImage from '../../../assets/images/checkout-failed.svg';
import queryString from 'query-string';
import checkoutGif from '../../../assets/images/checkout.gif';

const CheckoutSuccessComponent = ({
	checkoutSession: { apiErrors, isLoading, data },
	CheckoutSessionAction,
}) => {
	const [message, setMessage] = useState(false);
	const params = useParams();
	useEffect(() => {
		(async () => {
			await getUrlParams();
		})();
	}, []);

	useEffect(() => {
		console.log(data);
		if(data !== undefined){
			if(data === null){
				setMessage(true)
			}
		}
	}, [data]);
	const getUrlParams = () => {
		const params = queryString.parse(window.location.search);

		console.log({ params });
		let payload = {
			check_out_id: params.c_id,
			service: params.service,
		};

		if (payload) {
			setTimeout(() => {
				CheckoutSessionAction(payload);
			}, 1000);
		}
	};

	return (
		<>
			{isLoading == true &&
			<>
				<div className="text-center pt-5">
					<img src={checkoutGif} alt="Checkout" className="pt-5"/>
				</div>
			</>
			}
			{isLoading === false && message === true && (
				<section className="pt-5">
					<div className="container-fluid p-0">
						<div className={`card ${style.cstm_card} p-5`}>
							<div className="card-body p-0">
								<span className={` ${style.close} float-lg-end`}>
									<Link to={'/'}>
										<img src={closeImage} />{' '}
									</Link>
								</span>
								<div
									className={`${style.checkout_failure_img} text-center pt-4`}
								>
									<img src={checkoutImage} alt="" className="mb-5" />
									<h1
										className={`${style.checkout_failure_heading} text-center mb-4`}
									>
										Checkout Failed
									</h1>
									<p>
										Unfortunately an error has occurred and your payment cannot
										be processed at this time, Please verify your payment
										details or try again later. Incase of any assistance please
										call tel:
										<a href="tel:+1(214)550-7878">+1(214)550-7878</a> or reach
										out to{' '}
										<a href="mailto:support.titledocs.ai">
											support.titledocs.ai
										</a>
									</p>
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
	checkoutSession: state.checkoutSession,
});

export default connect(mapStateToProps, {
	CheckoutSessionAction,
})(CheckoutSuccessComponent);
