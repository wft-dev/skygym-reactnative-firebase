import React, { Component } from 'react';
import { View, Image, Text, FlatList, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';

import { CustomButton, CustomButtonType, CustomDatePicker, CustomNoDataFoundView } from '../../components/index';
import { Images, dateTimeHelper, Colors, Strings } from '../../utils'
import { Actions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker';
import { getAttendance } from '../../actions/attendance/attendanceAction';
import { connect } from 'react-redux';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';


class attendanceScreen extends Component {

  state = {
    selectedDate: dateTimeHelper.getDateFormat(new Date()),
    nextDate: dateTimeHelper.getNextSevenDays(new Date()),
    isDatePicker: false,
    datePickerRef: null,
    getDATA: [],
    loaded: false,

  }

  componentDidMount() {
    lor(this);
    var currentDate = new Date()
    var nextDate = dateTimeHelper.getNextSevenDays(currentDate);
    this.setState({ nextDate: dateTimeHelper.getDateFormat(nextDate) })

    this.callGetAttendanceApi(currentDate, nextDate)
    //console.log("-------this.props.attendanceData---------",this.props.attendanceData);
  }

  callGetAttendanceApi(currentDateString, nextDateString) {
    this.props.getAttendance(this.props.screenType, currentDateString, nextDateString, this.props.selectedMemberID)
    // this.props.attendanceData && this.props.attendanceData.map((valu)=> {
    //   let v = Object.keys(valu)[0]

    //   if (valu[v].length > 0) {
    //     valu[v].map(val  => {
    //       val['id'] = valu['id']
    //       this.setState({getDATA : this.state.getDATA.push(val)})
    //     })
    //   }
    // })

  }

  componentWillUnmount() {
    rol();
  }


  renderDaysCheckinView = ({ item, index }) => {
    // let v = Object.keys(item)[0]
    const { grayBorderView, checkiInVwSt, checkinTextSt, dotImageSt, dateTextSt } = styles(this.props);
    return (

      <View style={grayBorderView}>
        <Image style={dotImageSt} source={item.checkIn == '' || item.checkOut == '' ? Images.redImg : Images.greenImg} resizeMode="contain" />
        <Text style={dateTextSt}>{item.day}</Text>
        <View style={checkinVwSt}>
          <Text style={checkinTextSt}>{'Check in \n' + (item.checkIn == '' ? '---' : dateTimeHelper.getTime(item.checkIn.toDate()))}</Text>
        </View>
        <View style={checkinVwSt}>
          <Text style={checkinTextSt}>{'Check out \n' + (item.checkOut == '' ? '---' : dateTimeHelper.getTime(item.checkOut.toDate()))}</Text>
        </View>

      </View>
    );
  };

  openDatePicker = (isOpen) => {
    this.datePickerRef.onPressDate()
  }

  changeNextPreviousDate = (nextBool) => {
    var previousNextDate = nextBool === true ? dateTimeHelper.getNextDays(this.state.selectedDate) : dateTimeHelper.getPreviousDays(this.state.selectedDate)
    // var getNextSevenDate = dateTimeHelper.getNextSevenDays(previousNextDate);
    // this.setState({selectedDate: dateTimeHelper.getDateFormat(previousNextDate), nextDate : dateTimeHelper.getDateFormat(getNextSevenDate) })
    this.dateChangeOfPicker(previousNextDate)

  }

  dateChangeOfPicker = (text) => {

    // this.setState({selectedDate: text})
    var getTodayDate = dateTimeHelper.getNextSevenDays(text);
    this.setState({ selectedDate: dateTimeHelper.getDateFormat(text), nextDate: dateTimeHelper.getDateFormat(getTodayDate) })
    this.callGetAttendanceApi(text, getTodayDate)
  }

  showNoAttendanceFound = () => {

    // return (
    //   <CustomNoDataFoundView isfullView = {false} title = {Strings.noDataFound.attendance} message= {Strings.noDataFound.noRecord}/>
    // )
  }

  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, loaderContainer, scrollSt, scrollContentSt, imageVwSt, userImageSt, nameUserImageAllViewSt,
      nameAddressAllViewSt, nameTextViewSt, addressTextViewSt, dateViewSt
      , checkTextViewSt, listViewSt, leftDateTextSt, rightDateTextSt, checkdateViewSt, prevDateViewSt, nextDateViewSt, calenerImageSt, arrowImageSt } = myStyle;
    const { bgImg, logoImg } = Images
    return (
      <ScrollView style={scrollSt} showsVerticalScrollIndicator={false} contentContainerStyle={scrollContentSt}>
        <View style={containerMainSt}>

          <View >
            <View style={nameUserImageAllViewSt}>
              <View style={imageVwSt}>

                <View style={userImageSt}>
                  {!this.state.loaded ?
                    <View style={loaderContainer}>
                      <ActivityIndicator color={Colors.black} />
                    </View> : null}
                  <Image style={userImageSt}
                    source={this.props.selectedMemberData && this.props.selectedMemberData.imageUrl ? { uri: this.props.selectedMemberData.imageUrl } : Images.user1Img}
                    //resizeMode="contain" 
                    onLoadEnd={() => this.setState({ loaded: true })} />
                </View>
              </View>
              <View style={nameAddressAllViewSt}>
                <Text style={nameTextViewSt}>{this.props.selectedMemberData.name}</Text>
                <Text style={addressTextViewSt}>{this.props.selectedMemberData.address}</Text>
              </View>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => this.openDatePicker(true)}
            underlayColor={Colors.white} >
            <View style={checkdateViewSt}>
              <View style={{ width: 0, height: 0 }}>
                {!this.state.isDatePicker ?
                  <CustomDatePicker
                    modeType='date'
                    getDate={(text) => this.dateChangeOfPicker(text)}
                    refName={ref => {
                      this.datePickerRef = ref;
                    }}
                  /> : null}
              </View>
              <Text style={checkTextViewSt}>{'Check by date'}</Text>
              <Image style={calenerImageSt} source={Images.calenderImg} resizeMode="contain" />
            </View>
          </TouchableHighlight >

          <View style={dateViewSt}>
            <TouchableHighlight
              onPress={() => this.changeNextPreviousDate(false)}
              underlayColor={Colors.white} >
              <View style={prevDateViewSt}>
                <Image style={arrowImageSt} source={Images.leftImg} resizeMode='center' />
                <Text numberOfLines={1} style={leftDateTextSt}>{this.state.selectedDate}</Text>
              </View>
            </TouchableHighlight >
            <TouchableHighlight
              onPress={() => this.changeNextPreviousDate(true)}
              underlayColor={Colors.white} >
              <View style={nextDateViewSt}>
                <Text numberOfLines={1} style={rightDateTextSt}>{this.state.nextDate}</Text>
                <Image style={arrowImageSt} source={Images.rightImg} resizeMode="contain" />
              </View>
            </TouchableHighlight >

          </View>
          <View style={listViewSt}>
            {this.props.attendanceData && this.props.attendanceData.length > 0 ?
              <FlatList data={this.props.attendanceData} renderItem={this.renderDaysCheckinView} /> :
              this.showNoAttendanceFound()}
          </View>
          <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="BACK"
            onPressPr={() =>
              Actions.pop()
            } />

        </View>
      </ScrollView>

    );
  }
}
const mapStateToProps = ({ routes, attendanceReducer: { attendanceData } }) => ({
  routes: routes,
  attendanceData: attendanceData,
});

const mapDispatchToProps = {
  getAttendance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(attendanceScreen);