import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { Constants, Colors, Images } from '../../utils'
import textFontStyles from '../TextFontStyle';
import CustomButton from '../Button/CustomButton'
import { CustomButtonType } from '../Button/CustomButtonStyle'

const FilterDATA = [
    {
        id: '0',
        title: 'All Member',
        key: '0',
    },
    {
        id: '1',
        title: 'Expired Member',
        key: '1',
    },
    {
        id: '2',
        title: 'Checkin',
        key: '2',
    },
    {
        id: '3',
        title: 'Checkout',
        key: '3',
    },

];

const PopUpDATA = [
    {
        id: '0',
        title: 'Renew Current Membership',
        key: '0',
    },
    {
        id: '1',
        title: 'Delete Membership',
        key: '1',
    },


];

class CustomFilterModel extends Component {
    state = {
        modalVisible: true,
        selectedId: null,
        selectedFilterText: '',
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();

    }

    popUpAction = (item, index) => {
        const { renewPress, deletePress, modelClosePr } = this.props

        if (index === 0) {
            renewPress(this)
        }
        else if (index === 1) {
            deletePress(this)
        }
        modelClosePr(this)

    }


    popUpFilterAction = (item, index) => {
        this.setState({ selectedId: index })
        this.setState({ selectedFilterText: item })
    }

    renderFilterItem = ({ item, index }) => {
        const { textStyle, btnStyle, listViewStyle } = styles;
        const selectedImage = index === this.state.selectedId ? Images.selelecteImg : Images.circleImg;

        return (
            <TouchableHighlight underlayColor={Colors.white} onPress={() => this.popUpFilterAction(item, index)}>
                <View style={listViewStyle}>
                    <Image style={btnStyle} source={selectedImage} resizeMode="contain" />
                    <Text style={textStyle}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    renderPopupItem = ({ item, index }) => {
        const { poptextViewSt, popUptextStyle } = styles;
        if (this.props.isPurcahseList === true && index === 0) {
            return;
        }
        return (
            <TouchableHighlight underlayColor={Colors.white} onPress={() => this.popUpAction(item, index)}>
                <View style={poptextViewSt}>
                    <Text style={popUptextStyle}>{item.title}</Text>
                </View>
            </TouchableHighlight>)

    };

    showFilterPopup = () => {
        const { modelClosePr } = this.props;
        const { container, modalBackgroundStyle, innerContainerTransparentStyle
            , filterTextStyle, cancelBtnStyle, cancelBtnViewStyle, applyBtSt } = styles;
        return (<Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
            onOrientationChange={getOrientation()}
        >
            <View style={[container, modalBackgroundStyle]}>
                <View style={innerContainerTransparentStyle}>
                    <View style={cancelBtnViewStyle}>
                        <TouchableOpacity onPress={modelClosePr}>
                            <View >
                                <Image style={cancelBtnStyle} source={Images.crossImg} resizeMode="contain" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={filterTextStyle} >FILTER</Text>
                    <View >
                        <FlatList data={FilterDATA} renderItem={this.renderFilterItem} keyExtractor={item => item.id}
                            extraData={this.state.selectedId}
                        />
                    </View>
                    <View style={applyBtSt}>
                        <CustomButton
                            letterSpacingPr={true}
                            buttonTypePr={CustomButtonType.dark}
                            buttonTitlePr="APPLY"
                            onPressPr={() => modelClosePr(this.state.selectedFilterText)} />
                    </View>
                </View>
            </View>
        </Modal>)
    }

    showPopUp = () => {
        const { modelClosePr } = this.props;
        const { popUpModalBackgroundStyle, popUpcontainer, popUpinnerContainerTransparentStyle } = styles;
        return (<Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
            onOrientationChange={getOrientation()}
        >
            <TouchableOpacity style={{ flex: 1 }} onPress={modelClosePr}>
                <View style={[popUpcontainer, popUpModalBackgroundStyle]}>
                    <View style={popUpinnerContainerTransparentStyle}>

                        <FlatList data={PopUpDATA} renderItem={this.renderPopupItem} keyExtractor={item => item.id}
                            extraData={this.state.selectedId}
                        />

                    </View>
                </View>
            </TouchableOpacity>
        </Modal>)
    }

    render() {

        const { isShowPopUp } = this.props;
        return (<View>
            {isShowPopUp ? this.showPopUp() : this.showFilterPopup()}
        </View>
        );
    }
}
export default CustomFilterModel;

CustomFilterModel.defaultProps = {
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
    radioBtnStyle: {
        height: getOrientation() === "portrait" ? hp('15%') : wp('15%'),
        width: getOrientation() === "portrait" ? wp('15%') : hp('15%'),
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
        paddingBottom: getOrientation() === "portrait" ? '20%' : '2%',
    },
    filterTextStyle: {
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
    listViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: getOrientation() === "portrait" ? hp('1.4%') : wp('1.8%'),
        marginBottom: getOrientation() === "portrait" ? '5%' : '2%',
        paddingHorizontal: getOrientation() === "portrait" ? '5%' : '3%',

    },
    textStyle: {
        ...textFontStyles.mediumTextMedium,
        padding: 8,
    },
    applyBtSt: {
        height: 40,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: getOrientation() === "portrait" ? '10%' : '8%',
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

});