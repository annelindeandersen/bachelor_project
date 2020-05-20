const initialState = {
    restaurants: {},
    session: null,
    logged_out: true
}

let lastId = 0

const reducer = (state = initialState, action) => {
    if (action.type === 'SESSION_STARTED') {
        return {
            ...state,
            restaurant: action.payload.restaurant,
        }
    }
    else if (action.type === 'CURRENT_USER') {
        return {
            ...state,
            restaurants: action.payload.data,
            session: action.payload.session_data
        }
    }
    else if (action.type === 'LOGOUT_USER') {
        return {
            ...state,
            logged_out: action.logged_out
        }
    }
}
