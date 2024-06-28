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
import { getTrainerByID, updateTrainer } from '../../actions/trainer/trainerAction';
import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
import md5 from 'md5';


class trainerProfile extends Component {

  state = {
    fields: {
      [Strings.onboarding.trainer.firstName]: this.props.trainerDataByID ? this.props.trainerDataByID.firstName : '',
      [Strings.onboarding.trainer.lastName]: this.props.trainerDataByID ? this.props.trainerDataByID.lastName : '',
      [Strings.onboarding.trainer.idTrainer]: this.props.trainerDataByID ? this.props.trainerDataByID.idTrainer : '',
      [Strings.onboarding.trainer.phoneNo]: this.props.trainerDataByID ? this.props.trainerDataByID.phoneNo : '',
      [Strings.onboarding.trainer.email]: this.props.trainerDataByID ? this.props.trainerDataByID.email : '',
      [Strings.onboarding.trainer.password]: this.props.trainerDataByID ? this.props.trainerDataByID.passwordHash : '',
      [Strings.onboarding.trainer.address]: this.props.trainerDataByID ? this.props.trainerDataByID.address : '',
      [Strings.onboarding.trainer.gender]: this.props.trainerDataByID ? this.props.trainerDataByID.gender : '',
      [Strings.onboarding.trainer.dob]: this.props.trainerDataByID ? this.props.trainerDataByID.dob : '',
      [Strings.onboarding.trainer.shiftTimings]: this.props.trainerDataByID ? this.props.trainerDataByID.shiftTimings : '',
      [Strings.onboarding.trainer.shiftDays]: this.props.trainerDataByID ? this.props.trainerDataByID.shiftDays : '',
    },
    errors: {},
    trainerImageUri: '',
    orientation: getOrientation(),
    isShowPasswordView: false,

  }

  componentDidMount() {
    this.props.getTrainerByID(this.props.trainerId, this.props.isOnlyTrainerProfile)

    lor(this);
    console.warn(this.props.trainerDataByID ? this.props.trainerDataByID.gymTimings : "");
    if (this.props.isOnlyTrainerProfile === true) {
      this.props.editOn(true, false)

    } else {
      this.props.editOn(true, false)
    }
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
        if (key === Strings.onboarding.trainer.email) {
          errorTxt = Validate.validateEmail(text);
        }
        else if (key === Strings.onboarding.trainer.password) {
          errorTxt = this.props.trainerDataByID ? '' : Validate.validatePassword(text);
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
      const trainerData = {
        firstName: this.state.fields[Strings.onboarding.trainer.firstName],
        lastName: this.state.fields[Strings.onboarding.trainer.lastName],
        name: this.state.fields[Strings.onboarding.trainer.firstName] + ' ' + this.state.fields[Strings.onboarding.trainer.lastName],
        phoneNo: this.state.fields[Strings.onboarding.trainer.phoneNo],
        email: this.state.fields[Strings.onboarding.trainer.email],
        address: this.state.fields[Strings.onboarding.trainer.address],
        gender: this.state.fields[Strings.onboarding.trainer.gender],
        dob: this.state.fields[Strings.onboarding.trainer.dob],
        imageUrl: this.state.trainerImageUri ? this.state.trainerImageUri : this.props.trainerDataByID ? this.props.trainerDataByID.imageUrl : '',
        updatedAt: this.props.user ? new Date() : '',
        passwordHash: md5(this.state.fields[Strings.onboarding.trainer.password]),

      }
      if (this.props.trainerDataByID) {
        this.props.updateTrainer(trainerData, this.props.trainerDataByID ? this.props.trainerDataByID.id : '', this.state.trainerImageUri, '', true)
      }
    } else {
      console.warn('validation failed')
    }
  }




  getTarinerImage = (imageUri) => {
    this.setState({ trainerImageUri: imageUri });
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
                  id={this.props.trainerDataByID ? this.props.trainerDataByID.id : ''}
                  type={Constants.trainer}
                  userEmailId={this.props.trainerDataByID ? this.props.trainerDataByID.email : ''}
                  modelClosePr={() => this.showPasswordView(false)} />
              </View> : null}
              <CustomImageUpload
                setImage={this.props.trainerDataByID ? this.props.trainerDataByID.imageUrl : ''}

                isEdit={this.props.isEditBool}
                userImageFileUri={this.getTarinerImage}
                isUserImage={true} />

              <View style={textVwSt}>
                <View style={leftRightVwSt}>
                  <View style={viewWidthSt}>

                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.trainer.firstName}
                      value={this.state.fields[Strings.onboarding.trainer.firstName]}
                      errorMsg={this.state.errors[Strings.onboarding.trainer.firstName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.trainer.firstName] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.trainer.lastName].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.firstName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    />
                  </View>
                  <View style={viewWidthSt}>
                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.trainer.lastName}
                      value={this.state.fields[Strings.onboarding.trainer.lastName]}
                      errorMsg={this.state.errors[Strings.onboarding.trainer.lastName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.trainer.lastName] = ref;
                      }}
                      onSubmitEditing={() => {
                        if (this[Strings.onboarding.trainer.gender].state.selector !== true) {
                          this[Strings.onboarding.trainer.gender]._toggleSelector()
                        }

                      }}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.lastName, text)}
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
                        this[Strings.onboarding.trainer.gender] = ref;
                      }}
                      isSearch={false}
                      isEdit={this.props.isEditBool}
                      selectText={this.state.fields[Strings.onboarding.trainer.gender]}
                      items={Constants.genderType}
                      title={Strings.onboarding.trainer.gender}
                      selectedText={(genderType) => this.handleChange(Strings.onboarding.trainer.gender, genderType.name)}
                      errorMsg={this.state.errors[Strings.onboarding.trainer.gender]}
                    />
                  </View>
                  {this.props.isOnlyTrainerProfile === false ?
                    <View style={viewWidthSt}>

                      <CustomTextField isEdit={this.props.isEditBool}
                        {...this.state} title={Strings.onboarding.trainer.password}
                        value={this.state.fields[Strings.onboarding.trainer.password]}
                        errorMsg={this.state.errors[Strings.onboarding.trainer.password]}
                        secureTextEntry={true}
                        returnKeyType={"next"}
                        refName={ref => {
                          this[Strings.onboarding.trainer.password] = ref;
                        }}
                        onTouchStart={() => this.showPasswordView(this.props.trainerDataByID)}
                        editable={this.state.fields[Strings.onboarding.trainer.password] ? false : true}

                        onSubmitEditing={() => this[Strings.onboarding.trainer.email].focus()}

                        onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.password, text)}
                      // onBlur={() => {
                      //   this.setState({
                      //     passwordError: Validate.validatePassword(this.state.password)
                      //   })
                      />
                    </View>

                    : null}
                </View>
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.trainer.email}
                  value={this.state.fields[Strings.onboarding.trainer.email]}
                  errorMsg={this.state.errors[Strings.onboarding.trainer.email]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.trainer.email] = ref;
                  }}
                  onSubmitEditing={() => this[Strings.onboarding.trainer.address].focus()}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.email, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />

                <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                  title={Strings.onboarding.trainer.address}
                  styleCustom={multilineTextSt}
                  numberOfLines={4}
                  multiline={true}
                  value={this.state.fields[Strings.onboarding.trainer.address]}
                  errorMsg={this.state.errors[Strings.onboarding.trainer.address]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.trainer.address] = ref;
                  }}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.address, text)}
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
                    {...this.state} title={Strings.onboarding.trainer.phoneNo}
                    value={this.state.fields[Strings.onboarding.trainer.phoneNo]}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.phoneNo]}
                    returnKeyType={"done"}
                    keyboardType={'phone-pad'}
                    refName={ref => {
                      this[Strings.onboarding.trainer.phoneNo] = ref;
                    }}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.phoneNo, text)}
                    onSubmitEditing={() => this[Strings.onboarding.trainer.dob].onPressDate()}

                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  />

                </View>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool}
                    title={Strings.onboarding.trainer.dob}
                    modeType='date'
                    setDateValue={this.state.fields[Strings.onboarding.trainer.dob]}
                    getDate={(text) => this.handleChange(Strings.onboarding.trainer.dob, text)}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.dob]}
                    refName={ref => {
                      this[Strings.onboarding.trainer.dob] = ref;
                    }}
                  />
                </View>
              </View>
              {this.props.isOnlyTrainerProfile === true ?
                <View >
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.trainer.shiftTimings}
                    value={this.state.fields[Strings.onboarding.trainer.shiftTimings]}
                  />
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.trainer.shiftDays}
                    styleCustom={multilineTextSt}
                    numberOfLines={4}
                    multiline={true}
                    value={this.state.fields[Strings.onboarding.trainer.shiftDays]}
                  />
                </View>

                : null}
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
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd }, trainerReducer: { trainerDataByID } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd,
  trainerDataByID: trainerDataByID
});

const mapDispatchToProps = {
  updateTrainer,
  getTrainerByID,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(trainerProfile);