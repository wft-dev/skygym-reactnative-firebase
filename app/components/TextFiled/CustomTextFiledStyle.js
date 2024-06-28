import {StyleSheet} from 'react-native';
import  {Colors } from '../../utils'
import textFontStyles from '../TextFontStyle';
const CELL_HEIGHT = 60;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,percentageToAllDP  as pap, getOrientation
} from 'react-native-responsive-screen';

const textFontStyle = {
  ...textFontStyles.mediumTextMedium,
};

export default function styles(props) {
  return(
    StyleSheet.create({
  textFldStyle: {
    ...textFontStyle,
    //height: hp('7%'),
    marginLeft:  props.isEdit ?  0 : 18, 
    marginRight: props.isEdit ?  0 : 18, 
    backgroundColor:  props.isEdit ?  Colors.white : (props.backgroundColor ?  props.backgroundColor : Colors.gray),
  },

  wholeTextFldStyle: {
    marginTop: 15,//20
  },

  textVwStyle:  {
   // height: hp('7%'),
  //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
  // padding :  getOrientation() ==="portrait" ?  (props.isEdit ? hp('0.3%') : hp('1.3%')): (props.isEdit ?  wp('0.3%') : wp('1.3%')),
    paddingVertical :  getOrientation() ==="portrait" ?   hp('1.3%') :  wp('1.3%'),
    borderColor:  props.isEdit ?  Colors.white :  (props.errorMsg ?  'red' : Colors.white),
    borderWidth:   props.isEdit ? 0 : (props.errorMsg ?  1 : 0),
    backgroundColor:props.isEdit ?  Colors.white : ( props.backgroundColor ?  props.backgroundColor : Colors.gray),
    borderRadius: props.isEdit ? 0 : getOrientation() ==="portrait" ?  hp('1.3%') :  wp('1.3%'),
    borderBottomColor: props.isEdit ?   Colors.grayDim : null,
    borderBottomWidth: props.isEdit ?   1 : 1,
  },

  labelStyle: {
    ...textFontStyle,
    color:props.isEdit ?   Colors.grayDim : Colors.black,
    marginBottom: props.isEdit ?  0 : 3,//8
    marginHorizontal: props.isEdit ? 0 : props.lablMarginPr ? 20 : 2,
  },
  errorLblStyle : {
    ...textFontStyles.mediumSmallTextSemibold,
    marginTop:  props.isEdit ? 0 : 3,//8
    marginHorizontal: props.isEdit ? 0 : props.lablMarginPr ? 20 : 2,
    color:Colors.red,
  },
  })
  )
}





// export default function styles(props) {
//   console.log('errorMsg',props);
//   return(
//     EStyleSheet.create({
//       $size: 20,

//   textFldStyle: {
//     ...textFontStyle,
//     backgroundColor: Colors.white,
//     borderRadius:"2rem",
//     height: "40%",
//     paddingLeft: '1rem',
//     paddingRight: '1rem',
//     borderColor: props.errorMsg ?  'red' : Colors.white,
//     borderWidth:  props.errorMsg ?  1 : 0,
    
//   },
//   textVwStyle: {
//   // flex: 1,
   
//     //backgroundColor: Colors.red,
//    // paddingVertical:'4%',
//   // height: '50%',

//   },
//   wholeTextFldStyle: {
    
//     //flex:0.3,
//     // flexDirection: 'column',
//     // justifyContent:'center',
//     //  alignContent:'center',
//     //     justifyContent:'center',
//     marginTop: '1rem',
//     backgroundColor: Colors.black,
//     // height: '10%',

//   },
//   labelStyle: {
//     ...textFontStyle,
//      marginBottom: '0.2rem',
//     marginHorizontal: '1rem',
//   },
//   errorLblStyle : {
//     ...textFontStyles.errorTextSemibold,
//     marginTop:  '0.2rem',
//     marginHorizontal: '1rem',
//     color:Colors.red,
//     backgroundColor: Colors.yellowLight,
//   },
// })
//   )
// }

// export default function styles(props) {
//   console.log('errorMsg',props);
//   return(
//     StyleSheet.create({
//   textFldStyle: {
//     ...textFontStyle,
//     backgroundColor: Colors.white,
//     borderRadius: hp('2%'),
//     height: hp('8.5%'),
//     paddingLeft: '8%',
//     paddingRight: '8%',
//     borderColor: props.errorMsg ?  'red' : Colors.white,
//     borderWidth:  props.errorMsg ?  1 : 0,
    
//   },
//   textVwStyle: {
//    flexGrow: 1
//     //backgroundColor: Colors.red,
//    // paddingVertical:'4%',
//   },
//   wholeTextFldStyle: {
//     flex: 1,
//     marginTop: '6%',
//   },
//   labelStyle: {
//     ...textFontStyle,
//      marginBottom: '1%',
//     marginHorizontal: '6%',
//   },
//   errorLblStyle : {
//     ...textFontStyles.errorTextSemibold,
//     marginTop:  '1%',
//     marginHorizontal: '6%',
//     color:Colors.red,
//    // backgroundColor: Colors.yellowLight,
//   },
// })
//   )
// }


