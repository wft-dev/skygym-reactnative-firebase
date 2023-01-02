import { Dimensions, Platform } from 'react-native';
import colors from './colors';
let headerHeight = Platform.OS === 'ios' ? 66 : 46;
let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

let footerHeight = 55;
const constants = {
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  viewHeight: Dimensions.get('window').height - headerHeight,
  viewPadding: 15,
  defaultSpacer: 10,
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  divider: {backgroundColor: colors.smoke},
  statusBarHeight: statusBarHeight,
  loginCapText: "LOGIN",
  login: "Login",
  registrationText: "Registration",
  eventName : 'Event Name',
  eventDate : 'Event Date',
  address: 'Address',
  eventStartTime: 'Event Start Time',
  eventEndTime: 'Event End Time',
  genderType : [{id: '0',name: 'Male'},{id: '1',name: 'Female'}],
  paymentType : [{id: '0',name: 'Cash'},{id: '1',name: 'Card'}],
  gymDays: [{id: '0',name: 'Sunday'},{id: '1',name: 'Monday'},{id: '2',name: 'Tuesday'},{id: '3',name: 'Wednesday'},{id: '4',name: 'Thursday'}
  ,{id: '5',name: 'Friday'},{id: '6',name: 'Saturday'}],
  trainer: 'trainer',
  member: 'member',
  admin: 'admin'

};


export default constants;