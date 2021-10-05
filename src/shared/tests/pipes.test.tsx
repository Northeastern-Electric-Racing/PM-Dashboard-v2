/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import {
  booleanPipe,
  dollarsPipe,
  emDashPipe,
  emptyStringPipe,
  linkPipe,
  weeksPipe,
  datePipe,
  endDatePipe,
  listPipe,
  wbsPipe,
  fullNamePipe
} from '../pipes';
import {
  exampleWorkPackage1,
  exampleWorkPackage2,
  exampleWorkPackage3
} from '../../test-support/test-data/work-packages.stub';
import {
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
} from '../../test-support/test-data/projects.stub';
import {
  exampleAdminUser,
  exampleAppAdminUser,
  exampleGuestUser,
  exampleLeadershipUser,
  exampleMemberUser,
  exampleProjectLeadUser,
  exampleProjectManagerUser,
  exampleAllUsers
} from '../../test-support/test-data/users.stub';
import { exampleAllWbsNums } from '../../test-support/test-data/wbs-numbers.stub';

describe('Formatting lists tests', () => {
  test('Formatting Wbs Numbers', () => {
    expect(listPipe(exampleWorkPackage1.dependencies, wbsPipe)).toBe('');
    expect(listPipe(exampleWorkPackage2.dependencies, wbsPipe)).toBe('1.1.1');
    expect(listPipe(exampleWorkPackage3.dependencies, wbsPipe)).toBe('1.12.0, 2.5.0');
    expect(listPipe(exampleAllWbsNums, wbsPipe)).toBe(
      '1.1.1, 2.7.3, 1.12.0, 2.5.0, 1.1.1, 1.7.1, 1.7.3'
    );
  });

  test('Formatting Rules', () => {
    expect(listPipe(exampleProject1.rules, (str: string) => str)).toBe('EV3.5.2');
    expect(listPipe(exampleProject2.rules, (str: string) => str)).toBe('T12.3.2, T8.2.6');
    expect(listPipe(exampleProject3.rules, (str: string) => str)).toBe(
      'EV3.5.2, EV1.4.7, EV6.3.10'
    );
    expect(listPipe(exampleProject5.rules, (str: string) => str)).toBe(
      'EV3.5.2, T12.3.2, T8.2.6, EV1.4.7, EV6.3.10'
    );
  });

  test('Formatting Users', () => {
    expect(listPipe(exampleAllUsers, fullNamePipe)).toBe(
      'Thomas Emrax, Joe Shmoe, Joe Blow, Amy Smith, Rachel Barmatha, Emily Bendara, Jackson James'
    );
  });

  test('For Other Cases', () => {
    expect(listPipe([1, 2, 3, 4], (num: number) => `${num}`)).toBe('1, 2, 3, 4');
    expect(listPipe([], (num: number) => `${num}`)).toBe('');
    expect(listPipe([1], (num: number) => `${num}`)).toBe('1');
  });
});

describe('Formatting End Date Tests', () => {
  test('with dummy data', () => {
    expect(endDatePipe(exampleWorkPackage1.startDate, exampleWorkPackage1.duration)).toBe(
      '1/22/2021'
    );
    expect(endDatePipe(exampleWorkPackage2.startDate, exampleWorkPackage2.duration)).toBe(
      '2/26/2021'
    );
    expect(endDatePipe(exampleWorkPackage3.startDate, exampleWorkPackage3.duration)).toBe(
      '1/15/2021'
    );
  });

  test('with edge dates', () => {
    expect(endDatePipe(new Date('12/25/20'), 3)).toBe('1/15/2021');
    expect(endDatePipe(new Date('1/3/21'), 3)).toBe('1/24/2021');
    expect(endDatePipe(new Date('3/1/21'), 10)).toBe('5/10/2021');
  });
});

describe('Formatting Links Tests', () => {
  test('with known websites', () => {
    expect(linkPipe('google', 'www.google.com')).toStrictEqual(
      <a href={'www.google.com'}>{'google'}</a>
    );
    expect(linkPipe('facebook', 'www.facebook.com')).toStrictEqual(
      <a href={'www.facebook.com'}>{'facebook'}</a>
    );
    expect(linkPipe('github', 'www.github.com')).toStrictEqual(
      <a href={'www.github.com'}>{'github'}</a>
    );
  });
});

describe('Formatting Weeks Tests', () => {
  test('with 1', () => {
    expect(weeksPipe(1)).toBe('1 week');
  });
  test('with int > 1', () => {
    expect(weeksPipe(2)).toBe('2 weeks');
  });
  test('with 0', () => {
    expect(weeksPipe(0)).toBe('0 weeks');
  });
  test('with decimal', () => {
    expect(weeksPipe(1.5)).toBe('1.5 weeks');
  });
  test('with hexadecimal', () => {
    expect(weeksPipe(0x37cf)).toBe('14287 weeks');
  });
  test('with octal', () => {
    expect(weeksPipe(0o377)).toBe('255 weeks');
  });
  test('with binary', () => {
    expect(weeksPipe(0b111001)).toBe('57 weeks');
  });
});

describe('Formatting Dollars Tests', () => {
  test('with 1', () => {
    expect(dollarsPipe(1)).toBe('$1');
  });
  test('with int > 1', () => {
    expect(dollarsPipe(2)).toBe('$2');
  });
  test('with 0', () => {
    expect(dollarsPipe(0)).toBe('$0');
  });
  test('with decimal', () => {
    expect(dollarsPipe(6.9)).toBe('$6.9');
    expect(dollarsPipe(4.2)).toBe('$4.2');
  });
  test('with hexadecimal', () => {
    expect(dollarsPipe(0x37cf)).toBe('$14287');
  });
  test('with octal', () => {
    expect(dollarsPipe(0o377)).toBe('$255');
  });
  test('with binary', () => {
    expect(dollarsPipe(0b111001)).toBe('$57');
  });
});

describe('Formatting Booleans', () => {
  test('Formatting booleans', () => {
    expect(booleanPipe(true)).toBe('YES');
    expect(booleanPipe(false)).toBe('NO');
  });
});

describe('Formatting Empty Strings Without Dash', () => {
  test('empty string', () => {
    expect(emptyStringPipe('')).toBe('');
  });
  test('empty string with space', () => {
    expect(emptyStringPipe(' ')).toBe(' ');
  });
  test('non-empty string', () => {
    expect(emptyStringPipe('abcd')).toBe('abcd');
  });
  test('non-empty string with numbers', () => {
    expect(emptyStringPipe('123')).toBe('123');
  });
  test('non-empty string with special characters', () => {
    expect(emptyStringPipe('!@#$%^&*()}{:">?')).toBe('!@#$%^&*()}{:">?');
  });
});

describe('Formatting Empty Strings With Dash', () => {
  test('empty string', () => {
    expect(emDashPipe('')).toBe('');
  });
  test('empty string with space', () => {
    expect(emDashPipe(' ')).toBe(' ');
  });
  test('non-empty string', () => {
    expect(emDashPipe('abcd')).toBe('abcd');
  });
  test('non-empty string with numbers', () => {
    expect(emDashPipe('123')).toBe('123');
  });
  test('non-empty string with special characters', () => {
    expect(emDashPipe('!@#$%^&*()}{:">?')).toBe('!@#$%^&*()}{:">?');
  });
});

describe('Formatting Dates', () => {
  test('empty constructor/current time', () => {
    let current_time = new Date();
    let answer = current_time.toLocaleString('en-US');
    expect(datePipe(new Date())).toBe(answer);
  });
  test('milliseconds', () => {
    expect(datePipe(new Date(99999999))).toBe('1/1/1970, 10:46:39 PM');
  });
  test('datestring', () => {
    expect(datePipe(new Date('2021-10-5'))).toBe('10/5/2021, 12:00:00 AM');
  });
  test('custom detailed', () => {
    expect(datePipe(new Date(2021, 0o11, 0o5, 14, 3, 6, 9))).toBe('10/5/2021, 2:03:06 PM');
  });
});

describe('Formatting Wbs Numbers', () => {
  test('with dummy data', () => {
    expect(wbsPipe(exampleWorkPackage1.wbsNum)).toBe('1.1.1');
    expect(wbsPipe(exampleWorkPackage2.wbsNum)).toBe('1.1.2');
    expect(wbsPipe(exampleWorkPackage3.wbsNum)).toBe('2.7.3');
    expect(wbsPipe(exampleProject1.wbsNum)).toBe('1.1.0');
    expect(wbsPipe(exampleProject2.wbsNum)).toBe('1.2.0');
    expect(wbsPipe(exampleProject3.wbsNum)).toBe('1.12.0');
    expect(wbsPipe(exampleProject4.wbsNum)).toBe('2.5.0');
    expect(wbsPipe(exampleProject5.wbsNum)).toBe('2.7.0');
  });
});

describe('Formatting Full Names', () => {
  test('with dummy data', () => {
    expect(fullNamePipe(exampleAdminUser)).toBe('Joe Shmoe');
    expect(fullNamePipe(exampleAppAdminUser)).toBe('Thomas Emrax');
    expect(fullNamePipe(exampleGuestUser)).toBe('Jackson James');
    expect(fullNamePipe(exampleMemberUser)).toBe('Emily Bendara');
    expect(fullNamePipe(exampleLeadershipUser)).toBe('Joe Blow');
    expect(fullNamePipe(exampleProjectManagerUser)).toBe('Rachel Barmatha');
    expect(fullNamePipe(exampleProjectLeadUser)).toBe('Amy Smith');
  });
});
