/* Food Info */
const initStoreState = {
    // listingPosts: false,
    // listingMorePosts: undefined, // id of post from which to start
    // posts: [],
    // hasMore: true,
    // creatingPost: false,
    // creatingVote: false
};

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
