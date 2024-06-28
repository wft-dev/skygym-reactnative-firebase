//import Firebase, { db }  from '../../enviroments/firebase';
import db from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UPDATE_EMAIL,UPDATE_PASSWORD, LOGIN, SIGNUP } from '../actionTypes';
import {startRequestNoToken, endRequest}  from '../../actions/loader/actions';

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

export const loginUser1 = (email, password) => (dispatch)=> {
  // const user =  db
  // .collection('Admin')
  //   .doc('xqamuJzYnigyuc5VmXj32QVvR033')
  //   .collection('Member')
  //   .add({
  //     memberFirstName : 'Room',
  //     memberLastName : 'test',
  //     createdAt: new Date().getTime(),
  //     memberId: 2,
  //   });

    // const unsubscribe = db
    // .collection('Member')
    // .onSnapshot(querySnapshot => {
    //   console.log("querySnapshot", querySnapshot.size);
    //   const threads = querySnapshot.docs.map(documentSnapshot => {
    //     console.log("documentSnapshot",  documentSnapshot.data());
    //   });

      
    // });
    const user =   db.collectionGroup('MemberShip').get().then(querySnapshot => {
   // console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });

  const citiesRef = db.collectionGroup('MemberShip');
   citiesRef.where('PlanNew', '==', '1222').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
   });
 
   db.collection("users").doc("frank").update({
    'favorites.color': 'ye'
  }).then(function() {
    console.log("Frank food updated");
  });
  

  // db.collection("users").doc("frank").set({
  //   name: "Frank",
  //   favorites: {
  //     food: "Pizza",
  //     color: "Blue",
  //     subject: "Recess"
  //   },
  //   age: 12
  // }).then(function() {
  //   console.log("Frank created");
  // });
  
    // db
    // .collection('THREADS')
    // .add({
    //   name: 'roomName',
    //   latestMessage: {
    //     text: `You have joined the room .`,
    //     createdAt: new Date().getTime()
    //   }
    // })
    // .then(docRef => {
    //   docRef.collection('MESSAGES').add({
    //     text: `You have joined the room .`,
    //     createdAt: new Date().getTime(),
    //     system: true
    //   });
    // });
}

getDoc = () => {
  firestore()
  .collection('Admin')
  .doc('ABC')
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);
    if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());
    }
  });
}

getCollec = () => {
  firestore()
  .collection('Admin')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
}

export const getMembership = () => (dispatch)=> {
  const user =  db
  .collection('Admin').doc('xqamuJzYnigyuc5VmXj32QVvR033')
  .get()
  .then(documentSnapshot => {
    console.log('Total users: ', documentSnapshot.size);
    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
}

export const loginUser = (email, password) => (dispatch)=> {
  dispatch(sessionLoading());
  startRequestNoToken(dispatch)
  auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      const uid = response.user.uid
      const data = {
          id: uid,
          email,
      
      };
      const usersRef = db.collection('Admin')
                usersRef.doc(uid)
                    .set(data)
                    .then(() => {

                       // navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
      endRequest(dispatch)
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      endRequest(dispatch)
      dispatch(sessionError(error.message));
    });
};


export const login11 = () => {

	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await auth().signInWithEmailAndPassword(email, password)

			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser11 = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch(logInSuccess(user.data()))
		} catch (e) {
			alert(e)
		}
	}
}

export const signup11 = () => {
	return async (dispatch, getState) => {
   

		try {
      const { email, password } = getState().user
			const response = await auth().createUserWithEmailAndPassword(email, password)
			if (response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email
				}

				db.collection('users')
					.doc(response.user.uid)
					.set(user)

				dispatch({ type: SIGNUP, payload: user })
			}
		} catch (e) {
			alert(e)
		}
	}
}


export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());

  Firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});


const logInSuccess = user => ({
  type: SIGNUP,
  user
});

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
});

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});
