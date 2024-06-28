import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation, widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images, Colors } from '../../utils';
import textFontStyles from '../TextFontStyle';

class RadioButton extends Component {
    state = {
        radioBtnsData: ['General', 'Personal'],
        checked: 0
    }
    componentDidMount() {
        this.setState({ checked: this.props.setValue === 'General' || this.props.setValue === undefined || this.props.setValue === '' ? 0 : 1 })
    }

    selectedBtnName = (key) => {
        if (this.props.isEdit === false) {
            this.setState({ checked: key }, () => {

                this.props.radioBtnName(this.state.radioBtnsData[key])

            })
        }
    }

    render() {
        return (<View style={styles.mainView}>
            <Text style={styles.textStyle}>{'Type'}</Text>
            <View style={styles.mainbtn}>
                <View style={styles.btnViewSt}>
                    <TouchableOpacity style={styles.touchViewSt} onPress={() => { this.selectedBtnName(0) }} >
                        <Image style={styles.img} source={this.state.checked === 0 ? Images.selelecteImg : Images.nonSelecteImg} />
                        <Text style={styles.textStyle}>{this.state.radioBtnsData[0]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnViewSt}>
                    <TouchableOpacity onPress={() => { this.selectedBtnName(1) }} style={styles.touchViewSt}>
                        <Image style={styles.img} source={this.state.checked === 1 ? Images.selelecteImg : Images.nonSelecteImg} />
                        <Text style={styles.textStyle}>{this.state.radioBtnsData[1]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        )
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        //alignItems: 'center',
        marginTop: 14,
        marginHorizontal: 1,
    },
    img: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    mainbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 6,

    },
    btnViewSt: {
        //  padding: 10,
        // flex: 1, 
        flexDirection: 'row',
        marginRight: 10,
    },
    touchViewSt: {
        alignItems: 'center',

        flexDirection: 'row',
    },
    textStyle: {
        ...textFontStyles.mediumTextMedium,
        color: Colors.black,
    }
});

export default RadioButton;