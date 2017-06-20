// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
import uuid from 'uuid/v4';
import {AsyncStorage, AsyncString} from 'react-native';

export function listStorages(isRefrige) {
    if(isRefrige == true){
        return AsyncStorage.getItem("refrige").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            // console.log("from refrige listposts");
            // console.log(posts);
            return posts;
        });
    }
    else {
        return AsyncStorage.getItem("freezer").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            // console.log("from freezer listposts");
            // console.log(posts);
            return posts;
        });
    }
}

export function addStorage(foodInfo){
    var newStorage={
        id : uuid(),
        ...foodInfo
    };
    // console.log(newStorage);

    let storages;
    if(foodInfo.isRefrige == true){
        AsyncStorage.getItem("refrige").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            storages=[
                ...posts,
                newStorage
            ];
            AsyncStorage.setItem("refrige", JSON.stringify(storages));
            // console.log(storages);
        });
    }
    else{
        AsyncStorage.getItem("freezer").then(p =>{
        let posts = p ? JSON.parse(p) : [];
        storages=[
            ...posts,
            newStorage
        ];
        AsyncStorage.setItem("freezer", JSON.stringify(storages));
        // console.log(storages);
    });
    }

}

export function clearStorages(isRefrige){
    if(isRefrige==true){
        AsyncStorage.removeItem("refrige");
    }
    else{
        AsyncStorage.removeItem("freezer");
    }
}

// function _listStorages() {
//     AsyncStorage.getItem("foods").then(p =>{
//         let posts = p ? JSON.parse(p) : [];
//         console.log(posts);
//         return posts;
//     });
// }

// // Simulated server-side code
// function _listPosts(searchText = '') {
//     AsyncStorage.getItem("foods").then(p =>{
//         let posts = p ? JSON.parse(p) : [];
//         console.log("from listposts");
//         console.log(posts);
//         return posts;
//     });
// };


// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

// export function listPosts(searchText = '', start) {
//     let url = `${postBaseUrl}/posts`;
//     let query = [];
//     if (searchText)
//         query.push(`searchText=${searchText}`);
//     if (start)
//         query.push(`start=${start}`);
//     if (query.length)
//         url += '?' + query.join('&');

//     console.log(`Making GET request to: ${url}`);

//     return fetch(url, {
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(res => {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);
//         console.log("listpost~~~");
//         let qweqw = res.json();
//         console.log(qweqw);
//         return qweqw;
//     });
// }

// export function createPost(mood, text) {
//     let url = `${postBaseUrl}/posts`;

//     console.log(`Making POST request to: ${url}`);

//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             mood,
//             text
//         })
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.json();
//     });
// }


// export function createVote(id, mood) {
//     let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

//     console.log(`Making POST request to: ${url}`);

//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.json();
//     });
// }
