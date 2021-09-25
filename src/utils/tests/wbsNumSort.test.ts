/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { wbsNumSort } from '../../components/projects/projects-table/projects-table/projects-table';

describe('sort wbs numbers', () => {
  it('equal wbsNums, asc', () => {
    const a = '0.0.0';
    const b = '0.0.0';

    expect(wbsNumSort(a, b, 'asc')).toEqual(0);
  });

  it('equal wbsNums, desc', () => {
    const a = '0.0.0';
    const b = '0.0.0';

    expect(wbsNumSort(a, b, 'desc')).toEqual(0);
  });

  it('equal wbsNums with different values for each part, asc', () => {
    const a = '0.1.2';
    const b = '0.1.2';

    expect(wbsNumSort(a, b, 'asc')).toEqual(0);
  });

  it('equal wbsNums with different values for each part, desc', () => {
    const a = '24.36.12';
    const b = '24.36.12';

    expect(wbsNumSort(a, b, 'desc')).toEqual(0);
  });

  it('a.car < b.car, asc', () => {
    const a = '0.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(a, b, 'asc')).toEqual(1);
  });

  it('a.car > b.car, asc', () => {
    const a = '0.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(b, a, 'asc')).toEqual(1);
  });

  it('a.car < b.car, desc', () => {
    const a = '0.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(a, b, 'desc')).toEqual(-1);
  });

  it('a.car > b.car, desc', () => {
    const a = '0.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(b, a, 'desc')).toEqual(-1);
  });

  it('a.project < b.project, asc', () => {
    const a = '1.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(a, b, 'asc')).toEqual(49);
  });

  it('a.project > b.project, asc', () => {
    const a = '1.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(b, a, 'asc')).toEqual(49);
  });

  it('a.project < b.project, desc', () => {
    const a = '1.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(a, b, 'desc')).toEqual(-49);
  });

  it('a.project > b.project, desc', () => {
    const a = '1.7.12';
    const b = '1.56.44';

    expect(wbsNumSort(b, a, 'desc')).toEqual(-49);
  });

  it('a.workPackage < b.workPackage, asc', () => {
    const a = '1.2.12';
    const b = '1.2.44';

    expect(wbsNumSort(a, b, 'asc')).toEqual(32);
  });

  it('a.workPackage > b.workPackage, asc', () => {
    const a = '1.2.12';
    const b = '1.2.44';

    expect(wbsNumSort(b, a, 'asc')).toEqual(32);
  });

  it('a.workPackage < b.workPackage, desc', () => {
    const a = '1.2.12';
    const b = '1.2.44';

    expect(wbsNumSort(a, b, 'desc')).toEqual(-32);
  });

  it('a.workPackage > b.workPackage, desc', () => {
    const a = '1.2.12';
    const b = '1.2.44';

    expect(wbsNumSort(b, a, 'desc')).toEqual(-32);
  });
});
