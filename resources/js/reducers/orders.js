const initialState = {
    order: {},
    delete: false,
    order_accepted_status: '',
    in_progress_status:false,
    ready_for_dispatch_status: false
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
    return state;

}

export default reducer;