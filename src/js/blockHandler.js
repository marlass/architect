export function setUp(state, action) {
    let preState = Object.assign({},state);
    let block = {};
    for (let i = 0, len = state.content.length; i < len; i++) {
        if (state.content[i].blockId === parseInt(action.blockId) && i > 0 ) {
            let prevBlock = Object.assign({},state.content[i-1]);
            state.content[i-1] = state.content[i];
            state.content[i] = prevBlock;
            return Object.assign({},preState,{'content': state.content});
        }
    }
    return state;
}

export function setDown(state, action) {
    let preState = Object.assign({},state);
    let block = {};
    for (let i = 0, len = state.content.length; i < len; i++) {
        if (state.content[i].blockId === parseInt(action.blockId) && i < state.content.length-1 ) {
            let nextBlock = Object.assign({},state.content[i+1]);
            state.content[i+1] = state.content[i];
            state.content[i] = nextBlock;
            return Object.assign({},preState,{'content': state.content});
        }
    }
    return state;
}

export function deleteBlock(state, action) {
    let preState = Object.assign({},state);
    let block = {};
    let id = 0;
    for (let i = 0, len = state.content.length; i < len; i++) {
        if (state.content[i].blockId === parseInt(action.blockId)) {
            id = i;            
        }
    }
    state.content.splice(id,1);
    return Object.assign({},preState,{'content': state.content});
    return state;
}
