import * as blockTextHandler from './../handlers/blockTextHandler';
import * as blockMastheadHandler from './../handlers/blockMastheadHandler';
import * as blockOfficesHandler from './../handlers/blockOfficesHandler';
import * as blockGalleryHandler from './../handlers/blockGalleryHandler';
import * as blockProjectsHandler from './../handlers/blockProjectsHandler';
import blockCreationHandler from './../handlers/blockCreationHandler';
import * as blockHandler from './../handlers/blockHandler';

export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_PAGE_URL': 
            return Object.assign({}, state, {"pageUrl": action.url});
        case 'SET_TITLE':
            return Object.assign({}, state, {"title": action.title});
        case 'SET_LANG':
            return Object.assign({}, state, {"lang": action.lang});
        case 'SET_OTHER_LANG_URL':
            return Object.assign({}, state, {"secondurl": action.url});
        case 'SET_PAGE_DESCRIPTION':
            return Object.assign({}, state, {"description": action.description});
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
        case 'SET_BLOCK_OFFICES_SECTION_TITLE':
            return blockOfficesHandler.setSectionTitle(state, action);
        case 'SET_BLOCK_OFFICES_SECTION_LINK_TITLE':
            return blockOfficesHandler.setSectionLinkTitle(state, action);
        case 'SET_BLOCK_OFFICES_SECTION_LINK_URL':
            return blockOfficesHandler.setSectionLinkUrl(state, action);
        case 'SET_BLOCK_OFFICES_TITLE':
            return blockOfficesHandler.setTitle(state, action);
        case 'SET_BLOCK_OFFICES_ADDRESS':
            return blockOfficesHandler.setAddress(state, action);
        case 'SET_BLOCK_OFFICES_CITY':
            return blockOfficesHandler.setCity(state, action);
        case 'SET_BLOCK_OFFICES_POSTAL':
            return blockOfficesHandler.setPostal(state, action);
        case 'SET_BLOCK_OFFICES_PHONE':
            return blockOfficesHandler.setPhone(state, action);
        case 'SET_BLOCK_OFFICES_EMAIL':
            return blockOfficesHandler.setEmail(state, action);
        case 'SET_BLOCK_OFFICES_MAP':
            return blockOfficesHandler.setMap(state, action);
        case 'SET_OFFICE_UP':
            return blockOfficesHandler.setUp(state, action);
        case 'SET_OFFICE_DOWN':
            return blockOfficesHandler.setDown(state, action);
        case 'DELETE_OFFICE':
            return blockOfficesHandler.deleteOffice(state, action);
        case 'CREATE_OFFICE':
            return blockOfficesHandler.createOffice(state, action);
        case 'SET_IMAGE_TITLE':
            return blockGalleryHandler.setTitle(state, action);
        case 'SET_IMAGE':
            return blockGalleryHandler.setImage(state, action);
        case 'SET_IMAGE_UP':
            return blockGalleryHandler.setUp(state, action);
        case 'SET_IMAGE_DOWN':
            return blockGalleryHandler.setDown(state, action);
        case 'DELETE_IMAGE':
            return blockGalleryHandler.deleteImage(state, action);
        case 'CREATE_IMAGE':
            return blockGalleryHandler.createImage(state, action);
        case 'SET_BLOCK_GALLERY_TITLE':
            return blockGalleryHandler.setBlockTitle(state, action);
        case 'SET_PROJECT_TITLE':
            return blockProjectsHandler.setTitle(state, action);
        case 'SET_PROJECT_IMAGE':
            return blockProjectsHandler.setImg(state, action);
        case 'SET_PROJECT_PAGE':
            return blockProjectsHandler.setPage(state, action);
        case 'SET_PROJECT_BIG':
            return blockProjectsHandler.setBig(state, action);
        case 'SET_PROJECT_UP':
            return blockProjectsHandler.setUp(state, action);
        case 'SET_PROJECT_DOWN':
            return blockProjectsHandler.setDown(state, action);
        case 'DELETE_PROJECT':
            return blockProjectsHandler.deleteProject(state, action);
        case 'CREATE_PROJECT':
            return blockProjectsHandler.createProject(state, action);
        case 'SET_BLOCK_PROJECT_LINK_TITLE':
            return blockProjectsHandler.setBlockLinkTitle(state, action);
        case 'SET_BLOCK_PROJECT_LINK_URL':
            return blockProjectsHandler.setBlockLinkUrl(state, action);
        default:
            return state;
    }
}
