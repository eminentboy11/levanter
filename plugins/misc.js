const { bot, setVar, lang, parsedJid } = require('../lib/')
const config = require('../config')

/**
 * AUTO_STATUS_VIEW values the status engine really understands (lib/client.js):
 *
 *   true | false
 *   no-dl        view the status but never forward the media into the bot's chat
 *   hide-view    view without marking it as read (no receipt for the poster)
 *   &delay       wait a random 1s..5min before marking it read
 *   only-view <jids>    only handle statuses from these numbers
 *   except-view <jids>  handle every status *except* these numbers
 *   flags combine: `no-dl&delay`, `only-view 234...@s.whatsapp.net&no-dl&delay`, ...
 *
 * `.status` used to accept only on/off: every other value was silently dropped
 * while still replying "Done", so no-dl / only-view / except-view never worked.
 */
const STATUS_FLAG_WORDS = ['&', '&delay', 'delay', 'no-dl', 'hide-view', 'only-view', 'except-view']

function normalizeStatusJid(token) {
  const value = String(token || '').trim().replace(/^@/, '')
  if (!value) return null
  return /^[0-9]+$/.test(value) ? value + '@s.whatsapp.net' : value
}

function parseStatusValue(match) {
  const input = String(match || '').trim()
  if (!input) return null
  const lower = input.toLowerCase()
  if (lower === 'on' || lower === 'true') return 'true'
  if (lower === 'off' || lower === 'false') return 'false'
  const tokens = lower.replace(/&/g, ' & ').split(/\s+/).filter(Boolean)
  let scope = null
  let jids = []
  let noDl = false
  let hideView = false
  let delay = false
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token === '&') continue
    if (token === '&delay' || token === 'delay') {
      delay = true
      continue
    }
    if (token === 'no-dl') {
      noDl = true
      continue
    }
    if (token === 'hide-view') {
      hideView = true
      continue
    }
    if (token === 'only-view' || token === 'except-view') {
      if (scope) return null
      scope = token
      const collected = []
      for (let j = i + 1; j < tokens.length; j++) {
        if (STATUS_FLAG_WORDS.includes(tokens[j])) break
        collected.push(tokens[j])
      }
      i += collected.length
      const list = collected
        .join(',')
        .split(',')
        .map(normalizeStatusJid)
        .filter(Boolean)
      jids = parsedJid(list.join(','))
      if (!jids.length) return null
      continue
    }
    return null
  }
  if (!scope && !noDl && !hideView) return null
  const parts = []
  if (scope) parts.push(scope + ' ' + jids.join(','))
  if (noDl) parts.push('no-dl')
  if (hideView) parts.push('hide-view')
  const value = parts.join('&')
  return delay ? value + '&delay' : value
}

const currentStatusValue = (session) =>
  (config[session] && config[session].env && config[session].env.AUTO_STATUS_VIEW) || 'false'


function parseReadValue(match) {
  const input = match.trim().toLowerCase()
  if (input === 'on' || input === 'true') return 'true'
  if (input === 'off' || input === 'false') return 'false'
  const [includePart, ...ignoreParts] = input.split(/\bignore\b/)
  const hasIgnore = ignoreParts.length > 0
  const excludeJids = hasIgnore ? parsedJid(ignoreParts.join(' ')) : []
  if (hasIgnore && !excludeJids.length) return null
  const include = []
  for (const token of includePart.split(/[\s,]+/).filter(Boolean)) {
    if (token === 'p' || token === 'g') {
      include.push(token)
    } else {
      const jid = parsedJid(token)[0]
      if (!jid) return null
      include.push(jid)
    }
  }
  if (!include.length && !hasIgnore) return null
  const exclude = hasIgnore ? `ignore ${excludeJids.join(',')}` : ''
  return [include.join(','), exclude].filter(Boolean).join(' ')
}

async function handleSetting(message, setting, match) {
  if (match === 'on' || match === 'off') {
    await setVar(
      {
        [setting]: match === 'on' ? 'true' : match === 'off' ? 'false' : match,
      },
      message.id
    )
  }
}

bot(
  {
    pattern: 'status ?(.*)',
    desc: lang.plugins.status.desc,
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!match) {
      return await message.send(lang.plugins.status.usage + '\n\nCurrent: ' + currentStatusValue(message.id))
    }
    const value = parseStatusValue(match)
    if (value === null) {
      return await message.send(lang.plugins.status.usage + '\n\nCurrent: ' + currentStatusValue(message.id))
    }
    await setVar({ AUTO_STATUS_VIEW: value }, message.id)
    await message.send(lang.plugins.common.update)
  }
)

bot(
  {
    pattern: 'call ?(.*)',
    desc: lang.plugins.call.desc,
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!match) {
      return await message.send(lang.plugins.call.usage)
    }
    await handleSetting(message, 'REJECT_CALL', match)
    await message.send(lang.plugins.common.update)
  }
)

bot(
  {
    pattern: 'read ?(.*)',
    desc: lang.plugins.read.desc,
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!match) {
      return await message.send(lang.plugins.read.usage)
    }
    const value = parseReadValue(match)
    if (value === null) {
      return await message.send(lang.plugins.read.usage)
    }
    await setVar({ SEND_READ: value }, message.id)
    await message.send(lang.plugins.common.update)
  }
)

bot(
  {
    pattern: 'online ?(.*)',
    desc: lang.plugins.online.desc,
    type: 'whatsapp',
  },
  async (message, match) => {
    if (!match) {
      return await message.send(lang.plugins.online.usage)
    }
    await handleSetting(message, 'ALWAYS_ONLINE', match)
    await message.send(lang.plugins.common.update)
  }
)
