export function setFooterYear(state, action) {
    let postState = Object.assign({},state);
    if (postState.footer) {
        postState.footer.year = action.year;
    }
    return Object.assign({},state,postState);
}
