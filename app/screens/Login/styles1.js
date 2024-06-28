import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
 
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
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
    justifyContent:'center',
    paddingHorizontal:'12%',
    paddingVertical:'12%',
  },
  logoVwSt: {
    alignItems:'center',
    justifyContent:'center',
  },
  loginVwSt: {
    marginTop:'8%',
  },
  memberVwSt: {
    marginTop:'6%',
  },
  
  logoSt: {
    width: hp('23%'),
    height: wp('23%'),
    alignSelf:"center"
  },
  bgViewSt: {
    height: '100%',
  },
  memberTextSt: {
    textAlign : 'center',
    ...textFontStyles.largeTextSemibold,
  },
  
  scrollViewSt: {
    backgroundColor: 'red',
  },

});
