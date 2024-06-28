import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import { Colors } from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';

export default function styles(props) {
  return (StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      //justifyContent: 'center',
    },
    scrollSt: {
      flex: 1,
      //height: '100%',
    },
    scrollContentSt: {
      flexGrow: 1,
      //  paddingVertical:'100%',
    },
    totalMemberAllViewSt: {
      //flex: 1,
      flexDirection: 'row',
      borderColor: Colors.gray,
      borderWidth: 1,
      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginTop: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginHorizontal: getOrientation() === "portrait" ? hp('3%') : wp('6%'),
    },
    totalMemberViewSt: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: getOrientation() === "portrait" ? hp('3%') : wp('6%'),
      paddingTop: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      //padding:  getOrientation() ==="portrait" ?  hp('2%') :  wp('2%'),
    },
    paidMemberViewSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginHorizontal: getOrientation() === "portrait" ? hp('3%') : wp('6%'),
      borderColor: Colors.gray,
      borderWidth: 1,
      paddingHorizontal: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      paddingVertical: getOrientation() === "portrait" ? hp('1%') : wp('1%'),

      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
    },
    lineViewSt: {

      width: getOrientation() === "portrait" ? hp('0.1%') : wp('0.1%'),
      backgroundColor: Colors.gray,
    },
    grayTextVwSt: {
      backgroundColor: Colors.gray,
      paddingHorizontal: getOrientation() === "portrait" ? hp('2.5%') : wp('2.5%'),
      paddingVertical: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    grayTextSt: {
      ...textFontStyles.largeTextMedium,
      color: Colors.black,
      // padding:  getOrientation() ==="portrait" ?  hp('2%') :  wp('1%'),
    },
    totalTextStyle: {
      ...textFontStyles.mediumSmallTextMedium,
      paddingTop: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
      color: Colors.black,
    },
    paidtextStyle: {
      flex: 0.9,
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.black,
    },
    bigtextStyle: {
      ...textFontStyles.longTextFont,
      color: Colors.black,
      marginTop: -10,
    },
    paidUserYellowVwSt: {
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      height: getOrientation() === "portrait" ? hp('6%') : wp('6%'),
      width: getOrientation() === "portrait" ? hp('6%') : wp('6%'),
      backgroundColor: Colors.yellowAlphaLight,
      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      justifyContent: 'center',
      alignItems: 'center'
    },
    paidUserImageSt: {
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      height: getOrientation() === "portrait" ? hp('3%') : wp('3%'),
      width: getOrientation() === "portrait" ? hp('3%') : wp('3%'),
      // backgroundColor: Colors.yellowAlphaLight,
    }
  })
  )
}