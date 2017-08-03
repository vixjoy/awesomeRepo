
const mongoose = require('mongoose');

exports.schema = {
  username: { type: String, index: true },
  password: String,
  type: String,
  info: mongoose.Schema.Types.Mixed
};
