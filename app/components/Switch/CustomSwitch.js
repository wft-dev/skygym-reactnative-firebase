import React, { Component } from 'react';
import { View, Switch, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Images, Colors } from '../../utils'
import ImagePicker from 'react-native-image-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import textFontStyles from '../TextFontStyle';
import { symbol } from 'prop-types';


class CustomSwitch extends Component {
  state = {
    isEnabled: false,
    isToggleSelect: false,
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  toggleSwitch = (value) => {
    if (this.props.isEdit === false) {
      this.setState({ isToggleSelect: true })
      this.setState({ isEnabled: value })

      this.props.getValue(value)
    }
  }

  render() {
    const { title, mainTitle, errorMsg, setValue, lablMarginPr, backgroundColor, styleCustom, } = this.props;
    const { wholeTextFldStyle, textVwStyle, labelStyle, textFldStyle, errorLblStyle } = styles(this.props);
    return (<View style={wholeTextFldStyle}>
      <View>
        {mainTitle && <Text style={labelStyle}>{mainTitle}</Text>}
      </View>
      <View style={textVwStyle}>
        <Text style={[textFldStyle, styleCustom]} {...this.props} >{title}</Text>
        <Switch
          trackColor={{ false: Colors.gray, true: Colors.black }}
          thumbColor={this.state.isEnabled || this.props.setValue ? Colors.gray : Colors.black}
          // ios_backgroundColor= {Colors.red}
          disabled={this.props.isEdit}
          onValueChange={this.toggleSwitch}
          value={this.state.isToggleSelect ? this.state.isEnabled : this.props.setValue}
        />
      </View>
      <View>
        {errorMsg ? <Text style={errorLblStyle}
        >{errorMsg}</Text> : null}
      </View>
    </View>);
  }
}

const textFontStyle = {
  ...textFontStyles.mediumTextMedium,
};
const styles = (props) => {
  return (
    StyleSheet.create({
      textFldStyle: {
        flex: 1,
        ...textFontStyle,
        //height: hp('7%'),
        color: Colors.black,
        // paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.white,

      },
      wholeTextFldStyle: {
        marginTop: 15,//20
      },
      textVwStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: hp('7%'),
        //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
        paddingHorizontal: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        paddingVertical: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
        borderColor: props.isEdit ? Colors.white : (props.errorMsg ? 'red' : Colors.gray),
        borderWidth: props.isEdit ? 0 : (props.errorMsg ? 1 : 1),
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.white),
        borderRadius: props.isEdit ? 0 : getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        borderBottomColor: props.isEdit ? Colors.grayDim : null,
        borderBottomWidth: props.isEdit ? 1 : 1,
      },
      labelStyle: {
        ...textFontStyle,
        color: props.isEdit ? Colors.grayDim : Colors.black,
        marginBottom: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
      },
      errorLblStyle: {
        ...textFontStyles.mediumSmallTextSemibold,
        marginTop: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
        color: Colors.red,
      },
    })
  )
}

export default CustomSwitch;

CustomSwitch.defaultProps = {
  title: '',
};


// const styles = (props) => {
//   return (
//     StyleSheet.create({
//       textFldStyle: {
//         flex: 1,
//         ...textFontStyle,
//         //height: hp('7%'),
//         color: Colors.black,
//        // paddingLeft: 8,
//         paddingRight: 8,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.white,

//       },
//       wholeTextFldStyle: {
//         marginTop: 15,//20
//       },
//       textVwStyle: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // height: hp('7%'),
//         //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
//         paddingHorizontal: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//         paddingVertical: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
//         borderColor: props.errorMsg ? 'red' : Colors.gray,
//         borderWidth: props.errorMsg ? 1 : 1,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.white,
//         borderRadius: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//       },
//       labelStyle: {
//         ...textFontStyle,
//         marginBottom: 3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,
//       },
//       errorLblStyle : {
//         ...textFontStyles.mediumSmallTextSemibold,
//         marginTop:  3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,
//         color:Colors.red,
//         textAlign: 'left'
//       },
//     })
//   )
// }
