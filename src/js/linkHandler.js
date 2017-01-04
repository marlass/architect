export function setLinkName(state, action, lang, section) {
    let postState = Object.assign({},state);
    if (postState[section] && postState[section]["links"] && postState[section]["links"][lang]) {
        for (let i = 0, len = postState[section]["links"][lang].length; i < len; i++) {
            if (postState[section]["links"][lang][i].blockId === parseInt(action.blockId)) {
                postState[section]["links"][lang][i].title = action.name;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setLinkUrl(state, action, lang, section) {
    let postState = Object.assign({},state);
    if (postState[section] && postState[section]["links"] && postState[section]["links"][lang]) {
        for (let i = 0, len = postState[section]["links"][lang].length; i < len; i++) {
            if (postState[section]["links"][lang][i].blockId === parseInt(action.blockId)) {
                postState[section]["links"][lang][i].url = action.url;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function createLink(state, action, lang, section) {
    let postState = Object.assign({},state);
    if (postState[section]) {
        if (postState[section]["links"]) {
            if (!postState[section]["links"][lang]) {
                postState[section]["links"][lang] = [];
            }
        } else {
            postState[section]["links"] = {
                en: [],
                pl: []
            };
        }
    } else {
        postState[section] = {
            links: {
                en: [],
                pl: []
            }
        };
    }
    postState[section]["links"][lang].push({blockId: action.blockId, title: '',url: ''});
    return Object.assign({},state, postState);
}

export function setLinkUp(state, action, lang, section) {
    let postState = Object.assign({},state);
    if (postState[section] && postState[section]["links"] && postState[section]["links"][lang]) {
        for (let i = 0, len = postState[section]["links"][lang].length; i < len; i++) {
            if (postState[section]["links"][lang][i].blockId === parseInt(action.blockId) && i > 0 ) {
                let prevBlock = Object.assign({},postState[section]["links"][lang][i-1]);
                postState[section]["links"][lang][i-1] = postState[section]["links"][lang][i];
                postState[section]["links"][lang][i] = prevBlock;
                return Object.assign({},state,postState);
            }
        }
    }
    return state;
}

export function setLinkDown(state, action, lang, section) {
    let postState = Object.assign({},state);
    if (postState[section] && postState[section]["links"] && postState[section]["links"][lang]) {
        for (let i = 0, len = postState[section]["links"][lang].length; i < len; i++) {
            if (postState[section]["links"][lang][i].blockId === parseInt(action.blockId) && i < postState[section]["links"][lang].length-1 ) {
                let nextBlock = Object.assign({},postState[section]["links"][lang][i+1]);
                postState[section]["links"][lang][i+1] = postState[section]["links"][lang][i];
                postState[section]["links"][lang][i] = nextBlock;
                return Object.assign({},state,postState);
            }
        }
    }
    return state;
}

export function deleteLink(state, action, lang, section) {
    let postState = Object.assign({},state);
    let id = 0;
    if (postState[section] && postState[section]["links"] && postState[section]["links"][lang]) {
        for (let i = 0, len = postState[section]["links"][lang].length; i < len; i++) {
            if (postState[section]["links"][lang][i].blockId === parseInt(action.blockId)) {
                id = i;            
            }
        }
    }
    postState[section]["links"][lang].splice(id,1);
    return Object.assign({},state,postState);
}
