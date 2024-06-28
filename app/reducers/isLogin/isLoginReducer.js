import { LOGIN_SUCESS} from '../../actions/actionTypes';

const initialState = {
	isLogin: false
};

export default isLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCESS:
			return { ...state, isLogin: action.isLogin }
		default:
			return state
	}
}
