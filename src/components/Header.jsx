import { Link, useNavigate } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import * as userDataAction from '../features/userDataSlice';
import { SlLogout } from 'react-icons/Sl';
import { HiUser } from 'react-icons/hi';
import '../style/Header.css';

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	// userDataSlice
	const { data } = useSelector((state) => state.userData);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(userDataAction.cleanData());
		navigate('/');
	};

	return (
		<header>
			<nav className='main-nav'>
				<Link className='main-nav-logo' to='/'>
					<img
						className='main-nav-logo-image'
						src={argentBankLogo}
						alt='Argent Bank Logo'
					/>
					<h1 className='sr-only'>Argent Bank</h1>
				</Link>
				<div>
					{user && data ? (
						<div className='userNav'>
							<div className='userContainer'>
								<div className='userLogoBackground'>
									<HiUser />
								</div>
								<p className='userAuthName'>{data.firstName}</p>
							</div>
							<div className='logoutContainer'>
								<button className='userAuthLogout' onClick={handleLogout}>
									<SlLogout />
									Sign out
								</button>
							</div>
						</div>
					) : (
						<Link className='main-nav-item' to='./login'>
							<i className='fa fa-user-circle'></i>
							Sign In
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
