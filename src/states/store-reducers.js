/* Food Info */
const initStoreState = {
    listingPosts: false,
    posts: [],
    creatingPost: false
};

export function storage(state = initStoreState, action) {
    switch (action.type) {
        case '@STORAGE/START_LIST_POSTS':
            return {
                ...state,
                listingPosts: true
            };
        case '@STORAGE/END_LIST_POSTS':
            if (!action.posts)
                return {
                    ...state,
                    listingPosts: false
                };
            return {
                ...state,
                listingPosts: false,
                posts: action.posts
            };
        case '@STORAGE/START_CREATE_POST':
            return {
                ...state,
                creatingPost: true
            };
        case '@STORAGE/END_CREATE_POST':
            if (!action.post)
                return {
                    ...state,
                    creatingPost: false
                };
            var newPosts = state.posts.slice();
            newPosts.unshift(action.post);
            return {
                ...state,
                creatingPost: false,
                posts: newPosts
            };
        default:
            return state;
    }
}
/* PostFormScreen */
const initFoodInfo = {
    isRefrige: true,
    isTimeOut: false,
    category: 'na',
    name: 'na',
    quantity: 1,
    unit: 'na',
    isSetDeadline: false,
    deadline: 'na',
    isAlarm: false,
    alarmTime: 'na',
    text: ''
}/*
export function storage(state = initFoodInfo, action) {
    switch (action.type) {
        case '@POSTFORM/SEND_FOODINFO':
            return {
                ...state,
                isRefrige: state.isRefrige,
                isTimeOut: state.isTimeOut,
                category: state.category,
                name: state.name,
                quantity: state.quantity,
                unit: state.unit,
                isSetDeadline: state.isSetDeadline,
                deadline: state.deadline,
                isAlarm: state.isAlarm,
                alarmTime: state.alarmTime,
                text: state.text
            };
        default:
            return state;
    }
}*/
/* Refrige/Freezer Screen */
const initFormState = {
    category: 'na',
    name: 'na',
    isRefrige: 'na'
};

export function foodForm(state = initFormState, action) {
    switch (action.type) {
        case '@FOOD_INFO/SELECT_FOOD':
            return {
                ...state,
                category: action.category,
                name: action.name,
                isRefrige: action.isRefrige
            };
        default:
            return state;
    }
}
