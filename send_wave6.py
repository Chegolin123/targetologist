"""Wave 6 sender — 30 leads, 1 email per 45s to avoid Yandex spam filter."""
import sys
import time
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from wave6_leads import LEADS

SMTP_HOST = "smtp.yandex.ru"
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}"


def build_body(niche):
    return f"""Здравствуйте!

Меня зовут Алексей Чеголин, настраиваю и веду рекламу в Яндекс.Директ и VK Рекламе ({niche} и смежные запросы).

Предложение: бесплатный разбор ваших текущих кампаний — покажу, где теряется бюджет и как снизить стоимость заявки. Это 15 минут, без обязательств.

Если интересно — напишите в Telegram @NoWayWhile, пришлю разбор в течение дня.{SIGNATURE}"""


def send_one(to, body):
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    server.starttls(context=ssl.create_default_context())
    server.ehlo()
    server.login(SENDER, PASSWORD)
    msg = MIMEMultipart("alternative")
    msg["From"] = SENDER
    msg["To"] = to
    msg["Subject"] = "Бесплатный разбор рекламы"
    msg["Reply-To"] = SENDER
    msg.attach(MIMEText(body, "plain", "utf-8"))
    server.sendmail(SENDER, [to], msg.as_string())
    server.quit()


def main():
    sent, failed = 0, 0
    for i, (to, company, niche) in enumerate(LEADS):
        try:
            send_one(to, build_body(niche))
            print(f"✅ [{i+1}/{len(LEADS)}] {to} ({company})")
            sent += 1
        except Exception as e:
            print(f"❌ [{i+1}/{len(LEADS)}] {to} | {str(e)[:60]}")
            failed += 1
        if i < len(LEADS) - 1:
            time.sleep(45)
    print(f"\nИТОГ: {sent} отправлено, {failed} ошибок")


if __name__ == "__main__":
    main()
