import React from 'react';
import PropTypes from 'prop-types';
import {ListView, Text, View, TouchableWithoutFeedback, Image,
        TouchableOpacity, WebView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationContainer from './NavigationContainer';

import {Container, Fab, Button, Toast, Content} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

WEBVIEW_REF = 'webview';
export default class RecipeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <NavigationContainer navigate={navigate} title='Search Recipe'>
                    <WebView
                      ref={WEBVIEW_REF}
                      source={{uri: 'https://icook.tw/'}}
                      startInLoadingState={true}
                      domStorageEnabled={true}
                      javaScriptEnabled={true}
                      automaticallyAdjustContentInsets={true}/>
                    <View style={styles.title_view}>
                        <Button transparent
                            onPress={this.goBack.bind(this)}>
                            <Icon name='chevron-left'  style={{fontSize: 20}} />
                        </Button>
                         <Button transparent
                             onPress={this.goForward.bind(this)}>
                             <Icon name='chevron-right'  style={{fontSize: 20}} />
                         </Button>
                    </View>

                </NavigationContainer>

            </View>
        );
    }
    goBack(){
        this.refs[WEBVIEW_REF].goBack();
    }

    goForward(){
    this.refs[WEBVIEW_REF].goForward();
   }
}
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: 'white',
  },
   title_view:{
    flexDirection:'row',
    // height:50,
    paddingLeft:15,
    paddingRight:15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
   title_text:{
    color:'white',
    fontSize:22,
    textAlign:'center'
  },
});
