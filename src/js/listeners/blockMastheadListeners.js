import hasClass from './../hasClass';

export function clickList(e, store) {    
}

export function blurList(e, store) {
    if (hasClass(e.target,'block-masthead__title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_BLOCK_MASTHEAD_TITLE', blockId: id, title: title});
    }
}

export function changeList(e, store) {
    if (hasClass(e.target,'block-masthead__background')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let bg = e.target.value;
        store.dispatch({type: 'SET_BLOCK_MASTHEAD_BACKGROUND', blockId: id, background: bg});
    }
}
