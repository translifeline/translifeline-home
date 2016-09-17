'use strict';

function getDonateData(app) {
  let db = app.get('database');
  return db.collection('donate').findOne({});
}

module.exports = getDonateData;
