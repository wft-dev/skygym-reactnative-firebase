//import  { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import { GET_GYM_INFO} from '../actionTypes';
import {startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess,endRequestWithNavigateSucess}  from '../loader/loaderAction';


export const getGymInfo = (uid) => {
	return async (dispatch, getState) => {
		startRequestNoToken(dispatch)
		try {
			const user = await db()
				.collection('admin')
				.doc(uid)
				.get()
			dispatch(getGymInfoData(user.data()))
			endRequest(dispatch)
		
		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}

const getGymInfoData = gymInfoData => ({
  type: GET_GYM_INFO,
  gymInfoData
});