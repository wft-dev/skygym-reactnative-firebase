import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import styles from './styles';

import { Images, Validate, Strings, Constants } from '../../utlis'
import {
  CustomButton, CustomButtonType, CustomTextField, CustomImageUpload, CustomDatePicker, CustomChangePassword,
  CustomDropDown
} from '../../components/index';
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { updateUser, getUser } from '../../actions/session/sessionAction';
import { editOn } from '../../actions/editOn/editOnAction';

import { connect } from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { object } from 'prop-types';
class profileScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.profile.gymName]: this.props.user ? this.props.user.gymName : '',
      [Strings.onboarding.profile.gymID]: this.props.user ? this.props.user.gymID : '',
      [Strings.onboarding.profile.gymAddress]: this.props.user ? this.props.user.gymAddress : '',
      [Strings.onboarding.profile.gymTimings]: this.props.user ? this.props.user.gymTimings : '',
      [Strings.onboarding.profile.gymDays]: this.props.user ? this.props.user.gymDays : '',
      [Strings.onboarding.profile.firstName]: this.props.user ? this.props.user.firstName : '',
      [Strings.onboarding.profile.lastName]: this.props.user ? this.props.user.lastName : '',
      [Strings.onboarding.profile.gender]: this.props.user ? this.props.user.gender : '',
      [Strings.onboarding.profile.password]: this.props.user ? this.props.user.passwordHash : '',
      [Strings.onboarding.profile.email]: this.props.user ? this.props.user.email : '',
      [Strings.onboarding.profile.phoneNo]: this.props.user ? this.props.user.mobileNumber : '',
      [Strings.onboarding.profile.dob]: this.props.user ? this.props.user.dob : '',
    },
    errors: {},
    isShowPasswordView: false,
    profileImageUri: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);
    this.props.getUser(this.props.user.adminID)
    this.props.editOn((this.props.user ? true : false), (this.props.user ? false : true))
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
        if (key === Strings.onboarding.profile.email) {
          errorTxt = Validate.validateEmail(text);
        }  else if (key === Strings.onboarding.profile.dob) {
          errorTxt = Validate.validateAge(text);
        }
        else {
          errorTxt = Validate.validateInput(text, key);
        }
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


  addBtnAction = () => {
    if (this.handleValidation()) {
      const userData = {
        gymName: this.state.fields[Strings.onboarding.profile.gymName],
        gymID: this.state.fields[Strings.onboarding.profile.gymID],
        gymAddress: this.state.fields[Strings.onboarding.profile.gymAddress],
        gymTimings: this.state.fields[Strings.onboarding.profile.gymTimings],
        gymDays: this.state.fields[Strings.onboarding.profile.gymDays],
        firstName: this.state.fields[Strings.onboarding.profile.firstName],
        lastName: this.state.fields[Strings.onboarding.profile.lastName],
        name: this.state.fields[Strings.onboarding.profile.firstName] + ' ' + this.state.fields[Strings.onboarding.profile.lastName],
        gender: this.state.fields[Strings.onboarding.profile.gender],
        email: this.state.fields[Strings.onboarding.profile.email],
        mobileNumber: this.state.fields[Strings.onboarding.profile.phoneNo],
        dob: this.state.fields[Strings.onboarding.profile.dob],
        imageUrl: this.state.profileImageUri ? this.state.profileImageUri : this.props.user ? this.props.user.imageUrl : '',
        updatedAt: this.props.user ? new Date() : '',
        role: Constants.admin,
      }

     
      this.props.updateUser(userData, this.state.profileImageUri)
    } else {
    }
  }

  showPasswordView = (isshowPassword) => {
    if (!this.props.isEditBool ) {

    Keyboard.dismiss()
    this.setState({ isShowPasswordView: isshowPassword })
    }
  }

  getProfileImage = (imageUri) => {
    this.setState({ profileImageUri: imageUri });
  }


  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, scrollContentSt, scrollSt, ketBordSt, multilineTextSt, timeVwSt, addVwSt, imageVwSt, containerSt, viewWidthSt } = myStyle;
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>

        <KeyboardAwareScrollView keyboardOpeningTime={0} enableResetScrollToCoords={false} showsVerticalScrollIndicator={false} contentContainerStyle={scrollContentSt}
          enableAutomaticScroll={true} extraScrollHeight={130} keyboardShouldPersistTaps="handled"
        >
          {/* <KeyboardAvoidingView style={ketBordSt} behavior="padding" keyboardVerticalOffset={64}>

          <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}> */}

          <View style={containerSt}>
            {this.state.isShowPasswordView ? <View>
              <CustomChangePassword
                id={''}
                type={''}
                userEmailId={this.props.user.email} modelClosePr={() => this.showPasswordView(false)} />
            </View> : null}
            <View style={imageVwSt}>
              <CustomImageUpload isEdit={this.props.isEditBool} setImage={this.props.user.imageUrl} userImageFileUri={this.getProfileImage} isUserImage={true} />
            </View>
            <View >
              <View style={timeVwSt}>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool} {...this.state} title={Strings.onboarding.profile.gymName}
                    value={this.state.fields[Strings.onboarding.profile.gymName]}
                    errorMsg={this.state.errors[Strings.onboarding.profile.gymName]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.profile.gymName] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.profile.gymID].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.profile.gymName, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     ...this.state.errors,
                  //     [Strings.onboarding.profile.gymName]: Validate.validateEmail(this.state.fields[Strings.onboarding.profile.gymName])
                  //   })
                  // }}
                  // blurOnSubmit={false}
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.profile.gymID}
                    value={this.state.fields[Strings.onboarding.profile.gymID]}
                    errorMsg={this.state.errors[Strings.onboarding.profile.gymID]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.profile.gymID] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.profile.gymTimings].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.profile.gymID, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  // }}
                  />
                </View>
              </View>
              <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                title={Strings.onboarding.profile.gymTimings}
                value={this.state.fields[Strings.onboarding.profile.gymTimings]}
                errorMsg={this.state.errors[Strings.onboarding.profile.gymTimings]}
                returnKeyType={"next"}
                refName={ref => {
                  this[Strings.onboarding.profile.gymTimings] = ref;
                }}
                onSubmitEditing={() => {
                  if (this[Strings.onboarding.profile.gymDays].state.selector !== true) {
                    this[Strings.onboarding.profile.gymDays]._toggleSelector()
                  }
                }}
                onChangeText={(text) => this.handleChange(Strings.onboarding.profile.gymTimings, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />
              <CustomDropDown
                singleSelection={false}
                refName={ref => {
                  this[Strings.onboarding.profile.gymDays] = ref;
                }}
                isSearch={true}
                isEdit={this.props.isEditBool}
                selectText={this.state.fields[Strings.onboarding.profile.gymDays]}
                items={Constants.gymDays}
                title={Strings.onboarding.profile.gymDays}
                selectedText={(gymDays) =>
                  this.handleChange(Strings.onboarding.profile.gymDays, gymDays)
                }
                errorMsg={this.state.errors[Strings.onboarding.profile.gymDays]}
              />
              <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                title={Strings.onboarding.profile.gymAddress}
                styleCustom={multilineTextSt}
                numberOfLines={4}
                multiline={true}
                value={this.state.fields[Strings.onboarding.profile.gymAddress]}
                errorMsg={this.state.errors[Strings.onboarding.profile.gymAddress]}
                returnKeyType={"next"}
                refName={ref => {
                  this[Strings.onboarding.profile.gymAddress] = ref;
                }}
                onChangeText={(text) => this.handleChange(Strings.onboarding.profile.gymAddress, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />

              <View style={timeVwSt}>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.profile.firstName}
                    value={this.state.fields[Strings.onboarding.profile.firstName]}
                    errorMsg={this.state.errors[Strings.onboarding.profile.firstName]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.profile.firstName] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.profile.lastName].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.profile.firstName, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.profile.lastName}
                    value={this.state.fields[Strings.onboarding.profile.lastName]}
                    errorMsg={this.state.errors[Strings.onboarding.profile.lastName]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.profile.lastName] = ref;
                    }}
                    onSubmitEditing={() => {
                      if (this[Strings.onboarding.profile.gender].state.selector !== true) {
                        this[Strings.onboarding.profile.gender]._toggleSelector()
                      }
                    }}                   
                     onChangeText={(text) => this.handleChange(Strings.onboarding.profile.lastName, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  // }}
                  />
                </View>
              </View>

              <View style={timeVwSt}>
                <View style={viewWidthSt}>
                  {/* <CustomTextField  isEdit = {this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.profile.gender}
                      value={this.state.fields[Strings.onboarding.profile.gender]}
                      errorMsg={this.state.errors[Strings.onboarding.profile.gender]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.profile.gender] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.profile.email].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.profile.gender, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    /> */}
                  <CustomDropDown
                  refName={ref => {
                    this[Strings.onboarding.profile.gender] = ref;
                  }}
                    isSearch={false}
                    isEdit={this.props.isEditBool}
                    selectText={this.state.fields[Strings.onboarding.profile.gender]}
                    items={Constants.genderType}
                    title={Strings.onboarding.profile.gender}
                    selectedText={(genderType) => this.handleChange(Strings.onboarding.profile.gender, genderType.name)}
                    errorMsg={this.state.errors[Strings.onboarding.profile.gender]}
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.profile.password}
                    value={this.state.fields[Strings.onboarding.profile.password]}
                    secureTextEntry={true}
                    errorMsg={this.state.errors[Strings.onboarding.profile.password]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.profile.password] = ref;
                    }}
                    editable={this.state.fields[Strings.onboarding.profile.password] ? false : true}
                    //onSubmitEditing={() =>  this[Strings.onboarding.profile.email].focus()}
                    // onChangeText={(text) => this.handleChange(Strings.onboarding.profile.password, text)}
                    onTouchStart={() =>
                        this.showPasswordView(!this.props.isEditBool)
                    }
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  // }}
                  />
                </View>
              </View>

              <CustomTextField isEdit={this.props.isEditBool}
                {...this.state} title={Strings.onboarding.profile.email}
                value={this.state.fields[Strings.onboarding.profile.email]}
                errorMsg={this.state.errors[Strings.onboarding.profile.email]}
                returnKeyType={"next"}
                refName={ref => {
                  this[Strings.onboarding.profile.email] = ref;
                }}
                onSubmitEditing={() => this[Strings.onboarding.profile.phoneNo].focus()}
                onChangeText={(text) => this.handleChange(Strings.onboarding.profile.email, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              // }}
              />
            </View>
            <View style={timeVwSt}>
              <View style={viewWidthSt}>
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.profile.phoneNo}
                  value={this.state.fields[Strings.onboarding.profile.phoneNo]}
                  errorMsg={this.state.errors[Strings.onboarding.profile.phoneNo]}
                  returnKeyType={"next"}
                  keyboardType={'phone-pad'}
                  refName={ref => {
                    this[Strings.onboarding.profile.phoneNo] = ref;
                  }}
                  onSubmitEditing={() => this[Strings.onboarding.profile.dob].onPressDate()}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.profile.phoneNo, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                />
              </View>
              <View style={viewWidthSt}>
                <CustomDatePicker isEdit={this.props.isEditBool}
                  title={Strings.onboarding.profile.dob}
                  modeType='date'
                  setDateValue={this.state.fields[Strings.onboarding.profile.dob]}
                  getDate={(text) => this.handleChange(Strings.onboarding.profile.dob, text)}
                  errorMsg={this.state.errors[Strings.onboarding.profile.dob]}
                  refName={ref => {
                    this[Strings.onboarding.profile.dob] = ref;
                  }}
                />
              </View>
            </View>
            <View style={addVwSt}>
              {!this.props.isEditBool ?
                <CustomButton {...this.state} letterSpacingPr={true}
                  buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.user ? "UPDATE" : "ADD"}
                  onPressPr={this.addBtnAction} /> : null}
            </View>
          </View>

          {/* </ScrollView>
        </KeyboardAvoidingView> */}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd
});

const mapDispatchToProps = {
  updateUser,
  getUser,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileScreen);