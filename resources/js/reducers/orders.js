const initialState = {
    order: {},
    delete: false
}

const reducer = (state = initialState, action) => {
    if (action.type === 'RESTAURANT') {
        return {
            ...state,
            restaurant: action.id
        }
    }
    if (action.type === 'DELETE_ONE') {
        return {
            ...state,
            deleted: action.deleted
        }
    }
    return state;
}

export default reducer;