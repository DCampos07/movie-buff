const { Rate } = require('../models');

const ratedata = [
  {
  },
];

const seedRates = () => Rate.bulkCreate(ratedata, { returning: true });

module.exports = seedRates;
