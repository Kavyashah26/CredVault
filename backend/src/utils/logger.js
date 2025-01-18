// const mongoose = require('mongoose');

// // MongoDB schema for activity logs
// const activitySchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   action: { type: String, required: true },
//   details: { type: String, required: true },
//   projectId: { type: String },
//   timestamp: { type: Date, default: Date.now },
// });

// const ActivityLog = mongoose.model('ActivityLog', activitySchema);

// exports.logActivity = async (activity) => {
//   try {
//     const log = new ActivityLog(activity);
//     await log.save();
//   } catch (error) {
//     console.error('Error logging activity:', error);
//   }
// };


const mongoose = require('mongoose');

// Enum-like structure for actions
const ActionTypes = {
  CRED: {
    CREDENTIAL_ACCESSED: 'CREDENTIAL_ACCESSED',
    CREDENTIAL_UPDATED: 'CREDENTIAL_UPDATED',
    CREDENTIAL_DELETED: 'CREDENTIAL_DELETED',
  },
  ACCOUNT: {
    PROFILE_UPDATED: 'PROFILE_UPDATED',
    USER_ADDED_TO_PROJECT: 'USER_ADDED_TO_PROJECT',
    MEMBER_REMOVED_FROM_PROJECT: 'MEMBER_REMOVED_FROM_PROJECT',
  },
  ACTIVITY: {
    PROJECT_CREATED: 'PROJECT_CREATED',
    PROJECT_DELETED: 'PROJECT_DELETED',
    ACTIVITY_LOGGED: 'ACTIVITY_LOGGED',
  },
};

// MongoDB schema for activity logs
const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true, enum: Object.values(ActionTypes).flatMap(Object.values) },
  details: { type: String, required: true },
  projectId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model('ActivityLog', activitySchema);

// Function to log activity with individual fields
exports.logActivity = async (userId, action, details, projectId = null) => {
  try {
    // Validate action against the ActionTypes enum
    if (!Object.values(ActionTypes).flatMap(Object.values).includes(action)) {
      throw new Error(`Invalid action type: ${action}`);
    }

    const log = new ActivityLog({
      userId,
      action,
      details,
      projectId,
    });
    await log.save();
  } catch (error) {
    console.error('Error logging activity:', error.message || error);
  }
};

// Export ActionTypes for reuse in other parts of the app
exports.ActionTypes = ActionTypes;
