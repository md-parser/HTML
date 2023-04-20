import { parseMarkdown } from '../../parseMarkdown';
import cases from './cases.v0.30.json';

describe('commonMark tests', () => {
  console.log({ cases });

  cases.map((testcase) => {
    it(`${testcase.section} | ${testcase.markdown}`, () => {
      const ast = parseMarkdown(testcase.markdown);

      expect(ast).toEqual([
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'Hello world',
            },
          ],
        },
      ]);
    });
  });
});
