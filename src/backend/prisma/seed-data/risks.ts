/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

const dbSeedRisk1: any = {
  projectId: 1,
  detail: 'This one might be a bit too expensive',
  createdByUserId: 1
};

const dbSeedRisk2: any = {
  projectId: 1,
  detail: 'Risky Risk 123',
  createdByUserId: 1
};

export const dbSeedAllRisks: any[] = [dbSeedRisk1, dbSeedRisk2];
