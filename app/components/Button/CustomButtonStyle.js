import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils'
import textFontStyles from '../TextFontStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation
} from 'react-native-responsive-screen';
export const CustomButtonType = {
  default: 'default',
  dark: 'dark',
  light: 'light',
  undeline: 'undeline',
  border: 'border',
};

const containerStyles = {
  alignItems: 'stretch',
};
const iconStyles = {
  width: wp('17%'),
  height: hp('17%'),
  alignSelf: "center"
};
const iconSmaleStyles = {
  width: getOrientation() === "portrait" ? wp('5%') : hp('5%'),
  height: getOrientation() === "portrait" ? hp('5%') : wp('5%'),
};

const iconBigStyles = {
  width: getOrientation() === "portrait" ? wp('7%') : hp('7%'),
  height: getOrientation() === "portrait" ? hp('7%') : wp('7%'),
};


// const buttonContainerStyles = {    
//          alignItems: 'center',
//          justifyContent: 'center',
//        // height: getOrientation() ==="portrait" ?  hp('8.5%'): wp('8.5%'),
//         borderRadius: hp('2%'),
//         padding: 3,
//         marginTop:'2%',
// };

function buttonContainerStyles(props) {
  // console.log('getCustomButtonStyle', getOrientation());

  return StyleSheet.create({
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: getOrientation() === "portrait" ? hp('7%') : wp('7%'),
      borderRadius: 18,
      marginTop: '2%',
    }
  })
}


const buttonTitleStyles = {
  color: Colors.white,
  ...textFontStyles.largeTextSemibold,
};

const defaultStyles = (props) => StyleSheet.create({
  containerSt: {
    ...containerStyles,
  },
  buttonSt: {
    ...buttonContainerStyles(props).icon,
  },
  buttonTitleSt: {
    ...buttonTitleStyles,
    color: Colors.black,
    letterSpacing: props.letterSpacingPr ? 4.2 : 0,
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
  },
  iconSt: {
    ...iconStyles,
  },
  iconSmallSt: {
    ...iconSmaleStyles,
  },
  iconBigSt: {
    ...iconBigStyles,
  },
  smallTitleSt: {
    marginLeft: 5,
    ...textFontStyles.miniTextMedium,
    color: Colors.black,
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
  },
  bigTitleSt: {
    marginLeft: 8,
    ...textFontStyles.mediumSmallTextMedium,
    color: Colors.black,
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
  },
});

const darkStyles = (props) =>
  StyleSheet.create({

    containerSt: {
      ...containerStyles
    },
    buttonSt: {
      ...buttonContainerStyles(props).icon,
      backgroundColor: Colors.black,
    },
    buttonTitleSt: {
      ...buttonTitleStyles,
      letterSpacing: props.letterSpacingPr ? 4.2 : 0,
      textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
    },
  });

const borderStyles = (props) => StyleSheet.create({
  containerSt: {
    ...containerStyles,
  },
  // containerSt: this.props.title ? {...CustomButtonType} : {backgroundColor:"#000"}
  //   ,
  buttonSt: {
    ...buttonContainerStyles(props).icon,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 0.5,
  },
  buttonTitleSt: {
    ...buttonTitleStyles,
    color: Colors.black,
    letterSpacing: props.letterSpacingPr ? 4.2 : 0,
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
  },
});

const lightStyles = (props) => StyleSheet.create({
  containerSt: {
    ...containerStyles,
  },
  // containerSt: this.props.title ? {...CustomButtonType} : {backgroundColor:"#000"}
  //   ,
  buttonSt: {
    ...buttonContainerStyles(props).icon,
    backgroundColor: Colors.whiteLight,

  },
  buttonTitleSt: {
    ...buttonTitleStyles,
    color: Colors.yellowDark,
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'
  },
});

const undelineStyles = (props) => StyleSheet.create({
  containerSt: {
    ...containerStyles,
  },
  buttonSt: {
    ...buttonContainerStyles(props).icon,
  },
  buttonTitleSt: {
    ...buttonTitleStyles,
    color: Colors.yellowLight,
    textDecorationLine: 'underline',
    textAlign: props.textAlignStylePr !== undefined ? props.textAlignStylePr : 'center'

  },

});

export default function getCustomButtonStyle(CustomButtonType, props) {
  switch (CustomButtonType) {
    case 'default':
      return defaultStyles(props)
    case 'dark':
      return darkStyles(props)
    case 'light':
      return lightStyles(props)
    case 'undeline':
      return undelineStyles(props)
    case 'border':
      return borderStyles(props)
    default:
      return darkStyles
  }
}