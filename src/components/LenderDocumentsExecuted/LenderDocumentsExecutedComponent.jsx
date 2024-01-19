import React, { useState } from 'react';
import style from './LenderDocumentsExecutedComponent.module.css';
import calenderImage from '../../assets/images/calender.png';
import addImage from '../../assets/images/add.svg';
import editImage from '../../assets/images/edit.png';
import stampImage from '../../assets/images/stamp.png';
import uploadImage from '../../assets/images/uploadone.svg';
import viewImage from '../../assets/images/viewone.svg';
import cancelImage from '../../assets/images/cancel-white.svg';
import uploadWhiteImage from '../../assets/images/upload-white.svg';
import eraseImage from '../../assets/images/erasar.svg';
const  LenderDocumentsExecutedComponent =() =>{


	return (

		<div className={`${style.lender_documents_wrapper}`}>

			<div className={`${style.lender_documents_title} mt-3 mb-2`}>
				<h5>Lender Documents</h5>
				<div className={`${style.add_document_wrapper}`}>
					<button className={`${style.btn_add_documents} btn`}> <img src={addImage} alt="" /> Add a Document </button>
					<div className={`${style.lender_dropdown} dropdown`}>
						<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							<div>Lender</div>
							Joe Harry
						</button>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div className={`${style.lender_documents}`}>

				{/* Lender No Documents To Show */}

				{/* <div className={`${style.inner_lenderdocuments}`}>
                    <h5>No Documents to show</h5>
                    <img src="/lender-no-documents.svg" alt="" />
                </div> */}

				{/* Lender Documents Table */}

				<div className={`${style.lender_table} table-responsive`}>
					<table className="table">
						<thead>
						<tr>
							<th>Documents</th>
							<th>Errors</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>Dead</td>
							<td><img src={calenderImage} alt="" /> <img src={editImage} alt="" /> <img src={stampImage} alt="" /></td>
							<td><img src={viewImage} alt="" /> <img src={uploadImage} alt="" /> <img src={eraseImage}alt="" /></td>
						</tr>
						<tr>
							<td>Dead</td>
							<td><img src={calenderImage} alt="" /> <img src={editImage} alt="" /> <img src={stampImage} alt="" /></td>
							<td><img src={viewImage} alt="" /> <img src={uploadImage} alt="" /> <img src={eraseImage}alt="" /></td>
						</tr>
						<tr>
							<td>Mortgage</td>
							<td><img src={calenderImage} alt="" /> <img src={editImage} alt="" /> <img src={stampImage} alt="" /></td>
							<td><img src={viewImage} alt="" /> <img src={uploadImage} alt="" /> <img src={eraseImage}alt="" /></td>
						</tr>
						<tr>
							<td>Dead</td>
							<td><img src={calenderImage} alt="" /> <img src={editImage} alt="" /> <img src={stampImage} alt="" /></td>
							<td><img src={viewImage} alt="" /> <img src={uploadImage} alt="" /> <img src={eraseImage}alt="" /></td>
						</tr>
						</tbody>
					</table>
				</div>
				<div className={`${style.bottom_btns}`}>
					<button className={`${style.btn_upload} btn`}><img src={uploadWhiteImage} className='me-2' alt="" />Save & Upload</button>
					<button className={`${style.btn_cancel} btn`}><img src={cancelImage} className='me-2' alt="" /> Cancel</button>
				</div>
			</div>

		</div>

	)
}

export default LenderDocumentsExecutedComponent;