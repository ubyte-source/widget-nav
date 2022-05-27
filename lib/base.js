(function (window) {

    'use strict';

    class Column {

        /**
         * Create a new JavaScript object and assign it to the variable `nav`
         * @param nav - The nav object that is passed in from the constructor.
         */

        constructor(nav) {
            this.nav = nav;
            this.elements = {};
            this.elements.contents = [];
        }

        /**
         * Get the nav object
         * @returns The nav object.
         */

        getNav() {
            return this.nav;
        }

        /**
         * Get the contents of the <div> element
         * @returns The contents of the elements.
         */

        getContents() {
            return this.elements.contents;
        }

        /**
         * Create a div element with the class name "container" and return it
         * @returns The container element.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            this.elements.container = document.createElement('div');
            this.elements.container.className = 'container pure-g';
            return this.elements.container;
        }

        /**
         * * Get the grid element if it exists, otherwise create it
         * @returns The grid is being returned.
         */

        getGrid() {
            if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
            let sidepanel = this.getContainer();
            this.elements.grid = document.createElement('div');
            this.elements.grid.className = 'ellipsis';
            this.elements.grid.appendChild(sidepanel);
            return this.elements.grid;
        }

        /**
         * Create a new content element and add it to the contents array
         * @param element - The element to add to the grid.
         * @returns The current instance of the class.
         */

        addContent(element) {
            let content = document.createElement('div');
            content.className = 'content';
            content.appendChild(element);
            this.elements.contents.push(content);
            this.getContainer().appendChild(content);
            this.applyGrid();
            return this;
        }

        /**
         * *This function applies the grid to the contents of the column.*
         * 
         * The function is pretty simple. It first gets the contents of the column. If the contents are
         * empty, it returns the column. If the contents are not empty, it checks to see if the
         * contents are more than 24. If they are, it throws an error. If they aren't, it calculates
         * the grid and the difference between the grid and the contents. It then creates an array of
         * the sizes of the grid. It then reverses the array and iterates through the contents. It adds
         * the size of the grid to the contents and adds the class of `content` to the contents. It
         * then adds the size of the grid to the class name of the contents
         * @returns The object itself.
         */

        applyGrid() {
            let contents = this.getContents();
            if (contents.length === 0) return this;
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
                let debug = this.getNav().getDebug();
                if (debug === true) console.log(message);
            }
            return this;
        }

        /**
         * Get the container of the current cell
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }
    }

    class Nav {

        /**
         * It returns a string.
         * @returns The handle() method returns a string.
         */

        static handle() {
            return 'data-handle-event';
        }

        /**
         * Create a new JavaScript object and initialize it with the following properties:
         * 
         * * debug - set to true
         * * grid - set to 24
         * * back - set to null
         * * elements - create a new JavaScript object and initialize it with the following properties:
         * * columns - set to an empty array
         */

        constructor() {
            this.debug = true;

            this.grid = 24;
            this.back = null;

            this.elements = {};
            this.elements.columns = [];
        }

        /**
         * Get the debug value of the current status of the session
         * @returns The debug property of the class.
         */

        getDebug() {
            return this.debug;
        }

        /**
         * Set the debug status of the session
         * @param status - A boolean value that indicates whether the debug mode is on or off.
         * @returns Nothing.
         */

        setDebug(status) {
            this.debug = status;
            return true;
        }

        /**
         * Set the url for the back action
         * @param url - The URL to navigate to.
         * @returns The return value is a boolean that indicates whether the back property was set.
         */

        setBack(url) {
            this.back = url;
            return true;
        }

        /**
         * Get the value of the back property
         * @returns The back property of the object.
         */

        getBack() {
            return this.back;
        }

        /**
         * *Get the grid size and subtract it from the current grid size.*
         * @param size - The number of elements to push on the Nav.
         * @returns The number of elements that were removed from the Nav.
         */

        getGrid(size) {
            try {
                if (this.grid < size) throw 'The elements push on Nav not be more of 24';
                this.grid = this.grid - size;
                return size;
            }
            catch (message) {
                let debug = this.getDebug();
                if (debug === true) console.log(message);
            }
        }

        /**
         * Create a new column and add it to the container
         * @param size - The size of the column.
         * @returns A column object.
         */

        getColumn(size) {
            let column = new window.Nav.Column(this), grid = this.getGrid(size);
            column.out().classList.add('pure-u-' + grid + '-24');
            this.getContainer().appendChild(column.out());
            return column;
        }

        /**
         * Get the columns of the current table
         * @returns The columns of the table.
         */

        getColumns() {
            return this.elements.columns;
        }

        /**
         * Create a button to turn to the previous page
         * @param material - The material to use for the icon.
         * @returns The return value is the object itself.
         */

        setReturnButton(material) {
            if (this.elements.hasOwnProperty('back')) return this.elements.back;

            let icon = this.constructor.getIcon(material), grid = document.createElement('div'), back = document.createElement('a');

            back.className = 'back';
            back.appendChild(icon);
            back.setAttribute(this.constructor.handle(), ':reverse');
            back.addEventListener('click', this, true);

            grid.className = 'pure-u-24-24 ellipsis';
            grid.appendChild(back);

            this.elements.back = this.getColumn(2);
            this.elements.back.addContent(grid);

            return this;
        }

        /**
         * Create a title element and add it to the grid
         * @param title - The title of the column.
         * @returns The grid object.
         */

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

        /**
         * Get the title of the current Nav object
         * @returns The title of the Nav object.
         */
        getTitle() {
            return this.elements.title;
        }

        /**
         * Create a div element with the id of "nav" and the class of "pure-g"
         * @returns The container div.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            this.elements.container = document.createElement('div');
            this.elements.container.id = 'nav';
            this.elements.container.className = 'pure-g';
            return this.elements.container;
        }

        /**
         * Get the container of the current cell
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }

        /**
         * If the event target has the attribute we're looking for, then execute the function
         * @param event - The event object that was passed to the event handler.
         */

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

        reverse() {
            let url = this.getBack();
            if (url === null) return;
            window.location = url;
        }

        /**
         * Find the closest attribute to the target element
         * @param target - The element to search for the closest attribute.
         * @param attribute - The attribute to search for.
         * @param html - If true, the attribute is searched for in the HTML source code.
         * @returns The closest attribute.
         */
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

        /**
         * Create an HTML element with the class `material-icons` and the innerText of the `name`
         * parameter
         * @param name - The name of the icon.
         * @returns The icon that was created.
         */
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
