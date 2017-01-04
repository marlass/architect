import hasClass from './hasClass';

export function clickList(store, e) {
    // Office PL
    if (hasClass(e.target,'footerOfficePl__up') || hasClass(e.target.parentNode,'footerOfficePl__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_OFFICE_UP_PL', "blockId": id});
        }        
    }
    if (hasClass(e.target,'footerOfficePl__down') || hasClass(e.target.parentNode,'footerOfficePl__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_OFFICE_DOWN_PL', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'footerOfficePl__delete') || hasClass(e.target.parentNode,'footerOfficePl__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_OFFICE_PL', "blockId": id});
    }

    // Office EN
    if (hasClass(e.target,'footerOfficeEn__up') || hasClass(e.target.parentNode,'footerOfficeEn__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let prevBlock = block.previousSibling;
        if (block != block.parentNode.firstChild && prevBlock) {
            block.parentNode.insertBefore(block, prevBlock);
            store.dispatch({"type": 'SET_OFFICE_UP_EN', "blockId": id});
        }        
    }
    if (hasClass(e.target,'footerOfficeEn__down') || hasClass(e.target.parentNode,'footerOfficeEn__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let nextBlock = block.nextSibling;
        if (block != block.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, block);
            store.dispatch({"type": 'SET_OFFICE_DOWN_EN', "blockId": id});
        }       
        
    }
    if (hasClass(e.target,'footerOfficeEn__delete') || hasClass(e.target.parentNode,'footerOfficeEn__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let block = input.closest('.block');
        let parent = block.parentNode;
        parent.removeChild(block);
        store.dispatch({"type": 'DELETE_OFFICE_EN', "blockId": id});
    }

    // Add buttons
    if (hasClass(e.target, 'manageFooter__add-office-pl')) {
        let state = store.getState();
        let id = 0;
        if (state.footer && state.footer.offices && state.footer.offices.pl) {
            for (let i = 0; i<state.footer.offices.pl.length; i++){
                if (state.footer.offices.pl[i].blockId >= id) {
                    id = state.footer.offices.pl[i].blockId+1;
                }
            }
        }
        let html = `<button class="footerOfficePl__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="footerOfficePl__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="footerOfficePl__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p><label>Nazwa</label><input type="text" class="manageFooter__officePL-title" value="">
                    </p><p><label>Adres</label><input type="text" class="manageFooter__officePL-address" value="">
                    </p><p><label>Miejscowość</label><input type="text" class="manageFooter__officePL-city" value="">
                    </p><p><label>Kod pocztowy</label><input type="text" class="manageFooter__officePL-postal" value="">
                    </p><p><label>Telefon</label><input type="text" class="manageFooter__officePL-phone" value="">
                    </p><p><label>E-mail</label><input type="text" class="manageFooter__officePL-email" value="">
                    </p>`;
        let node = document.createElement('div');
        node.className = 'manageFooter__officeGroup block';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageFooter__officesPlContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_OFFICE_PL', "blockId": id});
    }

    if (hasClass(e.target, 'manageFooter__add-office-en')) {
        let state = store.getState();
        let id = 0;
        if (state.footer && state.footer.offices && state.footer.offices.en) {
            for (let i = 0; i<state.footer.offices.en.length; i++){
                if (state.footer.offices.en[i].blockId >= id) {
                    id = state.footer.offices.en[i].blockId+1;
                }
            }
        }
        let html = `<button class="footerOfficeEn__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
                    <button class="footerOfficeEn__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
                    <button class="footerOfficeEn__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <p><label>Nazwa</label><input type="text" class="manageFooter__officeEN-title" value="">
                    </p><p><label>Adres</label><input type="text" class="manageFooter__officeEN-address" value="">
                    </p><p><label>Miejscowość</label><input type="text" class="manageFooter__officeEN-city" value="">
                    </p><p><label>Kod pocztowy</label><input type="text" class="manageFooter__officeEN-postal" value="">
                    </p><p><label>Telefon</label><input type="text" class="manageFooter__officeEN-phone" value="">
                    </p><p><label>E-mail</label><input type="text" class="manageFooter__officeEN-email" value="">
                    </p>`;
        let node = document.createElement('div');
        node.className = 'manageFooter__officeGroup block';
        node.setAttribute('data-block-id',id);
        node.innerHTML = html;
        let container = document.querySelector('.manageFooter__officesENContainer');
        container.appendChild(node);
        store.dispatch({"type": 'CREATE_OFFICE_EN', "blockId": id});
    }
}

export function blurList(store, e) {
    if (hasClass(e.target,'manageFooter__officePL-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_TITLE_PL', "blockId": id, "title": title});
    }
    if (hasClass(e.target,'manageFooter__officePL-address')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let address = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_ADDRESS_PL', "blockId": id, "address": address});
    }
    if (hasClass(e.target,'manageFooter__officePL-city')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let city = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_CITY_PL', "blockId": id, "city": city});
    }
    if (hasClass(e.target,'manageFooter__officePL-postal')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let postal = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_POSTAL_PL', "blockId": id, "postal": postal});
    }
    if (hasClass(e.target,'manageFooter__officePL-phone')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let phone = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_PHONE_PL', "blockId": id, "phone": phone});
    }
    if (hasClass(e.target,'manageFooter__officePL-email')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let email = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_EMAIL_PL', "blockId": id, "email": email});
    }
    if (hasClass(e.target,'manageFooter__officeEN-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_TITLE_EN', "blockId": id, "title": title});
    }
    if (hasClass(e.target,'manageFooter__officeEN-address')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let address = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_ADDRESS_EN', "blockId": id, "address": address});
    }
    if (hasClass(e.target,'manageFooter__officeEN-city')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let city = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_CITY_EN', "blockId": id, "city": city});
    }
    if (hasClass(e.target,'manageFooter__officeEN-postal')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let postal = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_POSTAL_EN', "blockId": id, "postal": postal});
    }
    if (hasClass(e.target,'manageFooter__officeEN-phone')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let phone = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_PHONE_EN', "blockId": id, "phone": phone});
    }
    if (hasClass(e.target,'manageFooter__officeEN-email')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let email = e.target.value;
        store.dispatch({"type": 'SET_OFFICE_EMAIL_EN', "blockId": id, "email": email});
    }
}
