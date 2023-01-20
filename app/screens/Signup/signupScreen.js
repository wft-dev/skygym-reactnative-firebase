import React, { Component } from 'react';
import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';

import { CustomTextField, CustomButton, CustomButtonType } from '../../components';
import { Images, Validate, Colors } from '../../utlis'
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { updateEmail, updateData, updatePassword, signup, getUser } from '../../actions/session/sessionAction';
import {

    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

class signupScreen extends Component {

    state = {
        gymNameError: '',
        gymIdError: '',
        gymAddressError: '',
        firstNameError: '',
        lastNameError: '',
        genderError: '',
        emailError: '',
        mobileNumberError: '',
        passwordError: '',
        lastNameError: '',
        dobError: '',
        showNextView: false,
        orientation: getOrientation(),
        gymName: '2',
        gymId: '2',
        gymAddress: '2',
        firstName: '2',
        lastName: '2',
        gender: '2',
        email: '2@gmail.com',
        mobileNumber: '2',
        password: '123456789',
        dob: '',
    }
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    handleGymName = (text) => {

        // this.props.signUpUser.gymName = text
        this.setState({ gymName: text.trim() })
        if (this.state.gymNameError.trim()) {
            this.setState({ gymNameError: '' })
        }
    }
    handleGymId = (text) => {
        //this.props.signUpUser.gymId = text
        this.setState({ gymId: text.trim() })
        if (this.state.gymIdError.trim()) {
            this.setState({ gymIdError: '' })
        }
    }
    handleGymAddress = (text) => {
        //this.props.signUpUser.gymAddress = text
        this.setState({ gymAddress: text.trim() })
        if (this.state.gymAddressError.trim()) {
            this.setState({ gymAddressError: '' })
        }
    }

    handleFirstName = (text) => {
        //this.props.signUpUser.firstName = text
        this.setState({ firstName: text.trim() })
        if (this.state.firstNameError.trim()) {
            this.setState({ firstNameError: '' })
        }
    }

    handleLastName = (text) => {
        //this.props.signUpUser.lastName = text
        this.setState({ lastName: text.trim() })
        if (this.state.lastNameError.trim()) {
            this.setState({ lastNameError: '' })
        }
    }


    handleGender = (text) => {

        // this.props.signUpUser.gender = text
        this.setState({ gender: text.trim() })
        if (this.state.genderError.trim()) {
            this.setState({ genderError: '' })
        }
    }

    handleEmail = (text) => {
        //this.props.signUpUser.email = text
        this.setState({ email: text.trim() })
        if (this.state.emailError.trim()) {
            this.setState({ emailError: '' })
        }
    }

    handlePassword = (text) => {
        // this.props.signUpUser.password = text
        this.setState({ password: text.trim() })
        if (this.state.passwordError.trim()) {
            this.setState({ passwordError: '' })
        }
    }

    handleMobileNumber = (text) => {
        //this.props.signUpUser.mobileNumber = text
        this.setState({ mobileNumber: text.trim() })
        if (this.state.mobileNumberError.trim()) {
            this.setState({ mobileNumberError: '' })
        }
    }

    handleDob = (text) => {
        // this.props.signUpUser.dob = text
        this.setState({ dob: text.trim() })
        if (this.state.dobError.trim()) {
            this.setState({ dobError: '' })
        }
    }

    backBtnAction = () => {
        Actions.login()
    }


    doneBtnAction = () => {
        const { gymName, gymId, gymAddress, firstName, lastName, gender,
            email, mobileNumber, password, dob } = this.state
        const genderErrorTxt = Validate.validateInput(gender, 'Gender');
        const emailErrorTxt = Validate.validateEmail(email);
        const mobileNumberErrorTxt = Validate.validateInput(mobileNumber, 'Mobile Number');
        const passwordErrorTxt = Validate.validatePassword(password);
        const dobErrorTxt = Validate.validateAge(dob);
        this.setState({
            genderError: genderErrorTxt,
            emailError: emailErrorTxt,
            mobileNumberError: mobileNumberErrorTxt,
            passwordError: passwordErrorTxt,
            dobError: dobErrorTxt,

        }, () => {
            if (genderErrorTxt === '' && emailErrorTxt === ''
                && mobileNumberErrorTxt === ''
                && passwordErrorTxt === ''
                && dobErrorTxt === ''
            ) {
                this.props.signup(gymName, gymId, gymAddress, firstName, lastName, gender,
                    email, mobileNumber, password, dob)
            }
        })


    }

    nextViewAction = () => {

        const gymNameErrorTxt = Validate.validateInput(this.state.gymName, 'Gym Name');
        const gymIdErrorTxt = Validate.validateInput(this.state.gymId, 'Gym ID');
        const gymAddressErrorTxt = Validate.validateInput(this.state.gymAddress, 'Gym address');
        const firstNameErrorTxt = Validate.validateInput(this.state.firstName, 'First Name');
        const lastNameErrorTxt = Validate.validateInput(this.state.lastName, 'Last Name');
        this.setState({
            gymNameError: gymNameErrorTxt,
            gymIdError: gymIdErrorTxt,
            gymAddressError: gymAddressErrorTxt,
            firstNameError: firstNameErrorTxt,
            lastNameError: lastNameErrorTxt,
        }, () => {
            if (gymNameErrorTxt === '' && gymIdErrorTxt === ''
                && gymAddressErrorTxt === ''
                && firstNameErrorTxt === ''
                && lastNameErrorTxt === ''
            ) {
                this.setState({ showNextView: true })
            }
        })
    }


    getStyles() {
        return { containerMainSt,  scrollContentSt, scrollSt, ketBordSt, textVwSt, textFldVwSt, doneBtSt, backVwSt, memberVwSt, logoSt, logoVwSt, textInputSt, bgViewSt, navBarSt, containerSt, memberTextSt } = styles(this.props);
    }
    firstView = () => {
        this.getStyles()
        return <View style={containerSt}>
            <View style={textVwSt}>
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym Name"
                    errorMsg={this.state.gymNameError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymIDRef.focus()}
                    onChangeText={this.handleGymName}
                    refName={ref => this._gyNameRef = ref}
                // onBlur={() => {
                //   this.setState({
                //     emailError: Validate.validateEmail(this.state.email)
                //   })
                // }}
                // blurOnSubmit={false}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym ID"
                    errorMsg={this.state.gymIdError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymAddressRef.focus()}
                    refName={ref => {
                        this._gymIDRef = ref;
                    }}
                    onChangeText={this.handleGymId}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Gym address"
                    styleCustom={{ minHeight: 70, maxHeight: 100 }} numberOfLines={4} multiline={true}
                    errorMsg={this.state.gymAddressError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._firstNameRef.focus()}
                    refName={ref => {
                        this._gymAddressRef = ref;
                    }}
                    onChangeText={this.handleGymAddress}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="First Name"
                    errorMsg={this.state.firstNameError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._lastNameRef.focus()}
                    refName={ref => {
                        this._firstNameRef = ref;
                    }}
                    onChangeText={this.handleFirstName}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white}  {...this.state} title="Last Name"
                    errorMsg={this.state.lastNameError}
                    returnKeyType={"done"}
                    refName={ref => {
                        this._lastNameRef = ref;
                    }}
                    onChangeText={this.handleLastName}
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
                    errorMsg={this.state.genderError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymIDRef.focus()}
                    onChangeText={this.handleGender}
                // onBlur={() => {
                //   this.setState({
                //     emailError: Validate.validateEmail(this.state.email)
                //   })
                // }}
                // blurOnSubmit={false}
                />

                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white}  {...this.state} title="Email"
                    errorMsg={this.state.emailError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._gymAddressRef.focus()}
                    refName={ref => {
                        this._gymIDRef = ref;
                    }}
                    onChangeText={this.handleEmail}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Mobile Number"
                    errorMsg={this.state.mobileNumberError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._firstNameRef.focus()}
                    refName={ref => {
                        this._gymAddressRef = ref;
                    }}
                    onChangeText={this.handleMobileNumber}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomTextField lablMarginPr={true} backgroundColor={Colors.white} {...this.state} title="Password"
                    errorMsg={this.state.passwordError}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this._dobRef.onPressDate()}
                    refName={ref => {
                        this._firstNameRef = ref;
                    }}
                    onChangeText={this.handlePassword}
                // onBlur={() => {
                //   this.setState({
                //     passwordError: Validate.validatePassword(this.state.password)
                //   })
                // }}
                />
                <CustomDatePicker lablMarginPr={true} title={'D.O.B'}
                    noMaxDate = {true}
                    backgroundColor={Colors.white} getDate={this.handleDob}
                    errorMsg={this.state.dobError}
                    refName={ref => {
                        this._dobRef = ref;
                    }}
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
                    {/* <KeyboardAwareScrollView ref='scroll' contentContainerStyle={ketBordSt}    scrollEnabled={true}
enableAutomaticScroll={true}     keyboardShouldPersistTaps="handled"
resetScrollToCoords={{ x: 0, y: 0 }}
          > */}
                    <KeyboardAvoidingView style={ketBordSt} behavior="padding" >
                        <ScrollView style={scrollSt} contentContainerStyle={scrollContentSt}>
                            {!this.state.showNextView ? this.firstView() : null}
                            {this.state.showNextView ? this.secondView() : null}
                        </ScrollView>
                    </KeyboardAvoidingView>


                </ImageBackground>
            </View>
        );
    }
}
const mapStateToProps = ({ routes, sessionReducer: { user, registered } }) => ({
    routes: routes,
    user: user,
    registered: registered,
});

const mapDispatchToProps = {
    signup,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(signupScreen);
