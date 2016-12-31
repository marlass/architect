export default function (state, action) {
    let preState = Object.assign({},state);
    let block = {
        blockId: action.blockId,
        sectionType: action.sectionType,
        content: {}
    };
    if (state.content) {
        state.content.push(block);
        return Object.assign({},preState,{"content": state.content});
    } else {
        return Object.assign({},preState, {"content": [block]});
    }
}
