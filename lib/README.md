# Documentation widget-nav

Widget Javascript Nav is a library used to create a navigation bar in the web page. You can divide the bar in columns and add element like button, write and other stuff in every single space.

## Structure

library:
- [window.Nav](https://github.com/energia-source/widget-nav/tree/main/lib#class-windownav-usable-methods)
- [window.Nav.Column](https://github.com/energia-source/widget-nav/tree/main/lib#class-windownavcolumn-usable-methods)

<br>

#### ***Class window.Nav usable methods***

##### `static handle()`

It returns a string.

 * **Returns:** The handle() method returns a string.

##### `constructor()`

Create a new JavaScript object and initialize it with the following properties:

* debug - set to true * grid - set to 24 * back - set to null * elements - create a new JavaScript object and initialize it with the following properties: * columns - set to an empty array

##### `getDebug()`

Get the debug value of the current status of the session

 * **Returns:** The debug property of the class.

##### `setDebug(status)`

Set the debug status of the session

 * **Parameters:** `status` — A boolean value that indicates whether the debug mode is on or off.
 * **Returns:** Nothing 

##### `setBack(url)`

Set the url for the back action

 * **Parameters:** `url` — The URL to navigate to.
 * **Returns:** The return value is a boolean that indicates whether the back property was set.

##### `getBack()`

Get the value of the back property

 * **Returns:** The back property of the object.

##### `getGrid(size)`

*Get the grid size and subtract it from the current grid size.*

 * **Parameters:** `size` — The number of elements to push on the Nav.
 * **Returns:** The number of elements that were removed from the Nav.

##### `getColumn(size)`

Create a new column and add it to the container

 * **Parameters:** `size` — The size of the column.
 * **Returns:** `` — column object.

##### `getColumns()`

Get the columns of the current table

 * **Returns:** The columns of the table.

##### `setReturnButton(material)`

Create a button to turn to the previous page

 * **Parameters:** `material` — The material to use for the icon.
 * **Returns:** The return value is the object itself.

##### `setTitle(title)`

Create a title element and add it to the grid

 * **Parameters:** `title` — The title of the column.
 * **Returns:** The grid object.

##### `getTitle()`

Get the title of the current Nav object

 * **Returns:** The title of the Nav object.

##### `getContainer()`

Create a div element with the id of "nav" and the class of "pure-g"

 * **Returns:** The container div.

##### `out()`

Get the container of the current cell

 * **Returns:** The container element.

##### `handleEvent(event)`

If the event target has the attribute we're looking for, then execute the function

 * **Parameters:** `event` — The event object that was passed to the event handler.

##### `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the closest attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the attribute is searched for in the HTML source code.
 * **Returns:** The closest attribute.

##### `static getIcon(name)`

Create an HTML element with the class `material-icons` and the innerText of the `name` parameter

 * **Parameters:** `name` — The name of the icon.
 * **Returns:** The icon that was created.

<br>

#### ***Class window.Nav.Column usable methods***

##### `constructor(nav)`

Create a new JavaScript object and assign it to the variable `nav`

 * **Parameters:** `nav` — The nav object that is passed in from the constructor.

##### `getNav()`

Get the nav object

 * **Returns:** The nav object.

##### `getContents()`

Get the contents of the <div> element

 * **Returns:** The contents of the elements.

##### `getContainer()`

Create a div element with the class name "container" and return it

 * **Returns:** The container element.

##### `getGrid()`

* Get the grid element if it exists, otherwise create it

 * **Returns:** The grid is being returned.

##### `addContent(element)`

Create a new content element and add it to the contents array

 * **Parameters:** `element` — The element to add to the grid.
 * **Returns:** The current instance of the class.

##### `applyGrid()`

*This function applies the grid to the contents of the column.*

The function is pretty simple. It first gets the contents of the column. If the contents are empty, it returns the column. If the contents are not empty, it checks to see if the contents are more than 24. If they are, it throws an error. If they aren't, it calculates the grid and the difference between the grid and the contents. It then creates an array of the sizes of the grid. It then reverses the array and iterates through the contents. It adds the size of the grid to the contents and adds the class of `content` to the contents. It then adds the size of the grid to the class name of the contents

 * **Returns:** The object itself.

##### `out()`

Get the container of the current cell

 * **Returns:** The container element.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
