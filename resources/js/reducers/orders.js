const initialState = {
    order: {}
}

const reducer = (state = initialState, action) => {
    if (action.type === 'RESTAURANT') {
        return {
            ...state,
            restaurant: action.id
        }
    }
    return state;
}

export default reducer;