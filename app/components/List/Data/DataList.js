import React, { Component } from 'react';
import { View, Dimensions, TouchableHighlight, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Images, Colors, dateTimeHelper, Strings } from '../../../utils'
import { Actions } from 'react-native-router-flux'
import { deleteEvent } from '../../../actions/eventAdd/eventAddAction';
import { deleteMemberShip } from '../../../actions/memberShip/memberShipAction';

import { editOn } from '../../../actions/editOn/editOnAction';

import { connect } from 'react-redux';

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation,
} from 'react-native-responsive-screen';


class DataList extends Component {

    state = {
        selectedId: null,
        getFilterData: null,
    }

    componentDidMount() {
        lor(this);
        this.props.onRef(this);
    }

    componentWillUnmount() {
        rol();
        this.props.onRef(undefined);
    }

    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    goToNextScreen = (item) => {
        const { isMemberShipList, isEvent, isPurchaseMemberShipList } = this.props
        if (isMemberShipList) {
            Actions.MembershipAdd({ selectedMembershipData: item });
        }
        else if (isEvent) {
            Actions.Event({ selectedEventData: item });
        }
        else if (isPurchaseMemberShipList) {
            Actions.MemberShipDetail({ selectedMemberID: item.idMember, selectedMemberShipID: item.docId, isPurcahseList: true });

        }
        return
    }

    showDataNotFoundMessage = () => {
        const { isMemberShipList, isEvent, isPurchaseMemberShipList } = this.props
        var text = ''
        var message = ''
        if (isMemberShipList) {
            text = Strings.noDataFound.membershipTilte
        }
        else if (isEvent) {
            text = Strings.noDataFound.eventTilte
        }
        else if (isPurchaseMemberShipList) {
            text = Strings.noDataFound.purcahse
            message = Strings.noDataFound.startAdding + text + Strings.noDataFound.clickAddNewMembership
        }

        var title = Strings.noDataFound.no + text + Strings.noDataFound.found
        message = message === '' ? Strings.noDataFound.startAdding + text + Strings.noDataFound.clickBottomPlusIcon : message

        // return (
        //     <CustomNoDataFoundView  title = {title} message= {message}/>
        // )
    }

    closeRow = (rowMap, rowKey) => {
        console.log("this.state.getFilterData ", rowKey);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (rowMap, rowKey) => {
        const { isMemberShipList, isEvent } = this.props
        this.closeRow(rowMap, rowKey);
        if (isMemberShipList) {
            this.props.deleteMemberShip(rowKey)
        }
        else if (isEvent) {
            this.props.deleteEvent(rowKey)
        }
    };

    searchFilterFunction = (text) => {
        const { isMemberShipList, isEvent } = this.props
        if (text) {
            const newData = this.props.data.filter(
                function (item) {
                    var itemData = ''
                    if (isMemberShipList) {
                        itemData = item.membershipTitle
                            ? item.membershipTitle.toUpperCase()
                            : ''.toUpperCase();
                    }
                    else if (isEvent) {
                        itemData = item.eventName
                            ? item.eventName.toUpperCase()
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

    meberShipAndEventView = (item, index) => {

        console.log('-------item---------------', item);

        const { nameVwSt, evenVwSt, eventDateTimeVwSt, addressTextBlackSt, timeTextBlackSt, tarinerViewSt, tarinerValueSt, nameAddressVwSt, textYellowSt, borderVwSt, textSt, bgVwSt, } = styles(this.props);

        return (

            <View style={bgVwSt}>
                <View style={borderVwSt}>
                    <View style={nameAddressVwSt}>
                        <View style={nameVwSt}>
                            <Text style={textSt} >{this.props.isMemberShipList === true ? item.membershipTitle : item.eventName}</Text>
                            <Text style={addressTextBlackSt} >{this.props.isMemberShipList === true ? item.membershipDetails : item.eventAddress}</Text>
                        </View>
                        <View style={tarinerViewSt}>
                            <Text numberOfLines={1} style={tarinerValueSt} >{this.props.isMemberShipList === true ? '₹' + item.membershipAmount : item.eventDate}</Text>
                        </View>
                    </View>
                    {this.props.isEvent ? <View style={eventDateTimeVwSt}>
                        <View style={evenVwSt}>
                            {/* <Text numberOfLines={1} style={textYellowSt} >{this.props.isMemberShipList ? 'Start Date' : 'Event Start Time'}</Text>
                            <Text numberOfLines={1} style={timeTextBlackSt} >{this.props.isMemberShipList ? item.membershipStartDate : item.eventStartTime}</Text> */}
                            <Text numberOfLines={1} style={textYellowSt} >{this.props.isEvent ? 'Event Start Time' : ''}</Text>
                            <Text numberOfLines={1} style={timeTextBlackSt} >{this.props.isEvent ? item.eventStartTime : ''}</Text>
                        </View>
                        <View style={evenVwSt}>
                            {/* <Text numberOfLines={1} style={textYellowSt} >{this.props.isMemberShipList ? 'End Date' : 'Event End Time'}</Text>
                            <Text numberOfLines={1} style={timeTextBlackSt} >{this.props.isMemberShipList ? item.membershipEndDate : item.eventEndTime}</Text> */}
                            <Text numberOfLines={1} style={textYellowSt} >{this.props.isEvent ? 'Event End Time' : ''}</Text>
                            <Text numberOfLines={1} style={timeTextBlackSt} >{this.props.isEvent ? item.eventEndTime : ''}</Text>
                        </View>
                    </View> : null}
                </View>
            </View>
        )
    }


    purchaseMemberShipListView = (item, index) => {
        const { greenTextValueSt, greenTextViewSt, detailMSPMainView, detailMSPLeftView, detailMSPRightView, borderVwSt, textBlackSt, bgVwSt, } = styles(this.props);
        console.log('----------purchaseMemberShipListView', item);
        var activeStatus = ''
        if (item.currentPlanStatus === 'Active') {
            activeStatus = item.currentPlanStatus

        }
        else {
            activeStatus = item.planStatus
        }

        //  var getCreatedDate = dateTimeHelper.getDate(item.purchaseUpdateDate.toDate())
        var getCreatedDate = dateTimeHelper.getDate(item.purchaseUpdateDate)
        return (
            <View style={bgVwSt}>
                <View style={borderVwSt}>
                    <View style={greenTextViewSt}>
                        <Text style={greenTextValueSt} >{activeStatus}</Text>
                    </View>
                    <View style={detailMSPMainView}>
                        <View style={detailMSPLeftView}>
                            <Text style={textBlackSt} >{'Membership'}</Text>
                            <Text style={textBlackSt} >{'Exipry date'}</Text>
                            <Text style={textBlackSt} >{'Amount'}</Text>
                            <Text style={textBlackSt} >{'Due Amount'}</Text>
                            <Text style={textBlackSt} >{'Paid Amount'}</Text>
                            <Text style={textBlackSt} >{'Purchase date'}</Text>
                        </View>
                        <View style={detailMSPRightView}>
                            <Text style={textBlackSt} >{item.membershipTitle}</Text>
                            <Text style={textBlackSt} >{item.membershipEndDate}</Text>
                            <Text style={textBlackSt} >{item.membershipAmount}</Text>
                            <Text style={textBlackSt} >{item.dueAmount}</Text>
                            <Text style={textBlackSt} >{item.totalAmount}</Text>
                            <Text style={textBlackSt} >{getCreatedDate}</Text>
                        </View>
                    </View>
                </View>
                {/* </View> */}
            </View>
        )
    }

    memberShipDetailListView = (item, index) => {
        const { detailMSPMainView, detailMSPLeftView, detailMSPRightView, borderVwSt, textBlackSt, bgVwSt } = styles(this.props);

        console.log('---memberShipDetailListView-', index);
        return (
            <View style={bgVwSt}>
                <View style={borderVwSt}>

                    <View style={detailMSPMainView}>
                        <View style={detailMSPLeftView}>
                            {index === 0 && <View>
                                <Text style={textBlackSt} >{'Payment Staus'}</Text>
                                <Text style={textBlackSt} >{'Membership date'}</Text></View>}
                            {index === 1 && <View>
                                <Text style={textBlackSt} >{'Due Amount'}</Text>
                                <Text style={textBlackSt} >{'Amount'}</Text></View>}
                            {index === 2 && <View>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Purchase date'}</Text></View>}
                            {index === 3 && <View>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Paid Amount'}</Text>
                                <Text style={textBlackSt} >{'Purchase date'}</Text></View>}
                            {index === 4 && <View>
                                <Text style={textBlackSt} >{'Due Amount'}</Text>
                                <Text style={textBlackSt} >{'Amount'}</Text></View>}
                        </View>
                        <View style={detailMSPRightView}>
                            {index === 0 && <View>
                                <Text style={textBlackSt} >{'2 month'}</Text>
                                <Text style={textBlackSt} >{'2 sep 2020'}</Text></View>}
                            {index === 1 && <View>
                                <Text style={textBlackSt} >{'2 sep 2020'}</Text>
                                <Text style={textBlackSt} >{''}</Text></View>}
                            {index === 2 && <View>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'2 sep 2020'}</Text></View>}
                            {index === 3 && <View>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'0'}</Text>
                                <Text style={textBlackSt} >{'2 sep 2020'}</Text></View>}
                            {index === 4 && <View>
                                <Text style={textBlackSt} >{'Due Amount'}</Text>
                                <Text style={textBlackSt} >{'Amount'}</Text></View>}
                        </View>
                    </View>
                </View>
                {/* </View> */}
            </View>
        )
    }

    renderItem = ({ item, index }) => {

        return (
            <TouchableHighlight underlayColor={Colors.white} onPress={() => this.goToNextScreen(item)}>
                <View >
                    {this.props.isMemberShipList ? this.meberShipAndEventView(item, index) : null}
                    {this.props.isMemberShipDetail ? this.memberShipDetailListView() : null}
                    {this.props.isPurchaseMemberShipList ? this.purchaseMemberShipListView(item, index) : null}
                    {this.props.isEvent ? this.meberShipAndEventView(item, index) : null}
                </View>
            </TouchableHighlight>
        );
    };



    render() {
        const { containerMainSt, trash, rowBack, backRightBtn, backRightBtnLeft, } = styles(this.props);
        const { bgImg, logoImg } = Images
        return (
            <View style={containerMainSt}>
                {/* <FlatList data={DATA} renderItem={this.renderItem} keyExtractor={item => item.id}
                    extraData={this.state.selectedId}
                /> */}
                {this.props.data && this.props.data.length > 0 ?
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
                                    onPress={() => this.deleteRow(rowMap, rowData.item.id)}
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
                    : this.showDataNotFoundMessage()}
            </View>
        );
    }
}

DataList.defaultProps = {
    isEvent: false,
    isMemberShipList: false,
    isPurchaseMemberShipList: false,
    isMemberShipDetail: false,
    isSwipeDeleteRow: false,
    data: null,

};


const mapDispatchToProps = {
    deleteEvent,
    deleteMemberShip,
    editOn
};

export default connect(
    null,
    mapDispatchToProps
)(DataList);