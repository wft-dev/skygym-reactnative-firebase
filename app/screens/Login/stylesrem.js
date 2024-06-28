import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
    containerMainSt: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
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
       // flex: 1,
        alignItems:'center',
        justifyContent:'center',
       // marginTop:12,
        height: '15%',
       // backgroundColor: 'red',


      },
      loginVwSt: {
        marginTop:'8%',
      },
      memberVwSt: {
        marginTop:'7%',
      },
      textVwSt: {
        flex: 0.4,
       // flex: 0.4,
        // flexDirection: 'column',
        // justifyContent:'center',
      },
      logoSt: {
        width: '70%',
        height: '70%',
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
