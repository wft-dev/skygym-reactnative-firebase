import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import styles from './styles';

import CustomTextField from '../../components/TextFiled/CustomTextField';
import CustomButton from '../../components/Button/CustomButton';
import { Images, Strings, Validate } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { addMemberShip, updateMemberShip } from '../../actions/memberShip/memberShipAction';
import { editOn } from '../../actions/editOn/editOnAction';

import { connect } from 'react-redux';

class membershipAddScreen extends Component {

  state = {
    membershipTitle: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipTitle : '',
    membershipTitleError: '',
    membershipAmount: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipAmount : '',
    membershipAmountError: '',
    membershipDetails: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipDetails : '',
    membershipDetailsError: '',
    membershipStartDate: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipStartDate : '',
    membershipStartDateError: '',
    membershipEndDate: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipEndDate : '',
    membershipEndDateError: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);
    // this.keyboardWillShowListener = Keyboard.addListener(
    //   "keyboardWillShow",
    //   this._keyboardWillShow
    // );
    // this.keyboardWillHideListener = Keyboard.addListener(
    //   "keyboardWillHide",
    //   this._keyboardWillHide
    // );
  }

  componentWillUnmount() {
    rol();
    //  this.keyboardWillShowListener.remove();
    //  this.keyboardWillHideListener.remove();
  }



  handleMembershipTitle = (text) => {
    this.setState({ membershipTitle: text.trim() })
    if (this.state.membershipTitleError.trim()) {
      this.setState({ membershipTitleError: '' })
    }
  }

  handleMembershipAmount = (text) => {
    this.setState({ membershipAmount: text })
    if (this.state.membershipAmountError.trim()) {
      this.setState({ membershipAmountError: '' })
    }
  }

  handleMembershipDetails = (text) => {
    // this.props.signUpUser.dob = text
    this.setState({ membershipDetails: text.trim() })
    if (this.state.membershipDetailsError.trim()) {
      this.setState({ membershipDetailsError: '' })
    }
  }


  handleMembershipStartDate = (text) => {
    // this.props.signUpUser.dob = text
    this.setState({ membershipStartDate: text.trim() })
    if (this.state.membershipStartDateError.trim()) {
      this.setState({ membershipStartDateError: '' })
    }
  }

  handleMembershipEndDate = (text) => {
    // this.props.signUpUser.dob = text
    this.setState({ membershipEndDate: text.trim() })
    if (this.state.membershipEndDateError.trim()) {
      this.setState({ membershipEndDateError: '' })
    }
  }

  _keyboardWillShow = e => {
    this.keyboardHeight = e.endCoordinates
      ? e.endCoordinates.height
      : e.end.height;

    const newOffset = this.scrollOffset + this.keyboardHeight;
    setTimeout(() => this.chatList.scrollTo({ x: 0, y: newOffset, animated: false }), 0);

    // this.chatList.scrollTo scrollOffset({ offset: newOffset, animated: true });
  };

  _keyboardWillHide = e => {
    const newOffset = this.scrollOffset - this.keyboardHeight;
    this.chatList.scrollTo({ x: 0, y: newOffset, animated: false })
    //this.chatList.scrollOffset ({ offset: newOffset, animated: true });
  };
  handleScroll = e => {
    this.scrollOffset = e.nativeEvent.contentOffset.y;
  };


  addMemberBtnAction = () => {
    const { membershipTitle, membershipAmount, membershipDetails, membershipStartDate, membershipEndDate } = this.state
    const membershipTitleErrorTxt = Validate.validateInput(membershipTitle, Strings.onboarding.membership.title);
    const membershipAmountErrorTxt = Validate.validateInput(membershipAmount, Strings.onboarding.membership.amount);
    const membershipDetailsErrorTxt = Validate.validateInput(membershipDetails, Strings.onboarding.membership.details);
    const membershipStartDateErrorTxt = Validate.validateInput(membershipStartDate, Strings.onboarding.membership.startDate);
    const membershipEndDateErrorTxt = Validate.validateInput(membershipEndDate, Strings.onboarding.membership.endDate);
    this.setState({
      membershipTitleError: membershipTitleErrorTxt,
      membershipAmountError: membershipAmountErrorTxt,
      membershipDetailsError: membershipDetailsErrorTxt,
      membershipStartDateError: membershipStartDateErrorTxt,
      membershipEndDateError: membershipEndDateErrorTxt,
    }, () => {
      if (membershipTitleErrorTxt === '' && membershipAmountErrorTxt === ''
        && membershipDetailsErrorTxt === ''
        && membershipStartDateErrorTxt === ''
        && membershipEndDateError === ''
      ) {
        const memberShipData = {
          membershipTitle: membershipTitle,
          membershipAmount: membershipAmount,
          membershipDetails: membershipDetails,
          membershipStartDate: membershipStartDate,
          membershipEndDate: membershipEndDate,
          adminID: this.props.user.adminID,
          trainerID: '',
          createdAt: this.props.selectedMembershipData ? this.props.selectedMembershipData.createdAt : new Date(),
          updatedAt: this.props.selectedMembershipData ? new Date() : ''
        }
        if (this.props.selectedMembershipData) {
          this.props.updateMemberShip(memberShipData, this.props.selectedMembershipData ? this.props.selectedMembershipData.id : '')
        } else {
          this.props.addMemberShip(memberShipData)
        }
      }
    })

  }

  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, scrollContentSt, scrollSt, keyBordSt, textVwSt, multilineTextSt, timeVwSt, addVwSt, containerSt, viewWidthSt } = myStyle;
    const { bgImg, } = Images
    const { membershipTitle, membershipAmount, membershipDetails, membershipStartDate, membershipEndDate } = this.state

    return (
      <View style={containerMainSt}>
        <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyBordSt}
          enableAutomaticScroll={true} extraScrollHeight={30} keyboardShouldPersistTaps="handled"
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          {/* <KeyboardAvoidingView   style={keyBordSt} behavior='padding'enabled > 

         <ScrollView style={scrollSt} ref={ref => {
            this.chatList = ref;
          }}  onScroll={this.handleScroll} contentContainerStyle={scrollContentSt}> */}

          <View style={containerSt}>
            <View style={textVwSt}>
              <CustomTextField isEdit={this.props.isEditBool}  {...this.state} title={Strings.onboarding.membership.title}
                errorMsg={this.state.membershipTitleError}
                returnKeyType={"next"}
                onSubmitEditing={() => this._textAmountRef.focus()}
                onChangeText={this.handleMembershipTitle}
              // onBlur={() => {
              //   this.setState({
              //     emailError: Validate.validateEmail(this.state.email)
              //   })
              // }}
              // blurOnSubmit={false}
              />
              <CustomTextField isEdit={this.props.isEditBool}  {...this.state} title={Strings.onboarding.membership.amount}
                errorMsg={this.state.membershipAmountError}
                returnKeyType={"next"}
                refName={ref => {
                  this._textAmountRef = ref;
                }}
                onSubmitEditing={() => this._textDetailsRef.focus()}
                onChangeText={this.handleMembershipAmount}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />


              <CustomTextField isEdit={this.props.isEditBool} styleCustom={multilineTextSt}
                numberOfLines={4} multiline={true}
                {...this.state} title={Strings.onboarding.membership.details}
                errorMsg={this.state.membershipDetailsError}
                returnKeyType={"next"}
                refName={ref => {
                  this._textDetailsRef = ref;
                }}
                onSubmitEditing={() => this._textStartDateRef.onPressDate()}
                onChangeText={this.handleMembershipDetails}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />
            </View>
            <View style={timeVwSt}>
              <View style={viewWidthSt}>
                <CustomDatePicker isEdit={this.props.isEditBool} title={Strings.onboarding.membership.startDate}
                  modeType='date'
                  setDateValue={membershipStartDate}
                  getDate={this.handleMembershipStartDate}
                  errorMsg={this.state.membershipStartDateError}
                  refName={ref => {
                    this._textStartDateRef = ref;
                  }}
                />
              </View>
              <View style={viewWidthSt}>
                <CustomDatePicker isEdit={this.props.isEditBool} title={Strings.onboarding.membership.endDate}
                  modeType='date'
                  setDateValue={membershipEndDate}
                  getDate={this.handleMembershipEndDate}
                  errorMsg={this.state.membershipEndDateError}
                />
              </View>
            </View>
            <View style={addVwSt}>
              {!this.props.isEditBool ?
                <CustomButton {...this.state} letterSpacingPr={true}
                  buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.selectedEventData ? "UPDATE" : "ADD"}
                  onPressPr={this.addMemberBtnAction} /> : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView>
            </KeyboardAvoidingView> */}

      </View>
    );
  }
}
const mapStateToProps = ({ routes, editOnReducer: { isEdit, isAdd } }) => ({
  routes: routes,
  isEditBool: isEdit,
  isAddBool: isAdd
});

const mapDispatchToProps = {
  addMemberShip,
  updateMemberShip,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(membershipAddScreen);
