import React, { useEffect, useState } from 'react';
import style from './SendForClosingComponent.module.css';
import Modal from 'react-bootstrap/Modal';
import { Draggable } from "react-drag-reorder";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import circleImage from '../../assets/images/cross-circle.svg';
import addOrangeImage from '../../assets/images/add-orange.svg';
import printerImage from '../../assets/images/printer-orange.svg';
import sendDocImage from '../../assets/images/document-send.svg';
import printerWhiteImage from '../../assets/images/print-white.png';
import sendImage from '../../assets/images/send.svg';
import {SnackBar} from '../common';
import { JobDetailAction, SendForClosingAction } from '../../redux/actions';
import { connect } from 'react-redux';
import Chip from '@mui/material/Chip';

const SendForClosingComponent =({
	show,
	setShow,
	jobDetail: { isLoading, data, apiError },
	JobDetailAction,
	SendForClosingAction,

})=> {
	const [showEmailSection, setShowEmailSection] = useState(false);

	// const [show, setShow] = useState(true);
	const [emailList, setEmailList] = useState([]);
	const [emails, setEmails] = useState([]);
	const [focused, setFocused] = useState(false);

	const [items, setItems] = useState([
		{ id: '1', content: 'Item 1' },
		{ id: '2', content: 'Item 2' },
		{ id: '3', content: 'Item 3' },
		{ id: '4', content: 'Item 4' },
	]);
	const [selectedDocuments, setSelectedDocuments] = useState({
		to: [],
		data: [{
			document_id: 0,
			name: '',
			image_urls: [],
		}]
	})
	const handleEmail = (e, type) => {
		let currentSelection = { ...selectedDocuments }

		if (type === 'to') {
			currentSelection.to = e.target.value;
		}
		setSelectedDocuments(currentSelection)
	}
	const handleReorder = (currentPos, newPos) => {
	};
	const handleSelectAll =()=>{
		data.lender_documents.forEach((doc, i)=>{
			handleClick(doc, i)
		})
	}
	const handleClick = (doc, index) => {

		let currentSelection = { ...selectedDocuments }
		if (data.lender_documents.length > 1 && currentSelection.data.length !== data.lender_documents.length) {
			for (let i = 0; i < data.lender_documents.length - 1; i++) {
				currentSelection.data.push({ document_id: 0, name: '', image_urls: [] })
			}
		}

		currentSelection.data[index].document_id = doc.id
		currentSelection.data[index].name = doc.name
		currentSelection.data[index].image_urls.push(doc.job_document_details.map((x) => {
			return x.job_detail.image_file
		}))
		currentSelection.data[index].image_urls = currentSelection.data[index].image_urls.flat()
		setSelectedDocuments(currentSelection)
	};
	const showEmails = () => {

		// if(selectedDocuments.to == ''){
		// 	SnackBar('error', 'Email Fields is Required');
		// }else if (!selectedDocuments.to.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
		// 	SnackBar('error', 'Please enter a valid email address');
		//
		// }else{
			if(selectedDocuments.data.length > 0) {

				let filterSelection= selectedDocuments.data.filter((x)=> x.document_id !== 0)
				emailList.push({to:[emails],
					count:filterSelection.length,
					data:filterSelection})
				setEmailList([...emailList]);


			}
			setSelectedDocuments({
				to: [],
				data: [{
					document_id: 0,
					name: '',
					image_urls: [],
				}]
			})
			setShowEmailSection(true);
		// }

	}

	const handleDelete = (doc, index) => {
		let currentSelection = { ...selectedDocuments }
		if (currentSelection.data[index]) {
			currentSelection.data[index].document_id = 0
			currentSelection.data[index].name = ''
			currentSelection.data[index].image_urls = []
		}
		setSelectedDocuments(currentSelection)
	};
	const handleUnSelectAll =()=>{
		data.lender_documents.forEach((doc, i)=>{
			handleDelete(doc, i)
		})
	}
	const sendEmail =()=>{
		let payload = {details:emailList};
		console.log(payload);
		SendForClosingAction(payload,data.id);
		setSelectedDocuments({
			to: [],
			data: [{
				document_id: 0,
				name: '',
				image_urls: [],
			}]
		});
		setShow(false);
	}
	useEffect(() => {
	}, [data]);
	useEffect(() => {
	}, [emails]);
	useEffect(() => {
	}, [selectedDocuments])
	useEffect(() => {
		// props.handleSendClosing(emails)
		console.log(emailList);
	}, [emailList])
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	return (
		<Modal show={show} onHide={handleClose} className='send_for_closing_modal'>
			<Modal.Header closeButton className={`${style.send_for_closing_modal_header}`}>
				<Modal.Title className={`${style.send_for_closing_modal_title}`}>Send For Closing</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row m-0'>
					<div className='col-md-6'>
						<div className={`${style.reorder_package_wrapper}`}>
							<h5 className={`${style.reorder_package_title}`}>Reorder Package</h5>
							<div className='row'>
								<div className='col-8'>
									<p className={`${style.title}`}>Documents</p>
								</div>
								<div className='col-4'>
									<p className={`${style.title}`}>Actions</p>
								</div>
								<Draggable onPosChange={() => handleReorder()}>
									{data && data?.lender_documents && data.lender_documents.length > 0 && data.lender_documents.map((doc, idx) => {
										return (
											<div className='d-flex' key={idx}>
												<div  className="col-8">
													<p className={`${style.document_name} mb-0`}><img src={sendDocImage} alt="" /> {doc.name}</p>
												</div>
												<div className='col-4 px-3'>

													<img src={printerImage} alt="" width={12} onClick={()=> window.open(doc.job_document_details[0].job_detail.image_full_path,'_blank')} />
												</div>
											</div>
										);
									})}
								</Draggable>
							</div>
						</div>
						<p className={`${style.bottom_title}`}>You can rearrange the document by drag & drop</p>
						<button className={`${style.btn_print} btn`}><img src={printerWhiteImage} alt="" /> Print Package</button>
					</div>
					<div className='col-md-6'>
						<div className={`${style.email_recipient_wrapper}`}>
							<h5 className={`${style.email_recipient_title}`}>Email Recipients</h5>
							<div className='row'>
								<div className='col-md-9'>
									<ReactMultiEmail
										placeholder='Enter Email'
										emails={emails}
										onChange={(_emails) => {
											setEmails(_emails);
										}}
										autoFocus={true}
										onFocus={() => setFocused(true)}
										onBlur={() => setFocused(false)}
										getLabel={(email, index, removeEmail) => {
											return (
												<div data-tag key={index}>
													<div data-tag-item>{email}</div>
													<span data-tag-handle onClick={() => removeEmail(index)}>
                                                        ×
                                                    </span>
												</div>
											);
										}}
									/>
									{/*<input*/}
									{/*	required*/}
									{/*	id="to"*/}
									{/*	name="to"*/}
									{/*	placeholder="Enter Email"*/}
									{/*	className={`${style.email_input} form-control`}*/}
									{/*	style={{width: '100%'}}*/}
									{/*	value={selectedDocuments.to}*/}
									{/*	onChange={(e) => handleEmail(e, "to")}*/}
									{/*/>*/}
								</div>
								<div className='col-md-3'>
									<button className={`${style.btn_email_add} btn`} onClick={showEmails}> <img src={addOrangeImage} alt="" /> Add</button>
								</div>
							</div>
							<div className='col-md-12'>
								{showEmailSection &&
								<div className={`${style.email_list}`}>
									{/* WHen table is empty show the image below */}

									{/* <img src="/lender-no-documents.svg" alt="" /> */}

									<div className='row'>
										<div className='col-7 mb-2'>
											<h5 className={`${style.email_title}`}>Email</h5>
										</div>
										<div className='col-5 mb-2'>
											<h5 className={`${style.document_title}`}>Documents</h5>
										</div>
									</div>
										{ emailList && emailList.map((result, index) => (
											<>
												{/*	<div className="row" key={index}>*/}
												{/*<div className='col-7'>*/}
												{/*		<p className={`${style.email}`}>{result.to[0]}</p>*/}
												{/*</div>*/}
												{/*<div className='col-5'>*/}
												{/*<p className={`${style.document}`}>{result.count}</p>*/}
												{/*</div>*/}
												{/*	</div>*/}

												<div className="row" key={index}>
											<div className='col-7'>
												{result.to && result.to.map((item, idx) => (
													<p className={`${style.email}`} key={idx}>{item}</p>
												))}

											</div>
											<div className='col-5'>
											<p className={`${style.document}`}>{result.count}</p>
											</div>
												</div>

											</>

										))
										}


								</div>
								}
							</div>
							<div className='col-md-12'>
								<div className={`${style.document_list}`}>
									<div className={`${style.document_title}`}>
										<h5>Documents</h5>
										<button className={`${style.pkg_btn} btn float-end`} onClick={() => handleSelectAll()}>Select Package</button>
									</div>
									<div className={`${style.document_buttons}`}>
										<button className={`btn`} onClick={() => handleSelectAll()}>Select all</button>
										<button className={`btn`} onClick={() => handleUnSelectAll()}>Unselect all</button>
									</div>
									<div className={`${style.document_tags}`}>
										{data && data?.lender_documents && data.lender_documents.length > 0 && data.lender_documents.map((doc, index) => (

											<Chip
												sx={{ m: '0 5px 5px 0' }}
												key={index}
												className={selectedDocuments?.data[index] && selectedDocuments?.data[index]?.document_id === doc.id ? `${style.border}`: `${style.not_border}`}
												variant='filled'
												label={doc.name}
												onClick={() => handleClick(doc, index)}
												onDelete={() => handleDelete(doc, index)}
											/>))}



										{/*<p >Mortgage <img src={circleImage} alt="" /></p>*/}
										{/*<p >Dead <img src={circleImage} alt="" /></p>*/}
										{/*<p className={`${style.active}`}>Abc <img src={circleImage} alt="" /></p>*/}
										{/*<p >Dead <img src={circleImage} alt="" /></p>*/}
										{/*<p >Mortgage <img src={circleImage}alt="" /></p>*/}
										{/*<p className={`${style.active}`}>Dead <img src={circleImage} alt="" /></p>*/}
										{/*<p >Abc <img src={circleImage} alt="" /></p>*/}
										{/*<p >Dead <img src={circleImage} alt="" /></p>*/}
										{/*<p className={`${style.active}`}>Mortgage <img src={circleImage} alt="" /></p>*/}
										{/*<p >Dead <img src={circleImage} alt="" /></p>*/}
										{/*<p >Abc <img src={circleImage} alt="" /></p>*/}
									</div>
								</div>
							</div>
							<button className={`${style.send_email_btn} btn`} onClick={sendEmail}> <img src={sendImage} alt="" /> Send emails</button>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

const mapStateToProps = (state) => ({
	sendForClosing: state.sendForClosing,
	jobDetail: state.jobDetail,
});
export default connect(mapStateToProps, {
	JobDetailAction,
	SendForClosingAction
})(SendForClosingComponent);