/*
 * This file is part of NER's FinishLine by NERand licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/.netlify/functions/', { 
    target: 'http://localhost:9000/',
    "pathRewrite": {
      "^/\\.netlify/functions": ""
    }
  }));
};