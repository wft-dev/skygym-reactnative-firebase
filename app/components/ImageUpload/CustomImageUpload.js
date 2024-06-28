import React, { Component } from 'react';
import { View, Alert, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Images, Colors } from '../../utils'
import ImagePicker from 'react-native-image-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol, getOrientation
} from 'react-native-responsive-screen';
import textFontStyles from '../TextFontStyle';
import { symbol } from 'prop-types';


class CustomImageUpload extends Component {
  state = {
    loaded: false,
    idLoaded: false,
    selectedId: null,
    filepath: {
      data: '',
      uri: ''
    },
    userFileData: '',
    userFileUri: '',
    idProofFileData: '',
    idProofFileUri: "No File",
  }
  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  chooseImage = (isUser) => {
    if (this.props.isEdit === false) {
      var options = {
        title: 'Select Image',
        // customButtons: [
        //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        // ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {

          let source = response;
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          console.log('Response = ', source);
          if (isUser) {
            this.setState({
              filePath: response,
              userFileData: response.data,
              userFileUri: response.uri
            });
            const source = { uri: response.uri }
            this.props.userImageFileUri(source)
          } else {
            this.setState({
              filePath: response,
              idProofFileData: response.data,
              idProofFileUri: response.uri
            });
            const source = { uri: response.uri }
            // this.props.idProofImageFileUri(this.state.idProofFileUri)
            this.props.idProofImageFileUri(source)

          }

        }
      });
    }
  };


  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
      />
    } else {
      return <Image source={Images.user1Img}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
      />
    } else {
      return <Image
        source={Images.user1Img}

      />
    }
  }

  onPressCancelBtn = () => {
    if (this.props.isEdit === false) {

      this.setState({ idProofFileUri: '' }, () => {
        this.props.isRemoveIdProof(true)
        this.props.idProofImageFileUri("No File")


      })
    }
  }
  userImageView = () => {
    const { userImgSt, userImgVwSt, loaderContainer } = styles(this.props);
    //  console.log(this.state.userFileUri === '' ? (this.props.setImage ? { uri: this.props.setImage.uri } : Images.userImg ): { uri: this.state.userFileUri });
    return (<View style={userImgVwSt}>
      <TouchableOpacity onPress={() => { this.chooseImage(true) }} >
        {!this.state.loaded ?
          <View style={loaderContainer}>
            <ActivityIndicator color={Colors.black} />
          </View> : null}
        <Image style={userImgSt} source={this.state.userFileUri === '' ? (this.props.setImage ? { uri: this.props.setImage.uri ? this.props.setImage.uri : this.props.setImage } : Images.userImg) : { uri: this.state.userFileUri }}
          resizeMode={this.state.userFileUri === '' ? (this.props.setImage ? 'cover' : 'contain') : 'cover'}
          onLoadEnd={this.imageLoaded}
        // resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>)
  }

  imageView = () => {
    if (this.state.idProofFileUri !== "No File" && this.state.idProofFileUri || this.props.setIDImage !== "No File" && this.props.setIDImage) {
      const { documentImageViewSt, documentImageSt, crossTouchStyle, crossBtnStyle, loaderContainer } = styles(this.props);
      return (<View style={documentImageViewSt}>
        {!this.state.idLoaded ?
          <View style={loaderContainer}>
            <ActivityIndicator color={Colors.black} />
          </View> : null}

        <Image style={documentImageSt}
          source={this.state.idProofFileUri == "No File" ? (this.props.setIDImage !== "No File" ? { uri: this.props.setIDImage.uri ? this.props.setIDImage.uri : this.props.setIDImage } : '') : { uri: this.state.idProofFileUri }}
          onLoadEnd={this.imageIdLoaded} />
        <TouchableOpacity style={crossTouchStyle} onPress={this.onPressCancelBtn}>
          <Image style={crossBtnStyle} source={Images.crossImg} resizeMode='contain' />
        </TouchableOpacity>
        {/* </View> */}
      </View>)
    }
  }
  imageLoaded = () => {
    this.setState({ loaded: true })
  }

  imageIdLoaded = () => {
    this.setState({ idLoaded: true })
  }

  uploadIdProofView = () => {
    let fileName = this.props.setIDImage && this.props.setIDImage.uri ? this.props.setIDImage.uri : this.props.setIDImage
    const { title, orientation, errorMsg, backgroundColor, styleCustom, } = this.props;
    const { wholeTextFldStyle, textVwStyle, labelStyle, textFldStyle, errorLblStyle, loaderContainer } = styles(this.props, this.state.idProofFileUri);
    return (<View style={wholeTextFldStyle}>
      <View>
        {title && <Text style={labelStyle}>{title}</Text>}
      </View>
      <TouchableOpacity onPress={() => { this.chooseImage(false) }} >
        <View style={textVwStyle}>
          <Text numberOfLines={1} style={[textFldStyle, styleCustom]} {...this.props} >{this.state.idProofFileUri === "No File" ? (this.props.setIDImage !== "No File" && fileName ? fileName : "No File") :
            this.state.idProofFileUri === '' ? "No File" : this.state.idProofFileUri}</Text>
          <Image style={styles.img} source={Images.camImg} resizeMode='center' />
        </View>

      </TouchableOpacity>
      <View >
        {errorMsg ? <Text style={errorLblStyle}
        >{errorMsg}</Text> : null}
      </View>

      {this.imageView()}
    </View>)
  }

  render() {
    return (
      <View>
        {this.props.isUserImage ? this.userImageView() : this.uploadIdProofView()}
      </View>
    );
  }
}

const textFontStyle = {
  ...textFontStyles.mediumTextMedium,
};
const styles = (props, idProofFileUri) => {
  return (
    StyleSheet.create({
      textFldStyle: {
        flex: 1,
        ...textFontStyle,
        //height: hp('7%'),
        color: idProofFileUri === 'No FIle' ? Colors.grayDim : Colors.black,
        paddingLeft: props.isEdit ? 0 : 8,
        paddingRight: props.isEdit ? 0 : 8,
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),

      },

      loaderContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: Colors.grayLight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: getOrientation() === "portrait" ? hp('1%') : wp('1%'),
      },
      crossTouchStyle: {
        position: 'absolute',
        right: getOrientation() === "portrait" ? 2 : 6,
        top: getOrientation() === "portrait" ? 10 : 20,
        //backgroundColor: Colors.red,
        // justifyContent:'center',
        // alignItems: 'center',
        height: getOrientation() === "portrait" ? hp('10%') : wp(' 10%'),
        width: getOrientation() === "portrait" ? wp('10%') : hp('10%'),
      },
      crossBtnStyle: {
        height: getOrientation() === "portrait" ? hp('5%') : wp('20%'),
        width: getOrientation() === "portrait" ? wp('5%') : hp('20%'),
      },
      wholeTextFldStyle: {
        marginTop: 15,//20
      },
      textVwStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: hp('7%'),
        //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
        padding: getOrientation() === "portrait" ? (props.isEdit ? hp('0.3%') : hp('1.3%')) : (props.isEdit ? wp('0.3%') : wp('1.3%')),
        borderColor: props.isEdit ? Colors.white : (props.errorMsg ? 'red' : Colors.white),
        borderWidth: props.isEdit ? 0 : (props.errorMsg ? 1 : 0),
        backgroundColor: props.isEdit ? Colors.white : (props.backgroundColor ? props.backgroundColor : Colors.gray),
        borderRadius: props.isEdit ? 0 : getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        borderBottomColor: props.isEdit ? Colors.grayDim : null,
        borderBottomWidth: props.isEdit ? 1 : 1,
      },
      labelStyle: {
        ...textFontStyle,
        color: props.isEdit ? Colors.grayDim : Colors.black,
        marginBottom: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
      },
      img: {
        height: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
        width: getOrientation() === "portrait" ? wp('1.3%') : hp('1.3%'),
        marginRight: 10,
      },
      documentImageViewSt: {
        flex: 1,
        backgroundColor: Colors.gray,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        padding: getOrientation() === "portrait" ? 20 : 40,
        // width: getOrientation() ==="portrait" ?  wp('4.3%'):  hp('1.3%'),
      },
      documentImageSt: {
        // flex: 1, 
        backgroundColor: Colors.gray,
        height: getOrientation() === "portrait" ? hp('20%') : wp('20%'),
        width: getOrientation() === "portrait" ? wp('40%') : hp('40%'),
      },
      userImgVwSt: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',

        //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
        //  width:wp('12%'),
        //  height:hp('12%'),
        marginBottom: getOrientation() === "portrait" ? '2%' : '4%',
        // backgroundColor: Colors.gray,

      },

      userImgSt: {
        // width: getOrientation() === "portrait" ? wp('24%') : wp('24%'),
        // height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
        marginLeft: 10,
        width: wp('24%'),
        height: hp('11%'),
        //alignSelf: "center",
        borderRadius: getOrientation() === "portrait" ? hp('2.3%') : wp('1.3%'),
      },
      errorLblStyle: {
        ...textFontStyles.mediumSmallTextSemibold,
        marginTop: props.isEdit ? 0 : 3,//8
        marginHorizontal: props.lablMarginPr ? 20 : 2,
        color: Colors.red,
      },
    })
  )
}

export default CustomImageUpload;

CustomImageUpload.defaultProps = {
  title: "Upload ID Proof",
  imageNametitle: '',
  isRemoveIdProof: false,
  isUserImage: false,
  userImageFileUri: '',
  idProofImageFileUri: '',
  userImageFileData: '',
  idProofImageFileData: '',

};


// const styles = (props) => {
//   return (
//     StyleSheet.create({
//       textFldStyle: {
//         flex: 1,
//         ...textFontStyle,
//         //height: hp('7%'),
//         color: props.imageNametitle === 'No FIle' ? Colors.grayDim : Colors.black,
//         paddingLeft: 8,
//         paddingRight: 8,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.gray,

//       },
//       crossTouchStyle: {
//         position: 'absolute',
//         right: getOrientation() === "portrait" ? 2 : 6,
//         top: getOrientation() === "portrait" ? 10 : 20,
//         //backgroundColor: Colors.red,
//         // justifyContent:'center',
//         // alignItems: 'center',
//         height: getOrientation() === "portrait" ? hp('10%') : wp(' 10%'),
//         width: getOrientation() === "portrait" ? wp('10%') : hp('10%'),
//       },
//       crossBtnStyle: {
//         height: getOrientation() === "portrait" ? hp('5%') : wp('20%'),
//         width: getOrientation() === "portrait" ? wp('5%') : hp('20%'),
//       },
//       wholeTextFldStyle: {
//         marginTop: 15,//20
//       },
//       textVwStyle: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // height: hp('7%'),
//         //  padding :  getOrientation() ==="portrait" ?  hp('1.5%') :  wp('1.5%'),
//         padding: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//         borderColor: props.errorMsg ? 'red' : Colors.white,
//         borderWidth: props.errorMsg ? 1 : 0,
//         backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.gray,
//         borderRadius: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//       },
//       labelStyle: {
//         ...textFontStyle,
//         marginBottom: 3,//8
//         marginHorizontal: props.lablMarginPr ? 20 : 2,
//       },
//       img: {
//         height: getOrientation() === "portrait" ? hp('1.3%') : wp('1.3%'),
//         width: getOrientation() === "portrait" ? wp('1.3%') : hp('1.3%'),
//         marginRight: 10,
//       },
//       documentImageViewSt: {
//         flex: 1,
//         backgroundColor: Colors.gray,
//         // flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 10,
//         padding: getOrientation() === "portrait" ? 20 : 40,
//         // width: getOrientation() ==="portrait" ?  wp('4.3%'):  hp('1.3%'),
//       },
//       documentImageSt: {
//         // flex: 1, 
//         backgroundColor: Colors.gray,
//         height: getOrientation() === "portrait" ? hp('20%') : wp('20%'),
//         width: getOrientation() === "portrait" ? wp('40%') : hp('40%'),
//       },
//       userImgVwSt: {
//         alignSelf: 'center',
//        // justifyContent: 'center',
//         //height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
//       //  width:wp('12%'),
//       //  height:hp('12%'),
//         marginBottom: getOrientation() === "portrait" ? '2%' : '4%',



//       },

//       userImgSt: {
//        // backgroundColor: Colors.gray,
//         // width: getOrientation() === "portrait" ? wp('24%') : wp('24%'),
//         // height: getOrientation() === "portrait" ? hp('24%') : hp('24%'),
//         width:wp('24%'),
//         height:hp('11%'),
//         alignSelf: "center",
//         borderRadius: getOrientation() === "portrait" ? hp('2.3%') : wp('1.3%'),
//       },
//     })
//   )
// }
