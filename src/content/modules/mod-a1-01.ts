import { CourseModule } from '@/types/curriculum';

export const MODULE_A1_01: CourseModule = {
  id: 'mod-a1-01',
  releaseNumber: 2,
  level: 'A1',
  titlePl: 'Kim jesteś i skąd pochodzisz? Czas teraźniejszy i Narzędnik',
  titleRu: 'Кто ты и чем занимаешься? Настоящее время глаголов и Творительный падеж (Narzędnik)',
  subtitleRu:
    'Знакомимся с соседями и коллегами: учимся спрягать глаголы (-am/-asz, -ę/-esz, -ować -> -uję), называть свою профессию и национальность в Narzędnik и избегать ловушек со словами zawód, pensja и dywan.',
  estimatedHours: 3,
  learningGoalsRu: [
    'Свободно спрягать глаголы 1-го (-am, -asz) и 2-го (-ę, -esz) спряжений, включая важную группу глаголов на -ować (pracować -> pracuję, kupować -> kupuję).',
    'Образовывать Творительный падеж (Narzędnik: kim? czym?) для мужского и женского рода единственного числа.',
    'Понимать разницу между конструкциями «To jest programista» (Mianownik) и «On jest programistą / Jestem Białorusinem» (Narzędnik).',
    'Использовать глаголы с управлением Narzędnik: interesować się (интересоваться чем-л.) и zajmować się (заниматься чем-л.).',
    'Обезвредить ложные друзья второго модуля: zawód (профессия, не завод), pensja (зарплата, не пенсия), dywan (ковёр, не диван).',
  ],
  lessons: [
    {
      id: 'les-a1-01-1',
      number: '2.1',
      titlePl: 'Czas teraźniejszy: koniugacja -am/-asz oraz -ę/-esz (-ować -> -uję)',
      titleRu: 'Настоящее время: как работают польские глаголы и секрет суффикса -ować',
      estimatedMinutes: 20,
      objectivesRu: [
        'Освоить окончания спряжения -am/-asz (mieszkać, читać, czekać, przepraszać).',
        'Освоить спряжение -ę/-esz и превращение суффикса -ować в -uję (pracować -> pracuję, kupować -> kupuję).',
        'Обезвредить ложные друзья zawód и pensja.',
      ],
      theory: {
        title: 'Два главных двигателя настоящего времени и ловушка глаголов на -ować',
        summaryRu:
          'В польском языке окончания настоящего времени очень регулярны, но чтобы говорить бегло, нужно сразу привыкнуть к тому, как ведут себя глаголы на -ać и -ować.',
        keyRules: [
          {
            ruleTitle: '1. Спряжение -am / -asz (mieszkać, czytać, czekać, rozumieć*)',
            explanationRu:
              'У большинства глаголов на -ać отбрасываем -ć и добавляем: (ja) -m, (ty) -sz, (on/ona/Pan/Pani) — чистая основа на -a, (my) -my, (wy) -cie, (oni/Państwo) -ją. Глагол rozumieć спрягается так же через -e-: rozumiem, rozumiesz, rozumie, rozumiemy, rozumiecie, rozumieją!',
            wrongExample: 'Ja rozumię. Oni rozumią.',
            correctExample: 'Dobrze rozumiem po polsku. Państwo wszystko rozumieją.',
            translationRu: 'Я хорошо понимаю по-польски. Вы (группа) всё понимаете.',
          },
          {
            ruleTitle: '2. Глаголы на -ować: суффикс -owa- превращается в -uj-!',
            explanationRu:
              'В Польше десятки важнейших бытовых глаголов оканчиваются на -ować: pracować (работать), kupować (покупать), dziękować (благодарить), potrzebować (нуждаться), meldować się (прописываться). В настоящем времени -ować заменяется на -uję, -ujesz, -uje, -ujemy, -ujecie, -ują.',
            wrongExample: 'Ja pracowam w IT. Gdzie Pan pracowa?',
            correctExample: 'Pracuję w IT. Gdzie Pan pracuje? Dziękuję bardzo!',
            translationRu: 'Я работаю в ИТ. Где Вы работаете? Большое спасибо!',
          },
          {
            ruleTitle: '3. Осторожно, ложные друзья на работе: zawód и pensja',
            explanationRu:
              'По-польски zawód — это «профессия» (Jaki masz zawód?), а завод/фабрика — это fabryka или zakład pracy. Слово pensja означает «зарплата» (wysoka pensja), а пенсия по возрасту — emerytura!',
            wrongExample: 'Mój dziadek ma małą pensję (= думаю про пенсию) i pracuje na zawodzie.',
            correctExample: 'Mam dobry zawód i wysoką pensję, a dziadek ma emeryturę.',
            translationRu: 'У меня хорошая профессия и высокая зарплата, а у дедушки — пенсия.',
          },
        ],
        table: {
          headers: ['Лицо', 'CZYTAĆ (-am/-asz)', 'PRACOWAĆ (-uję/-ujesz)', 'ROZUMIEĆ (-em/-esz)'],
          rows: [
            ['1 л. (ja)', 'czytam', 'pracuję', 'rozumiem'],
            ['2 л. (ty)', 'czytasz', 'pracujesz', 'rozumiesz'],
            ['3 л. (on/ona / Pan/Pani)', 'czyta', 'pracuje', 'rozumie'],
            ['1 л. мн. (my)', 'czytamy', 'pracujemy', 'rozumiemy'],
            ['2 л. мн. (wy)', 'czytacie', 'pracujecie', 'rozumiecie'],
            ['3 л. мн. (oni/one / Państwo)', 'czytają', 'pracują', 'rozumieją'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-01-1-1',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu:
            'На собеседовании у вас спрашивают: «Jaki ma Pan zawód i jakiej pensji Pan oczekuje?». О чём идёт речь?',
          promptPl: 'Jaki ma Pan zawód i jakiej pensji Pan oczekuje?',
          audioUrl: '/audio/mod-a1-01/ex-zawod-pensja.mp3',
          grammarTag: 'Lexicon: False Friends (zawód / pensja)',
          explanationRu: 'В польском языке zawód = профессия, а pensja = зарплата.',
          options: [
            {
              id: 'opt-1',
              text: 'Какой у вас завод и какую пенсию вы ожидаете?',
              isCorrect: false,
              feedbackRu:
                'Ложные друзья! Завод по-польски — fabryka/zakład, а пенсия — emerytura.',
            },
            {
              id: 'opt-2',
              text: 'Какая у вас профессия и какую зарплату вы ожидаете?',
              isCorrect: true,
              feedbackRu: 'Верно! Zawód = профессия, pensja = зарплата.',
            },
            {
              id: 'opt-3',
              text: 'Какой у вас опыт и когда вы выходите на работу?',
              isCorrect: false,
              feedbackRu: 'Опыт работы по-польски — doświadczenie zawodowe.',
            },
          ],
        },
        {
          id: 'ex-a1-01-1-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Поставьте глагол pracować (работать) в правильную форму настоящего времени (помните про замену -ować -> -uj-):',
          sentenceTemplate: 'Gdzie Pani {{0}}? — (Ja) {{1}} w banku, a mój mąż i ja {{2}} w Warszawie.',
          blanks: [
            {
              acceptedAnswers: ['pracuje'],
              baseWordHint: 'pracować (для Pani)',
            },
            {
              acceptedAnswers: ['pracuję', 'Pracuję'],
              baseWordHint: 'pracować (для ja)',
            },
            {
              acceptedAnswers: ['pracujemy'],
              baseWordHint: 'pracować (для my)',
            },
          ],
          grammarTag: 'Verb: -ować conjugation',
          explanationRu: 'Pani pracuje (3 л.), ja pracuję (1 л. ед. ч.), my pracujemy (1 л. мн. ч.).',
          interferenceChecks: [
            {
              patternRegex: 'pracow',
              tag: 'ERR_VERB_GOV',
              feedbackRu:
                'В настоящем времени суффикс -owa- всегда выпадает и заменяется на -uj-: pracuję, pracujesz, pracuje!',
            },
          ],
        },
        {
          id: 'ex-a1-01-1-3',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu: 'Вставьте правильные формы глаголов rozumieć (понимать) и kupować (покупать):',
          sentenceTemplate: 'Ja już dobrze {{0}} po polsku i codziennie {{1}} świeży chleb w piekarni.',
          blanks: [
            {
              acceptedAnswers: ['rozumiem'],
              baseWordHint: 'rozumieć (для ja)',
            },
            {
              acceptedAnswers: ['kupuję'],
              baseWordHint: 'kupować (для ja)',
            },
          ],
          grammarTag: 'Verbs: rozumiem & kupuję',
          explanationRu: 'Глагол rozumieć относится к спряжению на -em/-esz (ja rozumiem), а kupować — на -uję (ja kupuję).',
        },
        {
          id: 'ex-a1-01-1-4',
          type: 'word_bank',
          skill: 'writing',
          difficulty: 2,
          promptRu: 'Соберите вежливый вопрос коллеге-мужчине: «Где Вы работаете и что покупаете?»',
          targetSentences: ['Gdzie Pan pracuje i co Pan kupuje?'],
          tokens: ['Gdzie', 'Pan', 'pracuje', 'i', 'co', 'Pan', 'kupuje?', 'pracujesz', 'pracowa'],
          grammarTag: 'Polite Questions with -ować verbs',
          explanationRu: 'С формой Pan всегда используется 3-е лицо ед. ч. на -uje: Gdzie Pan pracuje i co Pan kupuje?',
        },
      ],
    },
    {
      id: 'les-a1-01-2',
      number: '2.2',
      titlePl: 'Narzędnik (Kim jesteś? Czym się zajmujesz?) — Narodowość i zawód',
      titleRu: 'Творительный падеж (Narzędnik): называем национальность, профессию и интересы',
      estimatedMinutes: 25,
      objectivesRu: [
        'Освоить окончания Narzędnik ед. ч. для мужского рода (прил. -ym/-im, сущ. -em/-iem) и женского рода (прил. и сущ. -ą).',
        'Чётко различать «To jest lekarz» (Mianownik) и «On jest lekarzem» (Narzędnik).',
        'Строить фразы с глаголами interesować się и zajmować się + Narzędnik.',
      ],
      theory: {
        title: 'Narzędnik (Творительный падеж): почему поляки говорят «Jestem Białorusinem i programistą»',
        summaryRu:
          'В русском и белорусском мы часто используем именительный падеж после «есть/это»: «Я — белорус, я — программист». В польском языке после глагола być (jestem, jesteś, jest...) при указании профессии, национальности или социальной роли ОБЯЗАТЕЛЬНО используется Narzędnik (кем? чем?).',
        keyRules: [
          {
            ruleTitle: '1. Мужской и средний род в Narzędnik: прил. -ym (-im) + сущ. -em (-iem)',
            explanationRu:
              'Существительные мужского и среднего рода получают окончание -em (а после k, g — окончание -iem: Polak -> Polakiem): Białorusin -> Białorusinem, inżynier -> inżynierem, lekarz -> lekarzem, sąsiad -> sąsiadem. Прилагательные получают -ym (или -im после k, g и мягких): dobrym specjalistą.',
            wrongExample: 'Jestem Białorusin. Mój brat jest dobry lekarz.',
            correctExample: 'Jestem Białorusinem. Mój brat jest dobrym lekarzem.',
            translationRu: 'Я белорус. Мой брат — хороший врач.',
          },
          {
            ruleTitle: '2. Женский род (и мужские профессии на -a!) в Narzędnik: окончание -ą',
            explanationRu:
              'В женском роде и прилагательное, и существительное получают носовое окончание -ą [о̃]: Jestem Białorusinką, dobrą nauczycielką. ВНИМАНИЕ: слова мужского рода на -a (programista, kierowca, dentysta, kolega) в единственном числе склоняются как женские (-ą), но прилагательное при них остаётся мужским (-ym/-im)!',
            wrongExample: 'Jestem dobrym programistem.',
            correctExample: 'Jestem dobrym programistą. On jest nowym kierowcą.',
            translationRu: 'Я хороший программист. Он новый водитель.',
          },
          {
            ruleTitle: '3. Исключение со словом TO: «To jest dobry lekarz» (Mianownik!)',
            explanationRu:
              'Если предложение начинается с указательного слова TO (To jest...), то после него сохраняется Именительный падеж (Mianownik): «To jest nowy sąsiad» (Это новый сосед), НО «On jest nowym sąsiadem» (Он является новым соседом).',
            wrongExample: 'To jest nowym sąsiadem.',
            correctExample: 'To jest nowy sąsiad. On jest nowym sąsiadem.',
            translationRu: 'Это новый сосед. Он — новый сосед.',
          },
        ],
        table: {
          headers: ['Род / Тип слова', 'Mianownik (Kto? Co? — To jest...)', 'Narzędnik (Kim? Czym? — Jestem...)'],
          rows: [
            ['Мужской род (тв./мягк.)', 'dobry lekarz, Białorusin', 'dobrym lekarzem, Białorusinem'],
            ['Мужской род на -k / -g', 'wysoki Polak, informatyk', 'wysokim Polakiem, informatykiem'],
            ['Мужской род на -a (!)', 'dobry programista, kierowca', 'dobrym programistą, kierowcą'],
            ['Женский род', 'dobra lekarka, Białorusinka', 'dobrą lekarką, Białorusinką'],
            ['Средний род', 'nowe mieszkanie, dziecko', 'nowym mieszkaniem, dzieckiem'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a1-01-2-1',
          type: 'multiple_choice',
          skill: 'grammar',
          difficulty: 1,
          promptRu:
            'Как мужчина-программист из Беларуси правильно представится по-польски на встрече?',
          grammarTag: 'Narzędnik: Zawód na -a (programista)',
          explanationRu:
            'После jestem нужен Narzędnik: Białorusin -> Białorusinem. Слово programista оканчивается на -a, поэтому получает окончание -ą, а прилагательное мужского рода — -ym (doświadczonym programistą).',
          options: [
            {
              id: 'opt-1',
              text: 'Jestem Białorusin i doświadczony programista.',
              isCorrect: false,
              feedbackRu:
                'После глагола być (jestem) нельзя оставлять именительный падеж — нужен Narzędnik!',
            },
            {
              id: 'opt-2',
              text: 'Jestem Białorusinem i doświadczonym programistą.',
              isCorrect: true,
              feedbackRu:
                'Идеально! Białorusinem (-em) + doświadczonym (-ym) programistą (-ą, так как слово на -a).',
            },
            {
              id: 'opt-3',
              text: 'Jestem Białorusinem i doświadczonym programistem.',
              isCorrect: false,
              feedbackRu:
                'Ловушка! Слова мужского рода на -a (programista, kierowca, kolega) в ед. ч. имеют окончание -ą, а не -em.',
            },
          ],
        },
        {
          id: 'ex-a1-01-2-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Сравните конструкцию с «To jest...» (Mianownik) и «On/Ona jest...» (Narzędnik). Вставьте правильные формы:',
          sentenceTemplate: 'To jest nasz nowy {{0}}, pan Marek. On jest {{1}} {{2}}.',
          blanks: [
            {
              acceptedAnswers: ['sąsiad'],
              baseWordHint: 'sąsiad (после To jest)',
            },
            {
              acceptedAnswers: ['dobrym'],
              baseWordHint: 'dobry (Narzędnik м.р.)',
            },
            {
              acceptedAnswers: ['inżynierem'],
              baseWordHint: 'inżynier (Narzędnik м.р.)',
            },
          ],
          grammarTag: 'Contrast: To jest + Mianownik vs On jest + Narzędnik',
          explanationRu:
            'После «To jest» ставим Mianownik (nowy sąsiad), а после «On jest» — Narzędnik (dobrym inżynierem).',
        },
        {
          id: 'ex-a1-01-2-3',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Поставьте слова женского рода в Narzędnik (окончание -ą и у прилагательного, и у существительного):',
          sentenceTemplate: 'Moja żona jest {{0}} (Białorusinka) i pracuje jako księgowa — jest {{1}} {{2}} (dobra specjalistka).',
          blanks: [
            {
              acceptedAnswers: ['Białorusinką', 'białorusinką'],
              baseWordHint: 'Białorusinka',
            },
            {
              acceptedAnswers: ['dobrą'],
              baseWordHint: 'dobra',
            },
            {
              acceptedAnswers: ['specjalistką'],
              baseWordHint: 'specjalistka',
            },
          ],
          grammarTag: 'Narzędnik: Feminine -ą',
          explanationRu: 'В женском роде обе части словосочетания получают окончание -ą: Białorusinką, dobrą specjalistką.',
        },
        {
          id: 'ex-a1-01-2-4',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu:
            'Переведите на польский язык: «Кем Вы (муж.) являетесь по профессии? — Я программист».',
          acceptedAnswers: [
            'Kim Pan jest z zawodu? Jestem programistą.',
            'Kim jest Pan z zawodu? Jestem programistą.',
            'Kim Pan jest z zawodu? Ja jestem programistą.',
          ],
          hintTokens: ['Kim', 'Pan', 'jest', 'z', 'zawodu?', 'Jestem', 'programistą.'],
          grammarTag: 'Question: Kim Pan jest z zawodu?',
          explanationRu: 'По профессии по-польски — z zawodu (Kim Pan jest z zawodu? — Jestem programistą).',
          interferenceChecks: [
            {
              patternRegex: 'jestem programista$',
              tag: 'ERR_VERB_GOV',
              feedbackRu: 'Не забудьте носовое окончание Narzędnik: Jestem programistą (с буквой ą)!',
            },
            {
              patternRegex: 'jesteście|wy jesteście',
              tag: 'ERR_POLITE_PLURAL',
              feedbackRu: 'К мужчине на «Вы» обращаемся через Pan + jest: Kim Pan jest z zawodu?',
            },
          ],
        },
      ],
    },
    {
      id: 'les-a1-01-3',
      number: '2.3',
      titlePl: 'Na klatce schodowej: rozmowa z sąsiadem, dom i zainteresowania',
      titleRu: 'В подъезде: знакомство с соседом, обустройство квартиры и интересы',
      estimatedMinutes: 25,
      objectivesRu: [
        'Использовать глаголы interesować się и zajmować się с Творительным падежом (Narzędnik).',
        'Запомнить критическую пару ложных друзей в квартире: dywan (ковёр) vs kanapa / sofa (диван).',
        'Поддержать смол-ток с польским соседом по лестничной клетке (klatka schodowa).',
      ],
      theory: {
        title: 'Глаголы с управлением Narzędnik и мебель в квартире без конфузов',
        summaryRu:
          'Когда вы переезжаете в польскую квартиру и общаетесь с соседями или арендодателем, важно знать, как рассказать о своих занятиях и не перепутать диван с ковром.',
        keyRules: [
          {
            ruleTitle: '1. Czym się zajmujesz? Czym się interesujesz? (+ Narzędnik)',
            explanationRu:
              'Глаголы zajmować się (заниматься чем-л., работать в сфере) и interesować się (интересоваться чем-л.) оба относятся к группе на -ować (zajmuję się, interesuję się) и требуют после себя Narzędnik: Interesuję się sportem, historią, muzyką, językiem polskim.',
            wrongExample: 'Ja interesuję się polski język.',
            correctExample: 'Interesuję się językiem polskim i historią.',
            translationRu: 'Я интересуюсь польским языком и историей.',
          },
          {
            ruleTitle: '2. Ловушка в гостиной: DYWAN — это ковёр, а ДИВАН — это KANAPA!',
            explanationRu:
              'Если вы скажете поляку «Śpię na dywanie», он решит, что вы спите на полу на ковре! По-польски dywan — это ковёр (na podłodze leży miękki dywan), а диван для сидения и сна — это kanapa или sofa.',
            wrongExample: 'Kupuję nowy dywan do spania w salonie.',
            correctExample: 'W salonie stoi wygodna kanapa, a na podłodze leży dywan.',
            translationRu: 'В гостиной стоит удобный диван, а на полу лежит ковёр.',
          },
        ],
      },
      dialogue: {
        title: 'Диалог на лестничной клетке: Знакомство с соседом паном Мареком',
        contextRu:
          'Павел заносит коробки в новую квартиру на втором этаже (pierwsze piętro) и встречает на лестничной клетке соседа пана Марека.',
        lines: [
          {
            speaker: 'Pan Marek',
            role: 'npc',
            pl: 'Dzień dobry! Widzę, że jest Pan naszym nowym sąsiadem. Nazywam się Marek Kamiński, mieszkam obok.',
            ru: 'Добрый день! Вижу, что Вы наш новый сосед. Меня зовут Марек Каминьский, я живу рядом.',
            pronunciationHint:
              'Джень до́-бры! Ви́-дзэ, жэ йест пан на́-шым но́-вым со̃-щя́-дэм. На-зы́-вам ще Ма́-рэк Ка-ми́нь-ски, мье́-шкам о́-бок.',
            audioUrl: '/audio/mod-a1-01/dlg-1.mp3',
            grammarNote: 'jest Pan naszym nowym sąsiadem — Narzędnik после глагола być.',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Dzień dobry, Panie Marku! Bardzo mi miło. Mam na imię Paweł, jestem z Białorusi.',
            ru: 'Добрый день, пан Марек! Очень приятно. Меня зовут Павел, я из Беларуси.',
            pronunciationHint:
              'Джень до́-бры, па́-нье Ма́р-ку! Ба́р-дзо ми ми́-во. Мам на и́-мье Па́-вэў, йе́-стэм з Бя-ло-ру́-щи.',
            audioUrl: '/audio/mod-a1-01/dlg-2.mp3',
            grammarNote: 'Bardzo mi miło — Очень приятно (при знакомстве).',
          },
          {
            speaker: 'Pan Marek',
            role: 'npc',
            pl: 'Witamy we Wrocławiu! Czym się Pan zajmuje zawodowo?',
            ru: 'Добро пожаловать во Вроцлав! Чем Вы занимаетесь профессионально (кем работаете)?',
            pronunciationHint: 'Ви-та́-мы вэ Вро-цва́-вю! Чым ще пан зай-му́-йе за-во-до́-во?',
            audioUrl: '/audio/mod-a1-01/dlg-3.mp3',
            grammarNote: 'Czym się Pan zajmuje? — естественный вопрос о роде деятельности.',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Z zawodu jestem programistą. Pracuję zdalnie w polskiej firmie.',
            ru: 'По профессии я программист. Работаю удалённо в польской компании.',
            pronunciationHint: 'З за-во́-ду йе́-стэм про-гра-ми́-сто̃. Пра-цу́-йе зда́ль-нье ф по́ль-скей фи́р-мье.',
            audioUrl: '/audio/mod-a1-01/dlg-4.mp3',
            grammarNote: 'pracować zdalnie — работать удалённо.',
          },
          {
            speaker: 'Pan Marek',
            role: 'npc',
            pl: 'Świetnie! A co Pan teraz niesie? Czy to nowa kanapa?',
            ru: 'Отлично! А что Вы сейчас несёте? Это новый диван?',
            pronunciationHint: 'Щвьет-нье! А цо пан тэ́-раз нье́-ще? Чы то но́-ва ка-на́-па?',
            audioUrl: '/audio/mod-a1-01/dlg-5.mp3',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Nie, kanapa już stoi w pokoju. To jest tylko duży dywan na podłogę.',
            ru: 'Нет, диван уже стоит в комнате. Это только большой ковёр на пол.',
            pronunciationHint:
              'Нье, ка-на́-па юш сто́-и ф по-ко́-ю. То йест ты́ль-ко ду́-жы ды́-ван на под-во́-гэ.',
            audioUrl: '/audio/mod-a1-01/dlg-6.mp3',
          },
          {
            speaker: 'Pan Marek',
            role: 'npc',
            pl: 'Rozumiem! Gdyby potrzebował Pan pomocy, proszę śmiało pukać.',
            ru: 'Понимаю! Если Вам понадобится помощь, смело стучитесь.',
            pronunciationHint: 'Ро-зу́-мьем! Гды́-бы по-тшэ-бо́-ваў пан по-мо́-цы, про́-шэ щмя́-во пу́-качь.',
            audioUrl: '/audio/mod-a1-01/dlg-7.mp3',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-a1-01-3-1',
          type: 'multiple_choice',
          skill: 'listening',
          difficulty: 1,
          promptRu:
            'Прослушайте фразу арендодателя: «W dużym pokoju stoi nowa kanapa, a na podłodze leży szary dywan». Что находится в большой комнате?',
          promptPl: 'W dużym pokoju stoi nowa kanapa, a na podłodze leży szary dywan.',
          audioUrl: '/audio/mod-a1-01/ex-kanapa-dywan.mp3',
          grammarTag: 'Lexicon: False Friends (kanapa vs dywan)',
          explanationRu: 'В польском языке kanapa = диван, а dywan = ковёр (лежит на полу — na podłodze).',
          options: [
            {
              id: 'opt-1',
              text: 'В большой комнате стоит новый диван, а на полу лежит серый ковёр.',
              isCorrect: true,
              feedbackRu: 'Верно! Kanapa — это диван, а dywan — ковёр.',
            },
            {
              id: 'opt-2',
              text: 'В большой комнате стоит новое канапе, а на полу стоит серый диван.',
              isCorrect: false,
              feedbackRu: 'Ложный друг! Dywan по-польски — это ковёр, а диван — kanapa.',
            },
            {
              id: 'opt-3',
              text: 'В спальне стоит шкаф и висит зеркало.',
              isCorrect: false,
              feedbackRu: 'Шкаф — szafa, зеркало — lustro.',
            },
          ],
        },
        {
          id: 'ex-a1-01-3-1b',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu:
            'Прочитайте объявление в подъезде (Tablica ogłoszeń): «Szanowni Mieszkańcy! Administrator budynku przyjmuje w środy od 10:00 do 14:00 w pokoju na parterze. Nowy konserwator, pan Piotr, jest elektrykiem i hydraulikiem». Кем работает пан Пётр?',
          grammarTag: 'Reading: Ogłoszenie na klatce schodowej',
          explanationRu:
            'Pan Piotr jest elektrykiem i hydraulikiem — пан Пётр работает электриком и сантехником (формы Narzędnik от elektryk и hydraulik).',
          options: [
            {
              id: 'opt-r1',
              text: 'Он электрик и сантехник.',
              isCorrect: true,
              feedbackRu: 'Верно! Elektrykiem i hydraulikiem — Творительный падеж (Narzędnik).',
            },
            {
              id: 'opt-r2',
              text: 'Он программист и бухгалтер.',
              isCorrect: false,
              feedbackRu: 'Программист — programista, бухгалтер — księgowy.',
            },
            {
              id: 'opt-r3',
              text: 'Он врач и учитель.',
              isCorrect: false,
              feedbackRu: 'Врач — lekarz, учитель — nauczyciel.',
            },
          ],
        },
        {
          id: 'ex-a1-01-3-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Дополните рассказ о своих увлечениях, поставив глагол interesować się в 1-е лицо, а существительные — в Narzędnik:',
          sentenceTemplate: 'W wolnym czasie (ja) {{0}} się {{1}} (sport) i {{2}} (muzyka).',
          blanks: [
            {
              acceptedAnswers: ['interesuję'],
              baseWordHint: 'interesować (для ja)',
            },
            {
              acceptedAnswers: ['sportem'],
              baseWordHint: 'sport (Narzędnik м.р.)',
            },
            {
              acceptedAnswers: ['muzyką'],
              baseWordHint: 'muzyka (Narzędnik ж.р.)',
            },
          ],
          grammarTag: 'Verb Government: interesować się + Narzędnik',
          explanationRu: 'Interesuję się (-ować -> -uję) + sportem (м.р. -em) i muzyką (ж.р. -ą).',
        },
        {
          id: 'ex-a1-01-3-3',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите реплику из диалога с соседом: «По профессии я программист. Работаю удалённо».',
          targetSentences: ['Z zawodu jestem programistą. Pracuję zdalnie.'],
          tokens: [
            'Z',
            'zawodu',
            'jestem',
            'programistą.',
            'Pracuję',
            'zdalnie.',
            'programista',
            'Pracowam',
          ],
          grammarTag: 'Self-presentation: Z zawodu jestem...',
          explanationRu: 'Z zawodu jestem programistą. Pracuję zdalnie.',
        },
        {
          id: 'ex-a1-01-3-4',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu: 'Переведите на польский язык: «Вы (муж.) наш новый сосед».',
          acceptedAnswers: [
            'Jest Pan naszym nowym sąsiadem.',
            'Pan jest naszym nowym sąsiadem.',
          ],
          hintTokens: ['Jest', 'Pan', 'naszym', 'nowym', 'sąsiadem.'],
          grammarTag: 'Narzędnik with Pan',
          explanationRu: 'Jest Pan (или Pan jest) naszym nowym sąsiadem.',
          interferenceChecks: [
            {
              patternRegex: 'nowy sąsiad|nowy sasiad',
              tag: 'ERR_VERB_GOV',
              feedbackRu: 'После глагола być (Jest Pan...) обязательно используется Narzędnik: naszym nowym sąsiadem!',
            },
          ],
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: 'voc-a1-01',
      pl: 'pracować (pracuję, pracuje)',
      ru: 'работать (работаю, работает)',
      pronunciationHint: 'пра-цо́-вачь (пра-цу́-йе)',
      audioUrl: '/audio/mod-a1-01/voc-pracowac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'Суффикс -ować в настоящем времени меняется на -uję, -ujesz, -uje!',
      examples: [
        {
          pl: 'Pracuję zdalnie w polskiej firmie.',
          ru: 'Я работаю удалённо в польской компании.',
        },
      ],
      srsPromptSentence: 'Gdzie Pan teraz {{0}}? — Pracuję we Wrocławiu.',
      srsAcceptedAnswers: ['pracuje'],
      srsBaseHint: 'pracować (для Pan)',
    },
    {
      id: 'voc-a1-02',
      pl: 'rozumieć (rozumiem, rozumieją)',
      ru: 'понимать (понимаю, понимают)',
      pronunciationHint: 'ро-зу́-мьечь (ро-зу́-мьем)',
      audioUrl: '/audio/mod-a1-01/voc-rozumiec.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'Спряжение на -em, -esz, -e, -emy, -ecie, -eją!',
      examples: [
        {
          pl: 'Przepraszam, jeszcze nie wszystko rozumiem.',
          ru: 'Извините, я ещё не всё понимаю.',
        },
      ],
      srsPromptSentence: 'Tak, teraz już dobrze {{0}} po polsku.',
      srsAcceptedAnswers: ['rozumiem'],
      srsBaseHint: 'rozumieć (для ja)',
    },
    {
      id: 'voc-a1-03',
      pl: 'kupować (kupuję, kupuje)',
      ru: 'покупать (покупаю, покупает)',
      pronunciationHint: 'ку-по́-вачь (ку-пу́-йе)',
      audioUrl: '/audio/mod-a1-01/voc-kupowac.mp3',
      partOfSpeech: 'verb',
      examples: [
        {
          pl: 'Codziennie rano kupuję świeży chleb.',
          ru: 'Каждое утро я покупаю свежий хлеб.',
        },
      ],
      srsPromptSentence: 'Co Pani dzisiaj {{0}} w tym sklepie?',
      srsAcceptedAnswers: ['kupuje'],
      srsBaseHint: 'kupować (для Pani)',
    },
    {
      id: 'voc-a1-04',
      pl: 'Białorusin / Białorusinka',
      ru: 'белорус / белоруска',
      pronunciationHint: 'бя-ло-ру́-щин / бя-ло-ру-щи́н-ка',
      audioUrl: '/audio/mod-a1-01/voc-bialorusin.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      governmentHint: 'В Narzędnik: Jestem Białorusinem / Jestem Białorusinką (с большой буквы!).',
      examples: [
        {
          pl: 'Jestem Białorusinem, a moja żona jest Białorusinką.',
          ru: 'Я белорус, а моя жена — белоруска.',
        },
      ],
      srsPromptSentence: 'Pochodzę z Mińska, jestem {{0}} (муж. род).',
      srsAcceptedAnswers: ['Białorusinem', 'białorusinem'],
      srsBaseHint: 'Białorusin (в Narzędnik)',
    },
    {
      id: 'voc-a1-05',
      pl: 'programista',
      ru: 'программист',
      pronunciationHint: 'про-гра-ми́-ста',
      audioUrl: '/audio/mod-a1-01/voc-programista.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      governmentHint: 'Слово мужского рода на -a! В Narzędnik: jestem dobrym programistą.',
      examples: [
        {
          pl: 'Z zawodu jestem programistą.',
          ru: 'По профессии я программист.',
        },
      ],
      srsPromptSentence: 'Mój brat pracuje w IT — jest dobrym {{0}}.',
      srsAcceptedAnswers: ['programistą'],
      srsBaseHint: 'programista (в Narzędnik)',
    },
    {
      id: 'voc-a1-06',
      pl: 'sąsiad / sąsiadka',
      ru: 'сосед / соседка',
      pronunciationHint: 'со̃́-щят / со̃-щя́т-ка',
      audioUrl: '/audio/mod-a1-01/voc-sasiad.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      examples: [
        {
          pl: 'Pan Marek jest naszym nowym sąsiadem.',
          ru: 'Пан Марек — наш новый сосед.',
        },
      ],
      srsPromptSentence: 'Dzień dobry! Jestem Pana nowym {{0}} z pierwszego piętra.',
      srsAcceptedAnswers: ['sąsiadem'],
      srsBaseHint: 'sąsiad (в Narzędnik)',
    },
    {
      id: 'voc-a1-07',
      pl: 'zawód (z zawodu)',
      ru: 'профессия (по профессии)',
      pronunciationHint: 'за́-вут (з за-во́-ду)',
      audioUrl: '/audio/mod-a1-01/voc-zawod.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'Ложный друг! Zawód — это ПРОФЕССИЯ, а завод/фабрика — fabryka / zakład.',
      examples: [
        {
          pl: 'Kim jest Pani z zawodu?',
          ru: 'Кто Вы по профессии?',
        },
      ],
      srsPromptSentence: 'Jaki ma Pan {{0}}? — Jestem inżynierem.',
      srsAcceptedAnswers: ['zawód'],
      srsBaseHint: 'профессия',
    },
    {
      id: 'voc-a1-08',
      pl: 'pensja',
      ru: 'зарплата (оклад)',
      pronunciationHint: 'пэ́н-сья',
      audioUrl: '/audio/mod-a1-01/voc-pensja.mp3',
      partOfSpeech: 'noun',
      gender: 'f',
      falseFriendWarning: 'Ложный друг! Pensja — это ЗАРПЛАТА, а пенсия — emerytura.',
      examples: [
        {
          pl: 'W tej firmie jest wysoka pensja.',
          ru: 'В этой компании высокая зарплата.',
        },
      ],
      srsPromptSentence: 'Nowa praca jest ciekawa i {{0}} (зарплата в Mianownik) jest wysoka.',
      srsAcceptedAnswers: ['pensja'],
      srsBaseHint: 'зарплата',
    },
    {
      id: 'voc-a1-09',
      pl: 'dywan',
      ru: 'ковёр',
      pronunciationHint: 'ды́-ван',
      audioUrl: '/audio/mod-a1-01/voc-dywan.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'Ложный друг! Dywan — это КОВЁР на полу, а диван — kanapa / sofa.',
      examples: [
        {
          pl: 'Na podłodze w pokoju leży miękki dywan.',
          ru: 'На полу в комнате лежит мягкий ковёр.',
        },
      ],
      srsPromptSentence: 'Na podłodze w salonie leży nowy {{0}} (ковёр).',
      srsAcceptedAnswers: ['dywan'],
      srsBaseHint: 'ковёр',
    },
    {
      id: 'voc-a1-10',
      pl: 'kanapa',
      ru: 'диван',
      pronunciationHint: 'ка-на́-па',
      audioUrl: '/audio/mod-a1-01/voc-kanapa.mp3',
      partOfSpeech: 'noun',
      gender: 'f',
      examples: [
        {
          pl: 'W salonie stoi wygodna kanapa.',
          ru: 'В гостиной стоит удобный диван.',
        },
      ],
      srsPromptSentence: 'W dużym pokoju stoi nowa wygodna {{0}} (диван).',
      srsAcceptedAnswers: ['kanapa'],
      srsBaseHint: 'диван',
    },
    {
      id: 'voc-a1-11',
      pl: 'interesować się (+ Narzędnik)',
      ru: 'интересоваться (чем-либо)',
      pronunciationHint: 'ин-тэ-рэ-со́-ваць ще',
      audioUrl: '/audio/mod-a1-01/voc-interesowac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'interesować się + Narzędnik (sportem, muzyką, historią)',
      examples: [
        {
          pl: 'Interesuję się sportem i muzyką.',
          ru: 'Я интересуюсь спортом и музыкой.',
        },
      ],
      srsPromptSentence: 'Czym się Pan {{0}} w wolnym czasie?',
      srsAcceptedAnswers: ['interesuje'],
      srsBaseHint: 'interesować (для Pan)',
    },
    {
      id: 'voc-a1-12',
      pl: 'zajmować się (+ Narzędnik)',
      ru: 'заниматься (чем-либо)',
      pronunciationHint: 'зай-мо́-ваць ще',
      audioUrl: '/audio/mod-a1-01/voc-zajmowac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'Czym się Pan/Pani zajmuje? — Чем Вы занимаетесь?',
      examples: [
        {
          pl: 'Czym się Pani zajmuje zawodowo?',
          ru: 'Чем Вы занимаетесь профессионально?',
        },
      ],
      srsPromptSentence: 'Czym się Państwo {{0}} w tej firmie?',
      srsAcceptedAnswers: ['zajmują'],
      srsBaseHint: 'zajmować (для Państwo)',
    },
  ],
  quest: {
    id: 'quest-a1-01',
    title: 'Миссия: Знакомство с домоуправлением (Wspólnota Mieszkaniowa) и соседом',
    descriptionRu:
      'Вы въехали в дом. Познакомьтесь с соседкой пани Анной, расскажите, кто вы по профессии, и объясните курьеру мебельного магазина, куда занести диван и ковёр.',
    locationName: 'Klatka schodowa — Pierwsze piętro',
    steps: [
      {
        id: 'q-a1-step-1',
        stepTitle: 'Этап 1 из 3: Встреча со старшей по подъезду пани Анной',
        situationRu:
          'Пани Анна здоровается с вами на лестничной клетке и спрашивает, вы ли новый сосед из квартиры №8. Ответьте вежливо, используя Narzędnik.',
        npcLinePl: 'Dzień dobry! Czy to Pan jest nowym lokatorem spod ósemki?',
        npcAudioUrl: '/audio/mod-a1-01/quest-npc-1.mp3',
        exercise: {
          id: 'ex-qa1-1',
          type: 'cloze_input',
          skill: 'speaking',
          difficulty: 2,
          promptRu: 'Ответьте пани Анне: «Да, я ваш новый сосед. Я белорус».',
          sentenceTemplate: 'Tak, jestem Pani nowym {{0}}. Jestem {{1}}.',
          blanks: [
            {
              acceptedAnswers: ['sąsiadem'],
              baseWordHint: 'sąsiad (Narzędnik)',
            },
            {
              acceptedAnswers: ['Białorusinem', 'białorusinem'],
              baseWordHint: 'Białorusin (Narzędnik)',
            },
          ],
          grammarTag: 'Quest: Narzędnik presentation',
          explanationRu: 'Tak, jestem Pani nowym sąsiadem. Jestem Białorusinem.',
        },
      },
      {
        id: 'q-a1-step-2',
        stepTitle: 'Этап 2 из 3: Вопрос о работе',
        situationRu:
          'Пани Анна спрашивает, чем вы занимаетесь профессионально и где работаете.',
        npcLinePl: 'Bardzo mi miło! A czym się Pan zajmuje zawodowo i gdzie Pan pracuje?',
        npcAudioUrl: '/audio/mod-a1-01/quest-npc-2.mp3',
        exercise: {
          id: 'ex-qa1-2',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите ответ: «По профессии я программист и работаю удалённо в доме».',
          targetSentences: ['Z zawodu jestem programistą i pracuję zdalnie w domu.'],
          tokens: [
            'Z',
            'zawodu',
            'jestem',
            'programistą',
            'i',
            'pracuję',
            'zdalnie',
            'w',
            'domu.',
            'programista',
            'pracowam',
          ],
          grammarTag: 'Quest: Job & -ować verb',
          explanationRu: 'Z zawodu jestem programistą i pracuję zdalnie w domu.',
        },
      },
      {
        id: 'q-a1-step-3',
        stepTitle: 'Этап 3 из 3: Доставка мебели без конфуза с «диваном»',
        situationRu:
          'Поднимается курьер из ИКЕА. Чтобы он не перепутал коробки, выберите единственную фразу, где правильно названы ДИВАН и КОВЁР.',
        exercise: {
          id: 'ex-qa1-3',
          type: 'multiple_choice',
          skill: 'speaking',
          difficulty: 1,
          promptRu: 'Как правильно сказать курьеру: «Диван стоит здесь, а ковёр лежит на полу»?',
          grammarTag: 'Quest: kanapa vs dywan',
          explanationRu: 'Kanapa = диван, dywan = ковёр.',
          options: [
            {
              id: 'qa3-a',
              text: 'Kanapa stoi tutaj, a dywan leży na podłodze.',
              isCorrect: true,
              feedbackRu: 'Отлично! Курьер всё понял правильно.',
            },
            {
              id: 'qa3-b',
              text: 'Dywan stoi tutaj, a kowior leży na podłodze.',
              isCorrect: false,
              feedbackRu: 'Осторожно: dywan по-польски — это ковёр!',
            },
            {
              id: 'qa3-c',
              text: 'Pensja stoi tutaj, a zawód leży na podłodze.',
              isCorrect: false,
              feedbackRu: 'Pensja — зарплата, zawód — профессия.',
            },
          ],
        },
      },
    ],
  },
  finalTest: {
    id: 'test-a1-01',
    passingScorePercent: 80,
    exercises: [
      {
        id: 'ft-a1-01-1',
        type: 'multiple_choice',
        skill: 'grammar',
        difficulty: 1,
        promptRu: 'Выберите предложение без грамматических ошибок:',
        grammarTag: 'Narzędnik vs Mianownik',
        explanationRu:
          'После «To jest...» используется Mianownik (dobry lekarz), а после «On jest...» — Narzędnik (dobrym lekarzem).',
        options: [
          {
            id: 'fta1-1',
            text: 'To jest dobry lekarz. On jest dobrym specjalistą.',
            isCorrect: true,
            feedbackRu: 'Верно! To jest + Mianownik, On jest + Narzędnik.',
          },
          {
            id: 'fta1-2',
            text: 'To jest dobrym lekarzem. On jest dobry specjalista.',
            isCorrect: false,
            feedbackRu: 'Перепутаны падежи после «To jest» и «On jest».',
          },
          {
            id: 'fta1-3',
            text: 'To jest dobry lekarz. On jest dobrym specjalistem.',
            isCorrect: false,
            feedbackRu: 'Слово specjalista оканчивается на -a, поэтому в Narzędnik имеет форму specjalistą.',
          },
        ],
      },
      {
        id: 'ft-a1-01-2',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu: 'Поставьте глаголы pracować, kupować и rozumieć в нужную форму:',
        sentenceTemplate: '(Ja) {{0}} w polskiej firmie, dobrze {{1}} kolegów i często {{2}} książki po polsku.',
        blanks: [
          {
            acceptedAnswers: ['Pracuję', 'pracuję'],
            baseWordHint: 'pracować (ja)',
          },
          {
            acceptedAnswers: ['rozumiem'],
            baseWordHint: 'rozumieć (ja)',
          },
          {
            acceptedAnswers: ['kupuję'],
            baseWordHint: 'kupować (ja)',
          },
        ],
        grammarTag: 'Present Tense Conjugation',
        explanationRu: 'Ja pracuję (-ować -> -uję), rozumiem (-em), kupuję (-ować -> -uję).',
      },
      {
        id: 'ft-a1-01-3',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu: 'Поставьте слова в скобках в Narzędnik (кем? чем?):',
        sentenceTemplate: 'Jestem {{0}} (Białorusin), a moja siostra jest {{1}} {{2}} (dobra nauczycielka).',
        blanks: [
          {
            acceptedAnswers: ['Białorusinem', 'białorusinem'],
            baseWordHint: 'Białorusin',
          },
          {
            acceptedAnswers: ['dobrą'],
            baseWordHint: 'dobra',
          },
          {
            acceptedAnswers: ['nauczycielką'],
            baseWordHint: 'nauczycielka',
          },
        ],
        grammarTag: 'Narzędnik Masculine & Feminine',
        explanationRu: 'Białorusinem (м.р. -em), dobrą nauczycielką (ж.р. -ą).',
      },
      {
        id: 'ft-a1-01-4',
        type: 'multiple_choice',
        skill: 'vocabulary',
        difficulty: 1,
        promptRu: 'Переведите: «У него хорошая профессия и высокая зарплата».',
        grammarTag: 'False Friends: zawód & pensja',
        explanationRu: 'Профессия = zawód, зарплата = pensja.',
        options: [
          {
            id: 'fta4-1',
            text: 'On ma dobry zawód i wysoką pensję.',
            isCorrect: true,
            feedbackRu: 'Точно! Zawód = профессия, pensja = зарплата.',
          },
          {
            id: 'fta4-2',
            text: 'On ma dobrą fabrykę i wysoką emeryturę.',
            isCorrect: false,
            feedbackRu: 'Fabryka — это завод, а emerytura — пенсия.',
          },
          {
            id: 'fta4-3',
            text: 'On ma nowy dywan i wygodną kanapę.',
            isCorrect: false,
            feedbackRu: 'Это «новый ковёр и удобный диван».',
          },
        ],
      },
      {
        id: 'ft-a1-01-5',
        type: 'word_bank',
        skill: 'writing',
        difficulty: 2,
        promptRu: 'Соберите вопрос: «Чем Вы (жен.) занимаетесь профессионально?»',
        targetSentences: [
          'Czym się Pani zajmuje zawodowo?',
          'Czym Pani się zajmuje zawodowo?',
        ],
        tokens: ['Czym', 'się', 'Pani', 'zajmuje', 'zawodowo?', 'zajmujesz', 'wy'],
        grammarTag: 'Question: Czym się Pani zajmuje?',
        explanationRu: 'Czym się Pani zajmuje zawodowo?',
      },
      {
        id: 'ft-a1-01-6',
        type: 'free_translation',
        skill: 'writing',
        difficulty: 3,
        promptRu:
          'Переведите на польский язык: «По профессии я программист и работаю в Польше».',
        acceptedAnswers: [
          'Z zawodu jestem programistą i pracuję w Polsce.',
          'Jestem z zawodu programistą i pracuję w Polsce.',
        ],
        hintTokens: ['Z', 'zawodu', 'jestem', 'programistą', 'i', 'pracuję', 'w', 'Polsce.'],
        grammarTag: 'Cumulative A1.1 Production',
        explanationRu: 'Z zawodu jestem programistą i pracuję w Polsce.',
        interferenceChecks: [
          {
            patternRegex: 'pracowam',
            tag: 'ERR_VERB_GOV',
            feedbackRu: 'В глаголе pracować суффикс -owa- меняется на -uj-: pracuję!',
          },
          {
            patternRegex: 'jestem programista ',
            tag: 'ERR_VERB_GOV',
            feedbackRu: 'После jestem нужен Narzędnik с носовой буквой ą: jestem programistą!',
          },
        ],
      },
    ],
  },
  errorClinic: [
    {
      tag: 'ERR_VERB_GOV',
      title: 'Ловушка №1: Сохранение суффикса -owa- в настоящем времени',
      wrongPl: 'Ja pracowam w Warszawie i kupowam chleb.',
      correctPl: 'Ja pracuję w Warszawie i kupuję chleb.',
      explanationRu:
        'Во всех глаголах на -ować (pracować, kupować, dziękować, interesować się, zajmować się, meldować się) суффикс -owa- в настоящем времени заменяется на -uj-.',
    },
    {
      tag: 'ERR_VERB_GOV',
      title: 'Ловушка №2: Именительный падеж вместо Narzędnik после глагола BYĆ',
      wrongPl: 'Jestem Białorusin. On jest dobry lekarz.',
      correctPl: 'Jestem Białorusinem. On jest dobrym lekarzem.',
      explanationRu:
        'После форм глагола być (jestem, jesteś, jest...) профессия и национальность всегда ставятся в Narzędnik. Именительный падеж остаётся только после связки «To jest...» (To jest dobry lekarz).',
    },
    {
      tag: 'ERR_VERB_GOV',
      title: 'Ловушка №3: Мужские профессии на -a (programista, kierowca, dentysta)',
      wrongPl: 'Jestem dobrym programistem i nowym kierowcem.',
      correctPl: 'Jestem dobrym programistą i nowym kierowcą.',
      explanationRu:
        'Существительные мужского рода на -a в единственном числе склоняются по женскому типу (в Narzędnik окончание -ą), но прилагательное перед ними сохраняет мужское окончание -ym/-im!',
    },
    {
      tag: 'ERR_FALSE_FRIEND',
      title: 'Ловушка №4: Zawód, Pensja, Dywan и Kanapa',
      wrongPl: 'Śpię na dywanie (= думаю про диван), czekam na pensję dziadka (= пенсию).',
      correctPl: 'Śpię na kanapie (диване), na podłodze leży dywan (ковёр). Mam dobry zawód (профессию) i pensję (зарплату).',
      explanationRu:
        'Четыре опасных ложных друга уровня A1: zawód = профессия, pensja = зарплата, dywan = ковёр, kanapa = диван.',
    },
  ],
};
