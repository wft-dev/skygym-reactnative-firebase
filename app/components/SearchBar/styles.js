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
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    searchBackgroundSt: {
      backgroundColor: Colors.gray,
      ...textFontStyles.mediumTextMedium,
    },
    cancelButtonSt: {
      backgroundColor: Colors.gray,
      ...textFontStyles.smallTextMedium,
    }
  })
  )
}