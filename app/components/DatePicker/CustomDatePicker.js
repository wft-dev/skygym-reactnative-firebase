import React, { Component } from 'react';
import { View, Alert, Image, StyleSheet, Text, TextInput, Keyboard } from 'react-native';

import { Images, Colors } from '../../utils'
import ImagePicker from 'react-native-image-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import textFontStyles from '../TextFontStyle';
import { symbol } from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { set } from 'react-native-reanimated';


class CustomDatePicker extends Component {
  state = {
    selectedDate: new Date(),
    isShowDatePicker: false,
    isShowDateText: true,
    _datePickerRef: null,
    isOnDateChange: false,
  }

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  onDateChange = (date) => {
    this.setState({ isOnDateChange: true })
    this.setState({ selectedDate: date }, () => {
      this.props.getDate(this.state.selectedDate)
      this.setState({ isShowDateText: false })
    })
  }

  // onDateChange1 = (date) => {
  //   this.props.modeType == 'date'  ? Moment(date).format("DD-MMM-YYYY") : Moment(date).format("hh:mm a")
  // }

  render() {
    const { title, modeType = 'date', noMaxDate = false, onFocus, imageNametitle,
      errorMsg, orientation, refName, backgroundColor,
      styleCustom, setDateValue, isEdit } = this.props;
    const { wholeTextFldStyle, textVwStyle, textFldStyle, labelStyle, dateWholeStyle, errorLblStyle } = styles(this.props);
    var date = '';
    if (setDateValue !== '') {
      date = moment(setDateValue).format("DD-MMM-YYYY");

    }

    return (<View style={wholeTextFldStyle}>
      <View>
        {title && <Text style={labelStyle}>{title}</Text>}
      </View>

      <View style={textVwStyle}>
        <DatePicker style={[dateWholeStyle, styleCustom]}
          //getDateStr={this.onDateChange1}

          date={this.state.isOnDateChange ? this.state.selectedDate : (modeType == 'date' ? date : setDateValue)}
          // placeholder={modeType == 'date' ? "select date" : "select time"}
          mode={modeType}
          format={modeType == 'date' ? "DD-MMM-YYYY" : 'hh:mm a'}
          minDate="01-01-1900"
          maxDate={noMaxDate == true ? new Date() : ''}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          hideText={setDateValue ? false : this.state.isShowDateText}
          showIcon={false}
          ref={(input) => refName && refName(input)}
          customStyles={{
            dateInput: {
              borderColor: isEdit ? Colors.white : (backgroundColor ? backgroundColor : Colors.gray),
              backgroundColor: isEdit ? Colors.white : (backgroundColor ? backgroundColor : Colors.gray),
            },
            dateText: {
              alignSelf: 'flex-start',
              ...textFontStyle,
            },
            disabled: {
              backgroundColor: isEdit ? Colors.white : (backgroundColor ? backgroundColor : Colors.gray),
            }
            // placeholderText:{
            //   color: Colors.gray,
            // }

          }}

          disabled={!this.props.editable || this.props.isEdit}
          onDateChange={this.onDateChange}
        />

        {/* {this.state.isShowDatePicker ? this.chooseDatePicker() : <TextInput onFocus = {this.onPressShowDatepicker} style={[textFldStyle, styleCustom]} {...this.props} ref={(input) => refName && refName(input)} />} */}
      </View>
      <View >
        {errorMsg ? <Text style={errorLblStyle}
        >{errorMsg}</Text> : null}
      </View>
    </View>);
  }
}

const textFontStyle = {
  ...textFontStyles.mediumTextMedium,
};
const styles = (props) => {
  return (
    StyleSheet.create({
      dateWholeStyle: {
        flex: 1,
        //height: hp('7%'),

        marginLeft: props.isEdit ? 0 : 18,
        marginRight: props.isEdit ? 0 : 18,
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),

      },

      wholeTextFldStyle: {
        marginTop: 15,//20
      },
      textVwStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: hp('7%'),
        //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),

        // paddingHorizontal: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        paddingVertical: getOrientation() === "portrait" ? hp('0.6%') : wp('0.6%'),
        borderColor: props.isEdit ? Colors.white : (props.errorMsg ? 'red' : Colors.white),
        borderWidth: props.isEdit ? 0 : (props.errorMsg ? 1 : 0),
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),
        borderRadius: props.isEdit ? 0 : getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        borderBottomColor: props.isEdit ? Colors.grayDim : null,
        borderBottomWidth: props.isEdit ? 1 : 1,
      },
      labelStyle: {
        ...textFontStyle,
        color: props.isEdit ? Colors.grayDim : Colors.black,
        marginBottom: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
      },
      img: {
        height: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        width: getOrientation() === "portrait" ? wp('1.3%') : hp('1.3%'),
        marginRight: 10,
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
      errorLblStyle: {
        ...textFontStyles.mediumSmallTextSemibold,
        marginTop: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
        color: Colors.red,
      },
    })
  )
}

export default CustomDatePicker;
CustomDatePicker.defaultProps = {
  editable: true,

};

// const styles = (props) => {
//   return (
//     StyleSheet.create({
//       dateWholeStyle: {
//         flex: 1,
//         //height: hp('7%'),

//         paddingLeft: 8,
//         paddingRight: 8,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.gray,

//       },
//       textFldStyle: {
//         ...textFontStyle,
//         //height: hp('7%'),
//         paddingLeft: 8,
//         paddingRight: 8,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.gray,

//       },
//       wholeTextFldStyle: {
//         marginTop: 15,//20
//       },
//       textVwStyle: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // height: hp('7%'),
//         //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
//         paddingHorizontal: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//         paddingVertical: getOrientation() === "portrait" ? hp('0.8%') : wp('0.8%'),
//         borderColor: props.errorMsg ? 'red' : Colors.white,
//         borderWidth: props.errorMsg ? 1 : 0,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.gray,
//         borderRadius: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//       },
//       labelStyle: {
//         ...textFontStyle,
//         marginBottom: 3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,

//       },
//       img: {
//         height: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//         width: getOrientation() === "portrait" ? wp('1.3%') : hp('1.3%'),
//         marginRight: 10,
//       },
//       datePickerStyle: {
//         width: 200,
//         marginTop: 20,
//       },
//       errorLblStyle: {
//         ...textFontStyles.mediumSmallTextSemibold,
//         marginTop: 3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,
//         color: Colors.red,
//       },
//     })
//   )
// }
