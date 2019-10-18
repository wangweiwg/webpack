# pa

[![build status](https://secure.travis-ci.org/hereandnow/node-pa.png)](http://travis-ci.org/hereandnow/node-pa)

pa is a command-line tool for reading and writing properties of your package.json

## Getting Started

Install the module globally with: `npm install pa -g`


## General Usage

### Reading the version in your package.json

```
$ pa version
```

### Setting the version in your package.json (to 0.1.0)

```
$ pa version 0.1.0
```

### Reading the main in your package.json

```
$ pa main
```

### Setting the main in your package.json (to 0.1.0)

```
$ pa main lib/index
```


## Aliases

### Predefined Aliases

- v=version
- k=keywords
- h=homepage
- n=name
- a=author
- desc=description
- dep=dependencies
- devdep=devDependencies


### Using an Alias

#### e.g. reading the version with the alias

```
$ pa v
```

### Listing all aliases

```
$ pa --alias
```

### Reading an alias

```
$ pa --alias version
```

### Setting an alias

```
$ pa --alias version v
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

- Available Tasks:
  - jshint
  - nodeunit
  - default (jshint + nodeunit)


## TODOs

- create manpage
- make aliases deleteable

## Release History

- 0.1.1
  - fix setting with alias

- 0.1.0
  - Initial Commit


## License
Copyright (c) 2013 Bastian Behrens
Licensed under the MIT license.
