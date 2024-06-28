import   React,{ Component } from 'react';
import { View, Text,TextInput, StyleSheet } from 'react-native';
import styles from './CustomTextFiledStyle'


class CustomTextFiled extends Component { 
   state = {
    isValidMessage: ''
   }
   onTextChange = (text) => {
			// if (this.props.errorMsg) {
      //   console.log('----onTextChange----', this.state.isValidMessage );
      //           this.setState({
      //             isValidMessage: ''})
      //       			}
			// this.props.onChangeText(text);
    }

    componentDidMount() {
		// this.setState({
		// 	isValidMessage: this.props.errorMsg,
		// });
  }

  // static getDerivedStateFromProps(props, state) {
	// 	if (props.errorMsg !== state.isValidMessage) {
  //     return {
  //       isValidMessage: props.errorMsg
  //     };
  //   }
  //   return null;
  // }
  
 

  render() {
    const {title,errorMsg, multiline, numberOfLines,lablMarginPr, orientation,backgroundColor,styleCustom, onChangeText,
       isSecured, isRequired, isRequiredHint,keyboardType, invalidHint, returnKeyType,onInputChange,onValidate,
        refName, onSubmitEditing, blurOnSubmit} = this.props;
    const {wholeTextFldStyle,textVwStyle,labelStyle,textFldStyle,errorLblStyle} = styles(this.props);
  

  //console.log('--CustomTextFiled props-------',styleCustom);
    return (
      <View style={wholeTextFldStyle}>
        <View> 
          {title !== '' &&  <Text style={labelStyle}>{title}</Text>  }
          </View>
        <View style={textVwStyle}>
          <TextInput  editable = {!this.props.isEdit} style={[textFldStyle, styleCustom]} {...this.props} ref={(input) => refName && refName(input)} />
        </View>
        <View>
           { errorMsg ?  <Text style={errorLblStyle}
						>{errorMsg}</Text> : null}
           </View> 
      </View>
    );
  }
}
export default CustomTextFiled;

