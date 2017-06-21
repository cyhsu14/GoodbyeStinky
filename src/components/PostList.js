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
import PopupDialog, {DialogTitle}from 'react-native-popup-dialog';
import moment from 'moment';

// import {listStorages} from '../states/store-actions';

var foodInformation = {
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
        // searchText: PropTypes.string.isRequired,
        // listingPosts: PropTypes.bool.isRequired,
        // listingMorePosts: PropTypes.oneOfType([
        //     PropTypes.string,
        //     PropTypes.number
        // ]),
        posts: PropTypes.array.isRequired,
        // hasMorePosts: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        // scrollProps: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            }),

        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleCheckFoodInfo = this.handleCheckFoodInfo.bind(this);
        // this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.isRefrige)); //need to be changed later
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, posts} = this.props;
        // if (searchText !== nextProps.searchText) {
        //     dispatch(listPosts(this.props.isRefrige));       //need to be changed later
        // }
        if (posts !== nextProps.posts) {
            // console.log("next");
            // console.log(nextProps.posts);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
            });
        }
    }

    render() {
        const {listingPosts, hasMorePosts, posts, scrollProps} = this.props;
        console.log("in postlist!~~");
        console.log(posts);
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
                    ref={(el) => this.listEl = el}
                    {...scrollProps}
                />
                <PopupDialog
                    style={styles.popup}
                    dialogTitle={<DialogTitle title="食物資訊" />}
                    ref={(popupDialog)=>{this.popupDialog = popupDialog; }}
                    show={this.state.checkFood}
                    onDismissed={ () => {this.setState({checkFood: false});} }
                >
                    <View style={{alignSelf:'center'}}>

                        <Text>{foodInformation.category}類：{foodInformation.name}</Text>
                        <Text>數量單位：{foodInformation.quantity}{foodInformation.unit}</Text>
                        {foodInformation.isSetDeadline?
                            <Text>有效期限：{foodInformation.deadline}</Text>
                            :
                            <Text>有效期限：--</Text>
                        }
                        {foodInformation.isAlarm?
                            <Text>提醒：開 {foodInformation.alarmTime}</Text>
                            :
                            <Text>提醒：關</Text>
                        }
                        <Text>備註：{foodInformation.text}</Text>
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
        console.log('aaaaaaaaaa');
        console.log(foodInformation);
        console.log(foodInformation.isRefrige);
        this.setState({
            checkFood: true
        });
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
        const {dispatch} = this.props;
        dispatch(listPosts(this.props.isRefrige));
        console.log('refresh');     //need to be changed later
    }

    // handleLoadMore() {
    //     const {listingMorePosts, dispatch, posts, searchText} = this.props;
    //     const start = posts[posts.length - 1].id;
    //     dispatch(listMorePosts(searchText, start));
    // }
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
        width: 30,
        height: 30,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    }
});

export default connect((state, ownProps) => ({
    // searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    // listingMorePosts: state.post.listingMorePosts,
    posts: state.post.posts
    // hasMorePosts: state.post.hasMore
}))(PostList);
