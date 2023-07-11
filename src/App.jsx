import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
