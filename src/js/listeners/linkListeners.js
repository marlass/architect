import hasClass from './../hasClass';

export function clickList(store, e) {
    // Header link PL
    if (hasClass(e.target,'headerLinkPl__up') || hasClass(e.target.parentNode,'headerLinkPl__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_HEADER_LINK_PL_UP', "blockId": id});
        }        
    }
    if (hasClass(e.target,'headerLinkPl__down') || hasClass(e.target.parentNode,'headerLinkPl__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_HEADER_LINK_PL_DOWN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'headerLinkPl__delete') || hasClass(e.target.parentNode,'headerLinkPl__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_HEADER_LINK_PL', "blockId": id});
    }

    //Header links EN
    if (hasClass(e.target,'headerLinkEn__up') || hasClass(e.target.parentNode,'headerLinkEn__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_HEADER_LINK_EN_UP', "blockId": id});
        }        
    }
    if (hasClass(e.target,'headerLinkEn__down') || hasClass(e.target.parentNode,'headerLinkEn__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_HEADER_LINK_EN_DOWN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'headerLinkEn__delete') || hasClass(e.target.parentNode,'headerLinkEn__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_HEADER_LINK_EN', "blockId": id});
    }

    //footer links PL
    if (hasClass(e.target,'footerLinkPl__up') || hasClass(e.target.parentNode,'footerLinkPl__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_FOOTER_LINK_PL_UP', "blockId": id});
        }        
    }
    if (hasClass(e.target,'footerLinkPl__down') || hasClass(e.target.parentNode,'footerLinkPl__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_FOOTER_LINK_PL_DOWN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'footerLinkPl__delete') || hasClass(e.target.parentNode,'footerLinkPl__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_FOOTER_LINK_PL', "blockId": id});
    }

    //footer links en
    if (hasClass(e.target,'footerLinkEn__up') || hasClass(e.target.parentNode,'footerLinkEn__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_FOOTER_LINK_EN_UP', "blockId": id});
        }        
    }
    if (hasClass(e.target,'footerLinkEn__down') || hasClass(e.target.parentNode,'footerLinkEn__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_FOOTER_LINK_EN_DOWN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'footerLinkEn__delete') || hasClass(e.target.parentNode,'footerLinkEn__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_FOOTER_LINK_EN', "blockId": id});
    }

    // Add buttons
    if (hasClass(e.target, 'manageHeader__add-link-pl')) {
        let state = store.getState();
        let id = 0;
        if (state.header && state.header.links && state.header.links.pl) {
            for (let i = 0; i<state.header.links.pl.length; i++){
                if (state.header.links.pl[i].blockId >= id) {
                    id = state.header.links.pl[i].blockId+1;
                }
            }
        }
        let html = `<button class="headerLinkPl__up headerManagment__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="headerLinkPl__down headerManagment__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="headerLinkPl__delete headerManagment__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Nazwa</label><input type="text" class="manageHeader__linkPL-title headerManagment__input--table" value="">
                    </p><p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Adres</label><input type="text" class="manageHeader__linkPL-url headerManagment__input--table" value=""></p>`;
        let node = document.createElement('div');
        node.className = 'manageHeader__linkGroup block u-clearfix';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageHeader__linksPlContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_HEADER_LINK_PL', "blockId": id});
    }
    if (hasClass(e.target, 'manageHeader__add-link-en')) {
        let state = store.getState();
        let id = 0;
        if (state.header && state.header.links && state.header.links.en) {
            for (let i = 0; i<state.header.links.en.length; i++){
                if (state.header.links.en[i].blockId >= id) {
                    id = state.header.links.en[i].blockId+1;
                }
            }
        }
        let html = `<button class="headerLinkEn__up headerManagment__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="headerLinkEn__down headerManagment__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="headerLinkEn__delete headerManagment__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Nazwa</label><input type="text" class="manageHeader__linkEN-title headerManagment__input--table" value="">
                    </p><p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Adres</label><input type="text" class="manageHeader__linkEN-url headerManagment__input--table" value=""></p>`;
        let node = document.createElement('div');
        node.className = 'manageHeader__linkGroup block u-clearfix';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageHeader__linksENContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_HEADER_LINK_EN', "blockId": id});
    }
    if (hasClass(e.target, 'manageFooter__add-link-pl')) {
        let state = store.getState();
        let id = 0;
        if (state.footer && state.footer.links && state.footer.links.pl) {
            for (let i = 0; i<state.footer.links.pl.length; i++){
                if (state.footer.links.pl[i].blockId >= id) {
                    id = state.footer.links.pl[i].blockId+1;
                }
            }
        }
        let html = `<button class="footerLinkPl__up headerManagment__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="footerLinkPl__down headerManagment__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="footerLinkPl__delete headerManagment__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Nazwa</label><input type="text" class="manageFooter__linkPL-title headerManagment__input--table" value="">
                    </p><p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Adres</label><input type="text" class="manageFooter__linkPL-url headerManagment__input--table" value=""></p>`;
        let node = document.createElement('div');
        node.className = 'manageFooter__linkGroup block u-clearfix';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageFooter__linksPlContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_FOOTER_LINK_PL', "blockId": id});
    }
    if (hasClass(e.target, 'manageFooter__add-link-en')) {
        let state = store.getState();
        let id = 0;
        if (state.footer && state.footer.links && state.footer.links.en) {
            for (let i = 0; i<state.footer.links.en.length; i++){
                if (state.footer.links.en[i].blockId >= id) {
                    id = state.footer.links.en[i].blockId+1;
                }
            }
        }
        let html = `<button class="footerLinkEn__up headerManagment__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="footerLinkEn__down headerManagment__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="footerLinkEn__delete headerManagment__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Nazwa</label><input type="text" class="manageFooter__linkEN-title headerManagment__input--table" value="">
                    </p><p class="headerManagment__wrapper--table"><label class="headerManagment__label--table">Adres</label><input type="text" class="manageFooter__linkEN-url headerManagment__input--table" value=""></p>`;
        let node = document.createElement('div');
        node.className = 'manageFooter__linkGroup block u-clearfix';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageFooter__linksENContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_FOOTER_LINK_EN', "blockId": id});
    }
}

export function blurList(store, e) {
    if (hasClass(e.target,'manageHeader__linkPL-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let name = e.target.value;
        store.dispatch({"type": 'SET_HEADER_LINK_PL_NAME', "blockId": id, "name": name});
    }
    if (hasClass(e.target,'manageHeader__linkPL-url')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url = e.target.value;
        store.dispatch({"type": 'SET_HEADER_LINK_PL_URL', "blockId": id, "url": url});
    }
    if (hasClass(e.target,'manageHeader__linkEN-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let name = e.target.value;
        store.dispatch({"type": 'SET_HEADER_LINK_EN_NAME', "blockId": id, "name": name});
    }
    if (hasClass(e.target,'manageHeader__linkEN-url')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url = e.target.value;
        store.dispatch({"type": 'SET_HEADER_LINK_EN_URL', "blockId": id, "url": url});
    }
    if (hasClass(e.target,'manageFooter__linkPL-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let name = e.target.value;
        store.dispatch({"type": 'SET_FOOTER_LINK_PL_NAME', "blockId": id, "name": name});
    }
    if (hasClass(e.target,'manageFooter__linkPL-url')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url = e.target.value;
        store.dispatch({"type": 'SET_FOOTER_LINK_PL_URL', "blockId": id, "url": url});
    }
    if (hasClass(e.target,'manageFooter__linkEN-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let name = e.target.value;
        store.dispatch({"type": 'SET_FOOTER_LINK_EN_NAME', "blockId": id, "name": name});
    }
    if (hasClass(e.target,'manageFooter__linkEN-url')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url = e.target.value;
        store.dispatch({"type": 'SET_FOOTER_LINK_EN_URL', "blockId": id, "url": url});
    }
}
