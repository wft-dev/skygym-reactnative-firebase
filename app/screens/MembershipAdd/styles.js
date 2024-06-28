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
      //justifyContent: 'center'
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

    addVwSt: {
      marginTop: '25%',
      marginBottom: '8%'
    },
    viewWidthSt: {
      flex: props.isEditBool ? 1 : 0.46,
      // width: getOrientation() === "portrait" ? wp('37.2%') :wp('37.2%'),
    },
    timeVwSt: {
      flexDirection: 'row',
      marginTop: '1%',
      justifyContent: 'space-between',
    },
    multilineTextSt: {
      minHeight: props.isEditBool ? 10 : 70,
      maxHeight: 'auto'  //props.isEditBool ? 'auto' : 100
    },

  })
  )
}