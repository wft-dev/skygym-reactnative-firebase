


import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';

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
   },
   textVwSt: {
    marginTop:'1%',
   },
  containerSt: {
    flex: 1,
    flexDirection: 'column',
    padding:'8%'
  },
  logoVwSt: {
    marginTop:'10%',
    alignItems:'center',
  },
  loginVwSt: {
    marginTop:'8%',
  },
  memberVwSt: {
    marginTop: '8%', //30,
  },
  logoSt: {
    width: '50%',
    height: '50%',
    backgroundColor: 'red',
  },
  // logoSt: {
  //   width: wp('25%'),
  //   height: hp('25%'),
  // },
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

