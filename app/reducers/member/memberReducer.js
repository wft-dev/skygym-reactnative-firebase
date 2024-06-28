import { GET_MEMBER, GET_MEMBER_BY_ID, GET_PURCAHSE_MEMBERSHIP, CHECK_IN_CHECK_OUT_ATTENDANCE, GET_ATTENDANCE, GET_PURCAHSE_MEMBERSHIP_BY_ID } from '../../actions/actionTypes';

export default memberReducer = (state = {}, action) => {
	console.log('action.memberData ', action.memberDataByID);
	switch (action.type) {
		case GET_MEMBER:
			return { ...state, memberData: action.memberData }
		case GET_MEMBER_BY_ID:
			return { ...state, memberDataByID: action.memberDataByID }
		case GET_PURCAHSE_MEMBERSHIP:
			return { ...state, purchaseMemberShipData: action.purchaseMemberShipData }
		case GET_PURCAHSE_MEMBERSHIP_BY_ID:
			return { ...state, purchaseMemberShipDataByID: action.purchaseMemberShipDataByID }
		// case GET_ATTENDANCE:
		// 	return { ...state, attendanceData: action.attendanceData }
		default:
			return state
	}
}
