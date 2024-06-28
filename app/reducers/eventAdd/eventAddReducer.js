import { GET_EVENT } from '../../actions/actionTypes';

export default eventAddReducer = (state ={} , action) => {
//	console.log('action.eventData ',action.eventData );
  switch (action.type) {
		case GET_EVENT:
			return { ...state,  eventData: action.eventData }
		default:
			return state
	}
}
