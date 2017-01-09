import * as titlesHandler from './../handlers/titlesHandler';
import * as yearHandler from './../handlers/yearHandler';
import * as linkHandler from './../handlers/linkHandler';
import * as officeHandler from './../handlers/officeHandler';

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
        case 'SET_OFFICE_TITLE_PL':
            return officeHandler.setOfficeTitle(state, action, 'pl');
        case 'SET_OFFICE_ADDRESS_PL':
            return officeHandler.setOfficeAddress(state, action, 'pl');
        case 'SET_OFFICE_CITY_PL':
            return officeHandler.setOfficeCity(state, action, 'pl');
        case 'SET_OFFICE_POSTAL_PL':
            return officeHandler.setOfficePostal(state, action, 'pl');
        case 'SET_OFFICE_PHONE_PL':
            return officeHandler.setOfficePhone(state, action, 'pl');
        case 'SET_OFFICE_EMAIL_PL':
            return officeHandler.setOfficeEmail(state, action, 'pl');
        case 'SET_OFFICE_TITLE_EN':
            return officeHandler.setOfficeTitle(state, action, 'en');
        case 'SET_OFFICE_ADDRESS_EN':
            return officeHandler.setOfficeAddress(state, action, 'en');
        case 'SET_OFFICE_CITY_EN':
            return officeHandler.setOfficeCity(state, action, 'en');
        case 'SET_OFFICE_POSTAL_EN':
            return officeHandler.setOfficePostal(state, action, 'en');
        case 'SET_OFFICE_PHONE_EN':
            return officeHandler.setOfficePhone(state, action, 'en');
        case 'SET_OFFICE_EMAIL_EN':
            return officeHandler.setOfficeEmail(state, action, 'en');
        case 'CREATE_OFFICE_EN':
            return officeHandler.createOffice(state, action, 'en');
        case 'CREATE_OFFICE_PL':
            return officeHandler.createOffice(state, action, 'pl');
        case 'DELETE_OFFICE_PL':
            return officeHandler.deleteOffice(state, action, 'pl');
        case 'DELETE_OFFICE_EN':
            return officeHandler.deleteOffice(state, action, 'en');
        case 'SET_OFFICE_UP_PL':
            return officeHandler.setOfficeUp(state, action, 'pl');
        case 'SET_OFFICE_UP_EN':
            return officeHandler.setOfficeUp(state, action, 'en');
        case 'SET_OFFICE_DOWN_PL':
            return officeHandler.setOfficeDown(state, action, 'pl');
        case 'SET_OFFICE_DOWN_EN':
            return officeHandler.setOfficeDown(state, action, 'en');
        default:
            return state;
    }
}
