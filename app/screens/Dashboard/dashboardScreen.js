import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';


import { Images, dateTimeHelper, Constants } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'
import { getVisitor, } from '../../actions/visitor/visitorAction';
import { getMember } from '../../actions/member/memberAction';
import { getTrainer } from '../../actions/trainer/trainerAction';

import { connect } from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
class dashboardScreen extends Component {

  state = {
    getExpiredMemberCount: [],
    getPaidMemberCount: [],

  }
  componentDidMount() {

    lor(this);
    var getTodayDate = dateTimeHelper.getNextSevenDays(new Date());
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 316);
    this.props.getVisitor()
    this.props.getMember()
    //  if (this.props.user.role === Constants.admin) {
    //    this.props.getTrainer()
    //  }
    var currentDate = new Date();
    if (this.props.memberData && this.props.memberData.length > 0) {
      console.warn('user', this.props.memberData);

      var arr = [];
      arr = this.props.memberData
      const paidMember = arr.filter((item) => {
        var planEndDate = new Date(item.memberShipPlan.membershipEndDate);
        return planEndDate > currentDate
      })

      const expiredMember = arr.filter((item) => {
        var planEndDate = new Date(item.memberShipPlan.membershipEndDate);
        return planEndDate < currentDate
      })
      this.setState({
        getPaidMemberCount: paidMember.length, getExpiredMemberCount: expiredMember.length
      })
    }
  }

  componentWillUnmount() {
    rol();
  }

  render() {


    const myStyle = styles(this.props);
    const { grayTextVwSt, totalTextStyle, paidUserYellowVwSt, bigtextStyle, lineViewSt, totalMemberAllViewSt, paidMemberViewSt, paidUserImageSt, containerMainSt, scrollContentSt, paidtextStyle, grayTextSt, scrollSt, totalMemberViewSt, } = myStyle;
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>

        <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>

          <View style={containerMainSt}>
            <View style={totalMemberAllViewSt}>
              <View style={totalMemberViewSt}>
                <View style={paidUserYellowVwSt}>
                  <Image style={paidUserImageSt} source={Images.userPaidImg} resizeMode="contain" />
                </View>
                <Text style={totalTextStyle}>{'Total Member'}</Text>
                <Text style={bigtextStyle}>{this.props.memberData ? this.props.memberData.length : '0'}</Text>
              </View>
              <View style={lineViewSt}></View>
              <View style={totalMemberViewSt}>
                <View style={paidUserYellowVwSt}>
                  <Image style={paidUserImageSt} source={Images.userPaidImg} resizeMode="contain" />
                </View>
                <Text style={totalTextStyle}>{'Total Visitor'}</Text>
                <Text style={bigtextStyle}>{this.props.visitorData ? this.props.visitorData.length : '0'}</Text>
              </View>
            </View>
            <View style={paidMemberViewSt}>
              <Image style={paidUserImageSt} source={Images.userPaidImg} resizeMode="contain" />
              <Text style={paidtextStyle}>{'Paid Member'}</Text>
              <View style={grayTextVwSt}>
                <Text style={grayTextSt}>{this.state.getPaidMemberCount}</Text>
              </View>
            </View>
            <View style={paidMemberViewSt}>
              <Image style={paidUserImageSt} source={Images.userPaidImg} resizeMode="contain" />
              <Text style={paidtextStyle}>{'Expierd Member'}</Text>
              <View style={grayTextVwSt}>
                <Text style={grayTextSt}>{this.state.getExpiredMemberCount}</Text>
              </View>
            </View>
            {/* {this.props.user.role === Constants.admin ?
            <View style={paidMemberViewSt}>
              <Image style={paidUserImageSt} source={Images.userPaidImg} resizeMode="contain" />
              <Text style={paidtextStyle}>{'Trainers'}</Text>
              <View style={grayTextVwSt}>
              <Text style={grayTextSt}>{this.props.trainerData ? this.props.trainerData.length : '0'}</Text>
              </View>
            </View> :  null } */}
          </View>

        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { user }, visitorReducer: { visitorData }, memberReducer: { memberData }, trainerReducer: { trainerData } }) => ({
  routes: routes,
  visitorData: visitorData,
  memberData: memberData,
  trainerData: trainerData,
  user: user

});

const mapDispatchToProps = {
  getVisitor,
  getMember,
  getTrainer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dashboardScreen);