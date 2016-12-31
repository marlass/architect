import hasClass from './hasClass';

export function clickList(e, store) {
    if (hasClass(e.target,'block__up') || hasClass(e.target.parentNode,'block__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_BLOCK_UP', "blockId": id});
        }        
    }
    if (hasClass(e.target,'block__down') || hasClass(e.target.parentNode,'block__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_BLOCK_DOWN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'block__delete') || hasClass(e.target.parentNode,'block__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_BLOCK', "blockId": id});
    }
}
