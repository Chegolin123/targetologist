"""Verify email addresses via SMTP RCPT TO check (no send).
Checks if mailbox exists on the target server.
"""
import smtplib
import sys

# Candidate emails to verify (info@ pattern on known domains)
CANDIDATES = [
    "info@domeo.ru",          # already have - skip
    "info@ruscleaning.ru",    # already have
    "info@cleaning-moscow.ru",# already have
    # Known domains, info@ pattern to verify:
    "info@skameyka.ru",          # мебель
    "info@okna.ru",              # окна
    "info@wilgood.ru",           # авто (have)
    "info@stella-repair.ru",     # ремонт
    "info@blagodat-sk.ru",       # have
    "info@kolibri-cleaning.ru",  # have (colibri)
    "info@cleanyou.ru",          # клининг
    "info@bani-msk.ru",          # have
    "info@archdetali.ru",        # have
    "info@cleaning-kompaniya.ru",# have
    "info@dentalway.ru",         # стоматология
    "info@denta-lux.ru",         # стоматология
    "info@vse-dveri.ru",         # двери
    "info@mastera-msk.ru",       # услуги мастеров
    "info@gruzchiki.ru",         # have (sale@)
    "info@domprofi24.ru",        # have (mail@)
]

def check(email):
    domain = email.split("@")[1]
    try:
        with smtplib.SMTP(f"mx.{domain}", timeout=8) as s:
            s.ehlo()
            s.mail("check@example.com")
            code, msg = s.rcpt(email)
            s.quit()
            return (code, msg)
    except Exception as e:
        # Try common MX lookup fallback
        return ("ERR", str(e)[:60])

for email in CANDIDATES:
    code, msg = check(email)
    status = "✅" if code == 250 else "❌"
    print(f"{status} {email} → {code} {msg}")
