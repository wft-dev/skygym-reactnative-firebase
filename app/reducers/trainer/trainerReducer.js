import { GET_TRAINER, CHECK_IN_CHECK_OUT_ATTENDANCE_TRAINER, GET_TRAINER_BY_ID } from '../../actions/actionTypes';

export default trainerReducer = (state = {}, action) => {
	//console.warn('action.trainerDataByID ', action);
	switch (action.type) {
		case GET_TRAINER:
			return { ...state, trainerData: action.trainerData }
		case GET_TRAINER_BY_ID:
			return { ...state, trainerDataByID: action.trainerDataByID }

		// case CHECK_IN_CHECK_OUT_ATTENDANCE_TRAINER:
		// 	return { ...state, checkInCheckOutMarkTrainer: action.checkInCheckOutMarkTrainer }
		// case GET_ATTENDANCE_TRAINER:
		// 	return { ...state, attendanceDataTrainer: action.attendanceDataTrainer }
		default:
			return state
	}
}
