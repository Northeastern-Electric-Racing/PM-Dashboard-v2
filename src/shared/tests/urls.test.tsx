/*
 * This file is part of NER's FinishLine by NER and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { apiUrls } from '../urls';

describe('API URLs Tests', () => {
  describe('all work packages urls', () => {
    it('should return the correct url for all work packages base', () => {
      expect(apiUrls.workPackages()).toEqual('/.netlify/functions/work-packages');
    });

    it('should return the correct url for all work packages filtered by status', () => {
      expect(apiUrls.workPackages({ status: 'ACTIVE' })).toEqual(
        '/.netlify/functions/work-packages?status=ACTIVE'
      );
    });

    it('should return the correct url for all work packages filtered by timelineStatus', () => {
      expect(apiUrls.workPackages({ timelineStatus: 'BEHIND' })).toEqual(
        '/.netlify/functions/work-packages?timelineStatus=BEHIND'
      );
    });

    it('should return the correct url for all work packages filtered by daysUntilDeadline', () => {
      expect(apiUrls.workPackages({ daysUntilDeadline: '14' })).toEqual(
        '/.netlify/functions/work-packages?daysUntilDeadline=14'
      );
    });

    it('should return the correct url for all work packages filtered by status and timelineStatus', () => {
      expect(apiUrls.workPackages({ status: 'ACTIVE', timelineStatus: 'AHEAD' })).toEqual(
        '/.netlify/functions/work-packages?status=ACTIVE&timelineStatus=AHEAD'
      );
    });

    it('should return the correct url for all work packages filtered by status and daysUntilDeadline', () => {
      expect(apiUrls.workPackages({ status: 'COMPLETE', daysUntilDeadline: '12' })).toEqual(
        '/.netlify/functions/work-packages?status=COMPLETE&daysUntilDeadline=12'
      );
    });

    it('should return the correct url for all work packages filtered by timelineStatus and daysUntilDeadline', () => {
      expect(
        apiUrls.workPackages({ timelineStatus: 'VERY_BEHIND', daysUntilDeadline: '10' })
      ).toEqual(
        '/.netlify/functions/work-packages?timelineStatus=VERY_BEHIND&daysUntilDeadline=10'
      );
    });

    it('should return the correct url for all work packages filtered by status, timelineStatus, and daysUntilDeadline', () => {
      expect(
        apiUrls.workPackages({
          status: 'INACTIVE',
          timelineStatus: 'ON_TRACK',
          daysUntilDeadline: '7'
        })
      ).toEqual(
        '/.netlify/functions/work-packages?status=INACTIVE&timelineStatus=ON_TRACK&daysUntilDeadline=7'
      );
    });
  });
});
