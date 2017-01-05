import * as blockTextListeners from './blockTextListeners';
import * as blockMastheadListeners from './blockMastheadListeners';
import * as blockOfficesListeners from './blockOfficesListeners';
import * as block from './blockListeners';


export default function(store) {
    const newBlockSubmit = document.querySelector('.new-block__submit');
    const newBlockSelect = document.querySelector('.new-block__select');

    document.addEventListener('click', function (e) {
        blockTextListeners.clickList(e, store);
        blockMastheadListeners.clickList(e, store);
        blockOfficesListeners.clickList(e, store);
        block.clickList(e, store);
    }, true);

    document.addEventListener('blur', function (e) {
        blockTextListeners.blurList(e, store);
        blockMastheadListeners.blurList(e, store);
        blockOfficesListeners.blurList(e, store);
    }, true);

    document.addEventListener('change', function (e) {
        blockMastheadListeners.changeList(e, store);
    }, true);

    let idCounter = 0;

    if (newBlockSubmit) {
        newBlockSubmit.addEventListener('click', function(){
            const newBlock = newBlockSelect.options[newBlockSelect.selectedIndex].value;    
            store.dispatch({"type": 'CREATE_BLOCK', "blockId": idCounter-1, "sectionType": newBlock});
            newBlockHTML(newBlock);
    });
    }

    function newBlockHTML(block) {
        let html = `
            <button class="block__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="block__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="block__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="block__content">
                ${renderBlockBase(block)}
            </div>`;
        let node = document.createElement('div');
        node.className = 'block';
        node.setAttribute('data-block-id',idCounter++);
        node.innerHTML = html;
        let container = document.querySelector('.block-container');
        container.appendChild(node);
        postRenderFunction(block, idCounter-1);
        /*let selector = '[data-block-id="'+(idCounter-1)+'"] .block-text__text';
        let newTextarea = document.querySelector(selector);
        if (newTextarea) {
            let mdeditor = new SimpleMDE(
                {element: newTextarea,
                autoDownloadFontAwesome: false});
        }*/
    }

    function postRenderFunction(block, blockId) {    
        switch (block) {
            case "masthead":
                mastHeadpost(blockId);
                break;
            case "offices":
                officePost(blockId);
                break;
            default:
                break;
        }
    }

    function mastHeadpost(blockId) {
        let details = {
            'dir': 'masthead'
        };
        let formBody = [];
        for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let req = {
            method: 'POST',
            mode: 'same-origin',
            headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: formBody,
            credentials: 'same-origin'
        };
        
        fetch('/admin/getPhotos/', req)
            .then(function(res) {
                return res.json();
            })
            .then(function(json){
                let html = '<h2>Wybierz tło</h2>';
                var timestamp = Date.now();
                json.forEach(function(element) {
                    html += '<label for="'+timestamp+element+'"><img style="width:150px;height:150px;object-fit:cover;float:left" src="/static/uploads/masthead/'+element+'"></label><input type="radio" name="background" class="block-masthead__background" id="'+timestamp+element+'" value="'+element+'">';
                }, this);
                let qs = `[data-block-id="${blockId}"] .block-masthead__bg-wrapper`;
                let radioContainer = document.querySelector(qs);
                if (radioContainer) {
                    let p = document.createElement('div');
                    p.innerHTML = html;
                    radioContainer.appendChild(p);
                }
            })
            .catch(function(res) {
            });
    }
    function officePost(blockId) {
        store.dispatch({"type": 'CREATE_OFFICE', blockId: blockId, subblockId: "0",});
    }

    function renderBlockBase(block) {
        switch (block) {
            case "masthead":
                return renderMastheadBase();
            case "text":
                return renderTextBase();
            case "calc":
                return renderCalcBase();
            case "offices":
                return renderOfficesBase();
            case "team":
                return renderTeamBase();
            case "projectsBlock":
                return renderProjectsBase();
            case "smallOffices":
                return renderSmallOfficesBase();
            case "gallery":
                return renderGalleryBase();
            default:
                return '';
        }
    }

    function renderMastheadBase() {        
        return `
            <div class="block-masthead">
                <div class="block-masthead__wrapper">
                    <label class="block-masthead__label">Tytuł</label>
                    <input type="text" name="block-masthead__title" class="block-masthead__input block-masthead__title" placeholder="np. Projekty">
                </div>
                <div class="block-masthead__bg-wrapper u-clearfix">
                </div>
            </div>`;
    }

    function renderTextBase() {
        return `
            <div class="block-text">
                <div class="block-text__wrapper">
                    <label class="block-text__label">Tło</label>
                    <input type="text" name="block-text__background" class="block-text__input block-text__background" placeholder="np. white">
                </div>
                <div class="block-text__wrapper">
                    <label class="block-text__label">Treść</label>
                    <textarea name="block-text__text" class="block-text__text" placeholder="np. Informacje o ofercie"></textarea>
                </div>
            </div>`;
    }

    function renderOfficesBase() {
        return `<div class="officesBlock-container"><div class="subblock" data-subblock-id="0">
            <button class="officeBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="officeBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="officeBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="office">
                <div class="block-office__wrapper">
                    <label class="block-office__label">Tytuł biura</label>
                    <input type="text" name="block-office__title" class="block-office__text block-office__title" placeholder="np. Siedziba">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Adres</label>
                    <input type="text" name="blokc-office__address" class="block-office__text block-office__address" placeholder="np. ul. 3 Maja 60">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Miejscowość</label>
                    <input type="text" name="block-office__city" class="block-office__city block-office__text" placeholder="np. Wrocław">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Kod pocztowy</label>
                    <input type="text" name="block-office__postal" class="block-office__text block-office__postal" placeholder=" np. 50-000">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Telefon</label>
                    <input type="text" name="block-office__phone" class="block-office__text block-office__phone" placeholder="np. 123 456 789">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Email</label>
                    <input type="text" name="block-office__email" class="block-office__text block-office__email" placeholder="np. kontakt@architekt.com">
                </div>
            </div>
        </div>
        <button class="addOfficeButton">Dodaj biuro</button>
        </div>`;
    }
}
