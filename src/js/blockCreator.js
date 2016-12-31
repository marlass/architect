import * as blockTextListeners from './blockTextListeners';
import * as block from './blockListeners';


export default function(store) {
    const newBlockSubmit = document.querySelector('.new-block__submit');
    const newBlockSelect = document.querySelector('.new-block__select');

    document.addEventListener('click', function (e) {
        blockTextListeners.clickList(e, store);
        block.clickList(e, store);
    }, true);

    document.addEventListener('blur', function (e) {
        blockTextListeners.blurList(e, store);
    }, true);

    let idCounter = 0;

    if (newBlockSubmit) {
        newBlockSubmit.addEventListener('click', function(){
            const newBlock = newBlockSelect.options[newBlockSelect.selectedIndex].value;
            newBlockHTML(newBlock);    
            store.dispatch({"type": 'CREATE_BLOCK', "blockId": idCounter-1, "sectionType": newBlock});
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
        /*let selector = '[data-block-id="'+(idCounter-1)+'"] .block-text__text';
        let newTextarea = document.querySelector(selector);
        if (newTextarea) {
            let mdeditor = new SimpleMDE(
                {element: newTextarea,
                autoDownloadFontAwesome: false});
        }*/
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
                return renderSmallOffciesBase();
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
                    <input type="text" name="block-masthead__input block-masthead__title" placeholder="np. Projekty">
                </div>
                <div class="block-masthead__wrapper">
                    <label class="block-masthead__label">Zdjęcie okładki</label>
                    <input type="file" name="block-masthead__background" class="blokc-masthead__file">
                </div>
                <img src="#" class="block-masthead__preview">
            </div>`;
    }

    function renderTextBase() {
        return `
            <div class="block-text">
                <div class="block-text__wrapper">
                    <label class="block-text__label">Tło</label>
                    <input type="text" name ="block-text__background" class="block-text__input block-text__background" placeholder="np. white">
                </div>
                <div class="block-text__wrapper">
                    <label class="block-text__label">Treść</label>
                    <textarea name="block-text__text" class="block-text__text" placeholder="np. Informacje o ofercie"></textarea>
                </div>
            </div>`;
    }
}
