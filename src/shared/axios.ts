/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import axios from 'axios';

export const apiFetch = axios.create({
  baseURL: '/.netlify/functions/'
});
