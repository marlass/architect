import hasClass from './../hasClass';

export function clickList(e, store) {
    if (hasClass(e.target,'officeBlock__up') || hasClass(e.target.parentNode,'officeBlock__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let prevBlock = subblock.previousSibling;
        if (subblock != subblock.parentNode.firstChild && prevBlock) {
            subblock.parentNode.insertBefore(subblock, prevBlock);
            store.dispatch({type: 'SET_OFFICE_UP', blockId: id, subblockId: subblockId});
        }        
    }

    if (hasClass(e.target,'officeBlock__down') || hasClass(e.target.parentNode,'officeBlock__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let nextBlock = subblock.nextSibling;
        if (subblock != subblock.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, subblock);
            store.dispatch({type: 'SET_OFFICE_DOWN', blockId: id, subblockId: subblockId});
        }       
        
    }

    if (hasClass(e.target,'officeBlock__delete') || hasClass(e.target.parentNode,'officeBlock__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let parent = subblock.parentNode;
        parent.removeChild(subblock);
        store.dispatch({type: 'DELETE_OFFICE', blockId: id, subblockId: subblockId});
    }

    if (hasClass(e.target, 'addOfficeButton')) {
        let state = store.getState();
        let blockId = e.target.closest('.block').getAttribute('data-block-id');
        let id = 0;
        let blockIndex = 0;
        if (state.content) {
            for (let i= 0; i<state.content.length; i++) {
                if (state.content[i].blockId == blockId) {
                    blockIndex = i;
                    break;
                }
            }
            if (state.content[blockIndex].content) {
                for (let i = 0; i < state.content[blockIndex].content.length; i++) {
                    if (state.content[blockIndex].content[i].subBlockId >= id) {
                        id = state.content[blockIndex].content[i].subBlockId + 1;
                    }
                }
            }
        }
        let html = `<button class="officeBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="officeBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="officeBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="office">
                <div class="block-office__wrapper">
                    <label class="block-office__label">Tytuł biura</label>
                    <input type="text" name="block-office__title-${blockId}-${id}" class="block-office__text block-office__title" placeholder="np. Siedziba">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Adres</label>
                    <input type="text" name="block-office__address-${blockId}-${id}" class="block-office__text block-office__address" placeholder="np. ul. 3 Maja 60">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Miejscowość</label>
                    <input type="text" name="block-office__city-${blockId}-${id}" class="block-office__city block-office__text" placeholder="np. Wrocław">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Kod pocztowy</label>
                    <input type="text" name="block-office__postal-${blockId}-${id}" class="block-office__text block-office__postal" placeholder=" np. 50-000">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Telefon</label>
                    <input type="text" name="block-office__phone-${blockId}-${id}" class="block-office__text block-office__phone" placeholder="np. 123 456 789">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Email</label>
                    <input type="text" name="block-office__email-${blockId}-${id}" class="block-office__text block-office__email" placeholder="np. kontakt@architekt.com">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Link do mapy</label>
                    <input type="text" name="block-office__map-${blockId}-${id}" class="block-office__text block-office__map" placeholder="">
                </div>
            </div>`;
        let node = document.createElement('div');
        node.className = 'subblock  officeBlock__subblock';
        node.setAttribute('data-subblock-id',id);
        node.innerHTML = html;
        let qs = '[data-block-id="'+blockId+'"] .officesBlock-container';
        let container = document.querySelector(qs);
        container.appendChild(node);
        store.dispatch({type: 'CREATE_OFFICE', blockId: blockId, subblockId: id});
    }

    if (hasClass(e.target, 'addSmallOfficeButton')) {
        let state = store.getState();
        let blockId = e.target.closest('.block').getAttribute('data-block-id');
        let id = 0;
        let blockIndex = 0;
        if (state.content) {
            for (let i= 0; i<state.content.length; i++) {
                if (state.content[i].blockId === blockId) {
                    blockIndex = i;
                    break;
                }
            }
            if (state.content[blockIndex].content) {
                for (let i = 0; i < state.content[blockIndex].content.length; i++) {
                    if (state.content[blockIndex].content[i].subBlockId >= id) {
                        id = state.content[blockIndex].content[i].subBlockId + 1;
                    }
                }
            }
        }
        let html = `<button class="officeBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="officeBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="officeBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="office">
                <div class="block-office__wrapper">
                    <label class="block-office__label">Tytuł biura</label>
                    <input type="text" name="block-office__title-${blockId}-${id}" class="block-office__text block-office__title" placeholder="np. Siedziba">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Adres</label>
                    <input type="text" name="block-office__address-${blockId}-${id}" class="block-office__text block-office__address" placeholder="np. ul. 3 Maja 60">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Miejscowość</label>
                    <input type="text" name="block-office__city-${blockId}-${id}" class="block-office__city block-office__text" placeholder="np. Wrocław">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Kod pocztowy</label>
                    <input type="text" name="block-office__postal-${blockId}-${id}" class="block-office__text block-office__postal" placeholder=" np. 50-000">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Telefon</label>
                    <input type="text" name="block-office__phone-${blockId}-${id}" class="block-office__text block-office__phone" placeholder="np. 123 456 789">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Email</label>
                    <input type="text" name="block-office__email-${blockId}-${id}" class="block-office__text block-office__email" placeholder="np. kontakt@architekt.com">
                </div>
            </div>`;
        let node = document.createElement('div');
        node.className = 'subblock officeBlock__subblock';
        node.setAttribute('data-subblock-id',id);
        node.innerHTML = html;
        let qs = '[data-block-id="'+blockId+'"] .officesBlock-container';
        let container = document.querySelector(qs);
        container.appendChild(node);
        store.dispatch({type: 'CREATE_OFFICE', blockId: blockId, subblockId: id});
    }
}

export function blurList(e, store) {
    if (hasClass(e.target,'block-office__title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_TITLE', blockId: id, subblockId: subBlock, title: title});
    }
    if (hasClass(e.target,'block-offices__section-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_SECTION_TITLE', blockId: id, title: title});
    }
    if (hasClass(e.target,'block-office__more-offices-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_SECTION_LINK_TITLE', blockId: id, title: title});
    }
    if (hasClass(e.target,'block-office__address')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let address = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_ADDRESS', blockId: id, subblockId: subBlock, address: address});
    }
    if (hasClass(e.target,'block-office__city')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let city = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_CITY', blockId: id,subblockId: subBlock, city: city});
    }
    if (hasClass(e.target,'block-office__postal')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let postal = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_POSTAL', blockId: id, subblockId: subBlock, postal: postal});
    }
    if (hasClass(e.target,'block-office__phone')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let phone = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_PHONE', blockId: id, subblockId: subBlock, phone: phone});
    }
    if (hasClass(e.target,'block-office__email')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let email = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_EMAIL', blockId: id, subblockId: subBlock, email: email});
    }
    if (hasClass(e.target,'block-office__map')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let map = e.target.value;
        store.dispatch({type: 'SET_BLOCK_OFFICES_MAP', blockId: id, subblockId: subBlock, map: map});
    }
}

export function changeList(e, store) {
    if (hasClass(e.target,'block-office__more-link')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url2 = e.target.options[e.target.selectedIndex].value;;
        store.dispatch({type: 'SET_BLOCK_OFFICES_SECTION_LINK_URL', blockId: id, url: url2});
    }
}

