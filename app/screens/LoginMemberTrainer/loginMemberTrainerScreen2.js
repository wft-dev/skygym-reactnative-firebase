import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import { CustomTextField, CustomButton, CustomButtonType } from '../../components/index';
import { Images, Colors, Validate } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { loginMemberTrainer, } from '../../actions/session/sessionAction';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {

  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
class loginMemberTrainerScreen extends Component {

  state = {
    gymID: 'Bt0ESW4wmESw2NEI0tG8DnWvknG2', //'BXbsuGUyvJMcdGHOZuVxIllrRTe2' ,    //'YUEZtRRvqeOPGgUPAcDC0WUCfQ13',
    gymIDError: '',
    email: '5@gmail.com', //'1@gmail.com',//'6@gmail.com',
    emailError: '',
    password: '123456789',
    passwordError: '',
    orientation: getOrientation(),
  }

  componentDidMount() {
    lor(this);
    // this.props.loginMemberTrainer(this.state.gymID,this.state.email,this.state.password)

  }

  componentWillUnmount() {
    rol();
  }

  handleGymID = (text) => {
    this.setState({ gymID: text.trim() })
    if (this.state.gymIDError.trim()) {
      this.setState({ gymIDError: '' })
    }
  }

  handleEmail = (text) => {
    this.setState({ email: text.trim() })
    if (this.state.emailError.trim()) {
      this.setState({ emailError: '' })
    }
  }

  handlePassword = (text) => {
    this.setState({ password: text.trim() })
    if (this.state.passwordError.trim()) {
      this.setState({ passwordError: '' })
    }
  }

  register = () => {
    const gymIDError = Validate.validateInput(this.state.gymID, 'Gym ID')
    const emailError = Validate.validateEmail(this.state.email)
    const passwordError = Validate.validatePassword(this.state.password)
    this.setState({
      gymIDError: gymIDError,
      emailError: emailError,
      passwordError: passwordError,
    })

    if (emailError === '' && passwordError === '') {
      this.props.loginMemberTrainer(this.state.gymID, this.state.email, this.state.password)

    }
    // Actions.drawerMenu()
  }

  render() {
    const myStyle = styles(this.props);
    const { containerMainSt, scrollContentSt, scrollSt, keyboardSt, textVwSt, textFiledStyle, textFldVwSt, loginVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = myStyle;
    const { bgImg, logoImg } = Images
    return (
      <View style={containerMainSt}>
        <ImageBackground source={bgImg} style={bgViewSt}  >
          {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={keyboardSt}    scrollEnabled={true}
enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
resetScrollToCoords={{ x: 0, y: 0 }}
          > */}
          <KeyboardAvoidingView style={keyboardSt} behavior="padding" >
            <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>
              <View style={containerSt}>
                <View style={logoVwSt}>
                  <Image style={logoSt} source={logoImg} resizeMode="contain" />
                </View>
                <View style={textVwSt}>
                  <CustomTextField  {...this.state} title="Gym ID"
                    lablMarginPr={true}
                    backgroundColor={Colors.white}
                    errorMsg={this.state.emailError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._textInputRef.focus()}
                    onChangeText={this.handleGymID}
                    // onBlur={() => {
                    //   this.setState({
                    //     emailError: Validate.validateEmail(this.state.email)
                    //   })
                    // }}
                    blurOnSubmit={false}
                  />
                  <CustomTextField  {...this.state} title="Email"
                    lablMarginPr={true}
                    backgroundColor={Colors.white}
                    errorMsg={this.state.emailError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._textInputRef.focus()}
                    onChangeText={this.handleEmail}
                    // onBlur={() => {
                    //   this.setState({
                    //     emailError: Validate.validateEmail(this.state.email)
                    //   })
                    // }}
                    blurOnSubmit={false}
                  />
                  <CustomTextField {...this.state} title="Password"
                    lablMarginPr={true}
                    backgroundColor={Colors.white}
                    errorMsg={this.state.passwordError}
                    returnKeyType={"done"}
                    refName={ref => {
                      this._textInputRef = ref;
                    }}
                    onChangeText={this.handlePassword}
                  // onBlur={() => {
                  //   this.setState({
                  //     passwordError: Validate.validatePassword(this.state.password)
                  //   })
                  // }}
                  />
                </View>
                <View style={memberVwSt}>
                  <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="LOGIN" onPressPr={this.register} />
                  <CustomButton {...this.state} buttonTypePr={CustomButtonType.undeline} buttonTitlePr="Forgot Password" onPressPr={() => { Actions.signup() }} />
                  <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.default} buttonTitlePr="BACK" onPressPr={() => Actions.pop()} />

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { user } }) => ({
  routes: routes,
  user: user,
});

const mapDispatchToProps = {
  loginMemberTrainer,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginMemberTrainerScreen);
