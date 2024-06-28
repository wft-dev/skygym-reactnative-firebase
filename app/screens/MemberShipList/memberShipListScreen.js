import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';


import { getMemberShip, deleteMemberShip } from '../../actions/memberShip/memberShipAction';
import MainListScreen from '../MainList/MainListScreen';

import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { Constants } from '../../utils';

class memberShipListScreen extends Component {
    componentDidMount() {
        this.props.getMemberShip()
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    render() {


        const {
            containerMainSt,
        } = styles(this.props);
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            <View style={containerMainSt}>
                <MainListScreen
                    isHideFloatingBtn={this.props.user.role === Constants.admin}
                    isMemberShipList={true} isHideFilter={true} isDataListShow={true}
                    getNavigation={this.props.navigation} listData={this.props.memberShipData}
                    isSwipeDeleteRow={this.props.user.role === Constants.admin} />

            </View>
            // </SafeAreaView>
        );
    }
}


const mapStateToProps = ({ routes, sessionReducer: { user }, memberShipReducer: { memberShipData } }) => ({
    routes: routes,
    memberShipData: memberShipData,
    user: user

});

const mapDispatchToProps = {
    getMemberShip,
    deleteMemberShip,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memberShipListScreen);