import React, { Component } from 'react';
import { Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './styles';
import { Scene, Router, Drawer, Stack, Actions, Overlay, Modal } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Colors, Images, Constants } from '../../utlis'
import {
  widthPercentageToDP as wp,
  getOrientation
} from 'react-native-responsive-screen';
import Loader from '../../components/Loader/Loader';

import Login from '../Login/index';
import Signup from '../Signup/index';
import Event from '../Event/index';
import Dashboard from '../Dashboard/index';
import Profile from '../Profile/index';
import MemberList from '../MemberList/index';
import VistitorList from '../VistitorList/index';
import TrainerList from '../TrainerList/index';
import EventList from '../EventList/index';
import MemberShipList from '../MemberShipList/index';
import PurcahseMemberShipList from '../PurcahseMemberShipList/index';
import MemberShipDetail from '../MemberShipDetail/index';
import Attendance from '../Attendance/index';
import MembershipAdd from '../MembershipAdd/index';
import VisitorAdd from '../VisitorAdd/index';
import TrainerAdd from '../TrainerAdd/index';
import TrainerProfile from '../TrainerProfile/index';
import MemberProfile from '../MemberProfile/index';
import MemberDetail from '../MemberDetail/index';
import MemberAdd from '../MemberAdd/index';
import LoginMemberTrainer from '../LoginMemberTrainer/index';
import GymProfile from '../GymProfile/index';

import EditButton from '../../components/Button/EditButton';

import DrawerContent from '../../components/Drawer/DrawerContent';
import { editOn } from '../../actions/editOn/editOnAction';
//const RouterRedux = connect()(Router);

class Root extends React.Component {

  componentDidMount() {
    SplashScreen.hide()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.isLogin !== this.props.isLogin);
  }

  renderBackButton = () => (
    <TouchableOpacity onPress={() => this.onBack()} >
      <Image resizeMode="contain" style={styles.backImageSt} source={Images.backImg} />
    </TouchableOpacity>
  );

  renderEDitButton = () => (
    <EditButton />
  );

  onBack = () => {
    Actions.pop()
    //this.props.editOn(false, true)
  }

  onExit = () => {

  }

  render() {

    // var showEventBtn = true;
    // var showVisitorBtn = true;
    // var showMemberBtn = true;

    // if (this.props.user.role === Constants.trainer) {
    //   showEventBtn =  this.props.user.memberPermission === false
    // }else  if (this.props.user.role === Constants.member) {

    //   showMemberBtn = this.props.user.eventPermission === false 

    // } else if (this.props.user.role === Constants.admin) {
  
    // }
    return (
      // <ImageBackground source={Images.whBgImg} style={styles.bgViewSt}  >
      <Router navigationBarStyle={styles.navBar, styles.navStyleForIos}
        renderBackButton={() => this.renderBackButton()} leftButtonIconStyle={styles.menuIconSt}
        tintColor={Colors.dark_black} titleStyle={styles.barButtonTextStyle}>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login" initial={this.props.isLogin ? false : true} hideNavBar />
          <Scene key="signup" component={Signup} title="Signup" hideNavBar />
          <Scene key="LoginMemberTrainer" component={LoginMemberTrainer} hideNavBar />
          <Drawer hideNavBar key="drawerMenu" initial={this.props.isLogin ? true : false} contentComponent={DrawerContent} drawerImage={Images.menuImg}
            drawerWidth={Constants.screenWidth * 0.7} drawerPosition="left" >
                       {this.props.user.role !== Constants.member  &&
            <Stack  >
              <Scene key="Dashboard" component={Dashboard} title="Dashboard" initial = {false }/>
              <Scene key="TrainerAdd" component={TrainerAdd} title="Trainer" />
              <Scene key="Attendance" back component={Attendance} title="Attendance" />
            </Stack> }
            <Stack >
            {this.props.user.role !== Constants.member  &&
             <Scene key="Member" component={MemberList} title="Member" rightButtonImage={Images.searchImg} rightButtonStyle={styles.rightBtnIconSt} onRight={() => { }} />
               }
              <Scene key="MemberDetail" back = {this.props.user.role !== Constants.member } component={MemberDetail} title="Member Detail" />
              <Scene key="MemberAdd" back component={MemberAdd} title="Member" renderRightButton={() => 
               this.props.user.memberPermission &&  this.props.user.memberPermission === false || this.props.user.role === Constants.member  ? null : this.renderEDitButton()} />
              <Scene key="MemberShipDetail" back component={MemberShipDetail} title="MemberShip Detail" rightButtonImage={this.props.user.role === Constants.member  ? null : Images.dotImg} onRight={() => { }} />
              <Scene key="PurcahseMemberShipList" back component={PurcahseMemberShipList} title="MemberShip Plan" />
              <Scene key="Attendance" back component={Attendance} title="Attendance" />
            </Stack>
            <Stack >
              <Scene key="Gym_Info" component={GymProfile} title="Gym Info" />
            </Stack>
            <Stack >
              <Scene key="Profile" component={Profile} title="Profile" renderRightButton={() => this.renderEDitButton()} />
            </Stack>
            <Stack >
              <Scene key="MemberProfile" component={MemberProfile} title= "Profile" renderRightButton={() =>  this.renderEDitButton()} />
            </Stack>
            <Stack >
              <Scene key="TrainerProfile" component={TrainerProfile} title={this.props.user.role === Constants.member ?"Trainer" : "Profile"}renderRightButton={() => this.props.user.role === Constants.member ? null : this.renderEDitButton()} />
            </Stack>
            <Stack >
              <Scene key="Trainer" component={TrainerList} title="Trainer" rightButtonImage={Images.searchImg} rightButtonStyle={styles.rightBtnIconSt} onRight={() => { }} />
              <Scene key="TrainerAdd" back component={TrainerAdd} title="Trainer" renderRightButton={() => this.renderEDitButton()} />
              <Scene key="Attendance" back component={Attendance} title="Attendance" />
            </Stack>
            {/* <Stack key="Membership_plans" titleStyle={{ alignSelf: 'center' }}> */}
            <Stack  >
              <Scene key="Membership_plans" component={MemberShipList} title="Membership" rightButtonImage={Images.searchImg} rightButtonStyle={styles.rightBtnIconSt} onRight={() => { }} />
              <Scene key="MembershipAdd" back component={MembershipAdd} title="Membership" renderRightButton={() => 
                this.props.user.role === Constants.trainer ||   this.props.user.role === Constants.member ? null : this.renderEDitButton()} />
            </Stack>
            <Stack >
              <Scene key="EventList" component={EventList} title="Events" rightButtonImage={Images.searchImg} rightButtonStyle={styles.rightBtnIconSt} onRight={() => { }} />
              <Scene key="Event" onExit={() => this.onEnter} back component={Event} title="Events" renderRightButton={() =>
                this.props.user.eventPermission && this.props.user.eventPermission === false || this.props.user.role === Constants.member ? null : this.renderEDitButton()} />
            </Stack>
          
            <Stack >
              <Scene key="Visitors" component={VistitorList} title="Visitors" rightButtonImage={Images.searchImg} rightButtonStyle={styles.rightBtnIconSt} onRight={() => { }} />
              <Scene key="VisitorAdd" back component={VisitorAdd} title="Visitor" renderRightButton={() => this.props.user.visitorPermission === false ? null : this.renderEDitButton()} />
              <Scene key="MemberAdd" back component={MemberAdd} title="Member" renderRightButton={() => 
                 this.props.user.memberPermission &&  this.props.user.memberPermission === false || this.props.user.role === Constants.member  ? null : this.renderEDitButton()} />

            </Stack>
          </Drawer>
        </Scene>
      </Router>
    );
  }
}
const mapStateToProps = ({ routes, isLoginReducer: { isLogin }, sessionReducer: { user } }) => ({
  routes: routes,
  isLogin: isLogin,
  user: user,
});

const mapDispatchToProps = {
  editOn
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)
