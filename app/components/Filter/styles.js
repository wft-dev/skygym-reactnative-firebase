import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors } from '../../utils';

export default function styles(props) {
  console.log('------------addEventListener-', getOrientation())
  return (StyleSheet.create({
    containerMainSt: {
      // flex: 1,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: Colors.gray,
      borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.8%'),
      borderWidth: 1,
      //height: getOrientation() === "portrait" ? hp('6%') : wp('6%'),
      backgroundColor: Colors.gray,
      padding: getOrientation() === "portrait" ? hp('0.8%') : wp('0.8%'),

    },
    btnStyle: {
      height: getOrientation() === "portrait" ? hp('5%') : wp('6%'),
      width: getOrientation() === "portrait" ? wp('5%') : hp('6%'),
    },
    textStyle: {
      ...textFontStyles.mediumTextMedium,
      padding: 8,
    },

  })
  )
}