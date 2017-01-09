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
        let html = `<button class="galleryBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
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
            </div>`;
        let node = document.createElement('div');
        node.className = 'subblock';
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
            subhtml += '<label for="'+timestamp+dir.path+'/'+pic.path+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label><input type="radio" name="img'+blockId+'-'+subBlockId+'" class="block-gallery__image" id="'+timestamp+dir.path+'/'+pic.path+'" value="'+dir.path+'/'+pic.path+'">';
        }, this);
        html += '<div class="dir">'+subhtml+'</div>';
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
        html += '<label for="'+pic+'-'+blockId+'-'+subBlockId+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/team/'+pic+'"></label><input type="radio" name="img-'+blockId+'-'+subBlockId+'" class="block-gallery__image" id="'+pic+'-'+blockId+'-'+subBlockId+'" value="'+pic+'">';
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
