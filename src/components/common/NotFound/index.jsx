import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './notFound.css';
import { isLoggedIn } from 'utils';

const NotFound = (props) => (
	<section className="page_404">
		<div className="container">
			<div className="row">
				<div className="col-sm-12 ">
					<div className="col-sm-12   text-center">
						<div className="four_zero_four_bg">
							<h1 className="text-center ">404</h1>
						</div>

						<div className="contant_box_404">
							<h3 className="h2">Look like you're lost</h3>

							<p>The page you are looking for not avaible!</p>
							{/* {isLoggedIn ? (
								<>
									{JSON.parse(localStorage.getItem('user')).user.userRole ===
										'CUSTOMER' && (
										<Link
											className="link_404 loginButton d-inline-block text-decoration-none"
											to="/app/customer/dashboard"
										>
											Back to home
										</Link>
									)}
									{JSON.parse(localStorage.getItem('user')).user.userRole ===
										'ADVERTISER' && (
										<Link
											className="link_404 loginButton d-inline-block text-decoration-none"
											to="/app/advertiser/dashboard"
										>
											Back to home
										</Link>
									)} */}
							{/* </> */}
							{/* ) : (
								<Link
									className="link_404 loginButton d-inline-block text-decoration-none"
									to="/"
								>
									Back to home
								</Link>
							)} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

NotFound.propTypes = {
	jumbotronProps: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
	}),
};

NotFound.defaultProps = {
	jumbotronProps: {
		title: '404 not found',
	},
	children: <Link to="/">Back to home</Link>,
};

export default memo(NotFound);
