import React from 'react'
import Modal from 'react-bootstrap/Modal';
import style from './ComingSoon.module.css';



const ComingSoon = ({showModel, setShowModel}) => {
    const handleClose = () => setShowModel(false);

  return (
    <Modal 
    show={showModel} onHide={handleClose} 
    className={`${style.annotations_modal}`}>
			<Modal.Header closeButton 
            className={`${style.annotations_modal_header}`}
            >
				<Modal.Title 
                className={`${style.annotations_modal_title}`}
                >
					Coming Soon
				</Modal.Title>
			</Modal.Header>
			<Modal.Body
             className={`${style.annotations_modal_body}`}
            >
				<div className="row">
                <div className="col-md-12">
						<div className={`${style.doc_type_wrapper}`}>
							<p>This Feature is</p>
                            <h2>Coming Soon</h2>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
  )
}

export default ComingSoon