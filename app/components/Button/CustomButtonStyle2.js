// import   React,{ Component } from 'react';
// import {StyleSheet} from 'react-native';
// import  {Colors , Fonts} from '../utils'
// import textFontStyles from './TextFontStyle';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,percentageToAllDP  as pap
// } from 'react-native-responsive-screen';

// import EStyleSheet from 'react-native-extended-stylesheet';

// export const CustomButtonType = {                                      
//     dark: 'dark',
//     light: 'light',
//     undeline:'undeline',
// };

// const containerStyles = {                               
//      alignItems: 'stretch',
// };
// const buttonContainerStyles = {    
//          alignItems: 'center',
//          justifyContent: 'center',
//         height: hp('7%'),
//         borderRadius: 18,
//         padding: 3,
//         marginTop:'2%',
// };
 
// const buttonTitleStyles = {                                    
//     color: Colors.white,
//     ...textFontStyles.largeTextSemibold,
// };

// const darkStyles = (props) =>  EStyleSheet.create({
//     containerSt: {
//         ...containerStyles
//       },
//     buttonSt: {
//         ...buttonContainerStyles,
//         backgroundColor: Colors.black,
//       },
//       buttonTitleSt: {
//         ...buttonTitleStyles,
//         letterSpacing: props.letterSpacingPs ? 4.3 : 0,
//       },
// });


// const lightStyles = EStyleSheet.create({
//   containerSt: {
//       ...containerStyles,
//     },
//     // containerSt: this.props.title ? {...CustomButtonType} : {backgroundColor:"#000"}
//     //   ,
//   buttonSt: {
//       ...buttonContainerStyles,
//       backgroundColor: Colors.whiteLight,

//     },
//     buttonTitleSt: {
//       ...buttonTitleStyles,
//       color: Colors.yellowDark,
//     },
// });

// const undelineStyles = StyleSheet.create({
//   containerSt: {
//       ...containerStyles,
//     },
//   buttonSt: {
//       ...buttonContainerStyles,
//     },
//     buttonTitleSt: {
//       ...buttonTitleStyles,
//       color: Colors.yellowLight,
//       textDecorationLine: 'underline',
//     },
    
// });

// export default function getCustomButtonStyle(CustomButtonType,props){ 

//     switch(CustomButtonType) {
//         case 'dark':
//             return darkStyles(props)
//         case 'light':
//             return lightStyles
//         case 'undeline':
//             return undelineStyles
//         default:
//           return darkStyles
//         }         
// }