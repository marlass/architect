import * as promisePolyfill from 'es6-promise';
promisePolyfill.polyfill();

import * as isomorphicFetch from 'isomorphic-fetch';
import * as redux from 'redux';
import actions from './actions.js';
import blockCreator from './blockCreator';

blockCreator();

const saveBtn = document.querySelector('.js__save-page');
const langSelect = document.querySelector('.js__lang-select');
const pageUrl = document.querySelector('.js__page-url');
const title = document.querySelector('.js__title');
const otherLangUrl = document.querySelector('.js__other-lang-url');


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

const store = redux.createStore(actions, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
                console.log(res);
            })
            .catch(function(res) {
                console.log('error2');
            });
    });
}

