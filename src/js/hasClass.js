export default function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
