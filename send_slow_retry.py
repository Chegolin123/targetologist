"""Slow retry: 1 email per 60s to avoid Yandex spam filter."""
import smtplib, ssl, time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}"

LEADS = [
    ("info@blagodat-sk.ru", "Реклама в Директе — ремонт квартир", "ремонт квартир"),
    ("sale@gruzchiki.ru", "Реклама — грузоперевозки Москва", "грузоперевозки"),
    ("64968877@mail.ru", "Реклама — натяжные потолки", "натяжные потолки"),
    ("info@bani-msk.ru", "Реклама — строительство бань", "строительство бань"),
    ("index@landshaft-msk.ru", "Реклама — ландшафтный дизайн", "ландшафтный дизайн"),
    ("support@pravoved.ru", "Реклама — юридические услуги", "юридические услуги"),
    ("info@stella-repair.ru", "Реклама — ремонт квартир", "ремонт квартир"),
]

def build_body(niche):
    return f"""Здравствуйте!

Меня зовут Алексей Чеголин, настраиваю и веду рекламу в Яндекс.Директ и VK Рекламе ({niche} и смежные запросы).

Предложение: бесплатный разбор ваших текущих кампаний — покажу, где теряется бюджет и как снизить стоимость заявки. Это 15 минут, без обязательств.

Если интересно — напишите в Telegram @NoWayWhile, пришлю разбор в течение дня.{SIGNATURE}"""

def send_one(to, subject, body):
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    server.starttls(context=ssl.create_default_context())
    server.ehlo()
    server.login(SENDER, PASSWORD)
    msg = MIMEMultipart("alternative")
    msg["From"] = SENDER
    msg["To"] = to
    msg["Subject"] = subject
    msg["Reply-To"] = SENDER
    msg.attach(MIMEText(body, "plain", "utf-8"))
    server.sendmail(SENDER, [to], msg.as_string())
    server.quit()

sent, failed = 0, 0
for i, (to, subject, niche) in enumerate(LEADS):
    try:
        send_one(to, subject, build_body(niche))
        print(f"✅ [{i+1}/{len(LEADS)}] {to}")
        sent += 1
    except Exception as e:
        print(f"❌ [{i+1}/{len(LEADS)}] {to} | {str(e)[:70]}")
        failed += 1
    if i < len(LEADS) - 1:
        print(f"   ⏳ пауза 60с...")
        time.sleep(60)

print(f"\nИТОГ: {sent} отправлено, {failed} ошибок")
