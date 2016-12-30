export default function() {
    const newBlockSubmit = document.querySelector('.new-block__submit');
    const newBlockSelect = document.querySelector('.new-block__select');

    if (newBlockSubmit) {
        newBlockSubmit.addEventListener('click', function(){
            const newBlock = newBlockSelect.options[newBlockSelect.selectedIndex].value
            newBlockHTML(newBlock);    
        })
    }

    function newBlockHTML(block) {
        let html = `
            <div class="block__up"></div>
            <div class="block__down"></div>
            <div class="block__delete"></div>
            <div class="block__content">
                ${renderBlockBase(block)}
            </div>`;
        var node = document.createElement('div');
        node.className = 'block';
        node.innerHTML = html;
        var before = document.querySelector('.new-block')
        before.parentNode.insertBefore(node, before);
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
            </div>`
    }
}
