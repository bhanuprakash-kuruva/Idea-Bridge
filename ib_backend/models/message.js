const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: false },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: String },
  timestamp: { type: Date, default: Date.now },

  type: {
    type: String,
    enum: ['text', 'image', 'video', 'file', 'voice'],
    default: 'text'
  },

  // Updated attachments field to expect an array of objects
  attachments: [{
    url: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: false }, // fileSize is optional
    type: { type: String, required: false },    // type is optional
  }],

  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },

  edited: { type: Boolean, default: false },
  editedAt: Date,

  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,

  isPinned: { type: Boolean, default: false },

  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },

  reactions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String
  }],

  expiresAt: Date,

  encrypted: { type: Boolean, default: false },
  encryptionType: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
