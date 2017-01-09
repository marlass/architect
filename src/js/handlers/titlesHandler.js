export function setHeaderTitlePl(state, action) {
    let postState = Object.assign({},state);
    if (postState.header) {
        if (postState.header.title) {
            postState.header.title.pl = action.title;
        } else {
            postState.header.title = {pl: action.title};
        }
    }
    return Object.assign({},state,postState);
}

export function setHeaderTitleEn(state, action) {
    let postState = Object.assign({},state);
    if (postState.header) {
        if (postState.header.title) {
            postState.header.title.en = action.title;
        } else {
            postState.header.title = {en: action.title};
        }
    }
    return Object.assign({},state,postState);
}

export function setFooterTitlePl(state, action) {
    let postState = Object.assign({},state);
    if (postState.footer) {
        if (postState.footer.title) {
            postState.footer.title.pl = action.title;
        } else {
            postState.footer.title = {pl: action.title};
        }
    }
    return Object.assign({},state,postState);
}

export function setFooterTitleEn(state, action) {
    let postState = Object.assign({},state);
    if (postState.footer) {
        if (postState.footer.title) {
            postState.footer.title.en = action.title;
        } else {
            postState.footer.title = {en: action.title};
        }
    }
    return Object.assign({},state,postState);
}
