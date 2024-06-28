import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors } from '../../utils/index';

export default function styles(props) {
  console.log('------------addEventListener-', getOrientation())
  return (StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
      // justifyContent: 'center',
    },
    keyBordSt: {
      flex: 1,
      //paddingBottom: '112%',


      // justifyContent: 'flex-end',
      // paddingHorizontal: 10,
      // paddingVertical: 3,
      // backgroundColor: Colors.red,
    },
    scrollSt: {
      flex: 1,

      //height: '100%',
      // backgroundColor: Colors.gray,
    },
    scrollContentSt: {
      flexGrow: 1,
      // paddingBottom: '412%',
    },
    containerSt: {
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'flex-end',
      //justifyContent: 'center',
      paddingHorizontal: '8%',
      marginTop: 30,
      //paddingVertical: '2%',
    },
    leftRightVwSt: {
      flexDirection: 'row',
      marginTop: '1%',
      justifyContent: 'space-between',
    },

    viewWidthSt: {
      flex: props.isEditBool ? 1 : 0.46,
      // width: getOrientation() === "portrait" ? wp('38%') :wp('38%'),
    },
    addVwSt: {
      marginTop: props.selectedTrainerData ? '2%' : '8%',
      marginBottom: '8%',
    },
    attendanceVwSt: {
      marginTop: '8%',
      // marginBottom: '1%',
    },

    multilineTextSt: {
      minHeight: props.isEditBool ? 10 : 70,
      maxHeight: 'auto'  //props.isEditBool ? 'auto' : 100
    },
    userImgVwSt: {
      alignSelf: 'center',
      justifyContent: 'center',
      //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      width: wp('24%'),
      height: hp('12%'),
      marginBottom: getOrientation() === "portrait" ? '2%' : '4%',
      // backgroundColor: Colors.yellow,

    },
    bgViewSt: {
      height: '100%',
      top: 0, left: 0, right: 0, bottom: 0
    },
    userImgSt: {
      // width: getOrientation() === "portrait" ? wp('24%') : wp('24%'),
      // height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      width: wp('24%'),
      height: hp('24%'),
      alignSelf: "center",

    },
    camImgVwSt: {
      alignSelf: 'flex-start',
      // width: getOrientation() === "portrait" ? 40 : 40,
      // height:getOrientation() === "portrait" ? 40 : 40,
      width: getOrientation() === "portrait" ? wp('8%') : wp('24%'),
      height: getOrientation() === "portrait" ? hp('4%') : hp('24%'),
      backgroundColor: Colors.yellow,
      borderRadius: getOrientation() === "portrait" ? 20 : 20,
      position: 'absolute',
      right: -20,
      bottom: 0,
      justifyContent: 'center',

    },
    camImgSt: {
      width: getOrientation() === "portrait" ? wp('4%') : wp('24%'),
      height: getOrientation() === "portrait" ? hp('4%') : hp('24%'),
      alignSelf: "center",
      // width: getOrientation() === "portrait" ?  20  :  20 ,
      // height:getOrientation() === "portrait" ? 20 :  20 ,

    },
  })
  )
}