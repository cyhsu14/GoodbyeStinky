import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView,
    RefreshControl,
    StyleSheet,
    Fab,
    Text,
    TouchableOpacity
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts} from '../states/post-actions';
import PopupDialog, {DialogTitle,SlideAnimation,ScaleAnimation,
    FadeInAnimation}from 'react-native-popup-dialog';
import moment from 'moment';
import {deleteStorages} from '../api/posts.js';
import {setToast} from '../states/toast';
import {Button} from 'native-base';


var foodInformation = {
    id: '',
    isRefrige: true,
    name:'',
    category:'',
    quantity:1,
    unit:'個',
    isSetDeadline:false,
    deadline:moment().format("YYYY-MM-DD"),
    isAlarm:false,
    alarmTime:moment().format("YYYY-MM-DD hh:mm a"),
    text:''
}
class PostList extends React.Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            }),
            checkFood: false
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCheckFoodInfo = this.handleCheckFoodInfo.bind(this);
        this.handleFoodInfoDelete = this.handleFoodInfoDelete.bind(this);
        // this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        // console.log("in");
        this.props.dispatch(listPosts(this.props.isRefrige)); //need to be changed later
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, posts} = this.props;
        // if (searchText !== nextProps.searchText) {
        //     dispatch(listPosts(this.props.isRefrige));       //need to be changed later
        // } this.props.dispatch(listPosts(this.props.isRefrige));
        if (posts !== nextProps.posts) {
            // console.log("next");
            // console.log(nextProps.posts);

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
            });

        }
    }

    render() {
        const {listingPosts, posts, scrollProps} = this.props;
        // this.props.dispatch(listPosts(this.props.isRefrige));
        if(posts.length>0){
            return (
            <View >
                <ListView
                    refreshControl={
                        <RefreshControl refreshing={listingPosts} onRefresh={this.handleRefresh} />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={(p) => {
                        return (
                            <TouchableOpacity onPress={()=>this.handleCheckFoodInfo(p)}>
                            <PostItem {...p} />
                        </TouchableOpacity>
                    );
                    }}
                    contentContainerStyle={styles.list}
                    // ref={(el) => this.listEl = el}
                    // {...scrollProps}
                />
                <PopupDialog
                    style={styles.popup}
                    dialogTitle={<DialogTitle titleTextStyle={styles.textTitle} title='食物筆記本'/>}
                    ref={(popupDialog)=>{this.popupDialog = popupDialog; }}
                    show={this.state.checkFood}
                    dialogstyle={styles.text}
                    onDismissed={ () => {this.setState({checkFood: false});} }
                    height={340}
                >
                    <View style={{alignItems:'flex-start', marginLeft:20}}>
                        <View style={styles.iconStyle}><Icon name='list-alt' style={{fontSize:24}}/><Text style={styles.text}>{foodInformation.category}類：{foodInformation.name}</Text></View>
                        <View style={styles.iconStyle}><Icon name='sort-numeric-asc' style={{fontSize:24}}/><Text style={styles.text}>數量單位：{foodInformation.quantity}{foodInformation.unit}</Text></View>
                        <View style={styles.iconStyle}><Icon name='calendar' style={{fontSize:24}}/>{foodInformation.isSetDeadline?
                            <Text style={styles.text}>有效期限：{foodInformation.deadline}</Text>
                            :
                            <Text style={styles.text}>有效期限：關</Text>
                        }</View>
                        <View style={styles.iconStyle}><Icon name='clock-o' style={{fontSize:24}}/>{foodInformation.isAlarm?
                            <Text style={styles.text}>提醒： {foodInformation.alarmTime}</Text>
                            :
                            <Text style={styles.text}>提醒：關</Text>
                        }</View>
                        <View style={styles.iconStyle}><Icon name='commenting-o' style={{fontSize:24}}/><Text style={styles.text}>備註：{foodInformation.text}</Text></View>
                        <Button Iconleft danger rounded style={{alignSelf:'center',marginTop:20}}
                            onPress={ () => this.handleFoodInfoDelete(foodInformation.isRefrige,foodInformation.id)}>
                            <Icon name='trash' style={{fontSize:24}}/>
                            <Text style={{fontSize:24}}> Delete </Text>
                        </Button>
                    </View>
                </PopupDialog>
            </View>
            );
        }
        else{
            return(
                <View style={styles.noThing}>
                    <Icon name='question' style={styles.content}/>
                </View>
            );
        }


    }
    handleCheckFoodInfo(p) {
        this.setState({
            checkFood: true
        });
        foodInformation.id= p.id;
        foodInformation.isRefrige = p.isRefrige;
        foodInformation.name = p.name;
        foodInformation.category = p.category;
        foodInformation.quantity = p.quantity;
        foodInformation.unit = p.unit;
        foodInformation.isSetDeadline = p.isSetDeadline;
        foodInformation.deadline = p.deadline;
        foodInformation.isAlarm = p.isAlarm;
        foodInformation.alarmTime = p.alarmTime;
        foodInformation.text = p.text;

        // console.log('foodInformation');
    }

    handleRefresh() {
        this.props.dispatch(listPosts(this.props.isRefrige));      //need to be changed later
    }

    handleFoodInfoDelete(isRefrige,id){
        deleteStorages(isRefrige, id).then(()=>{
            this.props.dispatch(listPosts(isRefrige));
            this.props.dispatch(setToast('Delete Successful!'));
            this.setState({
                checkFood: false
            });
        });


    }
}
const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    noThing: {
        alignItems: 'center',
        justifyContent: 'center'

    },
    content: {
        fontSize: 60,
        textAlign: 'center',
        margin: 10
    },
    popup: {
        position: 'absolute',
        justifyContent: 'center',
        width: 60,
        height: 30,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    textTitle:{
        fontSize:24,
        alignSelf:'flex-start',
        marginLeft:10,
        color: '#4268A5'
    },
    text:{
        fontSize:24,
        alignSelf:'flex-start',
        marginLeft:10
    },
    iconStyle:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-start',
        marginTop:5
    }
});

export default connect((state, ownProps) => ({
    listingPosts: state.post.listingPosts,
    creatingPost: state.post.creatingPost,
    posts: state.post.posts
}))(PostList);
