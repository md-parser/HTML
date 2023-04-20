import { parseMarkdown, MarkdownNode } from '@saartje87/md-ast';

export type MapMarkdownNodeToReactNode<T extends MarkdownNode> = {
  [K in T['type']]: ConvertMarkdownNodeToReactProps<Extract<T, { type: K }>>;
};

// Convert MarkdownNode to ReactNode
export type ConvertMarkdownNodeToReactProps<T extends MarkdownNode> = {
  [K in Exclude<keyof T, 'type'>]: T[K] extends MarkdownNode | MarkdownNode[] ? string : T[K];
};

export type MarkdownComponents = {
  blockquote: MapMarkdownNodeToReactNode<MarkdownNode>['blockquote'];
  code: MapMarkdownNodeToReactNode<MarkdownNode>['code'];
  divider: MapMarkdownNodeToReactNode<MarkdownNode>['divider'];
  heading: MapMarkdownNodeToReactNode<MarkdownNode>['heading'];
  image: MapMarkdownNodeToReactNode<MarkdownNode>['image'];
  inlineCode: MapMarkdownNodeToReactNode<MarkdownNode>['inlineCode'];
  italic: MapMarkdownNodeToReactNode<MarkdownNode>['italic'];
  link: MapMarkdownNodeToReactNode<MarkdownNode>['link'];
  list: MapMarkdownNodeToReactNode<MarkdownNode>['list'];
  listItem: MapMarkdownNodeToReactNode<MarkdownNode>['listItem'];
  paragraph: MapMarkdownNodeToReactNode<MarkdownNode>['paragraph'];
  strikeThrough: MapMarkdownNodeToReactNode<MarkdownNode>['strikeThrough'];
  strong: MapMarkdownNodeToReactNode<MarkdownNode>['strong'];
  subscript: MapMarkdownNodeToReactNode<MarkdownNode>['subscript'];
  superscript: MapMarkdownNodeToReactNode<MarkdownNode>['superscript'];
  table: MapMarkdownNodeToReactNode<MarkdownNode>['table'];
  tableRow: MapMarkdownNodeToReactNode<MarkdownNode>['tableRow'];
  tableData: MapMarkdownNodeToReactNode<MarkdownNode>['tableData'];
  tableHeader: MapMarkdownNodeToReactNode<MarkdownNode>['tableHeader'];
};

export type MarkdownRendererProps = {
  children: string;
  components: Partial<MarkdownComponents>;
};

export const markdownParser = ({ children, components }: MarkdownRendererProps) => {
  const ast = parseMarkdown(children || '');

  return renderHTML({ nodes: ast, components });
};

export type MarkdownASTRendererProps = {
  components: MarkdownRendererProps['components'];
  nodes: MarkdownNode[];
  // We use this to prevent React from complaining about missing keys
  keyPrefix?: string;
};

export const renderHTML = ({ nodes, components }: MarkdownASTRendererProps): string =>
  nodes
    .map((node) => {
      if (node.type === 'text') {
        return `${node.value}`;
      }

      if (node.type === 'lineBreak') {
        return '<br />';
      }

      switch (node.type) {
        case 'heading': {
          return `<h${node.level}>${renderHTML({
            nodes: node.children,
            components,
          })}</h${node.level}>`;
        }
        case 'image': {
          return `<img src="${node.src}" alt="${node.alt}" title="${node.title}" />`;
        }
        case 'link': {
          return `<a href="${node.href}" title="${node.title}">${renderHTML({
            nodes: node.children,
            components,
          })}</a>`;
        }
        case 'inlineCode': {
          return `<pre>${node.value}</pre>`;
        }
        case 'code': {
          return `<code>${node.value}</code>`;
        }
        case 'divider': {
          return '<hr />';
        }
        case 'list': {
          const tag = node.ordered ? 'ol' : 'ul';
          return `<${tag}${!!node.start && ` start=${node.start}`}>${renderHTML({
            nodes: node.children,
            components,
          })}</${tag}>`;
        }
        case 'listItem': {
          return `<li>${renderHTML({
            nodes: node.children,
            components,
          })}</li>`;
        }
        case 'table': {
          return `<table><thead>${renderHTML({
            nodes: [node.header],
            components,
          })}</thead><tbody>${renderHTML({ nodes: node.rows, components })}</tbody></table>`;
        }
        case 'tableRow': {
          return `<tr>${renderHTML({
            nodes: node.children,
            components,
          })}</tr>`;
        }
        case 'tableHeader': {
          return `<th>${renderHTML({
            nodes: node.children,
            components,
          })}</th>`;
        }
        case 'tableData': {
          return `<td>${renderHTML({
            nodes: node.children,
            components,
          })}</td>`;
        }
        case 'paragraph': {
          return `<p>${renderHTML({
            nodes: node.children,
            components,
          })}</p>`;
        }
        case 'strong': {
          return `<em>${renderHTML({
            nodes: node.children,
            components,
          })}</em>`;
        }
        case 'italic': {
          return `<i>${renderHTML({
            nodes: node.children,
            components,
          })}</i>`;
        }
        case 'strikeThrough': {
          return `<del>${renderHTML({
            nodes: node.children,
            components,
          })}</del>`;
        }
        case 'subscript': {
          return `<sub>${renderHTML({
            nodes: node.children,
            components,
          })}</sub>`;
        }
        case 'superscript': {
          return `<sup>${renderHTML({
            nodes: node.children,
            components,
          })}</sup>`;
        }
        case 'blockquote': {
          return `<blockquote>${renderHTML({
            nodes: node.children,
            components,
          })}</blockquote>`;
        }
        default: {
          return `<span style={{ color: 'red' }}>
            Unsupported node found in MarkdownRenderer. Type: ${(node as MarkdownNode).type}}
          </span>`;
        }
      }
    })
    .join('');
