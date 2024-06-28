import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, Alert, ScrollView } from 'react-native';
import styles from './styles';

import { CustomFilterModel, CustomNoDataFoundView } from '../../components/index';
import { Images, dateTimeHelper, Strings } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { deleteCurrentMemberShip, getPurchaseMemberShipByID, getMemberByID } from '../../actions/member/memberAction';
import { connect } from 'react-redux';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
class memberShipDetailScreen extends Component {

  state = {
    showPopUp: false,
    orientation: getOrientation(),
  }
  componentDidMount() {
    lor(this);
    this.props.getMemberByID(this.props.selectedMemberID)
    console.warn('this.props.selectedMemberShipID', this.props.selectedMemberShipID);
    this.props.getPurchaseMemberShipByID(this.props.selectedMemberID, this.props.selectedMemberShipID)

    setTimeout(() => {
      //Actions.refresh( {hideNavBar: false, headerStyle : navBarWhiteSt, renderTitle :"Member", drawerImage: menuImg,onRight: this.handleIconTouch, rightButtonImage:searchImg, });
      Actions.refresh({ onRight: this.handleDotTouch })
    }, 2);

  }

  componentWillUnmount() {
    rol();
  }

  handleDotTouch = () => {
    this.showPopUpView(true)

  }

  renewAction = () => {
    Actions.MemberAdd({ selectedMemberData: this.props.memberDataByID, isProfile: false, isAddNewMemberShip: false, isRenewMemberShip: true, isBecomeMember: false })
    //  this.showPopUpView(false)
  }

  deleteAction = () => {

    setTimeout(() => {
      Alert.alert(
        'SkyGym',
        'Are you sure you want to delete Membership ?',
        [
          { text: 'No', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
          {
            text: 'Yes', onPress: () => {
              Object.entries(this.props.purchaseMemberShipDataByID).length !== 0 &&
              this.props.deleteCurrentMemberShip(this.props.selectedMemberID, this.props.selectedMemberShipID)
            }
          },
        ]
      );
    }, 1);

  }

  showPopUpView(isShow) {
    this.setState({ showPopUp: isShow })
  }

  render() {
    const myStyle = styles(this.props);
    const { greenTextSt, containerMainSt, scrollContentSt, textBlackLeftSt, textBlackRightSt, scrollSt, bgVwSt, borderVwSt, detailMSPMainView, detailMSPLeftView, detailMSPRightView } = myStyle;
    const { bgImg, logoImg } = Images
    var getPaymentHistory = ''

    if (this.props.purchaseMemberShipDataByID && Object.entries(this.props.purchaseMemberShipDataByID).length !== 0) {
      let getPurchaseDate = this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.purchaseUpdateDate : '';
      getPaymentHistory = dateTimeHelper.getDateTime(getPurchaseDate) + ' ' +
        this.props.purchaseMemberShipDataByID.paymentType + ' ' + this.props.purchaseMemberShipDataByID.totalAmount;
      console.warn(getPurchaseDate, getPaymentHistory);

    }

    return (
      <View style={containerMainSt}>
        {this.props.selectedMemberShipID ?
          <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>
            {this.state.showPopUp ? <CustomFilterModel
              renewPress={this.renewAction}
              deletePress={this.deleteAction}
              isPurcahseList={this.props.isPurcahseList}

              // memberData={this.props.purchaseMemberShipDataByID}
              isShowPopUp={true}
              modelClosePr={() => this.showPopUpView(false)} /> : null
            }

            <View style={bgVwSt}>
              <View style={borderVwSt}>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Payment Staus'}</Text>
                  <Text style={greenTextSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.planStatus : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Membership date'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipStartDate : ''}</Text>
                </View>
              </View>
            </View>

            <View style={bgVwSt}>
              <View style={borderVwSt}>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Member Name'}</Text>
                  <Text style={textBlackRightSt} >{this.props.memberDataByID ? this.props.memberDataByID.name : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Mobile no.'}</Text>
                  <Text style={textBlackRightSt} >{this.props.memberDataByID ? this.props.memberDataByID.phoneNo : ''}</Text>
                </View>
              </View>
            </View>

            <View style={bgVwSt}>
              <View style={borderVwSt}>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Membership '}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipTitle : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Start date'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipStartDate : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Expire date'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipEndDate : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Membership detail'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipDetails : ''}</Text>
                </View>
              </View>
            </View>

            <View style={bgVwSt}>
              <View style={borderVwSt}>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Discount'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.discount : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Amount'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.membershipAmount : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Total Amount'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.totalAmount : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Due Amount'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.dueAmount : ''}</Text>
                </View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Payment Type'}</Text>
                  <Text style={textBlackRightSt} >{this.props.purchaseMemberShipDataByID ? this.props.purchaseMemberShipDataByID.paymentType : ''}</Text></View>
              </View>
            </View>

            <View style={bgVwSt}>
              <View style={borderVwSt}>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{'Payment history'}</Text></View>
                <View style={detailMSPLeftView}>
                  <Text style={textBlackLeftSt} >{getPaymentHistory}</Text></View>
              </View>
            </View>


          </ScrollView> :
          <CustomNoDataFoundView isfullView={false} title={Strings.noDataFound.membershipTilte} message={Strings.noDataFound.noRecord} />}

      </View>
    );
  }
}
const mapStateToProps = ({ routes, memberReducer: { purchaseMemberShipDataByID, memberDataByID } }) => ({
  routes: routes,
  purchaseMemberShipDataByID: purchaseMemberShipDataByID,
  memberDataByID: memberDataByID,
});

const mapDispatchToProps = {
  deleteCurrentMemberShip,
  getPurchaseMemberShipByID,
  getMemberByID,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memberShipDetailScreen);