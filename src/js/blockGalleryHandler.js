export function setBlockTitle(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            poststate.content[i].title = action.title;
            return Object.assign({},state,poststate);
        }
    }
    return state;
}

export function setTitle(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId == action.subblockId) {
                    poststate.content[i].content[l].content.title = action.title;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setImage(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId == action.subblockId) {
                    poststate.content[i].content[l].content.img = action.img;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}


export function setUp(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId == action.subblockId && l > 0 ) {
                    let nextBlock = Object.assign({},poststate.content[i].content[l-1]);
                    poststate.content[i].content[l-1]= poststate.content[i].content[l];
                    poststate.content[i].content[l] = nextBlock;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setDown(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId == action.subblockId && l < poststate.content[i].content.length-1) {
                    let nextBlock = Object.assign({},poststate.content[i].content[l+1]);
                    poststate.content[i].content[l+1]= poststate.content[i].content[l];
                    poststate.content[i].content[l] = nextBlock;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function deleteImage(state, action) {
    let poststate = Object.assign({},state);
    let blockId = 0;
    let subBlockId = 0;
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId == action.subblockId) {
                    blockId = i;
                    subBlockId = l;
                }
            }
        }
    }
    poststate.content[blockId].content.splice(subBlockId,1);
    return Object.assign({},state,poststate);
}

export function createImage(state, action) {
    let postState = Object.assign({},state);
    let blockKey  = 0;
    for (let i = 0; i < postState.content.length; i++) {
        if (postState.content[i].blockId == action.blockId) {
            blockKey = i;
            break;
        }
    }
    if (Object.prototype.toString.call(postState.content[blockKey].content) !== '[object Array]') {
        postState.content[blockKey].content = [];
    }
    postState.content[blockKey].content.push({subBlockId: action.subblockId,
        content: {
            title: '',
            img: ''
        }});
    return Object.assign({},state, postState);
}
