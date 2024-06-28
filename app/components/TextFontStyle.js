import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Fonts } from '../utils';
const longText = '6%'//18;
const bigText = '2.5%'//18;
const largeText = '2.1%'//18;
const mediumText = '1.9%'//16;
const errorText = '2%'//14;
const mediumSmall = '1.8%'//9;
const smallText = '1.4%'//9;
const miniText = '1.19%'//7;
const miniSmText = '1.1%'//7;
const mediumFont = Fonts.poppinsMedium;
const semiboldFont = Fonts.poppinsSemiBold;

const textFontStyles = StyleSheet.create({
  longTextFont: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(longText) : wp(longText),
  },
  bigTextFont: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(bigText) : wp(bigText),
  },
  largeTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(largeText) : wp(largeText),
  },
  largeTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(largeText) : wp(largeText),
  },
  mediumTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(mediumText) : wp(mediumText),
  },
  mediumTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(mediumText) : wp(mediumText),
  },
  mediumSmallTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(mediumSmall) : wp(mediumText),
  },
  mediumSmallTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(mediumSmall) : wp(mediumSmall),
  },
  smallTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(smallText) : wp(smallText),
  },
  smallTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(smallText) : wp(smallText),
  },
  miniTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(miniText) : wp(miniText),
  },
  miniTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(miniText) : wp(miniText),
  },
  errorTextSemibold: {
    fontFamily: semiboldFont,
    fontSize: getOrientation() === "portrait" ? hp(errorText) : wp(errorText),
  },
  miniSmTextMedium: {
    fontFamily: mediumFont,
    fontSize: getOrientation() === "portrait" ? hp(miniSmText) : wp(miniSmText),
  },
});
export default textFontStyles;