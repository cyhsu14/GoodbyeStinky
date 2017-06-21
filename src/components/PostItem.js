import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Image, TouchableHighlight,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {createVote, setTooltipToggle, toggleTooltip} from '../states/post-actions';
import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem,List, Icon,Card,CardItem} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
// import {getMoodIcon} from '../utilities/weather';
import {getFoodIcon} from '../utilities/food';


class PostItem extends React.Component {

    constructor(props) {
        super(props);


        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        // console.log("props");
        // console.log(this.props);
        // console.log(getFoodIcon(this.props.name1));
        if(this.props.valid != false){
            return (
                // <View>
                    <View onPress={this.handleCheckFoodInfo} style={StyleSheet.flatten(styles.listItem)} >
                            <View style={styles.wrap}>
                                {getFoodIcon(this.props.name)}
                                <Text style={styles.text}>{this.props.name}</Text>
                            </View>
                    </View>


                // </View>
            );
        }
        else {
            return <Text> </Text>;
        }
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
        width: 100,
        margin:12
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
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: 0,
        marginLeft: 0,
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
