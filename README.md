# Documentation widget-nav

Widget Javascript Nav is a library used to create a navigation bar in the web page. You can divide the bar in columns and add element like button, write and other stuff in every single space.

## Usage

So the basic setup looks something like this:

```

let nav = new Nav();

// nav.setBack(<uri to the previous page>);
// nav.setReturnButton(<the material icon class you want to set as button>);
nav.setTitle('What you want to be display as title');

document.appendChild(nav.out());

```

To add an element to the column the porcess is the following:

```

// nav.getColumn(<the size of the column (max 24)>).addContent(<HTMLElement>);

```

## Structure

library:
- [window.Nav](https://github.com/energia-source/widget-nav/tree/main/lib)
- [window.Nav.Column](https://github.com/energia-source/widget-nav/tree/main/lib)

<br>

## Contributing

Please read [CONTRIBUTING.md](https://github.com/energia-source/widget-xkr/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting us pull requests.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/energia-source/widget-xkr/tags). 

## Authors

* **Paolo Fabris** - *Initial work* - [energia-europa.com](https://www.energia-europa.com/)
* **Gabriele Luigi Masero** - *Developer* - [energia-europa.com](https://www.energia-europa.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details