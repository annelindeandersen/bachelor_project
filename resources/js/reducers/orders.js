const initialState = {
    delete: false,
    order_accepted_status: '',
    in_progress_status: false,
    ready_for_dispatch_status: false,
    order_incoming_status: false,
    rejected_status: false
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
    if (action.type === 'ACCEPT_ONE') {
        return {
            ...state,
            accepted: action.accepted
        }
    }
    if (action.type === 'ORDER_INCOMING') {
        return {
            ...state,
            order_incoming_status: action.order_incoming
        }
    }
    if (action.type === 'ORDER_REJECTED') {
        return {
            ...state,
            rejected_status: action.order_rejected
        }
    }
    if (action.type === 'ORDER_ACCEPTED') {
        return {
            ...state,
            order_accepted_status: action.order_accepted
        }
    }
    if (action.type === 'IN_PROGRESS') {
        return {
            ...state,
            in_progress_status: action.order_ready
        }
    }
    if (action.type === 'READY_FOR_DISPATCH') {
        return {
            ...state,
            ready_for_dispatch_status: action.order_ready
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