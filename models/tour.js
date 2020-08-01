const mongoose = require('mongoose');

const possibleTourTypes = [
  `I'm too young to die`,
  `Hurt me plenty`,
  `Ultra-violence`,
  `Nightmare`,
  `Ultra-nightmare`
];

const TourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true // This must exist
  },
  tourType: {
    type: String,
    enum: possibleTourTypes,
    default: `I'm too young to die`,
    required: true
  },
  groupSize: {
    type: Number,
    default: 1,
    required: true
  },
  date: {
    type: Date,
    required: true,
    get: function (val) {
      return val.toISOString().split('T')[0]
    }
  }
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});

// Helper attribute
TourSchema.statics.tourTypes = () => possibleTourTypes;

module.exports = mongoose.model('Tour', TourSchema);