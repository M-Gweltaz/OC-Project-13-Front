import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as loginFormActions from '../features/loginFormSlice';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import '../style/login.css';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// authSlice state
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	// loginForm State
	const { email, password, stayLogIn, errorMessage } = useSelector(
		(state) => state.loginForm
	);

	useEffect(() => {
		if (isError) {
			// show message error
			dispatch(loginFormActions.formErrorMessage(message));
		}
		if (isSuccess || user) {
			// keep JWT in the localStorage to stay loggedIn

			if (!stayLogIn) {
				localStorage.removeItem('user');
			}

			navigate('/profile');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleChange = (e) => {
		dispatch(
			loginFormActions.updateFields({
				name: e.target.name,
				value: e.target.value,
			})
		);
	};

	const handleToggle = () => {
		dispatch(loginFormActions.toggleStayLogIn());
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		switch (true) {
			case email === '':
				if (password === '') {
					dispatch(
						loginFormActions.formErrorMessage('Enter your email and password')
					);
					return;
				}
				dispatch(loginFormActions.formErrorMessage('Enter your email'));
				return;

			case password === '':
				dispatch(loginFormActions.formErrorMessage('Enter your password'));
				return;

			default:
		}

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	// spinner if waiting for data
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<main className='main bg-dark'>
				<section className='sign-in-content'>
					<i className='fa fa-user-circle sign-in-icon'></i>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<div className='input-wrapper'>
							<label htmlFor='email'>Username</label>
							<input
								type='email'
								id='email	'
								name='email'
								autoComplete='email'
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className='input-wrapper'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								name='password'
								autoComplete='current-password'
								value={password}
								onChange={handleChange}
							/>
						</div>
						<div className='input-remember'>
							<input
								type='checkbox'
								id='stayLogIn'
								name='stayLogIn'
								value={stayLogIn}
								onChange={handleToggle}
							/>
							<label htmlFor='stayLogIn'>Remember me</label>
						</div>
						{errorMessage != null && (
							<p className='formErrorMessage'>{errorMessage}</p>
						)}
						<button type='submit' className='sign-in-button'>
							Sign In
						</button>
					</form>
				</section>
			</main>
		</>
	);
}
