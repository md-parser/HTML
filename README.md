# markdown-parser

## Install

```sh
yarn add @md-parser/html-renderer
```

## Usage

```ts
import { renderHTML } from '@md-parser/html-renderer';

const html = renderHTML('# Hello World');
```

### Presets

```ts
import { parseMarkdown, GFM } from '@saartje87/md-ast';

const ast = renderHTML('# Hello World', {
  presets: [GFM()],
});
```

See [@md-parser/parser](https://github.com/md-parser/parser) for more options options.
