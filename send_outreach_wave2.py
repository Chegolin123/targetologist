"""Wave 2 — cold outreach to 3 more Moscow businesses."""
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.yandex.ru"
SENDER = "chegol45@yandex.ru"
PASSWORD = "IMAP_PASSWORD_FROM_ENV"
SITE = "https://chegolin123.github.io/targetologist/"
SIGNATURE = f"\n\n— Алексей Чеголин\nТаргетолог · Яндекс.Директ и VK Реклама\nTelegram: @NoWayWhile\nСайт: {SITE}\n+7 993 200-65-51"

EMAILS = [
    {
        "to": "zakaz@cleaning-moscow.ru",
        "subject": "Нашёл точки слива бюджета в вашем Директе",
        "body": f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Видел вашу рекламу в Яндекс.Директе по запросам «клининг Москва», «уборка квартиры с выездом».

За 15 минут бесплатного аудита покажу:
— Какие ключи сливают бюджет без конверсий
— Где можно снизить CPL на 20–40%
— Какие креативы рискуют не пройти ФЗ-38

Это бесплатно, без обязательств. Если найду реальную проблему — обсудим работу.

Удобно созвониться на этой неделе?{SIGNATURE}""",
    },
    {
        "to": "order2@annushka.su",
        "subject": "Аудит рекламы для Аннушка (клининг)",
        "body": f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Видел, что Аннушка активно рекламируется в Директе (по запросу «клининг Москва»).

За 15 минут бесплатного аудита покажу:
— Где сливается бюджет (ключи без конверсий)
— Как снизить стоимость заявки
— Риски по ФЗ-38 в креативах

Это бесплатно, без обязательств. Если найду проблему — обсудим работу.

Когда удобно созвониться?{SIGNATURE}""",
    },
    {
        "to": "manager@art-remont.ru",
        "subject": "Прогноз лидов для Art-Remont — ремонт квартир",
        "body": f"""Здравствуйте!

Меня зовут Алексей, я таргетолог. Специализируюсь на Директе и VK Рекламе для услуг с высоким чеком.

Ремонт под ключ — средний чек 500 000+ ₽. При CPL 3000₽ один лид окупает месяц рекламы. Покажу:
— Прогноз лидов по вашей нише (WordStat + данные)
— Какие ключи дают горячий трафик, какие — холодный
— Структуру кампании под B2C ремонт

Бесплатный аудит вашей текущей рекламы — 15 минут.

Когда удобно созвониться?{SIGNATURE}""",
    },
]


def send_all():
    server = smtplib.SMTP(SMTP_HOST, 587, timeout=30)
    server.ehlo()
    server.starttls(context=ssl.create_default_context())
    server.ehlo()
    server.login(SENDER, PASSWORD)
    print(f"✅ Logged in as {SENDER}\n")

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
        except Exception as e:
            print(f"❌ FAILED → {email['to']} | {e}")

    server.quit()
    print("\nWave 2 complete")


if __name__ == "__main__":
    send_all()
