import React from 'react'
import style from './TitleDocumentsUnexecutedComponent.module.css'
import addImage from '../../assets/images/add.svg';
import uploadImage from '../../assets/images/upload-icon.svg';
function TitleDocumentsUnexecutedComponent() {
	return (
		<div className={`${style.title_documents_wrapper} mt-3`}>
			<div className={`${style.title_documents_title} mt-3 mb-2`}>
				<h5>Title Documents</h5>
				<div className={`${style.add_document_wrapper}`}>
					<button className={`${style.btn_add_documents} btn`}> <img src={addImage} alt="" /> Add a Document </button>
					<div className={`${style.title_dropdown} dropdown`}>
						<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							{/* <div>Lender</div> */}
							See More Options
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className={`${style.title_documents}`}>
				<div className={`${style.inner_titledocuments}`}>
					<div className={`${style.file_upload_wrapper}`}>
						<div className={`${style.upload_lender_pkg} position-relative`}>
							<div className={`${style.upload_lender_box}`}>
								<img src={uploadImage} className='me-2' alt="" />
								<span>Upload Title Package</span>
							</div>
							<input type="file" className={`${style.upload_input}`} />
						</div>
					</div>
					{/* <h5>No Documents to show</h5>
                    <img src="/title-no-documents.svg" alt="" /> */}
				</div>
			</div>
		</div>
	)
}

export default TitleDocumentsUnexecutedComponent