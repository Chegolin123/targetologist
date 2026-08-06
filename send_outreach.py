"""Send cold outreach emails via Yandex SMTP.
Authorized by user — app password provided 2026-08-07.
"""
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 465
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}\n+7 993 200-65-51"

EMAILS = [
    {
        "to": "info@cleanon.ru",
        "subject": "Нашёл точки слива бюджета в вашем Директе",
        "body": f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Видел вашу рекламу в Яндекс.Директе по запросам «клининг Москва», «уборка квартиры».

За 15 минут бесплатного аудита покажу:
— Какие ключи сливают бюджет без конверсий
— Где можно снизить CPL на 20–40%
— Какие креативы рискуют не пройти ФЗ-38

Это бесплатно, без обязательств. Если найду реальную проблему — обсудим работу. Если всё ок — просто скажу «молодцы».

Удобно созвониться в среду или четверг?{SIGNATURE}""",
    },
    {
        "to": "vira@eremont.ru",
        "subject": "Прогноз лидов для eRemont — ремонт квартир",
        "body": f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Специализируюсь на Директе и VK Рекламе для услуг с высоким чеком.

Ремонт под ключ — средний чек 500 000+ ₽. При CPL 3000₽ один лид окупает месяц рекламы. Покажу:
— Прогноз лидов по вашей нише (WordStat + данные)
— Какие ключи дают горячий трафик, какие — холодный
— Структуру кампании под B2C ремонт

Бесплатный аудит вашей текущей рекламы — 15 минут.

Когда удобно созвониться?{SIGNATURE}""",
    },
    {
        "to": "remont@remelit.ru",
        "subject": "VK Реклама + Директ для Ремэлит",
        "body": f"""Здравствуйте!

Видел ваше сообщество ВК (vk.com/remelit_msk) и сайт remelit.ru. Меня зовут Алексей — я таргетолог.

Ремонт квартир — ниша с высоким чеком. Предлагаю:
— Настроить VK Рекламу на подписчиков + Lookalike
— Параллельно Яндекс.Директ на горячий поиск «ремонт квартир Москва»
— Вести обе платформы, оптимизировать под CPL

Бесплатный аудит вашей текущей рекламы — покажу, где теряете деньги.

Напишите в Telegram (@NoWayWhile) или ответьте на это письмо.{SIGNATURE}""",
    },
]


def send_all():
    sent = 0
    failed = 0

    # Try port 587 with STARTTLS first
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    ctx = ssl.create_default_context()
    server.starttls(context=ctx)
    server.ehlo()
    server.login(SENDER, PASSWORD)
    print(f"✅ Logged in as {SENDER} (port 587 STARTTLS)\n")

    for email in EMAILS:
        msg = MIMEMultipart("alternative")
        msg["From"] = SENDER
        msg["To"] = email["to"]
        msg["Subject"] = email["subject"]
        msg["Reply-To"] = SENDER
        msg.attach(MIMEText(email["body"], "plain", "utf-8"))

        try:
            server.sendmail(SENDER, [email["to"]], msg.as_string())
            print(f"✅ SENT → {email['to']} | {email['subject']}")
            sent += 1
        except Exception as e:
            print(f"❌ FAILED → {email['to']} | {e}")
            failed += 1

    server.quit()

    print(f"\n{'='*50}")
    print(f"ИТОГ: {sent} отправлено, {failed} ошибок")
    return sent, failed


if __name__ == "__main__":
    send_all()
