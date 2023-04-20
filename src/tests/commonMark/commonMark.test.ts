import { markdownParser } from '../../render';
import cases from './cases.v0.30.json';

describe('commonMark tests', () => {
  console.log({ cases });

  cases.map((testcase) => {
    it(`Example ${testcase.example} | ${testcase.section} | ${testcase.markdown}`, () => {
      const html = markdownParser({ children: testcase.markdown, components: {} });

      expect(testcase.html).toEqual(html);
    });
  });
});
