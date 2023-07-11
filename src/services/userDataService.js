import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/';

const profileData = async (authToken) => {
	const userData = {};
	const response = await axios.post(API_URL + 'user/profile', userData, {
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

const updateProfileData = async (data) => {
	const userData = { firstName: data.firstName, lastName: data.lastName };
	const response = await axios.put(API_URL + 'user/profile', userData, {
		headers: {
			Authorization: `Bearer ${data.jwt}`,
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};
const userDataService = {
	profileData,
	updateProfileData,
};

export default userDataService;
