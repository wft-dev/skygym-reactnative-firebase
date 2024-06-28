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
import { getGymInfo } from '../../actions/gymInfo/gymInfoAction';
import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
import md5 from 'md5';


class gymProfileScreen extends Component {

  state = {
    fields: {
      [Strings.onboarding.gymInfo.gymName]: this.props.gymInfoData ? this.props.gymInfoData.gymName : '',
      [Strings.onboarding.gymInfo.gymID]: this.props.gymInfoData ? this.props.gymInfoData.gymID : '',
      [Strings.onboarding.gymInfo.gymTimings]: this.props.gymInfoData ? this.props.gymInfoData.gymTimings : '',
      [Strings.onboarding.gymInfo.gymDays]: this.props.gymInfoData ? this.props.gymInfoData.gymDays : '',
      [Strings.onboarding.gymInfo.gymOwnerName]: this.props.gymInfoData ? this.props.gymInfoData.name : '',
      [Strings.onboarding.gymInfo.gymOwnerPhoneNo]: this.props.gymInfoData ? this.props.gymInfoData.mobileNumber : '',
      [Strings.onboarding.gymInfo.gymOwnerAddress]: this.props.gymInfoData ? this.props.gymInfoData.gymAddress : '',

    },
    orientation: getOrientation(),

  }

  componentDidMount() {

    lor(this);
    this.props.getGymInfo(this.props.user.adminID)
    this.props.editOn(true, false)

  }

  componentWillUnmount() {
    rol();
    //  this.keyboardWillShowListener.remove();
    //  this.keyboardWillHideListener.remove();
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

              <CustomImageUpload
                setImage={this.props.gymInfoData ? this.props.gymInfoData.imageUrl : ''}
                isEdit={this.props.isEditBool}
                isUserImage={true} />

              <View style={textVwSt}>
                <View style={leftRightVwSt}>
                  <View style={viewWidthSt}>

                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.gymInfo.gymName}
                      value={this.state.fields[Strings.onboarding.gymInfo.gymName]}

                    />
                  </View>
                  <View style={viewWidthSt}>
                    <CustomTextField isEdit={this.props.isEditBool}
                      {...this.state} title={Strings.onboarding.gymInfo.gymID}
                      value={this.state.fields[Strings.onboarding.gymInfo.gymID]}

                    />
                  </View>
                </View>

                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.gymInfo.gymTimings}
                  value={this.state.fields[Strings.onboarding.gymInfo.gymTimings]}
                />

                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.gymInfo.gymDays}
                  styleCustom={multilineTextSt}
                  numberOfLines={4}
                  multiline={true}
                  value={this.state.fields[Strings.onboarding.gymInfo.gymDays]}
                />



                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.gymInfo.gymOwnerName}
                  value={this.state.fields[Strings.onboarding.gymInfo.gymOwnerName]}
                />


                <CustomTextField isEdit={this.props.isEditBool}
                  {...this.state} title={Strings.onboarding.gymInfo.gymOwnerPhoneNo}
                  value={this.state.fields[Strings.onboarding.gymInfo.gymOwnerPhoneNo]}
                />



                <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                  title={Strings.onboarding.gymInfo.gymOwnerAddress}
                  styleCustom={multilineTextSt}
                  numberOfLines={4}
                  multiline={true}
                  value={this.state.fields[Strings.onboarding.gymInfo.gymOwnerAddress]}
                />
              </View>


            </View>
          </KeyboardAwareScrollView>
          {/* </ScrollView>
            </KeyboardAvoidingView> */}
        </View>
      </ImageBackground>

    );
  }
}
const mapStateToProps = ({ routes, sessionReducer: { user }, editOnReducer: { isEdit, isAdd }, gymInfoReducer: { gymInfoData } }) => ({
  routes: routes,
  user: user,
  isEditBool: isEdit,
  isAddBool: isAdd,
  gymInfoData,
});

const mapDispatchToProps = {
  getGymInfo,
  editOn

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(gymProfileScreen);