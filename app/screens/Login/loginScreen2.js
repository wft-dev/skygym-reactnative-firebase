// import React, { Component } from 'react';
// import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
// import { styles } from './styles';

// import CustomTextField from '../../components/CustomTextField';
// import CustomButton from '../../components/CustomButton';
// import { Images,Validate } from '../../utils'
// import { CustomButtonType } from '../../components/CustomButtonStyle';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// class LoginScreen extends Component {

//   state = {
//     email: '',
//     emailError: '',
//     password: '',
//     passwordError: '',
//     isRequired: false
//   }
  
//   handleEmail = (text) => {
//     this.setState({ email: text.trim() })
//     if (this.state.emailError.trim()) {
//        this.setState({ emailError:'' })
//     }
//  }
 
//  handlePassword = (text) => {
//     this.setState({ password: text.trim() })
//     if (this.state.passwordError.trim()) {
//         this.setState({ passwordError:'' })
//     }
//  }

//   register = () => {
//     const emailError =  Validate.validateEmail(this.state.email)
//     const passwordError = Validate.validatePassword(this.state.password)
//     this.setState({
//       emailError: emailError,
//       passwordError: passwordError,
//       isRequired: true
//     })
//     console.log('--register---', this.state);

//     if (!emailError.trim() && !passwordError.trim()) {
//       alert('Details are valid!')
//     } else {

//     }
//   }


//   render() {
//     // const refPassword = useRef();

//     const { containerMainSt, scrollSt, keyboardSt, textVwSt, textFldVwSt, loginVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = styles;
//     const { bgImg, logoImg } = Images
//     return (
//       <View style={containerMainSt}>
//         <ImageBackground source={bgImg} style={bgViewSt}  >
//           {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyboardSt}    scrollEnabled={true}
// enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
// resetScrollToCoords={{ x: 0, y: 0 }}
//           > */}
//           <KeyboardAvoidingView style={keyboardSt} behavior="padding" >
//             <ScrollView >
//               <View style={containerSt}>
//                 <View style={logoVwSt}>
//                   <Image style={logoSt} source={logoImg} resizeMode="contain" />
//                 </View>
//                 <View style={textVwSt}>
//                   <CustomTextField title="Email"
//                     errorMsg={this.state.emailError}
//                     returnKeyType={"next"}
//                     onSubmitEditing={() => this._textInputRef.focus()}
//                     onChangeText={this.handleEmail}
//                     // onBlur={() => {
//                     //   this.setState({
//                     //     emailError: Validate.validateEmail(this.state.email)
//                     //   })
//                     // }}
//                     blurOnSubmit={false}
//                   />
//                   <CustomTextField title="Password"
//                     errorMsg={this.state.passwordError}
//                     returnKeyType={"done"}
//                     refName={ref => {
//                       this._textInputRef = ref;
//                     }}
//                     onChangeText={this.handlePassword}
//                   // onBlur={() => {
//                   //   this.setState({
//                   //     passwordError: Validate.validatePassword(this.state.password)
//                   //   })
//                   // }}
//                   />
//                 </View>
//                 <View style={loginVwSt}>
//                   <CustomButton letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="LOGIN" onPressPr={this.register} />
//                   <CustomButton buttonTypePr={CustomButtonType.undeline} buttonTitlePr="Registration" />
//                 </View>
//                 <View style={memberVwSt}>
//                   <Text style={memberTextSt} > Member{'/'}Trainer </Text>
//                   <CustomButton buttonTypePr={CustomButtonType.light} buttonTitlePr="Login" />
//                 </View>
//               </View>
//             </ScrollView>

//           </KeyboardAvoidingView>
//         </ImageBackground>
//       </View>
//     );
//   }
// }
// export default LoginScreen;
