import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Image, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { Constants, Colors, Images, Strings, Validate } from '../../utils'
import textFontStyles from '../TextFontStyle';
import CustomButton from '../Button/CustomButton'
import { CustomButtonType } from '../Button/CustomButtonStyle'
import CustomTextField from '../TextFiled/CustomTextField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { changePassword } from '../../actions/session/sessionAction';
import { connect } from 'react-redux';

class CustomChangePassword extends Component {
    state = {
        modalVisible: true,
        fields: {
            [Strings.onboarding.changePassword.currentPassword]: '123456789',
            [Strings.onboarding.changePassword.newPassword]: '123456789',
            [Strings.onboarding.changePassword.confirmPassword]: '123456789',
        },
        errors: {},
        profileImageUri: '',
        orientation: getOrientation(),
    };


    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e;
        let errors = this.state.errors;
        errors[field] = ''
        // errors[field] = Validate.validateEmail(e);
        this.setState({ fields, errors });
        // if (!errors[field]) {
        //   errors[field] = '';
        //   this.setState({errors});

        // }
    }

    handleValidation() {
        let formIsValid = true;
        Object.entries(this.state.fields).forEach(([key, value]) => {
            let text = value
            let textKey = key
            let errors = this.state.errors;
            errors[key] = '';
            this.setState({ errors });
            Object.entries(this.state.errors).filter(([key, value]) => key === textKey).map(([key]) => {
                let errorTxt = '';
                if (key === Strings.onboarding.changePassword.confirmPassword) {
                    errorTxt = Validate.validateConfirmPassword(key, this.state.fields[Strings.onboarding.changePassword.newPassword], text);
                } else {
                    errorTxt = Validate.validateConfirmPassword(key, '', text);
                }

                let errors = this.state.errors;
                errors[key] = errorTxt;
                if (errors[key]) {
                    formIsValid = false;
                }
                this.setState({ errors });
            })
        });
        return formIsValid;
    }


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    addBtnAction = () => {
        if (this.handleValidation()) {
            this.props.changePassword(this.props.type, this.props.id, this.props.userEmailId,
                this.state.fields[Strings.onboarding.changePassword.currentPassword], this.state.fields[Strings.onboarding.changePassword.newPassword])
            this.props.modelClosePr(this)
        } else {
            console.warn('validation Failded')

        }
    }

    showChangePasswordView = () => {
        const { modelClosePr } = this.props;
        const { container, modalBackgroundStyle, innerContainerTransparentStyle
            , changePasswordTextStyle, cancelBtnStyle, textViewStyle, scrollContentSt, cancelBtnViewStyle, addBtSt } = styles;
        return (<Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
            onOrientationChange={getOrientation()}>
            <View style={[container, modalBackgroundStyle]}>
                <View style={innerContainerTransparentStyle}>
                    <KeyboardAwareScrollView keyboardOpeningTime={0} enableResetScrollToCoords={false} showsVerticalScrollIndicator={false} contentContainerStyle={scrollContentSt}
                        enableAutomaticScroll={true} keyboardShouldPersistTaps="handled">
                        <View style={cancelBtnViewStyle}>
                            <TouchableOpacity onPress={modelClosePr}>
                                <View >
                                    <Image style={cancelBtnStyle} source={Images.crossImg} resizeMode="contain" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={changePasswordTextStyle} >Change Password</Text>
                        <View style={textViewStyle}>

                            <CustomTextField isEdit={this.props.isEditBool} {...this.state} title={Strings.onboarding.changePassword.currentPassword}
                                value={this.state.fields[Strings.onboarding.changePassword.currentPassword]}
                                errorMsg={this.state.errors[Strings.onboarding.changePassword.currentPassword]}
                                returnKeyType={"next"}
                                refName={ref => {
                                    this[Strings.onboarding.changePassword.currentPassword] = ref;
                                }}
                                onSubmitEditing={() => this[Strings.onboarding.changePassword.newPassword].focus()}
                                onChangeText={(text) => this.handleChange([Strings.onboarding.changePassword.currentPassword], text)}
                            // onBlur={() => {
                            //   this.setState({
                            //     ...this.state.errors,
                            //     [Strings.onboarding.profile.gymName]: Validate.validateEmail(this.state.fields[Strings.onboarding.profile.gymName])
                            //   })
                            // }}
                            // blurOnSubmit={false}
                            />
                            <CustomTextField isEdit={this.props.isEditBool} {...this.state} title={Strings.onboarding.changePassword.newPassword}
                                value={this.state.fields[Strings.onboarding.changePassword.newPassword]}
                                errorMsg={this.state.errors[Strings.onboarding.changePassword.newPassword]}
                                returnKeyType={"next"}
                                refName={ref => {
                                    this[Strings.onboarding.changePassword.newPassword] = ref;
                                }}
                                onSubmitEditing={() => this[Strings.onboarding.changePassword.confirmPassword].focus()}
                                onChangeText={(text) => this.handleChange([Strings.onboarding.changePassword.newPassword], text)}
                            // onBlur={() => {
                            //   this.setState({
                            //     ...this.state.errors,
                            //     [Strings.onboarding.profile.gymName]: Validate.validateEmail(this.state.fields[Strings.onboarding.profile.gymName])
                            //   })
                            // }}
                            // blurOnSubmit={false}
                            />
                            <CustomTextField isEdit={this.props.isEditBool} {...this.state} title={Strings.onboarding.changePassword.confirmPassword}
                                value={this.state.fields[Strings.onboarding.changePassword.confirmPassword]}
                                errorMsg={this.state.errors[Strings.onboarding.changePassword.confirmPassword]}
                                returnKeyType={"next"}
                                refName={ref => {
                                    this[Strings.onboarding.changePassword.confirmPassword] = ref;
                                }}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(text) => this.handleChange(Strings.onboarding.changePassword.confirmPassword, text)}
                            // onBlur={() => {
                            //   this.setState({
                            //     ...this.state.errors,
                            //     [Strings.onboarding.profile.gymName]: Validate.validateEmail(this.state.fields[Strings.onboarding.profile.gymName])
                            //   })
                            // }}
                            // blurOnSubmit={false}
                            />
                            <View style={addBtSt}>
                                <CustomButton
                                    letterSpacingPr={true}
                                    buttonTypePr={CustomButtonType.dark}
                                    buttonTitlePr="ADD"
                                    onPressPr={this.addBtnAction} />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                </View>
            </View>
        </Modal>)
    }



    render() {

        const { isShowPopUp } = this.props;
        return (<View>
            {this.showChangePasswordView()}
        </View>
        );
    }
}
const mapStateToProps = ({ routes, sessionReducer: { user, }, editOnReducer: { isEdit, isAdd } }) => ({
    routes: routes,
    user: user,
    isEditBool: isEdit,
    isAddBool: isAdd
});

const mapDispatchToProps = {
    changePassword
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomChangePassword);

CustomChangePassword.defaultProps = {
    isShowPopUp: false,
    isShowFilterPopUp: false,

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        paddingHorizontal: getOrientation() === "portrait" ? '10%' : '3%',
        // paddingVertical: getOrientation() ==="portrait" ?  '5%' : '2%',
    },
    whiteBgVwStyle: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: getOrientation() === "portrait" ? hp('1.5%') : wp('1.8%'),
        padding: getOrientation() === "portrait" ? '170%' : '3%',
    },
    cancelBtnStyle: {
        height: getOrientation() === "portrait" ? hp('4%') : wp('4%'),
        width: getOrientation() === "portrait" ? wp('4%') : hp('4%'),
    },
    cancelBtnViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: getOrientation() === "portrait" ? hp('4%') : wp('4%'),
    },

    modalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    innerContainerTransparentStyle: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.4%'),
        backgroundColor: '#fff',
        paddingHorizontal: getOrientation() === "portrait" ? '5%' : '3%',
        paddingTop: getOrientation() === "portrait" ? '2%' : '2%',
        paddingBottom: getOrientation() === "portrait" ? '10%' : '10%',
    },
    changePasswordTextStyle: {
        ...textFontStyles.bigTextFont,
        textAlign: 'center',
        marginTop: getOrientation() === "portrait" ? '5%' : '3%',
        marginBottom: getOrientation() === "portrait" ? '6%' : '3%',
    },
    btnTextStyle: {
        ...textFontStyles.smallTextMedium,
    },
    btnBgStyle: {
        ...textFontStyles.smallTextMedium,
    },
    btnStyle: {
        height: getOrientation() === "portrait" ? hp('4%') : wp('6%'),
        width: getOrientation() === "portrait" ? wp('4%') : hp('6%'),
        margin: 8
    },
    textViewStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: getOrientation() === "portrait" ? '5%' : '2%',
        paddingHorizontal: getOrientation() === "portrait" ? '5%' : '3%',
    },
    textStyle: {
        ...textFontStyles.mediumTextMedium,
        padding: 8,
    },
    addBtSt: {
        height: 40,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: getOrientation() === "portrait" ? '10%' : '8%',
        marginBottom: getOrientation() === "portrait" ? '10%' : '8%',
        //padding: getOrientation() === "portrait" ? hp('8%') : wp('8%'),
    },
    poptextViewSt: {
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        paddingTop: getOrientation() === "portrait" ? '2%' : '2%',
        paddingBottom: getOrientation() === "portrait" ? '1%' : '2%',
    },
    popUpcontainer: {
        flex: 1,
        // justifyContent: '',
        //flexDirection: 'column',
        // alignItems: 'flex-end',
        backgroundColor: '#ecf0f1',
        paddingLeft: getOrientation() === "portrait" ? '30%' : '3%',
        // paddingVertical: getOrientation() ==="portrait" ?  '5%' : '2%',
    },
    popUpinnerContainerTransparentStyle: {
        marginTop: Constants.statusBarHeight + 20,
        // width: getOrientation() === "portrait" ? wp('4%') : hp('6%'),
        backgroundColor: '#fff',
        //paddingHorizontal: getOrientation() === "portrait" ? '5%' : '3%',

    },
    popUptextStyle: {
        ...textFontStyles.mediumTextMedium,
        padding: 10,
        textAlign: 'center',
    },
    popUpModalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    scrollContentSt: {
        flexGrow: 1,
        //  paddingVertical:'100%',
    },

});