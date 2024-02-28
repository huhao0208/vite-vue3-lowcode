
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";
import contextMenu from './modules/contextMenu/index.js'
const directivesList = {
    copy,
    waterMarker,
    draggable,
    debounce,
    throttle,
    longpress,
    contextMenu
};

const directives = {
    install: function (app) {
        Object.keys(directivesList).forEach(key => {
            app.directive(key, directivesList[key]);
        });
    }
};

export default directives;
