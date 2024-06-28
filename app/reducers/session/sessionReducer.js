import { LOGIN_SUCESS, LOGIN, SIGNUP } from '../../actions/actionTypes';

const initialState = {
	user: {},
};

export default sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, user: action.user }
		case SIGNUP:
			return { ...state, user: action.user }
		default:
			return state
	}
}
