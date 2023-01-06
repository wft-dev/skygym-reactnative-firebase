
import React, { Component } from 'react';
import  strings  from './strings';

class ValidateClass extends Component {

    // validateInput
    validateInput = (text, textType) => {
        if (!text && typeof(text) !== 'boolean') {
            return `Please Enter ${textType}`
        }
        return ''
    }

    // validateIDProof
    validateIDProof = (text) => {
        if (!text ||  text === "No File") {
            return `Please upload id proof`
        }
        return ''
    }

    // validateEmail
    validateEmail = (email) => {
        if (!email) {
            return 'Please Enter Email'
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            return 'Email is Not valid'
        }
        return ''
    }

    // validateAge
    validateAge = (age) => {
        var today = new Date();
        var birthDate = new Date(age);
        var ageValue = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            ageValue--;
        }
        if (ageValue < 18) {
            return 'You are not eligable'
        } else {
            if (!age) {
                return 'Please Enter DOB'
            }
            return ''
        }
    }

    // validatePassword
    validatePassword = (password) => {
        console.log('password', password);
        if (!password) {
            console.log('password.trim()', password);
            return 'Please Enter Password'
        }
        if (password.length <= 8) {
            console.log('(password.length', password);
            return 'Password need to be at least 8 digits.'
        }
        if (/[a-zA-Z]/.test(password)) {
            console.log('password', password);
            return 'Password need to contain letters.'
        }
        return ''
    }

    // validateConfirmPassword
    validateConfirmPassword = (textType, newPassword, password) => {
        console.log('password', password);
        if (!password) {
            console.log('password.trim()', password);
            return `Please Enter ${textType}`
        }
        if (password.length <= 8) {
            console.log('(password.length', password);
            return 'Password need to be at least 8 digits.'
        }
        if (textType == strings.onboarding.changePassword.confirmPassword && newPassword != password) {
            console.log('(password.length', password);
            return 'Confirm Password is not match.'
        }
        if (/[a-zA-Z]/.test(password)) {
            console.log('password', password);
            return 'Password need to contain letters.'
        }
        return ''
    }

}

const validate = new ValidateClass();
export default validate;
