/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '@testing-library/react';
import WorkPackageSummary from './work-package-summary';
import { 
    formatList,
    formatEndDate } from './work-package-summary';
import {
    exampleWorkPackage1,
    exampleWorkPackage2,
    exampleWorkPackage3
} from 'utils';
import { wbsPipe } from '../../shared/pipes';

describe('Formatting lists tests', () => {
    test('Formatting Wbs Numbers', () => {
        expect(formatList(exampleWorkPackage1.dependencies, wbsPipe)).toBe("");
        expect(formatList(exampleWorkPackage2.dependencies, wbsPipe)).toBe("1.1.1");
        expect(formatList(exampleWorkPackage3.dependencies, wbsPipe)).toBe("1.12.0, 2.5.0");
    });

    test('Formatting Rules', () => {
        expect(formatList(exampleWorkPackage1.rules, (str: string): string => { return str; })).toBe("EV3.5.2");
        expect(formatList(exampleWorkPackage2.rules, (str: string): string => { return str; })).toBe("T12.3.2, T8.2.6");
        expect(formatList(exampleWorkPackage3.rules, (str: string): string => { return str; })).toBe("EV1.4.7, EV6.3.10");
    });

    test('for other case', () => {
        expect(formatList([1, 2, 3, 4], (num: number): string => { return "" + num; })).toBe("1, 2, 3, 4");
        expect(formatList([], (num: number): string => { return "" + num; })).toBe("");
        expect(formatList([1], (num: number): string => { return "" + num; })).toBe("1");
    });
});

describe('Formatting end date tests', () => {
    test('with dummy data', () => {
        expect(formatEndDate(exampleWorkPackage1.startDate, exampleWorkPackage1.duration)).toBe("1/22/2021");
        expect(formatEndDate(exampleWorkPackage2.startDate, exampleWorkPackage2.duration)).toBe("2/26/2021");
        expect(formatEndDate(exampleWorkPackage3.startDate, exampleWorkPackage3.duration)).toBe("1/15/2021");
    });

    test('with edge dates', () => {
        expect(formatEndDate(new Date("12/25/20"), 3)).toBe("1/15/2021");
        expect(formatEndDate(new Date("1/3/21"), 3)).toBe("1/24/2021");
        expect(formatEndDate(new Date("3/1/21"), 10)).toBe("5/10/2021");
    });
});

describe('Rendering Work Packagae Summary Test', () => {
    test('Renders title', () => {
        render(<WorkPackageSummary workPackage={exampleWorkPackage1} />);
    });
});