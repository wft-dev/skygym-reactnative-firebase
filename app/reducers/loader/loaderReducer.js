import { TOGGLE_LOADER } from '../../actions/actionTypes'
const initialState = {
    showLoader1: false,
    
  };

export default loaderReducer = (state =  initialState,action) => {
  switch (action.type) {
    case TOGGLE_LOADER:
        return { ...state, showLoader1 : action.payload };
    default:
      return state;
  }
}



