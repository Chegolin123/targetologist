"""Wave 4 retry — 7 spam-rejected emails with varied subjects."""
import smtplib
import ssl
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}"

LEADS = [
    ("info@blagodat-sk.ru", "Вопрос по рекламе в Директе", "ремонт квартир"),
    ("sale@gruzchiki.ru", "Предложение по грузоперевозкам", "грузоперевозки Москва"),
    ("64968877@mail.ru", "Реклама для натяжных потолков", "натяжные потолки"),
    ("info@bani-msk.ru", "Идея для рекламы бани", "строительство бань"),
    ("index@landshaft-msk.ru", "Реклама для ландшафтного дизайна", "ландшафтный дизайн"),
    ("support@pravoved.ru", "Реклама юридических услуг", "юридические услуги"),
    ("info@stella-repair.ru", "Реклама для ремонта квартир", "ремонт квартир"),
]


def build_body(niche):
    return f"""Здравствуйте!

Меня зовут Алексей Чеголин, занимаюсь настройкой и ведением рекламы в Яндекс.Директ и VK Рекламе ({niche} и смежные запросы).

Полезное предложение: бесплатный разбор ваших текущих кампаний — покажу, где теряется бюджет и как снизить стоимость заявки. Это 15 минут, без обязательств.

Если интересно — напишите в Telegram @NoWayWhile, пришлю разбор в течение дня.{SIGNATURE}"""


def send_all():
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    server.starttls(context=ssl.create_default_context())
    server.ehlo()
    server.login(SENDER, PASSWORD)
    print(f"✅ Logged in\n")

    sent, failed = 0, 0
    for i, (to, subject, niche) in enumerate(LEADS):
        msg = MIMEMultipart("alternative")
        msg["From"] = SENDER
        msg["To"] = to
        msg["Subject"] = subject
        msg["Reply-To"] = SENDER
        msg.attach(MIMEText(build_body(niche), "plain", "utf-8"))
        try:
            server.sendmail(SENDER, [to], msg.as_string())
            print(f"✅ SENT → {to}")
            sent += 1
        except Exception as e:
            print(f"❌ FAILED → {to} | {str(e)[:60]}")
            failed += 1
        time.sleep(3)

    server.quit()
    print(f"\nИТОГ: {sent} отправлено, {failed} ошибок")


if __name__ == "__main__":
    send_all()
