import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import { FloatingButton, CustomList, CustomFilterList, CustomFilterModel, CustomSearchBar } from '../../components/index';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getTrainer, deleteTrainer } from '../../actions/trainer/trainerAction';
import MainListScreen from '../MainList/MainListScreen';

import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class trainerListScreen extends Component {

    componentDidMount() {
        lor(this);
        this.props.getTrainer()
    }

    componentWillUnmount() {
        rol();
    }



    render() {
        const { mainViewSt,
            containerMainSt, marginListView,
        } = styles(this.props);
        return (

            // <SafeAreaView style={{ flex: 1 }}>
            <View style={containerMainSt}>
                <MainListScreen
                    getNavigation={this.props.navigation} isTrainer={true} isHideFilter={true} isDataListShow={false} listData={this.props.trainerData} />
            </View>
            // </SafeAreaView>
        );
    }
}


const mapStateToProps = ({ routes, trainerReducer: { trainerData } }) => ({
    routes: routes,
    trainerData: trainerData,

});

const mapDispatchToProps = {
    getTrainer,
    deleteTrainer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(trainerListScreen);