import React, { useEffect, useState } from 'react';
import style from './OrderListingComponent.module.css';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import { ListJobAction, JobDetailAction } from '../../redux/actions';
import editImage from '../../assets/images/edit-icon.png';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
	  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
	  borderRadius: 5,
	  backgroundColor: theme.palette.mode === 'light' ? '#F27405' : '#308fe8',
	},
  }));


const OrderistingComponent = ({
	showCreateOrder,
	setShowCreateOrder,
	jobs,
	ListJobAction,
	JobDetailAction,
}) => {
	const now = 50;

	const [pagination, setPagination] = useState(false);
	const statuses = [
		{
			value: 'SEND_FOR_RECORDING',
			label: 'Send For Recording',
		},
		{
			value: 'SENT_FOR_CLOSING',
			label: 'Sent For Closing',
		},
		{
			value: 'EXECUTED',
			label: 'Executed',
		},
		{
			value: 'UN_EXECUTED',
			label: 'Unexecuted',
		},
		{
			value: 'EXECUTED_WITH_ERRORS',
			label: 'Executed With Errors',
		},
		{
			value: 'COMPLETED',
			label: 'Completed',
		},
		{
			value: 'COMPLETED_RECORDED',
			label: 'Completed Recorded',
		},
		{
			value: 'UNIDENTIFIED',
			label: 'Unidentified Detected',
		},
		{
			value: 'COMPLETED_PROCESSING',
			label: 'Processing Completed',
		},
		{
			value: 'NOT_PROCESSED',
			label: 'Not Processed',
		},
		{
			value: 'READY_FOR_STACKING',
			label: 'Ready For Stacking',
		},
		{
			value: 'LENDER_UNKNOWN',
			label: 'Lender Unknown',
		},
		{
			value: 'ORDERING_UNKONWN',
			label: 'Lender Ordering Unknown',
		},
		{
			value: 'LENDER_IDENTIFIED',
			label: 'Lender Identified',
		},
		{
			value: 'NOT_SELECTED_LENDER',
			label: 'Not Selected Lender',
		},
	];

	const handlefilt = (status) => {
		let filter = status.value;
		ListJobAction(1, filter);
	};
	useEffect(() => {
		ListJobAction(1);
	}, []);
	useEffect(() => {

	}, [pagination]);
	useEffect(() => {

		if (jobs) {
			if (
				jobs &&
				jobs.data?.previous === null &&
				jobs &&
				jobs.data?.next === null
			) {
				setPagination(false);
			} else {
				setPagination(true);
			}
		}
	}, [jobs]);

	const handleJobDetail = (id) => {
		JobDetailAction(id);
	};
	const nextPage = () => {
		ListJobAction(jobs.data.current_page + 1);
	};
	const prevPage = () => {
		ListJobAction(jobs.data.current_page - 1);
	};
	// console.log("progress", jobs.data.progress)
	// function toTitleCase(str) {
	// 	return str
	// 	  .toLowerCase() 
	// 	  .split('_') 
	// 	  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
	// 	  .join(' '); 
	//   }

	return (
		<>
			<div className={`${style.order_table_section}`}>
				<div className={`${style.order_table_header}`}>
					<div className="d-flex">
						<h4 className={`${style.order_table_title}`}>Orders</h4>
						<div className="dropdown ms-5">
							<button
								className={`${style.filter_dropdown} navbar_profile_dropdown btn dropdown-toggle`}
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Filter by
							</button>
							<ul
								className={`${style.filter_dropdown_menu} dropdown-menu`}
								aria-labelledby="dropdownMenuButton1"
							>
								{statuses.map((status) => (
									<li>
										<a
											className="dropdown-item"
											key={status.value}
											onClick={(e) => handlefilt(status)}
										>
											{status.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
					{!showCreateOrder && (
						<button
							className={`${style.order_table_btn} btn`}
							onClick={() => setShowCreateOrder(!showCreateOrder)}
						>
							<img src={editImage} alt="" /> Create Order
						</button>
					)}
				</div>
				<div className={`${style.order_table}`}>
					{jobs && jobs.isLoading ? (
						<div className="text-center">
							<ClipLoader color="#F27405" size={50} loading={true} />
						</div>
					) : (
						<table className="table">
							<thead className={`${style.table_header}`}>
								<tr>
									<th className="border-end">Orders</th>
									<th className="border-end">Address</th>
									<th className="border-end">Created Data</th>
									{/* <th className="border-end">Active Stage</th> */}
									<th>Progress</th>
								</tr>
							</thead>

							<tbody className={`${style.table_body}`}>
								{jobs &&
									jobs.data.results.length > 0 &&
									jobs.data.results.map((job) => (
										<tr
											className={`${style.active}`}
											onClick={(e) => handleJobDetail(job.id)}
										>
											<td className="border-end">{job.file_no || 1}</td>
											<td className="border-end">{job.package_address}</td>
											<td className="border-end">
												{moment(job.uploaded_date).format('MMMM Do YYYY,')}
											</td>
											{/* <td className="border-end">{toTitleCase(job.status)}</td> */}
											<td className='pt-3'><BorderLinearProgress variant="determinate" value={job.progress} /></td>
										</tr>
									))}
							</tbody>
						</table>
					)}
					{pagination && (
						<>
							<nav aria-label="Page navigation example">
								<ul className="pagination justify-content-end">
									<>
										<li
											className={`page-item ${
												jobs.data && jobs.data.previous == null && 'disabled'
											}`}
										>
											<a className="page-link" tabIndex="-1" onClick={prevPage}>
												Previous
											</a>
										</li>
									</>

									<>
										<li
											className={`page-item ${
												jobs.data && jobs.data.next == null && 'disabled'
											}`}
										>
											<a className="page-link" onClick={nextPage}>
												Next
											</a>
										</li>
									</>
								</ul>
							</nav>
						</>
					)}
				</div>
			</div>
		</>
	);
};
const mapStateToProps = (state) => ({
	jobs: state.jobs,
});

export default connect(mapStateToProps, {
	ListJobAction,
	JobDetailAction,
})(OrderistingComponent);
