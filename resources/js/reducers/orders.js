const initialState = {
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
    if (action.type === 'GET_CART') {
        return {
            ...state,
            cart: action.cart
        }
    }
    if (action.type === 'GET_ORDER') {
        return {
            ...state,
            order: action.order
        }
    }
    return state;
}

export default reducer;