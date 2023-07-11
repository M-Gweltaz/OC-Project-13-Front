import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

// login api call
const login = async (userData) => {
	const response = await axios.post(API_URL + 'user/login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data.body.token));
	}

	return response.data;
};

// logout logique
const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	login,
	logout,
};

export default authService;
