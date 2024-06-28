import { combineReducers } from 'redux';
import sessionReducer from '../reducers/session/sessionReducer';
import isLoginReducer from '../reducers/isLogin/isLoginReducer';
import loaderReducer from '../reducers/loader/loaderReducer';
import eventAddReducer from '../reducers/eventAdd/eventAddReducer';
import editOnReducer from '../reducers/editOn/editOnReducer';
import memberShipReducer from '../reducers/memberShip/memberShipReducer';
import visitorReducer from '../reducers/visitor/visitorReducer';
import trainerReducer from '../reducers/trainer/trainerReducer';
import memberReducer from '../reducers/member/memberReducer';
import attendanceReducer from '../reducers/attendance/attendanceReducer';
import gymInfoReducer from '../reducers/gymInfo/gymInfoReducer';

const rootReducer =  combineReducers({
    sessionReducer : sessionReducer,
    isLoginReducer:isLoginReducer,
    loaderReducer : loaderReducer,
    eventAddReducer: eventAddReducer,
    editOnReducer: editOnReducer,
    memberShipReducer : memberShipReducer,
    visitorReducer: visitorReducer,
    trainerReducer: trainerReducer,
    memberReducer: memberReducer,
    attendanceReducer:attendanceReducer,
    gymInfoReducer:gymInfoReducer,
})

export default rootReducer;