import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import * as userDataAction from '../features/userDataSlice';
import '../style/Profile/Profile.css';

export default function Profile() {
	const dispatch = useDispatch();

	// authSlice state
	const { user } = useSelector((state) => state.auth);

	// userDataSlice
	const { data, updateDataForm, isLoading } = useSelector(
		(state) => state.userData
	);

	// call the api to get data
	useEffect(() => {
		dispatch(userDataAction.profileData(user));
		dispatch(userDataAction.reset());
	}, [dispatch, user]);

	// opening/closing the form
	const handleClick = () => {
		dispatch(userDataAction.toggleUpdateDataForm());
	};

	//taking the form input
	const handleChange = (e) => {
		dispatch(
			userDataAction.updateFields({
				name: e.target.name,
				value: e.target.value,
			})
		);
	};

	// updating the state
	const handleUpdateClick = () => {
		const data = {
			jwt: user,
			firstName: updateDataForm.firstName,
			lastName: updateDataForm.lastName,
		};

		dispatch(userDataAction.updateProfileData(data));
		dispatch(userDataAction.toggleUpdateDataForm());
	};

	// spinner if waiting for data
	if (isLoading || !data) {
		return <LoadingSpinner />;
	}
	return (
		<>
			<main className='main bg-dark'>
				<div className='header'>
					{updateDataForm.isOpen ? (
						<div className='header'>
							<h1>
								Welcome back
								<form className='updateDataForm'>
									<input
										type='text'
										className='updateDataInput'
										id='firstName'
										name='firstName'
										placeholder={data.firstName}
										onChange={handleChange}
										value={updateDataForm.firstName}
									/>
									<input
										type='text'
										className='updateDataInput'
										id='lastName'
										name='lastName'
										placeholder={data.lastName}
										onChange={handleChange}
										value={updateDataForm.lastName}
									/>
									<button
										className='updateDataBtn'
										id='updateDataBtn1'
										onClick={handleUpdateClick}
									>
										Save
									</button>
									<button
										className='updateDataBtn'
										id='updateDataBtn2'
										onClick={handleClick}
									>
										Cancel
									</button>
								</form>
							</h1>
						</div>
					) : (
						<div className='header'>
							<h1>
								Welcome back
								<br />
								{data.firstName} {data.lastName} !
							</h1>
							<button onClick={handleClick} className='edit-button'>
								Edit Name
							</button>
						</div>
					)}
				</div>
				<h2 className='sr-only'>Accounts</h2>
				<section className='account'>
					<div className='account-content-wrapper'>
						<h3 className='account-title'>Argent Bank Checking (x8349)</h3>
						<p className='account-amount'>$2,082.79</p>
						<p className='account-amount-description'>Available Balance</p>
					</div>
					<div className='account-content-wrapper cta'>
						<button className='transaction-button'>View transactions</button>
					</div>
				</section>
				<section className='account'>
					<div className='account-content-wrapper'>
						<h3 className='account-title'>Argent Bank Savings (x6712)</h3>
						<p className='account-amount'>$10,928.42</p>
						<p className='account-amount-description'>Available Balance</p>
					</div>
					<div className='account-content-wrapper cta'>
						<button className='transaction-button'>View transactions</button>
					</div>
				</section>
				<section className='account'>
					<div className='account-content-wrapper'>
						<h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
						<p className='account-amount'>$184.30</p>
						<p className='account-amount-description'>Current Balance</p>
					</div>
					<div className='account-content-wrapper cta'>
						<button className='transaction-button'>View transactions</button>
					</div>
				</section>
			</main>
		</>
	);
}
