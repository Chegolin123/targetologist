#!/usr/bin/env python3
"""
IMAP → Telegram forwarder for chegol45@yandex.ru.
Polls inbox every 45s; forwards ONLY messages newer than last check
(no backfill of old unseen mail).
Deployed on VPS NL (has access to api.telegram.org, blocked from RU).
"""
import imaplib
import email
import json
import os
import time
import urllib.request
from email.header import decode_header
from datetime import datetime, timedelta

IMAP_HOST = "imap.yandex.ru"
IMAP_PORT = 993
USER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"

TG_TOKEN = "TG_BOT_TOKEN_FROM_ENV"
TG_CHAT_ID = "[CHAT_ID]"
TG_URL = f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage"

# Don't forward newsletters / system mail
IGNORE_SENDERS = ["realty.yandex", "market.yandex", "id.yandex",
                  "news@", "mailer@", "noreply@", "no-reply@", "subscribe@",
                  "support@yandex", "telegram.org", "github.com"]

# Only look at mail newer than this window each poll
LOOKBACK_MINUTES = 10
MAX_PER_POLL = 3          # hard cap — never flood
POLL_INTERVAL = 45
STATE_FILE = "/opt/.imap_tg_last_run"


def dec(s):
    if not s:
        return ""
    parts = decode_header(s)
    out = ""
    for txt, enc in parts:
        if isinstance(txt, bytes):
            out += txt.decode(enc or "utf-8", errors="replace")
        else:
            out += txt
    return out


def load_last_run():
    try:
        with open(STATE_FILE) as f:
            return float(f.read().strip())
    except Exception:
        return time.time()


def save_last_run(ts):
    try:
        with open(STATE_FILE, "w") as f:
            f.write(str(ts))
    except Exception:
        pass


def send_tg(text):
    payload = json.dumps({"chat_id": TG_CHAT_ID, "text": text}).encode("utf-8")
    req = urllib.request.Request(
        TG_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())


def is_ignored(from_addr):
    fa = from_addr.lower()
    return any(ig in fa for ig in IGNORE_SENDERS)


def main():
    print("IMAP→TG forwarder started (new mail only)")
    while True:
        try:
            # Look back 3 days to survive any gaps; filter by INTERNALDATE
            # (server receive time — no timezone confusion like Date header)
            since_dt = datetime.now() - timedelta(days=3)
            since_str = since_dt.strftime("%d-%b-%Y")

            m = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT)
            m.login(USER, PASSWORD)
            m.select("INBOX")
            status, data = m.search(None, "UNSEEN", "SINCE", since_str)
            ids = data[0].split()
            print(f"Poll: {len(ids)} unseen since {since_str}", flush=True)

            forwarded = 0
            for i in ids:
                if forwarded >= MAX_PER_POLL:
                    break
                status, msg_data = m.fetch(i, "(BODY.PEEK[] INTERNALDATE)")
                if not msg_data or not msg_data[0]:
                    continue
                msg = email.message_from_bytes(msg_data[0][1])
                frm = dec(msg.get("From", "?"))
                subj = dec(msg.get("Subject", "?"))
                # INTERNALDATE is in bytes: b'06-Aug-2026 23:11:45 +0000'
                internal = b""
                for item in msg_data:
                    if isinstance(item, tuple) and b"INTERNALDATE" in item[0]:
                        internal = item[0]
                internal_str = internal.decode("utf-8", "replace") if internal else ""
                # Parse INTERNALDATE: "06-Aug-2026 23:11:45 +0000"
                try:
                    parts = internal_str.split('"')[1].split(" ")
                    idt = datetime.strptime(" ".join(parts[:2]), "%d-%b-%Y %H:%M:%S")
                    if time.time() - idt.timestamp() > LOOKBACK_MINUTES * 60:
                        continue
                except Exception:
                    pass

                if is_ignored(frm):
                    continue

                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            body = part.get_payload(decode=True).decode("utf-8", errors="replace")
                            break
                else:
                    body = msg.get_payload(decode=True).decode("utf-8", errors="replace")

                body = body[:800]
                tg_text = (
                    f"📬 НОВОЕ ПИСЬМО НА ПОЧТЕ\n"
                    f"━━━━━━━━━━━━━━━━━\n"
                    f"📧 От: {frm}\n"
                    f"📌 Тема: {subj}\n"
                    f"━━━━━━━━━━━━━━━━━\n"
                    f"{body}"
                )
                try:
                    r = send_tg(tg_text)
                    if r.get("ok"):
                        print(f"✅ Forwarded: {subj[:40]}")
                        m.store(i, "+FLAGS", "\\Seen")
                        forwarded += 1
                    else:
                        print(f"❌ TG error: {r.get('description')}")
                except Exception as e:
                    print(f"❌ Send failed: {e}")

            save_last_run(time.time())
            m.logout()
        except Exception as e:
            print(f"⚠️ Poll error: {e}", flush=True)
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
