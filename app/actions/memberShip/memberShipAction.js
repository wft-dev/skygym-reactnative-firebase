//import  { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';

import { ADD_MEMBERSHIP, GET_ACTIVE_MEMBERSHIP, GET_MEMBERSHIP } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';
import { Strings } from '../../utils';

export const addMemberShip = (memberShipData) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin');
      const memberShipRef = await
        adminRef.doc(getState().sessionReducer.user.adminID)
          .collection('memberShip')
          .add(memberShipData)
      if (memberShipRef.id) {
        endRequestWithNavigateSucess(Strings.alert.membershipAlertTilte, Strings.alert.membershipAlertTilte + Strings.alert.addDataAlert, dispatch)
      } else {
        endRequest(dispatch)
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const updateMemberShip = (memberShipData, memberShipID) => {
  return async (dispatch, getState) => {

    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      await adminRef.collection('memberShip').doc(memberShipID).set(
        memberShipData,
        { merge: true }
      );
      endRequestWithNavigateSucess(Strings.alert.membershipAlertTilte, Strings.alert.membershipAlertTilte + Strings.alert.updateDateAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getMemberShip = () => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      adminRef.collection("memberShip").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const getMemberShipData = [];
        if (!snapshot.empty) {
          snapshot.forEach(memberShip => {

            getMemberShipData.push({
              ...memberShip.data(),
              id: memberShip.id,
              key: memberShip.id,
            });
          });


        }
        dispatch(getMemberShipList(getMemberShipData))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getActiveMemberShip = () => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      var currentDate = new Date();
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      await adminRef.collection("memberShip").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const getActiveMemberShipData = [];

        if (!snapshot.empty) {

          snapshot.forEach(memberShip => {

            getActiveMemberShipData.push({
              ...memberShip.data(),
              id: memberShip.id,
              key: memberShip.id,
            });
          });


        }
        dispatch(getActiveMemberShipList(getActiveMemberShipData))

      });
      endRequest(dispatch)
    } catch (e) {
      console.log();
      endRequestWithError(e, dispatch)
    }
  }
}



export const deleteMemberShip = (memberShipID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)

    try {
      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('memberShip').doc(memberShipID).delete();
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



const getMemberShipList = memberShipData => ({
  type: GET_MEMBERSHIP,
  memberShipData
});

const getActiveMemberShipList = activeMemberShipData => ({
  type: GET_ACTIVE_MEMBERSHIP,
  activeMemberShipData
});