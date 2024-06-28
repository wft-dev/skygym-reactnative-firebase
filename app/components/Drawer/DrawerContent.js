import React, { Component } from 'react';
import { View, Alert, Image, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView } from 'react-native';
import styles from './styles';

import CustomTextField from '../../components/TextFiled/CustomTextField';
import CustomButton from '../../components/Button/CustomButton';
import { Images, Colors, Constants } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'
import { logoutUser } from '../../actions/session/sessionAction';

import { connect } from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

const MENU_NAME = {
  Empty: "",
  Dashboard: 'Dashboard',
  Member: 'Member',
  Trainer: 'Trainer',
  Membership_plans: 'Membership plans',
  Visitors: 'Visitors',
  Profile: 'Profile',
  EventList: 'Event',
  Logout: 'Logout',
}

const TRAINER_MENU_NAME = {
  Empty: "",
  Dashboard: 'Dashboard',
  Gym_Info: 'Gym Info',
  Home: 'Home',
  Member: 'Member',
  Membership_plans: 'Membership plans',
  Visitors: 'Visitors',
  Profile: 'Profile',
  EventList: 'Event',
  Logout: 'Logout',
}

const MEMBER_MENU_NAME = {
  Empty: "",
  Home: 'Home',
  Gym_Info: 'Gym Info',
  Membership_plans: 'Membership plans',
  Profile: 'Profile',
  Trainer: 'Trainer',
  EventList: 'Event',
  Logout: 'Logout',
}

const DATA = [{
  id: '0',
  title: MENU_NAME.Empty,
},
{
  id: '1',
  title: MENU_NAME.Dashboard,
},
{
  id: '2',
  title: MENU_NAME.Member,
},
{
  id: '3',
  title: MENU_NAME.Trainer,
},
{
  id: '4',
  title: MENU_NAME.Membership_plans,
},
{
  id: '5',
  title: MENU_NAME.Visitors,
},
{
  id: '6',
  title: MENU_NAME.Profile,
},
{
  id: '7',
  title: MENU_NAME.EventList,
},
{
  id: '8',
  title: MENU_NAME.Logout,
},

];

const trainerDATA = [{
  id: '0',
  title: TRAINER_MENU_NAME.Empty,
},
{
  id: '1',
  title: TRAINER_MENU_NAME.Dashboard,
},
{
  id: '2',
  title: TRAINER_MENU_NAME.Gym_Info,
},
{
  id: '3',
  title: TRAINER_MENU_NAME.Home,
},
{
  id: '4',
  title: TRAINER_MENU_NAME.Member,
},
{
  id: '5',
  title: TRAINER_MENU_NAME.Membership_plans,
},
{
  id: '6',
  title: TRAINER_MENU_NAME.Visitors,
},
{
  id: '7',
  title: TRAINER_MENU_NAME.Profile,
},
{
  id: '8',
  title: TRAINER_MENU_NAME.EventList,
},
{
  id: '9',
  title: TRAINER_MENU_NAME.Logout,
},
];

const memberDATA = [{
  id: '0',
  title: MEMBER_MENU_NAME.Empty,
},
{
  id: '1',
  title: MEMBER_MENU_NAME.Home,
},
{
  id: '2',
  title: MEMBER_MENU_NAME.Gym_Info,
},
{
  id: '3',
  title: MEMBER_MENU_NAME.Membership_plans,
},
{
  id: '4',
  title: MEMBER_MENU_NAME.Profile,
},
{
  id: '5',
  title: MEMBER_MENU_NAME.Trainer,
},
{
  id: '6',
  title: MEMBER_MENU_NAME.EventList,
},
{
  id: '7',
  title: MEMBER_MENU_NAME.Logout,
},
];

class DrawerContent extends Component {
  state = {
    selectedId: null,
  }
  componentDidMount() {
    lor(this);
    if (this.props.user.role === Constants.trainer && this.props.user.visitorPermission === false) {
      trainerDATA.splice(6, 1)
      delete TRAINER_MENU_NAME.Visitors

    }
  }

  componentWillUnmount() {
    rol();
  }

  pushToNextScreen = ({ item, index }) => {
    var menu = null
    if (this.props.user.role === Constants.trainer) {
      menu = TRAINER_MENU_NAME
    } else if (this.props.user.role === Constants.admin) {
      menu = MENU_NAME
    } else if (this.props.user.role === Constants.member) {
      menu = MEMBER_MENU_NAME
    }
    // let getKey = this.getKeyByValue(MENU_NAME,item.title);
    let getKeyOfMenu = Object.keys(menu)[index];
    let getValueOfMenu = Object.values(menu)[index];
    if (getValueOfMenu === menu.Logout) {
      this.logoutAlert()
    } else if (getValueOfMenu === menu.Profile) {
      if (this.props.user.role == Constants.member) {
        Actions.MemberProfile({ memberId: this.props.user.id, isOnlyMemberProfile: true });
      } else if (this.props.user.role == Constants.trainer) {
        Actions.TrainerProfile({ trainerId: this.props.user.id, isOnlyTrainerProfile: false });
      } else {
        Actions[getKeyOfMenu]();
      }
    } else if (getValueOfMenu === menu.Trainer) {
      if (this.props.user.role == Constants.member) {
        Actions.TrainerProfile({ trainerId: this.props.user.trainerIDAssign, isOnlyTrainerProfile: true });
      } else {
        Actions[getKeyOfMenu]();
      }
    } else if (getValueOfMenu === menu.Home) {
      if (this.props.user.role == Constants.member) {
        Actions.MemberDetail({ selectedMemberID: this.props.user.id, isMemberLogin: true });
      } else if (this.props.user.role == Constants.trainer) {
        Actions.TrainerAdd({ selectedTrainerData: this.props.user });
      } else {
        Actions[getKeyOfMenu]();
      }
    }

    else {
      Actions[getKeyOfMenu]();
    }
  }

  logoutAlert = () => {
    Alert.alert(
      'SkyGym',
      'Are you sure you want to log out?"',
      [
        { text: 'No', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.logoutUser() },
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
          this.allRowView({ item, index })}
      </View>

    );
  };

  getDrStyles() {
    const myStyle = styles(this.props);
    return { containerMainSt, textSt, btnVwSt, textVwSt, logoSt, logoVwSt, bgViewSt, containerSt } = myStyle;
  }

  render() {
    var menuData = null
    if (this.props.user.role === Constants.trainer) {
      menuData = trainerDATA
    } else if (this.props.user.role === Constants.admin) {
      menuData = DATA
    } else if (this.props.user.role === Constants.member) {
      menuData = memberDATA
    }
    this.getDrStyles()
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>
        <ImageBackground source={bgImg} style={bgViewSt}  >
          <View style={containerSt}>
            <FlatList showsVerticalScrollIndicator={false} data={menuData} renderItem={this.renderItem} keyExtractor={item => item.id}
              extraData={this.state.selectedId}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { user } }) => ({
  routes: routes,
  user: user,

});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);