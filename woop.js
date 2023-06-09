import { renderHTML } from './dist/index.esm.js';
import showdown from 'showdown';

export const markdownExample = `# Markdown syntax guide

---

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

## Strikethrough

~~This text will be strikethrough~~

## Super- and subscript

Example ^superscript^

Example ~subscript~

## Lists

### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

### Ordered

1. Item 1
1. Item 2
1. Item 3
  1. Item 3a
  1. Item 3b

## Images

![This is a alt text.](https://markdownlivepreview.com//image/sample.png)

## Links

You may be using [A Wockle](https://wockle.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Code with backticks

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`

## Code with 4 spaces

    let message = 'Hello world';
    alert(message);

## Inline code

Markdown is parsed by \`@md-parser/parser\`.
`;

const converter = new showdown.Converter();

console.time('renderHTML - showdown');
converter.makeHtml(markdownExample);
converter.makeHtml(markdownExample);
converter.makeHtml(markdownExample);
converter.makeHtml(markdownExample);
console.timeEnd('renderHTML - showdown');

console.time('renderHTML');
renderHTML(markdownExample);
renderHTML(markdownExample);
renderHTML(markdownExample);
renderHTML(markdownExample);
console.timeEnd('renderHTML');
