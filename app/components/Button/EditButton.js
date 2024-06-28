import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation, widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images, Colors } from '../../utils';
import { editOn } from '../../actions/editOn/editOnAction';
import { connect } from 'react-redux';
class EditButton extends Component {

  handleEditTouch = () => {
    if (this.props.isEdit === true) {
      this.props.editOn(false, false)
    } else {
      this.props.editOn(true, false)
    }
  }

  showEditBtn = () => {
    const { btnStyle, buttonStyle } = styles;
    return (<TouchableOpacity onPress={() => this.handleEditTouch()}>
      <Image style={btnStyle} source={this.props.isEdit ? Images.editImg : Images.crossImg} resizeMode='contain' />
    </TouchableOpacity>
    )

  }

  render() {
    //

    return (
      <View>
        {!this.props.isAdd ?
          this.showEditBtn()
          : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({

  btnStyle: {
    marginRight: 40,
    width: getOrientation() === "portrait" ? wp('6%') : hp('37.1%'),
    height: getOrientation() === "portrait" ? hp('8%') : wp('37.1%'),
  },
});

const mapStateToProps = ({ routes, editOnReducer: { isEdit, isAdd } }) => ({
  routes: routes,
  isEdit: isEdit,
  isAdd: isAdd,
});

const mapDispatchToProps = {
  editOn
};

export default connect(mapStateToProps, mapDispatchToProps)(EditButton)

