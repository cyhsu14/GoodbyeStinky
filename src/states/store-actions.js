import {
    listStorages as listStoragesFromApi
} from '../api/posts.js';

/* Refrige/Freezer Screen */
export function selectFood(category, name, isRefrige) {
    return {
        type: '@FOOD_INFO/SELECT_FOOD',
        category,
        name,
        isRefrige
    };
};
