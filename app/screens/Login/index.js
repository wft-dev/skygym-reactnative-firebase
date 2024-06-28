
import loginScreen from './loginScreen';

export default loginScreen;
// import React, { Component } from 'react';
// import {StyleSheet} from 'react-native';

// import { View, Image, Text, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
// // import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange,
// //   removeOrientationListener} from '../../utils/responsive';

// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
//     listenOrientationChange ,
//     removeOrientationListener ,getOrientation, percentageToAllDP
//   } from 'react-native-responsive-screen';
  
//   export default class App extends React.Component {
//     state = {
//        orientation: getOrientation(),
//     };
   
//     componentDidMount() {
//       listenOrientationChange(this);
//       console.log('------listenOrientationChange------',this.state ,listenOrientationChange);
//     }
  
//     componentWillUnMount() {
//       removeOrientationListener();
//     }
  
//     render() {
//       // if ((typeof this.state  === 'object' || typeof this.state  === 'function' || this.state  == null)) {     
//       //     // console.log('------this.state == null ------',this.state ,listenOrientationChange);
//       //   //listenOrientationChange(this);
//       //  }
//       const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//           backgroundColor: 'gray',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         responsiveBox: {
//           width: wp('84.5%'),
//           height: hp('12%'),
//           borderWidth: 2,
//           borderColor: 'orange',
//           flexDirection: 'column',
//           justifyContent: 'space-around' 
//         },
//         text: {
//           color: 'white',
//          // fontSize: percentageToAllDP('4%'),
//           fontSize:  this.state.orientation ==="portrait" ? hp('2%') :  wp('2%'),
//         }
//       });

//    console.log('------State------',this.state);
//       return (
//         <View style={styles.container}>
//           <View style={styles.responsiveBox}>
//             <Text style={styles.text}>This box is always of 84.5% width and 17% height.</Text>
//             <Text style={styles.text}>Test it by running this example repo in phones/
//               emulators with screens of various dimensions and pixel per inch (ppi).Test it by running this example repo in phones/
//               emulators with screens of various dimensions and pixel per inch (ppi).</Text>
//           </View>
//         </View>
//       );
//     }
//   }

// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';
// import textFontStyles from '../../components/TextFontStyle';
// import {Fonts} from '../../utils';

// export default class extends React.Component {
//   constructor() {
//     super();
//     this.state = {count: 0};
//   }
//   render() {
//     return (
//       <View style={styles.column}>
//         <Text style={styles.header}>You clicked: {this.state.count}</Text>
//         <Button onPress={() => this.setState({count: this.state.count + 1})} title="Click me!"/>
//       </View>
//     );
//   }
// }

// const styles = EStyleSheet.create({
//   column: {
//     width: '80%',
//     marginHorizontal: '10%',
//     marginTop: '10%',
//     backgroundColor: '#e6e6e6',
//     alignItems: 'center',
//     padding: '1.5rem',
//   },
//   header: {
//     fontSize: '1rem',
//     fontFamily: Fonts.poppinsMedium,

//   }
// });