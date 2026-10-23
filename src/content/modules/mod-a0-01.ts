import { CourseModule } from '@/types/curriculum';

export const MODULE_A0_01: CourseModule = {
  id: 'mod-a0-01',
  releaseNumber: 1,
  level: 'A0',
  titlePl: 'Pierwszy dzień w Polsce: Wymowa, Pan/Pani i dane osobowe',
  titleRu: 'Первый день в Польше: произношение, формула Pan/Pani и визит в ужонд',
  subtitleRu:
    'Снимаем языковой барьер: учимся читать без акцента, избегаем главных калек белоруса и подаём заявление на номер PESEL в Urząd Miasta.',
  estimatedHours: 2.5,
  learningGoalsRu: [
    'Безошибочно ставить ударение на предпоследний слог и различать твёрдые шипящие (sz, cz, rz/ż) и мягкие среднеязычные (ś, ć, ź, dź).',
    'Обращаться к незнакомым людям в Польше через конструкцию Pan / Pani / Państwo + глагол в 3-м лице (вместо ошибочного «Czy wy mówicie...»).',
    'Спрягать фундаментальные глаголы być (быть), mieć (иметь) и mieszkać (жить) в настоящем времени.',
    'Распознавать 6 опасных «ложных друзей переводчика» (sklep, jutro, tydzień, parter, pierwsze piętro, owoce).',
    'Заполнить анкету на PESEL и пройти диалог у окошка в Urząd Miasta.',
  ],
  lessons: [
    {
      id: 'les-a0-01-1',
      number: '1.1',
      titlePl: 'Kod polskiej wymowy i pułapki słowiańskie',
      titleRu: 'Код польского произношения и главные ловушки белоруса',
      estimatedMinutes: 15,
      objectivesRu: [
        'Освоить правило предпоследнего ударного слога и отсутствие «аканья».',
        'Научиться различать на слух и письме диграфы sz, cz, szcz, rz/ż и мягкие ś/si, ć/ci, dź/dzi.',
        'Обезвредить первые 5 «ложных друзей переводчика».',
      ],
      theory: {
        title: 'Три секрета польской фонетики и опасные совпадения',
        summaryRu:
          'Белорусский и польский языки очень близки (слова dom, woda, chleb, tydzień понятны сразу). Но чтобы поляки понимали вас с первого слова, нужно переключить три фонетических тумблера.',
        keyRules: [
          {
            ruleTitle: '1. Железное ударение на предпоследний слог и чёткое [O]',
            explanationRu:
              'В 98% польских слов ударение падает на предпоследний слог: War-SZA-wa, Bia-ŁO-ruś, ro-ZU-miem. Безударное «o» никогда не превращается в «а»: говорим чётко [до видзэ́нья], [по по́льску].',
            wrongExample: 'да видзенья, па-польску',
            correctExample: 'Do widzenia [до ви-дзэ́-нья], po polsku [по по́ль-ску]',
            translationRu: 'До свидания, по-польски',
          },
          {
            ruleTitle: '2. Твёрдые шипящие (sz, cz, rz/ż) против мягких (ś, ć, ź, dź)',
            explanationRu:
              'Диграфы sz [ш], cz [ч], rz/ż [ж] в польском ВСЕГДА твёрдые — даже в словах życie [жы́-че] и cześć [чэщьчь]. А буквы с чёрточкой (ś, ć, ź, dź) или с буквой i перед гласной (si, ci, zi, dzi) — наоборот, очень мягкие.',
            wrongExample: 'чьто, жытье',
            correctExample: 'Przepraszam [пшэ-пра́-шам], dzień dobry [джень до́-бры]',
            translationRu: 'Извините, добрый день',
          },
          {
            ruleTitle: '3. Ложные друзья первого дня: jutro, sklep, parter',
            explanationRu:
              'По-польски jutro — это «завтра» (а утро — rano!). Sklep — это обычный «магазин». А этажи считаются с нуля: 0 = parter (наш 1-й этаж), 1 = pierwsze piętro (наш 2-й этаж).',
            wrongExample: 'Będę jutro (= думаю, что утром)',
            correctExample: 'Będę jutro rano w sklepie na parterze.',
            translationRu: 'Буду завтра утром в магазине на первом (нулевом) этаже.',
          },
        ],
        table: {
          headers: ['Буква / Диграф', 'Как читается', 'Пример по-польски', 'Перевод'],
          rows: [
            ['sz / cz / szcz', 'твёрдые [ш] / [ч] / [шч]', 'szkoła, czas, deszcz', 'школа, время, дождь'],
            ['ś (si) / ć (ci)', 'мягкие [щь] / [чь]', 'środa, siedem, cicho', 'среда, семь, тихо'],
            ['rz / ż', 'твёрдое [ж] (после p, t, k, ch — глухое [ш])', 'morze, żona, przepraszam', 'море, жена, извините'],
            ['ł', 'краткое [ў] (как англ. w или бел. ў)', 'mały, słabo, Białoruś', 'маленький, слабо, Беларусь'],
            ['ą / ę', 'носовые [о̃] и [э̃] (на конце слова -ę -> [э])', 'mąż [мо̃ш], dziękuję, imię [и́мье]', 'муж, спасибо, имя'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a0-01-1-1',
          type: 'multiple_choice',
          skill: 'listening',
          difficulty: 1,
          promptRu:
            'Прослушайте фразу курьера и выберите точный перевод: «Będę u Pana jutro rano pod sklepem».',
          promptPl: 'Będę u Pana jutro rano pod sklepem.',
          audioUrl: '/audio/mod-a0-01/ex-kurier-jutro.mp3',
          grammarTag: 'Lexicon: False Friends (jutro/rano/sklep)',
          explanationRu:
            'В польском языке «jutro» означает «завтра», «rano» — «утром», а «sklep» — «магазин».',
          options: [
            {
              id: 'opt-1',
              text: 'Буду у вас сегодня утром возле склепа.',
              isCorrect: false,
              feedbackRu: 'Осторожно, ложные друзья! Jutro — это «завтра», а sklep — «магазин».',
            },
            {
              id: 'opt-2',
              text: 'Буду у вас завтра утром возле магазина.',
              isCorrect: true,
              feedbackRu: 'Отлично! Jutro rano = завтра утром, pod sklepem = возле магазина.',
            },
            {
              id: 'opt-3',
              text: 'Буду у вас завтра вечером на складе.',
              isCorrect: false,
              feedbackRu: 'Rano — это «утром» (вечером — wieczorem), а склад по-польски — magazyn.',
            },
          ],
        },
        {
          id: 'ex-a0-01-1-2',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu:
            'В письме из Urząd Wojewódzki написано: «Pokój nr 14, pierwsze piętro». На какой этаж вам нужно подняться по привычной нам системе счёта этажей?',
          grammarTag: 'Culture & Lexicon: parter vs piętro',
          explanationRu:
            'В Польше этаж на уровне земли называется «parter» (в лифте кнопка 0), а «pierwsze piętro» (кнопка 1) — это этаж над ним, то есть наш 2-й этаж.',
          options: [
            {
              id: 'opt-a',
              text: 'На 1-й этаж (сразу со входа с улицы).',
              isCorrect: false,
              feedbackRu: 'Этаж на уровне земли в Польше называется parter (0).',
            },
            {
              id: 'opt-b',
              text: 'На 2-й этаж (один пролёт вверх над parter).',
              isCorrect: true,
              feedbackRu: 'Верно! Parter = 0, pierwsze piętro = наш 2-й этаж.',
            },
            {
              id: 'opt-c',
              text: 'На цокольный (-1) этаж.',
              isCorrect: false,
              feedbackRu: 'Подземный этаж в Польше обозначается как poziom -1 или piwnica.',
            },
          ],
        },
        {
          id: 'ex-a0-01-1-3',
          type: 'cloze_input',
          skill: 'vocabulary',
          difficulty: 2,
          promptRu:
            'Вставьте польские слова «завтра» и «утром» в сообщение для коллеги (используйте подсказки в скобках):',
          sentenceTemplate: 'Do zobaczenia {{0}} {{1}} w pracy!',
          blanks: [
            {
              acceptedAnswers: ['jutro'],
              baseWordHint: 'завтра',
            },
            {
              acceptedAnswers: ['rano'],
              baseWordHint: 'утром',
            },
          ],
          grammarTag: 'Lexicon: jutro / rano',
          explanationRu: 'Do zobaczenia jutro rano! = До встречи завтра утром!',
          interferenceChecks: [
            {
              patternRegex: 'zavtra|zawtra|utrom',
              tag: 'ERR_FALSE_FRIEND',
              feedbackRu: 'Запомните связку: jutro = завтра, rano = утром.',
            },
          ],
        },
        {
          id: 'ex-a0-01-1-4',
          type: 'word_bank',
          skill: 'writing',
          difficulty: 2,
          promptRu: 'Соберите вежливую фразу: «Извините, я ещё слабо говорю по-польски».',
          targetSentences: [
            'Przepraszam, jeszcze słabo mówię po polsku.',
            'Przepraszam jeszcze słabo mówię po polsku.',
          ],
          tokens: ['Przepraszam,', 'jeszcze', 'słabo', 'mówię', 'po', 'polsku.', 'polski', 'wy'],
          grammarTag: 'Phrases: po polsku',
          explanationRu:
            'После глаголов mówić / rozumieć используется устойчивая форма «po polsku» (а не «po polski»).',
        },
      ],
    },
    {
      id: 'les-a0-01-2',
      number: '1.2',
      titlePl: 'Formuła grzecznościowa Pan / Pani i czasownik BYĆ',
      titleRu: 'Главная ошибка славян: почему нельзя говорить «Wy» незнакомому поляку',
      estimatedMinutes: 20,
      objectivesRu: [
        'Выучить спряжение глагола być (jestem, jesteś, jest, jesteśmy, jesteście, są).',
        'Автоматизировать обращение Pan / Pani + глагол 3-го лица ед. ч.',
        'Различать падежные формы Pan (кто?) / Pana (чей? кого?) / Panu (кому?).',
      ],
      theory: {
        title: 'Глагол BYĆ и золотое правило вежливости Pan / Pani / Państwo',
        summaryRu:
          'В русском и белорусском мы говорим незнакомому человеку «Вы говорите...» (2-е лицо мн. ч.). В польском местоимение «wy» используется ТОЛЬКО при обращении к группе друзей или детей («вы, ребята»). Обращение на «wy» к чиновнику, врачу или кассиру звучит фамильярно или как русизм.',
        keyRules: [
          {
            ruleTitle: '1. Глагол BYĆ никогда не пропускается в настоящем времени',
            explanationRu:
              'Нельзя сказать «Ja z Białorusi» или «Ja programista». В польском обязательно нужна связка: Jestem z Białorusi. При этом само местоимение «ja / ty / my» обычно опускается, так как лицо уже зашито в окончании глагола.',
            wrongExample: 'Ja z Mińska. Gdzie ty teraz?',
            correctExample: 'Jestem z Mińska. Gdzie teraz jesteś?',
            translationRu: 'Я из Минска. Где ты сейчас?',
          },
          {
            ruleTitle: '2. Вежливое обращение: Pan (мужчине), Pani (женщине) + 3-е лицо!',
            explanationRu:
              'Когда вы обращаетесь к одному незнакомому человеку на «Вы», используйте слово Pan или Pani и ставьте глагол в 3-е лицо единственного числа (как для on/ona). К паре или группе взрослых — Państwo + 3-е лицо мн. ч. (są, mają, mówią).',
            wrongExample: 'Czy wy jesteście z Polski? Czy wy macie czas?',
            correctExample: 'Czy jest Pan z Polski? Czy ma Pani czas? Czy są Państwo gotowi?',
            translationRu: 'Вы (муж.) из Польши? У Вас (жен.) есть время? Вы (группа) готовы?',
          },
          {
            ruleTitle: '3. Три важные формы слова Pan: Pan / Pana / Panu',
            explanationRu:
              'Слово Pani не меняется в большинстве падежей (To jest Pani paszport, pomogę Pani). А слово Pan меняется: кто? — Pan; чей/кого? — Pana (To jest Pana paszport); кому? — Panu (W czym mogę Panu pomóc?).',
            wrongExample: 'To jest Pan paszport. W czym mogę Pan pomóc?',
            correctExample: 'To jest Pana paszport. W czym mogę Panu pomóc?',
            translationRu: 'Это Ваш (муж.) паспорт. Чем я могу Вам (муж.) помочь?',
          },
        ],
        table: {
          headers: ['Лицо', 'Глагол BYĆ (быть)', 'Глагол MIEĆ (иметь)', 'Глагол MIESZKAĆ (жить)'],
          rows: [
            ['1 л. ед. ч. (ja)', 'jestem', 'mam', 'mieszkam'],
            ['2 л. ед. ч. (ty — другу)', 'jesteś', 'masz', 'mieszkasz'],
            ['3 л. ед. ч. (on/ona / Pan/Pani)', 'jest', 'ma', 'mieszka'],
            ['1 л. мн. ч. (my)', 'jesteśmy [йе-стэ́-шьмы]', 'mamy', 'mieszkamy'],
            ['2 л. мн. ч. (wy — друзьям)', 'jesteście', 'macie', 'mieszkacie'],
            ['3 л. мн. ч. (oni/one / Państwo)', 'są [со̃]', 'mają', 'mieszkają'],
          ],
        },
      },
      exercises: [
        {
          id: 'ex-a0-01-2-1',
          type: 'multiple_choice',
          skill: 'grammar',
          difficulty: 1,
          promptRu:
            'Вы пришли в Urząd Miasta и обращаетесь к сотруднице (женщине). Как правильно спросить: «Извините, у Вас есть минутка?»',
          grammarTag: 'Polite Form: Pan/Pani + 3rd person',
          explanationRu: 'К женщине в официальной ситуации обращаемся Pani + глагол 3-го лица ед. ч. (ma).',
          options: [
            {
              id: 'opt-1',
              text: 'Przepraszam, czy wy macie chwilę?',
              isCorrect: false,
              feedbackRu:
                'Типичная калька! «Wy macie» по-польски означает только обращение к группе людей на «ты».',
            },
            {
              id: 'opt-2',
              text: 'Przepraszam, czy ma Pani chwilę?',
              isCorrect: true,
              feedbackRu: 'Безупречно! Czy + глагол 3-го лица (ma) + Pani + chwilę.',
            },
            {
              id: 'opt-3',
              text: 'Przepraszam, czy masz Pani chwilę?',
              isCorrect: false,
              feedbackRu: 'Форма «masz» — это 2-е лицо («ты имеешь»), она не сочетается со словом Pani.',
            },
          ],
        },
        {
          id: 'ex-a0-01-2-2',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu: 'Вставьте правильные формы глагола być в настоящем времени:',
          sentenceTemplate: 'Skąd Pan {{0}}? — {{1}} z Białorusi, a moja żona i ja {{2}} teraz we Wrocławiu.',
          blanks: [
            {
              acceptedAnswers: ['jest'],
              baseWordHint: 'być (для Pan)',
            },
            {
              acceptedAnswers: ['Jestem', 'jestem'],
              baseWordHint: 'być (для ja)',
            },
            {
              acceptedAnswers: ['jesteśmy'],
              baseWordHint: 'być (для my)',
            },
          ],
          grammarTag: 'Verb: być conjugation',
          explanationRu: 'Pan jest (3 л. ед. ч.), (ja) jestem (1 л. ед. ч.), (my) jesteśmy (1 л. мн. ч.).',
          interferenceChecks: [
            {
              patternRegex: 'jesteście|jestescie',
              tag: 'ERR_POLITE_PLURAL',
              feedbackRu: 'Со словом Pan всегда используется форма 3-го лица единственного числа: jest!',
            },
          ],
        },
        {
          id: 'ex-a0-01-2-3',
          type: 'cloze_input',
          skill: 'grammar',
          difficulty: 2,
          promptRu:
            'Выберите правильную падежную форму слова Pan (Pan / Pana / Panu) при разговоре с мужчиной-клиентом:',
          sentenceTemplate: 'Dzień dobry! W czym mogę {{0}} pomóc? Czy to jest {{1}} paszport?',
          blanks: [
            {
              acceptedAnswers: ['Panu', 'panu'],
              baseWordHint: 'кому? (Pan)',
            },
            {
              acceptedAnswers: ['Pana', 'pana'],
              baseWordHint: 'чей? (Pan)',
            },
          ],
          grammarTag: 'Pronoun/Noun: Pan / Pana / Panu',
          explanationRu: 'Помочь (кому? Celownik) — Panu. Паспорт (чей? Dopełniacz) — Pana.',
          interferenceChecks: [
            {
              patternRegex: '^pan$',
              tag: 'ERR_PAN_INFLECTION',
              feedbackRu: 'Не забывайте склонять слово Pan: кому? -> Panu, чей? -> Pana.',
            },
          ],
        },
        {
          id: 'ex-a0-01-2-4',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu:
            'Переведите на польский (обращаясь к женщине): «Где Вы живёте? — Я живу в Варшаве».',
          acceptedAnswers: [
            'Gdzie Pani mieszka? Mieszkam w Warszawie.',
            'Gdzie mieszka Pani? Mieszkam w Warszawie.',
            'Gdzie Pani mieszka? Ja mieszkam w Warszawie.',
            'Gdzie mieszka Pani? Ja mieszkam w Warszawie.',
          ],
          hintTokens: ['Gdzie', 'Pani', 'mieszka', 'Mieszkam', 'w', 'Warszawie'],
          grammarTag: 'Verb: mieszkać + Pani',
          explanationRu: 'Gdzie Pani mieszka? — Mieszkam w Warszawie.',
          interferenceChecks: [
            {
              patternRegex: 'wy mieszkacie|mieszkacie',
              tag: 'ERR_POLITE_PLURAL',
              feedbackRu: 'К одной женщине обращаемся только через Pani + глагол 3-го лица: Gdzie Pani mieszka?',
            },
          ],
        },
      ],
    },
    {
      id: 'les-a0-01-3',
      number: '1.3',
      titlePl: 'W Urzędzie Miasta: Wniosek o numer PESEL i dane osobowe',
      titleRu: 'В Urząd Miasta: диалог у окошка и подача заявления на PESEL',
      estimatedMinutes: 25,
      objectivesRu: [
        'Различать конструкции Mam na imię (имя) и Nazywam się (фамилия / полное имя).',
        'Понимать на слух вопросы инспектора в ужонде.',
        'Оперировать терминами польских анкет: wniosek, imię, nazwisko, obywatelstwo, adres zamieszkania, podpis.',
      ],
      theory: {
        title: 'Как представиться и заполнить свой первый польский документ (Wniosek)',
        summaryRu:
          'В первый же месяц в Польше вы столкнётесь с бланками в Urząd Miasta, банке и поликлинике. Разберём ключевые фразы, которые звучат у каждого окошка.',
        keyRules: [
          {
            ruleTitle: '1. Mam na imię vs Nazywam się',
            explanationRu:
              'Глагол nazywać się в польском чаще всего относится к ФАМИЛИИ (nazwisko) или полному имени с фамилией. Если вы называете только своё имя, естественнее сказать: Mam na imię Paweł.',
            wrongExample: 'Jak się nazywasz? — Nazywam się Paweł (если ждут фамилию в ужонде)',
            correctExample: 'Mam na imię Paweł. Nazywam się Paweł Kowalczyk.',
            translationRu: 'Меня зовут Павел. Моё имя и фамилия — Павел Ковальчик.',
          },
          {
            ruleTitle: '2. Словарь польского бланка (Formularz / Wniosek)',
            explanationRu:
              'Imię — имя; Nazwisko — фамилия; Obywatelstwo — гражданство (białoruskie); Stan cywilny — семейное положение (żonaty/zamężna, kawaler/panna); Adres zamieszkania — адрес фактического проживания; Podpis — подпись.',
            correctExample: 'Chcę złożyć wniosek o numer PESEL. Wszystko się zgadza.',
            translationRu: 'Я хочу подать заявление на номер PESEL. Всё верно (совпадает).',
          },
        ],
      },
      dialogue: {
        title: 'Диалог в Urząd Miejski: Получение номера PESEL',
        contextRu:
          'Павел недавно переехал из Минска во Вроцлав и пришёл в городской ужонд, чтобы получить номер PESEL.',
        lines: [
          {
            speaker: 'Urzędniczka',
            role: 'npc',
            pl: 'Dzień dobry! W czym mogę Panu pomóc?',
            ru: 'Добрый день! Чем я могу Вам (муж.) помочь?',
            pronunciationHint: 'Джень до́-бры! В чым мо́-гэ па́-ну по-му́ц?',
            audioUrl: '/audio/mod-a0-01/dlg-1.mp3',
            grammarNote: 'Panu — дательный падеж (кому?) от Pan.',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Dzień dobry! Chcę złożyć wniosek o numer PESEL.',
            ru: 'Добрый день! Я хочу подать заявление на номер PESEL.',
            pronunciationHint: 'Хцэ зво́-жычь вньо́-сэк о ну́-мэр ПЭ́-СЭЛЬ.',
            audioUrl: '/audio/mod-a0-01/dlg-2.mp3',
            grammarNote: 'złożyć wniosek o + Biernik — подать заявление на что-либо.',
          },
          {
            speaker: 'Urzędniczka',
            role: 'npc',
            pl: 'Proszę bardzo. Czy ma Pan przy sobie paszport i wypełniony formularz?',
            ru: 'Пожалуйста. Есть ли у Вас с собой паспорт и заполненный бланк?',
            pronunciationHint: 'Про́-шэ ба́р-дзо. Чы ма пан пшы со́-бье па́ш-порт и вы-пэў-ньо́-ны фор-му-ля́ш?',
            audioUrl: '/audio/mod-a0-01/dlg-3.mp3',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Tak, proszę. Oto mój paszport i formularz.',
            ru: 'Да, пожалуйста. Вот мой паспорт и бланк.',
            pronunciationHint: 'Так, про́-шэ. О́-то муй па́ш-порт и фор-му-ля́ш.',
            audioUrl: '/audio/mod-a0-01/dlg-4.mp3',
          },
          {
            speaker: 'Urzędniczka',
            role: 'npc',
            pl: 'Dziękuję. Jak ma Pan na imię i skąd Pan jest?',
            ru: 'Спасибо. Как Вас зовут и откуда Вы?',
            pronunciationHint: 'Джень-ку́-йе. Як ма пан на и́-мье и сконт пан йест?',
            audioUrl: '/audio/mod-a0-01/dlg-5.mp3',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Mam na imię Paweł, nazywam się Kowalczyk. Jestem z Białorusi, ale teraz mieszkam we Wrocławiu.',
            ru: 'Меня зовут Павел, фамилия Ковальчик. Я из Беларуси, но сейчас живу во Вроцлаве.',
            pronunciationHint:
              'Мам на и́-мье Па́-вэў, на-зы́-вам ще Ко-ва́ль-чык. Йе́-стэм з Бя-ло-ру́-щи, а́-ле тэ́-раз мье́-шкам вэ Вро-цва́-вю.',
            audioUrl: '/audio/mod-a0-01/dlg-6.mp3',
          },
          {
            speaker: 'Urzędniczka',
            role: 'npc',
            pl: 'Czy to Pana aktualny numer telefonu i adres zamieszkania?',
            ru: 'Это Ваш актуальный номер телефона и адрес проживания?',
            pronunciationHint: 'Чы то па́-на ак-ту-а́ль-ны ну́-мэр тэ-ле-фо́-ну и а́-дрэс за-мье-шка́-ня?',
            audioUrl: '/audio/mod-a0-01/dlg-7.mp3',
          },
          {
            speaker: 'Paweł',
            role: 'user',
            pl: 'Tak, wszystko się zgadza.',
            ru: 'Да, всё верно (всё совпадает).',
            pronunciationHint: 'Так, фшы́-стко ще зга́-дза.',
            audioUrl: '/audio/mod-a0-01/dlg-8.mp3',
          },
          {
            speaker: 'Urzędniczka',
            role: 'npc',
            pl: 'Proszę podpisać tutaj na dole. Numer PESEL jest już gotowy. Do widzenia!',
            ru: 'Пожалуйста, подпишите здесь внизу. Номер PESEL уже готов. До свидания!',
            pronunciationHint: 'Про́-шэ пот-пи́-сачь ту́-тай на до́-ле. Ну́-мэр ПЭ́-СЭЛЬ йест юш го-то́-вы. До ви-дзэ́-нья!',
            audioUrl: '/audio/mod-a0-01/dlg-9.mp3',
          },
        ],
      },
      exercises: [
        {
          id: 'ex-a0-01-3-1',
          type: 'multiple_choice',
          skill: 'listening',
          difficulty: 1,
          promptRu:
            'Прослушайте сообщение сотрудницы ужонда: «Dzwonię z Urzędu Wojewódzkiego w sprawie Pana wniosku. Proszę jutro rano o dziewiątej przynieść oryginał paszportu». Что нужно сделать?',
          promptPl:
            'Dzwonię z Urzędu Wojewódzkiego w sprawie Pana wniosku. Proszę jutro rano o dziewiątej przynieść oryginał paszportu.',
          audioUrl: '/audio/mod-a0-01/ex-urzad-telefon.mp3',
          grammarTag: 'Listening: Urząd communication',
          explanationRu:
            'w sprawie Pana wniosku = по делу Вашего заявления; jutro rano o dziewiątej = завтра утром в 9:00; przynieść oryginał paszportu = принести оригинал паспорта.',
          options: [
            {
              id: 'opt-1',
              text: 'Принести завтра утром в 9:00 оригинал паспорта по делу заявления.',
              isCorrect: true,
              feedbackRu: 'Точно! Вы уловили все ключевые детали.',
            },
            {
              id: 'opt-2',
              text: 'Забрать сегодня утром в 9:00 новый паспорт.',
              isCorrect: false,
              feedbackRu: 'Jutro rano — это завтра утром, а przynieść — принести.',
            },
            {
              id: 'opt-3',
              text: 'Отправить копию паспорта по почте через неделю.',
              isCorrect: false,
              feedbackRu: 'Речь идёт об оригинале паспорта (oryginał paszportu) завтра в 9:00.',
            },
          ],
        },
        {
          id: 'ex-a0-01-3-2',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu: 'Соберите ключевую фразу для визита в ужонд: «Я хочу подать заявление на номер PESEL».',
          targetSentences: ['Chcę złożyć wniosek o numer PESEL.'],
          tokens: ['Chcę', 'złożyć', 'wniosek', 'o', 'numer', 'PESEL.', 'zaявление', 'na'],
          grammarTag: 'Collocation: złożyć wniosek o + B',
          explanationRu: 'Подать заявление на что-либо по-польски — złożyć wniosek o (а не «na»!).',
        },
        {
          id: 'ex-a0-01-3-3',
          type: 'cloze_input',
          skill: 'writing',
          difficulty: 2,
          promptRu: 'Заполните пропуски в ответе инспектору:',
          sentenceTemplate: 'Mam na {{0}} Paweł, {{1}} się Kowalczyk. Wszystko się {{2}}.',
          blanks: [
            {
              acceptedAnswers: ['imię'],
              baseWordHint: 'имя',
            },
            {
              acceptedAnswers: ['nazywam'],
              baseWordHint: 'nazywać (для ja)',
            },
            {
              acceptedAnswers: ['zgadza'],
              baseWordHint: 'совпадает / верно',
            },
          ],
          grammarTag: 'Phrases: dane osobowe',
          explanationRu: 'Mam na imię Paweł, nazywam się Kowalczyk. Wszystko się zgadza.',
        },
        {
          id: 'ex-a0-01-3-4',
          type: 'free_translation',
          skill: 'writing',
          difficulty: 3,
          promptRu:
            'Переведите на польский язык без подсказок: «Извините, у Вас (муж.) есть паспорт? Я из Беларуси».',
          acceptedAnswers: [
            'Przepraszam, czy ma Pan paszport? Jestem z Białorusi.',
            'Przepraszam, czy Pan ma paszport? Jestem z Białorusi.',
            'Przepraszam czy ma Pan paszport? Ja jestem z Białorusi.',
          ],
          hintTokens: ['Przepraszam,', 'czy', 'ma', 'Pan', 'paszport?', 'Jestem', 'z', 'Białorusi.'],
          grammarTag: 'Cumulative Lesson 1.3',
          explanationRu: 'Przepraszam, czy ma Pan paszport? Jestem z Białorusi.',
          interferenceChecks: [
            {
              patternRegex: 'macie|wy macie',
              tag: 'ERR_POLITE_PLURAL',
              feedbackRu: 'Ошибка вежливого обращения: используйте «czy ma Pan paszport?», а не «macie»!',
            },
            {
              patternRegex: 'ja z białorusi|ja z bialorusi',
              tag: 'ERR_MISSING_COPULA_BYC',
              feedbackRu: 'В польском нельзя опускать глагол być: обязательно «Jestem z Białorusi»!',
            },
          ],
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: 'voc-a0-01',
      pl: 'być (jestem, jesteś, jest)',
      ru: 'быть (я есть, ты есть, он/она/Pan/Pani есть)',
      pronunciationHint: 'бычь (йе́-стэм, йе́-стэщь, йест)',
      audioUrl: '/audio/mod-a0-01/voc-byc.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'Связка НЕ опускается в настоящем времени!',
      examples: [
        {
          pl: 'Jestem z Białorusi, z Mińska.',
          ru: 'Я из Беларуси, из Минска.',
        },
      ],
      srsPromptSentence: 'Cześć! (Ja) {{0}} z Białorusi, a skąd ty jesteś?',
      srsAcceptedAnswers: ['jestem', 'Jestem'],
      srsBaseHint: 'być (1 л. ед. ч.)',
    },
    {
      id: 'voc-a0-02',
      pl: 'nazywać się',
      ru: 'называться, зваться (обычно с фамилией)',
      pronunciationHint: 'на-зы́-ваць ще',
      audioUrl: '/audio/mod-a0-01/voc-nazywac-sie.mp3',
      partOfSpeech: 'verb',
      examples: [
        {
          pl: 'Nazywam się Paweł Kowalczyk.',
          ru: 'Меня зовут Павел Ковальчик.',
        },
      ],
      srsPromptSentence: 'Dzień dobry, (ja) {{0}} się Anna Nowak.',
      srsAcceptedAnswers: ['nazywam'],
      srsBaseHint: 'nazywać się (1 л. ед. ч.)',
    },
    {
      id: 'voc-a0-03',
      pl: 'mieć na imię',
      ru: 'зваться по имени',
      pronunciationHint: 'мьечь на и́-мье',
      audioUrl: '/audio/mod-a0-01/voc-miec-na-imie.mp3',
      partOfSpeech: 'phrase',
      examples: [
        {
          pl: 'Jak ma Pani na imię?',
          ru: 'Как Вас (жен.) зовут по имени?',
        },
      ],
      srsPromptSentence: 'Jak ma Pan na {{0}}?',
      srsAcceptedAnswers: ['imię'],
      srsBaseHint: 'имя',
    },
    {
      id: 'voc-a0-04',
      pl: 'wniosek',
      ru: 'заявление, анкета-запрос',
      pronunciationHint: 'вньо́-сэк',
      audioUrl: '/audio/mod-a0-01/voc-wniosek.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      governmentHint: 'złożyć wniosek o + Biernik (подать заявление на...)',
      examples: [
        {
          pl: 'Chcę złożyć wniosek o numer PESEL.',
          ru: 'Я хочу подать заявление на номер PESEL.',
        },
      ],
      srsPromptSentence: 'Chcę złożyć {{0}} o pobyt rezydenta UE.',
      srsAcceptedAnswers: ['wniosek'],
      srsBaseHint: 'заявление',
    },
    {
      id: 'voc-a0-05',
      pl: 'sklep',
      ru: 'магазин',
      pronunciationHint: 'склеп',
      audioUrl: '/audio/mod-a0-01/voc-sklep.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'Ложный друг! Sklep — это обычный магазин, а не склеп.',
      examples: [
        {
          pl: 'Ten sklep jest czynny do dwudziestej drugiej.',
          ru: 'Этот магазин открыт до 22:00.',
        },
      ],
      srsPromptSentence: 'Idę kupić chleb. Czy ten {{0}} jest jeszcze czynny?',
      srsAcceptedAnswers: ['sklep'],
      srsBaseHint: 'магазин',
    },
    {
      id: 'voc-a0-06',
      pl: 'jutro',
      ru: 'завтра',
      pronunciationHint: 'ю́-тро',
      audioUrl: '/audio/mod-a0-01/voc-jutro.mp3',
      partOfSpeech: 'adv',
      falseFriendWarning: 'Ложный друг! Jutro — это ЗАВТРА, а «утро» по-польски — rano.',
      examples: [
        {
          pl: 'Zobaczymy się jutro rano.',
          ru: 'Увидимся завтра утром.',
        },
      ],
      srsPromptSentence: 'Dziś nie mam czasu, ale {{0}} rano będę w biurze.',
      srsAcceptedAnswers: ['jutro'],
      srsBaseHint: 'завтра',
    },
    {
      id: 'voc-a0-07',
      pl: 'rano',
      ru: 'утром / утро',
      pronunciationHint: 'ра́-но',
      audioUrl: '/audio/mod-a0-01/voc-rano.mp3',
      partOfSpeech: 'adv',
      examples: [
        {
          pl: 'Codziennie rano piję kawę.',
          ru: 'Каждое утро я пью кофе.',
        },
      ],
      srsPromptSentence: 'Proszę przyjść jutro {{0}} o godzinie dziewiątej.',
      srsAcceptedAnswers: ['rano'],
      srsBaseHint: 'утром',
    },
    {
      id: 'voc-a0-08',
      pl: 'tydzień',
      ru: 'неделя',
      pronunciationHint: 'ты́-джень',
      audioUrl: '/audio/mod-a0-01/voc-tydzien.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'Совпадает с белорусским «тыдзень» (неделя)!',
      examples: [
        {
          pl: 'Jestem w Polsce już jeden tydzień.',
          ru: 'Я в Польше уже одну неделю.',
        },
      ],
      srsPromptSentence: 'Czekam na decyzję już cały {{0}}.',
      srsAcceptedAnswers: ['tydzień'],
      srsBaseHint: 'неделя',
    },
    {
      id: 'voc-a0-09',
      pl: 'parter / pierwsze piętro',
      ru: '1-й этаж (уровень земли) / 2-й этаж (над партером)',
      pronunciationHint: 'па́р-тэр / пье́р-фшэ пье́н-тро',
      audioUrl: '/audio/mod-a0-01/voc-parter.mp3',
      partOfSpeech: 'noun',
      gender: 'm',
      falseFriendWarning: 'В Польше счёт этажей начинается с 0 (parter). Pierwsze piętro — это наш 2-й этаж!',
      examples: [
        {
          pl: 'Kasa urzędu jest na parterze, a pokój nr 12 na pierwszym piętrze.',
          ru: 'Касса ужонда на 1-м (нулевом) этаже, а кабинет №12 — на 2-м этаже.',
        },
      ],
      srsPromptSentence: 'Wchodzę do budynku z ulicy — to jest {{0}} (poziom 0).',
      srsAcceptedAnswers: ['parter'],
      srsBaseHint: 'нулевой/первый этаж с земли',
    },
    {
      id: 'voc-a0-10',
      pl: 'adres zamieszkania',
      ru: 'адрес проживания',
      pronunciationHint: 'а́-дрэс за-мье-шка́-ня',
      audioUrl: '/audio/mod-a0-01/voc-adres.mp3',
      partOfSpeech: 'phrase',
      examples: [
        {
          pl: 'Proszę wpisać aktualny adres zamieszkania.',
          ru: 'Пожалуйста, впишите актуальный адрес проживания.',
        },
      ],
      srsPromptSentence: 'Czy to jest Pana aktualny adres {{0}}?',
      srsAcceptedAnswers: ['zamieszkania'],
      srsBaseHint: 'проживания',
    },
    {
      id: 'voc-a0-11',
      pl: 'zgadza się',
      ru: 'всё верно, совпадает',
      pronunciationHint: 'зга́-дза ще',
      audioUrl: '/audio/mod-a0-01/voc-zgadza-sie.mp3',
      partOfSpeech: 'phrase',
      examples: [
        {
          pl: 'Tak, wszystko się zgadza.',
          ru: 'Да, всё верно.',
        },
      ],
      srsPromptSentence: 'Tak, numer telefonu jest poprawny, wszystko się {{0}}.',
      srsAcceptedAnswers: ['zgadza'],
      srsBaseHint: 'совпадает / верно',
    },
    {
      id: 'voc-a0-12',
      pl: 'mieszkać (mieszkam, mieszka)',
      ru: 'жить, проживать',
      pronunciationHint: 'мье́-шкачь',
      audioUrl: '/audio/mod-a0-01/voc-mieszkac.mp3',
      partOfSpeech: 'verb',
      governmentHint: 'mieszkać w / we + Miejscownik (w Warszawie, we Wrocławiu)',
      examples: [
        {
          pl: 'Teraz mieszkam w Polsce.',
          ru: 'Сейчас я живу в Польше.',
        },
      ],
      srsPromptSentence: 'Gdzie Pani teraz {{0}}? — Mieszkam w Gdańsku.',
      srsAcceptedAnswers: ['mieszka'],
      srsBaseHint: 'mieszkać (для Pani)',
    },
  ],
  quest: {
    id: 'quest-a0-01',
    title: 'Миссия: Получи номер PESEL в Urząd Miasta',
    descriptionRu:
      'Вы пришли в городской ужонд. Пройдите 3 этапа: выберите правильный талон в терминале очереди, ответьте инспектору без ошибок в вежливом регистре Pan/Pani и проверьте бланк перед подписью.',
    locationName: 'Urząd Miejski — Sala Obsługi Mieszkańców (Parter)',
    steps: [
      {
        id: 'q-step-1',
        stepTitle: 'Этап 1 из 3: Терминал электронной очереди (Biletomat)',
        situationRu:
          'Вы вошли в здание ужонда на parter. Перед вами сенсорный экран билетомата с тремя кнопками. Какую кнопку нужно нажать, чтобы подать заявление на PESEL?',
        exercise: {
          id: 'ex-q-1',
          type: 'multiple_choice',
          skill: 'reading',
          difficulty: 1,
          promptRu: 'Выберите правильную кнопку на экране терминала:',
          grammarTag: 'Real-life Quest: Biletomat',
          explanationRu:
            'Ewidencja ludności i numer PESEL — отдел учёта населения и выдачи номера PESEL.',
          options: [
            {
              id: 'q1-a',
              text: '[ A ] Rejestracja pojazdów i prawa jazdy',
              isCorrect: false,
              feedbackRu: 'Это отдел регистрации автомобилей и водительских прав.',
            },
            {
              id: 'q1-b',
              text: '[ B ] Ewidencja ludności i numer PESEL — Złożenie wniosku',
              isCorrect: true,
              feedbackRu: 'Точно! Вы получили талончик B-042 и идёте к окошку №4.',
            },
            {
              id: 'q1-c',
              text: '[ C ] Urząd Stanu Cywilnego — Śluby i akty urodzenia',
              isCorrect: false,
              feedbackRu: 'Это ЗАГС (браки и свидетельства о рождении).',
            },
          ],
        },
      },
      {
        id: 'q-step-2',
        stepTitle: 'Этап 2 из 3: У окошка инспектора (Stanowisko nr 4)',
        situationRu:
          'Загорелся ваш номер B-042. Женщина-инспектор здоровается с вами и спрашивает, чем может помочь. Скажите, что вы хотите подать заявление на PESEL, и спросите, говорит ли она чуть медленнее.',
        npcLinePl: 'Dzień dobry! Zapraszam do stanowiska numer cztery. W czym mogę pomóc?',
        npcAudioUrl: '/audio/mod-a0-01/quest-npc-1.mp3',
        exercise: {
          id: 'ex-q-2',
          type: 'word_bank',
          skill: 'speaking',
          difficulty: 2,
          promptRu:
            'Соберите вашу реплику: «Добрый день! Я хочу подать заявление на номер PESEL».',
          targetSentences: ['Dzień dobry! Chcę złożyć wniosek o numer PESEL.'],
          tokens: [
            'Dzień',
            'dobry!',
            'Chcę',
            'złożyć',
            'wniosek',
            'o',
            'numer',
            'PESEL.',
            'na',
            'wy',
          ],
          grammarTag: 'Quest Dialogue: złożyć wniosek',
          explanationRu: 'Dzień dobry! Chcę złożyć wniosek o numer PESEL.',
        },
      },
      {
        id: 'q-step-3',
        stepTitle: 'Этап 3 из 3: Проверка данных и подпись',
        situationRu:
          'Инспектор проверила ваш паспорт и протягивает распечатку. Подтвердите, что это ваш актуальный адрес проживания и что всё верно.',
        npcLinePl: 'Czy to jest Pana aktualny adres zamieszkania?',
        npcAudioUrl: '/audio/mod-a0-01/dlg-7.mp3',
        exercise: {
          id: 'ex-q-3',
          type: 'cloze_input',
          skill: 'speaking',
          difficulty: 2,
          promptRu: 'Ответьте инспектору: «Да, это мой адрес проживания, всё верно (совпадает)».',
          sentenceTemplate: 'Tak, to mój adres {{0}}, wszystko się {{1}}.',
          blanks: [
            {
              acceptedAnswers: ['zamieszkania'],
              baseWordHint: 'проживания',
            },
            {
              acceptedAnswers: ['zgadza'],
              baseWordHint: 'совпадает / верно',
            },
          ],
          grammarTag: 'Quest Verification',
          explanationRu: 'Tak, to mój adres zamieszkania, wszystko się zgadza!',
        },
      },
    ],
  },
  finalTest: {
    id: 'test-a0-01',
    passingScorePercent: 80,
    exercises: [
      {
        id: 'ft-a0-01-1',
        type: 'multiple_choice',
        skill: 'grammar',
        difficulty: 1,
        promptRu: 'Как вежливо спросить мужчину-соседа: «Вы из Польши?»',
        grammarTag: 'Polite Form: Pan + 3rd person',
        explanationRu: 'С формой Pan используется глагол 3-го лица ед. ч.: Czy jest Pan z Polski?',
        options: [
          {
            id: 'ft1-a',
            text: 'Czy wy jesteście z Polski?',
            isCorrect: false,
            feedbackRu: 'Калька! Wy jesteście — это обращение только к группе друзей на «ты».',
          },
          {
            id: 'ft1-b',
            text: 'Czy jest Pan z Polski?',
            isCorrect: true,
            feedbackRu: 'Верно! Pan + jest.',
          },
          {
            id: 'ft1-c',
            text: 'Czy jesteś Pan z Polski?',
            isCorrect: false,
            feedbackRu: 'Jesteś — это форма для «ty», а не для «Pan».',
          },
        ],
      },
      {
        id: 'ft-a0-01-2',
        type: 'multiple_choice',
        skill: 'vocabulary',
        difficulty: 1,
        promptRu: 'Выберите правильный перевод фразы: «Idę jutro rano do sklepu na parterze».',
        grammarTag: 'False Friends: jutro, rano, sklep, parter',
        explanationRu: 'jutro = завтра, rano = утром, sklep = магазин, na parterze = на 1-м (нулевом) этаже.',
        options: [
          {
            id: 'ft2-a',
            text: 'Иду завтра утром в магазин на первом (нулевом) этаже.',
            isCorrect: true,
            feedbackRu: 'Отлично! Ни один ложный друг вас не запутал.',
          },
          {
            id: 'ft2-b',
            text: 'Иду сегодня утром в склеп за партой.',
            isCorrect: false,
            feedbackRu: 'Ложные друзья: jutro = завтра, sklep = магазин, parter = нулевой этаж.',
          },
          {
            id: 'ft2-c',
            text: 'Иду завтра вечером на склад на втором этаже.',
            isCorrect: false,
            feedbackRu: 'Rano = утром, sklep = магазин, parter = 1-й (нулевой) этаж.',
          },
        ],
      },
      {
        id: 'ft-a0-01-3',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu: 'Вставьте правильные формы глагола być:',
        sentenceTemplate: 'My {{0}} z Mińska, a skąd Państwo {{1}}?',
        blanks: [
          {
            acceptedAnswers: ['jesteśmy'],
            baseWordHint: 'być (для my)',
          },
          {
            acceptedAnswers: ['są'],
            baseWordHint: 'być (для Państwo)',
          },
        ],
        grammarTag: 'Verb: być plural',
        explanationRu: 'My jesteśmy, Państwo są (обращение к паре или группе лиц).',
      },
      {
        id: 'ft-a0-01-4',
        type: 'cloze_input',
        skill: 'grammar',
        difficulty: 2,
        promptRu: 'Поставьте слово Pan в нужную форму (Pan / Pana / Panu):',
        sentenceTemplate: 'Czy to jest {{0}} wniosek? Już {{1}} pomagam!',
        blanks: [
          {
            acceptedAnswers: ['Pana', 'pana'],
            baseWordHint: 'чей? (Pan)',
          },
          {
            acceptedAnswers: ['Panu', 'panu'],
            baseWordHint: 'кому? (Pan)',
          },
        ],
        grammarTag: 'Pan / Pana / Panu',
        explanationRu: 'Чей заявление? — Pana wniosek. Помогаю кому? — Panu.',
      },
      {
        id: 'ft-a0-01-5',
        type: 'word_bank',
        skill: 'writing',
        difficulty: 2,
        promptRu: 'Соберите вопрос сотрудницы ужонда: «Есть ли у Вас (жен.) с собой паспорт?»',
        targetSentences: [
          'Czy ma Pani przy sobie paszport?',
          'Czy Pani ma przy sobie paszport?',
        ],
        tokens: ['Czy', 'ma', 'Pani', 'przy', 'sobie', 'paszport?', 'macie', 'wy'],
        grammarTag: 'Polite Question with Pani',
        explanationRu: 'Czy ma Pani przy sobie paszport?',
      },
      {
        id: 'ft-a0-01-6',
        type: 'free_translation',
        skill: 'writing',
        difficulty: 3,
        promptRu: 'Переведите на польский язык: «Меня зовут Павел. Я из Беларуси и живу в Польше».',
        acceptedAnswers: [
          'Mam na imię Paweł. Jestem z Białorusi i mieszkam w Polsce.',
          'Nazywam się Paweł. Jestem z Białorusi i mieszkam w Polsce.',
          'Mam na imię Paweł. Ja jestem z Białorusi i mieszkam w Polsce.',
        ],
        hintTokens: ['Mam', 'na', 'imię', 'Paweł.', 'Jestem', 'z', 'Białorusi', 'i', 'mieszkam', 'w', 'Polsce.'],
        grammarTag: 'Self-Introduction A0',
        explanationRu: 'Mam na imię Paweł. Jestem z Białorusi i mieszkam w Polsce.',
        interferenceChecks: [
          {
            patternRegex: 'ja z białorusi|ja z bialorusi',
            tag: 'ERR_MISSING_COPULA_BYC',
            feedbackRu: 'Не пропускайте глагол-связку: Jestem z Białorusi!',
          },
        ],
      },
    ],
  },
  errorClinic: [
    {
      tag: 'ERR_POLITE_PLURAL',
      title: 'Ловушка №1: Обращение на «Wy» к одному человеку',
      wrongPl: 'Czy wy mówicie po polsku? Czy wy macie czas?',
      correctPl: 'Czy mówi Pan / Pani po polsku? Czy ma Pan / Pani czas?',
      explanationRu:
        'В польском языке «wy» обращено только к группе людей, с которыми вы на «ты». В любой официальной ситуации используйте Pan / Pani + глагол 3-го лица ед. ч.',
    },
    {
      tag: 'ERR_MISSING_COPULA_BYC',
      title: 'Ловушка №2: Пропуск глагола-связки BYĆ в настоящем времени',
      wrongPl: 'Ja z Białorusi. Gdzie ty teraz? To mój brat, on programista.',
      correctPl: 'Jestem z Białorusi. Gdzie teraz jesteś? To jest mój brat, on jest programistą.',
      explanationRu:
        'В русском и белорусском глагол «есть» в настоящем времени опускается, а в польском — никогда.',
    },
    {
      tag: 'ERR_PAN_INFLECTION',
      title: 'Ловушка №3: Неизменяемое слово Pan в косвенных падежах',
      wrongPl: 'To jest Pan dokument. Dziękuję Pan!',
      correctPl: 'To jest Pana dokument (чей?). Dziękuję Panu (кому?)!',
      explanationRu:
        'Слово Pani не меняет форму в родительном и дательном падежах (Pani dokument, dziękuję Pani), но слово Pan обязательно склоняется: Pana (чей/кого) и Panu (кому).',
    },
    {
      tag: 'ERR_FALSE_FRIEND',
      title: 'Ловушка №4: Jutro, Rano, Sklep и Parter',
      wrongPl: 'Przyjdę jutro (= утром) na pierwsze piętro (= 1-й этаж с земли).',
      correctPl: 'Przyjdę jutro rano (завтра утром) na parter (1-й этаж с земли).',
      explanationRu:
        'Запомните четвёрку первого дня: jutro = завтра, rano = утром, sklep = магазин, parter = этаж на уровне входа с улицы.',
    },
  ],
};
