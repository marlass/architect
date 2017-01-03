import * as blockTextHandler from './blockTextHandler';
import * as blockMastheadHandler from './blockMastheadHandler';
import blockCreationHandler from './blockCreationHandler';
import * as blockHandler from './blockHandler';

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
        case 'SET_BLOCK_MASTHEAD_TITLE':
            return blockMastheadHandler.setTitle(state, action);
        case 'SET_BLOCK_MASTHEAD_BACKGROUND':
            return blockMastheadHandler.setBackground(state, action);
        case 'SET_BLOCK_UP':
            return blockHandler.setUp(state, action);
        case 'SET_BLOCK_DOWN':
            return blockHandler.setDown(state, action);
        case 'DELETE_BLOCK':
            return blockHandler.deleteBlock(state, action);
        default:
            return state;
    }
}
