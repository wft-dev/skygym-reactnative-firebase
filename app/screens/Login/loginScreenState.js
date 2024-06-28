// import React, { Component, useEffect, useState } from 'react';
// import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
// import  styles  from './styles';

// import CustomTextField from '../../components/CustomTextFieldState';
// import CustomButton from '../../components/CustomButton';
// import { Images,Validate } from '../../utils'
// import { CustomButtonType } from '../../components/CustomButtonStyle';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import {
  
//     listenOrientationChange as lor,
//   removeOrientationListener as rol, getOrientation
// } from 'react-native-responsive-screen';
// import { value } from 'react-native-extended-stylesheet';
// import { Value } from 'react-native-reanimated';

// function LoginScreenState (){

//   state = {
//     email: '',
//     emailError: '',
//     password: '',
//     passwordError: '',
//     isRequired: false,
//     orientation1: getOrientation()
//   }
//   const [values, setValues] = useState(state)

//   const [orientation, setOrientation] = useState(getOrientation());

//   useEffect(() => {
//     lor(setOrientation);
//     console.log('--register---', orientation);

//     return () => {
//       rol();
//     };
//   }, []);

// function handleEmail(text) {
//     setValues({...values, email: text.trim() })
//     if (values.emailError.trim()) {
//         setValues({...values, emailError:'' })
//     }
//  }
 
//  function handlePassword(text)  {
//     setValues({ ...values,password: text.trim() })
//     if (values.passwordError.trim()) {
//         setValues({ ...values, passwordError:'' })
//     }
//  }

//   register = () => {
//     const emailError =  Validate.validateEmail(values.email)
//     const passwordError = Validate.validatePassword(values.password)
//     setValues({...values,
//       emailError: emailError,
//       passwordError: passwordError,
//       isRequired: true
//     })

//     if (!emailError.trim() && !passwordError.trim()) {
//       alert('Details are valid!')
//     } else {

//     }
//   }
//   const myStyle = styles();
//     const { containerMainSt,scrollContentSt, scrollSt, keyboardSt, textVwSt, textFldVwSt, loginVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = myStyle;
//     const { bgImg, logoImg } = Images

//   return (

//       <View style={containerMainSt}>
//         <ImageBackground source={bgImg}bgViewSt}  >
//           {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyboardSt}    scrollEnabled={true}
// enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
// resetScrollToCoords={{ x: 0, y: 0 }}
//           > */}
//           <KeyboardAvoidingView style={keyboardSt} behavior="padding" >

//             <ScrollView style={scrollSt}   contentContainerStyle={scrollContentSt}>

//               <View style={containerSt}>
//                 <View style={logoVwSt}>
//                   <Image style={logoSt} source={logoImg} resizeMode="contain" />
//                 </View>
//                 <View style={textVwSt}>
//                   <CustomTextField {...values}  title="Email"
//                     errorMsg={values.emailError}
//                     returnKeyType={"next"}
//                     onSubmitEditing={() => _textInputRef.focus()}
//                     onChangeText={handleEmail}
//                     // onBlur={() => {
//                     //   this.setState({
//                     //     emailError: Validate.validateEmail(this.state.email)
//                     //   })
//                     // }}
//                     blurOnSubmit={false}
//                   />
//                   <CustomTextField  {...values} title="Password"
//                     errorMsg={values.passwordError}
//                     returnKeyType={"done"}
//                     refName={ref => {
//                      _textInputRef = ref;
//                     }}
//                     onChangeText={handlePassword}
//                   // onBlur={() => {
//                   //   this.setState({
//                   //     passwordError: Validate.validatePassword(this.state.password)
//                   //   })
//                   // }}
//                   />
//                 </View>
//                 <View style={loginVwSt}>
//                   <CustomButton {...values} letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="LOGIN" onPressPr={register} />
//                   <CustomButton {...values}  buttonTypePr={CustomButtonType.undeline} buttonTitlePr="Registration" />
//                 </View>
//                 <View style={memberVwSt}>
//                   <Text style={memberTextSt} > Member{'/'}Trainer </Text>
//                   <CustomButton {...values} buttonTypePr={CustomButtonType.light} buttonTitlePr="Login" />
//                 </View>
//               </View>

//             </ScrollView>
//             </KeyboardAvoidingView>


//         </ImageBackground>
//       </View>
//   )
// }
// export default LoginScreenState;
