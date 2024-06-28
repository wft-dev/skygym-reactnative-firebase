import {ON_EDIT} from '../actionTypes';

export const editOn = (isEditBool, isAddBool) => {

	return async (dispatch) => {
  //  console.log('isEditBool',isEditBool, isAddBool);

  dispatch(setEdit(isEditBool, isAddBool))
}
}

const setEdit = (isEditBool,isAddBool )=> ({
  type: ON_EDIT,
  isEdit: isEditBool,
  isADD: isAddBool,
});