
const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    default: 'Trainer' 
  },
  joinDate: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports = mongoose.model('Trainer', trainerSchema);