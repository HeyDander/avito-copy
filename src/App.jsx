import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';

const languages = ['ru', 'en', 'hy'];

const messages = {
  ru: {
    navTagline: 'Маркетплейс нового поколения',
    navMeta: 'Backend + Frontend ready',
    eyebrow: 'Умный сервис объявлений',
    heroTitle: 'Современный аналог классифайда с кабинетами, сообщениями и аналитикой.',
    heroLead:
      'Поиск по объявлениям, быстрый отклик, избранное, карточки продавцов и serverless API для будущего деплоя на Netlify.',
    searchPlaceholder: 'Ищите квартиры, автомобили, технику, вакансии...',
    searchButton: 'Найти предложение',
    statsListings: 'Активных объявлений',
    statsFavorites: 'В избранном у пользователей',
    statsResponses: 'Откликов сегодня',
    loadingSpotlight: 'Загрузка витрины...',
    filtersEyebrow: 'Фильтры',
    filtersTitle: 'Гибкий поиск по каталогу',
    allResults: 'результатов',
    category: 'Категория',
    city: 'Город',
    allCategories: 'Все',
    allCities: 'Все города',
    maxPrice: 'Верхняя цена',
    activeListings: 'активных объявлений',
    loadingListings: 'Загружаем объявления...',
    save: 'Сохранить',
    saved: 'В избранном',
    sellerDeskEyebrow: 'Кабинет продавца',
    sellerDeskTitle: 'Публикация новых объявлений',
    formTitle: 'Заголовок объявления',
    formPrice: 'Цена',
    formCity: 'Город',
    formSeller: 'Имя продавца',
    formImage: 'URL изображения',
    formBadge: 'Бейдж',
    formDescription: 'Подробное описание предложения',
    publish: 'Опубликовать объявление',
    chatEyebrow: 'Сообщения',
    chatTitle: 'Переписка с покупателями',
    chatPlaceholder: 'Ответьте покупателю...',
    send: 'Отправить',
    chooseChat: 'Выберите диалог слева.',
    buyer: 'Покупатель',
    seller: 'Продавец',
    apiDown: 'Не удалось загрузить данные. Попробуйте обновить страницу через пару секунд.',
    apiUnavailable: 'API временно недоступен',
    publishError: 'Ошибка публикации',
    publishSuccess: 'Объявление опубликовано и уже доступно в ленте.',
  },
  en: {
    navTagline: 'Next-generation marketplace',
    navMeta: 'Backend + Frontend ready',
    eyebrow: 'Smart classifieds platform',
    heroTitle: 'A modern classified marketplace with dashboards, messaging, and analytics.',
    heroLead:
      'Search listings, react quickly, save favorites, manage seller profiles, and use a serverless API ready for Netlify deployment.',
    searchPlaceholder: 'Search for homes, cars, electronics, jobs...',
    searchButton: 'Find offers',
    statsListings: 'Active listings',
    statsFavorites: 'Saved by users',
    statsResponses: 'Responses today',
    loadingSpotlight: 'Loading featured listing...',
    filtersEyebrow: 'Filters',
    filtersTitle: 'Flexible catalog search',
    allResults: 'results',
    category: 'Category',
    city: 'City',
    allCategories: 'All',
    allCities: 'All cities',
    maxPrice: 'Maximum price',
    activeListings: 'active listings',
    loadingListings: 'Loading listings...',
    save: 'Save',
    saved: 'Saved',
    sellerDeskEyebrow: 'Seller workspace',
    sellerDeskTitle: 'Publish new listings',
    formTitle: 'Listing title',
    formPrice: 'Price',
    formCity: 'City',
    formSeller: 'Seller name',
    formImage: 'Image URL',
    formBadge: 'Badge',
    formDescription: 'Detailed listing description',
    publish: 'Publish listing',
    chatEyebrow: 'Messages',
    chatTitle: 'Buyer conversations',
    chatPlaceholder: 'Reply to the buyer...',
    send: 'Send',
    chooseChat: 'Choose a conversation on the left.',
    buyer: 'Buyer',
    seller: 'Seller',
    apiDown: 'Could not load data. Please refresh the page in a few seconds.',
    apiUnavailable: 'API is temporarily unavailable',
    publishError: 'Publishing failed',
    publishSuccess: 'Your listing is now live in the feed.',
  },
  hy: {
    navTagline: 'Նոր սերնդի շուկա',
    navMeta: 'Backend + Frontend ready',
    eyebrow: 'Խելացի հայտարարությունների հարթակ',
    heroTitle: 'Ժամանակակից classified հարթակ կաբինետներով, հաղորդագրություններով և վերլուծությամբ։',
    heroLead:
      'Փնտրեք հայտարարություններ, արագ արձագանքեք, պահեք ընտրյալները, աշխատեք վաճառողի պրոֆիլի հետ և օգտվեք Netlify-ի համար պատրաստ serverless API-ից։',
    searchPlaceholder: 'Փնտրեք բնակարաններ, մեքենաներ, տեխնիկա, աշխատանք...',
    searchButton: 'Գտնել առաջարկ',
    statsListings: 'Ակտիվ հայտարարություններ',
    statsFavorites: 'Պահված օգտատերերի կողմից',
    statsResponses: 'Արձագանքներ այսօր',
    loadingSpotlight: 'Բեռնվում է ցուցադրված առաջարկը...',
    filtersEyebrow: 'Ֆիլտրեր',
    filtersTitle: 'Ճկուն որոնում կատալոգում',
    allResults: 'արդյունք',
    category: 'Կատեգորիա',
    city: 'Քաղաք',
    allCategories: 'Բոլորը',
    allCities: 'Բոլոր քաղաքները',
    maxPrice: 'Առավելագույն գին',
    activeListings: 'ակտիվ հայտարարություն',
    loadingListings: 'Հայտարարությունները բեռնվում են...',
    save: 'Պահել',
    saved: 'Պահված է',
    sellerDeskEyebrow: 'Վաճառողի կաբինետ',
    sellerDeskTitle: 'Նոր հայտարարության հրապարակում',
    formTitle: 'Հայտարարության վերնագիր',
    formPrice: 'Գին',
    formCity: 'Քաղաք',
    formSeller: 'Վաճառողի անուն',
    formImage: 'Նկարի URL',
    formBadge: 'Բեյջ',
    formDescription: 'Հայտարարության մանրամասն նկարագրություն',
    publish: 'Հրապարակել հայտարարությունը',
    chatEyebrow: 'Հաղորդագրություններ',
    chatTitle: 'Զրույցներ գնորդների հետ',
    chatPlaceholder: 'Պատասխանեք գնորդին...',
    send: 'Ուղարկել',
    chooseChat: 'Ընտրեք երկխոսությունը ձախից։',
    buyer: 'Գնորդ',
    seller: 'Վաճառող',
    apiDown: 'Չհաջողվեց բեռնել տվյալները։ Փորձեք թարմացնել էջը մի քանի վայրկյանից։',
    apiUnavailable: 'API-ն ժամանակավորապես անհասանելի է',
    publishError: 'Հրապարակման սխալ',
    publishSuccess: 'Հայտարարությունը հրապարակվել է և արդեն երևում է հոսքում։',
  },
};

const categoryLabels = {
  Недвижимость: { ru: 'Недвижимость', en: 'Real estate', hy: 'Անշարժ գույք' },
  Авто: { ru: 'Авто', en: 'Cars', hy: 'Ավտո' },
  Электроника: { ru: 'Электроника', en: 'Electronics', hy: 'Էլեկտրոնիկա' },
  Услуги: { ru: 'Услуги', en: 'Services', hy: 'Ծառայություններ' },
  Работа: { ru: 'Работа', en: 'Jobs', hy: 'Աշխատանք' },
};

const cityLabels = {
  Москва: { ru: 'Москва', en: 'Moscow', hy: 'Մոսկվա' },
  'Санкт-Петербург': { ru: 'Санкт-Петербург', en: 'Saint Petersburg', hy: 'Սանկտ Պետերբուրգ' },
  Казань: { ru: 'Казань', en: 'Kazan', hy: 'Կազան' },
  Екатеринбург: { ru: 'Екатеринбург', en: 'Yekaterinburg', hy: 'Եկատերինբուրգ' },
  Новосибирск: { ru: 'Новосибирск', en: 'Novosibirsk', hy: 'Նովոսիբիրսկ' },
};

const badgeLabels = {
  Премиум: { ru: 'Премиум', en: 'Premium', hy: 'Պրեմիում' },
  'Горячее предложение': { ru: 'Горячее предложение', en: 'Hot deal', hy: 'Թեժ առաջարկ' },
  'Проверенный продавец': { ru: 'Проверенный продавец', en: 'Verified seller', hy: 'Ստուգված վաճառող' },
  'Быстрый выезд': { ru: 'Быстрый выезд', en: 'Fast response', hy: 'Արագ արձագանք' },
  Удаленно: { ru: 'Удаленно', en: 'Remote', hy: 'Հեռավար' },
  'Новая подборка': { ru: 'Новая подборка', en: 'Fresh pick', hy: 'Նոր ընտրանի' },
};

const listingContent = {
  'listing-1': {
    en: {
      title: 'Panoramic penthouse with a terrace',
      description:
        'A two-level penthouse with designer interiors, a private lounge zone, and a full smart-home system.',
      sellerName: 'Prime Urban',
    },
    hy: {
      title: 'Պանորամային պենտհաուս տեռասայով',
      description:
        'Երկհարկանի պենտհաուս դիզայներական ավարտմամբ, private lounge գոտով և smart-home համակարգով։',
      sellerName: 'Prime Urban',
    },
  },
  'listing-2': {
    en: {
      title: 'Tesla Model 3 Long Range',
      description:
        'Electric vehicle with dual motor, autopilot, and up to 602 km range. One owner.',
      sellerName: 'Volt Garage',
    },
    hy: {
      title: 'Tesla Model 3 Long Range',
      description:
        'Էլեկտրամեքենա լիաքարշակով, autopilot-ով և մինչև 602 կմ ընթացքով։ Մեկ սեփականատեր։',
      sellerName: 'Volt Garage',
    },
  },
  'listing-3': {
    en: {
      title: 'MacBook Pro 16 M4 Max',
      description:
        'A brand-new laptop in full configuration for designers and developers, with a 12-month warranty.',
      sellerName: 'Pixel District',
    },
    hy: {
      title: 'MacBook Pro 16 M4 Max',
      description:
        'Նոր նոութբուք ամբողջական հավաքակազմով դիզայներների և ծրագրավորողների համար, 12 ամսվա երաշխիքով։',
      sellerName: 'Pixel District',
    },
  },
  'listing-4': {
    en: {
      title: 'Turnkey apartment renovation',
      description:
        'Quote in 24 hours, transparent contract, design project, and deadline tracking in your dashboard.',
      sellerName: 'Studio Renovation',
    },
    hy: {
      title: 'Բնակարանի վերանորոգում բանալիով',
      description:
        'Սմետա 24 ժամում, թափանցիկ պայմանագիր, դիզայն նախագիծ և ժամկետների վերահսկում անձնական կաբինետում։',
      sellerName: 'Studio Renovation',
    },
  },
  'listing-5': {
    en: {
      title: 'Senior Product Designer',
      description:
        'A product team is hiring a senior designer for a B2C platform with a strong culture and equity.',
      sellerName: 'Northstar Tech',
    },
    hy: {
      title: 'Senior Product Designer',
      description:
        'Պրոդուկտային թիմը փնտրում է senior դիզայների B2C հարթակի համար՝ ուժեղ մշակույթով և օպցիոններով։',
      sellerName: 'Northstar Tech',
    },
  },
  'listing-6': {
    en: {
      title: 'Loft studio for shoots and events',
      description:
        'A spacious studio with a cyclorama, dressing room, and 24/7 access for shoots, podcasts, and brand events.',
      sellerName: 'Scene House',
    },
    hy: {
      title: 'Լոֆթ ստուդիա նկարահանումների և միջոցառումների համար',
      description:
        'Տարածք ցիկլորամայով, գրիմսենյակով և 24/7 հասանելիությամբ նկարահանումների, փոդքաստների և բրենդ միջոցառումների համար։',
      sellerName: 'Scene House',
    },
  },
};

const conversationContent = {
  'conversation-1': {
    en: {
      participant: 'Ilya Nikitin',
      listingTitle: 'Tesla Model 3 Long Range',
      messages: {
        'message-1': 'Hello! Can I see the car tomorrow evening?',
        'message-2': 'Yes, of course. I can send the VIN and a video overview before the meeting.',
      },
    },
    hy: {
      participant: 'Իլյա Նիկիտին',
      listingTitle: 'Tesla Model 3 Long Range',
      messages: {
        'message-1': 'Բարև։ Կարո՞ղ եմ մեքենան տեսնել վաղը երեկոյան։',
        'message-2': 'Այո, իհարկե։ Կարող եմ մինչև հանդիպումը ուղարկել VIN-ը և վիդեո обзор։',
      },
    },
  },
  'conversation-2': {
    en: {
      participant: 'Marina Orlova',
      listingTitle: 'Panoramic penthouse with a terrace',
      messages: {
        'message-3': 'Could you tell me whether there is parking and what the view is like?',
        'message-4': 'There are two parking spaces, and the panoramic view opens to the city center and riverfront.',
      },
    },
    hy: {
      participant: 'Մարինա Օռլովա',
      listingTitle: 'Պանորամային պենտհաուս տեռասայով',
      messages: {
        'message-3': 'Կասե՞ք, կա՞ կայանատեղի և ինչ տեսարան է բացվում պատուհաններից։',
        'message-4': 'Կա 2 մեքենայատեղի, իսկ պանորաման բացվում է դեպի կենտրոն և առափնյա հատված։',
      },
    },
  },
};

const compactFormats = {
  ru: new Intl.NumberFormat('ru-RU', { notation: 'compact', maximumFractionDigits: 1 }),
  en: new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }),
  hy: new Intl.NumberFormat('hy-AM', { notation: 'compact', maximumFractionDigits: 1 }),
};

const currencyFormats = {
  ru: new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'AMD',
    maximumFractionDigits: 0,
  }),
  en: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AMD',
    maximumFractionDigits: 0,
  }),
  hy: new Intl.NumberFormat('hy-AM', {
    style: 'currency',
    currency: 'AMD',
    maximumFractionDigits: 0,
  }),
};

const defaultCategory = 'Недвижимость';

const defaultDraft = {
  title: '',
  price: '',
  city: '',
  category: defaultCategory,
  image: '',
  sellerName: '',
  badge: 'Новая подборка',
  description: '',
};

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('tunik-language') || 'ru');
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedCity, setSelectedCity] = useState('Все города');
  const [priceLimit, setPriceLimit] = useState(25000000);
  const [draft, setDraft] = useState(defaultDraft);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messageDraft, setMessageDraft] = useState('');
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const [loading, setLoading] = useState(true);

  const deferredSearch = useDeferredValue(search);
  const t = messages[language];
  const currency = currencyFormats[language];
  const compactNumber = compactFormats[language];

  useEffect(() => {
    localStorage.setItem('tunik-language', language);
    document.documentElement.lang = language;
    document.title = `Tunik | ${t.navTagline}`;
  }, [language, t.navTagline]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const responses = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/listings'),
          fetch('/api/favorites'),
          fetch('/api/messages'),
          fetch('/api/dashboard'),
        ]);

        if (responses.some((response) => !response.ok)) {
          throw new Error(t.apiUnavailable);
        }

        const [categoriesData, listingsData, favoritesData, messagesData, dashboardData] =
          await Promise.all(responses.map((response) => response.json()));

        startTransition(() => {
          const nextCategories = categoriesData.categories ?? [];
          const nextListings = listingsData.listings ?? [];
          const nextFavorites = favoritesData.favorites ?? [];
          const nextConversations = messagesData.conversations ?? [];
          const nextDashboard = dashboardData.dashboard ?? { responseRate: 0, topCategories: [] };

          setCategories(nextCategories);
          setListings(nextListings);
          setFavorites(nextFavorites);
          setConversations(nextConversations);
          setDashboard(nextDashboard);
          setActiveConversationId(nextConversations[0]?.id ?? null);
        });
      } catch {
        setStatus({
          type: 'error',
          text: t.apiDown,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [t.apiDown, t.apiUnavailable]);

  const localizedListings = useMemo(
    () => listings.map((listing) => localizeListing(listing, language)),
    [language, listings],
  );

  const localizedConversations = useMemo(
    () => conversations.map((conversation) => localizeConversation(conversation, language, t)),
    [conversations, language, t],
  );

  const visibleListings = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return localizedListings.filter((listing) => {
      const matchesSearch =
        query.length === 0 ||
        [listing.title, listing.description, listing.cityLabel, listing.categoryLabel]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesCategory = selectedCategory === 'Все' || listing.category === selectedCategory;
      const matchesCity = selectedCity === 'Все города' || listing.city === selectedCity;
      const matchesPrice = listing.price <= priceLimit;

      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    });
  }, [deferredSearch, localizedListings, priceLimit, selectedCategory, selectedCity]);

  const featuredListing = visibleListings[0];
  const cityOptions = ['Все города', ...new Set(listings.map((listing) => listing.city))];
  const activeConversation =
    localizedConversations.find((conversation) => conversation.id === activeConversationId) ?? null;
  const trendCards = dashboard?.topCategories ?? [];

  async function toggleFavorite(listingId) {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId }),
    });
    const data = await response.json();
    setFavorites(data.favorites ?? []);
  }

  async function handleCreateListing(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...draft,
          price: Number(draft.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.publishError);
      }

      startTransition(() => {
        setListings(data.listings ?? []);
        setDashboard(data.dashboard ?? { responseRate: 0, topCategories: [] });
        setDraft(defaultDraft);
        setStatus({ type: 'success', text: t.publishSuccess });
      });
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    }
  }

  async function handleSendMessage(event) {
    event.preventDefault();

    if (!messageDraft.trim() || !activeConversation) {
      return;
    }

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: activeConversation.id,
        author: t.buyer,
        text: messageDraft,
      }),
    });

    const data = await response.json();
    setConversations(data.conversations ?? []);
    setMessageDraft('');
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero__nav">
          <div className="brand">
            <span className="brand__dot" />
            Tunik
          </div>
          <div className="hero__nav-controls">
            <div className="hero__nav-meta">
              <span>{t.navTagline}</span>
              <span>{t.navMeta}</span>
            </div>
            <div className="lang-switcher" aria-label="Language switcher">
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`lang-switcher__button ${
                    language === code ? 'lang-switcher__button--active' : ''
                  }`}
                  onClick={() => setLanguage(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero__lead">{t.heroLead}</p>

            <div className="hero__search">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.searchPlaceholder}
              />
              <button type="button">{t.searchButton}</button>
            </div>

            <div className="hero__stats">
              <StatCard label={t.statsListings} value={compactNumber.format(listings.length)} />
              <StatCard label={t.statsFavorites} value={compactNumber.format(favorites.length)} />
              <StatCard
                label={t.statsResponses}
                value={compactNumber.format(dashboard?.responseRate ?? 0)}
              />
            </div>
          </div>

          <div className="hero__spotlight">
            {featuredListing ? (
              <article className="spotlight-card">
                <img src={featuredListing.image} alt={featuredListing.title} />
                <div className="spotlight-card__body">
                  <span className="pill">{featuredListing.badgeLabel}</span>
                  <h2>{featuredListing.title}</h2>
                  <p>{featuredListing.description}</p>
                  <div className="spotlight-card__meta">
                    <strong>{currency.format(featuredListing.price)}</strong>
                    <span>{featuredListing.cityLabel}</span>
                    <span>{featuredListing.sellerName}</span>
                  </div>
                </div>
              </article>
            ) : (
              <div className="spotlight-card spotlight-card--empty">{t.loadingSpotlight}</div>
            )}
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel panel--filters">
          <div className="panel__header">
            <div>
              <p className="eyebrow">{t.filtersEyebrow}</p>
              <h2>{t.filtersTitle}</h2>
            </div>
            <span className="result-chip">
              {visibleListings.length} {t.allResults}
            </span>
          </div>

          <div className="filters">
            <label>
              {t.category}
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="Все">{t.allCategories}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {translateCategory(category.name, language)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.city}
              <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city === 'Все города' ? t.allCities : translateCity(city, language)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t.maxPrice}: {currency.format(priceLimit)}
              <input
                type="range"
                min="100000"
                max="25000000"
                step="100000"
                value={priceLimit}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="trend-grid">
            {trendCards.map((item) => (
              <article key={item.category} className="trend-card">
                <span>{translateCategory(item.category, language)}</span>
                <strong>{item.count}</strong>
                <small>{t.activeListings}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog">
          {loading ? <div className="panel">{t.loadingListings}</div> : null}
          {status.text ? <div className={`notice notice--${status.type}`}>{status.text}</div> : null}

          <div className="catalog-grid">
            {visibleListings.map((listing) => (
              <article key={listing.id} className="listing-card">
                <div className="listing-card__image-wrap">
                  <img src={listing.image} alt={listing.title} className="listing-card__image" />
                  <button
                    type="button"
                    className={`favorite-btn ${
                      favorites.includes(listing.id) ? 'favorite-btn--active' : ''
                    }`}
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    {favorites.includes(listing.id) ? t.saved : t.save}
                  </button>
                </div>
                <div className="listing-card__content">
                  <div className="listing-card__topline">
                    <span className="pill pill--soft">{listing.categoryLabel}</span>
                    <span>{listing.cityLabel}</span>
                  </div>
                  <h3>{listing.title}</h3>
                  <strong>{currency.format(listing.price)}</strong>
                  <p>{listing.description}</p>
                  <div className="listing-card__footer">
                    <span>{listing.sellerName}</span>
                    <span>{listing.badgeLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="workspace">
          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">{t.sellerDeskEyebrow}</p>
                <h2>{t.sellerDeskTitle}</h2>
              </div>
            </div>

            <form className="composer" onSubmit={handleCreateListing}>
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                placeholder={t.formTitle}
                required
              />
              <input
                value={draft.price}
                onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                placeholder={t.formPrice}
                type="number"
                required
              />
              <input
                value={draft.city}
                onChange={(event) => setDraft({ ...draft, city: event.target.value })}
                placeholder={t.formCity}
                required
              />
              <select
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {translateCategory(category.name, language)}
                  </option>
                ))}
              </select>
              <input
                value={draft.sellerName}
                onChange={(event) => setDraft({ ...draft, sellerName: event.target.value })}
                placeholder={t.formSeller}
                required
              />
              <input
                value={draft.image}
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                placeholder={t.formImage}
                required
              />
              <input
                value={draft.badge}
                onChange={(event) => setDraft({ ...draft, badge: event.target.value })}
                placeholder={t.formBadge}
              />
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                placeholder={t.formDescription}
                rows="5"
                required
              />
              <button type="submit" className="primary-btn">
                {t.publish}
              </button>
            </form>
          </section>

          <section className="panel panel--chat">
            <div className="panel__header">
              <div>
                <p className="eyebrow">{t.chatEyebrow}</p>
                <h2>{t.chatTitle}</h2>
              </div>
            </div>

            <div className="chat-layout">
              <div className="chat-list">
                {localizedConversations.map((conversation) => (
                  <button
                    type="button"
                    key={conversation.id}
                    className={`chat-list__item ${
                      activeConversationId === conversation.id ? 'chat-list__item--active' : ''
                    }`}
                    onClick={() => setActiveConversationId(conversation.id)}
                  >
                    <strong>{conversation.participant}</strong>
                    <span>{conversation.listingTitle}</span>
                  </button>
                ))}
              </div>

              <div className="chat-window">
                {activeConversation ? (
                  <>
                    <div className="chat-window__messages">
                      {activeConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`message ${message.author === t.buyer ? 'message--buyer' : ''}`}
                        >
                          <strong>{message.author}</strong>
                          <p>{message.text}</p>
                        </div>
                      ))}
                    </div>

                    <form className="chat-window__composer" onSubmit={handleSendMessage}>
                      <input
                        value={messageDraft}
                        onChange={(event) => setMessageDraft(event.target.value)}
                        placeholder={t.chatPlaceholder}
                      />
                      <button type="submit">{t.send}</button>
                    </form>
                  </>
                ) : (
                  <div className="chat-window__empty">{t.chooseChat}</div>
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

function translateCategory(value, language) {
  return categoryLabels[value]?.[language] ?? value;
}

function translateCity(value, language) {
  return cityLabels[value]?.[language] ?? value;
}

function translateBadge(value, language) {
  return badgeLabels[value]?.[language] ?? value;
}

function localizeListing(listing, language) {
  const translation = listingContent[listing.id]?.[language] ?? {};

  return {
    ...listing,
    title: translation.title ?? listing.title,
    description: translation.description ?? listing.description,
    sellerName: translation.sellerName ?? listing.sellerName,
    categoryLabel: translateCategory(listing.category, language),
    cityLabel: translateCity(listing.city, language),
    badgeLabel: translateBadge(listing.badge, language),
  };
}

function localizeConversation(conversation, language, t) {
  const translation = conversationContent[conversation.id]?.[language];

  return {
    ...conversation,
    participant: translation?.participant ?? conversation.participant,
    listingTitle: translation?.listingTitle ?? conversation.listingTitle,
    messages: conversation.messages.map((message) => ({
      ...message,
      author:
        message.author === 'Покупатель' || message.author === 'Buyer' || message.author === 'Գնորդ'
          ? t.buyer
          : t.seller,
      text: translation?.messages?.[message.id] ?? message.text,
    })),
  };
}

function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default App;
