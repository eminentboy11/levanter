/**
 * Backup Module - Handles automatic backups to Google Drive
 * Supports scheduled daily backups via cron jobs
 */

const fs = require("fs-extra");
const path = require("path");
const cron = require("cron");
const config = require("../config");

const {
  refreshUserToken,
  initiateUserToken,
  validateUserCode
} = require("./google-auth");

const {
  uploadFile,
  uploadUrlToDrive
} = require("./gdrive");

const {
  getGAuth
} = require("./db");

// Store for tracking scheduled backup jobs
const scheduledBackupJobs = new Map();

/**
 * Validate user code and setup backup cron if successful
 * @param {string} userCode - User validation code
 * @param {string} session - Session ID (default: "0")
 * @returns {Promise<boolean>} - Validation status
 */
const validateUserCodeWithBackup = async (userCode, session = "0") => {
  const isValid = await validateUserCode(userCode, session);
  
  if (isValid) {
    await setupBackupCron(session);
  }
  
  return isValid;
};

/**
 * Perform backup of important files to Google Drive
 * @param {string} url - URL to backup (if string provided)
 * @param {string} filename - Filename for backup
 * @param {boolean} ignoreFail - Ignore failure errors
 * @param {string} session - Session ID (default: "0")
 * @returns {Promise<void>}
 */
const backup = async (url, filename, ignoreFail = false, session = "0") => {
  // If URL is provided, backup the URL directly
  if (url && typeof url === "string") {
    return uploadUrlToDrive(url, filename, session);
  }

  // Files to backup
  const filesToBackup = [
    path.join(__dirname, "../config.env"),
    path.join(__dirname, "../database.db"),
    path.join(__dirname, "../config.json")
  ];

  // Backup each file
  for (const filePath of filesToBackup) {
    if (fs.existsSync(filePath)) {
      try {
        await uploadFile(filePath, session);
      } catch (error) {
        config.logger.error(error.stack);
        
        // Throw error if not ignoring failures
        if (!ignoreFail) {
          throw new Error(error.message);
        }
      }
    }
  }
};

/**
 * Setup automatic daily backup using cron job
 * Runs at 3:00 AM UTC every day
 * @param {string} session - Session ID (default: "0")
 * @returns {Promise<void>}
 */
const setupBackupCron = async (session = "0") => {
  // Stop existing job if running
  if (scheduledBackupJobs.has(session)) {
    scheduledBackupJobs.get(session).stop();
    scheduledBackupJobs.delete(session);
  }

  // Check if user has Google auth token
  const hasGoogleToken = await getGAuth("google_token", session);
  if (!hasGoogleToken) {
    return;
  }

  // Create cron job for daily backup at 3:00 AM
  const backupJob = cron.CronJob.from({
    cronTime: "0 3 * * *",  // 3:00 AM every day
    onTick: async () => {
      try {
        // Run backup with error tolerance
        await backup(null, null, true, session);
        config.logger.info(`Daily backup completed for session ${session}`);
      } catch (error) {
        config.logger.error(
          `Backup failed for session ${session}: ${error.message}`
        );
      }
    },
    start: true,
    timeZone: process.env.TIMEZONE || process.env.TZ || "UTC"
  });

  // Store the job for later management
  scheduledBackupJobs.set(session, backupJob);
};

/**
 * Export all backup functions
 */
module.exports = {
  backup,
  validateUserCode: validateUserCodeWithBackup,
  initiateUserToken,
  uploadUrlToDrive,
  setupBackupCron
};
