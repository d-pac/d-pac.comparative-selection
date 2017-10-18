 [![NPM version][npm-image]][npm-url]

> Comparative selection algorithm plugin for d-pac platform

Based on [NoMoreMarking's `cj` module](https://github.com/NoMoreMarking/cj).

## Description

The algorithm accepts a queue (Array) of items, then:

1.  pseudo-randomizes the items list
2.  sorts the list by the number of comparisons each item has been featured in
3.  retains the first item as 'selected'
4.  retains the next valid item as 'opponent':
    -   either, the next item in the (shuffled) list when 'selected' has no previous comparisons.
    -   or, the next item in the (shuffled) list 'selected' hasn't been compared to yet.
5.  returns both items

## Install

```sh
$ yarn add comparative-selection
```


## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Item

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of the item

### Comparison

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `a` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the ID of the "A" item
-   `b` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the ID of the "B" item

### select

Simple comparative selection algorithm

**Parameters**

-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Payload object containing the relevant values
    -   `payload.items` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Item](#item)>** An array of [Item](#item)s
    -   `payload.comparisons` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Comparison](#comparison)>?** An array of [Comparison](#comparison)s

**Examples**

```javascript
const comparative = require('comparative-selection');

const pair = comparative.select([{id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}]);
console.log('pair:', pair); // e.g.: {a: "2", b: "4"}
```

```javascript
const comparative = require('comparative-selection');

const pair = comparative.select([{id:"1"}, {id:"2"}, {id:"3"}, {id:"4"}], [{a:"2", b: "1"}]);
console.log('pair:', pair); // {a: "3", b: "4"}
```

Returns **[Comparison](#comparison)** the pair of item ID's to compare

## Development

### Testing

```sh
$ yarn test
```

### Linting

```sh
$ yarn lint
```

## License

GPL v3 © [d-pac](http://www.d-pac.be)

[npm-url]: https://npmjs.org/package/comparative-selection

[npm-image]: https://badge.fury.io/js/comparative-selection.svg
