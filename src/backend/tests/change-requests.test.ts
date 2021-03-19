import { ChangeRequest } from 'utils/src/types/change-request-types';
import { exampleCRs } from '../functions/change-requests';

describe('some example change requests', () => {
  it('contains 2 change requests', () => {
    expect(exampleCRs.length).toBe(2);
  });

  it('has all required fields', () => {
    exampleCRs.forEach((cr) => {
      expect(cr.hasOwnProperty('wbsNum')).toBeTruthy();
      expect(cr.hasOwnProperty('id')).toBeTruthy();
      expect(cr.hasOwnProperty('submitter')).toBeTruthy();
      expect(cr.hasOwnProperty('type')).toBeTruthy();
    });
  });

  it('has proper project wbsNums', () => {
    exampleCRs.forEach((cr) => {
      const changeRequest: ChangeRequest = cr;
      const wbs: Array<string> = changeRequest.wbsNum.split('.');
      expect(changeRequest.wbsNum).toBeTruthy();
    });
  });
});
