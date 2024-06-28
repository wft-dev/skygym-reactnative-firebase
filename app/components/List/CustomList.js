import React, { Component } from 'react';
import { View, Dimensions, TouchableHighlight, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';

import CustomButton from '../../components/Button/CustomButton';
import { Images, Colors, dateTimeHelper, Constants } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'
import { deleteTrainer } from '../../actions/trainer/trainerAction';
import { deleteMember } from '../../actions/member/memberAction';
import { deleteVisitor } from '../../actions/visitor/visitorAction';
import { addAttendance } from '../../actions/attendance/attendanceAction';

import { editOn } from '../../actions/editOn/editOnAction';

import { connect } from 'react-redux';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation,
} from 'react-native-responsive-screen';
import validate from '../../utils/validate';


class CustomList extends Component {

    state = {
        selectedId: null,
        getFilterData: null,
        isImageLoaded: false,
    }

    componentDidMount() {
        this.props.onCustomRef(this);
        lor(this);
    }

    componentWillUnmount() {
        this.props.onCustomRef(undefined);
        rol();
    }

    closeRow = (rowMap, rowKey) => {
        console.log("this.state.getFilterData ", rowKey);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (rowMap, rowKey) => {
        const { isVisitor, isTrainer, isMember } = this.props
        this.closeRow(rowMap, rowKey);
        if (isVisitor) {
            this.props.deleteVisitor(rowKey.item.id)
        }
        else if (isTrainer) {
            this.props.deleteTrainer(rowKey.item)
        }
        else if (isMember) {
            this.props.deleteMember(rowKey.item)

        }
    };

    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    searchFilterFunction = (text) => {
        const { isVisitor, isTrainer, isMember } = this.props
        if (text) {
            const newData = this.props.data.filter(
                function (item) {
                    var itemData = ''
                    if (isVisitor) {
                        itemData = item.name
                            ? item.name.toUpperCase()
                            : ''.toUpperCase();
                    }
                    else if (isTrainer) {
                        itemData = item.name
                            ? item.name.toUpperCase()
                            : ''.toUpperCase();
                    }
                    else if (isMember) {
                        itemData = item.name
                            ? item.name.toUpperCase()
                            : ''.toUpperCase();
                    }

                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            this.setState({ getFilterData: newData });
        } else {
            this.setState({ getFilterData: this.props.data });
        }
    };


    searchFilterByTypeFunction = (type) => {
        const { isMember } = this.props

        if (type) {
            const newData = this.props.data.filter(
                function (item) {
                    var itemData = ''
                    var currentDate = new Date();
                    var planEndDate = new Date(item.memberShipPlan.membershipEndDate);
                    var checkInStatusData = item.attendance ? item.attendance.checkInStatus : false;
                    if (isMember) {
                        if (type == 'All Member') {
                            itemData = item
                        } else if (type == 'Expired Member') {
                            if (planEndDate > currentDate) {
                                itemData = item
                            }
                        } else if (type == 'Checkin') {
                            if (checkInStatusData === true) {
                                itemData = item
                            }

                        } else if (type == 'Checkout') {
                            if (checkInStatusData === false) {
                                itemData = item
                            }
                        }
                    }
                    return itemData;
                });
            this.setState({ getFilterData: newData });
        } else {
            this.setState({ getFilterData: this.props.data });
        }
    }

    checkInCheckOutAction = (item, index) => {
        const { isTrainer, isMember } = this.props
        var screenType = ''
        if (isMember) {
            screenType = Constants.member;
        }
        else if (isTrainer) {
            screenType = Constants.trainer;
        }
        var attendamceMarkBool = false
        if (item.attendance && item.attendance.checkInStatus == true) {
            attendamceMarkBool = false
        } else if (item.attendance && item.attendance.checkInStatus == false) {
            attendamceMarkBool = true
        } else {
            attendamceMarkBool = true
        }
        this.props.addAttendance(screenType, attendamceMarkBool, item.id)
    }

    navigateToScreens = (item, type, btnType) => {
        if (this.props.isMember) {
            if (btnType == 'Renew\nPackage') {
                Actions.MemberAdd({ selectedMemberData: item, isProfile: false, isAddNewMemberShip: false, isRenewMemberShip: true, isBecomeMember: false });
            }
            else {
                Actions.MemberDetail({ selectedMemberID: item.id, isMemberLogin: false });
            }
        }
        else if (this.props.isTrainer) {
            Actions.TrainerAdd({ selectedTrainerData: item });
        }
        else if (this.props.isVisitor) {
            if (type == 'Member') {
                Actions.MemberAdd({ selectedMemberData: item, isProfile: false, isAddNewMemberShip: false, isRenewMemberShip: false, isBecomeMember: true });
            } else {
                Actions.VisitorAdd({ selectedVisitorData: item });
            }
        }

    }

    meberShipAndEventView = (item, index) => {
        const { textYellowVisitorSt, textBlackVisitorSt,
            planDueVwSt, planVwSt, } = styles(this.props);

        return (<View style={planDueVwSt}>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Date of Visit</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >27 Aug 2012</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Date of joining</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >27 Aug 2012</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Tariner</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >JoshJosh</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Type</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >Genral</Text>
            </View>
        </View>)
    }


    planVisitorTxtView = (item, index) => {
        const { textYellowVisitorSt, textBlackVisitorSt,
            planDueVwSt, planVwSt, } = styles(this.props);

        console.log('-------planVisitorTxtView---------------', item.addedBy);
        return (<View style={planDueVwSt}>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Date of Visit</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >{item.dateOfVisit}</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Date of joining</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >{item.dateOfJoin}</Text>
            </View>

            {this.props.isVisitor && item.addedBy !== undefined ?
                <View style={planVwSt}>
                    <Text numberOfLines={1} style={textYellowVisitorSt} >Tariner</Text>
                    <Text numberOfLines={1} style={textBlackVisitorSt} >{item.trainerName}</Text>
                </View>
                : null
            }

            {this.props.isVisitor && item.addedBy !== undefined ?
                <View style={planVwSt}>
                    <Text numberOfLines={1} style={textYellowVisitorSt} >Type</Text>
                    <Text numberOfLines={1} style={textBlackVisitorSt} >{item.trainerType}</Text>
                </View>
                : null}

        </View>)
    }


    planMemberTxtView = (item, index) => {
        const { textYellowSt, textBlackSt,
            dueValueSt, planDueVwSt, planVwSt, dueVwSt, } = styles(this.props);

        return (<View style={planDueVwSt}>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowSt} >{this.props.isMember ? 'Plan Exipry' : 'Date of Visit'}</Text>
                <Text numberOfLines={1} style={textBlackSt} >{this.props.isMember ? item.memberShipPlan.membershipEndDate : ''}</Text>
            </View>
            <View style={dueValueSt}>
                <View style={dueVwSt}>
                    <Text style={textYellowSt} >Due Payment</Text>
                    <Text style={textBlackSt} >{this.props.isMember ? item.memberShipPlan.dueAmount : ''}</Text>
                </View>
            </View>
        </View>)
    }

    deatlScreenView = (item, index) => {
        const { mobileTextBlackSt,
            textSt,
            planDueVwSt, planVwSt, } = styles(this.props);

        console.log('-------planMemberTxtView---------------');
        return (<View style={planDueVwSt}>
            <View style={planVwSt}>
                <Text style={textSt} >{item.name}</Text>
                <Text style={mobileTextBlackSt} >{item.phoneNo}</Text>
            </View>
            {this.props.isTrainer || this.props.isVisitor ? this.showTrainerType(item, index) : null}

        </View>)
    }

    showTrainerType = (item, index) => {
        const { mainTarinerViewSt, tarinerViewSt, tarinerValueSt, } = styles(this.props);

        return (<View style={mainTarinerViewSt}>
            <TouchableHighlight
                onPress={() => this.navigateToScreens(item, this.props.isTrainer ? item.trainerType : 'Member')}
                underlayColor={Colors.white}
            >
                <View style={tarinerViewSt}>
                    <Text style={tarinerValueSt} >{this.props.isTrainer ? item.trainerType : 'Member'}</Text>
                </View>
            </TouchableHighlight>
            {this.props.isVisitor ? this.showVisitorCount(item, index) : null}
        </View>)
    }

    showVisitorCount = (item, index) => {
        const { visitorCountValueSt } = styles(this.props);

        return (<View >
            {this.props.isVisitor ? <Text style={visitorCountValueSt} >{'Visitor : ' + item.numberOfVisit}</Text> : null}
        </View>)
    }

    trainerScreen = (item, index) => {
        const { memberCountValueSt, memberTrainerViewSt, memberViewSt, memberValueSt, memberCountViewSt, textYellowVisitorSt, textBlackVisitorSt,
            planDueVwSt, planVwSt, } = styles(this.props);

        return (<View style={planDueVwSt}>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Date of joining</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >{item.dateOfJoin}</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowVisitorSt} >Salary</Text>
                <Text numberOfLines={1} style={textBlackVisitorSt} >{item.salary}</Text>
            </View>
            <View style={memberTrainerViewSt}>

                <View style={memberViewSt}>
                    <Text style={memberValueSt} >Member</Text>
                    <View style={memberCountViewSt}>
                        <Text style={memberCountValueSt} >{item.memberCount}</Text>
                    </View>
                </View>

            </View>
        </View>)
    }

    buttonView = (item, index) => {
        const { btnVwSt, allBtnVwSt, } = styles(this.props);

        return (<View style={allBtnVwSt}>

            <View style={btnVwSt}>
                <CustomButton textAlignStylePr='center' imageIcon={Images.callImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Call' onPressPr={() => this.pushToNextScreen({ item, index })} />
            </View>
            <View style={{ flex: this.props.isMember || this.props.isTrainer ? 1 : 0.5, alignItems: 'flex-start', marginRight: 2 }}>
                <CustomButton textAlignStylePr='center' imageIcon={Images.msgImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Msg' onPressPr={() => this.pushToNextScreen({ item, index })} />
            </View>
            <View style={btnVwSt}>
                {this.props.isMember || this.props.isTrainer ? <CustomButton textAlignStylePr='center' imageIcon={item.attendance && item.attendance.checkInStatus === true ? Images.attendYellowImg : Images.attendImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Attend' onPressPr={() => this.checkInCheckOutAction(item, index)} /> : null}
            </View>
            <View style={btnVwSt}>
                {this.props.isMember ? <CustomButton textAlignStylePr='center' imageIcon={Images.renewPackageImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr={'Renew\nPackage'} onPressPr={() => this.navigateToScreens(item, index, 'Renew\nPackage')} /> : null}
            </View>
        </View>)
    }

    //Date of Visit, Date of joining,  Tariner, Type, Plan Exipry, Due Payment
    showVisitorTainerMemberView = (item, index) => {
        const { borderVwSt,
            logoVwSt, bgVwSt, logoSt, txtBtnVwSt, loaderContainer } = styles(this.props);

        return (

            <View style={bgVwSt}>
                <View style={borderVwSt}>
                    <View style={logoVwSt}>
                        {!this.state.isImageLoaded ?
                            <View style={loaderContainer}>
                                <ActivityIndicator color={Colors.black} />
                            </View> : null}
                        <Image style={logoSt}
                            source={item.imageUrl ? { uri: item.imageUrl } : Images.user1Img}
                            resizeMode={item.imageUrl ? 'stretch' : 'contain'}
                            onLoadEnd={() => this.setState({ isImageLoaded: true })} />
                    </View>
                    <View style={txtBtnVwSt}>
                        {/* < View style={nameValueSt}> */}
                        {this.deatlScreenView(item, index)}
                        {/* </View> */}
                        {this.props.isMember ? this.planMemberTxtView(item, index) : null}
                        {this.props.isVisitor ? this.planVisitorTxtView(item, index) : null}
                        {this.props.isTrainer ? this.trainerScreen(item, index) : null}
                        {this.buttonView(item, index)}
                    </View>

                </View>
            </View>
        );
    };


    renderItem = ({ item, index }) => {


        return (
            //  <View >
            //   { index === 0 ? this.firstRowView()  :
            //   this.allRowView({item ,index})}</View>
            <TouchableHighlight
                onPress={() => this.navigateToScreens(item)}
                underlayColor={Colors.white}
            >
                <View >
                    {this.props.isEvent || this.props.isMemberShip ? this.meberShipAndEventView(item, index) : this.showVisitorTainerMemberView(item, index)}
                </View>
            </TouchableHighlight>

        );
    };



    render() {
        const { containerMainSt, trash, rowBack, backRightBtn, backRightBtnLeft } = styles(this.props);

        console.log('-------firstRowView---------------', this.props.data);

        const { bgImg, logoImg } = Images

        return (

            <View style={containerMainSt}>
                {/* <FlatList data={DATA} renderItem={this.renderItem} keyExtractor={item => item.id}
                    extraData={this.state.selectedId}
                /> */}
                <SwipeListView
                    showsVerticalScrollIndicator={false}
                    useFlatList={true}
                    data={this.state.getFilterData ? this.state.getFilterData : this.props.data}
                    renderItem={this.renderItem}
                    renderHiddenItem={(rowData, rowMap) => (
                        <View style={rowBack}>
                            {/* <View style={backRightViwLeft}> */}
                            <TouchableOpacity
                                style={[backRightBtn, backRightBtnLeft]}
                                onPress={() => this.deleteRow(rowMap, rowData)}
                            >

                                <Image
                                    source={Images.deleteImg}
                                    style={trash}
                                    tintColor='white'
                                />
                            </TouchableOpacity>
                            {/* </View> */}
                        </View>
                    )}
                    disableRightSwipe={true}
                    disableLeftSwipe={!this.props.isSwipeDeleteRow}
                    rightOpenValue={-175}
                    recalculateHiddenLayout={true}
                // previewRowKey={'0'}
                // previewOpenValue={-10}
                // previewOpenDelay={3000}
                // onRowOpen={(rowKey, rowMap) => {
                //     setTimeout(() => {
                //         rowMap[rowKey].closeRow()
                //     }, 2000)
                // }}

                />
            </View>
        );
    }
}

CustomList.defaultProps = {
    isMember: false,
    isEvent: false,
    isVisitor: false,
    isTrainer: false,
    isMemberShip: false,
    isSwipeDeleteRow: false,
    data: null,
};

const mapStateToProps = ({ sessionReducer: { user }, }) => ({
    user: user,
});

const mapDispatchToProps = {
    deleteTrainer,
    deleteMember,
    deleteVisitor,
    editOn,
    addAttendance
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomList);