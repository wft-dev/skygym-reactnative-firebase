import { GET_VISITOR } from '../../actions/actionTypes';

export default visitorReducer = (state ={} , action) => {
	console.log('action.GET_VISITOR ',action.visitorData );
  switch (action.type) {
		case GET_VISITOR:
			return { ...state,  visitorData: action.visitorData }
		default:
			return state
	}
}
