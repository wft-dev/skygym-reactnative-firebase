import { GET_MEMBERSHIP, GET_ACTIVE_MEMBERSHIP } from '../../actions/actionTypes';

export default memberShipReducer = (state ={} , action) => {
	console.log('action.eventData ',action.memberShipData );
  switch (action.type) {
		case GET_MEMBERSHIP:
			return { ...state,  memberShipData: action.memberShipData }
			case GET_ACTIVE_MEMBERSHIP:
			return { ...state,  activeMemberShipData: action.activeMemberShipData }
		default:
			return state
	}
}
