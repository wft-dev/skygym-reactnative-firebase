import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import DataList from '../../components/List/Data/DataList';
import CustomFilterList from '../../components/Filter/CustomFilterList';
import CustomFilterModel from '../../components/Filter/CustomFilterModel';

import CustomSearchBar from '../../components/SearchBar/CustomSearchBar';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getEvent, deleteEvent } from '../../actions/eventAdd/eventAddAction';
import { connect } from 'react-redux';
import FloatingButton from '../../components/Button/FloatingButton';

import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class eventListScreen extends Component {
    state = {
        showSearch: false,
        searchText: '',
    }

    componentDidMount() {
        this.props.getEvent()
        const { menuImg, searchImg } = Images
        lor(this);
        this.props.navigation.setParams({
        })
        setTimeout(() => {
            //Actions.refresh( {hideNavBar: false, headerStyle : navBarWhiteSt, renderTitle :"Member", drawerImage: menuImg,onRight: this.handleIconTouch, rightButtonImage:searchImg, });
            Actions.refresh({ hideNavBar: false, onRight: this.handleIconTouch, })
        }, 2);
    }

    componentWillUnmount() {
        rol();
    }

    handleIconTouch = () => {
        this.setSearchFun(true)
    }

    setSearchFun = (isSearch) => {
        this.setState({ showSearch: isSearch }, () => {
            //Actions.refresh({hideNavBar: true, headerStyle : navGrayBarSt, renderTitle :this.renderTitle,onRight : {},rightButtonImage: null, drawerImage: null});
            Actions.refresh({ hideNavBar: isSearch, })
        })
    }

    getSearchText = (searchText) => {
        return new Promise((resolve, reject) => {
            console.log('Add your search function here.', searchText);
            this.setState({ searchText: searchText })
            this.child.searchFilterFunction(searchText);
            resolve();
        });
    }

    caneclSearchAction = () => {
        this.setSearchFun(false)
        this.child.searchFilterFunction('');
    }

    doneBtnAction = () => {
        Actions.drawerMenu()
    }

    getStyles() {
        const myStyle = styles(this.props);
        return {
            containerMainSt, navGrayBarSt, navBarWhiteSt,
            marginFilterView, marginListView,
        } = myStyle;
    }

    naviagteToAddEventScreen = () => {
        Actions.Event();

    }

    render() {
        this.getStyles()
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            <View style={containerMainSt}>
                <View >
                    {this.state.showSearch ? <CustomSearchBar onSearch={this.getSearchText} onCancel={this.caneclSearchAction} /> : null}
                </View>
                <View >
                    <View style={marginListView}>
                        <DataList isSwipeDeleteRow={true} onRef={(ref) => (this.child = ref)} data={this.props.eventData} isEvent={true} />
                    </View>
                </View>
                <FloatingButton onPressPlusBtn={this.naviagteToAddEventScreen} />
            </View>
            // </SafeAreaView>
        );
    }
}
const mapStateToProps = ({ routes, eventAddReducer: { eventData } }) => ({
    routes: routes,
    eventData: eventData,

});

const mapDispatchToProps = {
    getEvent,
    deleteEvent,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(eventListScreen);
