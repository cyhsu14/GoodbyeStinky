import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView,
    RefreshControl,
    StyleSheet,
    Fab
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts} from '../states/post-actions';
// import {listStorages} from '../states/store-actions';
var i=1;
var foods={
    valid: false,
    id1 :"",
    name1:"",
    category1:"",
    quantity1:NaN,
    unit1:"",
    isSetDeadline1:false,
    deadline1:"",
    isAlarm1:false,
    alarmDate1:"" ,
    alarmTime1:"" ,
    text1:"",
    isRefrige: false,

    id2 :"",
    name2:"",
    category2:"",
    quantity2:NaN,
    unit2:"",
    isSetDeadline2:false,
    deadline2:"",
    isAlarm2:false,
    alarmDate2:"" ,
    alarmTime2:"" ,
    text2:"",

    id3 :"",
    name3:"",
    category3:"",
    quantity3:NaN,
    unit3:"",
    isSetDeadline3:false,
    deadline3:"",
    isAlarm3:false,
    alarmDate3:"" ,
    alarmTime3:"" ,
    text3:""
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
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
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
        console.log("in postlist!~~");
        console.log(posts);
        // console.log("in postlist!~~");
        // console.log("in postlist!~~");
        if(posts.length>0){
            return (
            <ListView
                refreshControl={
                    <RefreshControl refreshing={listingPosts} onRefresh={this.handleRefresh} />
                }
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <PostItem {...p} />;
                }}
                contentContainerStyle={styles.list}
                // ref={(el) => this.listEl = el}
                // {...scrollProps}
            />
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

    handleRefresh() {
        this.props.dispatch(listPosts(this.props.isRefrige));      //need to be changed later
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
        margin: 10,
    }
});

export default connect((state, ownProps) => ({
    // searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    creatingPost: state.post.creatingPost,
    // listingMorePosts: state.post.listingMorePosts,
    posts: state.post.posts
    // hasMorePosts: state.post.hasMore
}))(PostList);
