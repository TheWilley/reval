<h1 align="center">
  reval
  <br>
</h1>
<h4 align="center">Quick and easy evaluation of JavaScript code.
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

- Evalutate multiple javascript expressions at the same time
- Sandboxed environment
- Built-in support for [math.js](https://mathjs.org) expressions
- Save and load your expressions
- Minimal user interface

## Introduction

I was getting tired of creating a new HTML file each time I needed to quickly test out things in JavaScript, so I created this web app to fufill that purpose instead. Contrary to its name, the app does not run the [eval function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_direct_eval!) directly due to [security concerns](https://www.digitalocean.com/community/tutorials/js-eval). It instead leverages [SandboxJS](https://github.com/nyariv/SandboxJS) and [math.js](https://mathjs.org) to run expressions in a safe manner.

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

## License

[MIT](./LICENSE)
