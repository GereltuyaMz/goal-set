const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Add text']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Goals', goalSchema);