//import  { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import md5 from 'md5';


import { GET_TRAINER, LOGIN, CHECK_IN_CHECK_OUT_ATTENDANCE_TRAINER, GET_TRAINER_BY_ID } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';
import { Strings } from '../../utils';
import { deleteRegisterUser } from '../session/sessionAction';

export const addTrainer = (trainerData, password, isUserImage, isUploadImage) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    var task = null;
    var filename = ''
    if (isUserImage !== '' && trainerData.imageUrl) {
      const { uri } = trainerData.imageUrl;
      filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      task = storage().ref(filename).putFile(uploadUri);
    }
    var taskUpload = null;
    var filenameUpload = ''
    if (isUploadImage !== '' && trainerData.uploadIDProof) {
      const { uri } = trainerData.uploadIDProof;
      filenameUpload = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      taskUpload = storage().ref(filenameUpload).putFile(uploadUri);
    }

    try {
      const response = await auth().createUserWithEmailAndPassword(trainerData.email, md5(password))
      if (response.user.uid) {
        if (isUserImage !== '' && trainerData.imageUrl) {
          await task;
          const imgUrl = await storage().ref(filename).getDownloadURL();
          trainerData.imageUrl = imgUrl;
        }
        if (isUploadImage !== '' && trainerData.uploadIDProof) {
          await taskUpload;
          const imgUrl = await storage().ref(filenameUpload).getDownloadURL();
          trainerData.uploadIDProof = imgUrl;
        }
        trainerData.idTrainer = response.user.uid
        trainerData.id = response.user.uid
        const adminRef = db().collection('admin');
        const trainerRef = await
          adminRef.doc(getState().sessionReducer.user.adminID)
            .collection('trainer').doc(response.user.uid)
            .set(trainerData)

        await db().collection('users').doc(response.user.uid).set(trainerData)
        // if (trainerRef.id) {

        endRequestWithNavigateSucess(Strings.alert.trainerAlertTilte, Strings.alert.trainerAlertTilte + Strings.alert.addDataAlert, dispatch)
        // } else {
        //   endRequest(dispatch)
        // }
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const addAttendance = (checkInStatusVal, trainerID) => {
  return async (dispatch, getState) => {

    var getTodayYear = dateTimeHelper.getYear();
    var getTodayMonth = dateTimeHelper.getMonth();
    var getTodayDate = dateTimeHelper.getDate();
    var getTodayDay = dateTimeHelper.getDay();


    var currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 316);

    const attendanceData = {
      date: getTodayDate,
      day: getTodayDay,
      data:
        [{
          checkIn: checkInStatusVal == true ? currentDate : '',
          checkOut: checkInStatusVal == false ? currentDate : '',
          checkInStatus: checkInStatusVal,
          checkInBy: 'admin',
          checkInCount: 1,
          day: getTodayDay,
          createdAt: currentDate,
          date: getTodayDate,
          checkedByID: getState().sessionReducer.user.adminID,
          userID: trainerID
        }]
    }


    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const trainerRef = adminRef.collection('trainer').doc(trainerID);
      const attendanceRef = trainerRef.collection('attendance')
      const yearRef = attendanceRef.doc(getTodayYear)
      let value = attendanceData['data'][0]
      const getAttendance = await attendanceRef.get();


      const monthRef = await attendanceRef.where('year', '==', getTodayYear).get();
      if (monthRef.empty) {
        await yearRef.set({ 'year': getTodayYear })
        await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
        await trainerRef.set({ attendance: value }, { merge: true });
        if (getAttendance.empty) {
          await trainerRef.set({ attendanceDate: currentDate }, { merge: true });
        }
        // await adminRef1.set(attendanceData)
      } else {
        const dateRef = await yearRef.collection(getTodayMonth).where('date', '==', getTodayDate).get();
        if (dateRef.empty) {
          await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
          await trainerRef.set({ attendance: value }, { merge: true });
        }
        else {
          dateRef.forEach(doc => {

            if (doc.data()['day'] == getTodayDay) {
              var valueFound = false
              doc.data()['data'].filter(item => item['checkInCount'] == 1).map(val => {
                if (val['checkInCount'] == 1) {
                  yearRef.collection(getTodayMonth).doc(doc.id).update({ 'data': db.FieldValue.arrayRemove(val) })
                  val['checkInCount'] = 2
                  if (checkInStatusVal === true) {
                    val['checkIn'] = currentDate
                  } else {
                    val['checkOut'] = currentDate
                  }
                  val['checkInStatus'] = checkInStatusVal
                  val['updatedAt'] = currentDate
                  valueFound = true
                  yearRef.collection(getTodayMonth).doc(doc.id).update({ 'data': db.FieldValue.arrayUnion(val) })
                  trainerRef.set({ attendance: val }, { merge: true });
                }
              })
              if (!valueFound) {
                yearRef.collection(getTodayMonth).doc(doc.id).update({ 'data': db.FieldValue.arrayUnion(value) })
                trainerRef.set({ attendance: value }, { merge: true });
              }
            }
            // Object.keys(doc.data()).map((key) => {
            //   if (key == getTodayDay) {
            //     var valueFound = false
            //     doc.data()[key].filter(item => item['checkInCount'] == 1).map(val => {
            //       if (val['checkInCount'] == 1) {
            //         yearRef.collection(getTodayMonth).doc(doc.id).update({ [getTodayDay]: db.FieldValue.arrayRemove(val) })
            //         val['checkInCount'] = 2
            //         if (checkInStatusVal === true) {
            //           val['checkIn'] =  currentDate
            //         } else {
            //           val['checkOut'] =  currentDate
            //         }
            //         val['checkInStatus'] = checkInStatusVal
            //         val['updatedAt'] = currentDate
            //         valueFound = true
            //         yearRef.collection(getTodayMonth).doc(doc.id).update({ [getTodayDay]: db.FieldValue.arrayUnion(val) })
            //         trainerRef.set({ attendance: val }, { merge: true });
            //       } 
            //     })
            //     if (!valueFound) {
            //       yearRef.collection(getTodayMonth).doc(doc.id).update({ [getTodayDay]: db.FieldValue.arrayUnion(value) })
            //       trainerRef.set({ attendance: value }, { merge: true });
            //     }
            //   }
            // })
          });
        }
      }
      dispatch(getCheckInCheckOutMarkTrainer(checkInStatusVal))
      endRequestWithSucess(Strings.alert.attendanceAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.checkedInAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getAttendanceTariner = (currentDate, nextDate, trainerID) => {
  return async (dispatch, getState) => {
    var getTodayYear = dateTimeHelper.getYear(currentDate);
    var getTodayMonth = dateTimeHelper.getMonth(currentDate);
    var getTodayDate = dateTimeHelper.getDate(currentDate);
    var getNextTodayDate = dateTimeHelper.getDate(nextDate);
    var getTodayDay = dateTimeHelper.getDay(currentDate);

    startRequestNoToken(dispatch)
    try {

      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const trainerRef = adminRef.collection('trainer').doc(trainerID);
      const attendanceRef = trainerRef.collection('attendance')
      const yearRef = attendanceRef.doc(getTodayYear)
      const monthRef = await attendanceRef.where('year', '==', getTodayYear).get();
      const getAttendanceDataData = [];
      if (monthRef.empty) {



      } else {
        const dateRef = await yearRef.collection(getTodayMonth).where('date', '>=', getTodayDate).where('date', '<=', getNextTodayDate).get();
        if (dateRef.empty) {


        }
        else {

          dateRef.forEach(doc => {
            //       let v = Object.keys(doc.data())[0]

            if (doc.data()['data'].length > 0) {
              doc.data()['data'].map(val => {
                getAttendanceDataData.push({
                  ...val,
                  //id: doc.id,
                  //  key: doc.id,
                });
              })
            }
            // getAttendanceDataData.push({
            //   ...doc.data(),
            //   id: doc.id,
            //   key: doc.id,
            // });
          });
        }
      }
      // const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      // await adminRef.collection("member").doc(memberID).collection('attendance').doc(getTodayYear)onSnapshot(snapshot => {
      //   const getAttendanceDataData = [];
      //   if (!snapshot.empty) {
      //     snapshot.forEach(attendance => {

      //       getAttendanceDataData.push({
      //         ...attendance.data(),
      //         id: attendance.id,
      //         key: attendance.id,
      //       });
      //     });

      //   }

      dispatch(getAttendanceListTrainer(getAttendanceDataData))

      // });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const updateTrainer = (trainerData, trainerID, isUserImage, isUploadImage, isProfile) => {
  return async (dispatch, getState) => {
    var task = null;
    var filename = ''
    if (isUserImage !== '' && trainerData.imageUrl) {
      const { uri } = trainerData.imageUrl;
      filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      task = storage().ref(filename).putFile(uploadUri);
    }
    var taskUpload = null;
    var filenameUpload = ''
    if (isUploadImage !== '' && trainerData.uploadIDProof) {
      const { uri } = trainerData.uploadIDProof;
      filenameUpload = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      taskUpload = storage().ref(filenameUpload).putFile(uploadUri);
    }


    startRequestNoToken(dispatch)
    try {
      if (isUserImage !== '' && trainerData.imageUrl) {
        await task;
        const imgUrl = await storage().ref(filename).getDownloadURL();
        trainerData.imageUrl = imgUrl;
      }
      if (isUploadImage !== '' && trainerData.uploadIDProof) {
        await taskUpload;
        const imgUrl = await storage().ref(filenameUpload).getDownloadURL();
        trainerData.uploadIDProof = imgUrl;
      }
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      await adminRef.collection('trainer').doc(trainerID).set(
        trainerData,
        { merge: true }
      );

      await db().collection('users').doc(trainerID).set(
        trainerData,
        { merge: true }
      );
      if (isProfile === true) {
        dispatch(getTrainerByID(trainerID, false))
        endRequestWithSucess(Strings.alert.profileAlertTilte, Strings.alert.profileAlertTilte + Strings.alert.updateDateAlert, dispatch)

      } else {
        endRequestWithNavigateSucess(Strings.alert.trainerAlertTilte, Strings.alert.trainerAlertTilte + Strings.alert.updateDateAlert, dispatch)
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getTrainerByID = (trainerID, isOnlyTrainerProfile) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
    try {
      const trainerRef = await adminRef.collection('trainer').doc(trainerID).get()
      dispatch(getTrainerDataById(trainerRef.data()))

      if (isOnlyTrainerProfile === false) {
        dispatch({ type: LOGIN, user: trainerRef.data() })
      }


      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getTrainer = (trainerType = 'General') => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      await adminRef.collection('trainer').where('trainerType', '==', trainerType).orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const getTrainerData = [];
        if (!snapshot.empty) {
          snapshot.forEach(trainer => {
            getTrainerData.push({
              ...trainer.data(),
              id: trainer.id,
              key: trainer.id,
            });
          });
        }
        dispatch(getTrainerList(getTrainerData))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}



export const deleteTrainer = (trainerData) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)

    try {
      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('trainer').doc(trainerData.id).delete();
      await db().collection('users').doc(trainerData.id).delete();

      // var newData = [...getState().eventAddReducer.eventData]
      //  const prevIndex = getState().eventAddReducer.eventData.findIndex(item => item.key === eventID);
      //  newData.splice(prevIndex, 1);
      //  dispatch(getEventList(newData))
      endRequest(dispatch)
      deleteRegisterUser(Strings.alert.trainerAlertTilte, Strings.alert.trainerAlertTilte + Strings.alert.deleteDataAlert, trainerData.email, trainerData.passwordHash, dispatch, getState)

    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}



const getTrainerList = trainerData => ({
  type: GET_TRAINER,
  trainerData
});


const getTrainerDataById = trainerDataByID => ({
  type: GET_TRAINER_BY_ID,
  trainerDataByID
});

// const getCheckInCheckOutMarkTrainer = checkInCheckOutMarkTrainer => ({
//   type: CHECK_IN_CHECK_OUT_ATTENDANCE_TRAINER,
//   checkInCheckOutMarkTrainer
// });


// const getAttendanceListTrainer = attendanceData => ({
//   type: GET_ATTENDANCE_TRAINER,
//   attendanceDataTrainer
// });
