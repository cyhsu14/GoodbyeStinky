import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Image, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';
import {createVote, setTooltipToggle, toggleTooltip} from '../states/post-actions';
import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather';
import {getFoodIcon} from '../utilities/food';


class PostItem extends React.Component {


    constructor(props) {
        super(props);

        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        // console.log("props");
        // console.log(this.props);
        // console.log(getFoodIcon(this.props.name1));
        if(this.props.valid != false){
            return (
                <ListItem onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.listItem)}>
                    <View>
                        <View style={styles.wrap}>
                            {getFoodIcon(this.props.name)}
                            <Text style={styles.text}>{this.props.name}</Text>
                        </View>
                    </View>
                </ListItem>
            );
        }
        else {
            return <Text> </Text>;
        }
    }

    handleTooltipToggle() {
        this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        const {dispatch, id} = this.props;
        dispatch(createVote(id, vote)).then(() => {
            dispatch(setToast('Voted.'));
        });
        dispatch(setTooltipToggle(id, false));
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 100
    },
    nullList:{
        display:'none'
    },
    mood: {
        width: 48,
        marginLeft: 12,
        marginRight: 8,
        top: 12,
        alignItems: 'center'
    },
    moodIcon: {
        width: 60,
        height: 60
    },
    wrap: {
        justifyContent: 'center',
        padding: 5,
        width: 100,
        height: 100,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },  
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    }
});

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false
}))(PostItem);