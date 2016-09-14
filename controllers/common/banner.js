'use strict';

function getBannerData(app) {
  let db = app.get('database');
  return db.collection('banner').find({}).toArray();
}

module.exports = getBannerData;
