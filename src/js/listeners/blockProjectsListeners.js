import hasClass from './../hasClass';

export function clickList(e, store, catalog, pages) {
    if (hasClass(e.target,'projectBlock__up') || hasClass(e.target.parentNode,'projectBlock__up')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let prevBlock = subblock.previousSibling;
        if (subblock != subblock.parentNode.firstChild && prevBlock) {
            subblock.parentNode.insertBefore(subblock, prevBlock);
            store.dispatch({type: 'SET_PROJECT_UP', blockId: id, subblockId: subblockId});
        }        
    }

    if (hasClass(e.target,'projectBlock__down') || hasClass(e.target.parentNode,'projectBlock__down')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let nextBlock = subblock.nextSibling;
        if (subblock != subblock.parentNode.lastChild && nextBlock) {
            nextBlock.parentNode.insertBefore(nextBlock, subblock);
            store.dispatch({type: 'SET_PROJECT_DOWN', blockId: id, subblockId: subblockId});
        }       
        
    }

    if (hasClass(e.target,'projectBlock__delete') || hasClass(e.target.parentNode,'projectBlock__delete')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subblockId = input.closest('.subblock').getAttribute('data-subblock-id');
        let block = input.closest('.block');
        let subblock = input.closest('.subblock');
        let parent = subblock.parentNode;
        parent.removeChild(subblock);
        store.dispatch({type: 'DELETE_PROJECT', blockId: id, subblockId: subblockId});
    }

    if (hasClass(e.target, 'addProjectButton')) {
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
        let html = `<button class="projectBlock__up"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
            <button class="projectBlock__down"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>
            <button class="projectBlock__delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <div class="project">
                <div class="block-project__wrapper">
                    <label class="block-project__label">Tytuł projektu</label>
                    <input type="text" name="block-project__title-${blockId}-${id}" class="block-project__text block-project__title" placeholder=" np. willa na wzgórzu">
                </div>
                <div class="block-project__wrapper block-project__wrapper-select">

                </div>
                <div class="block-project__wrapper">
                    <input type="checkbox" name="block-project__big-${blockId}-${id}" class="block-project__checkbox block-project__big" id="block-project__big-${blockId}-${id}">
                    <label for="block-project__big-${blockId}-${id}">Duża sekcja</label>
                </div>
                <div class="block-project__preview">
                    <img src="/static/img/placeholder.png">
                </div>
                <div class="block-project__wrapper block-project__wrapper-image">
                </div>
            </div>`;
        let node = document.createElement('div');
        node.className = 'subblock';
        node.setAttribute('data-subblock-id',id);
        node.innerHTML = html;
        let qs = '[data-block-id="'+blockId+'"] .projectsBlock-container';
        let container = document.querySelector(qs);
        container.appendChild(node);
        projectPost(blockId, id,catalog,pages);
        store.dispatch({type: 'CREATE_PROJECT', blockId: blockId, subblockId: id});
    }    
}

function projectPost(blockId, subBlockId,catalog,pages) {
    let html = '';
    catalog.forEach(function(dir){
        let subhtml = '';
        dir.photos.forEach(function(pic) {
            subhtml += '<label for="'+dir.path+'/'+pic.path+'-'+blockId+'-'+subBlockId+'"><img style="width: 100px;height: 100px;object-fit:cover;float: left" src="/static/uploads/'+dir.path+'/'+pic.path+'"></label><input type="radio" name="img-'+blockId+'-'+subBlockId+'" class="block-project__image" id="'+dir.path+'/'+pic.path+'-'+blockId+'-'+subBlockId+'" value="'+dir.path+'/'+pic.path+'">';
        }, this);
        html += '<div class="dir">'+subhtml+'</div>';
    }, this);
    let qs = `[data-block-id="${blockId}"] [data-subblock-id="${subBlockId}"] .block-project__wrapper-image`;
    let radioContainer = document.querySelector(qs);
    if (radioContainer) {
        let p = document.createElement('div');
        p.innerHTML = html;
        radioContainer.appendChild(p);
    }

    html = '<label for="block-project__page-'+blockId+'-'+subBlockId+'">Wybierz stronę projektu</label><select name="block-project__page-'+blockId+'-'+subBlockId+'" class="block-project__page" id="block-project__page-'+blockId+'-'+subBlockId+'"><option value="" disabled selected>Wybierz stronę projektu</option>';
    pages.forEach(function(page) {
        html += '<option value="'+page+'">'+page+'</option>';
    }, this);
    html += '</select>';
    qs = `[data-block-id="${blockId}"] [data-subblock-id="${subBlockId}"] .block-project__wrapper-select`;
    let selectContainer = document.querySelector(qs);
    if (selectContainer) {
        let p = document.createElement('div');
        p.innerHTML = html;
        radioContainer.appendChild(p);
    }
}

export function blurList(e, store) {
    if (hasClass(e.target,'block-project__title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subBlock = input.closest('.subblock').getAttribute('data-subblock-id');
        let title = e.target.value;
        store.dispatch({type: 'SET_PROJECT_TITLE', blockId: id, subblockId: subBlock, title: title});
    }

    if (hasClass(e.target,'block-project__more-project-title')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let title = e.target.value;
        store.dispatch({"type": 'SET_BLOCK_PROJECT_LINK_TITLE', "blockId": id, "title": title});
    }
}

export function changeList(e, store) {
    if (hasClass(e.target,'block-project__image')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subId = input.closest('.subblock').getAttribute('data-subblock-id');
        let img = e.target.value;
        store.dispatch({"type": 'SET_PROJECT_IMAGE', "blockId": id,"subblockId": subId, "img": img});
    }
    if (hasClass(e.target,'block-project__page')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subId = input.closest('.subblock').getAttribute('data-subblock-id');
        let page = e.target.options[e.target.selectedIndex].value;;
        store.dispatch({"type": 'SET_PROJECT_PAGE', "blockId": id,"subblockId": subId, "page": page});
    }
    if (hasClass(e.target,'block-project__more-link')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let url2 = e.target.options[e.target.selectedIndex].value;;
        store.dispatch({"type": 'SET_BLOCK_PROJECT_LINK_URL', "blockId": id, "url": url2});
    }
    if (hasClass(e.target,'block-project__big')) {
        let input = e.target;
        let id = input.closest('.block').getAttribute('data-block-id');
        let subId = input.closest('.subblock').getAttribute('data-subblock-id');
        let qs = e.target.parentNode.querySelector(':checked');
        let big = 0;
        if (qs) {
            big = 1;
        } else {
            big = 0;
        }
        store.dispatch({"type": 'SET_PROJECT_BIG', "blockId": id,"subblockId": subId, "big": big});
    }
}

