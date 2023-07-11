import { createSlice } from '@reduxjs/toolkit';

const loginFormSlice = createSlice({
	name: 'loginForm',
	initialState: {
		email: '',
		password: '',
		stayLogIn: false,
		errorMessage: null,
	},
	reducers: {
		// reset: (state) => {
		// 	state = {
		// 		email: '',
		// 		password: '',
		// 		stayLogIn: false,
		// 		errorMessage: null,
		// 	};
		// },
		updateFields: (state, action) => {
			const { name, value } = action.payload;
			return {
				...state,
				[name]: value,
				errorMessage: null,
			};
		},
		toggleStayLogIn: (state) => {
			state.stayLogIn = !state.stayLogIn;
		},
		formErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		},
	},
});

const { actions, reducer } = loginFormSlice;
export const { updateFields, toggleStayLogIn, formErrorMessage } = actions;
export default reducer;
