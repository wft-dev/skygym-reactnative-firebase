//import  { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';

import { ADD_VISITOR, GET_VISITOR } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';
import { Constants, Strings } from '../../utils';

export const addVisitor = (visitorData) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin');
      const VisitorRef = await
        adminRef.doc(getState().sessionReducer.user.adminID)
          .collection('visitor')
          .add(visitorData)
      if (VisitorRef.id) {
        endRequestWithNavigateSucess(Strings.alert.visitorAlertTilte, Strings.alert.visitorAlertTilte + Strings.alert.addDataAlert, dispatch)
      } else {
        endRequest(dispatch)
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const updateVisitor = (visitorData, visitorID) => {
  return async (dispatch, getState) => {

    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      await adminRef.collection('visitor').doc(visitorID).set(
        visitorData,
        { merge: true }
      );
      endRequestWithNavigateSucess(Strings.alert.visitorAlertTilte, Strings.alert.visitorAlertTilte + Strings.alert.updateDateAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getVisitor = () => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      var visitorRef = adminRef.collection('visitor').orderBy("createdAt", "desc");
      visitorRef.onSnapshot(snapshot => {
        const getVisitorData = [];
        if (!snapshot.empty) {
          snapshot.forEach(visitor => {
            let tarinerId = getState().sessionReducer.user.id
            if (getState().sessionReducer.user.role === Constants.trainer && visitor.data().addedByID === tarinerId) {
              getVisitorData.push({
                ...visitor.data(),
                id: visitor.id,
                key: visitor.id,
              });
            } else if (getState().sessionReducer.user.role === Constants.admin) {
              getVisitorData.push({
                ...visitor.data(),
                id: visitor.id,
                key: visitor.id,
              });
            }
          });


        }
        dispatch(getVisitorList(getVisitorData))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}



export const deleteVisitor = (visitorID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('visitor').doc(visitorID).delete();
      // var newData = [...getState().eventAddReducer.eventData]
      //  const prevIndex = getState().eventAddReducer.eventData.findIndex(item => item.key === eventID);
      //  newData.splice(prevIndex, 1);
      //  dispatch(getEventList(newData))
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}



const getVisitorList = visitorData => ({
  type: GET_VISITOR,
  visitorData
});