import React from 'react';
import PropTypes from 'prop-types';
import {ListView, Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationContainer from './NavigationContainer';

import {Container, Fab, Button, Toast, Content} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';

import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';

import {clearStorages} from '../api/posts.js';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class FreezerScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false
        };

        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }

    render() {
        const {searchText} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Freezer'>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <PostList  isRefrige={false}/>
                </View>
                <Fab
                active={this.state.fabActive}
                containerStyle={styles.fabContainer}
                style={styles.fab}
                position="bottomRight"
                onPress={() => this.handleCreatePost('Snow')}>
                    <Icon name='pencil' />
                </Fab>
                <Fab
                active={this.state.fabActive}
                containerStyle={styles.fabContainer}
                style={styles.fab}
                position="bottomLeft"
                onPress={() => clearStorages(false)}>
                    <Icon name="question" />
                </Fab>                
            </NavigationContainer>
        );
    }

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }
}
const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    }
};
export default connect(state => ({
    searchText: state.search.searchText,
}))(FreezerScreen);