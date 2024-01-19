import style from '../LenderDocumentsUnexecuted/LenderDocumentsUnxecutedComponent.module.css';
import addButtonImage from '../../assets/images/add-btn-icon.svg';
import crossImage from '../../assets/images/cross-btn-icon.svg';
import fileImage from '../../assets/images/file-icon.svg';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { GetDocumentAction } from '../../redux/actions';
const AddDocumentComponent = ({
	file,
	setFile,
	setOpenDocUpload,
	getDocument: { data },
	uploadDoc,
	documents,
	setDocuments,
  GetDocumentAction,
	handleChange,
}) => {
	const [isClearable, setIsClearable] = useState(false);
	const [isSearchable, setIsSearchable] = useState(true);
	useEffect(() => {
	}, [documents]);

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
	return (

		<>
			<div className={`${style.lender_document_upload}`}>
				<div className="row">
					<div className="col-4">
						<div className={`${style.file_name}`}>
							<img src={fileImage} alt="" />
							<span>{file.name}</span>
						</div>
					</div>
					<div className="col-6 pt-2">
						{documents && documents[0] &&
						<Select
							className="basic-single w-100"
							classNamePrefix="select"
							placeholder="Select Document Type"
							defaultValue={documents && documents[0]}
							isClearable={isClearable}
							isSearchable={isSearchable}
							options={documents && documents}
							onChange={(e) => handleChange(e)}
							/>
						}

					</div>
					<div className="col-2">
						<div className={`${style.file_upload_buttons}`}>
							<button
								className="btn"
								onClick={() => {
									uploadDoc && uploadDoc();
								}}
							>
								<img src={addButtonImage} alt="" />
							</button>
							<button
								className="btn"
								onClick={() => {
									setOpenDocUpload(false);
									setFile('');
								}}
							>
								<img src={crossImage} alt="" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
const mapStateToProps = (state) => ({
	getDocument: state.getDocument,
});
export default connect(mapStateToProps,{
	GetDocumentAction,
})(AddDocumentComponent);
