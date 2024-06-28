import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors } from '../../utils';

export default function styles(props) {
  console.log('------------CustomList-', props)
  return (StyleSheet.create({
    containerMainSt: {

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
      flexDirection: 'row',
      backgroundColor: Colors.white,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.gray,
      borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.8%'),
      paddingHorizontal: getOrientation() === "portrait" ? '4%' : '3%',
      paddingVertical: getOrientation() === "portrait" ? '2.5%' : '2%',
    },


    logoVwSt: {
      flexDirection: 'column',
      marginTop: 2,
      marginRight: 6,
      //flex: getOrientation() === "portrait" ? 0.3 : 0.2,
      height: getOrientation() === "portrait" ? hp('8%') : wp('8%'),
      width: getOrientation() === "portrait" ? wp('17%') : hp('17%'),
    },

    logoSt: {
      //flex: 1,
      width: getOrientation() === "portrait" ? wp('17%') : hp('17%'),
      height: getOrientation() === "portrait" ? hp('8%') : wp('8%'),
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,

    },
    txtBtnVwSt: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      // backgroundColor:'pink',
    },
    planDueVwSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  alignItems:'center',
      flex: 1,
      // backgroundColor:'red',

    },
    planVwSt: {
      flexDirection: 'column',
      // flex: 1,
      // alignItems:'center',
      paddingRight: 8,
      // backgroundColor:'gray'
    },
    dueVwSt: {
      flexDirection: 'column',
      // justifyContent:'center',
      //justifyContent: 'flex-end',
      //alignItems:'flex-end',
      // alignContent: 'flex-end',
      flex: 1,
      // backgroundColor:'gray'
    },
    allBtnVwSt: {
      flex: 4,
      height: getOrientation() === "portrait" ? hp('4%') : wp('18%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor:'red'
    },
    btnVwSt: {
      flex: 1,
      alignItems: 'flex-start',
      marginRight: 2
    },
    textSt: {
      ...textFontStyles.mediumTextMedium,
      color: Colors.black,
      textAlign: 'left',
    },
    textYellowSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.yellowDark,
      textAlign: "left",
    },
    mobileTextBlackSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
      textAlign: "left",
    },
    textYellowVisitorSt: {
      ...textFontStyles.miniSmTextMedium,
      color: Colors.yellowDark,
      textAlign: "left",
    },
    textBlackVisitorSt: {
      ...textFontStyles.miniSmTextMedium,
      color: Colors.black,
      textAlign: "left",
    },
    textBlackSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
      textAlign: "left",
    },
    dueValueSt: {
      flex: 1,
      alignItems: 'flex-end'
    },
    memberTrainerViewSt: {
      //flex: 1,
      marginTop: -5,
      flexDirection: 'column',
      alignSelf: 'flex-start',
    },
    mainTarinerViewSt: {
      alignSelf: 'center',
    },
    tarinerViewSt: {
      backgroundColor: Colors.yellowAlphaLight,
      alignSelf: 'center',
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    tarinerValueSt: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
    },
    memberViewSt: {
      paddingHorizontal: 4,
      paddingVertical: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: Colors.gray,
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),

    },
    memberValueSt: {
      padding: 4,
      ...textFontStyles.smallTextSemibold,
      color: Colors.black,
    },
    memberCountValueSt: {
      padding: 2,
      ...textFontStyles.smallTextSemibold,
      color: Colors.black,

    },
    memberCountViewSt: {
      paddingHorizontal: 4,
      paddingVertical: 1,
      backgroundColor: Colors.white,
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),

    },
    visitorCountViewSt: {
      padding: 2,
      ...textFontStyles.mediumTextMedium,
      color: Colors.black,


    },
    visitorCountValueSt: {
      padding: 2,
      ...textFontStyles.miniSmTextMedium,
      color: Colors.black,
      alignSelf: 'flex-end',
      textAlign: 'center',

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

      paddingVertical: getOrientation() === "portrait" ? '2%' : '2%',
      marginVertical: getOrientation() === "portrait" ? '2.1%' : '1%',
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