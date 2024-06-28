import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import styles from './CustomTextFiledStyle'


import { Colors } from '../utils'

import textFontStyles from './TextFontStyle';

const CELL_HEIGHT = 60;

function CustomTextFiled(props) {
  const { title, errorMsg, onChangeText, isSecured, isRequired, isRequiredHint, keyboardType, invalidHint, returnKeyType, onInputChange, onValidate, refName, onSubmitEditing, blurOnSubmit } = props;
  const { wholeTextFldStyle, textVwStyle, labelStyle, textFldStyle, errorLblStyle } = styles(props);
  console.log('--CustomTextFiled props-------', props.orientation
  );
  return (
    <View style={wholeTextFldStyle}>
      <View>
        {title && <Text style={labelStyle}>{title}</Text>}
      </View>
      <View style={textVwStyle}>
        <TextInput style={textFldStyle} {...props} ref={(input) => refName && refName(input)} />
      </View>
      <View>
        {errorMsg ? <Text style={errorLblStyle}
        >{errorMsg}</Text> : null}
      </View>
    </View>
  );
}
export default CustomTextFiled;

