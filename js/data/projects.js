export const projects = [
  {
    id: "siyanie-yugra",
    level: "LEVEL 1 · MOBILE",
    platform: "mobile",
    name: "Сияние Югры",
    short: "Шанс увидеть северное сияние сегодня ночью",
    about:
      "Приложение для тех, кто хочет увидеть северное сияние в Югре, но не знает, когда выходить на улицу. " +
      "Оно сводит активность Солнца, облака, темноту и Луну в один понятный процент и подсказывает лучшее время.",
    features: [
      "Шанс на сегодня и на три ночи вперёд",
      "Карта 12 городов Югры и места для наблюдений",
      "Лента фото с лайками",
      "Работает без интернета по сохранённым данным",
    ],
    stack: ["DART", "FLUTTER"],
    logo: "assets/logos/siyanie.svg",
    tile: "#0B1A33",
    media: { type: "video", src: "assets/media/siyanie-demo.gif", alt: "Все экраны приложения «Сияние Югры»", label: "ВСЕ ЭКРАНЫ ПРИЛОЖЕНИЯ" },
  },
  {
    id: "vakhter",
    level: "LEVEL 2 · WEB",
    platform: "web",
    name: "Вахтёр",
    short: "Кабинет вахтовика: график, допуски, зарплата",
    about:
      "Сайт для работников вахтового метода. Здесь видно, когда следующий заезд и выезд, у каких допусков и медосмотров " +
      "заканчивается срок и сколько начислено за каждую вахту. Удобно и на компьютере, и с телефона.",
    features: [
      "График вахт на календаре",
      "Напоминания об истекающих допусках",
      "Расчётные листки с понятной раскладкой",
      "Удобно открывать с телефона",
    ],
    stack: ["HTML", "CSS", "JAVASCRIPT"],
    logo: "assets/logos/vakhter.svg",
    tile: "#E0E7FF",
    link: "https://yuwnxu.github.io/vakhter/",
    media: { type: "browser", src: "assets/media/vakhter.jpg", alt: "Главная страница сайта «Вахтёр»", url: "YUWNXU.GITHUB.IO/VAKHTER" },
  },
  {
    id: "kosmetichka",
    level: "LEVEL 3 · WEB",
    platform: "web",
    name: "Косметичка",
    short: "Следит за сроком годности вашей косметики",
    about:
      "Сайт, который помогает не пользоваться просроченной косметикой. Вы добавляете свои средства, а сайт показывает, " +
      "сколько дней осталось, и подсвечивает те, что скоро испортятся. К средству можно добавить фото.",
    features: [
      "Цветные статусы: годно, скоро истечёт, просрочено",
      "Поиск и фильтры по категориям",
      "Фото своих средств",
      "Утренняя и вечерняя рутина",
    ],
    stack: ["HTML", "CSS", "JAVASCRIPT"],
    logo: "assets/logos/cosmetichka.svg",
    tile: "#FFE95C",
    link: "https://yuwnxu.github.io/cosmetichka/",
    media: { type: "browser", src: "assets/media/cosmetichka.jpg", alt: "Главная страница сайта «Косметичка»", url: "YUWNXU.GITHUB.IO/COSMETICHKA" },
  },
  {
    id: "ai-psiholog",
    level: "LEVEL 4 · WEB",
    platform: "web",
    name: "AI-психолог",
    short: "Поддержка и разговор с ИИ в любое время",
    about:
      "Сервис психологической поддержки с ИИ-собеседником: можно рассказать, что беспокоит, и получить бережный ответ " +
      "в любое время суток. Стиль общения выбирает сам пользователь. Здесь показана клиентская часть сервиса.",
    features: [
      "Регистрация и вход",
      "Выбор стиля общения: мягкий или аналитический",
      "Чаты и список диалогов",
      "Дыхательное упражнение для быстрого успокоения",
    ],
    stack: ["DART", "FLUTTER"],
    logo: "assets/logos/ai.svg",
    tile: "#F1F5F9",
    link: "https://yuwnxu.github.io/ai_assistant/",
    media: { type: "browser", src: "assets/media/ai-psiholog.jpg", alt: "Главная страница сервиса «AI-психолог»", url: "YUWNXU.GITHUB.IO/AI_ASSISTANT" },
  },
  {
    id: "portfolio",
    level: "BONUS · WEB",
    platform: "web",
    name: "Этот сайт",
    short: "Портфолио в виде ретро-игры",
    about:
      "Сайт, который вы сейчас смотрите. Оформлен как ретро-игра: пункты можно выбирать клавишами со стрелками " +
      "или просто нажимать на них. Работает на компьютере и на телефоне.",
    features: [
      "Управление клавиатурой и касанием",
      "Анимации и плавные переходы",
      "Подстраивается под экран телефона",
      "Открывается быстро, без лишних загрузок",
    ],
    stack: ["HTML", "CSS", "JAVASCRIPT"],
    logo: null,
    tile: "#DCD0F5",
    media: { type: "browser", src: "assets/media/portfolio.jpg", alt: "Стартовый экран этого сайта", url: "YUWNXU.GITHUB.IO/PORTFOLIO" },
  },
];

export function findProject(id) {
  return projects.find((p) => p.id === id);
}

export function neighbours(id) {
  const i = projects.findIndex((p) => p.id === id);
  return { prev: projects[i - 1] ?? null, next: projects[i + 1] ?? null };
}
