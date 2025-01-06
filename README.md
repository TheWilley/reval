<h1 align="center">
  reval
  <br>
</h1>
<h4 align="center">Quick and easy evaluation of expressions.
<br>
<br>

</h4>

<p align="center">
  <img src="https://github.com/TheWilley/reval/actions/workflows/main.yml/badge.svg" alt="Tests">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#introduction">Introduction</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#license">License</a>
</p>
<img src="https://github.com/user-attachments/assets/1a5cdc00-bc3b-43a0-8239-e68c5edc3e1e">

## Features

- Evalutate multiple expressions at the same time
- Built-in support for JavaScript (sandboxed), [math.js](https://mathjs.org), regex replace, and more
- Save and load your expressions
- Minimal user interface

## Introduction

I was getting tired of creating a new HTML file each time I needed to quickly test out things in JavaScript, so I initially created this web app to fulfill that purpose. It has since then grown into a dynamic system which support a variety of functionalities, such as evaluation of math and regex expressions.

## Getting Started

Simply go to the [official webpage](https://thewilley.github.io/reval/) to get started, or run the app yourself by following these steps:

```
# Clone this repository
$ git clone https://github.com/thewilley/reval.git

# Go into the repository
$ cd reval

# Install dependencies
$ npm i

# Run tests
$ npm run test

# Start development server
$ npm run dev

# Build for production
$ npm run build
```

## Creating custom plugins

See the [documentation](./docs/plugins.md).

## License

[MIT](./LICENSE)
