const initialState = {
    users: {},
    logout: true
}

const reducer = (state = initialState, action) => {
    if (action.type === 'USER_TOKEN') {
        return {
            ...state,
            token: action.token
        }
    }
    if (action.type === 'CURRENT_USER') {
        return {
            ...state,
            user: action.user
        }
    }
    if (action.type === 'LOGOUT_USER') {
        return {
            logout: action.logout
        }
    }
    return state;
}

export default reducer;