#!/usr/bin/env python3
"""
Telegram proxy for the targetologist landing page.
Receives lead form POSTs from the static site (GitHub Pages)
and forwards them to Telegram Bot API.

Deployed on: VPS Netherlands (144.31.207.192) — has access to api.telegram.org
from Russia-blocked environments.
"""
import json
import urllib.request
import urllib.error
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

BOT_TOKEN = "TG_BOT_TOKEN_FROM_ENV"
CHAT_ID = "[CHAT_ID]"
TELEGRAM_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

# Simple shared secret to prevent spam abuse
SECRET = "LEAD_PROXY_SECRET_FROM_ENV"

class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Secret")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Secret")
        self.end_headers()

    def do_POST(self):
        # Parse body first (before any response)
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": False, "error": "bad json"}).encode())
            return

        # Auth check
        if body.get("secret") != SECRET:
            self.send_response(403)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": False, "error": "bad secret"}).encode())
            return

        name = body.get("name", "?")
        contact = body.get("contact", "?")
        message = body.get("message", "")

        text = (
            "🎯 НОВАЯ ЗАЯВКА С САЙТА\n"
            "━━━━━━━━━━━━━━━━━\n"
            f"👤 Имя: {name}\n"
            f"📱 Контакт: {contact}\n"
            f"📝 Сообщение: {message}"
        )

        tg_payload = json.dumps({
            "chat_id": CHAT_ID,
            "text": text,
        }).encode("utf-8")

        try:
            req = urllib.request.Request(
                TELEGRAM_URL,
                data=tg_payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                tg_result = json.loads(resp.read().decode())

            if tg_result.get("ok"):
                self.send_response(200)
            else:
                self.send_response(502)
        except Exception:
            self.send_response(500)

        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"ok": True}).encode())

    def log_message(self, fmt, *args):
        # Quiet logging
        import sys
        sys.stderr.write(f"[lead-proxy] {self.address_string()} {fmt % args}\n")


if __name__ == "__main__":
    PORT = 8888
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    server.request_queue_size = 128
    print(f"Lead proxy listening on :{PORT}")
    server.serve_forever()
