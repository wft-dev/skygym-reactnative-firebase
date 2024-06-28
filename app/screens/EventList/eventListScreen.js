import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import { getEvent, deleteEvent } from '../../actions/eventAdd/eventAddAction';
import { connect } from 'react-redux';
import MainListScreen from '../MainList/MainListScreen';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import { Constants } from '../../utils';

class eventListScreen extends Component {

    componentDidMount() {
        this.props.getEvent()
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
                    isEvent={true}
                    getNavigation={this.props.navigation} isHideFilter={true} isDataListShow={true} listData={this.props.eventData}
                    isHideFloatingBtn={this.props.user.role === Constants.member ? false : this.props.user.eventPermission}
                    isSwipeDeleteRow={this.props.user.role === Constants.member ? false : this.props.user.eventPermission} />
            </View>
            // </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ routes, sessionReducer: { user }, eventAddReducer: { eventData } }) => ({
    routes: routes,
    eventData: eventData,
    user: user

});

const mapDispatchToProps = {
    getEvent,
    deleteEvent,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(eventListScreen);
