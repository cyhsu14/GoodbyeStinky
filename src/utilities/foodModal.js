import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, Text, Platform, Image} from 'react-native';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getFoodIcon(group) {
    switch (group) {
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}></Image>;
        case 'calendar':
            return<Image source={require('../images/calendar.png')} style={styles.moodIcon}></Image>;
        case 'clock':
            return<Image source={require('../images/clock.png')} style={styles.moodIcon}></Image>;
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}></Image>;

        case 'vegetable':
            return<Image source={require('../images/vegetable.png')} style={styles.moodIcon}></Image>;
        case 'meat':
            return<Image source={require('../images/meat.png')} style={styles.moodIcon}></Image>;
        case 'fruit':
            return<Image source={require('../images/fruit.png')} style={styles.moodIcon}></Image>;
        case 'seafood':
            return<Image source={require('../images/seafood.png')} style={styles.moodIcon}></Image>;
        case 'eggmilk':
            return<Image source={require('../images/eggmilk.png')} style={styles.moodIcon}></Image>;
        case 'sauce':
            return<Image source={require('../images/sauce.png')} style={styles.moodIcon}></Image>;
        case 'cooked':
            return<Image source={require('../images/cooked.png')} style={styles.moodIcon}></Image>;
        //vegtables
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                            // </Image>;
        case 'cabbage':
            return<Image source={require('../images/cabbage.png')} style={styles.moodIcon}></Image>;
        case 'carrot':
            return<Image source={require('../images/carrot.png')} style={styles.moodIcon}></Image>;
        case 'cauliflower':
            return<Image source={require('../images/cauliflower.png')} style={styles.moodIcon}></Image>;
        case 'chili':
            return<Image source={require('../images/chili.png')} style={styles.moodIcon}></Image>;
        case 'corn':
            return<Image source={require('../images/corn.png')} style={styles.moodIcon}></Image>;
        case 'eggplant':
            return<Image source={require('../images/eggplant.png')} style={styles.moodIcon}></Image>;
        //meat
        // case '':
        //     return<Image source={require('./images/.png')} style={styles.moodIcon}>
                            // </Image>;
        case 'bacon':
            return<Image source={require('../images/bacon.png')} style={styles.moodIcon}></Image>;
        case 'beef':
            return<Image source={require('../images/beef.png')} style={styles.moodIcon}></Image>;
        case 'chicken':
            return<Image source={require('../images/chicken.png')} style={styles.moodIcon}></Image>;
        //seafood
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                            // </Image>;
        case 'clams':
            return<Image source={require('../images/clams.png')} style={styles.moodIcon}></Image>;
        case 'crab':
            return<Image source={require('../images/crab.png')} style={styles.moodIcon}></Image>;
        case 'fish':
            return<Image source={require('../images/fish.png')} style={styles.moodIcon}></Image>;
        case 'lobster':
            return<Image source={require('../images/lobster.png')} style={styles.moodIcon}></Image>;
        case 'octopus':
            return<Image source={require('../images/octopus.png')} style={styles.moodIcon}></Image>;
        case 'seafood':
            return<Image source={require('../images/seafood.png')} style={styles.moodIcon}></Image>;
        case 'shrimp':
            return<Image source={require('../images/shrimp.png')} style={styles.moodIcon}></Image>;
        //fruit
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                    // </Image>;
        case 'apple':
            return<Image source={require('../images/apple.png')} style={styles.moodIcon}></Image>;
        case 'banana':
            return<Image source={require('../images/banana.png')} style={styles.moodIcon}></Image>;
        case 'grape':
            return<Image source={require('../images/grape.png')} style={styles.moodIcon}></Image>;
        case 'orange':
            return<Image source={require('../images/orange.png')} style={styles.moodIcon}></Image>;
        case 'strawberry':
            return<Image source={require('../images/strawberry.png')} style={styles.moodIcon}></Image>;
        case 'watermelon':
            return<Image source={require('../images/watermelon.png')} style={styles.moodIcon}></Image>;
           	//eggmilk
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                    // </Image>;
        case 'cheese':
            return<Image source={require('../images/cheese.png')} style={styles.moodIcon}></Image>;
        case 'egg':
            return<Image source={require('../images/egg.png')} style={styles.moodIcon}></Image>;
        case 'milk':
            return<Image source={require('../images/milk.png')} style={styles.moodIcon}></Image>;
        //sauce
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                    // </Image>;
        case 'chilisauce':
            return<Image source={require('../images/chilisauce.png')} style={styles.moodIcon}></Image>;
        case 'jam':
            return<Image source={require('../images/jam.png')} style={styles.moodIcon}></Image>;
        case 'ketchup':
            return<Image source={require('../images/ketchup.png')} style={styles.moodIcon}></Image>;
        // case '':
        //     return<Image source={require('../images/.png')} style={styles.moodIcon}>
                    // </Image>;
        default:
        	return <Image source={require('../images/cooked.png')} style={styles.moodIcon}></Image>;
	}
}

const styles = StyleSheet.create({
    moodIcon: {
        width: 50,
        height: 50
    }
});
