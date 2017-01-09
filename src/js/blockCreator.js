import * as blockTextListeners from './blockTextListeners';
import * as blockMastheadListeners from './blockMastheadListeners';
import * as blockOfficesListeners from './blockOfficesListeners';
import * as blockGalleryListeners from './blockGalleryListeners';
import * as blockProjectsListeners from './blockProjectsListeners';
import * as block from './blockListeners';


export default function(store, catalog, team, masthead, pages) {
    const newBlockSubmit = document.querySelector('.new-block__submit');
    const newBlockSelect = document.querySelector('.new-block__select');

    document.addEventListener('click', function (e) {
        blockTextListeners.clickList(e, store);
        blockMastheadListeners.clickList(e, store);
        blockGalleryListeners.clickList(e, store, catalog, team);
        blockOfficesListeners.clickList(e, store);
        blockProjectsListeners.clickList(e, store, catalog, pages);
        block.clickList(e, store);
    }, true);

    document.addEventListener('blur', function (e) {
        blockTextListeners.blurList(e, store);
        blockMastheadListeners.blurList(e, store);
        blockGalleryListeners.blurList(e, store);
        blockOfficesListeners.blurList(e, store);
        blockProjectsListeners.blurList(e, store);
    }, true);

    document.addEventListener('change', function (e) {
        blockMastheadListeners.changeList(e, store);
        blockGalleryListeners.changeList(e, store);
        blockProjectsListeners.changeList(e, store);
        blockOfficesListeners.changeList(e, store);
    }, true);

    let idCounter = 0;

    if (newBlockSubmit) {
        newBlockSubmit.addEventListener('click', function(){
            const newBlock = newBlockSelect.options[newBlockSelect.selectedIndex].value;    
            store.dispatch({"type": 'CREATE_BLOCK', "blockId": idCounter, "sectionType": newBlock});
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
        node.setAttribute('data-block-id',idCounter);
        node.innerHTML = html;
        let container = document.querySelector('.block-container');
        container.appendChild(node);
        postRenderFunction(block, idCounter);
        idCounter += 1;
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
            case "smallOffices":
                smallOfficePost(blockId);
                officePost(blockId);
                break;
            case "gallery":
                galleryPost(blockId);
                break;
            case "team":
                teamPost(blockId);
                break;
            case "projectsBlock":
                projectsPost(blockId);
                break;
            default:
                break;
        }
    }

    function mastHeadpost(blockId) {
        let html = '<h2>Wybierz tło</h2>';
        masthead.forEach(function(element) {
            html += '<label for="'+blockId+'-'+element+'"><img style="width:150px;height:150px;object-fit:cover;float:left" src="/static/uploads/masthead/'+element+'"></label><input type="radio" name="background'+blockId+'" class="block-masthead__background" id="'+blockId+'-'+element+'" value="'+element+'">';
        }, this);
        let qs = `[data-block-id="${blockId}"] .block-masthead__bg-wrapper`;
        let radioContainer = document.querySelector(qs);
        if (radioContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            radioContainer.appendChild(p);
        }
    }

    function officePost(blockId) {
        store.dispatch({"type": 'CREATE_OFFICE', blockId: blockId, subblockId: 0,});
    }

    function smallOfficePost(blockId) {
        let html = '<label>Wybierz link do strony kontaktu</label><select name="block-office__more-link" class="block-office__more-link"><option value="" disabled selected>Wybierz stronę kontaktową</option>';
        pages.forEach(function(page) {
            html += '<option value="'+page+'">'+page+'</option>';
        }, this);
        html += '</select>';
        let qs = `[data-block-id="${blockId}"] .block-office__wrapper-more-link`;
        let selectContainer2 = document.querySelector(qs);
        if (selectContainer2) {
            let p = document.createElement('div');
            p.innerHTML = html;
            selectContainer2.appendChild(p);
        }
    }

    function galleryPost(blockId) {
        let html = '';
        let timestamp = Date.now();
        catalog.forEach(function(dir){
            let subhtml = '';
            dir.photos.forEach(function(pic) {
                subhtml += '<label for="'+timestamp+dir.path+'/'+pic.path+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label><input type="radio" name="img'+blockId+'-0" class="block-gallery__image" id="'+timestamp+dir.path+'/'+pic.path+'" value="'+dir.path+'/'+pic.path+'">';
            }, this);
            html += '<div class="dir">'+subhtml+'</div>';
        }, this);
        let qs = `[data-block-id="${blockId}"] .block-gallery__wrapper-image`;
        let radioContainer = document.querySelector(qs);
        if (radioContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            radioContainer.appendChild(p);
        }
        store.dispatch({"type": 'CREATE_IMAGE', blockId: blockId, subblockId: 0});
    }

    function teamPost(blockId) {
        let timestamp = Date.now();
        let html = '';
        team.forEach(function(pic) {
            html += '<label for="'+timestamp+pic+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/team/'+pic+'"></label><input type="radio" name="img'+blockId+'-0" class="block-gallery__image" id="'+timestamp+pic+'" value="'+pic+'">';
        }, this);
        let qs = `[data-block-id="${blockId}"] .block-gallery__wrapper-image`;
        let radioContainer = document.querySelector(qs);
        if (radioContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            radioContainer.appendChild(p);
        }
        store.dispatch({"type": 'CREATE_IMAGE', blockId: blockId, subblockId: 0});
    }

    function projectsPost(blockId) {
        let html = '';
        let timestamp = Date.now();
        catalog.forEach(function(dir){
            let subhtml = '';
            dir.photos.forEach(function(pic) {
                subhtml += '<label for="'+timestamp+dir.path+'/'+pic.path+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label><input type="radio" name="img'+blockId+'-0" class="block-project__image" id="'+timestamp+dir.path+'/'+pic.path+'" value="'+dir.path+'/'+pic.path+'">';
            }, this);
            html += '<div class="dir">'+subhtml+'</div>';
        }, this);
        let qs = `[data-block-id="${blockId}"] .block-project__wrapper-image`;
        let radioContainer = document.querySelector(qs);
        if (radioContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            radioContainer.appendChild(p);
        }

        html = '<label for="block-project__page-0">Wybierz stronę projektu</label><select name="block-project__page-0" class="block-project__page" id="block-project__page-0"><option value="" disabled selected>Wybierz stronę projektu</option>';
        pages.forEach(function(page) {
            html += '<option value="'+page+'">'+page+'</option>';
        }, this);
        html += '</select>';
        qs = `[data-block-id="${blockId}"] .block-project__wrapper-select`;
        let selectContainer = document.querySelector(qs);
        if (selectContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            selectContainer.appendChild(p);
        }
        html = '<label>Wybierz link do strony z projektami</label><select name="block-project__more-link" class="block-project__more-link"><option value="" disabled selected>Wybierz stronę z projektami</option>';
        pages.forEach(function(page) {
            html += '<option value="'+page+'">'+page+'</option>';
        }, this);
        html += '</select>';
        qs = `[data-block-id="${blockId}"] .block-project__wrapper-more-link`;
        let selectContainer2 = document.querySelector(qs);
        if (selectContainer2) {
            let p = document.createElement('div');
            p.innerHTML = html;
            selectContainer2.appendChild(p);
        }
        store.dispatch({"type": 'CREATE_PROJECT', blockId: blockId, subblockId: 0});
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
        return `<div class="block-offices__wrapper"><label>Tytuł sekcji</label>
                <input type="text" placeholder=" np. Biura" class="block-offices__section-title" name="block-offices__section-title"></div>
        <div class="officesBlock-container"><div class="subblock" data-subblock-id="0">
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
                <div class="block-office__wrapper">
                    <label class="block-office__label">Link do mapy</label>
                    <input type="text" name="block-office__map" class="block-office__text block-office__map" placeholder="">
                </div>
            </div></div></div><button class="addOfficeButton">Dodaj biuro</button></div>`;
    }

    function renderSmallOfficesBase() {
        return `<div class="block-office__wrapper"><label>Nazwa linku do strony kontaktowej</label>
                <input type="text" placeholder=" np. Więcej informacji" class="block-office__more-offices-title" name="block-office__more-offices-title">
            </div><div class="block-office__wrapper block-office__wrapper-more-link"></div>
        <div class="officesBlock-container"><div class="subblock" data-subblock-id="0">
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
            </div></div></div><button class="addSmallOfficeButton">Dodaj biuro</button></div>`;
    }

    function renderGalleryBase() {
        return `<div class="block-gallery__wrapper"><label>Tytuł sekcji</label>
                <input type="text" placeholder=" np. Galeria" class="block-gallery__section-title" name="block-gallery__section-title"></div><div class="galleryBlock-container"><div class="subblock" data-subblock-id="0">
            <button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__wrapper">Podpis</label>
                    <input type="text" name="block-gallery__title" class="block-gallery__text block-gallery__title" placeholder="np. Projekt budynku">
                </div>
                <div class="block-gallery__preview">
                    <img src="/static/img/placeholder.png">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>
        </div></div><button class="addImageButton">Dodaj zdjęcie</button>`;
    }

    function renderTeamBase() {
        return `<div class="block-gallery__wrapper"><label>Tytuł sekcji</label>
                <input type="text" placeholder=" np. Zespół" class="block-gallery__section-title" name="block-gallery__section-title">
            </div><div class="galleryBlock-container"><div class="subblock" data-subblock-id="0">
            <button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__label">Podpis</label>
                    <input type="text" name="block-gallery__title" class="block-gallery__text block-gallery__title" placeholder="np. Specjalista od ogrodów">
                </div>
                <div class="block-gallery__preview">
                    <img src="/static/img/placeholder.png">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>
        </div></div><button class="addImageButton addImageButtonTeam">Dodaj zdjęcie</button>`;
    }


    function renderCalcBase() {
        return `<h2>Kalkulator</h2>`;
    }


    function renderProjectsBase () {
        return `<div class="block-project__wrapper"><label>Nazwa linku do strony projektów</label>
                <input type="text" placeholder=" np. Zobacz więcej projektów" class="block-project__more-project-title" name="block-project__more-project-title">
            </div>
            <div class="block-project__wrapper block-project__wrapper-more-link"></div>
            <div class="projectsBlock-container"><div class="subblock" data-subblock-id="0">
            <button class="projectBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="projectBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="projectBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="project">
                <div class="block-project__wrapper">
                    <label class="block-project__label">Tytuł projektu</label>
                    <input type="text" name="block-project__title" class="block-project__text block-project__title" placeholder=" np. willa na wzgórzu">
                </div>
                <div class="block-project__wrapper block-project__wrapper-select">

                </div>
                <div class="block-project__wrapper">
                    <input type="checkbox" name="block-project__big" class="block-project__checkbox block-project__big" id="block-project__big-0" value="1">
                    <label for="block-project__big-0">Duża sekcja</label>
                </div>
                <div class="block-project__preview">
                    <img src="/static/img/placeholder.png">
                </div>
                <div class="block-project__wrapper block-project__wrapper-image">
                </div>
            </div>
        </div></div><button class="addProjectButton">Dodaj projekt</button>`;
    }
}
