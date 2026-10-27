import { CourseModule } from '@/types/curriculum';

export const MODULE_A1_02: CourseModule = {
  id: 'mod-a1-02',
  releaseNumber: 3,
  level: 'A1',
  titlePl: 'Liczebniki, ceny, godziny, Biernik i słowa pytające',
  titleRu: 'Числа, цены, часы, Винительный падеж (Biernik) и вопросительные слова',
  subtitleRu:
    'Учимся называть цены в злотых (1 złoty / 2 złote / 5 złotych), время и даты (dwudziesty pierwszy), использовать слова типа dwójka/ósemka, ставить дополнения в Biernik и точно задавать вопросы (Gdzie / Dokąd / Którędy / Jaki / Który).',
  estimatedHours: 4.5,
  learningGoalsRu: [
    'Считать от 0 до 1 000 000 без ошибок в написании (dwanaście, piętnaście, czterdzieści, pięćdziesiąt, osiemdziesiąt) и правильно сочетать числа со словом złoty / tysiąc',
    'Образовывать порядковые числительные (pierwszy, drugi, trzeci, dwunasty, dwudziesty pierwszy) для времени на часах, этажей и дат, а также понимать существительные jedynka, dwójka, ósemka, zerówka',
    'Использовать Винительный падеж (Biernik: Kogo? Co?) при заказе в кафе и покупках в магазине (poproszę czarną kawę i świeży chleb)',
    'Различать вопросительные слова Gdzie? (где?) vs Dokąd? (куда?) vs Którędy? (какой дорогой?), Dlaczego? (почему?) vs Po co? (зачем?), Jaki? (какой по качеству?) vs Który? (который по счёту?)',
  ],
  lessons: [
    // =========================================================================
    // УРОК 3.1: Количественные числительные, цены и Винительный падеж (Biernik)
    // =========================================================================
    {
      id: 'les-a1-02-1',
      number: '3.1',
      titlePl: 'Ile to kosztuje? Liczebniki główne, ceny w złotych i Biernik',
      titleRu: 'Сколько это стоит? Количественные числительные, злотые и Винительный падеж (Biernik)',
      estimatedMinutes: 25,
      objectivesRu: [
        'Запомнить правило цен и тысяч: 1 złoty (tysiąc), 2–4 złote (tysiące), 5–20 złotych (tysięcy)',
        'Освоить Винительный падеж (Biernik) женского рода (-a → -ę, прилагательное -ą: czarną kawę, świeżą bułkę) и неодушевлённого мужского рода (= Именительный: świeży chleb)',
        'Избегать ловушек в числительных czterdzieści (40), pięćdziesiąt (50), osiemdziesiąt (80) и pięćset (500)',
      ],
      theory: {
        title: 'Цены в злотых, числительные 0–1000 и Винительный падеж (Biernik)',
        summaryRu:
          'Когда мы покупаем продукты в Biedronka или пекарне («Poproszę...», «Kupuję...»), прямые дополнения ставятся в Винительный падеж (Biernik — Kogo? Co?), а сумма называется по чёткому правилу согласования числительных.',
        keyRules: [
          {
            ruleTitle: '1. Правило злотых и тысяч: 1 złoty • 2, 3, 4 złote • 5–20 złotych',
            explanationRu:
              'Слово złoty изменяется как прилагательное мужского рода: 1 złoty; после цифр 2, 3, 4 (кроме 12, 13, 14!) используется форма złote (dwa złote, dwadzieścia cztery złote); после 0, 5–20 и десятков — форма Родительного падежа мн.ч. złotych (pięć złotych, dwanaście złotych, sto złotych). Точно так же ведёт себя слово тысяча: 1 tysiąc, 2–4 tysiące, 5–20 tysięcy.',
            wrongExample: 'Dwa złotych / Pięć złote / Trzy tysięcy',
            correctExample: 'Jeden złoty, dwa złote, pięć złotych, trzy tysiące złotych.',
            translationRu: 'Один злотый, два злотых, пять злотых, три тысячи злотых.',
          },
          {
            ruleTitle: '2. Орфографические ловушки числительных 11–900',
            explanationRu:
              'Обратите внимание на написание: 15 = piętnaście (с ę и t), 40 = czterdzieści (не «сорок»!), 50–90 пишутся с окончанием -dziesiąt (pięćdziesiąt, osiemdziesiąt — обязательно через i после s!, dziewięćdziesiąt). В сотнях: 200 = dwieście, 300 = trzysta, 400 = czterysta, а 500–900 пишутся слитно с -set и ударением на первый слог (pię́ćset, széśćset).',
            wrongExample: 'osemdziesiąt / czterysta pięćdziesiąt złote',
            correctExample: 'osiemdziesiąt złotych, czterysta pięćdziesiąt złotych',
            translationRu: 'восемьдесят злотых, четыреста пятьдесят злотых',
          },
          {
            ruleTitle: '3. Винительный падеж (Biernik: Kogo? Co?) после Poproszę / Kupuję / Mam',
            explanationRu:
              '1) У существительных ЖЕНСКОГО рода на -a окончание меняется на -ę, а у прилагательного — на -ą (сравните с русским «чёрную кофе» — в польском kawa женского рода!): czarna kawa → Poproszę czarną kawę; świeża bułka → Kupuję świeżą bułkę. 2) У НЕОДУШЕВЛЁННЫХ существительных мужского и среднего рода Biernik совпадает с Именительным: Poproszę ten świeży chleb i zimne mleko.',
            wrongExample: 'Poproszę czarny kawa i świeży bułka.',
            correctExample: 'Poproszę czarną kawę, świeżą bułkę i ten żytni chleb.',
            translationRu: 'Пожалуйста, чёрный кофе, свежую булочку и этот ржаной хлеб.',
          },
        ],
        table: {
          headers: ['Число', 'Количественное (Liczebnik główny)', 'Со словом złoty', 'Со словом tysiąc'],
          rows: [
            ['1', 'jeden', 'jeden złoty', 'jeden tysiąc'],
            ['2, 3, 4', 'dwa, trzy, cztery', 'dwa / trzy / cztery złote', 'dwa / trzy / cztery tysiące'],
            ['5 – 20', 'pięć, dwanaście, piętnaście, dwadzieścia', 'pięć / dwanaście złotych', 'pięć / dwanaście tysięcy'],
            ['22, 23, 24', 'dwadzieścia dwa / trzy / cztery', 'dwadzieścia dwa złote', 'dwadzieścia dwa tysiące'],
            ['40, 50, 80, 100', 'czterdzieści, pięćdziesiąt, osiemdziesiąt, sto', 'osiemdziesiąt złotych', 'sto tysięcy'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-02-1-1',
          type: 'multiple_choice',
          skill: 'listening',
          difficulty: 1,
          promptRu: 'Прослушайте фразу кассира в пекарне и выберите точную сумму к оплате:',
          audioUrl: '/audio/mod-a1-02/ex-kasa-24-zlote.mp3',
          audioTranscriptPl: 'Poproszę czarną kawę i świeżą bułkę. Razem płaci Pan dwadzieścia cztery złote.',
          grammarTag: 'Liczebniki + ceny w złotych',
          explanationRu:
            '«Dwadzieścia cztery złote» — 24 злотых (после четыре на конце составного числительного используется форма złote).',
          options: [
            {
              id: 'opt-1',
              text: '24 злотых (dwadzieścia cztery złote)',
              isCorrect: true,
              feedbackRu: 'Верно! Dwadzieścia cztery złote = 24 злотых.',
            },
            {
              id: 'opt-2',
              text: '42 злотых (czterdzieści dwa złote)',
              isCorrect: false,
              feedbackRu: '42 по-польски звучит как «czterdzieści dwa», а диктор сказал «dwadzieścia cztery» (24).',
            },
            {
              id: 'opt-3',
              text: '14 злотых (czternaście złotych)',
              isCorrect: false,
              feedbackRu: '14 — это czternaście złotych.',
            },
          ],
        },
        {
          id: 'ex-a1-02-1-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Закажите в кафе «чёрный кофе» в Винительном падеже (Biernik). Помните: kawa в польском — женского рода (прилагательное на -ą, существительное на -ę):',
          sentenceTemplate: 'Dzień dobry! Poproszę {{0}} {{1}} na wynos.',
          grammarTag: 'Biernik rodzaju żeńskiego (-ą, -ę)',
          explanationRu:
            'В Biernik женского рода прилагательное получает окончание -ą (czarną), а существительное — окончание -ę (kawę).',
          blanks: [
            {
              acceptedAnswers: ['czarną'],
              baseWordHint: 'czarna (чёрную)',
            },
            {
              acceptedAnswers: ['kawę'],
              baseWordHint: 'kawa (кофе)',
            },
          ],
        },
        {
          id: 'ex-a1-02-1-3',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu:
            'Впишите числительные «пятьдесят» (50) и «восемьдесят» (80) по-польски буквами:',
          sentenceTemplate: 'Bilet normalny kosztuje {{0}} (50) złotych, a mandat wynosi {{1}} (80) złotych.',
          grammarTag: 'Pisownia liczebników 50–90 (-dziesiąt)',
          explanationRu:
            'От 50 до 90 числительные оканчиваются на -dziesiąt: pięćdziesiąt (50) и osiemdziesiąt (80 — обязательно с буквой i после s!).',
          blanks: [
            {
              acceptedAnswers: ['pięćdziesiąt'],
              baseWordHint: '50 (пятьдесят)',
            },
            {
              acceptedAnswers: ['osiemdziesiąt'],
              baseWordHint: '80 (восемьдесят)',
            },
          ],
        },
        {
          id: 'ex-a1-02-1-4',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите фразу покупателя: «Я покупаю свежий хлеб и одну булочку за четыре злотых».',
          targetSentences: [
            'Kupuję świeży chleb i jedną bułkę za cztery złote.',
          ],
          tokens: [
            'Kupuję',
            'świeży',
            'chleb',
            'i',
            'jedną',
            'bułkę',
            'za',
            'cztery',
            'złote.',
            'złotych.',
            'świeża',
            'bułka',
          ],
          grammarTag: 'Biernik + 2-4 złote',
          explanationRu:
            'Неодушевлённый мужской род в Biernik не меняется (świeży chleb), женский род меняет окончания на -ą/-ę (jedną bułkę), а после czterech/cztery используется форма złote.',
        },
      ],
    },

    // =========================================================================
    // УРОК 3.2: Порядковые числительные, время, даты и слова dwójka / ósemka
    // =========================================================================
    {
      id: 'les-a1-02-2',
      number: '3.2',
      titlePl: 'Która jest godzina? Liczebniki porządkowe i rzeczowniki (dwójka, ósemka)',
      titleRu: 'Который час? Порядковые числительные, даты и слова dwójka / ósemka',
      estimatedMinutes: 25,
      objectivesRu: [
        'Освоить порядковые числительные 1–20 (pierwszy, drugi, trzeci, czwarty, szósty, siódmy, ósmy, dwunasty)',
        'Запомнить главное отличие от русского и белорусского в составных порядковых числительных (21–99): ОБА слова становятся порядковыми (dwudziesty pierwszy)',
        'Использовать отчислительные существительные (zerówka, jedynka, dwójka, ósemka) для номеров трамваев, квартир и школьных классов',
      ],
      theory: {
        title: 'Порядковые числительные (Liczebniki porządkowe) и существительные типа dwójka / ósemka',
        summaryRu:
          'В Польше порядковые числительные нужны не только для этажей и дат, но и для называния КАЖДОГО часа времени («Która jest godzina? — Jest ósma trzydzieści»). А для номеров автобусов, трамваев, квартир и оценок поляки используют особые существительные женского рода: jedynka, dwójka, trójka, ósemka.',
        keyRules: [
          {
            ruleTitle: '1. Чередования в порядковых числительных 6, 7, 8 и 12',
            explanationRu:
              'Запомните 4 важные формы из вашей таблицы: 6 (sześć) → szósty (через ó); 7 (siedem) → siódmy (через ó); 8 (osiem) → ósmy (начинается с ó, читается «у́смы»); 12 (dwanaście) → dwunasty (гласная a меняется на u!).',
            wrongExample: 'siedmy / osmy / dwanasty',
            correctExample: 'szósty (6.), siódmy (7.), ósmy (8.), dwunasty (12.)',
            translationRu: 'шестой, седьмой, восьмой, двенадцатый',
          },
          {
            ruleTitle: '2. Составные порядковые числительные (21–99 и годы): ОБА слова порядковые!',
            explanationRu:
              'В русском языке в числе «двадцать первый (21-й)» изменяется только последнее слово. В польском языке в двузначных числах (21–99) ОБА слова ставятся в форму порядкового числительного и оба склоняются: 21 = dwudziesty pierwszy (букв. «двадцатый первый»), 25 = dwudziesty piąty, на 21-м этаже = na dwudziestym pierwszym piętrze, в 2015 году = w dwa tysiące piętnastym roku.',
            wrongExample: 'dwadzieścia pierwszy / w dwadzieścia pierwszym wieku',
            correctExample: 'dwudziesty pierwszy (21.) / w dwudziestym pierwszym wieku',
            translationRu: 'двадцать первый / в двадцать первом веке',
          },
          {
            ruleTitle: '3. Как называть время: Która jest godzina? vs O której godzinie?',
            explanationRu:
              'Час в польском всегда называется порядковым числительным женского рода (так как godzina — она): «Jest godzina ósma» (Сейчас восемь часов), «Jest dwunasta piętnaście» (12:15). А на вопрос «Во сколько?» (O której godzinie?) используется окончание -ej: o pierwszej (в 1:00), o drugiej (в 2:00 — после g пишется -iej!), o ósmej (в 8:00), o dwunastej (в 12:00).',
            wrongExample: 'Jest osiem godzina. Spotkamy się w osiem godzin.',
            correctExample: 'Jest ósma godzina. Spotkamy się o ósmej.',
            translationRu: 'Сейчас восемь часов. Встретимся в восемь.',
          },
          {
            ruleTitle: '4. Существительные от числительных (Rzeczowniki odliczebnikowe): zerówka, jedynka, dwójka, ósemka',
            explanationRu:
              'В живой речи вместо «tramwaj numer osiem» или «mieszkanie numer osiem» поляки говорят: «Jadę ósemką» (Еду на восьмёрке), «Sąsiad spod ósemki» (Сосед из 8-й квартиры), «Dziecko chodzi do zerówki» (Ребёнок ходит в нулевой подготовительный класс), «Idziemy do kina we dwójkę / w piątkę» (Идём в кино вдвоём / впятером).',
            correctExample: 'Czekam na przystanku na ósemkę, a potem idziemy na kolację we dwójkę.',
            translationRu: 'Я жду на остановке восьмёрку (трамвай №8), а потом мы идём на ужин вдвоём.',
          },
        ],
        table: {
          headers: ['Цифра', 'Количественное (Ile?)', 'Порядковое (Który / Która?)', 'Существительное (Co?)'],
          rows: [
            ['0', 'zero', 'zerowy, zerowa', 'zerówka (подготовительный класс)'],
            ['1', 'jeden', 'pierwszy, pierwsza (o pierwszej)', 'jedynka (трамвай №1 / 1-местный номер)'],
            ['2', 'dwa', 'drugi, druga (o drugiej)', 'dwójka (we dwójkę — вдвоём)'],
            ['3', 'trzy', 'trzeci, trzecia (o trzeciej)', 'trójka (тройка)'],
            ['6', 'sześć', 'szósty, szósta (o szóstej)', 'szóstka (высшая оценка 6 в школе)'],
            ['7', 'siedem', 'siódmy, siódma (o siódmej)', 'siódemka (семёрка)'],
            ['8', 'osiem', 'ósmy, ósma (o ósmej)', 'ósemka (трамвай №8 / кв. №8)'],
            ['12', 'dwanaście', 'dwunasty, dwunasta (o dwunastej)', 'dwunastka (двенадцатый маршрут)'],
            ['21', 'dwadzieścia jeden', 'dwudziesty pierwszy', 'dwudziestka (двадцатка)'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-02-2-1',
          type: 'multiple_choice',
          skill: 'grammar',
          difficulty: 1,
          promptRu:
            'Как правильно по-польски сказать и написать «двадцать первый (21-й)» согласно правилу составных порядковых числительных?',
          grammarTag: 'Liczebniki porządkowe złożone (21–99)',
          explanationRu:
            'В польском языке в двузначных порядковых числительных ОБА слова становятся порядковыми: dwudziesty pierwszy.',
          options: [
            {
              id: 'opt-1',
              text: 'dwudziesty pierwszy',
              isCorrect: true,
              feedbackRu: 'Отлично! Оба слова стоят в форме порядкового числительного: dwudziesty pierwszy.',
            },
            {
              id: 'opt-2',
              text: 'dwadzieścia pierwszy',
              isCorrect: false,
              feedbackRu: 'Это калька с русского («двадцать первый»). По-польски десятки тоже становятся порядковыми: dwudziesty pierwszy.',
            },
            {
              id: 'opt-3',
              text: 'dwudziesty jeden',
              isCorrect: false,
              feedbackRu: 'Единицы тоже должны быть порядковыми: pierwszy.',
            },
          ],
        },
        {
          id: 'ex-a1-02-2-2',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu:
            'Впишите порядковые числительные «восьмой час (в восемь — o ósmej)» и «двенадцатый (dwunasty)» с правильным чередованием гласных:',
          sentenceTemplate: 'Urząd otwierają o godzinie {{0}} (в 8:00 — ósmej), a grudzień to {{1}} (12-й — м.р.) miesiąc roku.',
          grammarTag: 'Alternacje: osiem -> ósmy, dwanaście -> dwunasty',
          explanationRu:
            'Osiem → ósmy (o ósmej через ó), а dwanaście → dwunasty (через u!).',
          blanks: [
            {
              acceptedAnswers: ['ósmej'],
              baseWordHint: '8:00 (o ósmej)',
            },
            {
              acceptedAnswers: ['dwunasty'],
              baseWordHint: '12-й (dwunasty)',
            },
          ],
        },
        {
          id: 'ex-a1-02-2-3',
          type: 'multiple_choice',
          skill: 'vocabulary',
          difficulty: 1,
          promptRu:
            'Что означает польское предложение: «Moja córka chodzi do zerówki, a do domu wracamy tramwajową ósemką»?',
          grammarTag: 'Rzeczowniki odliczebnikowe (zerówka, ósemka)',
          explanationRu:
            'Zerówka — подготовительный («нулевой») класс перед 1-м классом начальной школы, а ósemka — трамвай маршрута №8.',
          options: [
            {
              id: 'opt-1',
              text: 'Моя дочка ходит в подготовительный («нулевой») класс, а домой мы возвращаемся на трамвае №8.',
              isCorrect: true,
              feedbackRu: 'Верно! Zerówka и ósemka — важнейшие отчислительные существительные из вашей таблицы.',
            },
            {
              id: 'opt-2',
              text: 'Моя дочка получила ноль баллов, и мы возвращаемся домой в восемь часов.',
              isCorrect: false,
              feedbackRu: 'Нет, «в восемь часов» было бы «o ósmej», а «ósemką» (Твор.п. от ósemka) — это «на восьмёрке (трамвае №8)».',
            },
          ],
        },
      ],
    },

    // =========================================================================
    // УРОК 3.3: Вопросительные слова (Gdzie / Dokąd / Którędy / Jaki / Który) и 7 падежей
    // =========================================================================
    {
      id: 'les-a1-02-3',
      number: '3.3',
      titlePl: 'Słowa pytające i 7 przypadków: Gdzie, Dokąd, Którędy, Jaki czy Który?',
      titleRu: 'Вопросительные слова и 7 падежей: Gdzie, Dokąd, Którędy, Jaki или Który?',
      estimatedMinutes: 30,
      objectivesRu: [
        'Научиться безошибочно выбирать между Gdzie? (где?), Dokąd? (куда?), Skąd? (откуда?) и Którędy? (какой дорогой?)',
        'Различать вопросы о причине Dlaczego? / Czemu? (почему?) и о цели Po co? (зачем?)',
        'Понять разницу между Jaki? (какой по качеству?) и Który? (который по счёту / какой из списка?) и ставить частицу Czy в начало вопроса',
      ],
      theory: {
        title: 'Система вопросительных слов и 7 падежей польского языка',
        summaryRu:
          'В вашей таблице собраны все главные вопросительные слова польского языка и 7 падежей (Przypadki). На государственном экзамене B1/B2 умение задать точный вопрос в диалоге с экзаменатором — обязательное требование устной части.',
        keyRules: [
          {
            ruleTitle: '1. Четыре вопроса пространства: Gdzie? • Dokąd? • Skąd? • Którędy?',
            explanationRu:
              '• Gdzie? (Где? — местонахождение): Gdzie mieszkasz? W Warszawie.\n• Dokąd? (Куда? — цель движения): Dokąd idziesz tak późno? Idę do domu.\n• Skąd? (Откуда? — исходная точка): Skąd wracasz? Wracam z pracy.\n• Którędy? (Каким путём / какой дорогой?): Którędy iść na dworzec? Prosto i w prawo.',
            wrongExample: 'Gdzie idziesz? / Jaką drogą iść na dworzec?',
            correctExample: 'Dokąd idziesz? Którędy iść na dworzec?',
            translationRu: 'Куда ты идёшь? Какой дорогой идти на вокзал?',
          },
          {
            ruleTitle: '2. Вопрос о качестве (Jaki?) vs вопрос о порядке и выборе (Który?)',
            explanationRu:
              'В русском языке мы в обоих случаях говорим «Какой?», а поляки строго различают:\n• Jaki / Jaka / Jakie? — спрашивает о ПРИЗНАКЕ и КАЧЕСТВЕ («какой именно?»): Jaki jest ten dzień? (Ciepły). Jaka jest ta koszula? (Biała).\n• Który / Która / Które? — спрашивает о НОМЕРЕ, ПОРЯДКЕ или ВЫБОРЕ из известных вариантов: Która jest godzina? (Ósma). Który samochód jest lepszy — ten czy tamten? Które zadanie było proste? (Pierwsze).',
            wrongExample: 'Jaka jest teraz godzina? / Jaki to jest peron — pierwszy czy drugi?',
            correctExample: 'Która jest teraz godzina? Który to jest peron?',
            translationRu: 'Который сейчас час? Какой (который по счёту) это перрон?',
          },
          {
            ruleTitle: '3. Причина (Dlaczego? / Czemu?), цель (Po co?), цена (Ile? / Po ile?) и частица Czy',
            explanationRu:
              '• Dlaczego? (или разг. Czemu?) = Почему? (по какой причине?): Dlaczego płaczesz?\n• Po co? = Зачем? (с какой целью?): Po co on idzie do urzędu?\n• Ile? = Сколько? (Ile kosztuje ten bilet?), а Po ile? = По сколько / почём за штуку или кг (Po ile są te jabłka?).\n• Частица Czy («ли») ставится В САМОМ НАЧАЛЕ вопроса Да/Нет: „Czy to jest biblioteka?” (Это библиотека?).',
            correctExample: 'Czy może mi Pani powiedzieć, po ile są te jabłka i którędy dojdę na przystanek?',
            translationRu: 'Можете ли вы мне сказать, почём эти яблоки и какой дорогой я дойду до остановки?',
          },
        ],
        table: {
          headers: ['Падеж по-русски', 'Падеж по-польски (Przypadek)', 'Вопросы падежа', 'Пример в речи'],
          rows: [
            ['Именительный', 'Mianownik', 'Kto? Co? (Jaki? Który? Czyj?)', 'To jest nowy sąsiad i czarna kawa.'],
            ['Родительный', 'Dopełniacz', 'Kogo? Czego? (Nie ma... / Szukam...)', 'Nie mam czasu. Szukam pracy. Pięć złotych.'],
            ['Дательный', 'Celownik', 'Komu? Czemu? (Dziękuję...)', 'W czym mogę Panu / Pani pomóc?'],
            ['Винительный', 'Biernik', 'Kogo? Co? (Mam / Kupuję / Poproszę...)', 'Poproszę czarną kawę i bilet.'],
            ['Творительный', 'Narzędnik', 'Kim? Czym? (Jestem... / Jadę...)', 'Jestem programistą. Jadę ósemką.'],
            ['Предложный', 'Miejscownik', 'O kim? O czym? (Gdzie? W / Na...)', 'Mieszkam w Polsce na drugim piętrze.'],
            ['Звательный', 'Wołacz', 'O! (Обращение по имени)', 'Dzień dobry, Panie Marku! Pani Anno!'],
          ],
        },
      },
      dialogue: {
        title: 'Na przystanku i przy piekarni (На остановке и у пекарни)',
        contextRu:
          'Павел покупает кофе и выпечку в утренней пекарне, а затем спрашивает у прохожей на остановке, какой дорогой пройти к вокзалу и во сколько отходит трамвай.',
        lines: [
          {
            speaker: 'Sprzedawczyni',
            role: 'npc',
            pl: 'Dzień dobry! Co dla Pana?',
            ru: 'Добрый день! Что для вас?',
            pronunciationHint: 'джень до́-бры! цо для па́-на?',
            audioUrl: '/audio/mod-a1-02/dlg-1.mp3',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Dzień dobry! Poproszę dużą czarną kawę i dwie świeże bułki. Po ile są dzisiaj te jabłka?',
            ru: 'Добрый день! Пожалуйста, большой чёрный кофе и две свежие булочки. Почём (по сколько) сегодня эти яблоки?',
            pronunciationHint: 'по-про́-шэ ду́-жон ча́р-нон ка́-вэ и две щфе́-жэ бу́в-ки. по и́-ле сон джи́-щяй тэ я́п-ка?',
            audioUrl: '/audio/mod-a1-02/dlg-2.mp3',
            grammarNote: 'Biernik женского рода: dużą czarną kawę. Вопрос о цене за кг/шт.: Po ile są...?',
          },
          {
            speaker: 'Sprzedawczyni',
            role: 'npc',
            pl: 'Jabłka są po cztery złote za kilogram. Za kawę i bułki płaci Pan razem piętnaście złotych.',
            ru: 'Яблоки по четыре злотых за килограмм. За кофе и булочки с вас всего пятнадцать злотых.',
            pronunciationHint: 'я́п-ка сон по чтэ́-ры зво́-тэ за ки-лё-гра́м. ра́-зэм пэнт-на́-щче зво́-тых.',
            audioUrl: '/audio/mod-a1-02/dlg-3.mp3',
            grammarNote: '4 złote (после 2, 3, 4), но 15 (piętnaście) złotych!',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Proszę, oto dwadzieścia złotych. Przepraszam, czy wie Pani, którędy najszybciej dojdę na dworzec i która jest teraz godzina?',
            ru: 'Пожалуйста, вот двадцать злотых. Извините, знаете ли вы, какой дорогой я быстрее всего дойду на вокзал и который сейчас час?',
            pronunciationHint: 'кту-рэ́н-ды най-шы́п-чей до́й-дэ на дво́-жэц и кту́-ра ест тэ́-рас го-джи́-на?',
            audioUrl: '/audio/mod-a1-02/dlg-4.mp3',
            grammarNote: 'Którędy (каким путём / какой дорогой) и Która jest godzina? (Который час?).',
          },
          {
            speaker: 'Sprzedawczyni',
            role: 'npc',
            pl: 'Teraz jest ósma dziesięć. Proszę iść prosto, a z przystanku obok jedzie tramwajowa ósemka prosto pod dworzec. Oto Pana reszta — pięć złotych!',
            ru: 'Сейчас восемь десять. Идите прямо, а с остановки рядом идёт трамвай-восьмёрка прямо к вокзалу. Вот ваша сдача — пять злотых!',
            pronunciationHint: 'тэ́-рас ест у́-сма дже́-щеньчь... е́-дже трам-ва-ё́-ва у-сэ́м-ка...',
            audioUrl: '/audio/mod-a1-02/dlg-5.mp3',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-a1-02-3-1',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu:
            'Прочитайте табло на остановке: «Przystanek: Centrum 02. Linia 8 (ósemka) — kierunek: Dworzec Główny, odjazd za 5 minut. Bilet normalny: 4 złote, bilet ulgowy: 2 złote». Выберите верное утверждение:',
          grammarTag: 'Czytanie tablic informacyjnych i cen',
          explanationRu:
            'Трамвай №8 (ósemka) отправляется к Главному вокзалу через 5 минут, полный билет стоит 4 злотых (4 złote).',
          options: [
            {
              id: 'opt-1',
              text: 'Трамвай №8 («восьмёрка») идёт к Главному вокзалу через 5 минут, полный билет стоит 4 злотых.',
              isCorrect: true,
              feedbackRu: 'Верно! Вы точно прочитали номер маршрута, направление, время и цену в злотых.',
            },
            {
              id: 'opt-2',
              text: 'Трамвай №2 идёт в центр через 8 минут, билет стоит 5 злотых.',
              isCorrect: false,
              feedbackRu: 'Centrum 02 — это название остановки, а маршрут трамвая — Linia 8 (ósemka).',
            },
          ],
        },
        {
          id: 'ex-a1-02-3-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Вставьте правильные вопросительные слова из таблицы: «Куда (Dokąd) ты идёшь так поздно?» и «Какой дорогой (Którędy) идти на вокзал? Current time: Который (Która) сейчас час?»: ',
          sentenceTemplate: '{{0}} (Куда) idziesz tak późno? {{1}} (Какой дорогой) iść na dworzec i {{2}} (Которая) jest godzina?',
          grammarTag: 'Dokąd vs Którędy vs Która',
          explanationRu:
            'Dokąd? — куда (направление), Którędy? — каким путём / какой дорогой, Która (jest godzina)? — который час.',
          blanks: [
            {
              acceptedAnswers: ['Dokąd', 'dokąd'],
              baseWordHint: 'Куда (Dokąd)',
            },
            {
              acceptedAnswers: ['Którędy', 'którędy'],
              baseWordHint: 'Какой дорогой (Którędy)',
            },
            {
              acceptedAnswers: ['która', 'Która'],
              baseWordHint: 'Которая (która)',
            },
          ],
        },
        {
          id: 'ex-a1-02-3-3',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите вежливый вопрос прохожему: «Извините, какой дорогой идти на вокзал и который сейчас час?»',
          targetSentences: [
            'Przepraszam, którędy iść na dworzec i która jest teraz godzina?',
          ],
          tokens: [
            'Przepraszam,',
            'którędy',
            'iść',
            'na',
            'dworzec',
            'i',
            'która',
            'jest',
            'teraz',
            'godzina?',
            'jaka',
            'gdzie',
          ],
          grammarTag: 'Pytania o drogę i godzinę',
          explanationRu:
            'Используем którędy (каким путём) и которая по счёту — która jest teraz godzina.',
        },
        {
          id: 'ex-a1-02-3-4',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu:
            'Переведите на польский язык вопрос с вашей таблицы: «По сколько эти яблоки и чей это дом?»',
          acceptedAnswers: [
            'Po ile są te jabłka i czyj to jest dom?',
            'Po ile są te jabłka i czyj jest ten dom?',
            'Po ile są te jabłka i czyj to dom?',
          ],
          hintTokens: ['Po ile', 'są', 'te', 'jabłka', 'i', 'czyj', 'to', 'jest', 'dom'],
          grammarTag: 'Po ile + Czyj',
          explanationRu:
            '«По сколько (почём) эти яблоки?» = «Po ile są te jabłka?», «Чей это дом?» = «Czyj to jest dom? / Czyj jest ten dom?».',
        },
      ],
    },
  ],

  // ===========================================================================
  // СЛОВАРЬ МОДУЛЯ 3 (12 карточек SRS с нейроголосами)
  // ===========================================================================
  vocabulary: [
    {
      id: 'voc-a1-02-kosztowac',
      pl: 'kosztować (kosztuje, kosztują)',
      ru: 'стоить (о цене)',
      pronunciationHint: 'ко-што́-вачь (ко-шту́-е)',
      audioUrl: '/audio/mod-a1-02/voc-kosztowac.mp3',
      partOfSpeech: 'verb',
      examples: [
        {
          pl: 'Ile kosztuje ten bilet miesięczny?',
          ru: 'Сколько стоит этот проездной на месяц?',
        },
      ],
      srsPromptSentence: 'Przepraszam, ile {{0}} (стоит) ta czarna kawa?',
      srsAcceptedAnswers: ['kosztuje', 'kosztować'],
      srsBaseHint: 'kosztować (стоить)',
    },
    {
      id: 'voc-a1-02-zloty',
      pl: 'złoty (dwa złote, pięć złotych)',
      ru: 'злотый (2–4 złote, 5–20 złotych)',
      pronunciationHint: 'зво́-ты (два зво́-тэ, пеньчь зво́-тых)',
      audioUrl: '/audio/mod-a1-02/voc-zloty.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      governmentHint: '1 złoty, 2–4 złote, 5–20 złotych',
      examples: [
        {
          pl: 'Chleb kosztuje cztery złote, a kawa piętnaście złotych.',
          ru: 'Хлеб стоит четыре злотых, а кофе пятнадцать злотых.',
        },
      ],
      srsPromptSentence: 'Za zakupy płaci Pan dwadzieścia cztery {{0}} (злотых — после 4!).',
      srsAcceptedAnswers: ['złote'],
      srsBaseHint: 'złoty (после 2, 3, 4 -> złote)',
    },
    {
      id: 'voc-a1-02-pietnascie',
      pl: 'piętnaście',
      ru: 'пятнадцать (15)',
      pronunciationHint: 'пент-на́-щче',
      audioUrl: '/audio/mod-a1-02/voc-pietnascie.mp3',
      partOfSpeech: 'adj',
      falseFriendWarning: 'Пишется с носовым ę и буквой t в середине: piętnaście.',
      examples: [
        {
          pl: 'Pociąg odjeżdża za piętnaście minut.',
          ru: 'Поезд отправляется через пятнадцать минут.',
        },
      ],
      srsPromptSentence: 'Za kawę i bułkę płacę {{0}} (пятнадцать) złotych.',
      srsAcceptedAnswers: ['piętnaście'],
      srsBaseHint: '15 (пятнадцать)',
    },
    {
      id: 'voc-a1-02-czterdziesci',
      pl: 'czterdzieści',
      ru: 'сорок (40)',
      pronunciationHint: 'чтэр-дже́-щчи',
      audioUrl: '/audio/mod-a1-02/voc-czterdziesci.mp3',
      partOfSpeech: 'adj',
      falseFriendWarning: 'Не «сорок»! Образуется от cztery + dzieści = czterdzieści.',
      examples: [
        {
          pl: 'Podróż trwa czterdzieści minut.',
          ru: 'Поездка длится сорок минут.',
        },
      ],
      srsPromptSentence: 'Ten słownik kosztuje {{0}} (сорок) złotych.',
      srsAcceptedAnswers: ['czterdzieści'],
      srsBaseHint: '40 (сорок)',
    },
    {
      id: 'voc-a1-02-osiemdziesiat',
      pl: 'osiemdziesiąt',
      ru: 'восемьдесят (80)',
      pronunciationHint: 'о-щем-дже́-щёнт',
      audioUrl: '/audio/mod-a1-02/voc-osiemdziesiat.mp3',
      partOfSpeech: 'adj',
      falseFriendWarning: 'Пишется с буквой i после s (osiem + dziesiąt = osiemdziesiąt)!',
      examples: [
        {
          pl: 'Autobus numer sto osiemdziesiąt jedzie do centrum.',
          ru: 'Автобус номер 180 едет в центр.',
        },
      ],
      srsPromptSentence: 'Próg zdawalności tego testu to {{0}} (восемьдесят) procent.',
      srsAcceptedAnswers: ['osiemdziesiąt'],
      srsBaseHint: '80 (восемьдесят)',
    },
    {
      id: 'voc-a1-02-dwudziesty-pierwszy',
      pl: 'dwudziesty pierwszy',
      ru: 'двадцать первый (21-й)',
      pronunciationHint: 'дву-дже́-сты пе́рф-шы',
      audioUrl: '/audio/mod-a1-02/voc-dwudziesty-pierwszy.mp3',
      partOfSpeech: 'phrase',
      falseFriendWarning: 'В составных порядковых числительных (21–99) ОБА слова порядковые: dwudziesty pierwszy!',
      examples: [
        {
          pl: 'Dzisiaj jest dwudziesty pierwszy października.',
          ru: 'Сегодня двадцать первое октября.',
        },
      ],
      srsPromptSentence: 'Mój syn urodził się w {{0}} (двадцать первый — И.п. м.р.) dzień miesiąca: to {{0}} maja.',
      srsAcceptedAnswers: ['dwudziesty pierwszy'],
      srsBaseHint: '21-й (двадцать первый)',
    },
    {
      id: 'voc-a1-02-osemka',
      pl: 'ósemka',
      ru: 'восьмёрка (трамвай/автобус №8, квартира №8)',
      pronunciationHint: 'у-сэ́м-ка',
      audioUrl: '/audio/mod-a1-02/voc-osemka.mp3',
      partOfSpeech: 'noun',
      gender: 'f',
      examples: [
        {
          pl: 'Jadę do pracy tramwajową ósemką.',
          ru: 'Я еду на работу на трамвае-восьмёрке.',
        },
      ],
      srsPromptSentence: 'Na przystanek podjechała tramwajowa {{0}} (восьмёрка — И.п.).',
      srsAcceptedAnswers: ['ósemka'],
      srsBaseHint: 'восьмёрка (трамвай №8)',
    },
    {
      id: 'voc-a1-02-dokad',
      pl: 'dokąd',
      ru: 'куда (направление движения)',
      pronunciationHint: 'до́-конт',
      audioUrl: '/audio/mod-a1-02/voc-dokad.mp3',
      partOfSpeech: 'adv',
      falseFriendWarning: 'Не путайте Gdzie? (Где ты находишься?) и Dokąd? (Куда ты идёшь/едешь?).',
      examples: [
        {
          pl: 'Dokąd idziesz tak późno?',
          ru: 'Куда ты идёшь так поздно?',
        },
      ],
      srsPromptSentence: '{{0}} (Куда) jedzie ten pociąg z peronu drugiego?',
      srsAcceptedAnswers: ['Dokąd', 'dokąd'],
      srsBaseHint: 'куда (направление)',
    },
    {
      id: 'voc-a1-02-ktoredy',
      pl: 'którędy',
      ru: 'каким путём / какой дорогой',
      pronunciationHint: 'кту-рэ́н-ды',
      audioUrl: '/audio/mod-a1-02/voc-ktoredy.mp3',
      partOfSpeech: 'adv',
      examples: [
        {
          pl: 'Którędy iść na dworzec?',
          ru: 'Какой дорогой идти на вокзал?',
        },
      ],
      srsPromptSentence: 'Przepraszam, {{0}} (какой дорогой) dojdę do stacji metra?',
      srsAcceptedAnswers: ['którędy', 'Którędy'],
      srsBaseHint: 'какой дорогой / каким путём',
    },
    {
      id: 'voc-a1-02-po-ile',
      pl: 'po ile',
      ru: 'по сколько / почём (о цене за штуку или кг)',
      pronunciationHint: 'по и́-ле',
      audioUrl: '/audio/mod-a1-02/voc-po-ile.mp3',
      partOfSpeech: 'phrase',
      examples: [
        {
          pl: 'Po ile są te jabłka?',
          ru: 'По сколько (почём) эти яблоки?',
        },
      ],
      srsPromptSentence: 'Przepraszam, {{0}} (по сколько) są dzisiaj pomidory?',
      srsAcceptedAnswers: ['po ile', 'Po ile'],
      srsBaseHint: 'по сколько / почём',
    },
    {
      id: 'voc-a1-02-ktory',
      pl: 'który (która, które)',
      ru: 'который / какой по счёту (Która jest godzina?)',
      pronunciationHint: 'кту́-ры (кту́-ра, кту́-рэ)',
      audioUrl: '/audio/mod-a1-02/voc-ktory.mp3',
      partOfSpeech: 'adj',
      falseFriendWarning: 'О часах, номерах и выборе из вариантов всегда спрашиваем Który / Która, а НЕ Jaki!',
      examples: [
        {
          pl: 'Która jest godzina? Który samochód jest lepszy?',
          ru: 'Который час? Какой автомобиль (из этих) лучше?',
        },
      ],
      srsPromptSentence: 'Przepraszam, {{0}} (которая — ж.р.) jest teraz godzina?',
      srsAcceptedAnswers: ['która', 'Która'],
      srsBaseHint: 'который / которая (о часе)',
    },
    {
      id: 'voc-a1-02-czyj',
      pl: 'czyj (czyja, czyje)',
      ru: 'чей (чья, чьё)',
      pronunciationHint: 'чый (чы́-я, чы́-е)',
      audioUrl: '/audio/mod-a1-02/voc-czyj.mp3',
      partOfSpeech: 'adj',
      examples: [
        {
          pl: 'Czyj dom stoi nad rzeką? Czyje to dziecko?',
          ru: 'Чей дом стоит у реки? Чей это ребёнок?',
        },
      ],
      srsPromptSentence: '{{0}} (Чья — ж.р.) jest ta czarna parasolka na krześle?',
      srsAcceptedAnswers: ['Czyja', 'czyja'],
      srsBaseHint: 'чей / чья (czyja)',
    },
  ],

  // ===========================================================================
  // ПРАКТИЧЕСКАЯ МИССИЯ (КВЕСТ В ГОРОДЕ): ПЕКАРНЯ И ВОКЗАЛ PKP
  // ===========================================================================
  quest: {
    id: 'quest-a1-02',
    title: 'Миссия 3: Утренняя покупка в пекарне и путь на вокзал',
    descriptionRu:
      'Купите завтрак в польской пекарне, проверьте цену в злотых, узнайте у прохожего дорогу на вокзал и время отправления трамвая №8 (ósemka).',
    locationName: 'Piekarnia & Przystanek Dworzec Centralny',
    steps: [
      {
        id: 'q-a1-02-step-1',
        stepTitle: 'Шаг 1 из 3: Заказ в пекарне (Biernik + Почём?)',
        situationRu:
          'Вы зашли в пекарню перед работой. Продавец здоровается и спрашивает, что вы хотите заказать.',
        npcLinePl: 'Dzień dobry! Co dla Pana dzisiaj podać?',
        npcAudioUrl: '/audio/mod-a1-02/quest-npc-1.mp3',
        exercise: {
          id: 'ex-q-a1-02-1',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Ответьте продавцу: «Пожалуйста, чёрный кофе и свежую булочку. По сколько эти яблоки?»',
          targetSentences: [
            'Poproszę czarną kawę i świeżą bułkę. Po ile są te jabłka?',
          ],
          tokens: [
            'Poproszę',
            'czarną',
            'kawę',
            'i',
            'świeżą',
            'bułkę.',
            'Po',
            'ile',
            'są',
            'te',
            'jabłka?',
            'czarna',
            'kawa',
          ],
          grammarTag: 'Biernik + Po ile',
          explanationRu:
            'В Biernik женского рода прилагательные оканчиваются на -ą, а существительные на -ę: czarną kawę i świeżą bułkę.',
        },
      },
      {
        id: 'q-a1-02-step-2',
        stepTitle: 'Шаг 2 из 3: Оплата на кассе (Числительные и злотые)',
        situationRu:
          'Продавец называет итоговую сумму к оплате за кофе, булочку и яблоки.',
        npcLinePl: 'Razem płaci Pan dwadzieścia dwa złote. Płaci Pan kartą czy gotówką?',
        npcAudioUrl: '/audio/mod-a1-02/quest-npc-2.mp3',
        exercise: {
          id: 'ex-q-a1-02-2',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu:
            'Скажите: «Я плачу наличными. Вот пятьдесят (pięćdziesiąt) злотых, пожалуйста, кассовый чек (paragon)».',
          sentenceTemplate: 'Płacę gotówką. Oto {{0}} (50) złotych, poproszę {{1}} (кассовый чек).',
          grammarTag: 'Liczebnik 50 + Biernik (paragon)',
          explanationRu:
            '50 по-польски — pięćdziesiąt, а неодушевлённое существительное мужского рода paragon в Biernik не меняется.',
          blanks: [
            {
              acceptedAnswers: ['pięćdziesiąt'],
              baseWordHint: '50 (pięćdziesiąt)',
            },
            {
              acceptedAnswers: ['paragon'],
              baseWordHint: 'чек (paragon)',
            },
          ],
        },
      },
      {
        id: 'q-a1-02-step-3',
        stepTitle: 'Шаг 3 из 3: Вопрос о дороге и времени на остановке',
        situationRu:
          'Вы вышли из пекарни и спешите на поезд. Спросите у пассажира на остановке, какой дорогой идти на вокзал, который час и идёт ли сюда трамвай-восьмёрка.',
        exercise: {
          id: 'ex-q-a1-02-3',
          type: 'free_translation',
          skill: 'speaking',
          difficulty: 3,
          promptRu:
            'Скажите по-польски: «Извините, который сейчас час и какой дорогой идти на вокзал?»',
          acceptedAnswers: [
            'Przepraszam, która jest teraz godzina i którędy iść na dworzec?',
            'Przepraszam, która jest godzina i którędy iść na dworzec?',
          ],
          hintTokens: [
            'Przepraszam,',
            'która',
            'jest',
            'teraz',
            'godzina',
            'i',
            'którędy',
            'iść',
            'na',
            'dworzec?',
          ],
          grammarTag: 'Która godzina + Którędy',
          explanationRu:
            '«Который час?» = «Która jest (teraz) godzina?», «Какой дорогой идти на вокзал?» = «Którędy iść na dworzec?».',
        },
      },
    ],
  },

  // ===========================================================================
  // ИТОГОВЫЙ КОНТРОЛЬНЫЙ ТЕСТ МОДУЛЯ 3 (Порог 80%)
  // ===========================================================================
  finalTest: {
    id: 'test-a1-02',
    passingScorePercent: 80,
    exercises: [
      {
        id: 'test-a1-02-1',
        type: 'multiple_choice',
        skill: 'grammar',
        difficulty: 1,
        promptRu: 'Выберите грамматически правильный вариант сочетания числительных со словом złoty:',
        grammarTag: '1 złoty / 2-4 złote / 5+ złotych',
        explanationRu:
          'После 2, 3, 4 (включая 22, 23, 24, 34) используется złote, а после 5–20 (включая 12, 15) и десятков — złotych.',
        options: [
          {
            id: 'opt-1',
            text: 'trzy złote, piętnaście złotych, trzydzieści cztery złote',
            isCorrect: true,
            feedbackRu: 'Безупречно! 3 złote, 15 złotych, 34 złote.',
          },
          {
            id: 'opt-2',
            text: 'trzy złotych, piętnaście złote, trzydzieści cztery złotych',
            isCorrect: false,
            feedbackRu: 'Перепутаны формы złote (для 2–4) и złotych (для 5–20).',
          },
        ],
      },
      {
        id: 'test-a1-02-2',
        type: 'cloze_input',
        skill: 'writing',
        difficulty: 2,
        promptRu:
          'Напишите словами порядковое числительное «двадцать второй (22-й)» (оба слова должны быть порядковыми!):',
        sentenceTemplate: 'Dzisiaj jest {{0}} {{1}} (22-й) dzień miesiąca.',
        grammarTag: 'Liczebnik porządkowy złożony (dwudziesty drugi)',
        explanationRu:
          '22-й по-польски — dwudziesty drugi (оба слова в форме порядкового числительного).',
        blanks: [
          {
            acceptedAnswers: ['dwudziesty'],
            baseWordHint: '20-й (dwudziesty)',
          },
          {
            acceptedAnswers: ['drugi'],
            baseWordHint: '2-й (drugi)',
          },
        ],
      },
      {
        id: 'test-a1-02-3',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu:
          'Поставьте словосочетание «zielona herbata» (зелёный чай) в Винительный падеж (Biernik):',
        sentenceTemplate: 'Rano zawsze piję {{0}} {{1}}.',
        grammarTag: 'Biernik rodzaju żeńskiego (-ą, -ę)',
        explanationRu:
          'Прилагательное женского рода в Biernik получает -ą (zieloną), а существительное -ę (herbatę).',
        blanks: [
          {
            acceptedAnswers: ['zieloną'],
            baseWordHint: 'zielona',
          },
          {
            acceptedAnswers: ['herbatę'],
            baseWordHint: 'herbata',
          },
        ],
      },
      {
        id: 'test-a1-02-4',
        type: 'multiple_choice',
        skill: 'vocabulary',
        difficulty: 2,
        promptRu:
          'Какое вопросительное слово нужно выбрать, чтобы спросить: «Куда ты идёшь так поздно?» и «Зачем (с какой целью) он идёт в лес?»',
        grammarTag: 'Dokąd vs Gdzie, Po co vs Dlaczego',
        explanationRu:
          'О направлении движения («куда?») спрашиваем Dokąd?, а о цели действия («зачем?») — Po co?.',
        options: [
          {
            id: 'opt-1',
            text: 'Dokąd idziesz tak późno? / Po co on idzie do lasu?',
            isCorrect: true,
            feedbackRu: 'Точно! Dokąd (куда) и Po co (зачем) — прямые примеры из вашей таблицы.',
          },
          {
            id: 'opt-2',
            text: 'Którędy idziesz tak późno? / Kiedy on idzie do lasu?',
            isCorrect: false,
            feedbackRu: 'Którędy — это «какой дорогой», а Kiedy — «когда».',
          },
        ],
      },
      {
        id: 'test-a1-02-5',
        type: 'word_bank',
        skill: 'grammar',
        difficulty: 2,
        promptRu:
          'Соберите предложение с вопросительными словами: «Какой автомобиль лучше и чей дом стоит у реки?»',
        targetSentences: [
          'Który samochód jest lepszy i czyj dom stoi nad rzeką?',
        ],
        tokens: [
          'Który',
          'samochód',
          'jest',
          'lepszy',
          'i',
          'czyj',
          'dom',
          'stoi',
          'nad',
          'rzeką?',
          'Czego',
          'komu',
        ],
        grammarTag: 'Który + Czyj',
        explanationRu:
          'При выборе «какой из автомобилей лучше» используется Który samochód jest lepszy, а принадлежность — czyj dom.',
      },
      {
        id: 'test-a1-02-6',
        type: 'free_translation',
        skill: 'writing',
        difficulty: 3,
        promptRu:
          'Переведите на польский язык: «Встреча начинается в восемь часов (o ósmej), я еду туда на трамвае-восьмёрке (ósemką)».',
        acceptedAnswers: [
          'Spotkanie zaczyna się o ósmej, jadę tam ósemką.',
          'Spotkanie zaczyna się o godzinie ósmej, jadę tam ósemką.',
          'Spotkanie zaczyna się o ósmej, jadę tam tramwajową ósemką.',
        ],
        hintTokens: ['Spotkanie', 'zaczyna się', 'o ósmej,', 'jadę', 'tam', 'ósemką.'],
        grammarTag: 'Godziny (o ósmej) + Rzeczownik odliczebnikowy (ósemką)',
        explanationRu:
          '«В восемь часов» = «o (godzinie) ósmej», «на восьмёрке (трамвае №8)» = «ósemką» (Narzędnik от ósemka).',
      },
    ],
  },

  errorClinic: [
    {
      tag: 'ERR_FALSE_FRIEND',
      title: 'Двадцать первый = Dwudziesty pierwszy (а не dwadzieścia pierwszy!)',
      wrongPl: 'Mieszkam tu dwadzieścia pierwszy dzień.',
      correctPl: 'Mieszkam tu dwudziesty pierwszy dzień.',
      explanationRu:
        'В польских составных порядковых числительных (21–99) ОБА слова ставятся в порядковую форму и оба склоняются по падежам.',
    },
    {
      tag: 'ERR_VERB_GOV',
      title: '1 złoty • 2, 3, 4 złote • 5–20 złotych',
      wrongPl: 'Płacę cztery złotych / piętnaście złote.',
      correctPl: 'Płacę cztery złote / piętnaście złotych.',
      explanationRu:
        'После 2, 3, 4 (кроме 12, 13, 14) всегда идёт złote (tysiące), а от 5 до 20 и после круглых десятков — złotych (tysięcy).',
    },
    {
      tag: 'ERR_FALSE_FRIEND',
      title: 'Która godzina? (а не Jaka godzina!) и Dokąd idziesz?',
      wrongPl: 'Jaka jest teraz godzina? Gdzie idziesz?',
      correctPl: 'Która jest teraz godzina? Dokąd idziesz?',
      explanationRu:
        'О времени на часах и номере по порядку спрашиваем Który / Która?, а о направлении движения («куда?») — Dokąd?.',
    },
  ],
};
