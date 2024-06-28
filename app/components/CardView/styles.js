import { StyleSheet } from 'react-native';
import textFontStyles from '../TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';

export default function styles(props)
{
  console.log('------------addEventListener-', getOrientation())
  return ( StyleSheet.create({
    containerMainSt: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
   
    containerSt: {
      flex: 1,
      // flexDirection: 'column',
      // justifyContent: 'center',
      paddingHorizontal: '12%',
      paddingVertical: getOrientation() === "portrait" ? '12%' : '5%' ,
    },
    logoVwSt: {
      flexDirection: 'row',
      //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      height:hp('15%'),
     // marginBottom: getOrientation() === "portrait" ? '2%' : '4%',
    },
    btnVwSt: {
      marginTop: getOrientation() === "portrait" ? '4%' : '3%' ,
      alignSelf:'flex-start',
      marginBottom: getOrientation() === "portrait" ? '4%' : '1%' ,
    },
    
    logoSt: {
      // width: getOrientation() === "portrait" ? wp('24%') : wp('24%'),
      // height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
      width:wp('15%'),
      height:hp('15%'),
      alignSelf:'flex-start',
    },
    bgViewSt: {
      height: '100%',
    },
    textSt: {
      //textAlign: 'center',
      ...textFontStyles.bigTextFont,
      alignSelf: "center",
      marginLeft: getOrientation() === "portrait" ? '10%' : '1%' ,
    },
   
    
  })
  )
}