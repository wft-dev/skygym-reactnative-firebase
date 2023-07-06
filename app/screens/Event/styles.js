import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
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
      //justifyContent: 'center',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
    },
    timeVwSt: {
      flexDirection: 'row',
      marginTop: '1%',
      // justifyContent : props.isEditBool ? 'flex-start' : 'space-between',
      justifyContent: 'space-between',
    },
    addVwSt: {
      marginTop: '15%',
    },
    viewWidthSt: {
      flex: props.isEditBool ? 1 : 0.46,
      width: getOrientation() === "portrait" ? wp('37.2%') : wp('37.2%'),
      // width: getOrientation() === "portrait" ? props.isEditBool ? wp('42.2%') : wp('37.2%') :props.isEditBool ? wp('42.2%') : wp('37.2%'),
    },
    multilineTextSt: {
      minHeight: props.isEditBool ? 10 : 70,
      maxHeight: 'auto' //props.isEditBool ? 'auto' : 100
    },
  })
  )
}