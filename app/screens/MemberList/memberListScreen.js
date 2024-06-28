import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import { FloatingButton, CustomList, CustomFilterList, CustomFilterModel, CustomSearchBar } from '../../components/index';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getMember, deleteMember, addAttendance, getMemberForTrainer } from '../../actions/member/memberAction';
import MainListScreen from '../MainList/MainListScreen';

import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class memberListScreen extends Component {
    state = {
        showSearch: false,
        showFilter: false,
    }

    componentDidMount() {

        this.props.getMember()

        lor(this);

    }


    componentWillUnmount() {
        rol();
    }


    render() {
        const { mainViewSt,
            containerMainSt, marginListView,
        } = styles(this.props);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={containerMainSt}>
                    <MainListScreen
                        getNavigation={this.props.navigation}
                        isMember={true} isHideFilter={false}
                        isDataListShow={false} listData={this.props.memberData}
                        isHideFloatingBtn={this.props.user.memberPermission}
                        isSwipeDeleteRow={this.props.user.memberPermission} />
                </View>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = ({ routes, sessionReducer: { user }, memberReducer: { memberData } }) => ({
    routes: routes,
    memberData: memberData,
    user: user
});

const mapDispatchToProps = {
    getMember,
    deleteMember,
    addAttendance,
    getMemberForTrainer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memberListScreen);