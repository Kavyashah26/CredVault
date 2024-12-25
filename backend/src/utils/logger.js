const mongoose = require('mongoose');

// MongoDB schema for activity logs
const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  projectId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model('ActivityLog', activitySchema);

exports.logActivity = async (activity) => {
  try {
    const log = new ActivityLog(activity);
    await log.save();
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
