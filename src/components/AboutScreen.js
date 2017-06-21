import React from 'react';
import PropTypes from 'prop-types';
import {ListView, Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationContainer from './NavigationContainer';

import {Container, Fab, Button, Toast, Content} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export default class AboutScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);

    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='About'>
                <View>
                    <Text style={styles.textStyle}>
                        This app is developed by
                    </Text>
                    <View style={styles.viewStyle}>
                        <Image source={require('../images/BKChen.jpg')} style={styles.img}></Image>
                        <Text style={styles.textStyle}> Bang-kang Chen</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Image source={require('../images/YiTing.jpg')} style={styles.img}></Image>
                        <Text style={styles.textStyle}> Yi-Ting Ciou</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Image source={require('../images/Chingyu.jpg')} style={styles.img}></Image>
                        <Text style={styles.textStyle}> Ching-Yu Hsu</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Image source={require('../images/handsomeGaryChen.jpg')} style={styles.img}></Image>
                        <Text style={styles.textStyle}> HANDSOME Gary Chen</Text>
                    </View>
                </View>
            </NavigationContainer>
        );
    }
}
const styles = {
    viewStyle:{
        flexDirection:'row',
        alignItems: 'center',
        marginLeft: 20,
        marginVertical: 20
    },
    textStyle:{
        fontSize:24,
        fontFamily:'sans-condensed',
        marginLeft: 10,
        marginTop:10
    },
    img: {
        width: 100,
        height: 100
    }
};
