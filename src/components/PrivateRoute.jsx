import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as loginFormActions from '../features/loginFormSlice';

export default function PrivateRoute({ children }) {
	const dispatch = useDispatch();

	// authSlice state
	const { user } = useSelector((state) => state.auth);

	if (!user) {
		// not logged in so redirect to login page with the return url and an error message
		dispatch(
			loginFormActions.formErrorMessage(
				'You need to login first to access this page'
			)
		);
		return <Navigate to='/login' />;
	}

	// authorized so return child components
	return children;
}

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
