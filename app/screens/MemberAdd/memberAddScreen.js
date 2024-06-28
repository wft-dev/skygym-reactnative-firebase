import React, { Component } from 'react';
import { View, Image, Text, Button, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles';

import {
  CustomTextField, CustomButton, CustomButtonType,
  RadioButton, CustomImageUpload, CustomDatePicker, CustomDropDown, CustomChangePassword
} from '../../components/index';
import { Images, Validate, Strings, Constants } from '../../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addMember, updateMember } from '../../actions/member/memberAction';
import { getActiveMemberShip } from '../../actions/memberShip/memberShipAction';

import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
import { getTrainer } from '../../actions/trainer/trainerAction';
import md5 from 'md5';
import firebase from 'firebase/app';
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';





class memberAddScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.member.firstName]: this.props.selectedMemberData ? this.props.selectedMemberData.firstName : '1',
      [Strings.onboarding.member.lastName]: this.props.selectedMemberData ? this.props.selectedMemberData.lastName : '1',
      [Strings.onboarding.member.idMember]: this.props.isBecomeMember === true ? '0' : this.props.selectedMemberData ? this.props.selectedMemberData.idMember : '0',
      [Strings.onboarding.member.dateOfJoin]: this.props.selectedMemberData ? this.props.selectedMemberData.dateOfJoin : '1',
      [Strings.onboarding.member.gender]: this.props.selectedMemberData ? this.props.selectedMemberData.gender : '1',
      [Strings.onboarding.member.password]: this.props.isBecomeMember === true ? '123456789' : this.props.selectedMemberData ? this.props.selectedMemberData.passwordHash : '123456789',
      [Strings.onboarding.member.trainerType]: this.props.isBecomeMember === true ? 'General' : this.props.selectedMemberData ? this.props.selectedMemberData.trainerType : 'General',
      [Strings.onboarding.member.trainerName]: this.props.selectedMemberData ? this.props.selectedMemberData.trainerName : '',
      [Strings.onboarding.member.uploadIDProof]: this.props.selectedMemberData ? this.props.selectedMemberData.uploadIDProof : '',
      [Strings.onboarding.member.email]: this.props.selectedMemberData ? this.props.selectedMemberData.email : '1@gmail.com',
      [Strings.onboarding.member.address]: this.props.selectedMemberData ? this.props.selectedMemberData.address : '1111',
      [Strings.onboarding.member.phoneNo]: this.props.selectedMemberData ? this.props.selectedMemberData.phoneNo : '1',
      [Strings.onboarding.member.dob]: this.props.selectedMemberData ? this.props.selectedMemberData.dob : '1',
      [Strings.onboarding.member.membershipPlan]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.membershipTitle : '',
      [Strings.onboarding.member.membershipDetail]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.membershipDetails : '',
      [Strings.onboarding.member.amount]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.membershipAmount : '',
      [Strings.onboarding.member.startDate]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.membershipStartDate : '',
      [Strings.onboarding.member.endDate]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.membershipEndDate : '',
      [Strings.onboarding.member.totalAmount]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.totalAmount : '1',
      [Strings.onboarding.member.discount]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.discount : '1',
      [Strings.onboarding.member.paymentType]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.paymentType : '',
      [Strings.onboarding.member.dueAmount]: this.props.isAddNewMemberShip === true ? '' : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.dueAmount : '1',

    },
    oldDocID: '',
    errors: {},
    memberType: '',
    isRemoveMemberIdProof: false,
    trainerIDAssign: this.props.selectedMemberData ? this.props.selectedMemberData.trainerIDAssign : '',
    memberImageUri: '',
    memberIdProofImage: '',
    orientation: getOrientation(),
    showMemberShipPlan: false,
    planNameItem: this.props.isAddNewMemberShip === true ? {} : this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan : {},
    isShowPasswordView: false,

  }

  componentDidMount() {
    console.warn('this.props.selectedMemberData', this.props.selectedMemberData);
    lor(this);
    this.props.getActiveMemberShip()
    this.props.getTrainer(this.state.fields[Strings.onboarding.member.trainerType] === '' ? 'General' : this.state.fields[Strings.onboarding.member.trainerType])
    if (this.props.isAddNewMemberShip === true) {
      this.props.editOn(false, true)
      this.setState({ showMemberShipPlan: true })
    } else if (this.props.isRenewMemberShip === true) {
      this.props.editOn(false, true)
      this.setState({ showMemberShipPlan: true })
    } else if (this.props.isBecomeMember === true) {
      this.props.editOn(false, true)
    } else {
      this.props.editOn((this.props.selectedMemberData ? true : false), (this.props.selectedMemberData ? false : true))
    }
    // var getSelectedMemberShipData = this.state.planNameItem
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



    if (field === Strings.onboarding.member.discount) {
      this.setState({
        planNameItem: {
          ...this.state.planNameItem,
          ['discount']: e
        }
      })
    }
    else if (field === Strings.onboarding.member.totalAmount) {
      this.setState({
        planNameItem: {
          ...this.state.planNameItem,
          ['totalAmount']: e
        }
      })
    }
    else if (field === Strings.onboarding.member.paymentType) {
      this.setState({
        planNameItem: {
          ...this.state.planNameItem,
          ['paymentType']: e
        }
      })
    } else if (field === Strings.onboarding.member.dueAmount) {
      this.setState({
        planNameItem: {
          ...this.state.planNameItem,
          ['dueAmount']: e
        }
      })
    }
  }


  handleValidation(nextBtnGo) {
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
        else if (key === Strings.onboarding.member.uploadIDProof) {
          errorTxt = Validate.validateIDProof(text);
        } else if (key === Strings.onboarding.member.password) {
          errorTxt = this.props.selectedMemberData ? '' : Validate.validatePassword(text);
        } else if (key === Strings.onboarding.member.dob) {
          errorTxt = Validate.validateAge(text);
        } else {
          errorTxt = Validate.validateInput(text, key);
        }
        let errors = this.state.errors;
        if (nextBtnGo === true) {
          if (key === Strings.onboarding.member.firstName || key === Strings.onboarding.member.lastName
            || key === Strings.onboarding.member.dateOfJoin
            || key === Strings.onboarding.member.gender || key === Strings.onboarding.member.password
            || key === Strings.onboarding.member.trainerType || key === Strings.onboarding.member.trainerName
            || key === Strings.onboarding.member.uploadIDProof || key === Strings.onboarding.member.email
            || key === Strings.onboarding.member.address || key === Strings.onboarding.member.phoneNo
            || key === Strings.onboarding.member.dob) {
            errors[key] = errorTxt;
            if (errors[key]) {
              formIsValid = false;
            }
            this.setState({ errors });
          }
        } else {
          errors[key] = errorTxt;
          if (errors[key]) {
            formIsValid = false;
          }
          this.setState({ errors });
          console.warn(errors);
        }
      })
    });
    return formIsValid;
  }

  nextBtnAction = () => {
    if (this.handleValidation(true)) {
      this.setState({ showMemberShipPlan: true })
    }
  }

  addBtnAction = (isMemberShipBtnTap) => {
    if (this.handleValidation(false)) {

      var getSelectedMemberShipData = this.state.planNameItem
      getSelectedMemberShipData.idMember = this.state.fields[Strings.onboarding.member.idMember],
        getSelectedMemberShipData.membershipStartDate = this.state.fields[Strings.onboarding.member.startDate]
      getSelectedMemberShipData.membershipEndDate = this.state.fields[Strings.onboarding.member.endDate]
      getSelectedMemberShipData.discount = this.state.fields[Strings.onboarding.member.discount]
      getSelectedMemberShipData.totalAmount = this.state.fields[Strings.onboarding.member.totalAmount]
      getSelectedMemberShipData.paymentType = this.state.fields[Strings.onboarding.member.paymentType]
      getSelectedMemberShipData.dueAmount = this.state.fields[Strings.onboarding.member.dueAmount]
      // getSelectedMemberShipData.docId  = this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.docId : ''
      if (this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan && this.props.selectedMemberData.memberShipPlan.docId == getSelectedMemberShipData.docId !== undefined ? getSelectedMemberShipData.docId : "") {
        getSelectedMemberShipData.docId = this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.docId : ''
      } else {
        getSelectedMemberShipData.docId = ''
      }

      if (this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan && this.props.selectedMemberData.memberShipPlan.id == getSelectedMemberShipData.id
        && this.props.selectedMemberData.memberShipPlan.membershipStartDate == getSelectedMemberShipData.membershipStartDate
        && this.props.selectedMemberData.memberShipPlan.membershipEndDate == getSelectedMemberShipData.membershipEndDate
        && this.props.selectedMemberData.memberShipPlan.discount == getSelectedMemberShipData.discount
        && this.props.selectedMemberData.memberShipPlan.totalAmount == getSelectedMemberShipData.totalAmount
        && this.props.selectedMemberData.memberShipPlan.paymentType == getSelectedMemberShipData.paymentType
        && this.props.selectedMemberData.memberShipPlan.dueAmount == getSelectedMemberShipData.dueAmount) {
        getSelectedMemberShipData.purchaseUpdateDate = this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.purchaseUpdateDate : new Date()
        getSelectedMemberShipData.purchaseDate = this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.purchaseDate : new Date()
      }
      else {
        getSelectedMemberShipData.purchaseUpdateDate = new Date()
        getSelectedMemberShipData.purchaseDate = this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan ? this.props.selectedMemberData.memberShipPlan.purchaseDate : new Date()

      }


      const memberData = {
        firstName: this.state.fields[Strings.onboarding.member.firstName],
        lastName: this.state.fields[Strings.onboarding.member.lastName],
        name: this.state.fields[Strings.onboarding.member.firstName] + ' ' + this.state.fields[Strings.onboarding.member.lastName],
        idMember: this.state.fields[Strings.onboarding.member.idMember],
        id: this.state.fields[Strings.onboarding.member.idMember],
        dateOfJoin: this.state.fields[Strings.onboarding.member.dateOfJoin],
        gender: this.state.fields[Strings.onboarding.member.gender],
        trainerType: this.state.fields[Strings.onboarding.member.trainerType],
        trainerName: this.state.fields[Strings.onboarding.member.trainerName],
        uploadIDProof: this.state.memberIdProofImage ? this.state.memberIdProofImage : this.state.fields[Strings.onboarding.member.uploadIDProof],
        email: this.state.fields[Strings.onboarding.member.email],
        address: this.state.fields[Strings.onboarding.member.address],
        phoneNo: this.state.fields[Strings.onboarding.member.phoneNo],
        dob: this.state.fields[Strings.onboarding.member.dob],
        imageUrl: this.state.memberImageUri ? this.state.memberImageUri : this.props.selectedMemberData ? this.props.selectedMemberData.imageUrl : '',
        memberShipPlan: getSelectedMemberShipData,
        updatedAt: this.props.selectedMemberData ? new Date() : '',
        createdAt: this.props.selectedMemberData ? this.props.selectedMemberData.createdAt : new Date(),
        adminID: this.props.user.adminID,
        trainerIDAssign: this.state.trainerIDAssign,
        addedBy: this.props.selectedMemberData ? this.props.selectedMemberData.addedBy : this.props.user.role,
        addedByID: this.props.selectedMemberData ? this.props.selectedMemberData.addedByID : this.props.user.id,
        addedByName: this.props.selectedMemberData ? this.props.selectedMemberData.addedByName : this.props.user.name,
        updateBy: this.props.selectedMemberData ? this.props.user.role : '',
        updateByID: this.props.selectedMemberData ? this.props.user.id : '',
        updateByName: this.props.selectedMemberData ? this.props.user.name : '',
        passwordHash: this.state.fields[Strings.onboarding.member.password],
        role: Constants.member,
      }

      var currentDate = new Date();
      var planEndDate = new Date(this.state.planNameItem.membershipEndDate);

      if (planEndDate < currentDate && this.state.planNameItem.dueAmount == '' || this.state.planNameItem.dueAmount == '0') {
        memberData.memberShipPlan.planStatus = 'Paid'
      } else if (planEndDate < currentDate && this.state.planNameItem.dueAmount != '' || this.state.planNameItem.dueAmount != '0') {
        memberData.memberShipPlan.planStatus = 'Pending'
      }
      if (planEndDate > currentDate) {
        memberData.memberShipPlan.currentPlanStatus = 'Active'
      } else {
        memberData.memberShipPlan.currentPlanStatus = ''
      }
      if (this.props.isBecomeMember == false && this.props.selectedMemberData) {
        this.props.updateMember(isMemberShipBtnTap, this.state.oldDocID, memberData, this.props.selectedMemberData ? this.props.selectedMemberData.id : '',
          this.state.memberImageUri, this.state.memberIdProofImage, this.props.selectedMemberData.trainerIDAssign)
      } else {
        this.props.addMember(memberData,
          md5(this.state.fields[Strings.onboarding.member.password]), this.props.isBecomeMember === true ? this.props.selectedMemberData.id : ''
          , this.state.memberImageUri, this.state.memberIdProofImage)
      }
    } else {
      console.warn('validation failed')
    }
  }



  getMemberShipPlanFromDorpDown = (planName) => {
    if (this.props.selectedMemberData && this.props.selectedMemberData.memberShipPlan && this.props.selectedMemberData.memberShipPlan.docId) {
      this.setState({ oldDocID: this.props.selectedMemberData.memberShipPlan.docId });

    }
    this.setState({ planNameItem: planName });
    this.setState({
      fields: {
        ...this.state.fields,
        [Strings.onboarding.member.membershipDetail]: planName.membershipDetails
        , [Strings.onboarding.member.startDate]: planName.membershipStartDate
        , [Strings.onboarding.member.endDate]: planName.membershipEndDate
        , [Strings.onboarding.member.amount]: planName.membershipAmount
        , [Strings.onboarding.member.membershipPlan]: planName.membershipTitle
      }
    })

    this.setState({
      errors: {
        ...this.state.errors,
        [Strings.onboarding.member.membershipDetail]: ''
        , [Strings.onboarding.member.startDate]: ''
        , [Strings.onboarding.member.endDate]: ''
        , [Strings.onboarding.member.amount]: ''
        , [Strings.onboarding.member.membershipPlan]: ''
      }
    })
    // this.setState({
    //   planNameItem: {
    //     [Object.keys(planName)]: Object.values(planName),
    //     ['discount']:this.state.fields[Strings.onboarding.member.discount],
    //     ['totalAmount']: this.state.fields[Strings.onboarding.member.totalAmount],
    //     ['paymentType']: this.state.fields[Strings.onboarding.member.paymentType],
    //     ['dueAmount']: this.state.fields[Strings.onboarding.member.dueAmount]
    //   }
    // })

  }

  getAssignTrainerDeatilFromDorpDown = (trainerDeatil) => {
    this.setState({ trainerIDAssign: trainerDeatil.id });
    this.handleChange(Strings.onboarding.member.trainerName, trainerDeatil.name)
  }

  getMemberTypeFromRadioBtn = (result) => {
    this.setState({ memberType: result });
    this.handleChange(Strings.onboarding.member.trainerType, result)
    this.props.getTrainer(this.state.fields[Strings.onboarding.member.trainerType])
    this.handleChange(Strings.onboarding.member.trainerName, '')
  }


  getReomveIdProof = (result) => {
    this.setState({ isRemoveMemberIdProof: result });
    this.setState({ memberIdProofImage: '' });
    this.handleChange(Strings.onboarding.member.uploadIDProof, '')
  }

  getMemberImage = (imageUri) => {
    this.setState({ memberImageUri: imageUri });
  }

  getIdProofImage = (imageUri) => {
    this.setState({ memberIdProofImage: imageUri });
    this.handleChange(Strings.onboarding.member.uploadIDProof, imageUri)
  }

  showPasswordView = (isshowPassword) => {
    if (!this.props.isEditBool) {
      Keyboard.dismiss()
      this.setState({ isShowPasswordView: isshowPassword })
    }
  }

  memberShipView = () => {
    const myStyle = styles(this.props);
    const { containerSt, addVwSt, multilineTextSt, leftRightVwSt, viewWidthSt } = myStyle;

    return (<View style={containerSt}>

      <CustomDropDown
        isSearch={this.props.activeMemberShipData.length > 5}
        isEdit={this.props.isEditBool}
        selectText={this.state.fields[Strings.onboarding.member.membershipPlan]}
        items={this.props.activeMemberShipData}
        title={Strings.onboarding.member.membershipPlan}
        selectedText={this.getMemberShipPlanFromDorpDown}
        errorMsg={this.state.errors[Strings.onboarding.member.membershipPlan]}
      />

      <CustomTextField
        editable={false}
        isEdit={this.props.isEditBool} {...this.state}
        title={Strings.onboarding.member.membershipDetail}
        styleCustom={multilineTextSt}
        numberOfLines={4}
        multiline={true}
        value={this.state.fields[Strings.onboarding.member.membershipDetail]}
        errorMsg={this.state.errors[Strings.onboarding.member.membershipDetail]}
        returnKeyType={"next"}
        refName={ref => {
          this[Strings.onboarding.member.membershipDetail] = ref;
        }}
        onChangeText={(text) => this.handleChange(Strings.onboarding.member.membershipDetail, text)}
      // onBlur={() => {
      //   this.setState({
      //     passwordError: Validate.validatePassword(this.state.password)
      //   })
      // }}
      />
      <CustomTextField isEdit={this.props.isEditBool}
        editable={false}
        {...this.state} title={Strings.onboarding.member.amount}
        value={this.state.fields[Strings.onboarding.member.amount]}
        errorMsg={this.state.errors[Strings.onboarding.member.amount]}
        returnKeyType={"next"}
        refName={ref => {
          this[Strings.onboarding.member.amount] = ref;
        }}
        onSubmitEditing={() => this[Strings.onboarding.member.startDate].onPressDate()}
        onChangeText={(text) => this.handleChange(Strings.onboarding.member.amount, text)}
      // onBlur={() => {
      //   this.setState({
      //     passwordError: Validate.validatePassword(this.state.password)
      //   })
      />

      <View style={leftRightVwSt}>
        <View style={viewWidthSt}>
          <CustomDatePicker editable={true} isEdit={this.props.isEditBool}
            title={Strings.onboarding.member.startDate}
            modeType='date'
            setDateValue={this.state.fields[Strings.onboarding.member.startDate]}
            getDate={(text) => this.handleChange(Strings.onboarding.member.startDate, text)}
            errorMsg={this.state.errors[Strings.onboarding.member.startDate]}
            refName={ref => {
              this[Strings.onboarding.member.startDate] = ref;
            }}
          />
        </View>
        <View style={viewWidthSt}>
          <CustomDatePicker editable={true} isEdit={this.props.isEditBool}
            title={Strings.onboarding.member.endDate}
            modeType='date'
            setDateValue={this.state.fields[Strings.onboarding.member.endDate]}
            getDate={(text) => this.handleChange(Strings.onboarding.member.endDate, text)}
            errorMsg={this.state.errors[Strings.onboarding.member.endDate]}
            refName={ref => {
              this[Strings.onboarding.member.endDate] = ref;
            }}
          />
        </View>
      </View>
      <View style={leftRightVwSt}>
        <View style={viewWidthSt}>

          <CustomTextField isEdit={this.props.isEditBool}
            {...this.state} title={Strings.onboarding.member.totalAmount}
            value={this.state.fields[Strings.onboarding.member.totalAmount]}
            errorMsg={this.state.errors[Strings.onboarding.member.totalAmount]}
            returnKeyType={"next"}
            keyboardType={'number-pad'}
            refName={ref => {
              this[Strings.onboarding.member.totalAmount] = ref;
            }}
            onSubmitEditing={() => this[Strings.onboarding.member.discount].focus()}
            onChangeText={(text) => this.handleChange(Strings.onboarding.member.totalAmount, text)}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: Validate.validatePassword(this.state.password)
          //   })
          />
        </View>
        <View style={viewWidthSt}>
          <CustomTextField {...this.state}
            isEdit={this.props.isEditBool}
            {...this.state} title={Strings.onboarding.member.discount}
            value={this.state.fields[Strings.onboarding.member.discount]}
            errorMsg={this.state.errors[Strings.onboarding.member.discount]}
            returnKeyType={"next"}
            refName={ref => {
              this[Strings.onboarding.member.discount] = ref;
            }}
            onSubmitEditing={() => {
              if (this[Strings.onboarding.member.paymentType].state.selector !== true) {
                this[Strings.onboarding.member.paymentType]._toggleSelector()
              }
            }}
            onChangeText={(text) => this.handleChange(Strings.onboarding.member.discount, text)}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: Validate.validatePassword(this.state.password)
          //   })
          />
        </View>
      </View>

      <View style={leftRightVwSt}>
        <View style={viewWidthSt}>
          {/* <CustomTextField {...this.state}
          isEdit={this.props.isEditBool}
           {...this.state} title={Strings.onboarding.member.paymentType}
           value={this.state.fields[Strings.onboarding.member.paymentType]}
           errorMsg={this.state.errors[Strings.onboarding.member.paymentType]}
           returnKeyType={"next"}
           refName={ref => {
             this[Strings.onboarding.member.paymentType] = ref;
           }}
           onSubmitEditing={() => this[Strings.onboarding.member.dueAmount].focus()}
           onChangeText={(text) => this.handleChange(Strings.onboarding.member.paymentType, text)}
         // onBlur={() => {
         //   this.setState({
         //     passwordError: Validate.validatePassword(this.state.password)
         //   })
         /> */}
          <CustomDropDown
            refName={ref => {
              this[Strings.onboarding.member.paymentType] = ref;
            }}
            isSearch={false}
            isEdit={this.props.isEditBool}
            selectText={this.state.fields[Strings.onboarding.member.paymentType]}
            items={Constants.paymentType}
            title={Strings.onboarding.member.paymentType}
            selectedText={(paymentType) =>
              this.handleChange(Strings.onboarding.member.paymentType, paymentType.name)
            }
            errorMsg={this.state.errors[Strings.onboarding.member.paymentType]}
          />
        </View>
        <View style={viewWidthSt}>
          <CustomTextField {...this.state}
            isEdit={this.props.isEditBool}
            {...this.state} title={Strings.onboarding.member.dueAmount}
            value={this.state.fields[Strings.onboarding.member.dueAmount]}
            errorMsg={this.state.errors[Strings.onboarding.member.dueAmount]}
            returnKeyType={"done"}
            keyboardType={'number-pad'}
            refName={ref => {
              this[Strings.onboarding.member.dueAmount] = ref;
            }}
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={(text) => this.handleChange(Strings.onboarding.member.dueAmount, text)}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: Validate.validatePassword(this.state.password)
          //   })
          />
        </View>
      </View>

      <View style={addVwSt}>
        {!this.props.isEditBool ?
          <CustomButton {...this.state} letterSpacingPr={true}
            buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.isAddNewMemberShip === true || this.props.isBecomeMember === true ? "ADD" : this.props.selectedMemberData ? "UPDATE" : "ADD"}
            onPressPr={() => { this.addBtnAction(this.props.isAddNewMemberShip === true || this.props.isBecomeMember === true ? true : this.props.selectedMemberData ? true : false) }} /> : null}
      </View>
    </View>)
  }

  profileView = () => {
    const myStyle = styles(this.props);
    const { containerSt, textVwSt, addVwSt, multilineTextSt, leftRightVwSt, viewWidthSt } = myStyle;

    return (<View style={containerSt}>
      {this.state.isShowPasswordView ? <View>
        <CustomChangePassword
          id={this.props.selectedMemberData ? this.props.selectedMemberData.id : ''}
          type={Constants.member}
          userEmailId={this.props.selectedMemberData ? this.props.selectedMemberData.email : ''}
          modelClosePr={() => this.showPasswordView(false)} />
      </View> : null}
      <CustomImageUpload
        setImage={this.props.selectedMemberData ? this.props.selectedMemberData.imageUrl : ''}
        isEdit={this.props.isEditBool}
        userImageFileUri={this.getMemberImage}
        isUserImage={true} />

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
            onSubmitEditing={() => this[Strings.onboarding.member.idMember].focus()}
            onChangeText={(text) => this.handleChange(Strings.onboarding.member.lastName, text)}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: Validate.validatePassword(this.state.password)
          //   })
          />
        </View>
      </View>

      {/* <View style={leftRightVwSt}>
        <View style={viewWidthSt}> */}
      {this.props.isBecomeMember == true || this.props.selectedMemberData &&
        <CustomTextField {...this.state} editable={false}
          isEdit={this.props.isEditBool}
          {...this.state} title={Strings.onboarding.member.idMember}
          value={this.state.fields[Strings.onboarding.member.idMember]}
          errorMsg={this.state.errors[Strings.onboarding.member.idMember]}
          returnKeyType={"next"}
          refName={ref => {
            this[Strings.onboarding.member.idMember] = ref;
          }}
          onSubmitEditing={() => this[Strings.onboarding.member.dateOfJoin].onPressDate()}
          onChangeText={(text) => this.handleChange(Strings.onboarding.member.idMember, text)}
        // onBlur={() => {
        //   this.setState({
        //     passwordError: Validate.validatePassword(this.state.password)
        //   })
        />
      }
      {/* </View>
        <View style={viewWidthSt}> */}
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
      {/* </View>
      </View> */}
      <View style={leftRightVwSt}>
        <View style={viewWidthSt}>
          {/* <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.member.gender}
                      value={this.state.fields[Strings.onboarding.member.gender]}
                      errorMsg={this.state.errors[Strings.onboarding.member.gender]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.member.gender] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.member.password].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.member.gender, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    /> */}
          <CustomDropDown
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
            onTouchStart={() => this.showPasswordView(this.props.isBecomeMember === true ? false : this.props.selectedMemberData)}
            editable={this.state.fields[Strings.onboarding.member.password] ? false : true}

            onSubmitEditing={() => {
              if (this[Strings.onboarding.member.trainerName].state.selector !== true) {
                this[Strings.onboarding.member.trainerName]._toggleSelector()
              }

            }}
            onChangeText={(text) => this.handleChange(Strings.onboarding.member.password, text)}
          // onBlur={() => {
          //   this.setState({
          //     passwordError: Validate.validatePassword(this.state.password)
          //   })
          />
        </View>
      </View>
      <RadioButton isEdit={this.props.isEditBool} radioBtnName={this.getMemberTypeFromRadioBtn}
        setValue={this.state.fields[Strings.onboarding.member.trainerType]} />
      {/* <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.member.trainerName}
                      value={this.state.fields[Strings.onboarding.member.trainerName]}
                      errorMsg={this.state.errors[Strings.onboarding.member.trainerName]}
                      returnKeyType={"next"}
                      refName={ref => {
                        this[Strings.onboarding.member.trainerName] = ref;
                      }}
                      onSubmitEditing={() => this[Strings.onboarding.member.email].focus()}
                      onChangeText={(text) => this.handleChange(Strings.onboarding.member.trainerName, text)}
                    // onBlur={() => {
                    //   this.setState({
                    //     passwordError: Validate.validatePassword(this.state.password)
                    //   })
                    /> */}
      <CustomDropDown
        refName={ref => {
          this[Strings.onboarding.member.trainerName] = ref;
        }}
        isSearch={this.props.trainerData && this.props.trainerData.length > 5}
        isEdit={this.props.isEditBool}
        selectText={this.state.fields[Strings.onboarding.member.trainerName]}
        items={this.props.trainerData}
        title={Strings.onboarding.member.trainerName}
        selectedText={(trainerDeatil) => this.getAssignTrainerDeatilFromDorpDown(trainerDeatil)}
        errorMsg={this.state.errors[Strings.onboarding.member.trainerName]}
      />
      <CustomImageUpload
        setIDImage={this.state.fields[Strings.onboarding.member.uploadIDProof]}
        imageNametitle={(text) => console.warn(text)}
        isEdit={this.props.isEditBool}
        idProofImageFileUri={this.getIdProofImage}
        isRemoveIdProof={this.getReomveIdProof}
        errorMsg={this.state.errors[Strings.onboarding.member.uploadIDProof]} />


      <CustomTextField
        isEdit={this.props.isEditBool}
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
            buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.isBecomeMember === true ? "NEXT" : this.props.selectedMemberData ? "UPDATE" : "NEXT"}
            onPressPr={() => { this.props.isBecomeMember === true ? this.nextBtnAction() : this.props.selectedMemberData ? this.addBtnAction(false) : this.nextBtnAction() }} /> : null}
      </View>
    </View>)
  }

  render() {
    const myStyle = styles(this.props, this.state.showMemberShipPlan);
    const { containerMainSt, scrollContentSt, bgViewSt,
      profileBtnView, profileMemberBtnView, MemberBtnView, btnTextStyle, scrollSt, keyBordSt, containerSt, } = myStyle;
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

            <View >
              {this.props.isEditBool === false && this.props.isRenewMemberShip === false && this.props.isAddNewMemberShip === false ?
                <View style={profileMemberBtnView}>
                  <TouchableOpacity style={profileBtnView}
                    onPress={() => this.setState({ showMemberShipPlan: false })}>
                    <Text style={btnTextStyle}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={MemberBtnView}
                    onPress={() => this.setState({ showMemberShipPlan: true })}>
                    <Text style={btnTextStyle}>Membership</Text>
                  </TouchableOpacity>
                </View>
                : null}
              {this.state.showMemberShipPlan ? this.memberShipView() : this.profileView()}


            </View>
          </KeyboardAwareScrollView>
          {/* </ScrollView>
            </KeyboardAvoidingView> */}
        </View>
      </ImageBackground>

    );
  }
}
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd }, memberShipReducer: { activeMemberShipData }, trainerReducer: { trainerData } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd,
  activeMemberShipData: activeMemberShipData,
  trainerData: trainerData,
});

const mapDispatchToProps = {
  addMember,
  updateMember,
  editOn,
  getActiveMemberShip,
  getTrainer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memberAddScreen);