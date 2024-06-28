import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function styles(props)
{
  console.log('------------addEventListener-', getOrientation())
  return ( StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    keyboardSt: {
      flex: 1,
    },
    scrollSt: {
      flex: 1,
      //height: '100%',
    },
    scrollContentSt: {
      flexGrow: 1,
      //  paddingVertical:'100%',
    },
    containerSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: '12%',
      paddingVertical: '12%',
    },
    logoVwSt: {
      alignItems: 'center',
      justifyContent: 'center',
      //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      height:hp('15%'),
      marginBottom: getOrientation() === "portrait" ? '2%' : '4%',
    },
    loginVwSt: {
      marginTop: '8%',
    },
    memberVwSt: {
      marginTop: '6%',
    },

    logoSt: {
      // width: getOrientation() === "portrait" ? wp('24%') : wp('24%'),
      // height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      width:wp('24%'),
      height:hp('24%'),
      alignSelf: "center"
    },
    bgViewSt: {
      height: '100%',
    },
    memberTextSt: {
      textAlign: 'center',
      ...textFontStyles.largeTextSemibold,
    },
 textFiledStyle: {
  backgroundColor: Colors.white,

 },
    scrollViewSt: {
      backgroundColor: 'red',
    },

  })
  )
}