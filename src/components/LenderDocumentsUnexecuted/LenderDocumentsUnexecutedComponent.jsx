import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './LenderDocumentsUnxecutedComponent.module.css';
import addImage from '../../assets/images/add.svg';
import tickImage from '../../assets/images/tick.svg';
import viewImage from '../../assets/images/view.svg';
import printerImage from '../../assets/images/printer.svg';
import trashImage from '../../assets/images/trash.svg';
import errorImage from '../../assets/images/error.svg';
import uploadImage from '../../assets/images/upload.svg';
import cancelImage from '../../assets/images/cancel.svg';
import addButtonImage from '../../assets/images/add-btn-icon.svg';
import crossImage from '../../assets/images/cross-btn-icon.svg';
import fileImage from '../../assets/images/file-icon.svg';
import DocumentPreviewComponent from '../DocumentPreviewComponent/DocumentPreviewComponent';
import AddDocumentComponent from '../AddDocumentComponent/AddDocumentComponent';
import {
	JobDetailAction,
	DeleteDocumentAction,
	UPDATE_JOB_DETAIL,
	UPDATE_JOB_DETAIL_SUCCESS,
} from '../../redux/actions';
import { ClipLoader } from 'react-spinners';
import { updateJobDetail } from '../../Services/createJobDetail';
import { getFileURL } from '../../utils';
import { useDispatch } from 'react-redux';

const LenderDocumentsUnexecutedComponent = ({
	jobDetail: { isLoading, data, apiError },
	deleteDocument:{isDeleted},
	JobDetailAction,
	DeleteDocumentAction,

}) => {
	const dispatch = useDispatch();
	const [selectedDocType, setSelectedDocType] = useState(1);

	const [show, setShow] = useState(false);
	const [row, setRow] = useState([]);
	const [images, setImages] = useState([]);
	const [documents, setDocuments] = useState([]);

	const [file, setFile] = useState('');
	const [openDocUpload, setOpenDocUpload] = useState(false);
	const handleDocUpload = (e) => {
		setFile(e.target.files[0]);
		setOpenDocUpload(true);
	};

	useEffect(() => {
		setFile('');
		setOpenDocUpload(false);
	}, [isLoading]);
	useEffect(() => {
		if(isDeleted === true){
			const jobId = data.jobId && data.jobId;
			JobDetailAction(jobId);
		}
	}, [isDeleted]);

	async function uploadDoc() {
		try {
			dispatch({ type: UPDATE_JOB_DETAIL });
			let getResults;
			const lenderURL = getFileURL(file);
			const jobId = data.jobId && data.jobId;
			console.log({ lenderURL, jobId, selectedDocType });
			getResults = await updateJobDetail(lenderURL, jobId, 1, selectedDocType);

			if (getResults === 'ok') {
				JobDetailAction(jobId);
				dispatch({ type: UPDATE_JOB_DETAIL_SUCCESS });
				setFile('');
				setOpenDocUpload(false);
			}
		} catch (error) {}
	}
	const handleChange = (e) => {
		setSelectedDocType(e.id);
	};
	const deleteDocument = (id) => {
		console.log(id);
		DeleteDocumentAction(id);
	};

	useEffect(() => {}, [file]);
	return (
		<div className={`${style.lender_documents_wrapper}`}>
			<div className={`${style.lender_documents_title} mt-3 mb-2`}>
				<h5>Lender Documents</h5>
				<div className={`${style.add_document_wrapper}`}>
					{data !== null && data.lender_documents && (
						<button
							onChange={(e) => handleDocUpload(e)}
							className={`${style.btn_add_documents} btn`}
						>
							<img src={addImage} alt="" /> Add a Document
							<input
								id="fileUpload2"
								className={`${style.upload_input}`}
								accept=".pdf"
								multiple
								type="file"
								onClick={(event) => (event.target.value = null)}
							/>
						</button>
					)}
					<div className={`${style.lender_sec}`}>
						<h4 className={`${style.lender_name} `}>Lender:</h4>
						{data && data.lender_name && (
    <h4 className={`${style.lender_user} `}>{data.lender_name}</h4>
  )}
					</div>
				</div>
			</div>

			{openDocUpload && (
				<AddDocumentComponent
					file={file}
					setFile={setFile}
					setOpenDocUpload={setOpenDocUpload}
					uploadDoc={uploadDoc}
					documents={documents}
					setDocuments={setDocuments}
					handleChange={handleChange}
				/>
			)}
			<div className={`${style.lender_documents}`}>
				{/* Lender No Documents To Show */}

				{/* <div className={`${style.inner_lenderdocuments}`}>
                    <h5>No Documents to show</h5>
                    <img src="/lender-no-documents.svg" alt="" />
                </div> */}

				{/* Lender Documents Table */}

				<div className={`${style.lender_table} table-responsive`}>
					{isLoading && isLoading == true ? (
						<div className="text-center">
							<ClipLoader color="#F27405" size={50} loading={true} />
						</div>
					) : (
						<table className="table">
							<thead>
								<tr>
									<th>Documents</th>
									<th>Pages</th>
									<th>AI Confidence</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data !== null && data.lender_documents.length ? (
									data.lender_documents.map((doc, index) => (
										<tr key={index}>
											<td>{doc.name}</td>
											<td>{doc.job_document_details.length}</td>
											<td>{doc.avg_score} </td>
											<td
												onClick={() => {
													setImages(
														doc.job_document_details.map(
															(detail) => detail.job_detail.image_full_path
														)
													);
													setRow(doc);
												}}
											>
												<img
													src={viewImage}
													onClick={() => setShow(true)}
													className={`${style.pointer} mx-2`}
													alt=""
												/>
												{/*<img*/}
												{/*	src={printerImage}*/}
												{/*	className={`${style.pointer} mx-2`}*/}
												{/*	alt=""*/}
												{/*/>*/}
												<img
													src={trashImage}
													onClick={(e) => deleteDocument(doc.id)}
													className={`${style.pointer} mx-2`}
													alt=""
												/>
											</td>
										</tr>
									))
								) : (
									<p style={{ position: 'absolute', left: '40%' }}>
										Not Available
									</p>
								)}
							</tbody>
						</table>
					)}
				</div>
				{/*<nav aria-label="Page navigation example">*/}
				{/*	<ul className="pagination justify-content-end">*/}
				{/*		<li className="page-item ">*/}
				{/*			<a className="page-link" href="#" tabIndex="-1">*/}
				{/*				Previous*/}
				{/*			</a>*/}
				{/*		</li>*/}
				{/*		<li className="page-item">*/}
				{/*			<a className="page-link" href="#">*/}
				{/*				Next*/}
				{/*			</a>*/}
				{/*		</li>*/}
				{/*	</ul>*/}
				{/*</nav>*/}

				<DocumentPreviewComponent
					show={show}
					setShow={setShow}
					images={images}
					row={row}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	jobDetail: state.jobDetail,
	deleteDocument: state.deleteDocument,
});

export default connect(mapStateToProps, {
	JobDetailAction,
	DeleteDocumentAction,
})(LenderDocumentsUnexecutedComponent);
