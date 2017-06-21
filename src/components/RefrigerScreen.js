import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, StyleSheet,  Image, Modal, Item, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Container, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getFoodIcon} from '../utilities/foodModal.js';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';
import NavigationContainer from './NavigationContainer';

import {clearStorages} from '../api/posts.js';

import {connect} from 'react-redux';
import {selectFood,listStorages} from '../states/store-actions';
import {setToast} from '../states/toast';

// import dismissKeyboard from 'dismissKeyboard';
// dismissKeyboard();
class RefrigerScreen extends React.Component {
    static propTypes = {
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            modalToggle: false,
            categoryState: 'vegetable'
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleIcon = this.handleIcon.bind(this);
        this.getIconList = this.getIconList.bind(this);
    }
    // componentDidMount(){
    //     const {dispatch} = this.props;
    //     dispatch(listStorages(true));
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            });
            this.props.dispatch(setToast(''));
        }
    }
// <ParallaxNavigationContainer
//                 navigate={navigate}
//                 title='Refriger'
//                 titleLeft={80}
//                 titleTop={40}
//                 renderHeaderContent={props => <WeatherDisplay {...props} />}
//                 renderScroller={props => <PostList scrollProps={props} />}>
//                 {this.state.fabActive &&
//                     <TouchableWithoutFeedback onPress={this.handleFabClose}>
//                         <View style={styles.fabMask}/>
//                     </TouchableWithoutFeedback>
//                 }
//                 <Fab
//                     active={this.state.fabActive}
//                     containerStyle={styles.fabContainer}
//                     style={styles.fab}
//                     position="bottomRight"
//                     onPress={() => this.handleCreatePost('Clear')}>
//                     <Icon name='pencil' />
//                 </Fab>
//             </ParallaxNavigationContainer>
    render() {
        const {navigate} = this.props.navigation;

        return (
            <NavigationContainer navigate={navigate} title='Refriger'>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <PostList  isRefrige={true}/>
                </View>

                {this.state.modalToggle &&
                    <TouchableWithoutFeedback onPress={this.handleOpenModal}>
                        <View style={styles.fabMask}/></TouchableWithoutFeedback>}

                <Fab
                    active={false}
                    containerStyle={styles.fabContainer}
                    style={styles.fab}
                    position="bottomRight"
                    onPress={this.handleOpenModal}>
                    <Icon name='plus' />
                </Fab>

                <Fab
                active={false}
                containerStyle={styles.fabContainer}
                style={styles.fab}
                position="bottomLeft"
                onPress={() => clearStorages(true)}>
                    <Icon name="question" />
                </Fab>

                <Modal animationType='none' transparent={true} visible={this.state.modalToggle}
                    onRequestClose={() => {}} >
                    <Container>
                        {/* style={{backgroundColor: appColors.mask}} */}
                        <View style={styles.modalStyles}>
                            <View style={styles.closeIcon}>
                                <Icon name='close' size={20} onPress={this.handleOpenModal} />
                            </View>
                            <View style={styles.wrapCate}>
                                <View style={styles.wrap} >
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('vegetable')}>
                                        {getFoodIcon('vegetable')}
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('meat')}>
                                        {getFoodIcon('meat')}
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('seafood')}>
                                        {getFoodIcon('seafood')}
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('fruit')}>
                                        {getFoodIcon('fruit')}
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.wrap}>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('eggmilk')}>
                                        {getFoodIcon('eggmilk')}
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('sauce')}>
                                        {getFoodIcon('sauce')}
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={()=>this.handleIcon('cooked')}>
                                        {getFoodIcon('cooked')}
                                    </TouchableWithoutFeedback>

                                </View>
                            </View>

                            <View style={styles.wrap}>
                                {this.getIconList({categoryState: this.state.categoryState})}
                            </View>
                        </View>
                    </Container>
                </Modal>
            </NavigationContainer>
        );
    }
    getIconList({categoryState=''}){
        var l=[];
        switch (categoryState) {
            case 'vegetable':
                // console.log(categoryState);
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","高麗菜")}>
                        {getFoodIcon('cabbage')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","紅蘿蔔")}>
                        {getFoodIcon('carrot')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","茄子")}>
                        {getFoodIcon('eggplant')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","辣椒")}>
                        {getFoodIcon('chili')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","玉米")}>
                        {getFoodIcon('corn')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蔬菜","花椰菜")}>
                        {getFoodIcon('cauliflower')}</TouchableWithoutFeedback>)
                ];
                return l;

            case 'meat':
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("肉類","雞肉")}>
                        {getFoodIcon('chicken')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("肉類","培根")}>
                        {getFoodIcon('bacon')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("肉類","牛肉")}>
                        {getFoodIcon('beef')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'seafood':
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","螃蟹")}>
                        {getFoodIcon('crab')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","龍蝦")}>
                        {getFoodIcon('lobster')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","蝦子")}>
                        {getFoodIcon('shrimp')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","魚")}>
                        {getFoodIcon('fish')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","章魚")}>
                        {getFoodIcon('octopus')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("海鮮","蛤蜊")}>
                        {getFoodIcon('clams')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'fruit':
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","草莓")}>
                        {getFoodIcon('strawberry')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","橘子")}>
                        {getFoodIcon('orange')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","蘋果")}>
                        {getFoodIcon('apple')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","葡萄")}>
                        {getFoodIcon('grape')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","西瓜")}>
                        {getFoodIcon('watermelon')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("水果","香蕉")}>
                        {getFoodIcon('banana')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'eggmilk':
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蛋/乳製品","蛋")}>
                        {getFoodIcon('egg')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蛋/乳製品","牛奶")}>
                        {getFoodIcon('milk')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("蛋/乳製品","起司")}>
                        {getFoodIcon('cheese')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'sauce':
                l=[
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("調味料","番茄醬")}>
                        {getFoodIcon('ketchup')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("調味料","果醬")}>
                        {getFoodIcon('jam')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback onPress={()=>this.handleCreate("調味料","辣椒醬")}>
                        {getFoodIcon('chilisauce')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'cooked':
                return (<TouchableWithoutFeedback onPress={()=>this.handleCreate("熟食","熟食")}>
                    {getFoodIcon('cooked')}</TouchableWithoutFeedback>);
            default:
                return l;
        }
    }

    handleOpenModal(){
        this.setState({
            modalToggle:!this.state.modalToggle
        });
    }

    handleIcon(category){
        this.setState({
            categoryState: category
        });
    }

    handleCreate(category, name) {
        // console.log(category);
        // console.log(name);

        // this.handleFabClose();
        this.props.dispatch(selectFood(category, name, true));
        this.props.navigation.navigate('PostForm');
        // this.props.navigation.navigate('FoodInfo');
        this.setState({
            modalToggle:!this.state.modalToggle
        });
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
    },
    modalStyles: {
        alignContent: 'center',
        alignSelf:'center',
        // paddingVertical: 'auto',
        marginTop: 125,
        // flex:0,
        backgroundColor: 'white',
        height:400,
        width:320,
        flexDirection: 'column',
        borderRadius: 5
    },
    wrapCate: {
        borderBottomWidth: 5,
        borderStyle: 'dotted',
        borderColor: '#25708f',
        marginTop: 10,
        paddingBottom: 20,
        alignSelf:'center',
        width:320,
        flex: 1,
        flexDirection: 'column'
    },
    wrap: {
        marginTop: 20,
        alignSelf:'center',
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    closeIcon: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        marginLeft: 7
    }
};

export default connect((state, ownProps) => ({
    toast: state.toast
}))(RefrigerScreen);
