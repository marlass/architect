export function setOfficeTitle(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].title = action.title;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setOfficeAddress(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].address = action.address;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setOfficeCity(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].city = action.city;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setOfficePostal(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].postal = action.postal;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setOfficePhone(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].phone = action.phone;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function setOfficeEmail(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer["offices"] && postState.footer["offices"][lang]) {
        for (let i = 0, len = postState.footer["offices"][lang].length; i < len; i++) {
            if (postState.footer["offices"][lang][i].blockId === parseInt(action.blockId)) {
                postState.footer["offices"][lang][i].email = action.email;
                return Object.assign({},state, postState);
            }
        }
    }
    return state;
}

export function createOffice(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer) {
        if (postState.footer.offices) {
            if (!postState.footer.offices[lang]) {
                postState.footer.offices[lang] = [];
            }
        } else {
            postState.footer.offices = {
                en: [],
                pl: []
            };
        }
    } else {
        postState.footer = {
            links: {
                en: [],
                pl: []
            }
        };
    }
    postState.footer.offices[lang].push({blockId: action.blockId, title: '', address: '', city: '', postal: '', phone: '', email: ''});
    return Object.assign({},state, postState);
}

export function setOfficeUp(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer.offices && postState.footer.offices[lang]) {
        for (let i = 0, len = postState.footer.offices[lang].length; i < len; i++) {
            if (postState.footer.offices[lang][i].blockId === parseInt(action.blockId) && i > 0 ) {
                let prevBlock = Object.assign({},postState.footer.offices[lang][i-1]);
                postState.footer.offices[lang][i-1] = postState.footer.offices[lang][i];
                postState.footer.offices[lang][i] = prevBlock;
                return Object.assign({},state,postState);
            }
        }
    }
    return state;
}

export function setOfficeDown(state, action, lang) {
    let postState = Object.assign({},state);
    if (postState.footer && postState.footer.offices && postState.footer.offices[lang]) {
        for (let i = 0, len = postState.footer.offices[lang].length; i < len; i++) {
            if (postState.footer.offices[lang][i].blockId === parseInt(action.blockId) && i < postState.footer.offices[lang].length-1 ) {
                let nextBlock = Object.assign({},postState.footer.offices[lang][i+1]);
                postState.footer.offices[lang][i+1] = postState.footer.offices[lang][i];
                postState.footer.offices[lang][i] = nextBlock;
                return Object.assign({},state,postState);
            }
        }
    }
    return state;
}

export function deleteOffice(state, action, lang) {
    let postState = Object.assign({},state);
    let id = 0;
    if (postState.footer && postState.footer.offices && postState.footer.offices[lang]) {
        for (let i = 0, len = postState.footer.offices[lang].length; i < len; i++) {
            if (postState.footer.offices[lang][i].blockId === parseInt(action.blockId)) {
                id = i;            
            }
        }
    }
    postState.footer.offices[lang].splice(id,1);
    return Object.assign({},state,postState);
}
