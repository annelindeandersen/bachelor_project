const initialState = {
    restaurant: {},
    logged_out: true,
    item_added: false,
    item_deleted: false,
    profile_updated: false,
    log_out: false,
    checkbox_changed: false
}
let lastId = 0

const reducer = (state = initialState, action) => {
    if (action.type === 'SESSION_STARTED') {
        return {
            ...state,
            restaurant: action.payload.restaurant
        }
    }
    if (action.type === 'CURRENT_RESTAURANT') {
        return {
            ...state,
            restaurant: action.restaurant
        }
    }
    if (action.type === 'PROFILE_UPDATED') {
        return {
            ...state,
            profile_updated: action.profile_updated
        }
    }
    if (action.type === 'MENU_ITEM_CREATED') {
        return {
            ...state,
            item_added: action.item_added
        }
    }
    if (action.type === 'MENU_ITEM_DELETED') {
        return {
            ...state,
            item_added: action.item_deleted
        }
    }
    if (action.type === 'LOGGED_OUT') {
        return {
            ...state,
            logged_out: action.logged_out
        }
    }
    if (action.type === 'LOG_OUT') {
        return {
            ...state,
            log_out: action.log_out
        }
    }
    if (action.type === 'CHECKBOX_CHANGED') {
        return {
            ...state,
            checkbox_changed: action.checkbox_changed
        }
    }
    return state;
}

export default reducer;