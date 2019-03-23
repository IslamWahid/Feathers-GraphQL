const createService = require('feathers-mongodb');

module.exports = function () {
  const app = this;
  const mongoClient = app.get('mongoClient');

  app.use('/countries', createService({}));

  const service = app.service('countries');

  mongoClient.then(db => {
    service.Model = db.collection('countries');
  });
};
