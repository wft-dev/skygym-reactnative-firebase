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
      marginTop: '8%',
      marginBottom: '8%',
    },

    multilineTextSt: {
      minHeight: props.isEditBool ? 10 : 70,
      maxHeight: 'auto'  //props.isEditBool ? 'auto' : 100
    },
    userImgVwSt: {
      marginTop: '5%',
      marginBottom: '1%',

    },
    bgViewSt: {
      height: '100%',
      top: 0, left: 0, right: 0, bottom: 0
    },


  })
  )
}