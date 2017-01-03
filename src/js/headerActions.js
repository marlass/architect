

export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_PAGE_URL': 
            return Object.assign({}, state, {"pageUrl": action.url});
        default:
            return state;
    }
}
