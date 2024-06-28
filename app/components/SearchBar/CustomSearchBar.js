import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

import {
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

import Search from 'react-native-search-box';
import { Constants, Colors } from '../../utils'


class CustomSearchBar extends Component {

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }


  render() {
    const { containerMainSt, searchBackgroundSt, cancelButtonSt } = styles(this.props);
    return (
      <View style={{ marginTop: 40 }}>
        {
          <Search searchIconCollapsedMargin={getOrientation() === "portrait" ? 160 : 430}
            searchIconExpandedMargin={10}
            placeholderCollapsedMargin={getOrientation() === "portrait" ? 140 : 410}
            placeholderExpandedMargin={30}
            inputHeight={50}
            backgroundColor={Colors.gray}
            titleCancelColor={Colors.black}
            inputStyle={searchBackgroundSt}
            cancelButtonTextStyle={cancelButtonSt}
            {...this.props}
            isfo
          />

        }
      </View>
    );
  }
}
export default CustomSearchBar;
