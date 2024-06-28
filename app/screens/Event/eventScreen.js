import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';

import CustomTextField from '../../components/TextFiled/CustomTextField';
import CustomButton from '../../components/Button/CustomButton';
import { Images, Validate, } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import { addEvent, updateEvent } from '../../actions/eventAdd/eventAddAction';
import { editOn } from '../../actions/editOn/editOnAction';

import { connect } from 'react-redux';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';


class eventScreen extends Component {

  state = {
    eventName: this.props.selectedEventData ? this.props.selectedEventData.eventName : '',
    eventNameError: '',
    eventDate: this.props.selectedEventData ? this.props.selectedEventData.eventDate : '',
    eventDateError: '',
    eventAddress: this.props.selectedEventData ? this.props.selectedEventData.eventAddress : '',
    eventAddressError: '',
    eventStartTime: this.props.selectedEventData ? this.props.selectedEventData.eventStartTime : '',
    eventStartTimeError: '',
    eventEndTime: this.props.selectedEventData ? this.props.selectedEventData.eventEndTime : '',
    eventEndTimeError: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);

    this.props.editOn((this.props.selectedEventData ? true : false), (this.props.selectedEventData ? false : true))


  }

  componentWillUnmount() {
    rol();
  }

  handleEventName = (text) => {
    this.setState({ eventName: text.trim() })
    if (this.state.eventNameError.trim()) {
      this.setState({ eventNameError: '' })
    }
  }

  handleEventAddress = (text) => {
    this.setState({ eventAddress: text })
    if (this.state.eventAddressError.trim()) {
      this.setState({ eventAddressError: '' })
    }
  }

  handleEventDate = (text) => {
    // this.props.signUpUser.dob = text
    this.setState({ eventDate: text.trim() })
    if (this.state.eventDateError.trim()) {
      this.setState({ eventDateError: '' })
    }
  }


  handleEventStartTime = (text) => {
    // this.props.signUpUser.dob = text
    this.setState({ eventStartTime: text.trim() })
    if (this.state.eventStartTimeError.trim()) {
      this.setState({ eventStartTimeError: '' })
    }
  }

  handleEventEndTime = (text) => {

    // this.props.signUpUser.dob = text
    this.setState({ eventEndTime: text.trim() })
    if (this.state.eventEndTimeError.trim()) {
      this.setState({ eventEndTimeError: '' })
    }
  }


  addBtnAction = () => {
    const { eventName, eventDate, eventAddress, eventStartTime, eventEndTime } = this.state
    const eventNameErrorTxt = Validate.validateInput(eventName, 'Event Name');
    const eventDateErrorTxt = Validate.validateInput(eventDate, 'Event Date');
    const eventAddressErrorTxt = Validate.validateInput(eventAddress, 'Address');
    const eventStartTimeErrorTxt = Validate.validateInput(eventStartTime, 'Event Start Time');
    const eventEndTimeErrorTxt = Validate.validateInput(eventEndTime, 'Event End Time');
    this.setState({
      eventNameError: eventNameErrorTxt,
      eventDateError: eventDateErrorTxt,
      eventAddressError: eventAddressErrorTxt,
      eventStartTimeError: eventStartTimeErrorTxt,
      eventEndTimeError: eventEndTimeErrorTxt,
    }, () => {
      if (eventNameErrorTxt === '' && eventDateErrorTxt === ''
        && eventAddressErrorTxt === ''
        && eventStartTimeErrorTxt === ''
        && eventEndTimeErrorTxt === ''
      ) {
        const eventData = {
          eventName: eventName,
          eventDate: eventDate,
          eventAddress: eventAddress,
          eventStartTime: eventStartTime,
          eventEndTime: eventEndTime,
          adminID: this.props.user.adminID,
          addedBy: this.props.selectedEventData ? this.props.selectedEventData.addedBy : this.props.user.role,
          addedByID: this.props.selectedEventData ? this.props.selectedEventData.addedByID : this.props.user.id,
          addedByName: this.props.selectedEventData ? this.props.selectedEventData.addedByName : this.props.user.name,
          updateBy: this.props.selectedEventData ? this.props.user.role : '',
          updateByID: this.props.selectedEventData ? this.props.user.id : '',
          updateByName: this.props.selectedEventData ? this.props.user.name : '',
          createdAt: this.props.selectedEventData ? this.props.selectedEventData.createdAt : new Date(),
          updatedAt: this.props.selectedEventData ? new Date() : ''
        }
        if (this.props.selectedEventData) {
          this.props.updateEvent(eventData, this.props.selectedEventData ? this.props.selectedEventData.id : '')
        } else {
          this.props.addEvent(eventData)
        }
      }
    })

  }

  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, scrollContentSt, scrollSt, keyboardSt, timeVwSt, addVwSt, containerSt, multilineTextSt, viewWidthSt } = myStyle;
    const { bgImg, logoImg } = Images
    const { eventName, eventDate, eventAddress, eventStartTime, eventEndTime } = this.state
    return (
      <View style={containerMainSt}>
        {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyboardSt}    scrollEnabled={true}
enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
resetScrollToCoords={{ x: 0, y: 0 }}
          > */}
        <KeyboardAvoidingView style={keyboardSt} behavior="padding" >

          <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>

            <View style={containerSt}>
              <View >
                <CustomTextField isEdit={this.props.isEditBool} {...this.state} title="Event Name"
                  value={eventName}
                  errorMsg={this.state.eventNameError}
                  returnKeyType={"next"}
                  onSubmitEditing={() => this._eventDateRef.onPressDate()}
                  onChangeText={this.handleEventName}
                // onBlur={() => {
                //   this.setState({
                //     emailError: Validate.validateEmail(this.state.email)
                //   })
                // }}
                // blurOnSubmit={false}
                />

                <CustomDatePicker isEdit={this.props.isEditBool} title='Event Date'
                  modeType='date'
                  setDateValue={eventDate}
                  getDate={this.handleEventDate}
                  errorMsg={this.state.eventDateError}
                  refName={ref => {
                    this._eventDateRef = ref;
                  }}
                />

                <CustomTextField isEdit={this.props.isEditBool} {...this.state}
                  title="Address"
                  styleCustom={multilineTextSt}
                  numberOfLines={4} multiline={true}
                  value={eventAddress}
                  errorMsg={this.state.eventAddressError}
                  returnKeyType={"next"}
                  onChangeText={this.handleEventAddress}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
              </View>
              <View style={timeVwSt}>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool} title='Event Start Time'
                    setDateValue={eventStartTime}
                    modeType='time'
                    getDate={this.handleEventStartTime}
                    errorMsg={this.state.eventStartTimeError}
                  />
                </View>
                <View style={viewWidthSt}>
                  <CustomDatePicker isEdit={this.props.isEditBool} title='Event End Time'
                    setDateValue={eventEndTime}
                    modeType='time'
                    getDate={this.handleEventEndTime}
                    errorMsg={this.state.eventEndTimeError}
                  />
                </View>
              </View>
              <View style={addVwSt}>
                {!this.props.isEditBool ? <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr={this.props.selectedEventData ? "UPDATE" : "ADD"}
                  onPressPr={this.addBtnAction} /> : null}
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

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
  addEvent,
  updateEvent,
  editOn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(eventScreen);
