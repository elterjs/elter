<div align="center">
<a href="https://elter.vercel.app">
  <img alt="visit elter website" src="https://elter.vercel.app/banner.png">
</a>
<p />

[![npm version](https://img.shields.io/npm/v/elter)](https://www.npmjs.com/package/elter)
[![Minzip Size](https://img.shields.io/bundlephobia/minzip/elter)](https://bundlephobia.com/package/elter)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

## Installation

It works with any front-end framework and also works with a single ts file.

```sh
npm install --save-dev elter
```

## Features

- Ease API
- Type safe
- Maintainable
- Zero-Runtime
- RSC-Support

## elter is simple

Write CSS as TypeScript, making your styles type safe and maintainable and integrated with your development environment. With features like static CSS generation, Theoretical perfect performance while keeping your CSS code clean and scalable.

## Documentation

For full documentation, visit [elter-site](https://elter.vercel.app/).  
To the check out the version information, visit [release notes](https://github.com/elterjs/elter/releases).

## Quick Start

```typescript
import elter from 'elter';

const styles = elter.create({
  blue: {
    fontSize: 18,
    color: 'blue',
  },
});

const Page = () => <div className={styles.blue}>Hello World</div>;
```

## Community

For help, discuss best practices and please join the conversation here:  
[Discuss elter on GitHub](https://github.com/elterjs/elter/discussions)
