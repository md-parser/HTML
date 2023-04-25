import { parseMarkdown, MarkdownNode, ParserConfig } from '@md-parser/parser';

export const renderHTML = (markdown: string, config?: ParserConfig) => {
  const nodes = parseMarkdown(markdown, config);

  return renderNode(nodes);
};

const renderNode = (nodes: MarkdownNode[]): string =>
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
          return `<h${node.level}>${renderNode(node.children)}</h${node.level}>`;
        }
        case 'image': {
          return `<img src="${node.src}" alt="${node.alt}" title="${node.title}" />`;
        }
        case 'link': {
          return `<a href="${node.href}" title="${node.title}">${renderNode(node.children)}</a>`;
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
          return `<${tag}${!!node.start && ` start=${node.start}`}>${renderNode(
            node.children,
          )}</${tag}>`;
        }
        case 'listItem': {
          return `<li>${renderNode(node.children)}</li>`;
        }
        case 'table': {
          return `<table><thead>${renderNode([node.header])}</thead><tbody>${renderNode(
            node.rows,
          )}</tbody></table>`;
        }
        case 'tableRow': {
          return `<tr>${renderNode(node.children)}</tr>`;
        }
        case 'tableHeader': {
          return `<th>${renderNode(node.children)}</th>`;
        }
        case 'tableData': {
          return `<td>${renderNode(node.children)}</td>`;
        }
        case 'paragraph': {
          return `<p>${renderNode(node.children)}</p>`;
        }
        case 'strong': {
          return `<em>${renderNode(node.children)}</em>`;
        }
        case 'emphasis': {
          return `<i>${renderNode(node.children)}</i>`;
        }
        case 'strikeThrough': {
          return `<del>${renderNode(node.children)}</del>`;
        }
        case 'subscript': {
          return `<sub>${renderNode(node.children)}</sub>`;
        }
        case 'superscript': {
          return `<sup>${renderNode(node.children)}</sup>`;
        }
        case 'blockquote': {
          return `<blockquote>${renderNode(node.children)}</blockquote>`;
        }
        default: {
          return `<span style={{ color: 'red' }}>
            Unsupported node found in MarkdownRenderer. Type: ${(node as MarkdownNode).type}}
          </span>`;
        }
      }
    })
    .join('\n');
