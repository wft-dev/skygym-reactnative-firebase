//import Firebase, { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { LOGIN_SUCESS, LOGIN, SIGNUP } from '../actionTypes';
import { startRequestNoToken, endRequest, endRequestWithError, endRequestWithSucess } from '../loader/loaderAction';
import { Actions } from 'react-native-router-flux'
//import {auth} from 'firebase';
import { Strings } from '../../utils';
import md5 from 'md5';

export const restoreSession = () => dispatch => {
	dispatch(sessionLoading());
	dispatch(sessionRestoring());
	auth().onAuthStateChanged(user => {
		if (user) {
			dispatch(sessionSuccess(user));
		} else {
			dispatch(sessionLogout());
		}
	});
};

export const loginMemberTrainer = (id, email, password) => {
	return async (dispatch, getState) => {
		console.warn('sessionReducer', id, email, md5('123456789'));

		startRequestNoToken(dispatch)
		try {
			const getUsers = await db().collection('users').where('id', '==', id).where('email', '==', email).where('passwordHash', '==', md5(password)).get();

			if (!getUsers.empty) {
				var userId = ''
				var userData = ''
				getUsers.forEach(doc => {
					userId = doc.id;
					userData = doc.data();
				});
				if (userId == id) {
					const response = await auth().signInWithEmailAndPassword(email, md5(password))
					dispatch(getLoginUserData(userData))
					dispatch(isLogInSuccess(true))

					endRequest(dispatch)


				} else {
					endRequestWithError('Gym Id, Password, Email should be correct', dispatch)
				}
			} else {
				endRequestWithError('Gym Id, Password, Email should be correct', dispatch)
			}

		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}

export const login = (email, password) => {
	return async (dispatch, getState) => {

		startRequestNoToken(dispatch)
		try {
			const response = await auth().signInWithEmailAndPassword(email, md5(password))
			endRequest(dispatch)
			dispatch(getUser(response.user.uid, Actions.currentScene))
			dispatch(isLogInSuccess(true))

		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}

export const getUser = (uid, screenType) => {
	return async (dispatch, getState) => {
		startRequestNoToken(dispatch)
		try {
			const user = await db()
				.collection('admin')
				.doc(uid)
				.get()
			dispatch(getLoginUserData(user.data()))
			endRequest(dispatch)

		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}


export const updateUser = (userData, isProfileImage) => {
	return async (dispatch, getState) => {
		startRequestNoToken(dispatch)
		var task = null;
		var filename = ''
		if (isProfileImage !== '' && userData.imageUrl) {
			const { uri } = userData.imageUrl;
			filename = uri.substring(uri.lastIndexOf('/') + 1);
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
			task = storage().ref(filename).putFile(uploadUri);
		}

		try {
			if (isProfileImage !== '' && userData.imageUrl) {
				await task;
				const imgUrl = await storage().ref(filename).getDownloadURL();
				userData.imageUrl = imgUrl;
			}
			await db().collection('admin').doc(getState().sessionReducer.user.adminID).set(
				userData,
				{ merge: true }
			);
			dispatch(getUser(getState().sessionReducer.user.adminID))

			endRequestWithSucess(Strings.alert.profileAlertTilte, Strings.alert.profileAlertTilte + Strings.alert.updateDateAlert, dispatch)
		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}

reauthenticate = (email, currentPassword) => {
	var user = auth().currentUser;
	var cred = auth.EmailAuthProvider.credential(email, currentPassword);
	return user.reauthenticateWithCredential(cred);
}

export const changePassword = (type, id, email, currentPassword, newPassword) => (dispatch, getState) => {
	startRequestNoToken(dispatch)
	// Firebase
	// .auth()
	// .signOut()
	//if (type == 'member') {
	console.warn(type, id, email, currentPassword, newPassword);
	auth().signInWithEmailAndPassword(email, md5(currentPassword)).then(() => {
		var user = auth().currentUser;
		user.updatePassword(md5(newPassword)).then(() => {
			if (type == 'member' || type == 'trainer') {
				db().collection('admin').doc(getState().sessionReducer.user.adminID).collection(type).doc(id).update({
					passwordHash: md5(newPassword)
				});
				db().collection('users').doc(id).update({
					passwordHash: md5(newPassword)
				});
				auth().signInWithEmailAndPassword(getState().sessionReducer.user.email, getState().sessionReducer.user.passwordHash).then(function (usercred) {
					endRequestWithSucess(Strings.alert.changePasswordAlertTilte, Strings.alert.changePasswordAlert, dispatch)
				}).catch(function (error) {
					endRequestWithError(error, dispatch)
				});
			}
			else {
				endRequestWithSucess(Strings.alert.changePasswordAlertTilte, Strings.alert.changePasswordAlert, dispatch)
			}


		}).catch((error) => { endRequestWithError(error, dispatch) });
	}).catch((error) => { endRequestWithError(error, dispatch) });
	//	}
	// var puser = Firebase.auth().currentUser;
	// var cred = auth.EmailAuthProvider.credential(email, md5(currentPassword));
	// puser.reauthenticateWithCredential(cred).then(() => {
	//   var user = Firebase.auth().currentUser;
	//   user.updatePassword(md5(newPassword)).then(() => {
	// 	  if (type == 'member') {
	// 	 db.collection('admin').doc(getState().sessionReducer.user.adminID).collection('member').doc(id).update({
	// 		passwordHash : md5(newPassword)
	// 	  });
	// 	  Firebase.auth().signOut()
	// 	  prevUser.linkWithCredential(credential)
	// 	}
	// 	var user = Firebase.auth().currentUser;
	// 	endRequestWithSucess(Strings.alert.changePasswordAlertTilte, Strings.alert.changePasswordAlert, dispatch)
	//   }).catch((error) => { endRequestWithError(error, dispatch) });
	// }).catch((error) => {
	// 	 endRequestWithError(error, dispatch) });
}


// 	var admin = require('firebase-admin');
// admin
//   .auth()
//   .deleteUser(email)
//   .then(() => {
//   })
//   .catch((error) => {
//   });


export const deleteRegisterUser = (title, message, email, password, dispatch, getState) => {
	startRequestNoToken(dispatch)
	// var user = Firebase.auth().currentUser;
	// var cred = auth.EmailAuthProvider.credential(email, password);
	// user.reauthenticateWithCredential(cred).then(() => {
	auth().signInWithEmailAndPassword(email, password).then(() => {
		var user = auth().currentUser;
		user.delete().then(() => {
			auth().signInWithEmailAndPassword(getState().sessionReducer.user.email, getState().sessionReducer.user.passwordHash).then(function (usercred) {
				endRequestWithSucess(title, message, dispatch)

			}).catch(function (error) {
				endRequestWithError(error, dispatch)
			});
		}).catch((error) => {
			endRequestWithError(error, dispatch)
		});
	}).catch((error) => {

		endRequestWithError(error, dispatch)
	});
}


//   export const handlePasswordReset = async (values, actions) => {
// 	const { email } = values;

// 	try {
// 	  await this.props.firebase.passwordReset(email);
// 	  console.log('Password reset email sent successfully');
// 	  this.props.navigation.navigate('Login');
// 	} catch (error) {
// 	  actions.setFieldError('general', error.message);
// 	}
//   };
export const signup = (gymName, gymId, gymAddress, firstName, lastName, gender,
	email, mobileNumber, password, dob) => {
	return async (dispatch, getState) => {
		startRequestNoToken(dispatch)

		try {

			const response = await auth().createUserWithEmailAndPassword(email, md5(password))
			if (response.user.uid) {
				const user = {
					adminID: response.user.uid,
					email: email,
					gymName: gymName,
					gymID: gymId,
					gymAddress: gymAddress,
					gymTimings: '',
					gymDays: '',
					firstName: firstName,
					lastName: lastName,
					name: firstName + ' ' + lastName,
					gender: gender,
					mobileNumber: mobileNumber,
					dob: dob,
					loginType: 'admin',
					createdAt: new Date(),
					passwordHash: md5(password),
					role: Constants.admin,
					id: response.user.uid,

				}

				db.collection('admin')
					.doc(response.user.uid)
					.set(user)

				dispatch(getSignupUserData(user))
				dispatch(isLogInSuccess(true))
				endRequest(dispatch)
				Actions.drawerMenu()
			}
		} catch (e) {
			endRequestWithError(e, dispatch)
		}
	}
}


export const logoutUser = () => dispatch => {
	startRequestNoToken(dispatch)
	auth()
		.signOut()
		.then(() => {
			dispatch(getLoginUserData({}))
			dispatch(getSignupUserData({}))

			dispatch(isLogInSuccess(false))
			endRequest(dispatch)
			Actions.popTo('login')
		})
		.catch(e => {
			endRequestWithError(e, dispatch)
		});
};

const sessionRestoring = () => ({
	type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
	type: types.SESSION_LOADING
});


const getLoginUserData = user => ({
	type: LOGIN,
	user
});

const isLogInSuccess = isLogin => ({
	type: LOGIN_SUCESS,
	isLogin
});

const sessionSuccess = user => ({
	type: types.SESSION_SUCCESS,
	user
});

const getSignupUserData = user => ({
	type: SIGNUP,
	user
});


