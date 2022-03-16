/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import * as yup from 'yup';

export const reviewNotesSchema = yup.object().shape({
  reviewNotes: yup.string()
});
