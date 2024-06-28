import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import styles from './styles';

import { Images, Validate, Strings, Constants } from '../../utils'
import { CustomTextField, CustomButton, CustomButtonType, CustomDropDown, CustomImageUpload, CustomDatePicker } from '../../components/index';
import { Actions } from 'react-native-router-flux'
import { addVisitor, updateVisitor } from '../../actions/visitor/visitorAction';
import { editOn } from '../../actions/editOn/editOnAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

class visitorAddScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.visitor.firstName]: this.props.selectedVisitorData ? this.props.selectedVisitorData.firstName : '',
      [Strings.onboarding.visitor.lastName]: this.props.selectedVisitorData ? this.props.selectedVisitorData.lastName : '',
      [Strings.onboarding.visitor.email]: this.props.selectedVisitorData ? this.props.selectedVisitorData.email : '',
      [Strings.onboarding.visitor.address]: this.props.selectedVisitorData ? this.props.selectedVisitorData.address : '',
      [Strings.onboarding.visitor.dateOfJoin]: this.props.selectedVisitorData ? this.props.selectedVisitorData.dateOfJoin : '',
      [Strings.onboarding.visitor.dateOfVisit]: this.props.selectedVisitorData ? this.props.selectedVisitorData.dateOfVisit : '',
      [Strings.onboarding.visitor.numberOfVisit]: this.props.selectedVisitorData ? this.props.selectedVisitorData.numberOfVisit : '',
      [Strings.onboarding.visitor.gender]: this.props.selectedVisitorData ? this.props.selectedVisitorData.gender : '',
      [Strings.onboarding.visitor.phoneNo]: this.props.selectedVisitorData ? this.props.selectedVisitorData.phoneNo : '',
    },
    errors: {},
    visitorImageUri: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);
    this.props.editOn((this.props.selectedVisitorData ? true : false), (this.props.selectedVisitorData ? false : true))

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
        if (key === Strings.onboarding.visitor.email) {
          errorTxt = Validate.validateEmail(text);
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
      const visitorData = {
        firstName: this.state.fields[Strings.onboarding.visitor.firstName],
        lastName: this.state.fields[Strings.onboarding.visitor.lastName],
        name: this.state.fields[Strings.onboarding.visitor.firstName] + ' ' + this.state.fields[Strings.onboarding.visitor.lastName],
        email: this.state.fields[Strings.onboarding.visitor.email],
        address: this.state.fields[Strings.onboarding.visitor.address],
        dateOfJoin: this.state.fields[Strings.onboarding.visitor.dateOfJoin],
        dateOfVisit: this.state.fields[Strings.onboarding.visitor.dateOfVisit],
        numberOfVisit: this.state.fields[Strings.onboarding.visitor.numberOfVisit],
        gender: this.state.fields[Strings.onboarding.visitor.gender],
        phoneNo: this.state.fields[Strings.onboarding.visitor.phoneNo],
        imageUrl: this.state.visitorImageUri,
        updatedAt: this.props.user ? new Date() : '',
        createdAt: this.props.selectedVisitorData ? this.props.selectedVisitorData.createdAt : new Date(),
        adminID: this.props.user.adminID,
        trainerIDAssign: this.props.user.role === Constants.trainer ? this.props.user.id : '',
        trainerType: this.props.user.role === Constants.trainer ? this.props.user.trainerType : '',
        trainerName: this.props.user.role === Constants.trainer ? this.props.user.name : '',
        addedBy: this.props.selectedVisitorData ? this.props.selectedVisitorData.addedBy : this.props.user.role,
        addedByID: this.props.selectedVisitorData ? this.props.selectedVisitorData.addedByID : this.props.user.id,
        addedByName: this.props.selectedVisitorData ? this.props.selectedVisitorData.addedByName : this.props.user.name,
        updateBy: this.props.selectedVisitorData ? this.props.user.role : '',
        updateByID: this.props.selectedVisitorData ? this.props.user.id : '',
        updateByName: this.props.selectedVisitorData ? this.props.user.name : '',

      }
      if (this.props.selectedVisitorData) {
        this.props.updateVisitor(visitorData, this.props.selectedVisitorData ? this.props.selectedVisitorData.id : '')
      } else {
        this.props.addVisitor(visitorData)
      }
    } else {
      console.warn('validation failed')
    }
  }


  getVisitorImage = (imageUri) => {
    this.setState({ visitorImageUri: imageUri });
  }

  render() {
    const myStyle = styles(this.props);

    const { containerMainSt, scrollContentSt, bgViewSt, userImgVwSt, scrollSt, keyBordSt, multilineTextSt, leftRightVwSt, addVwSt, containerSt, viewWidthSt } = myStyle;
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
              <View style={userImgVwSt}>
                <CustomImageUpload isEdit={this.props.isEditBool} setImage={''} userImageFileUri={this.getVisitorImage} isUserImage={true} />
              </View>
              <View >
                <View style={leftRightVwSt}>
                  <View style={viewWidthSt}>
                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.visitor.firstName}
                      value={this.state.fields[Strings.onboarding.visitor.firstName]}
                      errorMsg={this.state.errors[Strings.onboarding.visitor.firstName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.visitor.firstName] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.visitor.lastName].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.firstName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    />
                  </View>
                  <View style={viewWidthSt}>
                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.visitor.lastName}
                      value={this.state.fields[Strings.onboarding.visitor.lastName]}
                      errorMsg={this.state.errors[Strings.onboarding.visitor.lastName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.visitor.lastName] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.visitor.email].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.lastName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    // }}
                    />
                  </View>
                </View>
                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.visitor.email}
                  value={this.state.fields[Strings.onboarding.visitor.email]}
                  errorMsg={this.state.errors[Strings.onboarding.visitor.email]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.visitor.email] = ref;
                  }}
                  onSubmitEditing={() => this[Strings.onboarding.visitor.address].focus()}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.email, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                  title={Strings.onboarding.visitor.address}
                  styleCustom={multilineTextSt}
                  numberOfLines={4}
                  multiline={true}
                  value={this.state.fields[Strings.onboarding.visitor.address]}
                  errorMsg={this.state.errors[Strings.onboarding.visitor.address]}
                  returnKeyType={"next"}
                  refName={ref => {
                    this[Strings.onboarding.visitor.address] = ref;
                  }}
                  onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.address, text)}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
              </View>
              <View style={leftRightVwSt}>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool}
                    title={Strings.onboarding.visitor.dateOfJoin}
                    modeType='date'
                    setDateValue={this.state.fields[Strings.onboarding.visitor.dateOfJoin]}
                    getDate={(text) => this.handleChange(Strings.onboarding.visitor.dateOfJoin, text)}
                    errorMsg={this.state.errors[Strings.onboarding.visitor.dateOfJoin]}
                    refName={ref => {
                      this[Strings.onboarding.visitor.dateOfJoin] = ref;
                    }}
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool}
                    title={Strings.onboarding.visitor.dateOfVisit}
                    modeType='date'
                    setDateValue={this.state.fields[Strings.onboarding.visitor.dateOfVisit]}
                    getDate={(text) => this.handleChange(Strings.onboarding.visitor.dateOfVisit, text)}
                    errorMsg={this.state.errors[Strings.onboarding.visitor.dateOfVisit]}
                    refName={ref => {
                      this[Strings.onboarding.visitor.dateOfVisit] = ref;
                    }}
                  />
                </View>
              </View>
              <View style={leftRightVwSt}>
                <View style={viewWidthSt}>
                  <CustomTextField isEdit={this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.visitor.numberOfVisit}
                    value={this.state.fields[Strings.onboarding.visitor.numberOfVisit]}
                    errorMsg={this.state.errors[Strings.onboarding.visitor.numberOfVisit]}
                    returnKeyType={"next"}
                    refName={ref => {
                      this[Strings.onboarding.visitor.numberOfVisit] = ref;
                    }}
                    onSubmitEditing={() => {
                      if (this[Strings.onboarding.visitor.gender].state.selector !== true) {
                        this[Strings.onboarding.visitor.gender]._toggleSelector()
                      }

                    }}
                    onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.numberOfVisit, text)}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  />

                </View>
                <View style={viewWidthSt}>
                  <CustomDropDown
                    refName={ref => {
                      this[Strings.onboarding.visitor.gender] = ref;
                    }}
                    isSearch={false}
                    isEdit={this.props.isEditBool}
                    selectText={this.state.fields[Strings.onboarding.visitor.gender]}
                    items={Constants.genderType}
                    title={Strings.onboarding.visitor.gender}
                    selectedText={(genderType) => this.handleChange(Strings.onboarding.visitor.gender, genderType.name)}
                    errorMsg={this.state.errors[Strings.onboarding.visitor.gender]}
                  />
                  {/* <CustomTextField  isEdit = {this.props.isEditBool}
                    {...this.state} title={Strings.onboarding.visitor.gender}
                      value={this.state.fields[Strings.onboarding.visitor.gender]}
                      errorMsg={this.state.errors[Strings.onboarding.visitor.gender]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.visitor.gender] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.visitor.phoneNo].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.gender, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    /> */}
                </View>
              </View>
              <CustomTextField isEdit={this.props.isEditBool}
                {...this.state} title={Strings.onboarding.visitor.phoneNo}
                value={this.state.fields[Strings.onboarding.visitor.phoneNo]}
                errorMsg={this.state.errors[Strings.onboarding.visitor.phoneNo]}
                returnKeyType={"done"}
                keyboardType={'phone-pad'}
                refName={ref => {
                  this[Strings.onboarding.visitor.phoneNo] = ref;
                }}
                onChangeText={(text) => this.handleChange(Strings.onboarding.visitor.phoneNo, text)}
              // onBlur={() => {
              //   this.setState({
              //     passwordError: Validate.validatePassword(this.state.password)
              //   })
              />
              <View style={addVwSt}>
                {!this.props.isEditBool ?
                  <CustomButton {...this.state} letterSpacingPr={true}
                    buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.selectedVisitorData ? "UPDATE" : "ADD"}
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
  addVisitor,
  updateVisitor,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(visitorAddScreen);