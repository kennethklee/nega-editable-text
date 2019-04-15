# nega-editable-text
# \<nega-editable-text\>

Inline plain text editing webcomponent

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/kennethklee/nega-editable-text)

See: [Documentation](https://www.webcomponents.org/element/nega-editable-text),
  [Demo](https://kennethklee.github.io/nega-editable-text/demo/).


# Usage

## Installation

```shell
npm install --save nega-editable-text
```

## In an html file

```html
<html>
  <head>
    <script type="module">
      import 'nega-editable-text/nega-editable-text.js';
    </script>
  </head>
  <body>
    <nega-editable-text><span>This text can be editable.</span></nega-editable-text>
    <button onclick="this.previousElementSibling.edit()">Edit</button>
  </body>
</html>
```

## In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import 'nega-autocomplete/nega-autocomplete.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
        <nega-editable-text id="editalbe"><span id="text">This text can be editable.</span></nega-editable-text>
        <button on-click="_handleEdit">Edit</button>
    `;
  }

  _handleEdit(ev) {
    this.$.editable.edit()
  }
}
customElements.define('sample-element', SampleElement);
```


# Contributing

Feel free to fork and send over PRs. Still a lot of places this can be improved, i.e. styling, more options, or better behaviors.

## Installation

```
git clone https://github.com/kennethklee/nega-editable-text
cd nega-editable-text
npm install
```

## Running locally

```
$ npm start
```

## Running tests

```
$ npm test
```
