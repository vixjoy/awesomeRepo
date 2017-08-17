
const mongoose = require('mongoose');

exports.schema = {
  username: { type: String, required: true, index: true, unique: true },
  password: String,
  displayName: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  gender: String,
  info: mongoose.Schema.Types.Mixed
};
