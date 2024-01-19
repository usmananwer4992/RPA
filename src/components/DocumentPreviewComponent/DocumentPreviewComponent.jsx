import React, { useEffect, useState } from 'react';
import style from './DocumentPreviewComponent.module.css';
import './imageAnno.css';
import addOrangeImage from '../../assets/images/add-orange.svg';
import greenTckImage from '../../assets/images/green-tick.svg';
import placeholderDocumentImage from '../../assets/images/placeholder-document.svg';
import Modal from 'react-bootstrap/Modal';
import ImageAnnotater from '../../utils/mini-tate';
import Select from 'react-select';
import axios from 'axios';
import { API_KEY, API_HOST } from '../../config';
import { GetDocumentAction } from '../../redux/actions';
import { getToken } from '../../utils';
import { connect } from 'react-redux';
import leftIcon from '../../assets/images/left.png';
import rightIcon from '../../assets/images/right.png';
import { random } from 'lodash';
const DocumentPreviewComponent = ({
	show,
	setShow,
	row,
	images,
	getDocument: { isLoading, data, apiError },
	GetDocumentAction,
}) => {
	// const [show, setShow] = useState(false);
	const [index, setIndex] = useState(0);
	const [documents, setDocuments] = useState([]);
	const [documentName, setDocumentName] = useState('');
	const [documentInfo, setDocumentInfo] = useState('');
	const [isClearable, setIsClearable] = useState(false);
	const [isSearchable, setIsSearchable] = useState(true);
	const [dates, setDates] = useState([]);
	const [names, setNames] = useState([]);
	const [signatures, setSignatures] = useState([]);
	const [fetched, setFetched] = useState(false);
	const [defaultAnnotation, setDefaultAnnotation] = useState([
		{
			x: 0.513,
			y: 0.844,
			w: 0.115,
			h: 0.001,
			name: 'Date:',
			type: 'date',
			id: 12,
		},
	]);
	const startingAnnos = [
		{
			name: 'header',
			type: 'label',
			x: 0.03,
			y: 0.05,
			w: 0.95,
			h: 0.06,
		},
	];

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		GetDocumentAction();
	}, []);

	useEffect(() => {
		console.log(names, dates, signatures);
	}, [documentInfo, dates, names, signatures]);
	useEffect(() => {
		let document = documents.filter((item) => item.label === documentName);
		setDocumentInfo(document);
	}, [documents, documentName]);
	useEffect(() => {
		if (data) {
			let documents = data.map((x) => {
				return {
					id: x['id'],
					label: x['document_name'],
					value: x['document_name'],
				};
			});

			setDocuments(documents);
		}
	}, [data]);
	useEffect(() => {
		if (
			row &&
			row?.job_document_details &&
			row?.job_document_details[index]?.job_detail?.document_label !== '{}'
			// row?.job_document_details[index]?.job_detail?.document_label === '{}'
		) {
			setDocumentName(row.name);
			let result = JSON.parse(
				row?.job_document_details[index]?.job_detail?.document_label
			);

			setDates(result.filter((item) => item.type === 'date'));
			setNames(result.filter((item) => item.type === 'name'));
			setSignatures(result.filter((item) => item.type === 'signature'));

			setDefaultAnnotation(result);
			console.log("abcalfsdkfdsaflakfds", result)

		} else {
			setDefaultAnnotation([]);
		}
	}, [index, images, row]);
	const annotationTypes = ['signature', 'date', 'name'];
	const handleChange = async (newAnnos) => {
		const localToken = await getToken();
		if (localToken !== null) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localToken,
				},
			};
			const { data } = await axios.patch(
				API_HOST +
					`/jobdetail/${row?.job_document_details[index].job_detail.id}/`,
				{ document_label: JSON.stringify(newAnnos) },
				config
			);
			if (data) {
				// console.log(data.data.document_label);
				setDefaultAnnotation(JSON.parse(data.data.document_label));
			}
		}
	};
	const redirectToDiv = (id) => {
		// const element = document.querySelector(`[data-id="${dataId}"]`);
		const targetDiv = document.getElementById(id);

		if (targetDiv) {
			targetDiv.scrollIntoView({ behavior: 'smooth' });
			targetDiv.focus();
		}
	};

	const onError = (error) => {};

	return (
		<Modal show={show} onHide={handleClose} className="annotations_modal">
			<Modal.Header closeButton className={`${style.annotations_modal_header}`}>
				<Modal.Title className={`${style.annotations_modal_title}`}>
					Annotations
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-md-9">
						<div className={`${style.doc_type_wrapper}`}>
							<p>Doc Type</p>
							<div className="d-flex">
								{documentInfo && documentInfo && (
									<Select
										className="basic-single w-100"
										classNamePrefix="select"
										placeholder="Select Document Type"
										defaultValue={documents.filter(
											(item) => item.label === row.name
										)}
										isClearable={isClearable}
										isSearchable={isSearchable}
										options={documents && documents}
										onChange={(e) => handleChange(e)}
									/>
								)}
								{/*<select*/}
								{/*	className="form-select"*/}
								{/*	aria-label="Default select example"*/}
								{/*>*/}
								{/*	<option defaultValue>Please Select</option>*/}
								{/*	<option value="1">One</option>*/}
								{/*	<option value="2">Two</option>*/}
								{/*	<option value="3">Three</option>*/}
								{/*</select>*/}
								<img src={greenTckImage} className="ms-3" alt="" />
							</div>
							{/*<img*/}
							{/*	src={placeholderDocumentImage}*/}
							{/*	className="mt-3 mb-5"*/}
							{/*	width="100%"*/}
							{/*	alt=""*/}
							{/*/>*/}
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<button
									disabled={index === 0}
									onClick={() => setIndex(index - 1)}
								>
									<img src={leftIcon} alt="right_icon" />
								</button>
								<div
									style={{
										cursor: 'crosshair',
										maxWidth: '100%',
										
										height: 'auto',
									}}
								>
									<ImageAnnotater
										imageSrc={`${images[index]}`}
										annos={defaultAnnotation}
										annotationTypes={annotationTypes}
										onChange={handleChange}
										onError={onError}
										
										options={{
											annoStyles: { borderColor: 'red' },
											labels: { nameLabel: 'index' },
										}}
										rainbowMode
									/>
								</div>
								<button
									disabled={index === images.length - 1}
									onClick={() => setIndex(index + 1)}
								>
									<img src={rightIcon} alt="right_icon" />
								</button>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className={`${style.sidebar_dropdown_wrapper}`}>
							{/*<div className="dropdown annotations_dropdown">*/}
							{/*	<button*/}
							{/*		className="btn btn-secondary dropdown-toggle"*/}
							{/*		type="button"*/}
							{/*		id="dropdownMenuButton1"*/}
							{/*		data-bs-toggle="dropdown"*/}
							{/*		aria-expanded="false"*/}
							{/*	>*/}
							{/*		Signatures*/}
							{/*	</button>*/}
							{/*	<ul*/}
							{/*		className="dropdown-menu"*/}
							{/*		aria-labelledby="dropdownMenuButton1"*/}
							{/*	>*/}
							{/*		<li onClick={()=>redirectToDiv(1)}>*/}
							{/*			<a className="dropdown-item" href="#" >*/}
							{/*				Action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Another action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Something else here*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Add <img className="ms-5" src={addOrangeImage} alt="" />*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*	</ul>*/}
							{/*</div>*/}
							{/*<div className="dropdown annotations_dropdown">*/}
							{/*	<button*/}
							{/*		className="btn btn-secondary dropdown-toggle"*/}
							{/*		type="button"*/}
							{/*		id="dropdownMenuButton1"*/}
							{/*		data-bs-toggle="dropdown"*/}
							{/*		aria-expanded="false"*/}
							{/*	>*/}
							{/*		Stamps*/}
							{/*	</button>*/}
							{/*	<ul*/}
							{/*		className="dropdown-menu"*/}
							{/*		aria-labelledby="dropdownMenuButton1"*/}
							{/*	>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Another action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Something else here*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Add <img className="ms-5" src={addOrangeImage} alt="" />*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*	</ul>*/}
							{/*</div>*/}
							{/*<div className="dropdown annotations_dropdown">*/}
							{/*	<button*/}
							{/*		className="btn btn-secondary dropdown-toggle"*/}
							{/*		type="button"*/}
							{/*		id="dropdownMenuButton1"*/}
							{/*		data-bs-toggle="dropdown"*/}
							{/*		aria-expanded="false"*/}
							{/*	>*/}
							{/*		Dates*/}
							{/*	</button>*/}
							{/*	<ul*/}
							{/*		className="dropdown-menu"*/}
							{/*		aria-labelledby="dropdownMenuButton1"*/}
							{/*	>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Another action*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Something else here*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*		<li>*/}
							{/*			<a className="dropdown-item" href="#">*/}
							{/*				Add <img className="ms-5" src={addOrangeImage} alt="" />*/}
							{/*			</a>*/}
							{/*		</li>*/}
							{/*	</ul>*/}
							{/*</div>*/}
							<div className="accordion" id="accordionExample">
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="false"
											aria-controls="collapseOne"
										>
											Signatures
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body">
											<ul>
												<li onClick={() => redirectToDiv('anno-img')}>
													Action
												</li>
												<li>Another action</li>
												<li>Something else here</li>
												<li>
													Add{' '}
													<img className="ms-5" src={addOrangeImage} alt="" />
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingTwo">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo"
										>
											Stamps
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body">
											<ul>
												<li>Action</li>
												<li>Another action</li>
												<li>Something else here</li>
												<li>
													Add{' '}
													<img className="ms-5" src={addOrangeImage} alt="" />
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingThree">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseThree"
											aria-expanded="false"
											aria-controls="collapseThree"
										>
											Dates
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body">
											<ul>
												<li>Action</li>
												<li>Another action</li>
												<li>Something else here</li>
												<li>
													Add{' '}
													<img className="ms-5" src={addOrangeImage} alt="" />
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
const mapStateToProps = (state) => ({
	getDocument: state.getDocument,
});
export default connect(mapStateToProps, {
	GetDocumentAction,
})(DocumentPreviewComponent);
