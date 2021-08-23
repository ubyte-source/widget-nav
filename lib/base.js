(function (window) {

    'use strict';

    class Column {

        constructor(nav) {
            this.nav = nav;
            this.elements = {};
            this.elements.contents = [];
        }

        getNav() {
            return this.nav;
        }
        getContents() {
            return this.elements.contents;
        }
        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            this.elements.container = document.createElement('div');
            this.elements.container.className = 'container pure-g';
            return this.elements.container;
        }
        getGrid() {
            if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
            let sidepanel = this.getContainer();
            this.elements.grid = document.createElement('div');
            this.elements.grid.className = 'ellipsis';
            this.elements.grid.appendChild(sidepanel);
            return this.elements.grid;
        }
        addContent(element) {
            let content = document.createElement('div');
            content.className = 'content';
            content.appendChild(element);
            this.elements.contents.push(content);
            this.getContainer().appendChild(content);
            this.applyGrid();
            return this;
        }
        applyGrid() {
            let contents = this.getContents();
            if (contents.length === 0) return this;

            let debug;
            try {
                if (contents.length > 24) throw 'The content push on Nav.Column not be more of 24';

                let length = contents.length - 1;
                while (24 % ++length != 0 && length < 24);

                let grid = 24 / length, difference = 24 - (grid * contents.length), sizes = [];
                for (let item = 0; item < contents.length; item++) {
                    let add = item == 0 ? grid + difference : grid;
                    contents[item].className = 'content';
                    if (add == 24) continue;

                    sizes.push(add);
                }

                sizes.reverse();
                for (let item = 0; item < sizes.length; item++)
                    contents[item].classList.add('pure-u-' + sizes[item].toString() + '-24');
            }
            catch (message) {
                debug = this.getNav().getDebug();
                if (debug === true) console.log(message);
            }
            return this;
        }
        out() {
            return this.getContainer();
        }
    }

    class Nav {

        static handle() {
            return 'data-handle-event';
        }

        constructor() {
            this.grid = 24;
            this.debug = true;

            this.elements = {};
            this.elements.columns = [];
        }

        getDebug() {
            return this.debug;
        }
        setDebug(status) {
            this.debug = status;
            return true;
        }
        getGrid(size) {
            let debug;
            try {
                if (this.grid < size) throw 'The elements push on Nav not be more of 24';
                this.grid = this.grid - size;
                return size;
            }
            catch (message) {
                debug = this.getDebug();
                if (debug === true) console.log(message);
            }
        }
        getColumn(size) {
            let column = new Column(this), grid = this.getGrid(size);
            column.out().classList.add('pure-u-' + grid + '-24');
            this.getContainer().appendChild(column.out());
            return column;
        }
        getColumns() {
            return this.elements.columns;
        }
        setReturnButton(material) {
            if (this.elements.hasOwnProperty('back')) return this.elements.back;

            let icon = this.constructor.getIcon(material), grid = document.createElement('div'), back = document.createElement('a');

            back.className = 'back';
            back.appendChild(icon);
            back.setAttribute(this.constructor.handle(), ':back');
            back.addEventListener('click', this, true);

            grid.className = 'pure-u-24-24 ellipsis';
            grid.appendChild(back);

            this.elements.back = this.getColumn(2);
            this.elements.back.addContent(grid);

            return this;
        }
        setTitle(title) {
            if (this.elements.hasOwnProperty('title')) return this.elements.title;

            let node = document.createTextNode(title), grid = document.createElement('div');
            let text = document.createElement('label');

            text.className = 'title';
            text.appendChild(node);

            grid.className = 'pure-u-24-24 ellipsis';
            grid.appendChild(text);

            this.elements.title = this.getColumn(4);
            this.elements.title.addContent(grid);

            return this;
        }
        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            this.elements.container = document.createElement('div');
            this.elements.container.id = 'nav';
            this.elements.container.className = 'pure-g';
            return this.elements.container;
        }
        out() {
            return this.getContainer();
        }
        handleEvent(event) {
            let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
            if (attribute === null) return;

            let attribute_split = attribute.split(/\s+/);
            for (let item = 0; item < attribute_split.length; item++) {
                let execute = attribute_split[item].split(String.fromCharCode(58));
                if (execute.length !== 2) break;
                if (execute[0] === event.type || 0 === execute[0].length) {
                    if (typeof this[execute[1]] !== 'function') continue;

                    this[execute[1]].call(this, event);
                }
            }
        }
        back() {
            let path = window.location.pathname.split('/');
            window.location = path.length < 3 || path[3] === 'read' ? '/' : '/' + path[1] + '/' + path[2] + '/' + 'read';
        }
        static closestAttribute(target, attribute, html) {
            if (typeof attribute === 'undefined'
                || !attribute.length) return null;

            let result = null, element = target;

            do {
                let tagname = element.tagName.toLowerCase();
                if (tagname === 'body') return null;

                result = element.getAttribute(attribute);
                if (result !== null) {
                    result = result.toString();
                    if (result.length) break;
                }

                element = element.parentNode;
            } while (element !== null
                || typeof element === 'undefined');

            if (typeof html === 'undefined'
                || html !== true) return result;

            return element;
        }
        static getIcon(name) {
            let icon = document.createElement('i');
            icon.className = 'material-icons';
            icon.innerText = name;
            return icon;
        }
    }

    window.Nav = Nav;
    window.Nav.Column = Column;

})(window);