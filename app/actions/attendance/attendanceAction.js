//import Firebase, { db } from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';

import { CHECK_IN_CHECK_OUT_ATTENDANCE, GET_ATTENDANCE } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';

import { Strings, dateTimeHelper, Constants } from '../../utils';


export const addAttendance = (userType, checkInStatusVal, userID) => {
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
          checkInBy: getState().sessionReducer.user.role,
          checkInByName: getState().sessionReducer.user.name,
          checkInCount: 1,
          day: getTodayDay,
          createdAt: currentDate,
          date: getTodayDate,
          checkedByID: getState().sessionReducer.user.id,
          userID: userID
        }]
    }


    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection(userType).doc(userID);
      const attendanceRef = memberRef.collection('attendance')
      const yearRef = attendanceRef.doc(getTodayYear)
      let value = attendanceData['data'][0]
      const getAttendance = await attendanceRef.get();
      const userRef = db().collection('users').doc(userID);


      const monthRef = await attendanceRef.where('year', '==', getTodayYear).get();
      if (monthRef.empty) {
        await yearRef.set({ 'year': getTodayYear })
        await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
        await memberRef.set({ attendance: value }, { merge: true });
        await userRef.set({ attendance: value }, { merge: true });

        if (getAttendance.empty) {
          await memberRef.set({ attendanceDate: currentDate }, { merge: true });
          await userRef.set({ attendanceDate: currentDate }, { merge: true });

        }
        // await adminRef1.set(attendanceData)
      } else {
        const dateRef = await yearRef.collection(getTodayMonth).where('date', '==', getTodayDate).get();
        if (dateRef.empty) {
          await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
          await memberRef.set({ attendance: value }, { merge: true });
          await userRef.set({ attendance: value }, { merge: true });

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
                  memberRef.set({ attendance: val }, { merge: true });
                  userRef.set({ attendance: val }, { merge: true });

                }
              })
              if (!valueFound) {
                yearRef.collection(getTodayMonth).doc(doc.id).update({ 'data': db.FieldValue.arrayUnion(value) })
                memberRef.set({ attendance: value }, { merge: true });
                userRef.set({ attendance: value }, { merge: true });

              }
            }
            // Object.keys(doc.data()).map((key) => {
            //   if (key == getTodayDay) {
            //     var valueFound = false
            //     doc.data()[key].filter(item => item['checkInCount'] == 1).map(val => {
            //       if (val['checkInCount'] == 1) {
            //         console.warn('doc.data()[key]', val['checkInStatus']);
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
            //         memberRef.set({ attendance: val }, { merge: true });
            //       } 
            //     })
            //     if (!valueFound) {
            //       yearRef.collection(getTodayMonth).doc(doc.id).update({ [getTodayDay]: db.FieldValue.arrayUnion(value) })
            //       memberRef.set({ attendance: value }, { merge: true });
            //     }
            //   }
            // })
          });
        }
      }
      dispatch(getCheckInCheckOutMark(checkInStatusVal))
      endRequestWithSucess(Strings.alert.attendanceAlertTilte, (userType === Constants.member ? Strings.alert.memberAlertTilte : Strings.alert.trainerAlertTilte) + Strings.alert.checkedInAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getAttendance = (userType, currentDate, nextDate, userID) => {
  return async (dispatch, getState) => {
    var getTodayYear = dateTimeHelper.getYear(currentDate);
    var getTodayMonth = dateTimeHelper.getMonth(currentDate);
    var getTodayDate = dateTimeHelper.getDate(currentDate);
    var getNextTodayDate = dateTimeHelper.getDate(nextDate);
    var getTodayDay = dateTimeHelper.getDay(currentDate);

    startRequestNoToken(dispatch)
    try {

      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection(userType).doc(userID);
      const attendanceRef = memberRef.collection('attendance')
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
      // await adminRef.collection("member").doc(userID).collection('attendance').doc(getTodayYear)onSnapshot(snapshot => {
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

      dispatch(getAttendanceList(getAttendanceDataData))

      // });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

// export const addAttendance = (checkINBool, userID) => {
//   return async (dispatch, getState) => {
//       // const attendanceData1 =  {
//   //       'Jan': {
//   //         '27-jan-2020': {
//   //           'Sun' : 
//   //             [{'in' : '1:00'}, {'in' : '2:00'}]

//   //         },
//   //         '28-jan-2020': {
//   //           'Mon' : 
//   //             [{'in' : '1:00'}, {'in' : '2:00'}]

//   //         }
//   //       }
//   // }
//   var getTodayYear = dateTimeHelper.getYear();
//   var getTodayMonth = dateTimeHelper.getMonth();
//   var getTodayDate = dateTimeHelper.getDate();
//   var getTodayDay = dateTimeHelper.getDay();
//   // const attendanceData = {
//   //   [getTodayMonth]: {
//   //     [getTodayDate]: {
//   //       [getTodayDay]:
//   //         [{ checkIn: checkINBool == true ? dateTimeHelper.getDateTime() : '', 
//   //         checkOut: checkINBool == false ? dateTimeHelper.getDateTime() : '', 
//   //         checkInBy: 'admin', 
//   //         checkedByID: getState().sessionReducer.user.adminID, 
//   //         userID: userID }]
//   //     },
//   //   }
//   // }

//   const attendanceData = {
//         [getTodayDay]:
//           [{ checkIn: checkINBool == true ? dateTimeHelper.getDateTime() : '', 
//           checkOut: checkINBool == false ? dateTimeHelper.getDateTime() : '', 
//           checkInBy: 'admin', 
//           checkedByID: getState().sessionReducer.user.adminID, 
//           userID: userID }]
//   }



//     startRequestNoToken(dispatch)
//     try {
//       const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
//       const adminRef1 = adminRef.collection('member').doc(userID).collection('attendance');
//       const doc = await adminRef1.get();

//       const adminRef2 = await adminRef.collection('member').doc(userID).collection('attendance').where('year', '==', getTodayYear).get();


//       if (!doc.exists) {
//         console.warn('No such document!');
//         await adminRef.collection('member').doc(userID).collection('attendance').doc(getTodayYear).set({'year': getTodayYear})
//         await adminRef.collection('member').doc(userID).collection('attendance').doc(getTodayYear).collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
//        // await adminRef1.set(attendanceData)
//       } else {
//         var docData = {};
//         docData = doc.data()
//         // adminRef1.set(
//         //   {'Dec.arry' : db.FieldValue.arrayUnion('118')}, {merge:true})
//         // adminRef1.update(
//         //   {'Dec.arry' : db.FieldValue.arrayUnion('112')})
//         // adminRef1.update(
//         //   {dec : '11112'})
//         if (Object.keys(doc.data()) == getTodayMonth ) {
//           console.warn('Month');
//           // adminRef1.update({'Dec' : {
//           //         'arry' : [...doc.data()[getTodayMonth]['arry'], 7]
//           //       }})
//           // adminRef1.set(
//           //   {'Dec.arry' : db.FieldValue.arrayUnion('8')}, {merge:true})
//           // //  adminRef1.set(
//           //     {'Dec' : {
//           //       'arry' : [...doc.data()[getTodayMonth]['arry'], 5]
//           //     }},{merge:true})
//           if (Object.keys(doc.data()[getTodayMonth]) == getTodayDate ) {
//             console.warn('date');
//             if (Object.keys(doc.data()[getTodayMonth][getTodayDate]) == getTodayDay ) {
//               console.warn('day');
//           let getArrayFromData = Object.keys(doc.data()) + '.' + Object.keys(doc.data()[getTodayMonth]) + '.' +Object.keys(doc.data()[getTodayMonth][getTodayDate])

//        var da =    attendanceData[getTodayMonth][getTodayDate][getTodayDay][0]
//        console.warn('da',da);
//             adminRef1.update(
//               {[getArrayFromData] : db.FieldValue.arrayUnion(da)})

//           } else {
//             console.warn('h'); 
//             await  adminRef1.set(attendanceData, {merge: true})
//           }
//         }else {
//           console.warn('h');
//          // adminRef1.update(attendanceData)
//         }

//         } else {
//           await adminRef1.set(attendanceData)
//         }
//        // console.warn(Object.keys(doc.data()));
//         // console.warn('month data:', docData['27-jan-2020']['Sun'][0]);
//       }
//       //console.warn('adminRef1', doc.exists);
//       //    adminRef1.where('age', '>=', 18)
//       //  
//       endRequestWithSucess(Strings.alert.attendanceAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.checkedInAlert, dispatch)
//     } catch (e) {
//       endRequestWithError(e, dispatch)
//     }
//   }
// }

const getCheckInCheckOutMark = checkInCheckOutMark => ({
  type: CHECK_IN_CHECK_OUT_ATTENDANCE,
  checkInCheckOutMark
});


const getAttendanceList = attendanceData => ({
  type: GET_ATTENDANCE,
  attendanceData
});

