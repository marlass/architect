export function setTitle(state, action) {
    let preState = Object.assign({},state);
    let block = {};
    for (let i = 0, len = state.content.length; i < len; i++) {
        if (state.content[i].blockId === parseInt(action.blockId)) {
            block = state.content[i];
            block.content.title = action.title;
            return Object.assign({},preState,{'content': state.content});
        }
    }
    return state;
}

export function setBackground(state, action) {
    let preState = Object.assign({},state);
    let block = {};
    for (let i = 0, len = state.content.length; i < len; i++) {
        if (state.content[i].blockId === parseInt(action.blockId)) {
            block = state.content[i];
            block.content.background = action.background;
            return Object.assign({},preState,{'content': state.content});
        }
    }
    return state;
}
