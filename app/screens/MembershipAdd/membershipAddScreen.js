import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import styles from './styles';


import { Images, Strings, Validate } from '../../utils'
import firebase from 'firebase/app';
import {
  CustomTextField, CustomButton, CustomButtonType,
  CustomDropDown
} from '../../components/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { addMemberShip, updateMemberShip } from '../../actions/memberShip/memberShipAction';
import { editOn } from '../../actions/editOn/editOnAction';

import { connect } from 'react-redux';


const planType = [
  {
    id: '0',
    name: 'Membership for 1 Month',
  },
  {
    id: '1',
    name: 'Membership for 2 Months',
  },
  {
    id: '2',
    name: 'Membership for 3 Months',
  },
  {
    id: '3',
    name: 'Membership for 3 Months',
  },
  {
    id: '4',
    name: 'Membership for 5 Months',
  },
  {
    id: '5',
    name: 'Membership for 6 Months',
  }, {
    id: '6',
    name: 'Membership for 7 Months',
  }, {
    id: '7',
    name: 'Membership for 8 Months',
  },
  {
    id: '8',
    name: 'Membership for 9 Months',
  }, {
    id: '9',
    name: 'Membership for 10 Months',
  },
];

class membershipAddScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.membership.title]: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipTitle : '1',
      [Strings.onboarding.membership.amount]: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipAmount : '1',
      [Strings.onboarding.membership.details]: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipDetails : '1',
    },
    errors: {},
    // membershipTitle: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipTitle : '',
    // membershipTitleError: '',
    // membershipAmount: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipAmount : '',
    // membershipAmountError: '',
    // membershipDetails: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipDetails : '',
    // membershipDetailsError: '',
    // membershipStartDate: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipStartDate : '',
    // membershipStartDateError: '',
    // membershipEndDate: this.props.selectedMembershipData ? this.props.selectedMembershipData.membershipEndDate : '',
    // membershipEndDateError: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);
    this.props.editOn((this.props.selectedMembershipData ? true : false), (this.props.selectedMembershipData ? false : true))
  }

  componentWillUnmount() {
    rol();
  }


  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e;
    let errors = this.state.errors;
    errors[field] = ''
    // errors[field] = Validate.validateEmail(e);
    this.setState({ fields, errors });
    // if (!errors[field]) {
    //   errors[field] = '';
    //   this.setState({errors});

    // }
  }

  handleValidation() {
    let formIsValid = true;
    Object.entries(this.state.fields).forEach(([key, value]) => {
      let text = value
      let textKey = key
      let errors = this.state.errors;
      errors[key] = '';
      this.setState({ errors });
      Object.entries(this.state.errors).filter(([key, value]) => key === textKey).map(([key]) => {
        let errorTxt = '';

        errorTxt = Validate.validateInput(text, key);
        let errors = this.state.errors;
        errors[key] = errorTxt;
        if (errors[key]) {
          formIsValid = false;
        }
        this.setState({ errors });
      })
    });
    return formIsValid;
  }


  addMemberBtnAction = () => {
    if (this.handleValidation()) {
      const memberShipData = {
        name: this.state.fields[Strings.onboarding.membership.title],
        membershipTitle: this.state.fields[Strings.onboarding.membership.title],
        membershipAmount: this.state.fields[Strings.onboarding.membership.amount],
        membershipDetails: this.state.fields[Strings.onboarding.membership.details],
        // membershipStartDate: membershipStartDate,
        // membershipEndDate: membershipEndDate,
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
  }

  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, scrollContentSt, scrollSt, keyBordSt, textVwSt, multilineTextSt, timeVwSt, addVwSt, containerSt, viewWidthSt } = myStyle;
    const { bgImg, } = Images
    const { membershipTitle, membershipAmount, membershipDetails, membershipStartDate, membershipEndDate } = this.state

    return (
      <View style={containerMainSt}>
        <KeyboardAwareScrollView ref='scroll' scroll showsVerticalScrollIndicator={false} contentContainerStyle={scrollContentSt}
          enableAutomaticScroll={true} extraScrollHeight={130} keyboardShouldPersistTaps="handled"
          resetScrollToCoords={{ x: 0, y: 0 }}>
          {/* <KeyboardAvoidingView   style={keyBordSt} behavior='padding'enabled > 

         <ScrollView style={scrollSt} ref={ref => {
            this.chatList = ref;
          }}  onScroll={this.handleScroll} contentContainerStyle={scrollContentSt}> */}

          <View style={containerSt}>
            <View style={textVwSt}>
              {/* <CustomTextField isEdit={this.props.isEditBool}  {...this.state} title={Strings.onboarding.membership.title}
                value={membershipTitle}
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
              /> */}

              <CustomDropDown
                isSearch={true}
                isEdit={this.props.isEditBool}
                selectText={this.state.fields[Strings.onboarding.membership.title]}
                items={planType}
                title={Strings.onboarding.membership.title}
                selectedText={(planType) => this.handleChange(Strings.onboarding.membership.title, planType.name)}
                errorMsg={this.state.errors[Strings.onboarding.membership.title]}
              />


              <CustomTextField isEdit={this.props.isEditBool}  {...this.state}
                title={Strings.onboarding.membership.amount}
                value={this.state.fields[Strings.onboarding.membership.amount]}
                errorMsg={this.state.errors[Strings.onboarding.membership.amount]}
                returnKeyType={"next"}
                keyboardType={'numeric'}
                refName={ref => {
                  this[Strings.onboarding.membership.amount] = ref;
                }}
                onSubmitEditing={() => this[Strings.onboarding.membership.details].focus()}
                onChangeText={(text) => this.handleChange(Strings.onboarding.membership.amount, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />


              <CustomTextField isEdit={this.props.isEditBool}
                value={this.state.fields[Strings.onboarding.membership.details]}
                styleCustom={multilineTextSt}
                numberOfLines={4} multiline={true}
                {...this.state} title={Strings.onboarding.membership.details}
                errorMsg={this.state.errors[Strings.onboarding.membership.details]}
                returnKeyType={"next"}
                refName={ref => {
                  this[Strings.onboarding.membership.details] = ref;
                }}
                // onSubmitEditing={() => this._textStartDateRef.onPressDate()}
                onChangeText={(text) => this.handleChange(Strings.onboarding.membership.details, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />
            </View>
            {/* <View style={timeVwSt}>
              <View style={viewWidthSt}>
                <CustomDatePicker
                  isEdit={this.props.isEditBool} title={Strings.onboarding.membership.startDate}
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
            </View> */}
            <View style={addVwSt}>
              {!this.props.isEditBool ?
                <CustomButton {...this.state} letterSpacingPr={true}
                  buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.selectedMembershipData ? "UPDATE" : "ADD"}
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
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd,
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
