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
      justifyContent: 'center',
      paddingVertical: getOrientation() === "portrait" ? '2%' : '1%',
    },
    bgVwSt: {
      flex: 1,
      paddingHorizontal: '4%',
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
    scrollSt: {
      flex: 1,
      //height: '100%',
    },
    detailMSPMainView: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    detailMSPLeftView: {
      flex: 1,
      flexDirection: 'row',
      //alignItems : 'flex-start',
      justifyContent: 'space-between',
    },
    detailMSPRightView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    greenTextSt: {
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.green,
      textAlign: 'right',
      flex: 1,
      paddingVertical: 4,
    },
    textBlackLeftSt: {
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.black,
      textAlign: "left",
      flex: 1,
      paddingVertical: 4,
    },
    textBlackRightSt: {
      ...textFontStyles.mediumSmallTextMedium,
      color: Colors.black,
      textAlign: 'right',
      flex: 1,
      paddingVertical: 4,
    }

  })
  )
}