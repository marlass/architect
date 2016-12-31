import hasClass from './hasClass';

export function clickList(e, store) {
    
}

export function blurList(e, store) {
    if (hasClass(e.target,'block-text__text')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let text = e.target.value;
        store.dispatch({"type": 'SET_BLOCK_TEXT_TEXT', "blockId": id, "text": text});
    }

    if (hasClass(e.target,'block-text__background')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let background = e.target.value;
        store.dispatch({"type": 'SET_BLOCK_TEXT_BACKGROUND', "blockId": id, "background":  background});
    }
}
