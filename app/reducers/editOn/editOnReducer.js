import { ON_EDIT } from '../../actions/actionTypes';
const initialState = {
	isEdit: false,
	isAdd: true,
  };

export default editOnReducer = (state = initialState , action) => {
	console.log('action.eventData ',  action.isADD );
  switch (action.type) {
		case ON_EDIT:
			return { ...state,  isEdit: action.isEdit, isAdd : action.isADD}
		default:
			return state
	}
}
