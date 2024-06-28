import {  CHECK_IN_CHECK_OUT_ATTENDANCE, GET_ATTENDANCE } from '../../actions/actionTypes';

export default attendanceReducer = (state = {}, action) => {
	console.log('action.memberData ', action.memberDataByID);
	switch (action.type) {
		case CHECK_IN_CHECK_OUT_ATTENDANCE:
			return { ...state, checkInCheckOutMark: action.checkInCheckOutMark }
		case GET_ATTENDANCE:
			return { ...state, attendanceData: action.attendanceData }
		default:
			return state
	}
}
