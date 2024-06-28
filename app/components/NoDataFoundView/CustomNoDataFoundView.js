import React, { Component } from 'react';
import { View, Alert, Image, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView } from 'react-native';
import styles from './styles';

import CustomTextField from '../TextFiled/CustomTextField';
import CustomButton from '../Button/CustomButton';
import { Images, Colors } from '../../utils'
import { CustomButtonType } from '../Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';


class CustomNoDataFoundView extends Component {
  state = {
    selectedId: null,
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  render() {
    const { title, message, isfullView } = this.props;

    const { titleTextNoDataSt, mesageTextNoDataSt, noDataViewSt, } = styles(this.props);

    return (
      <View style={noDataViewSt}>
        <Text style={titleTextNoDataSt} >{title}</Text>
        <Text style={mesageTextNoDataSt} >{message}</Text>
      </View>
    );
  }
}
export default CustomNoDataFoundView;

CustomNoDataFoundView.defaultProps = {
  isfullView: true,


};