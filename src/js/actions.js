import * as blockTextHandler from './blockTextHandler';
import blockCreationHandler from './blockCreationHandler';

export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_PAGE_URL': 
            return Object.assign({}, state, {"pageUrl": action.url});
        case 'SET_TITLE':
            return Object.assign({}, state, {"title": action.title});
        case 'SET_LANG':
            return Object.assign({}, state, {"lang": action.lang});
        case 'SET_OTHER_LANG_URL':
            return Object.assign({}, state, {"otherLangPageUrl": action.url});
        case 'CREATE_BLOCK':
            return blockCreationHandler(state, action);
        case 'SET_BLOCK_TEXT_TEXT':
            return blockTextHandler.setText(state, action);
        case 'SET_BLOCK_TEXT_BACKGROUND':
            return blockTextHandler.setBackground(state, action);
        default:
            return state;
    }
}
