import React, { Component } from 'react';
import { View, Dimensions, TouchableHighlight, Image, Text, TouchableOpacity, } from 'react-native';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';

import CustomButton from '../../components/Button/CustomButton';
import { Images, Colors } from '../../utils'
import { CustomButtonType } from '../../components/Button/CustomButtonStyle';
import { Actions } from 'react-native-router-flux'

//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation,
} from 'react-native-responsive-screen';

const MENU_NAME = {
    Empty: "",
    Dashboard1: 'Dashboard',
    Member: 'Member',
    Trainer: 'Trainer',
    Membership_plans: 'Membership plans',
    Visitors: 'Visitors',
    Profile: 'Profile',
    Event: 'Events',
    Logout: 'Logout',
}


const DATA = [
    {
        id: '0',
        title: MENU_NAME.Empty,
        key: '0',
    },
    {
        id: '1',
        title: MENU_NAME.Dashboard1,
        key: '1',
    },
    {
        id: '2',
        title: MENU_NAME.Member,
        key: '2',
    },
    {
        id: '3',
        title: MENU_NAME.Trainer,
        key: '3',
    },
    {
        id: '4',
        title: MENU_NAME.Membership_plans,
        key: '4',
    },
    {
        id: '5',
        title: MENU_NAME.Visitors,
        key: '5',
    },
    {
        id: '6',
        title: MENU_NAME.Profile,
        key: '6',
    },
    {
        id: '7',
        title: MENU_NAME.Event,
        key: '7',
    },
    {
        id: '8',
        title: MENU_NAME.Logout,
        key: '8',
    },

];

class CustomList1asasas extends Component {
    state = {
        selectedId: null,
    }
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }


    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    planVisitorTxtView = () => {
        return (<View > <View style={planVwSt}>
            <Text numberOfLines={1} style={textYellowSt} >Date of Visit</Text>
            <Text numberOfLines={1} style={textBlackSt} >27 Aug 2012</Text>
        </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowSt} >Date of joining</Text>
                <Text numberOfLines={1} style={textBlackSt} >27 Aug 2012</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowSt} >Tariner</Text>
                <Text numberOfLines={1} style={textBlackSt} >27 Aug 2012</Text>
            </View>
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowSt} >Type</Text>
                <Text numberOfLines={1} style={textBlackSt} >27 Aug 2012</Text>
            </View>
        </View>)
    }

    planMemberTxtView = () => {
        return (<View >
            <View style={planVwSt}>
                <Text numberOfLines={1} style={textYellowSt} >Date of Visit</Text>
                <Text numberOfLines={1} style={textBlackSt} >27 Aug 2012</Text>
            </View>
            <View style={dueValueSt}>
                <View style={dueVwSt}>
                    <Text style={textYellowSt} >Due Payment</Text>
                    <Text style={textBlackSt} >20</Text>
                </View>
            </View>
        </View>)
    }
    //Date of Visit, Date of joining,  Tariner, Type, Plan Exipry, Due Payment
    firstRowView = () => {
        return (
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={bgVwSt}>
                    <View style={borderVwSt}>
                        <View style={logoVwSt}>
                            <Image style={logoSt} source={Images.user1Img} resizeMode='contain' />
                        </View>
                        <View style={txtBtnVwSt}>
                            {/* < View style={nameValueSt}> */}
                            <Text style={textSt} >Shubam thakur </Text>
                            <Text style={textBlackSt} >984524542534</Text>
                            {/* </View> */}
                            <View style={planDueVwSt}>



                            </View>
                            <View style={allBtnVwSt}>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginRight: 2 }}>

                                    <CustomButton textAlignStylePr='center' imageIcon={Images.callImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Call' onPressPr={() => this.pushToNextScreen({ item, index })} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginRight: 2 }}>
                                    <CustomButton textAlignStylePr='center' imageIcon={Images.msgImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Msg' onPressPr={() => this.pushToNextScreen({ item, index })} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginRight: 2 }}>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginRight: 2 }}>
                                </View>
                                {/* <View style={{ flex:1, alignItems:'flex-start',marginRight: 2}}>
                                <CustomButton textAlignStylePr='center' imageIcon={Images.attendImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr='Attend' onPressPr={() => this.pushToNextScreen({ item, index })} />
                                </View>
                                <View style={{ flex:1, alignItems:'flex-start',marginRight: 2}}>
                                <CustomButton textAlignStylePr='center' imageIcon={Images.renewPackageImg} isIconWithTextLeft={true} buttonTypePr={CustomButtonType.default} buttonTitlePr={'Renew\nPackage'} onPressPr={() => this.pushToNextScreen({ item, index })} />
                                </View> */}
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        );
    };


    renderItem = ({ item, index }) => {
        this.getDrStyles()
        return (
            //  <View >
            //   { index === 0 ? this.firstRowView()  :
            //   this.allRowView({item ,index})}</View>
            <View >
                {this.firstRowView()}</View>
        );
    };

    getDrStyles() {
        const myStyle = styles(this.props);
        return { containerMainSt, textYellowSt, trash, backRightViwLeft, rowBack, backRightBtn, backRightBtnLeft, backRightBtnRight, backTextWhite, nameValueSt, borderVwSt, dueValueSt, textBlackSt, textSt, dueValueSt, btnVwSt, logoVwSt, allBtnVwSt, textVwSt, planVwSt, planDueVwSt, planVwSt, dueVwSt, bgVwSt, logoSt, txtBtnVwSt, containerSt } = myStyle;
    }

    render() {
        this.getDrStyles()
        const { bgImg, logoImg } = Images
        return (
            <View style={containerMainSt}>
                {/* <FlatList data={DATA} renderItem={this.renderItem} keyExtractor={item => item.id}
                    extraData={this.state.selectedId}
                /> */}
                <SwipeListView
                    showsVerticalScrollIndicator={false}
                    useFlatList={true}
                    data={DATA}
                    renderItem={this.renderItem}
                    renderHiddenItem={(rowData, rowMap) => (
                        <View style={rowBack}>
                            {/* <View style={backRightViwLeft}> */}
                            <TouchableOpacity
                                style={[backRightBtn, backRightBtnLeft]}
                                onPress={() => closeRow(rowMap, data.item.key)}
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
export default CustomList1asasas;

