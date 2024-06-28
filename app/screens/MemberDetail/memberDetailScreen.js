import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';

import { CustomButton, CustomButtonType, } from '../../components/index';
import { Images, Strings, Colors, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getMemberByID } from '../../actions/member/memberAction';
import { connect } from 'react-redux';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class memberDetailScreen extends Component {

  state = {
    loaded: false,
  }
  componentDidMount() {
    console.warn(this.props.selectedMemberID);
    this.props.getMemberByID(this.props.selectedMemberID)
    lor(this);
    // console.log('this.props.memberData.name', this.props.memberDataByID ? this.props.memberDataByID.dateOfJoin : '');
  }

  componentWillUnmount() {
    rol();
  }

  navigateToMemberDetaiScreen = (title) => {
    if (title == Strings.onboarding.memberDetail.addNewMembership) {
      Actions.MemberAdd({ selectedMemberData: this.props.memberDataByID, isProfile: false, isAddNewMemberShip: true, isRenewMemberShip: false, isBecomeMember: false });
    } else if (title == Strings.onboarding.memberDetail.purchase) {
      Actions.PurchaseMemberShipList({ selectedMemberID: this.props.selectedMemberID });
    } else if (title == Strings.onboarding.memberDetail.currentMembershipDetails) {
      Actions.MemberShipDetail({ selectedMemberShipID: this.props.memberDataByID.memberShipPlan.docId, selectedMemberID: this.props.selectedMemberID, isPurcahseList: false });
    } else if (title == Strings.onboarding.memberDetail.attendance) {
      Actions.Attendance({ selectedMemberID: this.props.selectedMemberID, selectedMemberData: this.props.memberDataByID, screenType: Constants.member })
    } else {
      Actions.MemberAdd({ selectedMemberData: this.props.memberDataByID, isProfile: false, isAddNewMemberShip: false, isRenewMemberShip: false, isBecomeMember: false });
    }
  }

  MemberDetailBtn = (title) => {
    const myStyle = styles(this.props);
    const { memberViewSt, arrowImageSt, memberTxtStyle } = myStyle;

    return (
      <TouchableOpacity onPress={() => this.navigateToMemberDetaiScreen(title)}>
        <View style={memberViewSt}>
          <Text style={memberTxtStyle}>{title}</Text>
          <Image style={arrowImageSt} source={Images.rightImg} resizeMode="contain" />
        </View>
      </TouchableOpacity>)
  }

  buttonView = () => {
    const myStyle = styles(this.props);
    const { allBtnVwSt } = myStyle;

    return (<View style={allBtnVwSt}>

      {/* <View style={btnVwSt}> */}
      <CustomButton bigImageTextSize={true} textAlignStylePr='center' imageIcon={Images.callImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Call' onPressPr={() => this.pushToNextScreen({ item, index })} />
      {/* </View> */}
      {/* <View style={btnVwSt}> */}
      <CustomButton bigImageTextSize={true} textAlignStylePr='center' imageIcon={Images.msgImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Msg' onPressPr={() => this.pushToNextScreen({ item, index })} />
      {/* </View> */}
    </View>)
  }

  deatlScreenView = () => {
    const myStyle = styles(this.props);
    const { mainVwSt, nameVwSt, paidStatusViewSt, mobileTextBlackSt, paidValueSt, nameTextSt } = myStyle;
    console.log('-------planMemberTxtView---------------');
    return (<View style={mainVwSt}>
      <View style={nameVwSt}>
        <Text style={nameTextSt} >{this.props.memberDataByID ? this.props.memberDataByID.name : ''}</Text>
        <Text style={mobileTextBlackSt} >{this.props.memberDataByID ? this.props.memberDataByID.phoneNo : ''}</Text>
        <Text style={mobileTextBlackSt} >{this.props.memberDataByID ? 'Joined: ' + this.props.memberDataByID.dateOfJoin : ''}</Text>
      </View>
      <View style={paidStatusViewSt}>
        <Text style={paidValueSt} >{this.props.memberDataByID && this.props.memberDataByID.memberShipPlan ? (this.props.memberDataByID.memberShipPlan.dueAmount === '' || this.props.memberDataByID.memberShipPlan.dueAmount === '0' ? 'Paid' : 'Pending') : 'Pending'}</Text>
      </View>
    </View>)
  }



  render() {
    const myStyle = styles(this.props);
    const { bgVwSt, borderVwSt, logoVwSt, logoSt, txtBtnVwSt, loaderContainer, paidMemberViewSt, paidUserImageSt, containerMainSt, scrollContentSt, paidtextStyle, grayTextSt, scrollSt, totalMemberViewSt, } = myStyle;
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>

        <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>

          <View style={containerMainSt}>
            <View style={bgVwSt}>
              <TouchableOpacity onPress={() => this.navigateToMemberDetaiScreen()}>

                <View style={borderVwSt}>

                  <View style={logoVwSt}>
                    {!this.state.loaded ?
                      <View style={loaderContainer}>
                        <ActivityIndicator color={Colors.black} />
                      </View> : null}
                    <Image style={logoSt} source={this.props.memberDataByID && this.props.memberDataByID.imageUrl ? { uri: this.props.memberDataByID.imageUrl } : Images.user1Img}
                      onLoadEnd={() => this.setState({ loaded: true })}
                    // resizeMode= {this.props.memberDataByID.imageUrl    ? 'cover' : 'cover'}
                    />
                  </View>
                  <View style={txtBtnVwSt}>
                    {this.deatlScreenView()}
                  </View>

                </View>
              </TouchableOpacity>

            </View>
            {this.props.isMemberLogin === false && this.buttonView()}
            {this.props.isMemberLogin === false && this.MemberDetailBtn(Strings.onboarding.memberDetail.addNewMembership)}
            {this.MemberDetailBtn(Strings.onboarding.memberDetail.currentMembershipDetails)}
            {this.MemberDetailBtn(Strings.onboarding.memberDetail.purchase)}
            {this.MemberDetailBtn(Strings.onboarding.memberDetail.attendance)}
          </View>

        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = ({ routes, memberReducer: { memberDataByID } }) => ({
  routes: routes,
  memberDataByID: memberDataByID,
});

const mapDispatchToProps = {
  getMemberByID,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memberDetailScreen);