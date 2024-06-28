import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';


import { DataList, FloatingButton, CustomList, CustomFilterList, CustomFilterModel, CustomSearchBar } from '../../components/index';

import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'


import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class MainListScreen extends Component {
    state = {
        showSearch: false,
        showFilter: false,
        searchText: '',
        filterText: '',
    }

    componentDidMount() {
        const { menuImg, searchImg } = Images
        lor(this);

        this.props.getNavigation.setParams({
        })
        setTimeout(() => {
            //Actions.refresh( {hideNavBar: false, headerStyle : navBarWhiteSt, renderTitle :"Member", drawerImage: menuImg,onRight: this.handleIconTouch, rightButtonImage:searchImg, });
            Actions.refresh({ hideNavBar: false, onRight: this.handleIconTouch, })
        }, 1);
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

    cancelSearchAction = () => {
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

    naviagteToScreen = () => {
        if (this.props.isMemberShipList) {
            Actions.MembershipAdd();
        }
        else if (this.props.isEvent) {
            Actions.Event();
        }
        else if (this.props.isVisitor) {
            Actions.VisitorAdd();
        }
        else if (this.props.isTrainer) {
            Actions.TrainerAdd()
        }
        else if (this.props.isMember) {
            Actions.MemberAdd({ isProfile: false, isAddNewMemberShip: false, isRenewMemberShip: false, isBecomeMember: false })
        }
    }

    showFilterView(isShow) {
        this.setState({ showFilter: isShow })
    }

    filterSelectedDate(selectedFilterText) {
        this.child.searchFilterByTypeFunction(selectedFilterText.title);
        this.setState({ filterText: selectedFilterText.title })
        this.showFilterView(false)
    }

    render() {
        const { containerMainSt, navGrayBarSt, navBarWhiteSt,
            marginFilterView, marginListView,
        } = styles(this.props);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={containerMainSt}>
                    {this.state.showFilter ? <CustomFilterModel isShowPopUp={false}
                        modelClosePr={(selectedFilterText) => this.filterSelectedDate(selectedFilterText)} /> : null}
                    <View >
                        {this.state.showSearch ? <CustomSearchBar onSearch={this.getSearchText} onCancel={this.cancelSearchAction} /> : null}
                    </View>
                    <View >
                        {!this.props.isHideFilter ? <View style={marginListView}>
                            <CustomFilterList setSortByText={this.state.filterText} onPressFilterPr={() => this.showFilterView(true)} />
                        </View> : null}
                        <View style={marginListView}>
                            {this.props.isDataListShow ?
                                <DataList isSwipeDeleteRow={this.props.isSwipeDeleteRow}
                                    onRef={(ref) => (this.child = ref)}
                                    data={this.props.listData}
                                    isEvent={this.props.isEvent}
                                    isMemberShipList={this.props.isMemberShipList}
                                    isPurchaseMemberShipList={this.props.isPurchaseMemberShipList} />
                                :
                                <CustomList isSwipeDeleteRow={this.props.isSwipeDeleteRow}
                                    onCustomRef={(ref) => (this.child = ref)}
                                    data={this.props.listData}
                                    isVisitor={this.props.isVisitor}
                                    isTrainer={this.props.isTrainer}
                                    isMember={this.props.isMember} />
                            }
                        </View>
                    </View>
                    {this.props.isHideFloatingBtn ? <FloatingButton onPressPlusBtn={this.naviagteToScreen} /> : null}
                </View>
            </SafeAreaView>
        );
    }
}

MainListScreen.defaultProps = {
    isSwipeDeleteRow: true,
    isHideFloatingBtn: true,
};
export default MainListScreen;
