import React, { useState, useEffect } from 'react';
import LenderDocumentsUnexecutedComponent from '../../LenderDocumentsUnexecuted/LenderDocumentsUnexecutedComponent';
import TitleDocumentsUnexecutedComponent from '../../TitleDocumentsUnexecuted/TitleDocumentsUnexecutedComponent';
import TitleDocumentsExecutedComponent from '../../TitleDocumentsExecuted/TitleDocumentsExecutedComponent';
import LenderDocumentsExecutedComponent from '../../LenderDocumentsExecuted/LenderDocumentsExecutedComponent';
import OrderistingComponent from '../../OrderListing/OrderListingComponent';
import CreateOrderComponent from '../../CreateOrderComponent/CreateOrderComponent';
import SendForClosingComponent from '../../SendForClosing/SendForClosingComponent';
import NavbarComponent from '../../Navbar/NavbarComponent';
import style from './index.module.css';
import saveImage from '../../../assets/images/save.svg';
import sendimage from '../../../assets/images/send.svg';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import ComingSoon from 'components/common/ComingSoon';

const AppUserDashboard = ({
  addJob: { isLoading },
  updateJob,
  jobDetail: {  data },

}) => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [showSendforClosing, setShowSendforClosing] = useState(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    console.log(data);
    if(data && data.lender_documents){
      setShowSendforClosing(true);
    }else{
      setShowSendforClosing(false);

    }
  }, [data]);
  return (
    <>
      {(isLoading ) && <div className={`${style.pageBluredContent}`}>
        <h4 style={{ color: "grey" }}>Document is Uploading {' '}
          <PulseLoader color="#f17407" size="10px" cssOverride={{ display: 'inline' }} /></h4></div>}
      <div className={`${(isLoading) && style.blured}`}>

        <div className={`${style.dashboard_section}`}>
          <NavbarComponent />
          <div className={`${style.dashboard_wrapper}`}>
            <div className='row'>
              <div className='col-md-6'>
                <div className={`${style.dashboard_left_panel_wrapper}`}>
                  <div className={`${style.create_order_section}`}>
                    {showCreateOrder &&
                      <CreateOrderComponent showCreateOrder={showCreateOrder} setShowCreateOrder={setShowCreateOrder} />}
                    <OrderistingComponent showCreateOrder={showCreateOrder} setShowCreateOrder={setShowCreateOrder} />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <ul className={`${style.document_tabs} nav nav-tabs`} id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className={`${style.btn_unexecuted} btn_unexecuted btn nav-link active`} id="home-tab"
                      data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home"
                      aria-selected="true">Unexecuted
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className={`${style.btn_executed} btn_executed btn nav-link`} id="profile-tab"
                      data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                      aria-selected="false" onClick={() => setShowModel(true)}>Executed
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <LenderDocumentsUnexecutedComponent />
                    <TitleDocumentsUnexecutedComponent />
                    {showSendforClosing &&
                      <>
                        <div className={`${style.bottom_btns}`}>
                          <button className={`${style.btn_save} btn`}><img src={saveImage} alt="" /> Save & Exit</button>
                          <button className={`${style.btn_send} btn`} onClick={() => setShow(true)}><img src={sendimage} alt="" /> Send for Closing</button>
                        </div>
                      </>
                    }

                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <ComingSoon 
                    showModel={showModel}
                    setShowModel={setShowModel}
                    />
                    <LenderDocumentsExecutedComponent />
                    <TitleDocumentsExecutedComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SendForClosingComponent show={show} setShow={setShow} />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  addJob: state.addJob,
  jobs: state.jobs,
  // updateJob: state.updateJob,
  jobDetail:state.jobDetail,

});

export default connect(mapStateToProps)(AppUserDashboard);