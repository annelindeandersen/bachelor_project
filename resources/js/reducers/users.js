const initialState = {
    users: {
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'USER_LOGIN') {
        return {
            ...state,
            token: action.token,
            email: action.email
        }
    }
    return state;
}

export default reducer;