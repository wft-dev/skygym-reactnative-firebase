import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import getCustomButtonStyle, { CustomButtonType } from './CustomButtonStyle'
import { Images } from '../../utils'

class CustomButton extends Component {
  // handleButtonPress = () => {
  //     const { email, password } = this.state;
  //     this.props.onButtonPress(email, password);

  //   };

  iconWithRightView = () => {

    const styles = getCustomButtonStyle(this.props.buttonTypePr, this.props);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Text {...this.props} style={this.props.bigImageTextSize ? styles.bigTitleSt : styles.smallTitleSt}>{this.props.buttonTitlePr}</Text>
        <Image style={this.props.bigImageTextSize ? styles.iconBigSt : styles.iconSmallSt} source={this.props.imageIcon} resizeMode="contain" />
      </View>)
  }


  iconWithLeftView = () => {
    const styles = getCustomButtonStyle(this.props.buttonTypePr, this.props);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={this.props.bigImageTextSize ? styles.iconBigSt : styles.iconSmallSt} source={this.props.imageIcon} resizeMode="contain" />
        <Text {...this.props} style={this.props.bigImageTextSize ? styles.bigTitleSt : styles.smallTitleSt}>{this.props.buttonTitlePr}</Text>
      </View>)
  }

  iconView = () => {
    const styles = getCustomButtonStyle(this.props.buttonTypePr, this.props);
    return (
      <View>
        <Image style={styles.iconSt} source={this.props.imageIcon} resizeMode="contain" />
      </View>)
  }

  textView = () => {
    const styles = getCustomButtonStyle(this.props.buttonTypePr, this.props);
    return <View >
      <Text {...this.props} style={styles.buttonTitleSt}>{this.props.buttonTitlePr}</Text>
    </View>
  }

  render() {
    const { buttonTitlePr, orientation, imageIcon, styleForImage, styleForText, bigImageTextSize,
      isIcon = false, isIconWithTextLeft = false,
      isIconWithTextRight = false, bgColorPr, buttonTypePr, textAlignStylePr, onPressPr, letterSpacingPr } = this.props;
    const styles = getCustomButtonStyle(buttonTypePr, this.props);
    // console.log('---isIconWithTextRight---',buttonTypePr);

    return (
      <View style={styles.containerSt}>
        <TouchableOpacity style={styles.buttonSt} onPress={onPressPr}>
          {isIconWithTextLeft ? this.iconWithLeftView() : null}
          {isIconWithTextRight ? this.iconWithRightView() : null}
          {isIcon ? this.iconView() : null}
          {(!isIcon && !isIconWithTextLeft && !isIconWithTextRight) ? this.textView() : null}

        </TouchableOpacity>
      </View>
    );
  }
}
export default CustomButton;
CustomButton.defaultProps = {
  bigImageTextSize: false,
};