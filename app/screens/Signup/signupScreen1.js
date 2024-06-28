import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';

import { CustomTextField, CustomButton, CustomButtonType } from '../../components';
import { Images, Validate, Colors } from '../../utils'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { updateEmail, updateData, updatePassword, signup, getUser } from '../../actions/session/actions';
import {

    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

class signupScreen extends Component {

    state = {
        gymName: 'Gym Name',
        gymNameError: '',
        gymId: 'Gym ID',
        gymIdError: '',
        gymAddress: 'Gym address',
        gymAddressError: '',
        firstName: 'First Name',
        firstNameError: '',
        lastName: 'Last Name',
        lastNameError: '',
        gender: '',
        genderError: '',
        email: '',
        emailError: '',
        mobileNumber: '',
        mobileNumberError: '',
        password: '',
        passwordError: '',
        dob: '',
        lastNameError: '',
        showNextView: false,
        orientation: getOrientation(),
    }
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    handleEmail = (text) => {
        this.props.signUpUser.email = text
        // this.setState({ email: text.trim() })
        if (this.state.emailError.trim()) {
            this.setState({ emailError: '' })
        }
    }

    handlePassword = (text) => {
        this.props.signUpUser.password = text
        //  this.setState({ password: text.trim() })
        if (this.state.passwordError.trim()) {
            this.setState({ passwordError: '' })
        }
    }

    // handleValidText= (text) => {
    //     this.setState({ validText: text.trim() })
    //     if (this.state.validError.trim()) {
    //         this.setState({ validError: '' })
    //     }
    // }


    updateRef(name, ref) {
        console.log('------name ref-----', name, ref);
        this[name] = ref;
    }
    handleValidText = (text) => {
        ['gymName', 'gymId', 'gymAddress', 'firstName', 'lastName']
            .map((name, refName) => ({ name, ref: this[name] }))
            .forEach(({ name, refName }) => {
                if (ref.isFocused()) {

                    this.setState({ [name]: text });
                    console.log('--------handleValidText---', ref);
                }
            });
    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onSubmit() {
        let errors = {};

        ['Gym Name', 'Gym ID', 'Gym address', 'First Name', 'Last Name']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('password' === name && value.length < 6) {
                        errors[name] = 'Too short';
                    }
                }
            });

        this.setState({ errors });
        console.log('--------errors---', this.state);
    }

    register = () => {
        const emailError = Validate.validateEmail(this.state.email)
        const passwordError = Validate.validatePassword(this.state.password)
        const validTextError = Validate.validateInput(this.state.validText)

        this.setState({
            emailError: emailError,
            passwordError: passwordError,
            validError: validTextError,
            isRequired: true
        })
        console.log('--register---', this.state);

        if (!emailError.trim() && !passwordError.trim() && !validTextError.trim()) {
            alert('Details are valid!')
        } else {

        }
    }
    backBtnAction = () => {
        Actions.login()
    }


    doneBtnAction = () => {
        Actions.drawerMenu()
    }

    nextViewAction = () => {
        this.props.signup()
        // this.setState({showNextView: true})
        // const emailError = Validate.validateEmail(this.state.email)
        // const passwordError = Validate.validatePassword(this.state.password)
        // const validTextError = Validate.validateInput(this.state.validText)

        // this.setState({
        //     emailError: emailError,
        //     passwordError: passwordError,
        //     validError: validTextError,
        //     isRequired: true
        // })


        // if (!emailError.trim() && !passwordError.trim() && !validTextError.trim() ) {
        //     alert('Details are valid!')
        // } else {

        // }
    }
    getStyles() {
        const myStyle = styles(this.props);
        return { containerMainSt, txtBgCltSt, scrollContentSt, scrollSt, keyboardSt, textVwSt, textFldVwSt, doneBtSt, backVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = myStyle;
    }
    firstView = () => {
        this.getStyles()
        return <View style={containerSt}>
            <View style={textVwSt}>
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym Name"
                    value={this.props.signUpUser.email}
                    errorMsg={this.state.validError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymIDRef.focus()}
                    onChangeText={this.handleEmail}
                    refName={ref => { this.updateRef(this._gyNameRef, ref) }}
                    // onBlur={() => {
                    //   this.setState({
                    //     emailError: Validate.validateEmail(this.state.email)
                    //   })
                    // }}
                    blurOnSubmit={false}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym ID"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymAddressRef.focus()}
                    refName={ref => {
                        this._gymIDRef = ref;
                    }}
                    onChangeText={this.handlePassword}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym address"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._firstNameRef.focus()}
                    refName={ref => {
                        this._gymAddressRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="First Name"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._lastNameRef.focus()}
                    refName={ref => {
                        this._firstNameRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white}  {...this.state} title="Last Name"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"done"}
                    refName={ref => {
                        this._lastNameRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
            </View>
            <View style={backVwSt}>
                <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.default} buttonTitlePr="BACK" onPressPr={this.backBtnAction} />
                <CustomButton {...this.state} imageIcon={Images.nextImg} isIcon={true} buttonTypePr={CustomButtonType.default} onPressPr={this.nextViewAction} />
            </View>
        </View>
    }


    secondView = () => {
        this.getStyles()
        return <View style={containerSt}>
            <View style={textVwSt}>
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white}  {...this.state} title="Gender"
                    errorMsg={this.state.validError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymIDRef.focus()}
                    onChangeText={this.handleValidText}
                    refName={ref => { this.updateRef(this._gyNameRef, ref) }}
                    // onBlur={() => {
                    //   this.setState({
                    //     emailError: Validate.validateEmail(this.state.email)
                    //   })
                    // }}
                    blurOnSubmit={false}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white}  {...this.state} title="Email"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymAddressRef.focus()}
                    refName={ref => {
                        this._gymIDRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Mobile Number"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._firstNameRef.focus()}
                    refName={ref => {
                        this._gymAddressRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Password"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._lastNameRef.focus()}
                    refName={ref => {
                        this._firstNameRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="D.O.B"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"done"}
                    refName={ref => {
                        this._lastNameRef = ref;
                    }}
                    onChangeText={this.handleValidText}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
            </View>
            <View style={doneBtSt}>
                <CustomButton {...this.state} letterSpacingPr={true} buttonTypePr={CustomButtonType.dark} buttonTitlePr="DONE" onPressPr={this.doneBtnAction} />
            </View>
        </View>
    }
    render() {
        this.getStyles()
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
                            {!this.state.showNextView ? this.firstView() : this.secondView()}
                        </ScrollView>
                    </KeyboardAvoidingView>


                </ImageBackground>
            </View>
        );
    }
}
const mapStateToProps = ({ routes, signUpUser }) => ({
    routes: routes,
    signUpUser: signUpUser,

});

const mapDispatchToProps = {
    signup,
    updateEmail,
    updatePassword,
    getUser,
    updateData

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(signupScreen);
