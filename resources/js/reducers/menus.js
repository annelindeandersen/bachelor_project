const initialState = {
    menu: '',
}
const reducer = (state = initialState, action) => {
    if (action.type === 'ITEM_ADDED') {
        return {
            ...state,
            menu: action.menu,
        }
    }
    return state;
};
export default reducer;