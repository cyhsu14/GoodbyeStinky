import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts, listMorePosts} from '../states/post-actions';

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
        searchText: PropTypes.string.isRequired,
        listingPosts: PropTypes.bool.isRequired,
        listingMorePosts: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        posts: PropTypes.array.isRequired,
        hasMorePosts: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        scrollProps: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, posts} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listPosts(nextProps.searchText));
        }
        if (posts !== nextProps.posts) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
            });
        }
    }

    render() {
        const {listingPosts, hasMorePosts, posts, scrollProps} = this.props;
        // console.log("data source");
        // console.log(this.state.dataSource);

        //         let children = (
        //   <div className="inline">
        //       <Card className="內部">
        //           <div>
        //               <CardBlock>
        //                   <div>
        //                       <i className="fa fa-question-circle fa-3x"></i>
        //                   </div>
        //               </CardBlock>
        //               <CardTitle className="fontSize">快新增吧</CardTitle>
        //           </div>
        //       </Card>
        //   </div>
        // );
        // if (this.props.refrigePosts.length) {
        //     children = this.props.refrigePosts.map(p => (
        //     <div className="inline">
        //       <Card key={p.id} action onClick={this.handleEdit} className="內部Ref">
        //         <RefrigeItem  {...p}  isRefrige={this.props.isRefrige} handleEdit={this.handleEdit} timeOut={this.timeOut}/>
        //       </Card>
        //     </div>
        //     ));
        // }
        // console.log(foods);
        return (
            <ListView
                refreshControl={
                    <RefreshControl refreshing={listingPosts} onRefresh={this.handleRefresh} />
                }
                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    console.log("pppp");
                    console.log(p);
                    console.log(i);
                    console.log(posts.length);
                    if(i%3==1){
                        i++;
                        foods.name1= p.text;
                        if(i==posts.length){
                            foods.name2="";
                            foods.name3="";
                            foods.valid = true;
                            return <PostItem {...foods} />;                            
                        }
                        else{
                            foods.valid = false;
                            return <PostItem {...foods} />;                            
                        }
                    }
                    else if(i%3==2){
                        i++;
                        foods.name2= p.text;
                        if(i==posts.length){
                            foods.name3="";
                            foods.valid = true;                            
                            return <PostItem {...foods} />;                            
                        }
                        else{
                            foods.valid = false;
                            return <PostItem {...foods} />;                            
                        }                        
                    }
                    else if(i%3==0){
                        i++;
                        foods.name3= p.text;
                        foods.valid = true;                   
                        return <PostItem {...foods} />;                            
                    }
                }}
                canLoadMore={() => {
                    if (listingPosts || !posts.length)
                        return false;
                    return hasMorePosts;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
                ref={(el) => this.listEl = el}
                {...scrollProps}
            />
        );
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listPosts(searchText));
    }

    handleLoadMore() {
        const {listingMorePosts, dispatch, posts, searchText} = this.props;
        const start = posts[posts.length - 1].id;
        if (listingMorePosts !== start)
            dispatch(listMorePosts(searchText, start));
    }
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    listingMorePosts: state.post.listingMorePosts,
    posts: state.post.posts,
    hasMorePosts: state.post.hasMore
}))(PostList);
