import { StyleSheet } from 'react-native';
import textFontStyles from '../../TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors } from '../../../utils';

export default function styles(props) {
  console.log('------------CustomList-', props)
  return (StyleSheet.create({
    containerMainSt: {
      //flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      // paddingHorizontal: getOrientation() ==="portrait" ?  '4%' : '8%',
      //  paddingVertical: getOrientation() ==="portrait" ? '2%': '1%',
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
    bgVwSt: {
      flex: 1,
      // paddingHorizontal: '4%',
      paddingVertical: getOrientation() === "portrait" ? '2%' : '1%',
    },
    borderVwSt: {
      // flexDirection: 'column',
      backgroundColor: Colors.white,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.gray,
      borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.8%'),
      paddingHorizontal: getOrientation() === "portrait" ? '5%' : '3%',
      paddingVertical: getOrientation() === "portrait" ? '3%' : '2%',
    },
    detailViewSt: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      // backgroundColor:'pink',
    },

    txtBtnVwSt: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      // backgroundColor:'pink',
    },
    nameAddressVwSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  alignItems:'center',
      flex: 1,
      // backgroundColor:'red',

    },
    nameVwSt: {
      flexDirection: 'column',
      flex: 1,
      // alignItems:'center',
      paddingRight: 8,
      // backgroundColor:'gray'
    },
    evenVwSt: {
      flexDirection: 'column',
      flex: 1,
      marginRight: 20,
      // backgroundColor:'gray'
    },
    eventDateTimeVwSt: {
      flexDirection: 'row',
      //  alignItems:'center',
      // flex: 1,
      // backgroundColor:'red',

    },
    textSt: {
      ...textFontStyles.largeTextMedium,
      color: Colors.black,
      textAlign: 'left',
    },
    textYellowSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.yellowDark,
      textAlign: "left",
    },
    timeTextBlackSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
      textAlign: "left",
    },
    addressTextBlackSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
      textAlign: "left",
    },

    textBlackSt: {
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.black,
      //textAlign: "left",
      flex: 1,
      paddingVertical: 4,
    },
    greenTextViewSt: {
      backgroundColor: Colors.green,
      alignItems: 'center',
      alignSelf: 'flex-end',
      borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),


    },


    greenTextValueSt: {
      paddingHorizontal: 8,
      paddingVertical: 1,
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.white,

    },

    dueValueSt: {
      flex: 1,
      alignItems: 'flex-end'
    },
    tarinerViewSt: {
      backgroundColor: Colors.yellowAlphaLight,
      alignSelf: 'flex-start',
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    tarinerValueSt: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontWeight: "bold",
      // ...textFontStyles.smallTextSemibold,
      color: Colors.black,
    },
    detailMSPMainView: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    detailMSPLeftView: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    detailMSPRightView: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    nameValueSt: {
      //flex: 1,
    },
    backTextWhite: {
      color: '#FFF',
    },

    rowBack: {
      alignItems: 'center',
      backgroundColor: Colors.red,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',

      paddingVertical: getOrientation() === "portrait" ? '1%' : '2%',
      marginVertical: getOrientation() === "portrait" ? '2.5%' : '1%',
      borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.8%'),
      marginLeft: getOrientation() === "portrait" ? 25 : 30,

    },
    backRightBtn: {
      alignItems: 'center',
      //bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      //top: 0,
      width: getOrientation() === "portrait" ? 175 : 175,
      flex: 1,
      //left: 250,

    },
    backRightBtnLeft: {
      //backgroundColor: 'blue',
      right: 0,

    },

    trash: {
      height: getOrientation() === "portrait" ? 25 : 30,
      width: getOrientation() === "portrait" ? 25 : 30,
    },
  })
  )
}