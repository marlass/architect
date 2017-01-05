export function setTitle(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].title = action.title;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setAddress(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].address = action.address;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setCity(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].city = action.city;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setPostal(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].postal = action.postal;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setPhone(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].phone = action.phone;
                    return Object.assign({},state,poststate);
                }
            }
        }
    }
    return state;
}

export function setEmail(state, action) {
    let poststate = Object.assign({},state);
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    poststate.content[i].content[l].email = action.email;
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
                if (poststate.content[i].content[l].subBlockId = action.subblockid && l > 0 ) {
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
                if (poststate.content[i].content[l].subBlockId = action.subblockid && l < poststate.content[i].content.length-1) {
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

export function deleteOffice(state, action) {
    let poststate = Object.assign({},state);
    let blockId = 0;
    let subBlockId = 0;
    for (let i = 0, len = poststate.content.length; i < len; i++) {
        if (poststate.content[i].blockId === parseInt(action.blockId)) {
            for (let l = 0; l < poststate.content[i].content.length; l++) {
                if (poststate.content[i].content[l].subBlockId = action.subblockid) {
                    blockId = i;
                    subBlockId = l;
                }
            }
        }
    }
    poststate.content[blockId].content.splice(subBlockId,1);
    return Object.assign({},state,poststate);
}

export function createOffice(state, action) {
    let postState = Object.assign({},state);
    let blockKey  = 0;
    console.log(postState);
    for (let i = 0; i < postState.content.length; i++) {
        if (postState.content[i].blockId == action.blockId) {
            blockKey = i;
            break;
        }
    }
    if (typeof postState.content[blockKey].content === 'object') {
        postState.content[blockKey].content = [];
    }
    postState.content[blockKey].content.push({subBlockId: action.subblockId,
        content: {
            title: '',
            address: '',
            city: '',
            postal: '',
            phone: '',
            email: ''
        }});
    return Object.assign({},state, postState);
}
