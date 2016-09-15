'use strict';

function getBannerData(app) {
  let db = app.get('database');
  return db.collection('banner').find({}).sort({createdAt: -1}).toArray();
}

module.exports = getBannerData;
