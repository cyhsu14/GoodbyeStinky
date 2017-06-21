// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
import uuid from 'uuid/v4';
import {AsyncStorage, AsyncString} from 'react-native';
import moment from 'moment';
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
    // console.log('store');
    // console.log(newStorage);

    let storages;
    if(foodInfo.isRefrige == true){
        return AsyncStorage.getItem("refrige").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            storages=[
                ...posts,
                newStorage
            ];
            return AsyncStorage.setItem("refrige", JSON.stringify(storages));

        });

    }
    else{
        return AsyncStorage.getItem("freezer").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            storages=[
                ...posts,
                newStorage
            ];
            return AsyncStorage.setItem("freezer", JSON.stringify(storages));

        });
        // console.log(storages);

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

export function deleteStorages(isRefrige, id){
    // let fuckingWorld=[];
    let listStore = [];
    if(isRefrige){
        AsyncStorage.getItem("refrige").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            posts.map(function(post, i){
                if(post.id != id){
                    listStore=[
                        post,
                        ...listStore
                    ]
                }

            })
            AsyncStorage.setItem("refrige", JSON.stringify(listStore));
        });
    }
    else{
        AsyncStorage.getItem("freezer").then(p =>{
            let posts = p ? JSON.parse(p) : [];
            posts.map(function(post, i){
                if(post.id != id){
                    listStore=[
                        post,
                        ...listStore
                    ]
                }
                // console.log("fuckckFREEZER");
                // console.log(listStore);
            })
            AsyncStorage.setItem("freezer", JSON.stringify(listStore));
        });
    }
}
