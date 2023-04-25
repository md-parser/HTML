import { renderHTML } from '../../render';
import cases from './cases.v0.30.json';

describe('commonMark tests', () => {
  console.log({ cases });

  cases.slice(0, 1).map((testcase) => {
    it(`Example ${testcase.example} | ${testcase.section} | ${testcase.markdown}`, () => {
      const html = renderHTML(testcase.markdown);

      expect(testcase.html).toEqual(html);
    });
  });
});
