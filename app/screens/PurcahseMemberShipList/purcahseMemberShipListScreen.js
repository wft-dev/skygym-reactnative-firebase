import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import MainListScreen from '../MainList/MainListScreen';

import { getPurchaseMemberShip } from '../../actions/member/memberAction';
import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class purchaseMemberShipListScreen extends Component {

    componentDidMount() {
        this.props.getPurchaseMemberShip(this.props.selectedMemberID)
        lor(this);
    }

    render() {
        const {
            containerMainSt, navGrayBarSt, navBarWhiteSt,
            marginFilterView, marginListView,
        } = styles(this.props);
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            // <View >
            <View style={containerMainSt}>
                <MainListScreen
                    isHideFloatingBtn={false}
                    isSwipeDeleteRow={false}
                    isPurchaseMemberShipList={true}
                    getNavigation={this.props.navigation} isHideFilter={true} isDataListShow={true} listData={this.props.purchaseMemberShipData} />
                {/* </View> */}
            </View>
            // </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ routes, memberReducer: { purchaseMemberShipData } }) => ({
    routes: routes,
    purchaseMemberShipData: purchaseMemberShipData,
});

const mapDispatchToProps = {
    getPurchaseMemberShip
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(purchaseMemberShipListScreen);
