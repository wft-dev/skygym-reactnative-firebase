import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import { FloatingButton, CustomList, CustomFilterList, CustomFilterModel, CustomSearchBar } from '../../components/index';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { getMember, deleteMember } from '../../actions/member/memberAction';
import MainListScreen from '../MainList/MainListScreen';

import { connect } from 'react-redux';
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class memberListScreen1 extends Component {
    state = {
        showSearch: false,
        showFilter: false,
    }

    componentDidMount() {
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
    onSearch = (searchText) => {
        return new Promise((resolve, reject) => {
            console.log(searchText);
            console.log('Add your search function here.');
            resolve();
        });
    }

    caneclSearchAction = () => {
        this.setSearchFun(false)
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

    showFilterView(isShow) {
        this.setState({ showFilter: isShow })
    }


    render() {
        const { mainViewSt,
            containerMainSt, marginListView,
        } = styles(this.props);
        return (

            // <SafeAreaView style={{ flex: 1 }}>
            <View style={mainViewSt}>
                {this.state.showFilter ? <CustomFilterModel modelClosePr={() => this.showFilterView(false)} /> : null}
                <View >
                    {this.state.showSearch ? <CustomSearchBar onCancel={this.caneclSearchAction} /> : null}
                </View>
                <View style={containerMainSt}>
                    <View style={marginListView}>
                        <CustomFilterList onPressFilterPr={() => this.showFilterView(true)} />
                    </View>
                    <View style={marginListView}>
                        <CustomList isMember={true} />
                    </View>
                </View>
                <FloatingButton />
            </View>
            // </SafeAreaView>
        );
    }
}


const mapStateToProps = ({ routes, memberReducer: { memberData } }) => ({
    routes: routes,
    memberData: memberData,

});

const mapDispatchToProps = {
    getMember,
    deleteMember,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memberListScreen1);