import React, { useEffect, useState} from 'react'
import style from './NavbarComponent.module.css';
import Logo from '../../assets/images/logo.svg';
import searchImage from '../../assets/images/search-icon.svg';
import notificationImage from '../../assets/images/notification.svg';
import avatarImage from '../../assets/images/avatar.svg';
import profileImage from '../../assets/images/profile-icon.svg';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import ComingSoon from 'components/common/ComingSoon';
function NavbarComponent() {
	const [showModel, setShowModel] = useState(false);
	
	const history = useHistory();
	const handleLogout = () => {
		localStorage.clear();
	};

	const getData = JSON.parse(localStorage.getItem('user'));
	const fname = getData.first_name.charAt(0).toUpperCase()
	const lname = getData.last_name.charAt(0).toUpperCase()
	
	return (
		<>
			<section>
		<div className='row m-0'>
			<nav className={`${style.navbar} navbar navbar-expand-lg navbar-light bg-light px-3`}>
				<div className="container-fluid">
					<Link className="navbar-brand" to={'/drive'}><img src={Logo} alt="" /></Link>
					<form className={`${style.navbar_search_form} position-relative`}>
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn" type='button'>
							<img src={searchImage} alt='' width='17px' height='17px' onClick={() => setShowModel(true)}/>
						</button>
					</form>
					<div className='d-flex'>
						<img src={notificationImage} className={`${style.notification_image}  mx-3`} alt="" onClick={() => setShowModel(true)}/>
						<div className="dropdown">
							<button className={`${style.profile_dropdown} navbar_profile_dropdown btn`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
								{/* <img src={avatarImage} alt="" /> */}
								<Avatar sx={{ bgcolor: deepOrange[500]}}>{fname}{lname}</Avatar>
							</button>
							<ul className={`${style.profile_dropdown_menu} dropdown-menu`} aria-labelledby="dropdownMenuButton1">
								<li><Link className="dropdown-item" to={'/drive'}><img src={profileImage} alt="" /> Dashboard</Link></li>
								<li><Link className="dropdown-item" to={'/dashboard/user-profile'}><img src={profileImage} alt="" /> Profile</Link></li>
								<li><Link className="dropdown-item" to={'/dashboard/change-password'}><img src={profileImage} alt="" /> Change Password</Link></li>
								<li><Link className="dropdown-item" onClick={handleLogout} to={'/'}><img src={profileImage} alt="" /> Logout</Link></li>
							</ul>
						</div>
					</div>
					<ComingSoon 
                    showModel={showModel}
                    setShowModel={setShowModel}
                    />
				</div>
			</nav>
		</div>
			</section>
			</>
	);
}

export default NavbarComponent