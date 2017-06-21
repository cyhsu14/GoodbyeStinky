import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, StyleSheet,  Image, Modal, Item, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Container, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getFoodIcon} from '../utilities/foodModal.js';
import PostList from './PostList';
import PostItem from './PostItem';
import NavigationContainer from './NavigationContainer';

import {clearStorages,listStorages} from '../api/posts.js';

import {connect} from 'react-redux';
import {selectFood} from '../states/store-actions';
import {setToast} from '../states/toast';
import {listPosts} from '../states/post-actions';

import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import moment from 'moment';

var warn;
const timeOutFood = [];

// import dismissKeyboard from 'dismissKeyboard';
// dismissKeyboard();
class RefrigerScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            modalToggle: false,
            categoryState: 'vegetable',
            showDialog: false
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleIcon = this.handleIcon.bind(this);
        this.getIconList = this.getIconList.bind(this);
        this.handleAlarm = this.handleAlarm.bind(this);
        warn = setInterval(this.handleAlarm,5000);
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(listPosts(true));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            });
            this.props.dispatch(setToast(''));
            // this.props.dispatch(listPosts(this.props.isRefrige));
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        var checkShow = false;
        var checkTime;
        console.log('in render');
        console.log(this.state.showDialog);
        timeOutFood.map(function(data, j) {
            checkShow = data.isShowDialog;
            checkTime = data.alarmTime;
        });

        if(checkTime < moment().format("YYYY-MM-DD HH:mm a")){
                timeOutFood.splice(0,timeOutFood.length);
            }

        if(this.state.showDialog === false && checkShow === false) {  //initial state & when dialog has showed
            warn = setInterval(this.handleAlarm,5000);
            console.log('warn');
            console.log(warn);
        }

        let children = timeOutFood.map(posts => (
            <View key={posts.id} style={{margin: 5, padding: 2}}>
                <View style={{alignItems: 'center'}}>
                    {getFoodIcon(posts.name)}
                    <Text style={styles.text}>{posts.name}</Text>
                </View>
                <View><Text>{posts.deadline}</Text></View>
            </View>
        ));
        return (
            <NavigationContainer navigate={navigate} title='Refriger'>
                <View style={{flex: 1}}>
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
                onPress={() => {clearStorages(true);
                                this.props.dispatch(listPosts(true)).then((p)=>this.props.dispatch(setToast('Clear Items.')));
                                }}>
                    <Icon name="bomb" />
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
                </Modal><PopupDialog
                    dialogTitle={<DialogTitle title="快過期啦"/>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    show={this.state.showDialog}
                    height= {350}
                    onShowed = {() => {
                        var check;
                        timeOutFood.map(function(data, j) {
                            data.isShowDialog = true;
                            check = data.isShowDialog
                        });
                    }}
                    onDismissed = {() => {
                        this.setState({
                            showDialog: false
                        });

                    }}
                >
                    <View style={{alignSelf: 'center'}}>
                        <View>
                            <Image source={require('../images/timeout_red.png')}  style={styles.dialog}/>
                       </View>
                        <View style={styles.dialogItem}>{children}</View>
                    </View>
                </PopupDialog>
            </NavigationContainer>
        );
    }
    getIconList({categoryState=''}){
        var l=[];
        switch (categoryState) {
            case 'vegetable':
                // console.log(categoryState);
                l=[
                    (<TouchableWithoutFeedback key={0} onPress={()=>this.handleCreate("蔬菜","高麗菜")}>
                        {getFoodIcon('cabbage')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={1} onPress={()=>this.handleCreate("蔬菜","紅蘿蔔")}>
                        {getFoodIcon('carrot')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={2} onPress={()=>this.handleCreate("蔬菜","茄子")}>
                        {getFoodIcon('eggplant')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={3} onPress={()=>this.handleCreate("蔬菜","辣椒")}>
                        {getFoodIcon('chili')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={4} onPress={()=>this.handleCreate("蔬菜","玉米")}>
                        {getFoodIcon('corn')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={5} onPress={()=>this.handleCreate("蔬菜","花椰菜")}>
                        {getFoodIcon('cauliflower')}</TouchableWithoutFeedback>)
                ];
                return l;

            case 'meat':
                l=[
                    (<TouchableWithoutFeedback key={6} onPress={()=>this.handleCreate("肉","雞肉")}>
                        {getFoodIcon('chicken')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={7} onPress={()=>this.handleCreate("肉","培根")}>
                        {getFoodIcon('bacon')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={8} onPress={()=>this.handleCreate("肉","牛肉")}>
                        {getFoodIcon('beef')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'seafood':
                l=[
                    (<TouchableWithoutFeedback key={9} onPress={()=>this.handleCreate("海鮮","螃蟹")}>
                        {getFoodIcon('crab')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={10} onPress={()=>this.handleCreate("海鮮","龍蝦")}>
                        {getFoodIcon('lobster')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={11} onPress={()=>this.handleCreate("海鮮","蝦子")}>
                        {getFoodIcon('shrimp')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={12} onPress={()=>this.handleCreate("海鮮","魚")}>
                        {getFoodIcon('fish')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={13} onPress={()=>this.handleCreate("海鮮","章魚")}>
                        {getFoodIcon('octopus')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={14} onPress={()=>this.handleCreate("海鮮","蛤蜊")}>
                        {getFoodIcon('clams')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'fruit':
                l=[
                    (<TouchableWithoutFeedback key={15} onPress={()=>this.handleCreate("水果","草莓")}>
                        {getFoodIcon('strawberry')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={16} onPress={()=>this.handleCreate("水果","橘子")}>
                        {getFoodIcon('orange')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={17} onPress={()=>this.handleCreate("水果","蘋果")}>
                        {getFoodIcon('apple')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={18} onPress={()=>this.handleCreate("水果","葡萄")}>
                        {getFoodIcon('grape')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={19} onPress={()=>this.handleCreate("水果","西瓜")}>
                        {getFoodIcon('watermelon')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={20} onPress={()=>this.handleCreate("水果","香蕉")}>
                        {getFoodIcon('banana')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'eggmilk':
                l=[
                    (<TouchableWithoutFeedback key={21} onPress={()=>this.handleCreate("蛋/乳製品","蛋")}>
                        {getFoodIcon('egg')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={22} onPress={()=>this.handleCreate("蛋/乳製品","牛奶")}>
                        {getFoodIcon('milk')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={23} onPress={()=>this.handleCreate("蛋/乳製品","起司")}>
                        {getFoodIcon('cheese')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'sauce':
                l=[
                    (<TouchableWithoutFeedback key={24} onPress={()=>this.handleCreate("調味料","番茄醬")}>
                        {getFoodIcon('ketchup')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={25} onPress={()=>this.handleCreate("調味料","果醬")}>
                        {getFoodIcon('jam')}</TouchableWithoutFeedback>),
                    (<TouchableWithoutFeedback key={26} onPress={()=>this.handleCreate("調味料","辣椒醬")}>
                        {getFoodIcon('chilisauce')}</TouchableWithoutFeedback>)
                ];
                return l;
            case 'cooked':
                return (<TouchableWithoutFeedback key={27} onPress={()=>this.handleCreate("熟食","熟食")}>
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

        this.props.dispatch(selectFood(category, name, true));
        this.props.navigation.navigate('PostForm');
        // this.props.navigation.navigate('FoodInfo');
        this.setState({
            modalToggle:!this.state.modalToggle
        });
    }
    handleAlarm() {
        //in freezer
        var showAlarm = false;
        listStorages(true).then(p=>{
            p.map(function(posts, i){
                if(posts.isAlarm) {
                    //console.log(posts.alarmTime);
                    //console.log(moment().format("YYYY-MM-DD HH:mm a"));
                    if((posts.alarmTime == moment().format("YYYY-MM-DD HH:mm a")
                    || ((posts.deadline == moment().format("YYYY-MM-DD") && moment().format("hh:mm a") == "10:02 pm"))) //
                        ){
                        clearInterval(warn);
                        var checkNew = true;
                        timeOutFood.map(function(data, j) {
                            if(data.id === posts.id) { //has new
                                checkNew = false;
                            }
                        })
                        if(checkNew === true){
                            showAlarm = true;
                            var newAlarmFood = {
                                id : posts.id,
                                name: posts.name,
                                deadline: posts.deadline,
                                isShowDialog: false
                            }
                            var same = false;
                            timeOutFood.map(function(data, j) {
                                if(data.id === newAlarmFood.id){
                                    same=true;
                                }
                            })
                            if(!same){
                                timeOutFood.push(newAlarmFood);
                            }
                        }
                    }
                }
            })
        }).then(p=>{
            if(showAlarm){
                this.setState({
                    showDialog: true
                });
            }
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
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    closeIcon: {
        flexDirection: 'row-reverse',
        marginTop: 5,
        marginLeft: 7
    },
    dialog: {
        width: 200,
        height: 160,
        alignSelf: 'center'
    },
    dialogItem: {
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
        marginTop: 20
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    toast: state.toast
}))(RefrigerScreen);
