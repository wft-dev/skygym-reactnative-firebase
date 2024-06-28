import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import { Colors } from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';

export default function styles(props) {
  console.log('------------addEventListener-', getOrientation())
  return (StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',

      paddingHorizontal: getOrientation() === "portrait" ? hp('4%') : wp('4%'),
      paddingBottom: getOrientation() === "portrait" ? hp('4%') : wp('4%'),
      // paddingTop: getOrientation() === "portrait" ? hp('1%') : wp('1%'),

    },
    loaderContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.7,
      backgroundColor: Colors.grayLight,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    scrollSt: {
      flex: 1,
      //height: '100%',
    },
    scrollContentSt: {
      flexGrow: 1,
      //  paddingVertical:'100%',
    },
    nameUserImageAllViewSt: {
      // flex: 1,
      // backgroundColor: Colors.red,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginTop:  getOrientation() ==="portrait" ?  hp('2%') :  wp('2%'),

      //   paddingHorizontal:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      //  paddingVertical:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
    },
    nameAddressAllViewSt: {
      flex: 1,
      // backgroundColor: Colors.green,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginRight: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      // padding :  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
    },
    nameTextViewSt: {
      // flex: 1,
      ...textFontStyles.mediumTextSemibold,
      color: Colors.black,

    },
    addressTextViewSt: {
      // flex: 1,
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
    },
    checkTextViewSt: {
      ...textFontStyles.mediumSmallTextSemibold,
      color: Colors.black,
      paddingRight: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),

    },
    leftDateTextSt: {
      ...textFontStyles.mediumSmallTextSemibold,
      color: Colors.black,
      paddingLeft: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
    },
    rightDateTextSt: {
      ...textFontStyles.mediumSmallTextSemibold,
      color: Colors.black,
      paddingRight: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
    },
    checkdateViewSt: {

      flexDirection: 'row',
      backgroundColor: Colors.grayLight,
      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginTop: getOrientation() === "portrait" ? hp('0.2%') : wp('0.2%'),
      padding: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    calenerImageSt: {
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      height: getOrientation() === "portrait" ? hp('3%') : wp('3%'),
      width: getOrientation() === "portrait" ? wp('3%') : hp('3%'),
      // backgroundColor: Colors.yellowAlphaLight,
    },
    arrowImageSt: {
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      height: getOrientation() === "portrait" ? hp('1.6%') : wp('1.6%'),
      width: getOrientation() === "portrait" ? wp('1.6%') : hp('1.6%'),
      // backgroundColor: Colors.yellowAlphaLight,
    },
    dateViewSt: {
      flexDirection: 'row',
      paddingVertical: getOrientation() === "portrait" ? hp('2.4%') : wp('2.4%'),
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
    },
    prevDateViewSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextDateViewSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageVwSt: {
      //backgroundColor: Colors.gray,
      // flex: 0.6,
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      //  height:getOrientation() ==="portrait" ?   hp('10%') :  wp('17%'),
      //  width:getOrientation() ==="portrait" ?   wp('4%') :  hp('17%'),
      //flexDirection: 'row',
      justifyContent: 'center',
      width: getOrientation() === "portrait" ? wp('17%') : hp('17%'),
      height: getOrientation() === "portrait" ? hp('17%') : wp('17%'),
      marginRight: 4,
      marginLeft: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
    },
    userImageSt: {
      //marginLeft: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      height: getOrientation() === "portrait" ? hp('9%') : wp('17%'),
      width: getOrientation() === "portrait" ? wp('18%') : hp('17%'),
      alignSelf: 'center',
      // backgroundColor: Colors.yellowAlphaLight,
      borderRadius: getOrientation() === "portrait" ? hp('2.3%') : wp('1.3%'),

    },
    grayBorderView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getOrientation() === "portrait" ? hp('0.8%') : wp('0.8%'),
      paddingHorizontal: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginBottom: getOrientation() === "portrait" ? hp('0.5%') : wp('0.5%'),

      borderWidth: 1,
      borderColor: Colors.gray,
      backgroundColor: Colors.white,
      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
    },
    checkinVwSt: {
      //justifyContent: 'space-between',
      backgroundColor: Colors.gray,
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    dateTextSt: {
      flex: 0.8,
      ...textFontStyles.mediumSmallTextSemibold,
      color: Colors.black,
      // padding:  getOrientation() ==="portrait" ?  hp('2%') :  wp('1%'),
    },
    checkinTextSt: {
      ...textFontStyles.miniSmTextMedium,
      color: Colors.black,
      textAlign: 'center',
      paddingHorizontal: getOrientation() === "portrait" ? hp('0.8%') : wp('0.8%'),
      paddingVertical: getOrientation() === "portrait" ? hp('0.3%') : wp('0.3%'),

      // padding:  getOrientation() ==="portrait" ?  hp('2%') :  wp('1%'),
    },
    dotImageSt: {
      height: getOrientation() === "portrait" ? hp('3.5%') : wp('3%'),
      width: getOrientation() === "portrait" ? wp('3.5%') : wp('3%'),
    },
    listViewSt: {
      marginBottom: 10,
      // paddingVertical:  getOrientation() ==="portrait" ?  hp('2.3%') :  wp('0.3%'),
    }

  })
  )
}