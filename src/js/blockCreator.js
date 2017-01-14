import * as blockTextListeners from './listeners/blockTextListeners';
import * as blockMastheadListeners from './listeners/blockMastheadListeners';
import * as blockOfficesListeners from './listeners/blockOfficesListeners';
import * as blockGalleryListeners from './listeners/blockGalleryListeners';
import * as blockProjectsListeners from './listeners/blockProjectsListeners';
import * as block from './listeners/blockListeners';


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

    let state = store.getState();
    if (state.content){
        for (let i = 0; i < state.content.length; i++) {
            if (state.content[i].blockId >= idCounter) {
                idCounter = state.content[i].blockId+1;
            }
        }
    }

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
                ${renderBlockBase(block,idCounter)}
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
        let html = '<h4 class="block-masthead__img-label">Wybierz tło</h4>';
        masthead.forEach(function(element) {
            html += '<input type="radio" name="background-'+blockId+'" class="block-masthead__background" id="'+blockId+'-'+element+'" value="'+element+'"><label for="'+blockId+'-'+element+'" class="block-masthead__pic-label"><img class="block-masthead__pic" src="/static/uploads/masthead/'+element+'"></label>';
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
        let html = '<label class="block-offices__label">Wybierz link do strony kontaktu</label><select name="block-office__more-link-'+blockId+'" class="block-offices__select block-office__more-link"><option value="" disabled selected>Wybierz stronę kontaktową</option>';
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
        catalog.forEach(function(dir){
            let subhtml = '';
            dir.photos.forEach(function(pic) {
                subhtml += '<div class="block-gallery__pic-wrapper u-clearfix"><input type="radio" name="img-'+blockId+'-0" class="block-gallery__image" id="'+dir.path+'/'+pic.path+'-'+blockId+'-0" value="'+dir.path+'/'+pic.path+'"><label for="'+dir.path+'/'+pic.path+'-'+blockId+'-0" class="block-gallery__image-label"><img class="block-gallery__pic" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label></div>';
            }, this);
            html += '<div class="galleryCatalog"><h2 class="galleryCatalog__title"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>'+dir.path+'</h2><div class="dir galleryCatalog__photos galleryCatalog__photos--hidden">'+subhtml+'</div>';
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
        let html = '';
        team.forEach(function(pic) {
            html += '<div class="block-gallery__pic-wrapper"><input type="radio" name="img-'+blockId+'-0" class="block-gallery__image" id="'+pic+'-'+blockId+'-0" value="'+pic+'"><label for="'+pic+'-'+blockId+'-0" class="block-gallery__image-label"><img class="block-gallery__pic2" src="/static/uploads/team/'+pic+'"></label></div>';
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
        catalog.forEach(function(dir){
            let subhtml = '';
            dir.photos.forEach(function(pic) {
                subhtml += '<div class="block-project__pic-wrapper u-clearfix"><input type="radio" name="img-'+blockId+'-0" class="block-gallery__image" id="'+dir.path+'/'+pic.path+'-'+blockId+'-0" value="'+dir.path+'/'+pic.path+'"><label for="'+dir.path+'/'+pic.path+'-'+blockId+'-0" class="block-gallery__image-label"><img class="block-gallery__pic" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label></div>';
            }, this);
            html += '<div class="galleryCatalog"><h2 class="galleryCatalog__title"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>'+dir.path+'</h2><div class="dir galleryCatalog__photos galleryCatalog__photos--hidden">'+subhtml+'</div>';
        }, this);
        let qs = `[data-block-id="${blockId}"] .block-project__wrapper-image`;
        let radioContainer = document.querySelector(qs);
        if (radioContainer) {
            let p = document.createElement('div');
            p.innerHTML = html;
            radioContainer.appendChild(p);
        }

        html = '<label for="block-project__page-'+blockId+'-0" class="block-project__label">Wybierz stronę projektu</label><select name="block-project__page-'+blockId+'-0" class="block-project__page block-project__select" id="block-project__page-'+blockId+'-0"><option value="" disabled selected>Wybierz stronę projektu</option>';
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
        html = '<label class="block-project__label">Wybierz link do strony z projektami</label><select name="block-project__more-link-'+blockId+'" class="block-project__more-link block-project__select"><option value="" disabled selected>Wybierz stronę z projektami</option>';
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

    function renderBlockBase(block,blockId) {
        switch (block) {
            case "masthead":
                return renderMastheadBase(blockId);
            case "text":
                return renderTextBase(blockId);
            case "calc":
                return renderCalcBase(blockId);
            case "offices":
                return renderOfficesBase(blockId);
            case "team":
                return renderTeamBase(blockId);
            case "projectsBlock":
                return renderProjectsBase(blockId);
            case "smallOffices":
                return renderSmallOfficesBase(blockId);
            case "gallery":
                return renderGalleryBase(blockId);
            default:
                return '';
        }
    }

    function renderMastheadBase(blockId) {        
        return `
            <div class="block-masthead">
                <h2 class="block-masthead__title">Nagłówek</h2>
                <div class="block-masthead__wrapper">
                    <label class="block-masthead__label">Tytuł</label>
                    <input type="text" name="block-masthead__title-${blockId}" class="block-masthead__input block-masthead__title" placeholder="np. Projekty">
                </div>
                <div class="block-masthead__bg-wrapper u-clearfix">
                </div>
            </div>`;
    }

    function renderTextBase(blockId) {
        return `
            <div class="block-text">
                <h2 class="block-text__title">Blok z tekstem</h2>
                <div class="block-text__wrapper">
                    <label class="block-text__label">Tło</label>
                    <input type="text" name="block-text__background-${blockId}" class="block-text__input block-text__background" placeholder="np. white">
                </div>
                <div class="block-text__wrapper">
                    <label class="block-text__label">Treść</label>
                    <textarea name="block-text__text-${blockId}" class="block-text__text" placeholder="np. Informacje o ofercie"></textarea>
                </div>
            </div>`;
    }

    function renderOfficesBase(blockId) {
        return `<h2 class="block-offices__title">Biura</h2><div class="block-offices__wrapper">
            <label class="block-offices__label">Tytuł sekcji</label>
                <input type="text" placeholder=" np. Biura" class="block-offices__section-title block-offices__input" name="block-offices__section-title-${blockId}"></div>
        <div class="officesBlock-container u-clearfix"><div class="subblock officeBlock__subblock" data-subblock-id="0">
            <button class="officeBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="officeBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="officeBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="office">
                <div class="block-office__wrapper">
                    <label class="block-office__label">Tytuł biura</label>
                    <input type="text" name="block-office__title-${blockId}-0" class="block-office__text block-office__title" placeholder="np. Siedziba">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Adres</label>
                    <input type="text" name="blokc-office__address-${blockId}-0" class="block-office__text block-office__address" placeholder="np. ul. 3 Maja 60">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Miejscowość</label>
                    <input type="text" name="block-office__city-${blockId}-0" class="block-office__city block-office__text" placeholder="np. Wrocław">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Kod pocztowy</label>
                    <input type="text" name="block-office__postal-${blockId}-0" class="block-office__text block-office__postal" placeholder=" np. 50-000">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Telefon</label>
                    <input type="text" name="block-office__phone-${blockId}-0" class="block-office__text block-office__phone" placeholder="np. 123 456 789">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Email</label>
                    <input type="text" name="block-office__email-${blockId}-0" class="block-office__text block-office__email" placeholder="np. kontakt@architekt.com">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Link do mapy</label>
                    <input type="text" name="block-office__map-${blockId}-0" class="block-office__text block-office__map" placeholder="">
                </div>
            </div></div></div><button class="addOfficeButton">Dodaj biuro</button>`;
    }

    function renderSmallOfficesBase(blockId) {
        return `<h2 class="block-offices__title">Biura</h2><div class="block-offices__wrapper"><label class="block-offices__label">Nazwa linku do strony kontaktowej</label>
                <input type="text" placeholder=" np. Więcej informacji" class="block-office__more-offices-title block-offices__input" name="block-office__more-offices-title-${blockId}">
            </div><div class="block-offices__wrapper block-office__wrapper-more-link"></div>
        <div class="officesBlock-container u-clearfix"><div class="subblock officeBlock__subblock" data-subblock-id="0">
            <button class="officeBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="officeBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="officeBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="office">
                <div class="block-office__wrapper">
                    <label class="block-office__label">Tytuł biura</label>
                    <input type="text" name="block-office__title-${blockId}-0" class="block-office__text block-office__title" placeholder="np. Siedziba">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Adres</label>
                    <input type="text" name="blokc-office__address-${blockId}-0" class="block-office__text block-office__address" placeholder="np. ul. 3 Maja 60">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Miejscowość</label>
                    <input type="text" name="block-office__city-${blockId}-0" class="block-office__city block-office__text" placeholder="np. Wrocław">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Kod pocztowy</label>
                    <input type="text" name="block-office__postal-${blockId}-0" class="block-office__text block-office__postal" placeholder=" np. 50-000">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Telefon</label>
                    <input type="text" name="block-office__phone-${blockId}-0" class="block-office__text block-office__phone" placeholder="np. 123 456 789">
                </div>
                <div class="block-office__wrapper">
                    <label class="block-office__label">Email</label>
                    <input type="text" name="block-office__email-${blockId}-0" class="block-office__text block-office__email" placeholder="np. kontakt@architekt.com">
                </div>
            </div></div></div><button class="addSmallOfficeButton">Dodaj biuro</button>`;
    }

    function renderGalleryBase(blockId) {
        return `<h2 class="block-gallery__title">Galeria</h2><div class="block-gallery__wrapper"><label class="block-gallery__label">Tytuł sekcji</label>
                <input type="text" placeholder=" np. Galeria" class="block-gallery__section-title block-gallery__input" name="block-gallery__section-title-${blockId}"></div><div class="galleryBlock-container"><div class="subblock galleryBlock__subblock" data-subblock-id="0">
            <button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__label">Podpis</label>
                    <input type="text" name="block-gallery__title-${blockId}-0" class="block-gallery__input block-gallery__text block-gallery__title" placeholder="np. Projekt budynku">
                </div>
                <div class="block-gallery__preview">
                    <label class="block-gallery__label">Wybrane zdjęcie</label>
                    <img src="/static/img/placeholder.png" class="block-gallery__preview-image">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>
        </div></div><button class="addImageButton">Dodaj zdjęcie</button>`;
    }

    function renderTeamBase(blockId) {
        return `<h2 class="block-gallery__title">Zespół</h2><div class="block-gallery__wrapper"><label class="block-gallery__label">Tytuł sekcji</label>
                <input type="text" placeholder=" np. Zespół" class="block-gallery__section-title block-gallery__input" name="block-gallery__section-title-${blockId}">
            </div><div class="galleryBlock-container"><div class="subblock galleryBlock__subblock" data-subblock-id="0">
            <button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__label">Podpis</label>
                    <input type="text" name="block-gallery__title-${blockId}-0" class="block-gallery__text block-gallery__input block-gallery__title" placeholder="np. Specjalista od ogrodów">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>
        </div></div><button class="addImageButton addImageButtonTeam">Dodaj zdjęcie</button>`;
    }


    function renderCalcBase(blockId) {
        return `<h2 class="blockCalc__title">Kalkulator projektu</h2>`;
    }


    function renderProjectsBase (blockId) {
        return `<div class="block-project__wrapper"><label class="block-project__label">Nazwa linku do strony projektów</label>
                <input type="text" placeholder=" np. Zobacz więcej projektów" class="block-project__input block-project__more-project-title" name="block-project__more-project-title-${blockId}">
            </div>
            <div class="block-project__wrapper block-project__wrapper-more-link"></div>
            <div class="projectsBlock-container"><div class="subblock projectBlock__subblock" data-subblock-id="0">
            <button class="projectBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="projectBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="projectBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="project">
                <div class="block-project__wrapper">
                    <label class="block-project__label">Tytuł projektu</label>
                    <input type="text" name="block-project__title-${blockId}-0" class="block-project__input block-project__text block-project__title" placeholder=" np. willa na wzgórzu">
                </div>
                <div class="block-project__wrapper block-project__wrapper-select">

                </div>
                <div class="block-project__wrapper">
                    <input type="checkbox" name="block-project__big-${blockId}-0" class="block-project__checkbox block-project__big" id="block-project__big-0" value="1">
                    <label for="block-project__big-0" class="block-porject__checkbox--big">Duża sekcja</label>
                </div>
                <div class="block-project__preview">
                     <label class="block-project__label">Wybrane zdjęcie</label>
                    <img src="/static/img/placeholder.png" class="block-gallery__preview-image">
                </div>
                <div class="block-project__wrapper block-project__wrapper-image">
                </div>
            </div>
        </div></div><button class="addProjectButton">Dodaj projekt</button>`;
    }
}
