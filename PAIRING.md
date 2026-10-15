# Pairing-code login

Log in with a **phone number** instead of scanning a QR code.

## Setup

1. Add the number to `config.env` (or your panel's environment variables):

   ```env
   # digits only, including the country code — no "+", no spaces
   PAIRING_NUMBER="2547xxxxxxxx"
   ```

2. Restart the bot **with a session that is not linked yet** — a fresh session id, or
   `SESSION_ID` empty. A session that already has credentials never emits a QR and will
   not ask for a code.

3. Watch the logs:

   ```
   [0] Requesting pairing code for 254712345678
   [0] Waiting 3s for the socket to stabilise...
   [0] 🔑 Pairing code: ABCD-EFGH
   [0] 1. Open WhatsApp → Settings → Linked devices
   [0] 2. Tap "Link a device"
   [0] 3. Enter the code above (it expires in a few minutes)
   ```

4. On the phone: **WhatsApp → Settings → Linked devices → Link a device → enter the code**.

## How it behaves

| situation | what the bot does |
| --- | --- |
| `PAIRING_NUMBER` set, fresh session | asks WhatsApp for a code on the first `qr` event, skips the QR image |
| running in a terminal, `PAIRING_NUMBER` empty | asks you to type the number |
| running under pm2/panel with no `PAIRING_NUMBER` | no prompt (no stdin) — the QR code is shown as usual |
| code not entered in time | after 3 connection cycles the QR is printed too, so you can scan instead; the session is closed after 6 |
| installed Baileys has no `requestPairingCode()` | logs a warning and falls back to the QR |
| session already connected | nothing — a saved session never emits `qr` |

## Notes

- Digits only: `+254 712-345-678` and `2547-1234-5678` are both accepted and normalised.
- An unregistered session emits several `qr` events; the code is requested **once** per run,
  and the flag is cleared after a successful connection so reconnects don't ask again.
- The code expires after a few minutes — restart the bot for a fresh one.
- A number already linked to 4 devices cannot be added until you remove one.
- Baileys also accepts a custom code: `sock.requestPairingCode(number, "MYCODE12")`
  (second argument). Not used here.

## Where it lives

- `lib/pairing.js` — number normalising, code formatting, the request itself.
- `lib/client.js` — `requestPairingLogin()` and the `qr` event interception in the
  `connection.update` handler.
- `config.js` — the `PAIRING_NUMBER` key (also readable per session from the bot's vars).
