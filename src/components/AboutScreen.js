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
                <View style={styles.textStyle}>
                    <Text style={{fontSize:20, fontFamily:'sans-condensed'}}>
                        This app is developed by Bang-kang, Guan-yu, Yi-ting and Ching-yu.
                    </Text>
                </View>
            </NavigationContainer>
        );
    }
}
const styles = {
    textStyle: {
        marginTop: 10,
        marginLeft: 10
    }
};
