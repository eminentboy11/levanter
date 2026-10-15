/**
 * Baileys WhatsApp Library Loader
 * This module handles lazy-loading of the Baileys library and its exports
 */

// Global variable to cache the loaded module
let cachedBaileysModule;

/**
 * Lazy-load and export all Baileys functions
 * This ensures the module is only loaded when first accessed
 */
const loadBaileys = async () => 
  cachedBaileysModule || 
  (cachedBaileysModule = (async () => {
    // Import the baileys library
    const baileysImport = await import('baileys');
    
    // Destructure all required exports from baileys
    const {
      default: makeWASocket,
      DisconnectReason,
      delay,
      useMultiFileAuthState,
      fetchLatestBaileysVersion,
      makeCacheableSignalKeyStore,
      makeInMemoryStore,
      proto,
      jidNormalizedUser,
      WAMessageStubType,
      generateWAMessageFromContent,
      getBinaryNodeChild,
      getBinaryNodeChildren,
      areJidsSameUser,
      downloadContentFromMessage,
      generateWAMessageContent,
      jidDecode,
      prepareWAMessageMedia,
      WA_DEFAULT_EPHEMERAL,
      isJidGroup,
      isJidBroadcast,
      normalizeMessageContent,
      downloadMediaMessage,
      BufferJSON,
      initAuthCreds,
      WAProto,
      getUrlInfo,
      extractUrlFromText,
      getContentType,
      getBinaryNodeChildString,
      getKeyAuthor,
      decryptPollVote,
      getAggregateVotesInPollMessage
    } = baileysImport;

    // Return all exports with additional helper functions
    return {
      makeWASocket,
      DisconnectReason,
      delay,
      useMultiFileAuthState,
      fetchLatestBaileysVersion,
      makeCacheableSignalKeyStore,
      makeInMemoryStore,
      proto,
      jidNormalizedUser,
      WAMessageStubType,
      generateWAMessageFromContent,
      getBinaryNodeChild,
      getBinaryNodeChildren,
      areJidsSameUser,
      downloadContentFromMessage,
      generateWAMessageContent,
      jidDecode,
      prepareWAMessageMedia,
      WA_DEFAULT_EPHEMERAL,
      isJidGroup,
      isJidUser: (jid) => !!jid && 
        (jid.endsWith("@s.whatsapp.net") || jid.endsWith("@lid")),
      isJidBroadcast,
      normalizeMessageContent,
      downloadMediaMessage,
      BufferJSON,
      initAuthCreds,
      WAProto,
      getUrlInfo,
      extractUrlFromText,
      getContentType,
      getBinaryNodeChildString,
      getKeyAuthor,
      decryptPollVote,
      getAggregateVotesInPollMessage
    };
  })(), 
  cachedBaileysModule
);

// Export the load function
module.exports = {
  loadBaileys
};
