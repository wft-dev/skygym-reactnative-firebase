import { StyleSheet } from 'react-native';
import { Colors } from '../../utils'
import textFontStyles from '../../components/TextFontStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  getOrientation
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.white
  },
  navStyleForIos: {
    ...Platform.select({
      ios: {
        //  marginTop: StatusBar.currentHeight
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    })
  },
  barButtonTextStyle: {
    ...textFontStyles.largeTextMedium,
    color: Colors.dark_black,
  },
  draweWidthSt: {
    //width:  getOrientation() === "portrait" ? wp('37.1%') : wp('37.1%'),
    width: 315,
  },
  backImageSt: {
    flex: 1,
    marginLeft: 30,
    width: getOrientation() === "portrait" ? wp('6%') : hp('37.1%'),
    height: getOrientation() === "portrait" ? hp('8%') : wp('37.1%'),
  },
  menuIconSt: {
    marginLeft: 30,
  },
  rightBtnIconSt: {
    marginRight: 30,
  },
  bgViewSt: {
    height: '100%',
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  },
});
