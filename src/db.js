const mongoose = require('mongoose');
const schemaVisitors = require('./schema');
const debug = require('debug');
const log = {
  db: debug('db'),
};
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

async function init() {
  const url = 'mongodb://mongo:27017';
  let client;

  try {
    client = await mongoose.connect(url, {
      auth: { user, password },
      useUnifiedTopology: true,
    });
  } catch (e) {
    log.db('connection error', e);

    process.exit(100);
  }

  try {
    const visitors = client.model('Visitors', schemaVisitors);
    const count = await visitors.count();

    log.db(`Visitors collection available (${count} records)`);

    return visitors;
  } catch {
    log.db('Database is not accessible');

    process.exit(50);
  }
}

module.exports = {
  init,
};
