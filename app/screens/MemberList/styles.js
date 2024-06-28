import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import { Colors, Constants } from '../../utils';

export default function styles(props) {
  console.log('------------addEventListener-', getOrientation())
  return (StyleSheet.create({
    mainViewSt: {
      flex: 1,
    },
    containerMainSt: {
      flex: 1,
      // flexDirection: 'column',
      // alignContent:'center',
      // justifyContent: 'center',
      //paddingLeft: getOrientation() ==="portrait" ?  '4%' : '8%',
      //paddingRight: getOrientation() ==="portrait" ?  '4%' : '8%',

      paddingHorizontal: getOrientation() === "portrait" ? '4.5%' : '8%',

    },
    marginSearchView: {
      marginTop: 10,

    },
    marginFilterView: {
      marginTop: 10,

    },
    marginListView: {
      marginTop: 10,

    },

    navGrayBarSt: {
      backgroundColor: Colors.gray,
      ...navStyleForIos,
    },
    navBarWhiteSt: {
      backgroundColor: Colors.white,
      ...navStyleForIos,
    },

  })
  )
}
const navStyleForIos = {
  ...Platform.select({
    ios: {
      //  marginTop: StatusBar.currentHeight
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  })
}