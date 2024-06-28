import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation, widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images, Colors } from '../../utils';

class FloatingButton extends Component {
  render() {
    const { btnStyle, buttonStyle } = styles;

    return (
      <View style={buttonStyle}>
        <TouchableOpacity onPress={this.props.onPressPlusBtn}>
          <Image style={btnStyle} source={Images.addImg} resizeMode='contain' />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    right: getOrientation() === "portrait" ? 40 : 50,
    bottom: getOrientation() === "portrait" ? 40 : 50,
    //backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    height: getOrientation() === "portrait" ? hp('10%') : wp(' 10%'),
    width: getOrientation() === "portrait" ? wp('10%') : hp('10%'),
  },
  btnStyle: {
    height: getOrientation() === "portrait" ? hp('20%') : wp('20%'),
    width: getOrientation() === "portrait" ? wp('20%') : hp('20%'),
  },
});

export default FloatingButton;