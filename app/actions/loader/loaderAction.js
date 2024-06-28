import {TOGGLE_LOADER} from '../actionTypes';
import { Alert} from 'react-native';  
import { Actions } from 'react-native-router-flux';


export const startRequestNoToken = (dispatch) => {
    dispatch(setLoader(true))
  }
  

  export const endRequest = (dispatch) => {
    dispatch(setLoader(false))
  }

 
export const endRequestWithError = (error, dispatch) => {
  dispatch(setLoader(false))
  if (error !== '' ){
    alert(error)
  }
}

  export const endRequestWithSucess = (title, message, dispatch) => {
    dispatch(setLoader(false))
    if (message !== '' ){
      Alert.alert(title == '' ? 'Alert': title ,message)
    }
  }


  export const endRequestWithNavigateSucess = (title, message, dispatch) => {
    dispatch(setLoader(false))
    if (message !== '' ){
     // Alert.alert(title == '' ? 'Alert': title ,message)
      Alert.alert(
        title == '' ? 'Alert': title ,
        message,
        [
         
          { text: "OK", onPress: () => Actions.pop() }
        ],
        { cancelable: false }
      );
    }
  }


  const setLoader = show => ({
    type: TOGGLE_LOADER,
    payload: show
  });