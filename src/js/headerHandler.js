import * as linkListeners from './linkListeners'; 
import * as officeListeners from './officeListeners';

export default function(store) {

    document.addEventListener('click', function (e) {
        linkListeners.clickList(store, e);
        officeListeners.clickList(store, e);
    }, true);

    document.addEventListener('blur', function (e) {
        linkListeners.blurList(store, e);
        officeListeners.blurList(store, e);
    }, true);

    let inputHeaderTitlePl = document.querySelector('.manageHeader__title-pl');
    if (inputHeaderTitlePl) {
        inputHeaderTitlePl.addEventListener('blur', function(e) {
            let title = inputHeaderTitlePl.value;
            store.dispatch({"type": 'SET_HEADER_TITLE_PL', "title": title});
        });
    }

    let inputHeaderTitleEn = document.querySelector('.manageHeader__title-en');
    if (inputHeaderTitleEn) {
        inputHeaderTitleEn.addEventListener('blur', function(e) {
            let title = inputHeaderTitleEn.value;
            store.dispatch({"type": 'SET_HEADER_TITLE_EN', "title": title});
        });
    }

    let inputFooterTitlePl = document.querySelector('.manageFooter__title-pl');
    if (inputFooterTitlePl) {
        inputFooterTitlePl.addEventListener('blur', function(e) {
            let title = inputFooterTitlePl.value;
            store.dispatch({"type": 'SET_FOOTER_TITLE_PL', "title": title});
        });
    }

    let inputFooterTitleEn = document.querySelector('.manageFooter__title-en');
    if (inputFooterTitleEn) {
        inputFooterTitleEn.addEventListener('blur', function(e) {
            let title = inputFooterTitleEn.value;
            store.dispatch({"type": 'SET_FOOTER_TITLE_EN', "title": title});
        });
    }

    let inputFooterYear= document.querySelector('.manageFooter__year');
    if (inputFooterYear) {
        inputFooterYear.addEventListener('blur', function(e) {
            let year = inputFooterYear.value;
            store.dispatch({"type": 'SET_FOOTER_YEAR', "year": year});
        });
    }
}
