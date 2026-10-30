import asyncio
import os
import re
import sys
import edge_tts

sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.join(os.path.dirname(__file__), "..")
PUBLIC_AUDIO_DIR = os.path.join(ROOT_DIR, "public", "audio")
VOCAB_PACKS_TS = os.path.join(ROOT_DIR, "src", "content", "vocab-packs.ts")

VOICE_FEMALE = "pl-PL-ZofiaNeural"
VOICE_MALE = "pl-PL-MarekNeural"

AUDIO_MODULES = {
    "mod-a0-01": [
        ("ex-kurier-jutro.mp3", VOICE_MALE, "Będę u Pana jutro rano pod sklepem."),
        (
            "ex-urzad-telefon.mp3",
            VOICE_FEMALE,
            "Dzwonię z Urzędu Wojewódzkiego w sprawie Pana wniosku. Proszę jutro rano o dziewiątej przynieść oryginał paszportu.",
        ),
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
        (
            "quest-npc-1.mp3",
            VOICE_FEMALE,
            "Dzień dobry! Zapraszam do stanowiska numer cztery. W czym mogę pomóc?",
        ),
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
    ],
    "mod-a1-01": [
        (
            "ex-zawod-pensja.mp3",
            VOICE_FEMALE,
            "Jaki ma Pan zawód i jakiej pensji Pan oczekuje?",
        ),
        (
            "ex-kanapa-dywan.mp3",
            VOICE_MALE,
            "W dużym pokoju stoi nowa kanapa, a na podłodze leży szary dywan.",
        ),
        (
            "dlg-1.mp3",
            VOICE_MALE,
            "Dzień dobry! Widzę, że jest Pan naszym nowym sąsiadem. Nazywam się Marek Kamiński, mieszkam obok.",
        ),
        (
            "dlg-2.mp3",
            VOICE_MALE,
            "Dzień dobry, Panie Marku! Bardzo mi miło. Mam na imię Paweł, jestem z Białorusi.",
        ),
        (
            "dlg-3.mp3",
            VOICE_MALE,
            "Witamy we Wrocławiu! Czym się Pan zajmuje zawodowo?",
        ),
        (
            "dlg-4.mp3",
            VOICE_MALE,
            "Z zawodu jestem programistą. Pracuję zdalnie w polskiej firmie.",
        ),
        (
            "dlg-5.mp3",
            VOICE_MALE,
            "Świetnie! A co Pan teraz niesie? Czy to nowa kanapa?",
        ),
        (
            "dlg-6.mp3",
            VOICE_MALE,
            "Nie, kanapa już stoi w pokoju. To jest tylko duży dywan na podłogę.",
        ),
        (
            "dlg-7.mp3",
            VOICE_MALE,
            "Rozumiem! Gdyby potrzebował Pan pomocy, proszę śmiało pukać.",
        ),
        (
            "quest-npc-1.mp3",
            VOICE_FEMALE,
            "Dzień dobry! Czy to Pan jest nowym lokatorem spod ósemki?",
        ),
        (
            "quest-npc-2.mp3",
            VOICE_FEMALE,
            "Bardzo mi miło! A czym się Pan zajmuje zawodowo i gdzie Pan pracuje?",
        ),
        ("voc-pracowac.mp3", VOICE_MALE, "pracować. Pracuję zdalnie w polskiej firmie."),
        ("voc-rozumiec.mp3", VOICE_FEMALE, "rozumieć. Przepraszam, jeszcze nie wszystko rozumiem."),
        ("voc-kupowac.mp3", VOICE_FEMALE, "kupować. Codziennie rano kupuję świeży chleb."),
        (
            "voc-bialorusin.mp3",
            VOICE_MALE,
            "Białorusin, Białorusinka. Jestem Białorusinem, a moja żona jest Białorusinką.",
        ),
        ("voc-programista.mp3", VOICE_MALE, "programista. Z zawodu jestem programistą."),
        ("voc-sasiad.mp3", VOICE_MALE, "sąsiad, sąsiadka. Pan Marek jest naszym nowym sąsiadem."),
        ("voc-zawod.mp3", VOICE_FEMALE, "zawód. Kim jest Pani z zawodu?"),
        ("voc-pensja.mp3", VOICE_FEMALE, "pensja. W tej firmie jest wysoka pensja."),
        ("voc-dywan.mp3", VOICE_MALE, "dywan. Na podłodze w pokoju leży miękki dywan."),
        ("voc-kanapa.mp3", VOICE_FEMALE, "kanapa. W salonie stoi wygodna kanapa."),
        (
            "voc-interesowac.mp3",
            VOICE_MALE,
            "interesować się. Interesuję się sportem i muzyką.",
        ),
        (
            "voc-zajmowac.mp3",
            VOICE_FEMALE,
            "zajmować się. Czym się Pani zajmuje zawodowo?",
        ),
    ],
    "mod-a1-02": [
        (
            "ex-kasa-24-zlote.mp3",
            VOICE_FEMALE,
            "Poproszę czarną kawę i świeżą bułkę. Razem płaci Pan dwadzieścia cztery złote.",
        ),
        ("dlg-1.mp3", VOICE_FEMALE, "Dzień dobry! Co dla Pana?"),
        (
            "dlg-2.mp3",
            VOICE_MALE,
            "Dzień dobry! Poproszę dużą czarną kawę i dwie świeże bułki. Po ile są dzisiaj te jabłka?",
        ),
        (
            "dlg-3.mp3",
            VOICE_FEMALE,
            "Jabłka są po cztery złote za kilogram. Za kawę i bułki płaci Pan razem piętnaście złotych.",
        ),
        (
            "dlg-4.mp3",
            VOICE_MALE,
            "Proszę, oto dwadzieścia złotych. Przepraszam, czy wie Pani, którędy najszybciej dojdę na dworzec i która jest teraz godzina?",
        ),
        (
            "dlg-5.mp3",
            VOICE_FEMALE,
            "Teraz jest ósma dziesięć. Proszę iść prosto, a z przystanku obok jedzie tramwajowa ósemka prosto pod dworzec. Oto Pana reszta — pięć złotych!",
        ),
        (
            "quest-npc-1.mp3",
            VOICE_FEMALE,
            "Dzień dobry! Co dla Pana dzisiaj podać?",
        ),
        (
            "quest-npc-2.mp3",
            VOICE_FEMALE,
            "Razem płaci Pan dwadzieścia dwa złote. Płaci Pan kartą czy gotówką?",
        ),
        (
            "voc-kosztowac.mp3",
            VOICE_FEMALE,
            "kosztować. Ile kosztuje ten bilet miesięczny?",
        ),
        (
            "voc-zloty.mp3",
            VOICE_MALE,
            "złoty, dwa złote, pięć złotych. Chleb kosztuje cztery złote, a kawa piętnaście złotych.",
        ),
        (
            "voc-pietnascie.mp3",
            VOICE_FEMALE,
            "piętnaście. Pociąg odjeżdża za piętnaście minut.",
        ),
        (
            "voc-czterdziesci.mp3",
            VOICE_MALE,
            "czterdzieści. Podróż trwa czterdzieści minut.",
        ),
        (
            "voc-osiemdziesiat.mp3",
            VOICE_FEMALE,
            "osiemdziesiąt. Autobus numer sto osiemdziesiąt jedzie do centrum.",
        ),
        (
            "voc-dwudziesty-pierwszy.mp3",
            VOICE_MALE,
            "dwudziesty pierwszy. Dzisiaj jest dwudziesty pierwszy października.",
        ),
        (
            "voc-osemka.mp3",
            VOICE_FEMALE,
            "ósemka. Jadę do pracy tramwajową ósemką.",
        ),
        (
            "voc-dokad.mp3",
            VOICE_MALE,
            "dokąd. Dokąd idziesz tak późno?",
        ),
        (
            "voc-ktoredy.mp3",
            VOICE_FEMALE,
            "którędy. Którędy iść na dworzec?",
        ),
        (
            "voc-po-ile.mp3",
            VOICE_MALE,
            "po ile. Po ile są te jabłka?",
        ),
        (
            "voc-ktory.mp3",
            VOICE_FEMALE,
            "który, która, które. Która jest godzina? Który samochód jest lepszy?",
        ),
        (
            "voc-czyj.mp3",
            VOICE_MALE,
            "czyj, czyja, czyje. Czyj dom stoi nad rzeką? Czyje to dziecko?",
        ),
    ],
    "mod-a1-03": [
        (
            "ex-apteka-recepta.mp3",
            VOICE_FEMALE,
            "Przepraszam, ale dzisiaj nie ma tego antybiotyku w naszej aptece, a ponadto nie można go kupić bez recepty od lekarza.",
        ),
        (
            "dlg-1.mp3",
            VOICE_FEMALE,
            "Dzień dobry! Sprawdzam Pana wniosek o kartę pobytu. Widzę oryginał paszportu i umowę o pracę, ale niestety brakuje jeszcze dwóch dokumentów.",
        ),
        (
            "dlg-2.mp3",
            VOICE_MALE,
            "Przepraszam, jakich dokładnie dokumentów brakuje w mojej teczce?",
        ),
        (
            "dlg-3.mp3",
            VOICE_FEMALE,
            "Po pierwsze, nie ma tutaj kserokopii umowy najmu mieszkania. Po drugie, na załączniku numer jeden brakuje podpisu i pieczątki pracodawcy.",
        ),
        (
            "dlg-4.mp3",
            VOICE_MALE,
            "Rozumiem. Punkt ksero jest blisko urzędu, więc zaraz zrobię kopię umowy najmu. A załącznik z podpisem szefa przyniosę w poniedziałek rano.",
        ),
        (
            "dlg-5.mp3",
            VOICE_FEMALE,
            "Dobrze, ma Pan siedem dni na uzupełnienie braków formalnych. Czekam na Pana dokumenty!",
        ),
        (
            "quest-npc-1.mp3",
            VOICE_FEMALE,
            "W Pana wniosku nie ma kserokopii paszportu i brakuje jednego podpisu.",
        ),
        (
            "quest-npc-2.mp3",
            VOICE_FEMALE,
            "Dzień dobry! Czego Pan dzisiaj potrzebuje?",
        ),
        (
            "voc-potrzebowac.mp3",
            VOICE_FEMALE,
            "potrzebować. Potrzebuję zaświadczenia z urzędu skarbowego.",
        ),
        (
            "voc-uczyc-sie.mp3",
            VOICE_MALE,
            "uczyć się. Codziennie uczę się języka polskiego.",
        ),
        (
            "voc-brakowac.mp3",
            VOICE_FEMALE,
            "brakować, brakuje. We wniosku brakuje jednego podpisu.",
        ),
        (
            "voc-nie-ma.mp3",
            VOICE_MALE,
            "nie ma. Niestety dzisiaj nie ma tego leku w aptece.",
        ),
        (
            "voc-czas.mp3",
            VOICE_FEMALE,
            "czas, nie mam czasu. Przepraszam, ale dzisiaj nie mam wolnego czasu.",
        ),
        (
            "voc-pomoc.mp3",
            VOICE_MALE,
            "pomoc, potrzebuję pomocy. Dziękuję za szybką pomoc w urzędzie.",
        ),
        (
            "voc-bez.mp3",
            VOICE_FEMALE,
            "bez. Poproszę czarną kawę bez cukru i bez mleka.",
        ),
        (
            "voc-blisko.mp3",
            VOICE_MALE,
            "blisko. Apteka znajduje się blisko naszego domu.",
        ),
        (
            "voc-obok.mp3",
            VOICE_FEMALE,
            "obok. Punkt ksero jest tuż obok urzędu.",
        ),
        (
            "voc-kopia.mp3",
            VOICE_MALE,
            "kopia, kserokopia. Do wniosku trzeba dołączyć kopię paszportu.",
        ),
        (
            "voc-lek.mp3",
            VOICE_FEMALE,
            "lek, lekarstwo. W tej aptece nie ma tego leku.",
        ),
        (
            "voc-duzo.mp3",
            VOICE_MALE,
            "dużo, mało. W tym tygodniu mam dużo pracy i mało czasu.",
        ),
    ],
}


def extract_vocab_packs_items() -> list[tuple[str, str, str]]:
    """Автоматически извлекает все слова и примеры из src/content/vocab-packs.ts."""
    with open(VOCAB_PACKS_TS, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = re.compile(
        r"id:\s*'([^']+)'\s*,\s*pl:\s*'([^']+)'[\s\S]*?exPl:\s*'([^']+)'",
        re.MULTILINE,
    )
    matches = pattern.findall(content)
    items: list[tuple[str, str, str]] = []
    for idx, (item_id, pl_word, ex_pl) in enumerate(matches):
        clean_pl = re.sub(r"\s*\([^)]*\)", "", pl_word).strip()
        voice = VOICE_FEMALE if idx % 2 == 0 else VOICE_MALE
        text = f"{clean_pl}. {ex_pl}"
        items.append((f"{item_id}.mp3", voice, text))
    return items


async def generate_one(
    sem: asyncio.Semaphore, mod_id: str, mod_dir: str, filename: str, voice: str, text: str
) -> None:
    filepath = os.path.join(mod_dir, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        return
    async with sem:
        communicate = edge_tts.Communicate(text=text, voice=voice, rate="-5%")
        await communicate.save(filepath)
        print(f"  [+] Создан {mod_id}/{filename} ({voice})")


async def generate_all() -> None:
    all_modules = dict(AUDIO_MODULES)
    all_modules["vocab-packs"] = extract_vocab_packs_items()

    sem = asyncio.Semaphore(8)

    for mod_id, items in all_modules.items():
        mod_dir = os.path.join(PUBLIC_AUDIO_DIR, mod_id)
        os.makedirs(mod_dir, exist_ok=True)
        print(f"Проверка и генерация {len(items)} аудиофайлов для {mod_id}...")
        tasks = [
            generate_one(sem, mod_id, mod_dir, filename, voice, text)
            for filename, voice, text in items
        ]
        await asyncio.gather(*tasks)
    print("Готово! Все аудиофайлы всех модулей и словарных пакетов созданы.")


if __name__ == "__main__":
    asyncio.run(generate_all())
