"""Wave 4 — mass cold outreach to 22 Moscow businesses.
Contacts verified from live sites (footer/contacts pages).
"""
import smtplib
import ssl
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}\n+7 993 200-65-51"

# (email, subject, body)
LEADS = [
    ("info@ruscleaning.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("mail@domprofi24.ru", "Прогноз лидов для ДомПрофи — ремонт квартир", "ремонт квартир Москва"),
    ("info@blagodat-sk.ru", "Прогноз лидов для Благо Дать — ремонт", "ремонт квартир Москва"),
    ("ko@r-k-o.ru", "Аудит рекламы — ремонт и отделка", "ремонт квартир Москва"),
    ("info@colibri-cleaning.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("info@klining24.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("Homeel@ya.ru", "Аудит рекламы для Хоум Клининг", "клининг Москва"),
    ("info@wilgood.ru", "Прогноз лидов для Вилгуд — автосервис", "автосервис, кузовной ремонт"),
    ("info@domeo.ru", "Прогноз лидов для Domeo — ремонт", "ремонт квартир Москва"),
    ("info@cleaning-kompaniya.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("zakaz@uborka-kvartir-moskva.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("sale@gruzchiki.ru", "Прогноз лидов для Грузчики.ру", "грузоперевозки, переезды Москва"),
    ("64968877@mail.ru", "Аудит рекламы — натяжные потолки", "натяжные потолки Москва"),
    ("kristova@projectsgallery.ru", "Прогноз лидов — ремонт и отделка", "ремонт, отделка Москва"),
    ("office@sio.team", "Аудит рекламы для бюро SIO", "архитектура, дизайн интерьеров"),
    ("Info@archdetali.ru", "Прогноз лидов — дизайн интерьеров", "дизайн интерьеров Москва"),
    ("info@bani-msk.ru", "Аудит рекламы — строительство бань", "строительство бань, саун"),
    ("index@landshaft-msk.ru", "Прогноз лидов — ландшафтный дизайн", "ландшафтный дизайн, благоустройство"),
    ("cleanfox.ru@yandex.ru", "Нашёл точки слива бюджета в вашем Директе", "клининг Москва"),
    ("support@pravoved.ru", "Прогноз лидов для Правовед.ру", "юридические услуги"),
    ("dogovorgp5@yandex.ru", "Аудит рекламы — медицинский центр", "медицинские услуги"),
    ("info@stella-repair.ru", "Прогноз лидов для Stella — ремонт", "ремонт квартир Москва"),
]


def build_body(niche: str) -> str:
    return f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Видел вашу рекламу в Яндекс.Директе по запросам «{niche}».

За 15 минут бесплатного аудита покажу:
— Какие ключи сливают бюджет без конверсий
— Где можно снизить CPL на 20–40%
— Какие креативы рискуют не пройти ФЗ-38

Это бесплатно, без обязательств. Если найду реальную проблему — обсудим работу.

Удобно созвониться на этой неделе?{SIGNATURE}"""


def send_all():
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    server.starttls(context=ssl.create_default_context())
    server.ehlo()
    server.login(SENDER, PASSWORD)
    print(f"✅ Logged in as {SENDER}\n")

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
            print(f"✅ [{i+1}/{len(LEADS)}] SENT → {to}")
            sent += 1
        except Exception as e:
            print(f"❌ [{i+1}/{len(LEADS)}] FAILED → {to} | {str(e)[:80]}")
            failed += 1
        time.sleep(1.2)  # gentle pace to avoid spam filters

    server.quit()
    print(f"\n{'='*50}")
    print(f"ИТОГ: {sent} отправлено, {failed} ошибок")
    return sent, failed


if __name__ == "__main__":
    send_all()
