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


class DrawerContent extends Component {
  state = {
    selectedId: null,
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  pushToNextScreen = ({ item, index }) => {
    console.log('--pushToNextScreen--', item, index);
    // let getKey = this.getKeyByValue(MENU_NAME,item.title);
    let getKeyOfMenu = Object.keys(MENU_NAME)[index];
    let getValueOfMenu = Object.values(MENU_NAME)[index];

    console.log('--pushToNextScreen1212--', getKeyOfMenu, index);
    if (getValueOfMenu === MENU_NAME.Logout) {
      this.logoutAlert()
    } else {
      Actions[getKeyOfMenu]();
    }

  }

  logoutAlert = () => {
    Alert.alert(
      'SkyGym',
      'Are you sure you want to log out?"',
      [
        { text: 'No', onPress: () => console('NO Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => Actions.login() },
      ]
    );
  }

  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  allRowView = ({ item, index }) => {
    //  console.log('--test--',item,index);

    return (
      <View >
        <View style={btnVwSt}>
          <CustomButton textAlignStylePr='center' buttonTypePr={CustomButtonType.default} buttonTitlePr={item.title} onPressPr={() => this.pushToNextScreen({ item, index })} />
        </View>
        <View >
          <View style={btnVwSt} style={{ height: 1, width: "100%", backgroundColor: index !== 0 ? Colors.yellowAlphaLight : 'red' }} />
        </View>
      </View>
    );
  };

  firstRowView = () => {
    return (
      <View style={logoVwSt}>
        <Image style={logoSt} source={Images.logoImg} resizeMode="contain" />
        <Text style={textSt} >SkyGym</Text>
      </View>
    );
  };


  renderItem = ({ item, index }) => {
    this.getDrStyles()
    return (
      <View >
        {index === 0 ? this.firstRowView() :
          this.allRowView({ item, index })}</View>

    );
  };

  getDrStyles() {
    const myStyle = styles(this.props);
    return { containerMainSt, textSt, btnVwSt, textVwSt, logoSt, logoVwSt, bgViewSt, containerSt } = myStyle;
  }

  render() {
    this.getDrStyles()
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>
        <ImageBackground source={bgImg} style={bgViewSt}  >
          <View style={containerSt}>
            <FlatList showsVerticalScrollIndicator={false} data={DATA} renderItem={this.renderItem} keyExtractor={item => item.id}
              extraData={this.state.selectedId}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default DrawerContent;
