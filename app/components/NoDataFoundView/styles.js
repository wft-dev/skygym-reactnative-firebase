import { StyleSheet } from 'react-native';
import textFontStyles from '../TextFontStyle';
import { Colors } from '../../utils'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';

export default function styles(props) {
  return (StyleSheet.create({
    noDataViewSt: {
      flexDirection: 'column',
      justifyContent: 'center',
      height: props.isfullView ? '90%' : 'auto',
      paddingHorizontal: getOrientation() === "portrait" ? '1%' : '3%',
    },
    titleTextNoDataSt: {
      ...textFontStyles.largeTextMedium,
      color: Colors.yellowDark,
      textAlign: "center",

    },
    mesageTextNoDataSt: {
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.yellowDark,
      textAlign: "center",
    },

  })
  )
}