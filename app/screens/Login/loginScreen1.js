// import React, { Component } from 'react';
// import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
// import { styles } from './styles';

// import CustomTextField from '../../components/CustomTextField';
// import CustomButton from '../../components/CustomButton';
// import { Images } from '../../utils'
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
//   validateEmail = (email) => {
//     if (!email.trim()) {
//       return 'Please Enter Name'
//     }
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (reg.test(email) === false) {
//       return 'Email is Not valid'
//     }
//     return ''
//   }

//   validatePassword = (password) => {
//     if (!password.trim()) {
//       return 'Please Enter Password'
//     }
//     if (!password.length >= 4) {
//       return 'Password need to be at least 4 digits.'
//     }
//     if (!/[a-zA-Z]/.test(password)) {
//       return 'Password need to contain letters.'
//     }
//     return ''
//   }
  



//   register = () => {
   

//     const emailError = this.validateEmail(this.state.email)
//     const passwordError = this.validatePassword(this.state.password)
//     console.log('--register---', emailError, passwordError);
//     this.setState({
//       emailError: emailError,
//       passwordError: passwordError,
//       isRequired: true
//     })

//     if (!emailError.trim() && !passwordError.trim()) {
//       alert('Details are valid!')
//     } else {

//     }
//   }


//   render() {
//     // const refPassword = useRef();

//     const { containerMainSt, keyboardSt, textVwSt, textFldVwSt, loginVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = styles;
//     const { bgImg, logoImg } = Images
//     return (
//       <View style={containerMainSt}>
//         <ImageBackground source={bgImg} style={bgViewSt}  >
//           {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyboardSt}    scrollEnabled={true}
// enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
// resetScrollToCoords={{ x: 0, y: 0 }}
//           > */}
//           <KeyboardAvoidingView style={keyboardSt} behavior="padding" >
//             <ScrollView contentContainerStyle={containerMainSt}>
//               <View style={containerSt}>
//                 <View style={logoVwSt}>
//                   <Image style={logoSt} source={logoImg} resizeMode="contain" />
//                 </View>
//                 <View style={textVwSt}>
//                   <CustomTextField title="Email"
//                     // isRequired={this.state.isRequired}
//                     // isRequiredHint= {this.state.emailError }
//                     returnKeyType={"next"}
                   
//                     invalidHint= {this.state.emailError }
//                     onSubmitEditing={() => this._textInputRef.refs.input.focus()}
//                     onInputChange={(text) => this.setState({ email: text.trim() })}
//                     onBlur={() => {
//                       this.setState({
//                         emailError: this.validateEmail(this.state.email)
//                       })
//                     }}
//                   />
//                   <CustomTextField title="Password"
//                     // isRequired={this.state.isRequired}
//                     // isRequiredHint={this.state.passwordError }
//                     returnKeyType={'done'}
//                     invalidHint= {this.state.passwordError }
//                     refName={ref => {
//                       this._textInputRef = ref;
//                     }}
//                     onInputChange={(text) => this.setState({ password: text.trim() })}
//                     onBlur={() => {
//                       this.setState({
//                         passwordError: this.validatePassword(this.state.password)
//                       })
//                     }}
//                   />
//                   <View style={loginVwSt}>
//                     <CustomButton letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="LOGIN" onPressPr={this.register} />
//                     <CustomButton buttonTypePr={CustomButtonType.undeline} buttonTitlePr="Registration" />
//                   </View>
//                   <View style={memberVwSt}>
//                     <Text style={memberTextSt} > Member{'/'}Trainer </Text>
//                     <CustomButton buttonTypePr={CustomButtonType.light} buttonTitlePr="Login" />
//                   </View>
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
