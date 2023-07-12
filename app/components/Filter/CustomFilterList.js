import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images } from '../../utils'
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class CustomFilterList extends Component {
  state = {
    modalVisible: true
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  render() {
    const { containerMainSt, btnStyle, textStyle } = styles(this.props);
    const { onPressFilterPr, setSortByText } = this.props;
    return (
      <View style={containerMainSt}>
        <View >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={textStyle}>{setSortByText ? setSortByText : 'Sort by'}</Text>
            <Image style={btnStyle} source={Images.sortByImg} resizeMode="contain" />
          </View>
        </View>
        <TouchableOpacity onPress={onPressFilterPr}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={textStyle}>Filter</Text>
            <Image style={btnStyle} source={Images.sortByImg} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default CustomFilterList;
