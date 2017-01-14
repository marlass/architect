import hasClass from './../hasClass';

export function clickList(e, store, catalog, team) {
    if (hasClass(e.target,'galleryBlock__up') || hasClass(e.target.parentNode,'galleryBlock__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let prevBlock = subblock.previousSibling;
        if (subblock != subblock.parentNode.firstChild && prevBlock) {
            subblock.parentNode.insertBefore(subblock, prevBlock);
            store.dispatch({type: 'SET_IMAGE_UP', blockId: id, subblockId: subblockId});
        }        
    }

    if (hasClass(e.target,'galleryBlock__down') || hasClass(e.target.parentNode,'galleryBlock__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let nextBlock = subblock.nextSibling;
        if (subblock != subblock.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, subblock);
            store.dispatch({type: 'SET_IMAGE_DOWN', blockId: id, subblockId: subblockId});
        }       
        
    }

    if (hasClass(e.target,'galleryBlock__delete') || hasClass(e.target.parentNode,'galleryBlock__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let parent = subblock.parentNode;
        parent.removeChild(subblock);
        store.dispatch({type: 'DELETE_IMAGE', blockId: id, subblockId: subblockId});
    }

    if (hasClass(e.target, 'addImageButton')) {
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
        let html = ``;
        if (hasClass(e.target, 'addImageButtonTeam')) {
            html = `<button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__label">Podpis</label>
                    <input type="text" name="block-gallery__title" class="block-gallery__text block-gallery__input block-gallery__title" placeholder="np. Projekt budynku">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>`;
        } else {
            html = `<button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="galleryBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="galleryBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="image">
                <div class="block-gallery__wrapper">
                    <label class="block-gallery__label">Podpis</label>
                    <input type="text" name="block-gallery__title" class="block-gallery__text block-gallery__input block-gallery__title" placeholder="np. Projekt budynku">
                </div>
                <div class="block-gallery__preview">
                <label class="block-gallery__label">Wybrane zdjęcie</label>
                    <img src="/static/img/placeholder.png"  class="block-gallery__preview-image">
                </div>
                <div class="block-gallery__wrapper block-gallery__wrapper-image">
                </div>
            </div>`;
        }
        let node = document.createElement('div');
        node.className = 'subblock galleryBlock__subblock';
        node.setAttribute('data-subblock-id',id);
        node.innerHTML = html;
        let qs = '[data-block-id="'+blockId+'"] .galleryBlock-container';
        let container = document.querySelector(qs);
        container.appendChild(node);
        if (hasClass(e.target, 'addImageButtonTeam')) {
            teamPost(blockId, id, team);
        } else {
            galleryPost(blockId, id,catalog);
        }
        store.dispatch({type: 'CREATE_IMAGE', blockId: blockId, subblockId: id});
    }    
}

function galleryPost(blockId, subBlockId,catalog) {
    let html = '';
    var timestamp = Date.now();
    catalog.forEach(function(dir){
        let subhtml = '';
        dir.photos.forEach(function(pic) {
            subhtml += '<div class="block-gallery__pic-wrapper u-clearfix"><input type="radio" name="img-'+blockId+'-'+subBlockId+'" class="block-gallery__image" id="'+dir.path+'/'+pic.path+'-'+blockId+'-'+subBlockId+'" value="'+dir.path+'/'+pic.path+'"><label for="'+dir.path+'/'+pic.path+'-'+blockId+'-'+subBlockId+'" class="block-gallery__image-label"><img class="block-gallery__pic" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label></div>';
    }, this);
        html += '<div class="galleryCatalog"><h2 class="galleryCatalog__title"><i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>'+dir.path+'</h2><div class="dir galleryCatalog__photos galleryCatalog__photos--hidden">'+subhtml+'</div>';
    }, this);
    let qs = `[data-block-id="${blockId}"] [data-subblock-id="${subBlockId}"] .block-gallery__wrapper-image`;
    let radioContainer = document.querySelector(qs);
    if (radioContainer) {
        let p = document.createElement('div');
        p.innerHTML = html;
        radioContainer.appendChild(p);
    }
}

function teamPost(blockId, subBlockId, team) {
    let html = '';
    team.forEach(function(pic) {
        html += '<div class="block-gallery__pic-wrapper"><input type="radio" name="img-'+blockId+'-'+subBlockId+'" class="block-gallery__image" id="'+pic+'-'+blockId+'-'+subBlockId+'" value="'+pic+'"><label for="'+pic+'-'+blockId+'-'+subBlockId+'" class="block-gallery__image-label"><img class="block-gallery__pic2" src="/static/uploads/team/'+pic+'"></label></div>';
    }, this);
    let qs = `[data-block-id="${blockId}"] [data-subblock-id="${subBlockId}"] .block-gallery__wrapper-image`;
    let radioContainer = document.querySelector(qs);
    if (radioContainer) {
        let p = document.createElement('div');
        p.innerHTML = html;
        radioContainer.appendChild(p);
    }
}

export function blurList(e, store) {
    if (hasClass(e.target,'block-gallery__title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_IMAGE_TITLE', blockId: id, subblockId: subBlock, title: title});
    }

    if (hasClass(e.target,'block-gallery__section-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_BLOCK_GALLERY_TITLE', blockId: id, title: title});
    }
}

export function changeList(e, store) {
    if (hasClass(e.target,'block-gallery__image')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subId = input.closest('.subblock').getAttribute('data-subblock-id');
        let img = e.target.value;
        store.dispatch({type: 'SET_IMAGE', blockId: id, subblockId: subId, img: img});
    }
}
