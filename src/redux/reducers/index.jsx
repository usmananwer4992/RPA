import { combineReducers } from 'redux';
import LoginReducer from './Auth/LoginReducer';
import RegisterReducer from './Auth/RegisterReducer';
import RestPasswordReducer from './Auth/ResetPasswordReducer';
import EnterEmailReducer from './Auth/EmailEnterReducer';
import GetProfileReducer from './GetProfileReducer';
import CheckoutSessionReducer from './Onboarding/CheckoutSessionReducer';
import DriveSignUpReducer from './Onboarding/DriveSignUpReducer';
import CreateUserReducer from './Onboarding/CreateUserReducer';
import ChangePasswordReducer from './ChangePasswordReducer';
import SendProfileReducer from './SendProfileReducer';
import DriveDashboardReducer from './DriveDashboardReducer';
import AddJobReducer from './Dashboard/AppUser/AddJobReducer';
import ListJobReducer from './Dashboard/AppUser/ListJobReducer';
import JobDetailReducer from './Dashboard/AppUser/JobDetailReducer';
import CreateDocumentReducer from './Dashboard/AppUser/CreateDocumentReducer';
import GetDocumentReducer from './Dashboard/AppUser/GetDocumentReducer';
import SendForClosingReducer from './Dashboard/AppUser/SendForClosingReducer';
import UpdateJobDetailReducer from './Dashboard/AppUser/UpdateJobDetailReducer';
import DeleteDocumentReducer from './Dashboard/AppUser/DeleteDocumentReducer';
export default combineReducers({
	auth: LoginReducer,
	authRegister: RegisterReducer,
	resetPassword: RestPasswordReducer,
	sendEmail: EnterEmailReducer,
	profile: GetProfileReducer,
	checkoutSession: CheckoutSessionReducer,
	getUserData: DriveSignUpReducer,
	createUser: CreateUserReducer,
	changePassword: ChangePasswordReducer,
	sendProfile: SendProfileReducer,
	driveDashboard: DriveDashboardReducer,
	addJob: AddJobReducer,
	jobs: ListJobReducer,
	jobDetail: JobDetailReducer,
	createDocument: CreateDocumentReducer,
	getDocument: GetDocumentReducer,
	sendForClosing: SendForClosingReducer,
	updateJob: UpdateJobDetailReducer,
	deleteDocument:DeleteDocumentReducer,
});
