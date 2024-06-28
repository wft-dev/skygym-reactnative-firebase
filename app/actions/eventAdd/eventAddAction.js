//import  { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import { ADD_EVENT, GET_EVENT } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';
import { Strings } from '../../utils';

export const addEvent = (eventData) => {
  return async (dispatch, getState) => {

    startRequestNoToken(dispatch)

    try {
      const adminRef = db().collection('admin');
      const eventRef = await
        adminRef.doc(getState().sessionReducer.user.adminID)
          .collection('event')
          .add(eventData)
      if (eventRef.id) {
        endRequestWithNavigateSucess(Strings.alert.eventAlertTilte, Strings.alert.eventAlertTilte + Strings.alert.addDataAlert, dispatch)
      } else {
        endRequest(dispatch)
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const updateEvent = (eventData, eventID) => {
  return async (dispatch, getState) => {

    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const eventRef = await
        adminRef.collection('event').doc(eventID).set(
          eventData,
          { merge: true }
        );
      // if (eventRef.id) {
      endRequestWithNavigateSucess(Strings.alert.eventAlertTilte, Strings.alert.eventAlertTilte + Strings.alert.updateDateAlert, dispatch)

      //endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getEvent = () => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      // let eventRef = db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('event')
      await adminRef.collection("event").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const getEventData = [];
        if (!snapshot.empty) {

          snapshot.forEach(event => {
            getEventData.push({
              ...event.data(),
              id: event.id,
              key: event.id,
            });
          });
        }
        dispatch(getEventList(getEventData))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getEvent122 = () => {
  return async (dispatch, getState) => {
    //  
    startRequestNoToken(dispatch)

    try {
      // let eventRef = db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('event')
      let activeRef = await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('event').get();
      const getEventData = [];
      if (!activeRef.empty) {
        activeRef.forEach(event => {

          getEventData.push({
            ...event.data(),
            id: event.id,
            key: event.id,
          });
        });
      }
      dispatch(getEventList(getEventData))

      endRequest(dispatch)
    } catch (e) {
      //  console.log('getState().user',e);
      endRequestWithError(e, dispatch)
    }
  }
}

export const deleteEvent = (eventID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)

    try {
      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('event').doc(eventID).delete();
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



const getEventList = eventData => ({
  type: GET_EVENT,
  eventData
});