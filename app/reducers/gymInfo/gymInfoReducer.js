import { GET_GYM_INFO} from '../../actions/actionTypes';



export default gymInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_GYM_INFO:
			return { ...state, gymInfoData: action.gymInfoData }
		default:
			return state
	}
}
