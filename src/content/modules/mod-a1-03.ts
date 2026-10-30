import { CourseModule } from '@/types/curriculum';

export const MODULE_A1_03: CourseModule = {
  id: 'mod-a1-03',
  releaseNumber: 4,
  level: 'A1',
  titlePl: 'Czego nie ma i czego szukasz? Dopełniacz w aptece, sklepie i urzędzie',
  titleRu: 'Чего нет и что вы ищете? Родительный падеж (Dopełniacz) в аптеке, магазине и ужонде',
  subtitleRu:
    'Осваиваем самый частотный падеж польского языка — Dopełniacz (Kogo? Czego?): обязательную замену падежа после отрицания (nie mam czasu, nie piję kawy), глаголы szukać / potrzebować / uczyć się, предлоги do / z / bez / blisko и проверку недостающих документов в ужонде (brakuje podpisu).',
  estimatedHours: 4.5,
  learningGoalsRu: [
    'Автоматически переключаться с Винительного падежа (Biernik) на Родительный (Dopełniacz) после любого отрицания: Mam kawę i bilet → Nie mam kawy i biletu',
    'Правильно использовать глаголы, управляющие Родительным падежом: szukać (pracy), potrzebować (zaświadczenia), uczyć się (języka polskiego), brakować (podpisu)',
    'Строить фразы с предлогами направления и места do, z, od, bez, obok, blisko (idę do lekarza, wracam z pracy, kawa bez cukru, blisko dworca)',
    'Понимать требования инспектора в ужонде и фармацевта в аптеке, когда чего-то нет в наличии (nie ma tego leku) или не хватает документа (brakuje załącznika)',
  ],
  lessons: [
    // =========================================================================
    // УРОК 4.1: Отрицание (Nie mam / Nie ma) и глаголы с Dopełniacz
    // =========================================================================
    {
      id: 'les-a1-03-1',
      number: '4.1',
      titlePl: 'Mam czas, ale nie mam czasu: Dopełniacz po przeczeniu i czasownikach',
      titleRu: 'У меня есть время, но нет времени: Dopełniacz после отрицания и глаголов',
      estimatedMinutes: 25,
      objectivesRu: [
        'Усвоить железное правило польского синтаксиса: прямое дополнение после глагола с частицей NIE всегда ставится в Родительный падеж (Dopełniacz)',
        'Запомнить окончания Dopełniacza ед.ч.: женский род -y/-i (kawy, pracy, Polski), средний род -a (mieszkania, zaświadczenia), мужской род -a/-u (lekarza, chleba / czasu, biletu, wniosku)',
        'Отработать глаголы uczyć się, szukać, potrzebować, słuchać, которые всегда требуют Dopełniacza без предлога',
      ],
      theory: {
        title: 'Родительный падеж (Dopełniacz — Kogo? Czego?) после отрицания и ключевых глаголов',
        summaryRu:
          'В русском языке после отрицания мы часто оставляем Винительный падеж («Я не пью кофе», «Я не вижу эту улицу», «Я учу польский язык»). В польском языке это грубая ошибка: частица NIE перед глаголом действует как магнит и принудительно переводит дополнение в Dopełniacz!',
        keyRules: [
          {
            ruleTitle: '1. Железное правило отрицания: Biernik + NIE → Dopełniacz!',
            explanationRu:
              'Сравните утверждение (Biernik) и отрицание (Dopełniacz):\n• Piję czarną kawę (В.п.) → Nie piję czarnej kawy (Р.п.).\n• Mam wolny czas i bilet (В.п.) → Nie mam wolnego czasu i biletu (Р.п.).\n• Rozumiem to zadanie (В.п.) → Nie rozumiem tego zadania (Р.п.).',
            wrongExample: 'Nie piję czarną kawę. Nie mam wolny czas.',
            correctExample: 'Nie piję czarnej kawy. Nie mam wolnego czasu.',
            translationRu: 'Я не пью чёрный кофе. У меня нет свободного времени.',
          },
          {
            ruleTitle: '2. Четыре главных глагола, требующих Dopełniacza: uczyć się, szukać, potrzebować, słuchać',
            explanationRu:
              'Даже БЕЗ отрицания эти глаголы всегда требуют вопроса Kogo? Czego? (Родительный падеж):\n• uczyć się (учить что-то!): Uczę się języka polskiego (а НЕ język polski!).\n• szukać (искать): Szukam dobrej pracy i taniego mieszkania.\n• potrzebować (нуждаться в чём-то): Potrzebuję zaświadczenia i pomocy.\n• słuchać (слушать): Słucham polskiej muzyki i radia.',
            wrongExample: 'Uczę się język polski. Szukam praca. Potrzebuję pomoc.',
            correctExample: 'Uczę się języka polskiego. Szukam pracy. Potrzebuję pomocy.',
            translationRu: 'Я учу польский язык. Я ищу работу. Мне нужна помощь.',
          },
          {
            ruleTitle: '3. Окончания существительных и прилагательных в Dopełniaczu ед.ч.',
            explanationRu:
              '• Женский род: прилагательное получает -ej (-iej после k/g), существительное -y (или -i после k, g, l, мягких): dobra praca → dobrej pracy, czarna kawa → czarnej kawy, polska książka → polskiej książki.\n• Мужской и средний род: прилагательное получает -ego (-iego после k/g): nowy dokument → nowego dokumentu; существительное ср.р. всегда получает -a (mieszkanie → mieszkania, pismo → pisma); существительное м.р. получает -a (одушевлённые: lekarza, sąsiada, а также еда/предметы: chleba, sera, banana) или -u (абстрактные, дни, транспорт, документы: czasu, biletu, wniosku, podpisu, poniedziałku).',
            correctExample: 'Potrzebuję nowego wniosku, czytelnego podpisu i świeżego chleba.',
            translationRu: 'Мне нужно новое заявление, разборчивая подпись и свежий хлеб.',
          },
        ],
        table: {
          headers: ['Род', 'Именительный (Mianownik)', 'Винительный (Mam...)', 'Родительный (Nie mam / Szukam...)'],
          rows: [
            ['Женский род', 'czarna kawa, dobra praca', 'czarną kawę, dobrą pracę', 'czarnej kawy, dobrej pracy (-ej, -y/-i)'],
            ['Средний род', 'nowe mieszkanie, zaświadczenie', 'nowe mieszkanie, zaświadczenie', 'nowego mieszkania, zaświadczenia (-ego, -a)'],
            ['Муж. одуш. и еда', 'dobry lekarz, świeży chleb', 'dobrego lekarza, świeży chleb', 'dobrego lekarza, świeżego chleba (-ego, -a)'],
            ['Муж. абстр./док.', 'wolny czas, ważny wniosek', 'wolny czas, ważny wniosek', 'wolnego czasu, ważnego wniosku (-ego, -u)'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-03-1-1',
          type: 'multiple_choice',
          skill: 'grammar',
          difficulty: 1,
          promptRu:
            'Как правильно перевести на польский язык фразу: «Я учу польский язык, но сегодня у меня нет свободного времени»?',
          grammarTag: 'uczyć się + Dopełniacz / nie mam + Dopełniacz',
          explanationRu:
            'Глагол uczyć się всегда требует Родительного падежа (języka polskiego), как и отрицание nie mam (wolnego czasu).',
          options: [
            {
              id: 'opt-1',
              text: 'Uczę się języka polskiego, ale dzisiaj nie mam wolnego czasu.',
              isCorrect: true,
              feedbackRu: 'Отлично! Оба дополнения стоят в Dopełniaczu: języka polskiego и wolnego czasu.',
            },
            {
              id: 'opt-2',
              text: 'Uczę się język polski, ale dzisiaj nie mam wolny czas.',
              isCorrect: false,
              feedbackRu: 'Калька с русского! После uczyć się и после nie mam нельзя оставлять Винительный падеж.',
            },
            {
              id: 'opt-3',
              text: 'Uczę się językiem polskim, ale dzisiaj nie mam wolnym czasem.',
              isCorrect: false,
              feedbackRu: 'Творительный падеж (Narzędnik) здесь не используется — нужен Родительный (Dopełniacz).',
            },
          ],
        },
        {
          id: 'ex-a1-03-1-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Измените утверждение на отрицание (Biernik → Dopełniacz): «Piję czarną kawę» → «Вечером я не пью чёрный кофе (czarnej kawy)»:',
          sentenceTemplate: 'Rano piję czarną kawę, ale wieczorem nie piję {{0}} {{1}}.',
          grammarTag: 'Przeczenie: czarną kawę -> czarnej kawy',
          explanationRu:
            'После отрицания nie piję женский род меняет окончания -ą/-ę на -ej/-y: czarnej kawy.',
          interferenceChecks: [
            {
              patternRegex: 'czarn[aą]|kaw[eę]',
              tag: 'ERR_GENITIVE_NEGATION',
              feedbackRu:
                'Ловушка отрицания! После «nie piję» в польском языке обязателен Родительный падеж (Dopełniacz): czarnej kawy.',
            },
          ],
          blanks: [
            {
              acceptedAnswers: ['czarnej'],
              baseWordHint: 'czarna (Р.п. ж.р.)',
            },
            {
              acceptedAnswers: ['kawy'],
              baseWordHint: 'kawa (Р.п. ж.р.)',
            },
          ],
        },
        {
          id: 'ex-a1-03-1-3',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu:
            'Поставьте слова после глаголов szukać и potrzebować в Родительный падеж: «Я ищу новую работу (nowej pracy) и мне нужна справка (zaświadczenia)»:',
          sentenceTemplate: 'Szukam {{0}} {{1}} w Warszawie i potrzebuję {{2}} z urzędu.',
          grammarTag: 'szukać / potrzebować + Dopełniacz',
          explanationRu:
            'Женский род: nowej pracy; средний род на -e получает окончание -a: zaświadczenia.',
          blanks: [
            {
              acceptedAnswers: ['nowej'],
              baseWordHint: 'nowa',
            },
            {
              acceptedAnswers: ['pracy'],
              baseWordHint: 'praca',
            },
            {
              acceptedAnswers: ['zaświadczenia'],
              baseWordHint: 'zaświadczenie',
            },
          ],
        },
        {
          id: 'ex-a1-03-1-4',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите фразу: «Извините, я ещё не понимаю этого трудного задания».',
          targetSentences: [
            'Przepraszam, jeszcze nie rozumiem tego trudnego zadania.',
          ],
          tokens: [
            'Przepraszam,',
            'jeszcze',
            'nie',
            'rozumiem',
            'tego',
            'trudnego',
            'zadania.',
            'to',
            'trudne',
            'zadanie.',
          ],
          grammarTag: 'Nie rozumiem + Dopełniacz (tego trudnego zadania)',
          explanationRu:
            'В утверждении было бы «Rozumiem to trudne zadanie», но после «nie rozumiem» используется Dopełniacz: tego trudnego zadania.',
        },
      ],
    },

    // =========================================================================
    // УРОК 4.2: Предлоги с Dopełniaczem (do, z, od, bez, blisko) и конструкция Nie ma
    // =========================================================================
    {
      id: 'les-a1-03-2',
      number: '4.2',
      titlePl: 'Do pracy, z urzędu, bez cukru: przyimki z Dopełniaczem i konstrukcja „Nie ma”',
      titleRu: 'На работу, из ужонда, без сахара: предлоги с Dopełniaczem и конструкция «Nie ma»',
      estimatedMinutes: 25,
      objectivesRu: [
        'Освоить главные предлоги Родительного падежа: do (в/на — куда?), z/ze (из/с — откуда?), od (от кого?), bez (без чего?), obok / blisko (рядом с чем?)',
        'Различать конструкции «Nie mam...» (У меня нет...) и безличное «Nie ma...» (В наличии нет / никого нет дома)',
        'Строить сочетания количества с Dopełniaczem (dużo pracy, mało czasu, kostka masła, butelka wody)',
      ],
      theory: {
        title: 'Предлоги Родительного падежа и безличная конструкция „Nie ma”',
        summaryRu:
          'Когда мы говорим, КУДА мы идём (idę do sklepu, do lekarza, do pracy) или ОТКУДА возвращаемся (wracam z pracy, ze sklepu, z Białorusi), в польском языке почти всегда работают предлоги Dopełniacza.',
        keyRules: [
          {
            ruleTitle: '1. Пять главных предлогов с Dopełniaczem: do • z (ze) • od • bez • blisko / obok',
            explanationRu:
              '• do (куда? / до какого времени?): Idę do apteki, do lekarza, do urzędu. Czynne od ósmej do szesnastej.\n• z / ze (откуда?): Wracam z pracy, ze szpitala, z dworca.\n• od (от кого?): Dostałem wiadomość od szefa i klucz od właściciela.\n• bez (без): Poproszę kawę bez cukru i wodę bez gazu.\n• blisko / obok (близко от / рядом с): Mieszkam blisko centrum, obok przystanku.',
            wrongExample: 'Idę w aptekę. Mieszkam blisko od metro.',
            correctExample: 'Idę do apteki. Mieszkam blisko metra, obok przystanku.',
            translationRu: 'Я иду в аптеку. Я живу близко к метро, рядом с остановкой.',
          },
          {
            ruleTitle: '2. Разница между „Nie mam” и безличным „Nie ma”',
            explanationRu:
              '• Nie mam + Dopełniacz = «У меня нет» (я не имею): Nie mam gotówki ani parasola.\n• Nie ma + Dopełniacz = «Нет в наличии / не существует / отсутствует на месте»: W sklepie nie ma świeżego chleba (В магазине нет свежего хлеba). Szefa dzisiaj nie ma w biurze (Начальника сегодня нет в офисе).',
            wrongExample: 'W aptece nie jest ten lek. Szef dzisiaj nie jest w pracy.',
            correctExample: 'W aptece nie ma tego leku. Szefa dzisiaj nie ma w pracy.',
            translationRu: 'В аптеке нет этого лекарства. Начальника сегодня нет на работе.',
          },
          {
            ruleTitle: '3. Слова количества и упаковки + Dopełniacz',
            explanationRu:
              'После слов dużo (много), mało (мало), trochę (немного), kilka (несколько), а также упаковок (butelka wody, kubek herbaty, paczka kawy) всегда используется Dopełniacz: Mam dzisiaj dużo pracy i mało wolnego czasu.',
            correctExample: 'Poproszę butelkę wody niegazowanej i kubek gorącej herbaty bez cukru.',
            translationRu: 'Пожалуйста, бутылку негазированной воды и кружку горячего чая без сахара.',
          },
        ],
        table: {
          headers: ['Предлог / Слово', 'Значение', 'Пример с Dopełniaczem (Kogo? Czego?)'],
          rows: [
            ['do', 'в / на (куда?), к, до', 'Idę do pracy, do lekarza, do urzędu, do sklepu.'],
            ['z (ze)', 'из / с (откуда?)', 'Wracam z pracy, z Polski, ze sklepu, z dworca.'],
            ['od', 'от (кого / какого часа)', 'Klucz od właściciela. Od poniedziałku do piątku.'],
            ['bez', 'без', 'Kawa bez mleka i bez cukru. Bez ważnego paszportu.'],
            ['blisko / obok', 'близко от / рядом с', 'Blisko domu, obok apteki, niedaleko przystanku.'],
            ['nie ma / brakuje', 'нет в наличии / не хватает', 'Nie ma tego leku. Brakuje podpisu i pieczątki.'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-03-2-1',
          type: 'multiple_choice',
          skill: 'listening',
          difficulty: 1,
          promptRu:
            'Прослушайте ответ фармацевта в аптеке и выберите, почему покупатель не может сразу забрать лекарство:',
          audioUrl: '/audio/mod-a1-03/ex-apteka-recepta.mp3',
          audioTranscriptPl: 'Przepraszam, ale dzisiaj nie ma tego antybiotyku w naszej aptece, a ponadto nie można go kupić bez recepty od lekarza.',
          grammarTag: 'nie ma + Dopełniacz / bez recepty od lekarza',
          explanationRu:
            'Фармацевт говорит: «nie ma tego antybiotyku» (этого антибиотика сегодня нет в наличии) и «bez recepty od lekarza» (без рецепта от врача).',
          options: [
            {
              id: 'opt-1',
              text: 'Этого антибиотика сегодня нет в наличии в аптеке, и его нельзя купить без рецепта от врача.',
              isCorrect: true,
              feedbackRu: 'Верно! Вы точно распознали конструкции «nie ma tego antybiotyku» и «bez recepty od lekarza».',
            },
            {
              id: 'opt-2',
              text: 'Аптека уже закрыта, а врач сегодня не выписывает рецепты.',
              isCorrect: false,
              feedbackRu: 'Аптека открыта, но препарата нет в наличии (nie ma) и нужен рецепт (bez recepty).',
            },
          ],
        },
        {
          id: 'ex-a1-03-2-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Вставьте существительные после предлогов do, z и bez в Родительном падеже (Dopełniacz):',
          sentenceTemplate: 'Rano idę do {{0}} (lekarz), potem wracam z {{1}} (praca) i piję herbatę bez {{2}} (cukier).',
          grammarTag: 'do lekarza / z pracy / bez cukru',
          explanationRu:
            'Одушевлённый м.р. lekarz → do lekarza; ж.р. praca → z pracy; м.р. с беглой гласной cukier → bez cukru.',
          blanks: [
            {
              acceptedAnswers: ['lekarza'],
              baseWordHint: 'lekarz (к врачу)',
            },
            {
              acceptedAnswers: ['pracy'],
              baseWordHint: 'praca (с работы)',
            },
            {
              acceptedAnswers: ['cukru'],
              baseWordHint: 'cukier (без сахара)',
            },
          ],
        },
        {
          id: 'ex-a1-03-2-3',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите фразу: «Сегодня начальника нет в офисе, потому что он пошёл в ужонд».',
          targetSentences: [
            'Dzisiaj szefa nie ma w biurze, bo poszedł do urzędu.',
          ],
          tokens: [
            'Dzisiaj',
            'szefa',
            'nie',
            'ma',
            'w',
            'biurze,',
            'bo',
            'poszedł',
            'do',
            'urzędu.',
            'szef',
            'urząd.',
          ],
          grammarTag: 'Szefa nie ma + do urzędu',
          explanationRu:
            'В безличной конструкции отсутствия человека или предмета используется «szefa nie ma», а направление — «do urzędu».',
        },
      ],
    },

    // =========================================================================
    // УРОК 4.3: В ужонде и аптеке — чего не хватает в документах (Brakuje...)
    // =========================================================================
    {
      id: 'les-a1-03-3',
      number: '4.3',
      titlePl: 'W urzędzie: czego brakuje we wniosku? (Brakuje podpisu i załącznika)',
      titleRu: 'В ужонде: чего не хватает в заявлении? (Brakuje podpisu i załącznika)',
      estimatedMinutes: 30,
      objectivesRu: [
        'Понимать ключевой глагол инспекторов в ужонде: brakować (brakuje + Dopełniacz = не хватает чего-то)',
        'Отработать устойчивые административные выражения с Родительным падежом: zaświadczenie o niezaleganiu w podatkach, kopia paszportu, podpis właściciela',
        'Уверенно вести диалог, когда нужно уточнить, какого документа нет в папке, и донести его',
      ],
      theory: {
        title: 'Глагол „brakować” (не хватать) и родительный принадлежности в документах',
        summaryRu:
          'При подаче документов на карту побыту или статус Резидента ЕС инспектор проверяет папку по списку. Если какого-то документа нет, вы услышите: «Tutaj brakuje...» (Здесь не хватает...) + Dopełniacz!',
        keyRules: [
          {
            ruleTitle: '1. Конструкция „Brakuje + Dopełniacz” (Не хватает чего?)',
            explanationRu:
              'Глагол brakować используется в 3-м лице (brakuje) и всегда требует Родительного падежа:\n• Brakuje jednego podpisu (Не хватает одной подписи).\n• Brakuje załącznika numer jeden (Не хватает приложения №1).\n• Brakuje kopii paszportu i opłaty skarbowej (Не хватает копии паспорта и госпошлины).',
            wrongExample: 'Brakuje jeden podpis i kopia paszport.',
            correctExample: 'Brakuje jednego podpisu i kopii paszportu.',
            translationRu: 'Не хватает одной подписи и копии паспорта.',
          },
          {
            ruleTitle: '2. Цепочка существительных (Чей? Какой документ?): Dopełniacz принадлежности',
            explanationRu:
              'Как и в русском/белорусском, второе существительное в связке «копия паспорта», «подпись владельца», «номер телефона» ставится в Dopełniacz:\n• kopia (czego?) paszportu / umowy najmu\n• podpis (kogo?) właściciela mieszkania / pracodawcy\n• numer (czego?) telefonu / konta bankowego.',
            correctExample: 'Potrzebuję podpisu właściciela mieszkania i kopii umowy najmu.',
            translationRu: 'Мне нужна подпись владельца квартиры и копия договора аренды.',
          },
        ],
      },
      dialogue: {
        title: 'W Urzędzie Wojewódzkim: sprawdzanie dokumentów (Проверка документов)',
        contextRu:
          'Павел подаёт пакет документов инспектору в ужонде. Инспектор проверяет заявление и говорит, каких двух бумаг не хватает в папке.',
        lines: [
          {
            speaker: 'Inspektor',
            role: 'npc',
            pl: 'Dzień dobry! Sprawdzam Pana wniosek o kartę pobytu. Widzę oryginał paszportu i umowę o pracę, ale niestety brakuje jeszcze dwóch dokumentów.',
            ru: 'Добрый день! Я проверяю ваше заявление на карту побыту. Я вижу оригинал паспорта и трудовой договор, но, к сожалению, не хватает ещё двух документов.',
            pronunciationHint: 'спра́в-дзам па́-на внё́-сэк... бра-ку́-е е́-шчэ двух до-ку-мэ́н-туф.',
            audioUrl: '/audio/mod-a1-03/dlg-1.mp3',
            grammarNote: 'brakuje (czego?) dwóch dokumentów — Родительный падеж мн.ч.',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Przepraszam, jakich dokładnie dokumentów brakuje w mojej teczce?',
            ru: 'Извините, каких именно документов не хватает в моей папке?',
            pronunciationHint: 'я́-ких до-ква́д-не до-ку-мэ́н-туф бра-ку́-е в мо́-ей тэ́ч-цэ?',
            audioUrl: '/audio/mod-a1-03/dlg-2.mp3',
          },
          {
            speaker: 'Inspektor',
            role: 'npc',
            pl: 'Po pierwsze, nie ma tutaj kserokopii umowy najmu mieszkania. Po drugie, na załączniku numer jeden brakuje podpisu i pieczątki pracodawcy.',
            ru: 'Во-первых, здесь нет ксерокопии договора аренды квартиры. Во-вторых, на приложении номер один не хватает подписи и печати работодателя.',
            pronunciationHint: 'не ма ту́-тай ксэ-ро-ко́-пии у-мо́-вы на́й-му... бра-ку́-е пот-пи́-су и пе-чо́нт-ки пра-цо-да́ф-цы.',
            audioUrl: '/audio/mod-a1-03/dlg-3.mp3',
            grammarNote: 'nie ma kserokopii umowy najmu; brakuje podpisu i pieczątki pracodawcy (всё в Dopełniaczu!).',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Rozumiem. Punkt ksero jest blisko urzędu, więc zaraz zrobię kopię umowy najmu. A załącznik z podpisem szefa przyniosę w poniedziałek rano.',
            ru: 'Понимаю. Пункт ксерокопии находится близко от ужонда, поэтому я сейчас сделаю копию договора аренды. А приложение с подписью начальника принесу в понедельник утром.',
            pronunciationHint: 'пункт ксэ́-ро ест бли́-ско у-жэ́н-ду... зби́-е ко́-пье у-мо́-вы на́й-му.',
            audioUrl: '/audio/mod-a1-03/dlg-4.mp3',
          },
          {
            speaker: 'Inspektor',
            role: 'npc',
            pl: 'Dobrze, ma Pan siedem dni na uzupełnienie braków formalnych. Czekam na Pana dokumenty!',
            ru: 'Хорошо, у вас есть семь дней на донесение недостающих документов. Жду ваши документы!',
            pronunciationHint: 'ма пан ще́-дэм дни на у-зу-пэв-не́-не бра́-куф фор-ма́ль-ных.',
            audioUrl: '/audio/mod-a1-03/dlg-5.mp3',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-a1-03-3-1',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu:
            'Прочитайте отрывок из письма ужонда (Wezwanie): «W załączonym wniosku brakuje: 1) aktualnego zaświadczenia z ZUS, 2) kserokopii wszystkich stron paszportu, 3) dowodu opłaty skarbowej». Чего НЕ хватает в деле?',
          grammarTag: 'Czytanie wezwania z urzędu (brakuje + Dopełniacz)',
          explanationRu:
            'Все три пункта после слова brakuje стоят в Dopełniaczu: актуальной справки из ZUS, ксерокопии всех страниц паспорта и подтверждения госпошлины.',
          options: [
            {
              id: 'opt-1',
              text: 'Актуальной справки из ZUS, ксерокопии всех страниц паспорта и квитанции об оплате госпошлины.',
              isCorrect: true,
              feedbackRu: 'Верно! Вы безошибочно прочитали официальный список недостающих документов.',
            },
            {
              id: 'opt-2',
              text: 'Фотографий, договора аренды жилья и трудового договора.',
              isCorrect: false,
              feedbackRu: 'Об этих документах в письме не говорится.',
            },
          ],
        },
        {
          id: 'ex-a1-03-3-2',
          type: 'cloze_input',
          skill: 'vocabulary',
          difficulty: 2,
          promptRu:
            'Дополните фразу инспектора в Родительном падеже: «На документе не хватает подписи (podpisu) и печати (pieczątki)»:',
          sentenceTemplate: 'Przepraszam, ale na tym formularzu brakuje {{0}} (podpis) oraz {{1}} (pieczątka) firmy.',
          grammarTag: 'brakuje podpisu oraz pieczątki',
          explanationRu:
            'Podpis (м.р. неодуш.) → podpisu; pieczątka (ж.р. после k) → pieczątki.',
          blanks: [
            {
              acceptedAnswers: ['podpisu'],
              baseWordHint: 'podpis (Р.п.)',
            },
            {
              acceptedAnswers: ['pieczątki'],
              baseWordHint: 'pieczątka (Р.п.)',
            },
          ],
        },
        {
          id: 'ex-a1-03-3-3',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu:
            'Переведите на польский язык: «У меня сегодня нет свободного времени, потому что я иду к врачу после работы».',
          acceptedAnswers: [
            'Nie mam dzisiaj wolnego czasu, bo idę do lekarza po pracy.',
            'Dzisiaj nie mam wolnego czasu, bo idę do lekarza po pracy.',
            'Nie mam dzisiaj wolnego czasu, ponieważ idę do lekarza po pracy.',
          ],
          hintTokens: [
            'Nie mam',
            'dzisiaj',
            'wolnego',
            'czasu,',
            'bo',
            'idę',
            'do',
            'lekarza',
            'po',
            'pracy.',
          ],
          grammarTag: 'Nie mam wolnego czasu + idę do lekarza',
          explanationRu:
            'Отрицание требует Dopełniacza (nie mam wolnego czasu), а направление к человеку/месту — предлога do + Dopełniacz (do lekarza).',
        },
      ],
    },
  ],

  // ===========================================================================
  // СЛОВАРЬ МОДУЛЯ 4 (12 карточек SRS с нейроголосами)
  // ===========================================================================
  vocabulary: [
    {
      id: 'voc-a1-03-potrzebowac',
      pl: 'potrzebować (potrzebuję, potrzebuje)',
      ru: 'нуждаться (мне нужно + Родительный падеж)',
      pronunciationHint: 'по-тшэ-бо́-вачь (по-тшэ-бу́-е)',
      audioUrl: '/audio/mod-a1-03/voc-potrzebowac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'potrzebować + Dopełniacz (potrzebuję pomocy, zaświadczenia, czasu)',
      examples: [
        {
          pl: 'Potrzebuję zaświadczenia z urzędu skarbowego.',
          ru: 'Мне нужна справка из налоговой инспекции.',
        },
      ],
      srsPromptSentence: 'Przepraszam, {{0}} (мне нужна — я нуждаюсь) szybkiej pomocy.',
      srsAcceptedAnswers: ['potrzebuję', 'potrzebować'],
      srsBaseHint: 'potrzebować (нуждаться — я)',
    },
    {
      id: 'voc-a1-03-uczyc-sie',
      pl: 'uczyć się (uczę się, uczy się)',
      ru: 'учиться / учить что-то (+ Родительный падеж!)',
      pronunciationHint: 'у́-чычь ще (у́-чэ ще)',
      audioUrl: '/audio/mod-a1-03/voc-uczyc-sie.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'uczyć się + Dopełniacz (uczę się języka polskiego, historii)',
      falseFriendWarning: 'В русском «учу польский язык» (В.п.), а в польском — «uczę się języka polskiego» (Р.п. с частицей się)!',
      examples: [
        {
          pl: 'Codziennie uczę się języka polskiego.',
          ru: 'Каждый день я учу польский язык.',
        },
      ],
      srsPromptSentence: 'Wieczorem {{0}} (учу — я) języka polskiego do egzaminu.',
      srsAcceptedAnswers: ['uczę się', 'uczyć się'],
      srsBaseHint: 'uczyć się (учить — я)',
    },
    {
      id: 'voc-a1-03-brakowac',
      pl: 'brakować (brakuje)',
      ru: 'не хватать / отсутствовать (+ Родительный падеж)',
      pronunciationHint: 'бра-ко́-вачь (бра-ку́-е)',
      audioUrl: '/audio/mod-a1-03/voc-brakowac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'brakuje + Dopełniacz (brakuje podpisu, czasu, dokumentu)',
      examples: [
        {
          pl: 'We wniosku brakuje jednego podpisu.',
          ru: 'В заявлении не хватает одной подписи.',
        },
      ],
      srsPromptSentence: 'Na tym dokumencie {{0}} (не хватает) pieczątki pracodawcy.',
      srsAcceptedAnswers: ['brakuje', 'brakować'],
      srsBaseHint: 'brakować (не хватает)',
    },
    {
      id: 'voc-a1-03-nie-ma',
      pl: 'nie ma (+ Dopełniacz)',
      ru: 'нет (в наличии / на месте)',
      pronunciationHint: 'не ма',
      audioUrl: '/audio/mod-a1-03/voc-nie-ma.mp3',
      partOfSpeech: 'phrase',
      governmentHint: 'nie ma + Dopełniacz (nie ma chleba, nie ma szefa)',
      examples: [
        {
          pl: 'Niestety dzisiaj nie ma tego leku w aptece.',
          ru: 'К сожалению, сегодня этого лекарства нет в аптеке.',
        },
      ],
      srsPromptSentence: 'W sklepie {{0}} (нет в наличии) już świeżego mleka.',
      srsAcceptedAnswers: ['nie ma'],
      srsBaseHint: 'нет (в наличии)',
    },
    {
      id: 'voc-a1-03-czas',
      pl: 'czas (nie mam czasu)',
      ru: 'время (нет времени)',
      pronunciationHint: 'час (не мам ча́-су)',
      audioUrl: '/audio/mod-a1-03/voc-czas.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'Czas — это «время вообще», а 60 минут на часах — godzina! В Р.п.: nie mam czasu.',
      examples: [
        {
          pl: 'Przepraszam, ale dzisiaj nie mam wolnego czasu.',
          ru: 'Извините, но сегодня у меня нет свободного времени.',
        },
      ],
      srsPromptSentence: 'Mam dużo pracy i bardzo mało wolnego {{0}} (времени — Р.п.).',
      srsAcceptedAnswers: ['czasu', 'czas'],
      srsBaseHint: 'czas (в Р.п. -> czasu)',
    },
    {
      id: 'voc-a1-03-pomoc',
      pl: 'pomoc (potrzebuję pomocy)',
      ru: 'помощь (нуждаюсь в помощи)',
      pronunciationHint: 'по́-моц (по-мо́-цы)',
      audioUrl: '/audio/mod-a1-03/voc-pomoc.mp3',
      partOfSpeech: 'noun',
      gender: 'f',
      examples: [
        {
          pl: 'Dziękuję za szybką pomoc w urzędzie.',
          ru: 'Спасибо за быструю помощь в ужонде.',
        },
      ],
      srsPromptSentence: 'Czy potrzebuje Pan {{0}} (помощи — Р.п. от pomoc)?',
      srsAcceptedAnswers: ['pomocy', 'pomoc'],
      srsBaseHint: 'pomoc (в Р.п. -> pomocy)',
    },
    {
      id: 'voc-a1-03-bez',
      pl: 'bez (+ Dopełniacz)',
      ru: 'без (+ Родительный падеж)',
      pronunciationHint: 'бэз',
      audioUrl: '/audio/mod-a1-03/voc-bez.mp3',
      partOfSpeech: 'phrase',
      examples: [
        {
          pl: 'Poproszę czarną kawę bez cukru i bez mleka.',
          ru: 'Пожалуйста, чёрный кофе без сахара и без молока.',
        },
      ],
      srsPromptSentence: 'Nie można kupić tego antybiotyku {{0}} (без) recepty.',
      srsAcceptedAnswers: ['bez'],
      srsBaseHint: 'без (предлог)',
    },
    {
      id: 'voc-a1-03-blisko',
      pl: 'blisko (+ Dopełniacz)',
      ru: 'близко (от чего-то) / рядом',
      pronunciationHint: 'бли́-ско',
      audioUrl: '/audio/mod-a1-03/voc-blisko.mp3',
      partOfSpeech: 'adv',
      governmentHint: 'blisko + Dopełniacz БЕЗ предлога od (blisko domu, blisko dworca)',
      examples: [
        {
          pl: 'Apteka znajduje się blisko naszego domu.',
          ru: 'Аптека находится близко от нашего дома.',
        },
      ],
      srsPromptSentence: 'Mieszkam {{0}} (близко от) centrum i stacji metra.',
      srsAcceptedAnswers: ['blisko'],
      srsBaseHint: 'близко',
    },
    {
      id: 'voc-a1-03-obok',
      pl: 'obok (+ Dopełniacz)',
      ru: 'рядом с / возле (+ Родительный падеж без предлога)',
      pronunciationHint: 'о́-бок',
      audioUrl: '/audio/mod-a1-03/voc-obok.mp3',
      partOfSpeech: 'adv',
      governmentHint: 'obok + Dopełniacz (obok sklepu, obok urzędu)',
      examples: [
        {
          pl: 'Punkt ksero jest tuż obok urzędu.',
          ru: 'Пункт ксерокопии находится прямо рядом с ужондом.',
        },
      ],
      srsPromptSentence: 'Przystanek autobusowy jest {{0}} (рядом с) piekarni.',
      srsAcceptedAnswers: ['obok'],
      srsBaseHint: 'рядом с (obok)',
    },
    {
      id: 'voc-a1-03-kopia',
      pl: 'kopia / kserokopia',
      ru: 'копия / ксерокопия',
      pronunciationHint: 'ко́-пья / ксэ-ро-ко́-пья',
      audioUrl: '/audio/mod-a1-03/voc-kopia.mp3',
      partOfSpeech: 'noun',
      gender: 'f',
      examples: [
        {
          pl: 'Do wniosku trzeba dołączyć kopię paszportu.',
          ru: 'К заявлению нужно приложить копию паспорта.',
        },
      ],
      srsPromptSentence: 'W teczce nie ma {{0}} (копии — Р.п.: kopii) umowy najmu.',
      srsAcceptedAnswers: ['kopii', 'kserokopii', 'kopia'],
      srsBaseHint: 'kopia (в Р.п. -> kopii)',
    },
    {
      id: 'voc-a1-03-lek',
      pl: 'lek / lekarstwo',
      ru: 'лекарство / препарат',
      pronunciationHint: 'лэк / ле-ка́р-стфо',
      audioUrl: '/audio/mod-a1-03/voc-lek.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      examples: [
        {
          pl: 'W tej aptece nie ma tego leku.',
          ru: 'В этой аптеке нет этого лекарства.',
        },
      ],
      srsPromptSentence: 'Ten skuteczny {{0}} (лекарство) jest dostępny tylko na receptę.',
      srsAcceptedAnswers: ['lek', 'lekarstwo'],
      srsBaseHint: 'лекарство (lek)',
    },
    {
      id: 'voc-a1-03-duzo',
      pl: 'dużo / mało (+ Dopełniacz)',
      ru: 'много / мало (+ Родительный падеж)',
      pronunciationHint: 'ду́-жо / ма́-во',
      audioUrl: '/audio/mod-a1-03/voc-duzo.mp3',
      partOfSpeech: 'adv',
      examples: [
        {
          pl: 'W tym tygodniu mam dużo pracy i mało czasu.',
          ru: 'На этой неделе у меня много работы и мало времени.',
        },
      ],
      srsPromptSentence: 'Przed egzaminem mam {{0}} (много) nauki.',
      srsAcceptedAnswers: ['dużo'],
      srsBaseHint: 'много (dużo)',
    },
  ],

  // ===========================================================================
  // ПРАКТИЧЕСКАЯ МИССИЯ 4: АПТЕКА И ПУНКТ КСЕРО У УЖОНДА
  // ===========================================================================
  quest: {
    id: 'quest-a1-03',
    title: 'Миссия 4: Донесение документов в ужонд и визит в аптеку',
    descriptionRu:
      'Узнайте у инспектора, какого документа не хватает в вашем деле, сделайте ксерокопию рядом с ужондом и купите лекарство по дороге домой.',
    locationName: 'Urząd Wojewódzki & Apteka przy Dworcu',
    steps: [
      {
        id: 'q-a1-03-step-1',
        stepTitle: 'Шаг 1 из 3: Чего не хватает в заявлении? (Brakuje + Dopełniacz)',
        situationRu:
          'Инспектор проверил ваше заявление и указывает, что в папке отсутствует копия паспорта.',
        npcLinePl: 'W Pana wniosku nie ma kserokopii paszportu i brakuje jednego podpisu.',
        npcAudioUrl: '/audio/mod-a1-03/quest-npc-1.mp3',
        exercise: {
          id: 'ex-q-a1-03-1',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Ответьте инспектору: «Извините, я сейчас сделаю копию паспорта в пункте ксеро рядом с ужондом».',
          targetSentences: [
            'Przepraszam, zaraz zrobię kopię paszportu w punkcie ksero obok urzędu.',
          ],
          tokens: [
            'Przepraszam,',
            'zaraz',
            'zrobię',
            'kopię',
            'paszportu',
            'w',
            'punkcie',
            'ksero',
            'obok',
            'urzędu.',
            'paszport',
            'urząd.',
          ],
          grammarTag: 'kopię paszportu + obok urzędu',
          explanationRu:
            '«Копию (кого? чего?) паспорта» = kopię paszportu; «рядом с (чем?) ужондом» = obok urzędu.',
        },
      },
      {
        id: 'q-a1-03-step-2',
        stepTitle: 'Шаг 2 из 3: В аптеке (Nie ma / Bez recepty)',
        situationRu:
          'Сдав документы, вы зашли в аптеку рядом с домом. Фармацевт спрашивает, что вам нужно.',
        npcLinePl: 'Dzień dobry! Czego Pan dzisiaj potrzebuje?',
        npcAudioUrl: '/audio/mod-a1-03/quest-npc-2.mp3',
        exercise: {
          id: 'ex-q-a1-03-2',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu:
            'Ответьте: «Мне нужен сироп (syropu) от кашля без рецепта (bez recepty), потому что у меня нет времени (czasu) идти к врачу»:',
          sentenceTemplate: 'Potrzebuję {{0}} (syrop) na kaszel bez {{1}} (recepta), bo nie mam dzisiaj {{2}} (czas) iść do lekarza.',
          grammarTag: 'potrzebuję syropu + bez recepty + nie mam czasu',
          explanationRu:
            'Все три слова стоят в Dopełniaczu: potrzebuję syropu, bez recepty, nie mam czasu.',
          blanks: [
            {
              acceptedAnswers: ['syropu'],
              baseWordHint: 'syrop (Р.п.)',
            },
            {
              acceptedAnswers: ['recepty'],
              baseWordHint: 'recepta (Р.п.)',
            },
            {
              acceptedAnswers: ['czasu'],
              baseWordHint: 'czas (Р.п.)',
            },
          ],
        },
      },
      {
        id: 'q-a1-03-step-3',
        stepTitle: 'Шаг 3 из 3: Заказ в кафе по дороге домой',
        situationRu:
          'Вы зашли выпить чаю после ужонда. Скажите бариста, что не пьёте чёрный кофе вечером и просите чай без сахара.',
        exercise: {
          id: 'ex-q-a1-03-3',
          type: 'free_translation',
          skill: 'speaking',
          difficulty: 3,
          promptRu:
            'Переведите на польский: «Вечером я не пью чёрный кофе. Пожалуйста, горячий чай без сахара».',
          acceptedAnswers: [
            'Wieczorem nie piję czarnej kawy. Poproszę gorącą herbatę bez cukru.',
            'Nie piję wieczorem czarnej kawy. Poproszę gorącą herbatę bez cukru.',
          ],
          hintTokens: [
            'Wieczorem',
            'nie piję',
            'czarnej',
            'kawy.',
            'Poproszę',
            'gorącą',
            'herbatę',
            'bez',
            'cukru.',
          ],
          grammarTag: 'Nie piję czarnej kawy (Dopełniacz) vs Poproszę gorącą herbatę (Biernik)',
          explanationRu:
            'Отличное сопоставление двух падежей: после отрицания «nie piję» — Dopełniacz (czarnej kawy), после «poproszę» — Biernik (gorącą herbatę), после «bez» — снова Dopełniacz (bez cukru)!',
        },
      },
    ],
  },

  // ===========================================================================
  // ИТОГОВЫЙ КОНТРОЛЬНЫЙ ТЕСТ МОДУЛЯ 4 (Порог 80%)
  // ===========================================================================
  finalTest: {
    id: 'test-a1-03',
    passingScorePercent: 80,
    exercises: [
      {
        id: 'test-a1-03-1',
        type: 'multiple_choice',
        skill: 'grammar',
        difficulty: 1,
        promptRu: 'Выберите предложение без грамматических ошибок (обратите внимание на отрицание!):',
        grammarTag: 'Dopełniacz po przeczeniu',
        explanationRu:
          'После отрицания «nie mam» дополнение «nowa umowa» обязательно переходит в Dopełniacz: «nowej umowy».',
        options: [
          {
            id: 'opt-1',
            text: 'Mam paszport, ale jeszcze nie mam nowej umowy najmu.',
            isCorrect: true,
            feedbackRu: 'Верно! В утверждении Biernik (paszport), а после nie mam — Dopełniacz (nowej umowy).',
          },
          {
            id: 'opt-2',
            text: 'Mam paszport, ale jeszcze nie mam nową umowę najmu.',
            isCorrect: false,
            feedbackRu: 'Ошибка! После nie mam нельзя использовать форму Biernika (nową umowę).',
          },
        ],
      },
      {
        id: 'test-a1-03-2',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu:
          'Поставьте слова в скобках в Родительный падеж после глаголов szukać и uczyć się:',
          sentenceTemplate: 'Szukam {{0}} (dobre mieszkanie) blisko centrum i uczę się {{1}} {{2}} (język polski).',
        grammarTag: 'szukać dobrego mieszkania / uczyć się języka polskiego',
        explanationRu:
          'Средний род: dobrego mieszkania; мужской род после uczyć się: języka polskiego.',
        blanks: [
          {
            acceptedAnswers: ['dobrego mieszkania'],
            baseWordHint: 'dobre mieszkanie',
          },
          {
            acceptedAnswers: ['języka'],
            baseWordHint: 'język',
          },
          {
            acceptedAnswers: ['polskiego'],
            baseWordHint: 'polski',
          },
        ],
      },
      {
        id: 'test-a1-03-3',
        type: 'cloze_input',
        skill: 'writing',
        difficulty: 2,
        promptRu:
          'Впишите правильные формы после предлогов z, do и obok:',
        sentenceTemplate: 'Wracam z {{0}} (praca), idę do {{1}} (apteka) obok {{2}} (dworzec).',
        grammarTag: 'z pracy / do apteki / obok dworca',
        explanationRu:
          'praca → z pracy, apteka (после k пишется -i) → do apteki, dworzec (беглая e) → obok dworca.',
        blanks: [
          {
            acceptedAnswers: ['pracy'],
            baseWordHint: 'praca',
          },
          {
            acceptedAnswers: ['apteki'],
            baseWordHint: 'apteka',
          },
          {
            acceptedAnswers: ['dworca'],
            baseWordHint: 'dworzec',
          },
        ],
      },
      {
        id: 'test-a1-03-4',
        type: 'multiple_choice',
        skill: 'vocabulary',
        difficulty: 2,
        promptRu:
          'Как правильно сказать по-польски: «Сегодня в этом магазине нет свежего хлеба»?',
        grammarTag: 'Konstrukcja „Nie ma + Dopełniacz”',
        explanationRu:
          'Для обозначения отсутствия чего-то в наличии используется безличное «nie ma» + Родительный падеж (świeżego chleba).',
        options: [
          {
            id: 'opt-1',
            text: 'Dzisiaj w tym sklepie nie ma świeżego chleba.',
            isCorrect: true,
            feedbackRu: 'Отлично! Безличное «nie ma» + Dopełniacz «świeżego chleba».',
          },
          {
            id: 'opt-2',
            text: 'Dzisiaj w tym sklepie nie jest świeży chleb.',
            isCorrect: false,
            feedbackRu: 'В польском языке нельзя сказать «nie jest» в значении «нет в наличии» — всегда говорится «nie ma».',
          },
        ],
      },
      {
        id: 'test-a1-03-5',
        type: 'word_bank',
        skill: 'grammar',
        difficulty: 2,
        promptRu:
          'Соберите фразу инспектора: «В вашем заявлении не хватает одной подписи и справки».',
        targetSentences: [
          'W Pana wniosku brakuje jednego podpisu i zaświadczenia.',
        ],
        tokens: [
          'W',
          'Pana',
          'wniosku',
          'brakuje',
          'jednego',
          'podpisu',
          'i',
          'zaświadczenia.',
          'jeden',
          'podpis',
        ],
        grammarTag: 'brakuje + Dopełniacz',
        explanationRu:
          'После глагола brakuje оба существительных стоят в Dopełniaczu: jednego podpisu i zaświadczenia.',
      },
      {
        id: 'test-a1-03-6',
        type: 'free_translation',
        skill: 'writing',
        difficulty: 3,
        promptRu:
          'Переведите на польский язык: «Я ищу новую работу недалеко от дома и учу польский язык».',
        acceptedAnswers: [
          'Szukam nowej pracy blisko domu i uczę się języka polskiego.',
          'Szukam nowej pracy niedaleko domu i uczę się języka polskiego.',
          'Szukam nowej pracy obok domu i uczę się języka polskiego.',
        ],
        hintTokens: [
          'Szukam',
          'nowej',
          'pracy',
          'blisko',
          'domu',
          'i',
          'uczę się',
          'języka',
          'polskiego.',
        ],
        grammarTag: 'Szukam nowej pracy + blisko domu + uczę się języka polskiego',
        explanationRu:
          'Все три конструкции в этом предложении управляются Родительным падежом (Dopełniacz): nowej pracy, blisko domu, języka polskiego.',
      },
    ],
  },

  errorClinic: [
    {
      tag: 'ERR_GENITIVE_NEGATION',
      title: 'Отрицание = ВСЕГДА Dopełniacz (Nie piję kawy, Nie mam czasu)',
      wrongPl: 'Nie piję czarną kawę. Nie rozumiem to pytanie.',
      correctPl: 'Nie piję czarnej kawy. Nie rozumiem tego pytania.',
      explanationRu:
        'Как только перед переходным глаголом появляется частица NIE, Винительный падеж автоматически меняется на Родительный!',
    },
    {
      tag: 'ERR_VERB_GOV',
      title: 'Uczę się języka polskiego / Szukam pracy (а не język polski / pracę!)',
      wrongPl: 'Uczę się język polski i szukam dobrą pracę.',
      correctPl: 'Uczę się języka polskiego i szukam dobrej pracy.',
      explanationRu:
        'Глаголы uczyć się, szukać, potrzebować, słuchać, brakować всегда требуют Родительного падежа (Kogo? Czego?).',
    },
    {
      tag: 'ERR_FALSE_FRIEND',
      title: 'Нет в наличии / нет на месте = „Nie ma + Dopełniacz” (а не „Nie jest”!)',
      wrongPl: 'W sklepie nie jest chleb. Szef nie jest w biurze.',
      correctPl: 'W sklepie nie ma chleba. Szefa nie ma w biurze.',
      explanationRu:
        'В утверждении используется jest («Chleb jest w sklepie»), но при отсутствии чего-то или кого-то глагол być заменяется на безличное „nie ma” + Родительный падеж!',
    },
  ],
};
