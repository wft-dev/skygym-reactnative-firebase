//import Firebase, { db } from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import { GET_MEMBER, GET_MEMBER_BY_ID, GET_PURCAHSE_MEMBERSHIP, GET_PURCAHSE_MEMBERSHIP_BY_ID, LOGIN } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess, endRequestWithNavigateSucess } from '../loader/loaderAction';
import { deleteRegisterUser } from '../session/sessionAction';
import { deleteVisitor } from '../../actions/visitor/visitorAction';

import { Strings, dateTimeHelper, Constants } from '../../utils';
import { Actions } from 'react-native-router-flux';
import { object } from 'prop-types';
import md5 from 'md5';

export const addMember = (memberData, password, visitorID, isUserImage, isUploadImage) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    var task = null;
    var filename = ''
    if (isUserImage !== '' && memberData.imageUrl) {
      const { uri } = memberData.imageUrl;
      filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      task = storage().ref(filename).putFile(uploadUri);
    }

    var taskUpload = null;
    var filenameUpload = ''
    if (isUploadImage !== '' && memberData.uploadIDProof) {
      const { uri } = memberData.uploadIDProof;
      filenameUpload = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      taskUpload = storage().ref(filenameUpload).putFile(uploadUri);
    }

    try {
      const response = await auth().createUserWithEmailAndPassword(memberData.email, md5(password))
      if (response.user.uid) {
        if (isUserImage !== '' && memberData.imageUrl) {
          await task;
          const imgUrl = await storage().ref(filename).getDownloadURL();
          memberData.imageUrl = imgUrl;
        }
        if (isUploadImage !== '' && memberData.uploadIDProof) {
          await taskUpload;
          const imgUrl = await storage().ref(filenameUpload).getDownloadURL();
          memberData.uploadIDProof = imgUrl;
        }
        memberData.idMember = response.user.uid
        memberData.id = response.user.uid
        memberData.memberShipPlan.idMember = response.user.uid
        const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
        const memberRef = await adminRef.collection('member').doc(response.user.uid)
          .set(memberData)
        // if (memberRef.id) {
        //      endRequestWithNavigateSucess(Strings.alert.memberAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.addDataAlert, dispatch)
        await db().collection('users').doc(response.user.uid).set(memberData)


        if (memberData.trainerIDAssign) {
          dispatch(assignMemberToTrainer('', memberData.trainerIDAssign, response.user.uid, memberData))

        }
        endRequest(dispatch)
        dispatch(addPurchaseMemberShip(true, '', false, memberData, response.user.uid, false))
        if (visitorID) {
          dispatch(deleteVisitor(visitorID))
        }

        // } else {

        //   endRequest(dispatch)
        // }
      }
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const addAttendance = (checkInStatusVal, memberID) => {
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
          userID: memberID
        }]
    }


    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection('member').doc(memberID);
      const attendanceRef = memberRef.collection('attendance')
      const yearRef = attendanceRef.doc(getTodayYear)
      let value = attendanceData['data'][0]
      const getAttendance = await attendanceRef.get();


      const monthRef = await attendanceRef.where('year', '==', getTodayYear).get();
      if (monthRef.empty) {
        await yearRef.set({ 'year': getTodayYear })
        await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
        await memberRef.set({ attendance: value }, { merge: true });
        if (getAttendance.empty) {
          await memberRef.set({ attendanceDate: currentDate }, { merge: true });
        }
        // await adminRef1.set(attendanceData)
      } else {
        const dateRef = await yearRef.collection(getTodayMonth).where('date', '==', getTodayDate).get();
        if (dateRef.empty) {

          await yearRef.collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
          await memberRef.set({ attendance: value }, { merge: true });
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
                }
              })
              if (!valueFound) {
                yearRef.collection(getTodayMonth).doc(doc.id).update({ 'data': db.FieldValue.arrayUnion(value) })
                memberRef.set({ attendance: value }, { merge: true });
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
      endRequestWithSucess(Strings.alert.attendanceAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.checkedInAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getAttendance = (currentDate, nextDate, memberID) => {
  return async (dispatch, getState) => {
    var getTodayYear = dateTimeHelper.getYear(currentDate);
    var getTodayMonth = dateTimeHelper.getMonth(currentDate);
    var getTodayDate = dateTimeHelper.getDate(currentDate);
    var getNextTodayDate = dateTimeHelper.getDate(nextDate);
    var getTodayDay = dateTimeHelper.getDay(currentDate);

    startRequestNoToken(dispatch)
    try {

      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection('member').doc(memberID);
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

      dispatch(getAttendanceList(getAttendanceDataData))

      // });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

// export const addAttendance = (checkINBool, memberID) => {
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
//   //         userID: memberID }]
//   //     },
//   //   }
//   // }

//   const attendanceData = {
//         [getTodayDay]:
//           [{ checkIn: checkINBool == true ? dateTimeHelper.getDateTime() : '', 
//           checkOut: checkINBool == false ? dateTimeHelper.getDateTime() : '', 
//           checkInBy: 'admin', 
//           checkedByID: getState().sessionReducer.user.adminID, 
//           userID: memberID }]
//   }



//  // console.warn('attendanceData', attendanceData[getTodayMonth][getTodayDate][getTodayDay]);
//     startRequestNoToken(dispatch)
//     try {
//       const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
//       const adminRef1 = adminRef.collection('member').doc(memberID).collection('attendance');
//       const doc = await adminRef1.get();

//       const adminRef2 = await adminRef.collection('member').doc(memberID).collection('attendance').where('year', '==', getTodayYear).get();


//       if (!doc.exists) {
//         console.warn('No such document!');
//         await adminRef.collection('member').doc(memberID).collection('attendance').doc(getTodayYear).set({'year': getTodayYear})
//         await adminRef.collection('member').doc(memberID).collection('attendance').doc(getTodayYear).collection(getTodayMonth).doc(getTodayDate).set(attendanceData)
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


export const addPurchaseMemberShip = (byAdd, oldDocID, isMemberShipAdd, purchaseMemberShipData, memberID, isProfile) => {

  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      let getID = purchaseMemberShipData.memberShipPlan.docId ? purchaseMemberShipData.memberShipPlan.docId : ''

      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const purchaseRef = adminRef.collection('member').doc(memberID).collection('purchase');
      //  const getPlanIsExit = await  purchaseRef.where('id', '==', purchaseMemberShipData.memberShipPlan.id).get();

      if (getID == '') {

        const dataRef = await purchaseRef
          .add(purchaseMemberShipData.memberShipPlan)

        await purchaseRef.doc(dataRef.id).set({ docId: dataRef.id },
          { merge: true })

        await adminRef.collection('member').doc(memberID).set(
          {
            memberShipPlan: {
              docId: dataRef.id,
            }
          },
          { merge: true }
        );

        await db().collection('users').doc(memberID).set(
          {
            memberShipPlan: {
              docId: dataRef.id,
            }
          },
          { merge: true }
        );


        if (oldDocID !== '') {
          await purchaseRef.doc(oldDocID).update({ currentPlanStatus: 'Deactive' });
        }
      }
      else {

        // const getPlanIsExit = await  purchaseRef.doc(getID).get();

        // var getPurcahseDocId = ''
        // getPlanIsExit.forEach(doc => {
        // getPurcahseDocId =  doc.id
        // });


        if (oldDocID !== '') {
          await purchaseRef.doc(oldDocID).update({ currentPlanStatus: 'Deactive' });
        }
        // if (getPurcahseDocId){
        await purchaseRef.doc(getID).set(
          purchaseMemberShipData.memberShipPlan,
          { merge: true }
        );
      }
      // }
      //Actions.pop()
      /// dispatch(getMemberByID(memberID))
      if (byAdd === true && isMemberShipAdd === false) {
        endRequestWithNavigateSucess(Strings.alert.memberAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.addDataAlert, dispatch)
      } else if (byAdd === false && isMemberShipAdd === false) {
        if (isProfile === true) {
          dispatch(getMemberByID(memberID, isProfile))
          endRequestWithSucess(Strings.alert.profileAlertTilte, Strings.alert.profileAlertTilte + Strings.alert.updateDateAlert, dispatch)

        } else {
          endRequestWithNavigateSucess(Strings.alert.memberAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.updateDateAlert, dispatch)
        }
      } else if (byAdd === false && isMemberShipAdd === true) {
        endRequestWithNavigateSucess(Strings.alert.membershipAlertTilte, Strings.alert.membershipAlertTilte + Strings.alert.updateDateAlert, dispatch)
      } else {
        endRequest(dispatch)
      }

    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}



export const getPurchaseMemberShip = (memberID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      adminRef.collection("member").doc(memberID).collection('purchase').orderBy("createdAt", "desc").onSnapshot(snapshot => {
        const getPurchaseMemberShipData = [];
        if (!snapshot.empty) {
          snapshot.forEach(memberShip => {

            getPurchaseMemberShipData.push({
              ...memberShip.data(),
              id: memberShip.id,
              key: memberShip.id,
            });
          });

        }


        dispatch(getPurchaseMemberShipList(getPurchaseMemberShipData))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const getPurchaseMemberShipByID = (memberID, memberShipId) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection("member").doc(memberID);

      const doc = await memberRef.collection('purchase').doc(memberShipId).get();

      var purchaseMemberShipDataByID = {};
      if (doc.exists) {
        purchaseMemberShipDataByID = doc.data();
        purchaseMemberShipDataByID.id = doc.id;
        purchaseMemberShipDataByID.key = doc.id;
      }

      console.warn('doc', doc.exists);

      dispatch(getPurchaseMemberShipDataByID(purchaseMemberShipDataByID))
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const updateMember = (isMemberShipAdd, oldDocID, memberData, memberID, isUserImage, isUploadImage, oldTrainerId, isProfile) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    var task = null;
    var filename = ''
    if (isUserImage !== '' && memberData.imageUrl) {
      const { uri } = memberData.imageUrl;
      filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      task = storage().ref(filename).putFile(uploadUri);
    }


    var taskUpload = null;
    var filenameUpload = ''
    if (isUploadImage !== '' && memberData.uploadIDProof) {
      const { uri } = memberData.uploadIDProof;
      filenameUpload = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      taskUpload = storage().ref(filenameUpload).putFile(uploadUri);
    }

    try {
      if (isUserImage !== '' && memberData.imageUrl) {
        await task;
        const imgUrl = await storage().ref(filename).getDownloadURL();
        memberData.imageUrl = imgUrl;
      }
      if (isUploadImage !== '' && memberData.uploadIDProof) {
        await taskUpload;
        const imgUrl = await storage().ref(filenameUpload).getDownloadURL();
        memberData.uploadIDProof = imgUrl;
      }

      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = await adminRef.collection('member').doc(memberID).set(
        memberData,
        { merge: true }
      );

      await db().collection('users').doc(memberID).set(
        memberData,
        { merge: true }
      );


      dispatch(assignMemberToTrainer(oldTrainerId, memberData.trainerIDAssign, memberID, memberData))


      dispatch(addPurchaseMemberShip(false, oldDocID, isMemberShipAdd, memberData, memberID, isProfile))
      endRequest(dispatch)
      // endRequestWithNavigateSucess(Strings.alert.memberAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.updateDateAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const assignMemberToTrainer = (oldTrainerId, newTrainerId, memberID, memberData) => {
  return async (dispatch, getState) => {
    // startRequestNoToken(dispatch)
    try {


      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);

      await adminRef.collection('trainer').doc(newTrainerId).collection('member').doc(memberID).set(
        memberData, { merge: true }
      );
      const getMemberCount = (await adminRef.collection('trainer').doc(newTrainerId).collection('member').get()).size
      if (!getMemberCount.empty) {
        await adminRef.collection('trainer').doc(newTrainerId).set(
          { 'memberCount': getMemberCount }, { merge: true }
        )
      }
      if (oldTrainerId && oldTrainerId !== newTrainerId) {
        console.warn(' oldTrainerId', oldTrainerId, newTrainerId);

        dispatch(deletAssignMemberToTrainer(oldTrainerId, memberID))

      }

      //endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const deletAssignMemberToTrainer = (oldTrainerId, memberID) => {
  return async (dispatch, getState) => {
    //  startRequestNoToken(dispatch)
    try {


      if (oldTrainerId) {
        const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);

        await adminRef.collection('trainer').doc(oldTrainerId).collection('member').doc(memberID).delete();
        const getOldMemberCount = (await adminRef.collection('trainer').doc(oldTrainerId).collection('member').get()).size
        if (!getOldMemberCount.empty) {
          await adminRef.collection('trainer').doc(oldTrainerId).set(
            { 'memberCount': getOldMemberCount }, { merge: true })
        }
      }

      //  endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const getMember = () => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection('member').orderBy("createdAt", "desc");
      //  const memberForTarinerRef = getState().sessionReducer.user.role === Constants.trainer ? memberRef.where('trainerIDAssign', '==', trainerID) : memberRef;
      // const getRef = getState().sessionReducer.user.role === Constants.trainer ? adminRef.collection('member').where('trainerIDAssign', '==', id).orderBy("createdAt", "desc")
      // :  adminRef.collection('member').orderBy("createdAt", "desc")


      memberRef.onSnapshot(snapshot => {
        const getMemberData = [];
        if (!snapshot.empty) {

          snapshot.forEach(member => {
            if (getState().sessionReducer.user.role === Constants.trainer) {
              let trainerID = getState().sessionReducer.user.id
              if (member.data().trainerIDAssign === trainerID) {
                getMemberData.push({
                  ...member.data(),
                  id: member.id,
                  key: member.id,
                });
              }
            } else if (getState().sessionReducer.user.role === Constants.admin) {
              getMemberData.push({
                ...member.data(),
                id: member.id,
                key: member.id,
              });
            }
          });
        }
        dispatch(getMemberList(getMemberData))


      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}


export const getMemberByID = (memberID, isProfile) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const memberRef = adminRef.collection('member').doc(memberID);
      //   const doc = await memberRef.get();
      //   var member = {}
      //   if (doc.exists) {
      //      member =  doc.data();
      //     member.id= doc.id,
      //     member.key=doc.id,

      //   }

      //  dispatch(getMemberDetailByID(member))
      await memberRef.onSnapshot(snapshot => {
        var memberD = {}

        if (snapshot.data() !== undefined) {
          memberD = snapshot.data();

          memberD.id = snapshot.id;
          memberD.key = snapshot.id;

        }

        if (isProfile === true) {
          dispatch({ type: LOGIN, user: snapshot.data() })

        }
        dispatch(getMemberDetailByID(memberD))

      });
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}




export const deleteMember = (memberData) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)

    try {

      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('member').doc(memberData.id).delete();
      await db().collection('users').doc(memberData.id).delete();

      // await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection("member").doc(memberData.id).collection('purchase').delete();
      dispatch(deletAssignMemberToTrainer(memberData.trainerIDAssign, memberData.id))

      endRequest(dispatch)

      deleteRegisterUser(Strings.alert.memberAlertTilte, Strings.alert.memberAlertTilte + Strings.alert.deleteDataAlert, memberData.email, memberData.passwordHash, dispatch, getState)
      // var newData = [...getState().eventAddReducer.eventData]
      //  const prevIndex = getState().eventAddReducer.eventData.findIndex(item => item.key === eventID);
      //  newData.splice(prevIndex, 1);
      //  dispatch(getEventList(newData))
    } catch (e) {

      endRequestWithError(e, dispatch)
    }
  }
}


export const deactiveCurrentMemberShip = (memberID, oldDocID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const adminRef = db().collection('admin').doc(getState().sessionReducer.user.adminID);
      const purchaseRef = adminRef.collection('member').doc(memberID).collection('purchase');
      await purchaseRef.doc(oldDocID).update({ currentPlanStatus: 'Deactive' });
      await purchaseRef.doc(oldDocID).delete();
      endRequest(dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

export const deleteCurrentMemberShip = (memberID, oldDocID) => {
  return async (dispatch, getState) => {
    startRequestNoToken(dispatch)
    try {
      const FieldValue = db().FieldValue;
      await db().collection('admin').doc(getState().sessionReducer.user.adminID).collection('member').doc(memberID).update({
        memberShipPlan: {}
      });
      await db().collection('users').doc(memberID).update({
        memberShipPlan: {}
      });
      dispatch((deactiveCurrentMemberShip(memberID, oldDocID)))
      endRequestWithNavigateSucess(Strings.alert.membershipAlertTilte, Strings.alert.membershipAlertTilte + Strings.alert.deleteDataAlert, dispatch)
    } catch (e) {
      endRequestWithError(e, dispatch)
    }
  }
}

const getMemberList = memberData => ({
  type: GET_MEMBER,
  memberData
});

const getMemberDetailByID = memberDataByID => ({
  type: GET_MEMBER_BY_ID,
  memberDataByID
});

const getPurchaseMemberShipList = purchaseMemberShipData => ({
  type: GET_PURCAHSE_MEMBERSHIP,
  purchaseMemberShipData
});


const getPurchaseMemberShipDataByID = purchaseMemberShipDataByID => ({
  type: GET_PURCAHSE_MEMBERSHIP_BY_ID,
  purchaseMemberShipDataByID
});
// const getCheckInCheckOutMark = checkInCheckOutMark => ({
//   type: CHECK_IN_CHECK_OUT_ATTENDANCE,
//   checkInCheckOutMark
// });


// const getAttendanceList = attendanceData => ({
//   type: GET_ATTENDANCE,
//   attendanceData
// });

