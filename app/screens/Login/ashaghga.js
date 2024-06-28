import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import { Fonts } from '../../utils';

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
  containerSt: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 40,
  },
  logoVwSt: {
    marginTop: '40%',
    alignItems: 'center',
    height: '20%',

  },
  loginVwSt: {
    marginTop: 20,
  },
  memberVwSt: {
    marginTop: 30,
  },

  logoSt: {
    width: '20%',
    height: '20%',
  },
  bgViewSt: {
    height: '100%',
  },
  memberTextSt: {
    textAlign: 'center',
    ...textFontStyles.largeTextSemibold,
  },

  scrollViewSt: {
    backgroundColor: 'red',
  },

});
