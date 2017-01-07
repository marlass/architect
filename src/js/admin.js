import * as promisePolyfill from 'es6-promise';
promisePolyfill.polyfill();
import closestPolyfill from './closest.polyfill';
closestPolyfill();

import * as isomorphicFetch from 'isomorphic-fetch';
import * as redux from 'redux';

import actions from './actions.js';
import headerActions from './headerActions.js';
import blockCreator from './blockCreator';
import headerHandler from './headerHandler';

if (document.querySelector('.js-page__newPage')){
    var store = redux.createStore(actions, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    blockCreator(store,window.__IMAGES__, window.__TEAM__, window.__MASTHEAD__,window.__PAGES__);
} else if (document.querySelector('.js-page__manageHeader')) {
    var store = redux.createStore(headerActions, window.__PRESTATE__, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    headerHandler(store);
}

const saveHeaderBtn = document.querySelector('.manageHeader__saveButton');
const saveBtn = document.querySelector('.js__save-page');
const langSelect = document.querySelector('.js__lang-select');
const pageUrl = document.querySelector('.js__page-url');
const title = document.querySelector('.js__title');
const otherLangUrl = document.querySelector('.js__other-lang-url');

const deleteCatalogForms = document.querySelectorAll('.deleteCatalogForm');
const deletePhotoForms = document.querySelectorAll('.deletePhotoForm');
if (deleteCatalogForms) {
    for (let i=0; i<deleteCatalogForms.length;i++){
        deleteCatalogForms[i].addEventListener('submit', function(e){
            e.preventDefault();
            let result = window.confirm('Czy chcesz usunąć katalog i całą jego zawartość?');
            if (result) {
                e.target.submit();
            }
        });
    }
}
if (deletePhotoForms) {
    for (let i=0; i<deletePhotoForms.length;i++){
        deletePhotoForms[i].addEventListener('submit', function(e){
            e.preventDefault();
            let result = window.confirm('Czy chcesz usunąć obraz?');
            if (result) {
                e.target.submit();
            }
        });
    }
}


if (langSelect) {
    langSelect.addEventListener('change', function(e) {
        let lang = langSelect.options[langSelect.selectedIndex].value;
        store.dispatch({"type": 'SET_LANG',"lang": lang});
    });
}

if (pageUrl) {
    pageUrl.addEventListener('blur', function(e) {
        let url = pageUrl.value;
        store.dispatch({"type": 'SET_PAGE_URL', "url": url});
    });
}

if (title) {
    title.addEventListener('blur', function(e) {
        let title2 = title.value;
        store.dispatch({"type": 'SET_TITLE', "title": title2});
    });
}

if (otherLangUrl) {
    otherLangUrl.addEventListener('blur', function(e) {
        let url = otherLangUrl.value;
        store.dispatch({"type": 'SET_OTHER_LANG_URL',"url": url});
    });
}

if (saveBtn) {
    saveBtn.addEventListener('click', function(e){
        e.preventDefault();
        let req = {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify( store.getState()),
            credentials: 'same-origin'
        };
        
        fetch('/admin/savePage/', req)
            .then(function(res) {
            })
            .catch(function(res) {
            });
    });
}

if (saveHeaderBtn) {
    saveHeaderBtn.addEventListener('click', function(e){
        e.preventDefault();
        let req = {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify( store.getState()),
            credentials: 'same-origin'
        };
        
        fetch('/admin/saveHeader/', req)
            .then(function(res) {
            })
            .catch(function(res) {
            });
    });
}

