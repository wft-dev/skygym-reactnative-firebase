import   React,{ Component } from 'react';
import TextField from 'react-native-text-field';
import { View, TextInput, Button,StyleSheet } from 'react-native';

import {Colors} from '../utils'

import textFontStyles from './TextFontStyle';

const CELL_HEIGHT = 60;
class CustomTextFiled1 extends Component { 
  validatePassword = (password) => {
   
    return false // Return 'true' to indicate the text is valid.
    
  }
  
  render() {
    const {title, placeholder, isSecured, isRequired, isRequiredHint,keyboardType, invalidHint, returnKeyType,onInputChange,onValidate, refName, onSubmitEditing, blurOnSubmit} = this.props;
    const {wholeTextFldStyle,labelStyle,textFldStyle} = styles;
  console.log('--sas-------',this.props.invalidHint);
    return (
      <View >
        <TextField {...this.props}
			title= {title}
			placeholder={placeholder}
      style={wholeTextFldStyle}
      titleStyle={labelStyle}
      textFieldStyle={textFldStyle}
      textInputStyle={{ color: 'blue' }}
      placeholderStyle={{ color: 'black' }}
      cellHeight={CELL_HEIGHT}
		  onValidate={text => this.validatePassword(text)}
			invalidHint={invalidHint}
			validateAsTyping={false}
      isSecured={isSecured || false} 
		 	isRequired={isRequired}
      isRequiredHint={isRequiredHint}
      keyboardType={keyboardType || 'default'}
      returnKeyType={returnKeyType || 'default'}
      onSubmitEditing={onSubmitEditing ?onSubmitEditing : null}
      ref={refName ? refName :null}
      blurOnSubmit={blurOnSubmit}
		/>
      </View>
    );
  }
}
export default CustomTextFiled1;

// const textFontStyle = {
//   ...textFontStyles.mediumTextMedium,
//   color:Colors.black,
// };

// export const styles = StyleSheet.create({
//   wholeTextFldStyle: {
//     marginTop: 20,
//   },
//   labelStyle: {
//     ...textFontStyle,
//     marginBottom: 8,
//     marginHorizontal: 20,
//   },
//   textFldStyle: {
//     ...textFontStyle,
//     backgroundColor: Colors.white,
//     borderRadius: 18,
//   },
 
// });

