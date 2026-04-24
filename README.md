# ALBotics Website

## Browser Calling (Twilio Voice WebRTC)

This project supports browser-based calling to the existing bot backend.

### Flow

1. User clicks **`kliko këtu`** on homepage.
2. Website opens **`/web-call`**.
3. Frontend requests a Twilio Access Token from **`/api/voice/token`**.
4. Twilio Voice JS SDK starts a browser call (WebRTC).
5. Twilio routes call to your existing TwiML App Voice URL (Heroku backend `/voice`).

---

## Required environment variables

Add these to `.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY_SECRET=your_twilio_api_key_secret
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEB_VOICE_TOKEN_TTL_SECONDS=3600
```

### Email/contact vars (already used by contact/demo forms)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password_or_app_password
SMTP_FROM=your_from_email
```

---

## Twilio setup

### 1) Create API Key (SK...)

Twilio Console -> **Account** -> **API Keys & Tokens** -> Create key.

Use:
- SID as `TWILIO_API_KEY_SID`
- Secret as `TWILIO_API_KEY_SECRET`

### 2) Create TwiML App (AP...)

Twilio Console -> **Develop** -> **Voice** -> **TwiML Apps** -> Create app.

Set **Voice Request URL** to:

`https://albots-voice-mvp.herokuapp.com/voice`

Then use the app SID as:
- `TWILIO_TWIML_APP_SID`

---

## Local test checklist

1. Fill `.env.local` with Twilio vars.
2. Run `npm run dev`.
3. Open homepage and click `kliko këtu`.
4. On `/web-call`, click **Call bot**.
5. Allow microphone permission when browser asks.
6. Confirm status moves to `connected`.
7. Click **Hang up** and confirm status updates to `ended`.

If call fails, check:
- `/api/voice/token` response
- Browser console for Twilio device errors
- Twilio Console debugger logs
