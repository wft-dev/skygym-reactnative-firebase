import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import { FloatingButton, CustomList, CustomFilterList, CustomFilterModel, CustomSearchBar } from '../../components/index';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getVisitor, deleteVisitor } from '../../actions/visitor/visitorAction';
import MainListScreen from '../MainList/MainListScreen';

import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class visitorListScreen extends Component {

    componentDidMount() {
        lor(this);
        this.props.getVisitor()
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
                    getNavigation={this.props.navigation} isVisitor={true} isHideFilter={true} isDataListShow={false} listData={this.props.visitorData}
                    isHideFloatingBtn={this.props.user.visitorPermission}
                    isSwipeDeleteRow={this.props.user.visitorPermission} />
            </View>
            // </SafeAreaView>
        );
    }
}


const mapStateToProps = ({ routes, sessionReducer: { user }, visitorReducer: { visitorData } }) => ({
    routes: routes,
    visitorData: visitorData,
    user: user
});

const mapDispatchToProps = {
    getVisitor,
    deleteVisitor,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(visitorListScreen);