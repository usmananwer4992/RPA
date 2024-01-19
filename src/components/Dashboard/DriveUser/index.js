import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../Navbar/NavbarComponent';
import style from './index.module.css';
import { DriveDashboardAction } from '../../../redux/actions';
import { connect } from 'react-redux';
const DriveUserDashboard = ({
                              driveDashboard: { apiErrors, isLoading ,data},
                              DriveDashboardAction,
                            }) => {
  const [serverError, setServerErrors] = useState({});
  const [result, setResult] = useState({});
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setServerErrors(apiErrors);
  }, [apiErrors]);

  useEffect(() => {
 DriveDashboardAction();
  }, []);
  useEffect(() => {

    if(data && data.lenders === undefined){
      setShowData(false)
    }else{
      setShowData(true)
    }
  }, [data]);

  return (
    <>
      <NavbarComponent/>
      {showData === true &&
        <>
      <section className="dashboard-section p-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className={`card ${style.cstm_card} mt-2`}>
                <div className="card-body pt-5 pb-5 pe-2 ps-2">
                  <h4 className="card-title">Total File Processed</h4>
                  <h1>{data && data.total_processed && data.total_processed}</h1>

                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className={`card ${style.cstm_card} mt-2`}>
                <div className="card-body pt-5 pb-5 pe-2 ps-2">
                  <h4 className="card-title">Incomplete Files</h4>
                  <h1>{data && data.incomplete && data.incomplete}</h1>

                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className={`card ${style.cstm_card} mt-2`}>
                <div className="card-body pt-5 pb-5 pe-2 ps-2">
                  <h4 className="card-title">Completed Files</h4>
                  <h1>{data && data.completed && data.completed}</h1>

                </div>
              </div>
            </div>
            {data?.lenders && data?.lenders?.map((x)=>
              <div className="col-md-3">
                <div className={`card ${style.cstm_card} mt-2`}>
                  <div className="card-body pt-5 pb-5 pe-2 ps-2">
                    <h4 className="card-title">Files By {x.name}</h4>
                    <h3>Completed-{x.completed}</h3>
                    <h3>Incomplete-{x.incomplete}</h3>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
          </>
          }
      {showData === false &&
      <>
        <section className="dashboard-section p-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className={`card ${style.cstm_card} mt-2`}>
                  <div className="card-body pt-5 pb-5 pe-2 ps-2">
                    <h4 className="card-title">Total File Processed</h4>
                    <h1>N/A</h1>

                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className={`card ${style.cstm_card} mt-2`}>
                  <div className="card-body pt-5 pb-5 pe-2 ps-2">
                    <h4 className="card-title">Incomplete Files</h4>
                    <h1>N/A</h1>

                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className={`card ${style.cstm_card} mt-2`}>
                  <div className="card-body pt-5 pb-5 pe-2 ps-2">
                    <h4 className="card-title">Completed Files</h4>
                    <h1>N/A</h1>

                  </div>
                </div>
              </div>
                <div className="col-md-3">
                  <div className={`card ${style.cstm_card} mt-2`}>
                    <div className="card-body pt-5 pb-5 pe-2 ps-2">
                      <h4 className="card-title">Files By Lenders</h4>
                      <h3>Completed-N/A</h3>
                      <h3>Incomplete-N/A</h3>

                    </div>
                  </div>
                </div>

            </div>
          </div>
        </section>
      </>
      }

    </>
  );
};
const mapStateToProps = (state) => ({
  driveDashboard: state.driveDashboard,

});

export default connect(mapStateToProps, {
  DriveDashboardAction,
})(DriveUserDashboard);
