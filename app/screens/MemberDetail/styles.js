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
      //justifyContent: 'center',
      paddingHorizontal: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      marginTop: 2,

    },
    scrollSt: {
      flex: 1,
      //height: '100%',
    },
    scrollContentSt: {
      flexGrow: 1,
      //  paddingVertical:'100%',
    },
    bgVwSt: {
      // flex:1,
      paddingVertical: getOrientation() === "portrait" ? '2%' : '1%',
    },
    borderVwSt: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      flex: 1,
      // borderWidth: 1 ,
      // borderColor:  Colors.gray,
      // borderRadius: getOrientation() ==="portrait" ?  hp('1.4%') :  wp('1.8%'),
      // paddingHorizontal:getOrientation() ==="portrait" ?  '4%' : '3%',
      paddingVertical: getOrientation() === "portrait" ? '2.5%' : '2%',
    },
    allBtnVwSt: {
      //  flex:4,
      //  height:getOrientation() === "portrait" ?hp('4%'): wp('18%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: Colors.gray,
      borderColor: Colors.gray,
      borderTopWidth: 1,
      marginTop: 20,

      // backgroundColor:'red'
    },
    btnVwSt: {
      flex: 1,
      alignItems: 'flex-start',
      marginRight: 2
    },
    logoVwSt: {
      //flex: 0.3,
      flexDirection: 'row',
      //flexDirection: 'column',
      // backgroundColor: Colors.red,
      //alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginRight: 12,
      //  marginTop: 2,
      // flex:getOrientation() === "portrait" ? 0.3 :  0.2,
      // height:getOrientation() === "portrait" ?hp('9%'): wp('9%') ,
      // width:getOrientation() === "portrait" ?wp('9%'): hp('9%') ,
    },
    logoSt: {
      // alignSelf:'flex-start',
      // marginLeft: -14,
      width: getOrientation() === "portrait" ? wp('20%') : hp('18%'),
      height: getOrientation() === "portrait" ? hp('9%') : wp('18%'),
      borderRadius: getOrientation() === "portrait" ? hp('2.3%') : wp('1.3%'),
    },
    txtBtnVwSt: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      // backgroundColor:'pink',
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
    memberViewSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginTop: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      //  marginHorizontal: getOrientation() === "portrait" ? hp('3%') : wp('6%'),
      borderColor: Colors.gray,
      //  backgroundColor: Colors.gray,
      // borderWidth: 1,
      paddingVertical: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      borderTopWidth: 1,
      // borderRadius: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
    },
    lineViewSt: {
      width: getOrientation() === "portrait" ? hp('0.1%') : wp('0.1%'),
      backgroundColor: Colors.gray,
    },
    mainVwSt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //  alignItems:'center',
      flex: 1,
      // backgroundColor:'red',

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
    arrowImageSt: {
      // padding:  getOrientation() ==="portrait" ?  hp('1%') :  wp('1%'),
      height: getOrientation() === "portrait" ? hp('2%') : wp('2%'),
      width: getOrientation() === "portrait" ? wp('2%') : hp('2%'),
      // backgroundColor: Colors.yellowAlphaLight,
    },
    nameVwSt: {
      flexDirection: 'column',
      // justifyContent: 'center',
      flex: 1,
      // alignItems:'center',
      paddingRight: 8,
      // backgroundColor:'gray'
    },
    mobileTextBlackSt: {
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
      textAlign: "left",
    },
    paidStatusViewSt: {
      backgroundColor: Colors.yellowAlphaLight,
      alignSelf: 'flex-start',
      borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
    },
    paidValueSt: {
      paddingHorizontal: 12,
      paddingVertical: 2,
      ...textFontStyles.smallTextMedium,
      color: Colors.black,
    },
    memberTxtStyle: {
      ...textFontStyles.largeTextMedium,
      color: Colors.black,
    },
    nameTextSt: {
      ...textFontStyles.mediumTextSemibold,
      color: Colors.black,
      textAlign: 'left',
    },
  })
  )
}