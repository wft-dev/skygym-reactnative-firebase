import React, { Component } from 'react';
import { View, Alert, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Images, Colors } from '../../utils'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import textFontStyles from '../TextFontStyle';
import { symbol } from 'prop-types';
import MultiSelect from 'react-native-multiple-select';

class CustomDropDown extends Component {
  state = {
    selectedItems: [],
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    if (this.props.singleSelection) {
      const getItem = this.props.items.find(item => item.id === selectedItems.toString())

      this.setState({ selectedItems: selectedItems }, () => {
        this.setState({ newData: '' })
        this.props.selectedText(getItem)

      })
    } else {
      var allSelectedItems = this.props.items.filter((item) =>
        selectedItems.includes(item.id)
      ).map((item) => `${item.name}`
      ).join(', ')
      this.setState({ selectedItems: selectedItems }, () => {
        this.setState({ newData: allSelectedItems })
        this.props.selectedText(allSelectedItems)

      })
    }
  };



  render() {
    const { title, selectText, selectedText, errorMsg, orientation, backgroundColor, styleCustom, isSearch, refName, singleSelection } = this.props;
    const { wholeTextFldStyle, textVwStyle, labelStyle, dropDownTextStyle, dropdownMenuSubsectionStyle, errorLblStyle } = styles(this.props);
    return (<View style={wholeTextFldStyle}>
      <View>
        {title && <Text style={labelStyle}>{title}</Text>}
      </View>

      <View pointerEvents={this.props.isEdit ? 'none' : 'auto'} style={textVwStyle}>
        <MultiSelect
          ref={(input) => refName && refName(input)}
          hideTags
          single={singleSelection}
          items={this.props.items}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText={this.state.newData || selectText}
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor={Colors.yellowDark}
          selectedItemIconColor={Colors.yellowDark}
          itemTextColor={Colors.black}
          displayKey="name"
          searchInputStyle={{ color: Colors.black }}
          styleDropdownMenuSubsection={dropdownMenuSubsectionStyle}
          styleTextDropdown={dropDownTextStyle}
          styleTextDropdownSelected={dropDownTextStyle}
          styleInputGroup={{ display: isSearch ? 'flex' : 'none', }}
          textInputProps={{ editable: isSearch ? true : false }}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
          fixedHeight={false}
          fontSize={40}
        />

      </View>
      <View>
        {errorMsg ? <Text style={errorLblStyle}
        >{errorMsg}</Text> : null}
      </View>
    </View>);
  }
}

CustomDropDown.defaultProps = {
  singleSelection: true,
}
const textFontStyle = {
  ...textFontStyles.mediumTextMedium,
};
const styles = (props) => {
  return (
    StyleSheet.create({
      dropDownTextStyle: {
        ...textFontStyle,
        color: Colors.black,
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),
        // height: hp('3%'),
        marginLeft: props.isEdit ? -10 : 8,
        // marginRight: props.isEdit ?  -10 : 18, 
        //  paddingVertical: getOrientation() === "portrait" ? hp('1.8%') : wp('0.8%'),
      },
      dropdownMenuSubsectionStyle: {
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),
        marginTop: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
        borderBottomColor: props.isEdit ? Colors.white : null,
        borderBottomWidth: props.isEdit ? 1 : 0,
        //  alignSelf: 'center',
        // paddingTop: 0,
        // paddingBottom: 0,
        //  paddingVertical: getOrientation() === "portrait" ? hp('1.8%') : wp('0.8%'),

      },
      wholeTextFldStyle: {
        marginTop: 15,//20
      },
      textVwStyle: {
        // flexDirection: 'column',
        // justifyContent: 'center',
        // height: hp('7%'),
        //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
        paddingHorizontal: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        borderColor: props.isEdit ? Colors.white : (props.errorMsg ? 'red' : Colors.white),
        paddingTop: getOrientation() === "portrait" ? hp('0.1%') : wp('0.1%'),
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
        marginHorizontal: props.isEdit ? 0 : props.lablMarginPr ? 20 : 2,
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

export default CustomDropDown;


// const styles = (props) => {
//   return (
//     StyleSheet.create({
//       dropDownTextStyle: {
//         ...textFontStyle,
//         color: Colors.black,
//         backgroundColor: Colors.gray,
//         height: hp('3%'),
//      //  paddingVertical: getOrientation() === "portrait" ? hp('1.8%') : wp('0.8%'),
//       },
//       dropdownMenuSubsectionStyle : {
//         backgroundColor: Colors.gray,
//       //  alignSelf: 'center',
//         // paddingTop: 0,
//         // paddingBottom: 0,
//       //  paddingVertical: getOrientation() === "portrait" ? hp('1.8%') : wp('0.8%'),

//       },
//       wholeTextFldStyle: {
//         marginTop: 15,//20
//       },
//       textVwStyle: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         // height: hp('7%'),
//         //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
//         paddingHorizontal:   getOrientation() === "portrait" ? hp('1.4%') : wp('1.4%'),
//         paddingTop: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
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
//       errorLblStyle : {
//         ...textFontStyles.mediumSmallTextSemibold,
//         marginTop:  3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,
//         color:Colors.red,
//         textAlign: 'left'
//       },
//     })
//   )
// }

