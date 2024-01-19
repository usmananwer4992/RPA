import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Footer from '../../footer';
import style from "./index.module.css";
import logo from "../../../assets/images/transdata.svg";
import rightImage from "../../../assets/images/ai-img.svg"
import emailIcon from "../../../assets/images/email.svg"
import fieldIcon from "../../../assets/images/cameraicon.svg"
import passwordIcon from "../../../assets/images/password.svg"

import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  FormControl,
  Form,
  Button,
  Row,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';

import { loginUserAction, getProfileAction } from '../../../redux/actions';
import { Formik, validateYupSchema } from 'formik';
import { LOGIN_USER_FAILURE_RESET } from '../../../redux/actions/Auth/LoginAction';

import { useDispatch } from 'react-redux';
import { MyTextField } from '../../../Validations/InputField';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('* Email must be a valid email')
    .required('* Please enter your email address in the format: abc@mail.com'),
  password: Yup.string()
    .required('* Please enter your password')
    .max(20, '* Password is too long, Max 20 characters'),
  // .matches(
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
  //     "* One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
});

const SignInComponent = ({
  auth: { apiErrors, isLoading, user },
  loginUserAction,

}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Api Common Errors Method
  const [serverError, setServerErrors] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    setServerErrors(apiErrors);
  }, [apiErrors]);
  console.log('errors', apiErrors);
  const showPassword = () => {
    // setShow(true)
    setShow((prevState) => !prevState);
  };
  const hidPassword = () => {
    // setShow(false);
    setShow((prevState) => !prevState);
  };
  // console.log('show', show);
  const handleSubmit = (values) => {
    console.log('i am clicked', values);
    let formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    const rember_me = values.tandc;
    console.log('remember', rember_me);
    loginUserAction(formData, rember_me);
  };
  const handleForgetPassword = () => {
    history.push({ pathname: '/forgot-password' });
  };

  const handleSignUp = () => {
    dispatch({
      type: LOGIN_USER_FAILURE_RESET,
    });
    setServerErrors({});
    history.push({ pathname: '/signup' });
  };


  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  }
  const handleLogin = (event) => {

    event.preventDefault();
    if (userCredentials.email && userCredentials.password && userCredentials.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      const formData = new FormData();
      formData.append("email", userCredentials.email);
      formData.append("password", userCredentials.password);

    } else if (!userCredentials.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

    }
    else {
      // toast.error('Username or password Invalid')

    }
  }

  return (
    <>




      <section className={`${style.login_section}`}>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col-md-6 p-0">
              <div className={`${style.login_left_section} text-left`}>
                <div className={`${style.logo_image}`}>
                  <Link to={'/'}><img src={logo} alt="" /></Link>
                </div>
                <h2 className={`${style.login_left_heading}`}>Welcome to <span>Title Docs</span></h2>

                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    email: '',
                    password: '',
                    tandc: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate autoomplete="off" className={`${style.login_form} `}>

                      <MyTextField
                        placeholder="Enter your email address"
                        inputType="email"
                        fieldName="email"
                        label="Email"
                        inputClasses={`${style.email_input} form-control`}
                        labelClasses={`${style.email_label} form-label`}
                        groupClasses={``}
                        serverError={serverError}
                        errors={errors.email || false}
                        inputValue={values.email}
                        fieldTouch={touched.email}
                        setServerErrors={setServerErrors}
                        apiErrors={apiErrors}
                        handleChange={handleChange}
                        fieldIcon={emailIcon}
                        required={true}
                      />
                      <div className="position-relative">
                        <MyTextField
                          placeholder="Enter your password"
                          inputType={show ? 'text' : 'password'}
                          fieldName="password"
                          label="Password"
                          inputClasses={`${style.password_input} form-control`}
                          labelClasses={`${style.password_label} form-label`}
                          groupClasses={``}
                          required={true}
                          serverError={serverError}
                          errors={errors.password || false}
                          inputValue={values.password}
                          fieldTouch={touched.password}
                          setServerErrors={setServerErrors}
                          apiErrors={apiErrors}
                          handleChange={handleChange}
                          fieldIcon={passwordIcon}
                        />
                        {values.password === '' ? (
                          <> </>
                        ) : (
                          <>
                            {show ? (
                              <span className="eye-icon" onClick={showPassword}>
                                {' '}
                                <AiFillEye color="9e9bd0" />{' '}
                              </span>
                            ) : (
                              <span className="eye-icon" onClick={hidPassword}>
                                {' '}
                                <AiFillEyeInvisible color="9e9bd0" />{' '}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div className={`${style.forgot_password}`}>
                        <p>
                          <Link to={'/forgot-password'}>Forgot your password?</Link>
                        </p>
                      </div>
                      <Button
                        type="submit"
                        variant="flat"
                        className={`btn ${style.btn_login} position-relative mt-4`}
                        size="xxl"
                        disabled={isLoading ? true : false}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              variant="light"
                            />
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>

                    </Form>
                  )}
                </Formik>



              <Footer/>

              </div>

            </div>
            <div className="col-md-6 p-0">
              <div className={`${style.login_right_section}`}>
                <h2 className={`${style.login_right_heading} text-center`}>Use AI to Automate
                  Title Closing Documents</h2>
                <img src={rightImage} className={`${style.right_section_image}`} alt="" />
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

// export default memo(SignInComponent);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUserAction })(
  withRouter(SignInComponent)
);
