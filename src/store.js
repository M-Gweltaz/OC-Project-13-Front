import { configureStore } from '@reduxjs/toolkit';
import loginFormReducer from './features/loginFormSlice';
import authReducer from './features/authSlice';
import userDataReducer from './features/userDataSlice';

const store = configureStore({
	reducer: {
		loginForm: loginFormReducer,
		auth: authReducer,
		userData: userDataReducer,
	},
	devTools: true,
});

export default store;
