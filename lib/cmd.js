/**
 * Command Management System
 * Handles storing, retrieving, and deleting custom bot commands
 * Commands are indexed by file SHA256 hash for quick lookup
 */

const { setDb, getDb } = require("./db/store");
const config = require("./config");

/**
 * License validation key (base64 encoded)
 * Decodes to: "iloveyousoooooomatchbutidontknowwhyilikelovewantu"
 */
const LICENSE_KEY = "aWxvdmV5b3Vzb29vb29vbWF0Y2hidXRpZG9udGtub3d3aHlpbGlrZWxvdmV3YW50dQ==";

const { iChecker } = require("./test/test");
const licenseChecker = iChecker();
const isLicenseValid = licenseChecker == LICENSE_KEY;

/**
 * If license is valid, export command management functions
 */
if (isLicenseValid) {
  /**
   * Store a command in the database
   * @param {string} commandCode - The command code/content
   * @param {Object} messageData - Message object containing file info
   * @param {string} messageType - Type of message (image, document, etc)
   * @param {string} sessionId - Session ID the command is stored under
   * @returns {Promise<void>}
   */
  exports.setCmd = async (commandCode, { message, type }, sessionId) => {
    // Extract file SHA256 hash from message
    const fileSha256 = message.message[type]?.fileSha256;
    const fileHash = fileSha256?.toString("base64");

    // Return -1 if no hash found
    if (!fileHash) {
      return -1;
    }

    // Store command with file hash as key
    config[sessionId].db.cmd = {
      ...config[sessionId].db.cmd,
      [fileHash]: commandCode
    };

    // Save to database
    await setDb(sessionId);
  };

  /**
   * Retrieve all stored commands for a session
   * @param {string} session - Session ID
   * @returns {Promise<Array>} - Array of all commands
   */
  exports.getCmd = async (session) => {
    // Load database first
    await getDb(session);

    // Collect all commands from the command map
    const commands = [];
    for (const fileHash in config[session].db.cmd) {
      commands.push(config[session].db.cmd[fileHash]);
    }

    return commands;
  };

  /**
   * Delete a stored command
   * @param {string|Object} command - Command to delete or message object
   * @param {string} session - Session ID
   * @returns {Promise<void>}
   */
  exports.delCmd = async (command, session) => {
    // If command is a string, find and delete by command content
    if (typeof command === "string") {
      const hashesToDelete = Object.keys(config[session].db.cmd).filter(
        hash => config[session].db.cmd[hash] === command
      );

      // Return -1 if command not found
      if (!hashesToDelete.length) {
        return -1;
      }

      // Delete all matching hashes
      hashesToDelete.forEach(hash => {
        delete config[session].db.cmd[hash];
      });
    } 
    // If command is an object, extract hash and delete
    else {
      const fileSha256 = command?.message?.message?.[command.type]
        ?.fileSha256?.toString("base64");

      if (!fileSha256) {
        return -1;
      }

      delete config[session].db.cmd[fileSha256];
    }

    // Save changes to database
    await setDb(session);
  };
}

/**
 * List of spoofed device models for bot behavior
 * Used to mimic different Android devices
 */
exports.phonesList = [
  {
    manufacturer: "Xiaomi",
    model: "POCO F1"
  },
  {
    manufacturer: "Xiaomi",
    model: "Redmi 9A"
  },
  {
    manufacturer: "Xiaomi",
    model: "Xiaomi Mi 4"
  },
  {
    manufacturer: "Vivo",
    model: "Vivo Y20T"
  },
  {
    manufacturer: "OnePlus",
    model: "OnePlus 8T"
  },
  {
    manufacturer: "Realme",
    model: "Realme 8 5G"
  },
  {
    manufacturer: "Samsung",
    model: "Samsung Galaxy M51"
  }
];
