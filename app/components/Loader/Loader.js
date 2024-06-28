import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { Colors } from '../../utils/index';
import { Button, Overlay } from 'react-native-elements';

class Spinner extends Component {
  render() {
    if (this.props.loader) {
      return (
        // <Overlay isVisible={this.props.loader} >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={Colors.black} animating={this.props.loader} />
          </View>
        </View>
        // </Overlay>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loader: loaderReducer.showLoader1
});

export default connect(mapStateToProps, {})(Spinner)

const styles = {
  spinnerStyle: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 99999,

  },
  modalBackground: {
    backgroundColor: '#00000040',
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  }
};
