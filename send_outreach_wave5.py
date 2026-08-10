"""Wave 5 — ready to send AFTER Yandex spam-ban expires (24h).
7 verified contacts from live sites."""
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
    ("ozk@baby-club.ru", "Реклама для сети Бэби-клуб", "детские центры развития"),
    ("zbicki-al@yandex.ru", "Реклама — ремонт бытовой техники", "ремонт стиральных машин"),
    ("9037966289@mail.ru", "Реклама — мебель на заказ", "мебель на заказ"),
    ("89151336610@mail.ru", "Реклама — окна и остекление", "окна, остекление балконов"),
    ("info@gruzoperevozki-msk.ru", "Реклама — грузоперевозки", "грузоперевозки Москва"),
    ("info@dez-msk.ru", "Реклама — дезинсекция", "дезинсекция, дезинфекция"),
    ("info@musical-school.ru", "Реклама — музыкальная школа", "обучение музыке"),
]


def build_body(niche):
    return f"""Здравствуйте!

Меня зовут Алексей Чеголин, настраиваю и веду рекламу в Яндекс.Директ и VK Рекламе ({niche} и смежные запросы).

Предложение: бесплатный разбор ваших текущих кампаний — покажу, где теряется бюджет и как снизить стоимость заявки. Это 15 минут, без обязательств.

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
            print(f"✅ [{i+1}/{len(LEADS)}] {to}")
            sent += 1
        except Exception as e:
            print(f"❌ [{i+1}/{len(LEADS)}] {to} | {str(e)[:70]}")
            failed += 1
        time.sleep(5)

    server.quit()
    print(f"\nИТОГ: {sent} отправлено, {failed} ошибок")


if __name__ == "__main__":
    send_all()
