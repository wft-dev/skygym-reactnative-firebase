import { StyleSheet } from 'react-native';
import textFontStyles from '../../components/TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
import {Colors} from '../../utlis';

export default function styles(props)
{
  return ( StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    ketBordSt: {
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
    multiTextSt: {
      minHeight: 70,maxHeight: 100 
   },
    containerSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: '12%',
      paddingVertical: '12%',
    },
    logoVwSt: {
      alignItems: 'center',
      justifyContent: 'center',
      //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      height:hp('15%'),
      marginBottom: getOrientation() === "portrait" ? '2%' : '4%',
    },
    txtBgCltSt : {
      backgroundColor:Colors.white,
    },
    backVwSt: {
      marginTop: '8%',
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingHorizontal: '1%',
    },
    doneBtSt: {
      marginTop: getOrientation() === "portrait" ? '12%' : '8%',
    },
    bgViewSt: {
      height: '100%',
    },
    memberTextSt: {
      textAlign: 'center',
      ...textFontStyles.largeTextSemibold,
    },
  })
  )
}