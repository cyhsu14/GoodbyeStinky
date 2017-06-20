import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Image} from 'react-native';

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
        console.log(getFoodIcon(this.props.name1));
        if(this.props.valid != false){
            return (
                <ListItem onPress={this.handleTooltipToggle} style={StyleSheet.flatten(styles.listItem)}>
                    <View style={styles.post}>
                        <View style={styles.wrap}>
                            {getFoodIcon(this.props.name1)}
                            <Text style={styles.text}>{this.props.name1}</Text>
                        </View>
                        <View style={styles.wrap}>
                            {getFoodIcon(this.props.name2)}
                            <Text style={styles.text}>{this.props.name2}</Text>
                        </View>
                        <View style={styles.wrap}>
                            {getFoodIcon(this.props.name3)}
                            <Text style={styles.text}>{this.props.name3}</Text>
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
        marginLeft: 0
    },
    nullList:{
        display:'none'
    },  
    post: {
        flexDirection: 'row',
        alignItems: 'flex-start'
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
        flex: 1,
        alignItems: 'center'
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