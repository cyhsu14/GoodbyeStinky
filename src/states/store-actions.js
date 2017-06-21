import {
    listStorages as listStoragesFromApi,
    addStorage as addStoragefromApi
} from '../api/posts.js';

/* Refrige/Freezer Screen */
export function selectFood(category, name, isRefrige) {
    return {
        type: '@FOOD_INFO/SELECT_FOOD',
        category,
        name,
        isRefrige
    };
}

/* PostFormScreen */
/*export function sendFoodinfo(foodInfo) {
    return {
        type: '@POSTFORM/SEND_FOODINFO',
        ...foodInfo
    };
}*/
function startListPosts() {
    return {
        type: '@STORAGE/START_LIST_POSTS'
    };
}

function endListPosts(posts) {
    return {
        type: '@STORAGE/END_LIST_POSTS',
        posts
    };
}
function startCreatePost() {
    return {
        type: '@STORAGE/START_CREATE_POST'
    };
}

function endCreatePost(post) {
    return {
        type: '@STORAGE/END_CREATE_POST',
        post
    };
}
export function listStorages(isRefrige) {
    return (dispatch, getState) => {
        dispatch(startListPosts());
        // console.log(listStoragesFromApi(isRefrige));
        return dispatch(endListPosts(listStoragesFromApi(isRefrige)));
        // listStoragesFromApi(isRefrige).then(posts => {
        //     dispatch(endListPosts(posts));
        // }).catch(err => {
        //     dispatch(endListPosts());
        //     console.error('Error listing posts', err);
        // });
    };
}
export function addStorage(foodInfo) {
    return (dispatch, getState) => {
        dispatch(startCreatePost());

        return dispatch(endCreatePost(addStoragefromApi(foodInfo)));
        // addStoragefromApi(foodInfo).then(post => {
        //     dispatch(endCreatePost(post));
        // }).catch(err => {
        //     dispatch(endCreatePost())
        //     console.error('Error creating post', err);
        // });
    };
}
// export function onPost(FoodDetail){
//     // addStorageFromApi(FoodDetail);
//     // return{
//     //     listPostsFromApi(FoodDetail.isRefrige);
//     // };
//     return (dispatch, getState) => {
//         dispatch(startCreateFood());
//         return addStoragefromApi(isRefrige,FoodDetail).then(p => {
//             dispatch(endCreateFood(p));
//         }).catch(err => {
//             dispatch(endCreateFood())
//             console.error('Error creating post', err);
//         });
//     }
// }
