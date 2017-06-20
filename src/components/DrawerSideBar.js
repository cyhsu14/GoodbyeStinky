import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'

import {Container, Content, Thumbnail, Badge, Button, Icon, Text as NbText} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image source={require('../images/account-bg.jpg')} style={styles.header}>
                <Thumbnail large source={require('../images/account.jpg')} />
            </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('Refriger')}>
                <Icon name='water' style={styles.icon}/>
                <Text style={styles.text}>Refriger</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Freezer')}>
                <Icon name='snowflake' style={styles.icon}/>
                <Text style={styles.text}>Freezer</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Recipe')}>
                <Icon name='file' style={styles.icon}/>
                <Text style={styles.text}>Search Recipe</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('About')}>
                <Icon name='paw' style={styles.icon}/>
                <Text style={styles.text}>About</Text>
            </Button>
        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};
