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
import { addTrainer, updateTrainer } from '../../actions/trainer/trainerAction';
import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
import md5 from 'md5';


class trainerAddScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.trainer.firstName]: this.props.selectedTrainerData ? this.props.selectedTrainerData.firstName : '1',
      [Strings.onboarding.trainer.lastName]: this.props.selectedTrainerData ? this.props.selectedTrainerData.lastName : '1',
      [Strings.onboarding.trainer.idTrainer]: this.props.selectedTrainerData ? this.props.selectedTrainerData.idTrainer : '1',
      [Strings.onboarding.trainer.phoneNo]: this.props.selectedTrainerData ? this.props.selectedTrainerData.phoneNo : '1',
      [Strings.onboarding.trainer.email]: this.props.selectedTrainerData ? this.props.selectedTrainerData.email : '1@gmail.com',
      [Strings.onboarding.trainer.password]: this.props.selectedTrainerData ? this.props.selectedTrainerData.passwordHash : '',
      [Strings.onboarding.trainer.address]: this.props.selectedTrainerData ? this.props.selectedTrainerData.address : '1',
      [Strings.onboarding.trainer.gender]: this.props.selectedTrainerData ? this.props.selectedTrainerData.gender : '1',
      [Strings.onboarding.trainer.salary]: this.props.selectedTrainerData ? this.props.selectedTrainerData.salary : '1',
      [Strings.onboarding.trainer.uploadIDProof]: this.props.selectedTrainerData ? this.props.selectedTrainerData.uploadIDProof : '',
      [Strings.onboarding.trainer.shiftDays]: this.props.selectedTrainerData ? this.props.selectedTrainerData.shiftDays : '1',
      [Strings.onboarding.trainer.shiftTimings]: this.props.selectedTrainerData ? this.props.selectedTrainerData.shiftTimings : '1',
      [Strings.onboarding.trainer.dob]: this.props.selectedTrainerData ? this.props.selectedTrainerData.dob : '1',
      [Strings.onboarding.trainer.dateOfJoin]: this.props.selectedTrainerData ? this.props.selectedTrainerData.dateOfJoin : '',
      [Strings.onboarding.trainer.visitor]: this.props.selectedTrainerData ? this.props.selectedTrainerData.visitorPermission : false,
      [Strings.onboarding.trainer.member]: this.props.selectedTrainerData ? this.props.selectedTrainerData.memberPermission : false,
      [Strings.onboarding.trainer.event]: this.props.selectedTrainerData ? this.props.selectedTrainerData.eventPermission : false,
      [Strings.onboarding.trainer.trainerType]: this.props.selectedTrainerData ? this.props.selectedTrainerData.trainerType : 'General',
    },
    errors: {},
    trainerImageUri: '',
    trinerIdProofImage: '',
    orientation: getOrientation(),
    isShowPasswordView: false,
    isRemoveTrainerIdProof: false,

  }

  componentDidMount() {
    lor(this);
    this.props.editOn((this.props.selectedTrainerData ? true : false), (this.props.selectedTrainerData ? false : true))
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
          errorTxt = this.props.selectedTrainerData ? '' : Validate.validatePassword(text);
        }
        else if (key === Strings.onboarding.trainer.uploadIDProof) {
          errorTxt = Validate.validateIDProof(text);
        } else if (key === Strings.onboarding.member.dob) {
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
        idTrainer: this.state.fields[Strings.onboarding.trainer.idTrainer],
        id: this.state.fields[Strings.onboarding.trainer.idTrainer],
        phoneNo: this.state.fields[Strings.onboarding.trainer.phoneNo],
        email: this.state.fields[Strings.onboarding.trainer.email],
        address: this.state.fields[Strings.onboarding.trainer.address],
        gender: this.state.fields[Strings.onboarding.trainer.gender],
        salary: this.state.fields[Strings.onboarding.trainer.salary],
        uploadIDProof: this.state.trinerIdProofImage ? this.state.trinerIdProofImage : this.state.fields[Strings.onboarding.trainer.uploadIDProof],
        shiftDays: this.state.fields[Strings.onboarding.trainer.shiftDays],
        shiftTimings: this.state.fields[Strings.onboarding.trainer.shiftTimings],
        dob: this.state.fields[Strings.onboarding.trainer.dob],
        dateOfJoin: this.state.fields[Strings.onboarding.trainer.dateOfJoin],
        imageUrl: this.state.trainerImageUri ? this.state.trainerImageUri : this.props.selectedTrainerData ? this.props.selectedTrainerData.imageUrl : '',
        updatedAt: this.props.selectedTrainerData ? new Date() : '',
        createdAt: this.props.selectedTrainerData ? this.props.selectedTrainerData.createdAt : new Date(),
        visitorPermission: this.state.fields[Strings.onboarding.trainer.visitor],
        memberPermission: this.state.fields[Strings.onboarding.trainer.member],
        eventPermission: this.state.fields[Strings.onboarding.trainer.event],
        adminID: this.props.user.adminID,
        trainerType: this.state.fields[Strings.onboarding.trainer.trainerType],
        addedBy: this.props.selectedTrainerData ? this.props.selectedTrainerData.addedBy : this.props.user.role,
        addedByID: this.props.selectedTrainerData ? this.props.selectedTrainerData.addedByID : this.props.user.id,
        addedByName: this.props.selectedTrainerData ? this.props.selectedTrainerData.addedByName : this.props.user.name,
        updateBy: this.props.selectedTrainerData ? this.props.user.role : '',
        updateByID: this.props.selectedTrainerData ? this.props.user.id : '',
        updateByName: this.props.selectedTrainerData ? this.props.user.name : '',
        passwordHash: this.state.fields[Strings.onboarding.trainer.password],
        role: Constants.trainer,

      }
      if (this.props.selectedTrainerData) {
        this.props.updateTrainer(trainerData, this.props.selectedTrainerData ? this.props.selectedTrainerData.id : '', this.state.trainerImageUri, this.state.trinerIdProofImage)
      } else {
        this.props.addTrainer(trainerData,
          md5(this.state.fields[Strings.onboarding.trainer.password]), this.state.trainerImageUri, this.state.trinerIdProofImage)
      }
    } else {
      console.warn('validation failed')
    }
  }

  getTrainerTypeFromRadioBtn = (result) => {
    this.setState({ trainerType: result });
    this.handleChange(Strings.onboarding.trainer.trainerType, result)
  }

  getReomveIdProof = (result) => {
    this.setState({ isRemoveTrainerIdProof: result });
    this.setState({ trinerIdProofImage: '' });
    this.handleChange(Strings.onboarding.trainer.uploadIDProof, '')
  }
  getTarinerImage = (imageUri) => {
    this.setState({ trainerImageUri: imageUri });
  }

  getIdProofImage = (imageUri) => {
    this.setState({ trinerIdProofImage: imageUri });
    this.handleChange(Strings.onboarding.trainer.uploadIDProof, imageUri)
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
                  id={this.props.selectedTrainerData ? this.props.selectedTrainerData.id : ''}
                  type={Constants.trainer}
                  userEmailId={this.props.selectedTrainerData ? this.props.selectedTrainerData.email : ''}
                  modelClosePr={() => this.showPasswordView(false)} />
              </View> : null}
              <CustomImageUpload
                setImage={this.props.selectedTrainerData ? this.props.selectedTrainerData.imageUrl : ''}

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
                      onSubmitEditing={() => this[Strings.onboarding.trainer.idTrainer].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.lastName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    // }}
                    />
                  </View>
                </View>
                {/* <View style={leftRightVwSt}>
                  <View style={viewWidthSt}> */}
                {this.props.selectedTrainerData &&
                  <CustomTextField isEdit={this.props.isEditBool}
                    editable={false}
                    {...this.state} title={Strings.onboarding.trainer.idTrainer}
                    value={this.state.fields[Strings.onboarding.trainer.idTrainer]}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.idTrainer]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.trainer.idTrainer] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.trainer.phoneNo].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.idTrainer, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  // }}
                  />
                }
                {/* </View>
                  <View style={viewWidthSt}> */}
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
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                />
                {/* </View>
                </View> */}
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.trainer.email}
                  value={this.state.fields[Strings.onboarding.trainer.email]}
                  errorMsg={this.state.errors[Strings.onboarding.trainer.email]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.trainer.email] = ref;
                  }}
                  onSubmitEditing={() => this[Strings.onboarding.trainer.password].focus()}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.email, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.trainer.password}
                  value={this.state.fields[Strings.onboarding.trainer.password]}
                  errorMsg={this.state.errors[Strings.onboarding.trainer.password]}
                  secureTextEntry={true}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.trainer.password] = ref;
                  }}
                  onTouchStart={() => this.showPasswordView(this.props.selectedTrainerData)}
                  editable={this.state.fields[Strings.onboarding.trainer.password] ? false : true}

                  onSubmitEditing={() => this[Strings.onboarding.trainer.address].focus()}

                  onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.password, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
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
                  {/* <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.trainer.gender}
                    value={this.state.fields[Strings.onboarding.trainer.gender]}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.gender]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.trainer.gender] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.trainer.salary].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.gender, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  /> */}
                  <CustomDropDown
                    isSearch={false}
                    isEdit={this.props.isEditBool}
                    selectText={this.state.fields[Strings.onboarding.trainer.gender]}
                    items={Constants.genderType}
                    title={Strings.onboarding.trainer.gender}
                    selectedText={(genderType) => this.handleChange(Strings.onboarding.trainer.gender, genderType.name)}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.gender]}
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.trainer.salary}
                    value={this.state.fields[Strings.onboarding.trainer.salary]}
                    errorMsg={this.state.errors[Strings.onboarding.trainer.salary]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.trainer.salary] = ref;
                    }}
                    onSubmitEditing={() => this[Strings.onboarding.trainer.shiftDays].focus()}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.salary, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  />
                </View>
              </View>

              <CustomImageUpload
                setIDImage={this.state.fields[Strings.onboarding.trainer.uploadIDProof]}

                imageNametitle={(text) => console.warn(text)}
                isEdit={this.props.isEditBool}
                idProofImageFileUri={this.getIdProofImage}
                isRemoveIdProof={this.getReomveIdProof}
                errorMsg={this.state.errors[Strings.onboarding.trainer.uploadIDProof]} />
              <CustomDropDown
                singleSelection={false}
                refName={ref => {
                  this[Strings.onboarding.trainer.shiftDays] = ref;
                }}
                isSearch={true}
                isEdit={this.props.isEditBool}
                selectText={this.state.fields[Strings.onboarding.trainer.shiftDays]}
                items={Constants.gymDays}
                title={Strings.onboarding.trainer.shiftDays}
                selectedText={(gymDays) =>
                  this.handleChange(Strings.onboarding.trainer.shiftDays, gymDays)
                }
                errorMsg={this.state.errors[Strings.onboarding.trainer.shiftDays]}
              />

              <CustomTextField isEdit={this.props.isEditBool}
                {...this.state} title={Strings.onboarding.trainer.shiftTimings}
                value={this.state.fields[Strings.onboarding.trainer.shiftTimings]}
                errorMsg={this.state.errors[Strings.onboarding.trainer.shiftTimings]}
                returnKeyType={"next"}
                refName={ref => {
                  this[Strings.onboarding.trainer.shiftTimings] = ref;
                }}
                onSubmitEditing={() => this[Strings.onboarding.trainer.dob].onPressDate()}
                onChangeText={(text) => this.handleChange(Strings.onboarding.trainer.shiftTimings, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              />
              <RadioButton isEdit={this.props.isEditBool} radioBtnName={this.getTrainerTypeFromRadioBtn}
                setValue={this.state.fields[Strings.onboarding.trainer.trainerType]} />
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
              <CustomDatePicker isEdit={this.props.isEditBool}
                title={Strings.onboarding.trainer.dateOfJoin}
                modeType='date'
                setDateValue={this.state.fields[Strings.onboarding.trainer.dateOfJoin]}
                getDate={(text) => this.handleChange(Strings.onboarding.trainer.dateOfJoin, text)}
                errorMsg={this.state.errors[Strings.onboarding.trainer.dateOfJoin]}
                refName={ref => {
                  this[Strings.onboarding.trainer.dateOfJoin] = ref;
                }}
              />
              <CustomSwitch isEdit={this.props.isEditBool}
                mainTitle={Strings.onboarding.trainer.permissionToAccess}
                title={Strings.onboarding.trainer.visitor}
                setValue={this.state.fields[Strings.onboarding.trainer.visitor]}
                getValue={(text) => this.handleChange(Strings.onboarding.trainer.visitor, text)}
              />

              <CustomSwitch isEdit={this.props.isEditBool}
                setValue={this.state.fields[Strings.onboarding.trainer.member]}
                getValue={(text) => this.handleChange(Strings.onboarding.trainer.member, text)}
                title={Strings.onboarding.trainer.member}
              />
              <CustomSwitch isEdit={this.props.isEditBool}
                title={Strings.onboarding.trainer.event}
                setValue={this.state.fields[Strings.onboarding.trainer.event]}
                getValue={(text) => this.handleChange(Strings.onboarding.trainer.event, text)}
              />
              {!this.props.isEditBool && this.props.selectedTrainerData || this.props.user.role === Constants.trainer ? <View style={attendanceVwSt}>
                <CustomButton {...this.state} letterSpacingPr={true}
                  buttonTypePr={CustomButtonType.border} buttonTitlePr={"ATTENDANCE"}
                  onPressPr={() =>
                    Actions.Attendance({ selectedMemberID: this.props.selectedTrainerData.id, selectedMemberData: this.props.selectedTrainerData, screenType: Constants.trainer })
                  } />
              </View>
                : null}
              <View style={addVwSt}>
                {!this.props.isEditBool ?
                  <CustomButton {...this.state} letterSpacingPr={true}
                    buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.selectedTrainerData ? "UPDATE" : "ADD"}
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
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd
});

const mapDispatchToProps = {
  addTrainer,
  updateTrainer,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(trainerAddScreen);