import * as titlesHandler from './titlesHandler';
import * as yearHandler from './yearHandler';
import * as linkHandler from './linkHandler';

export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_HEADER_TITLE_PL': 
            return titlesHandler.setHeaderTitlePl(state, action);
        case 'SET_HEADER_TITLE_EN': 
            return titlesHandler.setHeaderTitleEn(state, action);
        case 'SET_FOOTER_TITLE_PL': 
            return titlesHandler.setFooterTitlePl(state, action);
        case 'SET_FOOTER_TITLE_EN': 
            return titlesHandler.setFooterTitleEn(state, action);
        case 'SET_FOOTER_YEAR':
            return yearHandler.setFooterYear(state, action);
        case 'SET_HEADER_LINK_PL_NAME':
            return linkHandler.setLinkName(state, action, 'pl', 'header');
        case 'SET_HEADER_LINK_PL_URL':
            return linkHandler.setLinkUrl(state, action, 'pl', 'header');
        case 'SET_HEADER_LINK_EN_NAME':
            return linkHandler.setLinkName(state, action, 'en', 'header');
        case 'SET_HEADER_LINK_EN_URL':
            return linkHandler.setLinkUrl(state, action, 'en', 'header');
        case 'SET_FOOTER_LINK_PL_NAME':
            return linkHandler.setLinkName(state, action, 'pl', 'footer');
        case 'SET_FOOTER_LINK_PL_URL':
            return linkHandler.setLinkUrl(state, action, 'pl', 'footer');
        case 'SET_FOOTER_LINK_EN_NAME':
            return linkHandler.setLinkName(state, action, 'en', 'footer');
        case 'SET_FOOTER_LINK_EN_URL':
            return linkHandler.setLinkUrl(state, action, 'en', 'footer');
        case 'CREATE_HEADER_LINK_PL':
            return linkHandler.createLink(state, action, 'pl', 'header');
        case 'CREATE_HEADER_LINK_EN':
            return linkHandler.createLink(state, action, 'en', 'header');
        case 'CREATE_FOOTER_LINK_PL':
            return linkHandler.createLink(state, action, 'pl', 'footer');
        case 'CREATE_FOOTER_LINK_EN':
            return linkHandler.createLink(state, action, 'en', 'footer');
        case 'SET_HEADER_LINK_PL_UP':
            return linkHandler.setLinkUp(state, action, 'pl', 'header');
        case 'SET_HEADER_LINK_EN_UP':
            return linkHandler.setLinkUp(state, action, 'en', 'header');
        case 'SET_FOOTER_LINK_PL_UP':
            return linkHandler.setLinkUp(state, action, 'pl', 'footer');
        case 'SET_FOOTER_LINK_EN_UP':
            return linkHandler.setLinkUp(state, action, 'en', 'footer');
        case 'SET_HEADER_LINK_PL_DOWN':
            return linkHandler.setLinkDown(state, action, 'pl', 'header');
        case 'SET_HEADER_LINK_EN_DOWN':
            return linkHandler.setLinkDown(state, action, 'en', 'header');
        case 'SET_FOOTER_LINK_PL_DOWN':
            return linkHandler.setLinkDown(state, action, 'pl', 'footer');
        case 'SET_FOOTER_LINK_EN_DOWN':
            return linkHandler.setLinkDown(state, action, 'en', 'footer');
        case 'DELETE_HEADER_LINK_PL':
            return linkHandler.deleteLink(state, action, 'pl', 'header');
        case 'DELETE_HEADER_LINK_EN':
            return linkHandler.deleteLink(state, action, 'en', 'header');
        case 'DELETE_FOOTER_LINK_PL':
            return linkHandler.deleteLink(state, action, 'pl', 'footer');
        case 'DELETE_FOOTER_LINK_EN':
            return linkHandler.deleteLink(state, action, 'en', 'footer');
        default:
            return state;
    }
}
