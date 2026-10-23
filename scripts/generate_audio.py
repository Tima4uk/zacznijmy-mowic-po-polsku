import asyncio
import os
import sys
import edge_tts

sys.stdout.reconfigure(encoding="utf-8")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "mod-a0-01")

VOICE_FEMALE = "pl-PL-ZofiaNeural"
VOICE_MALE = "pl-PL-MarekNeural"

AUDIO_ITEMS = [
    # Упражнения на аудирование
    ("ex-kurier-jutro.mp3", VOICE_MALE, "Będę u Pana jutro rano pod sklepem."),
    (
        "ex-urzad-telefon.mp3",
        VOICE_FEMALE,
        "Dzwonię z Urzędu Wojewódzkiego w sprawie Pana wniosku. Proszę jutro rano o dziewiątej przynieść oryginał paszportu.",
    ),
    # Диалог в Urząd Miasta (Урок 1.3)
    ("dlg-1.mp3", VOICE_FEMALE, "Dzień dobry! W czym mogę Panu pomóc?"),
    ("dlg-2.mp3", VOICE_MALE, "Dzień dobry! Chcę złożyć wniosek o numer PESEL."),
    (
        "dlg-3.mp3",
        VOICE_FEMALE,
        "Proszę bardzo. Czy ma Pan przy sobie paszport i wypełniony formularz?",
    ),
    ("dlg-4.mp3", VOICE_MALE, "Tak, proszę. Oto mój paszport i formularz."),
    ("dlg-5.mp3", VOICE_FEMALE, "Dziękuję. Jak ma Pan na imię i skąd Pan jest?"),
    (
        "dlg-6.mp3",
        VOICE_MALE,
        "Mam na imię Paweł, nazywam się Kowalczyk. Jestem z Białorusi, ale teraz mieszkam we Wrocławiu.",
    ),
    (
        "dlg-7.mp3",
        VOICE_FEMALE,
        "Czy to Pana aktualny numer telefonu i adres zamieszkania?",
    ),
    ("dlg-8.mp3", VOICE_MALE, "Tak, wszystko się zgadza."),
    (
        "dlg-9.mp3",
        VOICE_FEMALE,
        "Proszę podpisać tutaj na dole. Numer PESEL jest już gotowy. Do widzenia!",
    ),
    # Квест
    (
        "quest-npc-1.mp3",
        VOICE_FEMALE,
        "Dzień dobry! Zapraszam do stanowiska numer cztery. W czym mogę pomóc?",
    ),
    # Словарь SRS (12 карточек)
    ("voc-byc.mp3", VOICE_MALE, "być. Jestem, jesteś, jest. Jestem z Białorusi, z Mińska."),
    ("voc-nazywac-sie.mp3", VOICE_MALE, "nazywać się. Nazywam się Paweł Kowalczyk."),
    ("voc-miec-na-imie.mp3", VOICE_FEMALE, "mieć na imię. Jak ma Pani na imię?"),
    ("voc-wniosek.mp3", VOICE_MALE, "wniosek. Chcę złożyć wniosek o numer PESEL."),
    ("voc-sklep.mp3", VOICE_FEMALE, "sklep. Ten sklep jest czynny do dwudziestej drugiej."),
    ("voc-jutro.mp3", VOICE_MALE, "jutro. Zobaczymy się jutro rano."),
    ("voc-rano.mp3", VOICE_FEMALE, "rano. Codziennie rano piję kawę."),
    ("voc-tydzien.mp3", VOICE_MALE, "tydzień. Jestem w Polsce już jeden tydzień."),
    (
        "voc-parter.mp3",
        VOICE_FEMALE,
        "parter, pierwsze piętro. Kasa urzędu jest na parterze, a pokój numer dwanaście na pierwszym piętrze.",
    ),
    (
        "voc-adres.mp3",
        VOICE_FEMALE,
        "adres zamieszkania. Proszę wpisać aktualny adres zamieszkania.",
    ),
    ("voc-zgadza-sie.mp3", VOICE_MALE, "zgadza się. Tak, wszystko się zgadza."),
    ("voc-mieszkac.mp3", VOICE_MALE, "mieszkać. Teraz mieszkam w Polsce."),
]


async def generate_all() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Генерация {len(AUDIO_ITEMS)} польских аудиофайлов в {OUTPUT_DIR}...")
    for filename, voice, text in AUDIO_ITEMS:
        filepath = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
            print(f"  [OK] {filename} уже существует")
            continue
        communicate = edge_tts.Communicate(text=text, voice=voice, rate="-5%")
        await communicate.save(filepath)
        print(f"  [+] Создан {filename} ({voice})")
    print("Готово! Все аудиофайлы Модуля 1 созданы.")


if __name__ == "__main__":
    asyncio.run(generate_all())
