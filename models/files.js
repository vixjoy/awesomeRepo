
exports.schema = {
  path: String,
  username: String
};

exports.index = [
  {
    path: 1,
    username: 2
  },
  {
    unique: true
  }
];
