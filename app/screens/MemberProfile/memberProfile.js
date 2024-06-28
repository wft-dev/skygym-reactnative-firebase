import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import styles from './styles';

import { Images, Validate, Strings, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import {
  CustomTextField, CustomButton, CustomButtonType,
  RadioButton, CustomImageUpload, CustomDatePicker, CustomDropDown, CustomSwitch, CustomChangePassword
} from '../../components/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { getMemberByID, updateMember } from '../../actions/member/memberAction';
import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
import md5 from 'md5';


class memberProfile extends Component {

  state = {
    fields: {
      [Strings.onboarding.member.firstName]: this.props.memberDataByID ? this.props.memberDataByID.firstName : '',
      [Strings.onboarding.member.lastName]: this.props.memberDataByID ? this.props.memberDataByID.lastName : '',
      [Strings.onboarding.member.idMember]: this.props.memberDataByID ? this.props.memberDataByID.idMember : '',
      [Strings.onboarding.member.phoneNo]: this.props.memberDataByID ? this.props.memberDataByID.phoneNo : '',
      [Strings.onboarding.member.email]: this.props.memberDataByID ? this.props.memberDataByID.email : '',
      [Strings.onboarding.member.password]: this.props.memberDataByID ? this.props.memberDataByID.passwordHash : '',
      [Strings.onboarding.member.address]: this.props.memberDataByID ? this.props.memberDataByID.address : '',
      [Strings.onboarding.member.gender]: this.props.memberDataByID ? this.props.memberDataByID.gender : '',
      [Strings.onboarding.member.dob]: this.props.memberDataByID ? this.props.memberDataByID.dob : '',

    },
    errors: {},
    memberImageUri: '',
    orientation: getOrientation(),
    isShowPasswordView: false,

  }

  componentDidMount() {
    this.props.getMemberByID(this.props.memberId, this.props.isOnlyMemberProfile)
    lor(this);
    this.props.editOn(true, false)
  }

  componentWillUnmount() {
    rol();
    //  this.keyboardWillShowListener.remove();
    //  this.keyboardWillHideListener.remove();
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
        if (key === Strings.onboarding.member.email) {
          errorTxt = Validate.validateEmail(text);
        }
        else if (key === Strings.onboarding.member.password) {
          errorTxt = this.props.memberDataByID ? '' : Validate.validatePassword(text);
        }
        else if (key === Strings.onboarding.member.dob) {
          errorTxt = Validate.validateAge(text);
        } else {
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
      const memberData = {
        firstName: this.state.fields[Strings.onboarding.member.firstName],
        lastName: this.state.fields[Strings.onboarding.member.lastName],
        name: this.state.fields[Strings.onboarding.member.firstName] + ' ' + this.state.fields[Strings.onboarding.member.lastName],
        phoneNo: this.state.fields[Strings.onboarding.member.phoneNo],
        email: this.state.fields[Strings.onboarding.member.email],
        address: this.state.fields[Strings.onboarding.member.address],
        gender: this.state.fields[Strings.onboarding.member.gender],
        dob: this.state.fields[Strings.onboarding.member.dob],
        imageUrl: this.state.memberImageUri ? this.state.memberImageUri : this.props.memberDataByID ? this.props.memberDataByID.imageUrl : '',
        updatedAt: this.props.user ? new Date() : '',
        passwordHash: md5(this.state.fields[Strings.onboarding.member.password]),

      }
      if (this.props.memberDataByID) {
        this.props.updateMember(false, '', memberData, this.props.memberDataByID ? this.props.memberDataByID.id : '',
          this.state.memberImageUri, '', this.props.memberDataByID.trainerIDAssign)

      }
    } else {
      console.warn('validation failed')
    }
  }




  getTarinerImage = (imageUri) => {
    this.setState({ memberImageUri: imageUri });
  }


  showPasswordView = (isshowPassword) => {
    if (!this.props.isEditBool) {
      Keyboard.dismiss()
      this.setState({ isShowPasswordView: isshowPassword })
    }
  }

  render() {
    const myStyle = styles(this.props);

    const { containerMainSt, scrollContentSt, bgViewSt,
      attendanceVwSt, textVwSt, multilineTextSt, leftRightVwSt, addVwSt, containerSt, viewWidthSt } = myStyle;
    const { whBgImg, memberImg } = Images
    return (
      <ImageBackground source={whBgImg} style={bgViewSt}  >

        <View style={containerMainSt}>

          <KeyboardAwareScrollView keyboardOpeningTime={0} enableResetScrollToCoords={false} showsVerticalScrollIndicator={false} contentContainerStyle={scrollContentSt}
            enableAutomaticScroll={true} extraScrollHeight={130} keyboardShouldPersistTaps="handled"
          >
            {/* <KeyboardAvoidingView   style={keyBordSt} behavior='padding'enabled > 

         <ScrollView style={scrollSt} ref={ref => {
            this.chatList = ref;
          }}  onScroll={this.handleScroll} contentContainerStyle={scrollContentSt}> */}

            <View style={containerSt}>
              {this.state.isShowPasswordView ? <View>
                <CustomChangePassword
                  id={this.props.memberDataByID ? this.props.memberDataByID.id : ''}
                  type={Constants.member}
                  userEmailId={this.props.memberDataByID ? this.props.memberDataByID.email : ''}
                  modelClosePr={() => this.showPasswordView(false)} />
              </View> : null}
              <CustomImageUpload
                setImage={this.props.memberDataByID ? this.props.memberDataByID.imageUrl : ''}

                isEdit={this.props.isEditBool}
                userImageFileUri={this.getTarinerImage}
                isUserImage={true} />

              <View style={textVwSt}>
                <View style={leftRightVwSt}>
                  <View style={viewWidthSt}>

                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.member.firstName}
                      value={this.state.fields[Strings.onboarding.member.firstName]}
                      errorMsg={this.state.errors[Strings.onboarding.member.firstName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.member.firstName] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.member.lastName].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.member.firstName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    />
                  </View>
                  <View style={viewWidthSt}>
                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.member.lastName}
                      value={this.state.fields[Strings.onboarding.member.lastName]}
                      errorMsg={this.state.errors[Strings.onboarding.member.lastName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.member.lastName] = ref;
                      }}
                      onSubmitEditing={() => {
                        if (this[Strings.onboarding.member.gender].state.selector !== true) {
                          this[Strings.onboarding.member.gender]._toggleSelector()
                        }

                      }}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.member.lastName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    // }}
                    />
                  </View>
                </View>
                <View style={leftRightVwSt}>
                  <View style={viewWidthSt}>
                    <CustomDropDown
                      refName={ref => {
                        this[Strings.onboarding.member.gender] = ref;
                      }}
                      isSearch={false}
                      isEdit={this.props.isEditBool}
                      selectText={this.state.fields[Strings.onboarding.member.gender]}
                      items={Constants.genderType}
                      title={Strings.onboarding.member.gender}
                      selectedText={(genderType) => this.handleChange(Strings.onboarding.member.gender, genderType.name)}
                      errorMsg={this.state.errors[Strings.onboarding.member.gender]}
                    />
                  </View>
                  <View style={viewWidthSt}>

                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.member.password}
                      value={this.state.fields[Strings.onboarding.member.password]}
                      errorMsg={this.state.errors[Strings.onboarding.member.password]}
                      secureTextEntry={true}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.member.password] = ref;
                      }}
                      onTouchStart={() => this.showPasswordView(this.props.memberDataByID)}
                      editable={this.state.fields[Strings.onboarding.member.password] ? false : true}

                      onSubmitEditing={() => this[Strings.onboarding.member.email].focus()}

                      onChangeText={(text) => this.handleChange(Strings.onboarding.member.password, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    />
                  </View>

                </View>
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.member.email}
                  value={this.state.fields[Strings.onboarding.member.email]}
                  errorMsg={this.state.errors[Strings.onboarding.member.email]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.member.email] = ref;
                  }}
                  onSubmitEditing={() => this[Strings.onboarding.member.address].focus()}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.member.email, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />

                <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                  title={Strings.onboarding.member.address}
                  styleCustom={multilineTextSt}
                  numberOfLines={4}
                  multiline={true}
                  value={this.state.fields[Strings.onboarding.member.address]}
                  errorMsg={this.state.errors[Strings.onboarding.member.address]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.member.address] = ref;
                  }}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.member.address, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
              </View>
              <View style={leftRightVwSt}>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.member.phoneNo}
                    value={this.state.fields[Strings.onboarding.member.phoneNo]}
                    errorMsg={this.state.errors[Strings.onboarding.member.phoneNo]}
                    returnKeyType={"done"}
                    keyboardType={'phone-pad'}
                    refName={ref => {
                      this[Strings.onboarding.member.phoneNo] = ref;
                    }}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.member.phoneNo, text)}
                    onSubmitEditing={() => this[Strings.onboarding.member.dob].onPressDate()}

                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  />

                </View>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool}
                    title={Strings.onboarding.member.dob}
                    modeType='date'
                    setDateValue={this.state.fields[Strings.onboarding.member.dob]}
                    getDate={(text) => this.handleChange(Strings.onboarding.member.dob, text)}
                    errorMsg={this.state.errors[Strings.onboarding.member.dob]}
                    refName={ref => {
                      this[Strings.onboarding.member.dob] = ref;
                    }}
                  />
                </View>
              </View>

              <View style={addVwSt}>
                {!this.props.isEditBool ?
                  <CustomButton {...this.state} letterSpacingPr={true}
                    buttonTypePr={CustomButtonType.dark} buttonTitlePr={"UPDATE"}
                    onPressPr={this.addBtnAction} /> : null}</View>
            </View>
          </KeyboardAwareScrollView>
          {/* </ScrollView>
            </KeyboardAvoidingView> */}
        </View>
      </ImageBackground>

    );
  }
}
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd }, memberReducer: { memberDataByID } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd,
  memberDataByID: memberDataByID
});

const mapDispatchToProps = {
  updateMember,
  getMemberByID,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memberProfile);