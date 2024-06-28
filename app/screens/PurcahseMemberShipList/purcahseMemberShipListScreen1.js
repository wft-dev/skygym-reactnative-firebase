import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import styles from './styles';

import DataList from '../../components/List/Data/DataList';
import CustomFilterList from '../../components/Filter/CustomFilterList';
import CustomFilterModel from '../../components/Filter/CustomFilterModel';

import CustomSearchBar from '../../components/SearchBar/CustomSearchBar';
import { Images, Constants } from '../../utils'
import { Actions } from 'react-native-router-flux'

import {
    listenOrientationChange as lor,
    removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';

class purchaseMemberShipListScreen1 extends Component {
    state = {
        showSearch: false,

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



    render() {
        this.getStyles()
        return (


            // <SafeAreaView style={{ flex: 1 }}>
            <View >

                <View style={containerMainSt}>

                    <View style={marginListView}>
                        <DataList isPurchaseMemberShipList={true} />
                    </View>

                </View>
            </View>
            // </SafeAreaView>
        );
    }
}


export default purchaseMemberShipListScreen1;
