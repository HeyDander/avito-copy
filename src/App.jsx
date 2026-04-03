import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const compactNumber = new Intl.NumberFormat('ru-RU', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const emptyDraft = {
  title: '',
  price: '',
  city: '',
  category: 'Недвижимость',
  image: '',
  sellerName: '',
  badge: 'Новая подборка',
  description: '',
};

function App() {
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedCity, setSelectedCity] = useState('Все города');
  const [priceLimit, setPriceLimit] = useState(25000000);
  const [draft, setDraft] = useState(emptyDraft);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messageDraft, setMessageDraft] = useState('');
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const [loading, setLoading] = useState(true);

  const deferredSearch = useDeferredValue(search);

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

        const [categoriesData, listingsData, favoritesData, messagesData, dashboardData] =
          await Promise.all(responses.map((response) => response.json()));

        startTransition(() => {
          setCategories(categoriesData.categories);
          setListings(listingsData.listings);
          setFavorites(favoritesData.favorites);
          setConversations(messagesData.conversations);
          setDashboard(dashboardData.dashboard);
          setActiveConversationId(messagesData.conversations[0]?.id ?? null);
        });
      } catch {
        setStatus({
          type: 'error',
          text: 'Не удалось загрузить данные. Проверьте запуск Netlify Functions.',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const visibleListings = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesSearch =
        query.length === 0 ||
        [listing.title, listing.description, listing.city, listing.category]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        selectedCategory === 'Все' || listing.category === selectedCategory;

      const matchesCity = selectedCity === 'Все города' || listing.city === selectedCity;
      const matchesPrice = listing.price <= priceLimit;

      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    });
  }, [deferredSearch, listings, priceLimit, selectedCategory, selectedCity]);

  const featuredListing = visibleListings[0];
  const cityOptions = ['Все города', ...new Set(listings.map((listing) => listing.city))];
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? null;

  async function toggleFavorite(listingId) {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId }),
    });
    const data = await response.json();
    setFavorites(data.favorites);
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
        throw new Error(data.error || 'Ошибка публикации');
      }

      startTransition(() => {
        setListings(data.listings);
        setDashboard(data.dashboard);
        setDraft(emptyDraft);
        setStatus({ type: 'success', text: 'Объявление опубликовано и уже доступно в ленте.' });
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
        author: 'Покупатель',
        text: messageDraft,
      }),
    });

    const data = await response.json();
    setConversations(data.conversations);
    setMessageDraft('');
  }

  const trendCards = dashboard?.topCategories ?? [];

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero__nav">
          <div className="brand">
            <span className="brand__dot" />
            Tunik
          </div>
          <div className="hero__nav-meta">
            <span>Маркетплейс нового поколения</span>
            <span>Backend + Frontend ready</span>
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">Умный сервис объявлений</p>
            <h1>Современный аналог классифайда с кабинетами, сообщениями и аналитикой.</h1>
            <p className="hero__lead">
              Поиск по объявлениям, быстрый отклик, избранное, карточки продавцов и
              serverless API для будущего деплоя на Netlify.
            </p>

            <div className="hero__search">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ищите квартиры, автомобили, технику, вакансии..."
              />
              <button type="button">Найти предложение</button>
            </div>

            <div className="hero__stats">
              <StatCard label="Активных объявлений" value={compactNumber.format(listings.length)} />
              <StatCard
                label="В избранном у пользователей"
                value={compactNumber.format(favorites.length)}
              />
              <StatCard
                label="Откликов сегодня"
                value={compactNumber.format(dashboard?.responseRate ?? 0)}
              />
            </div>
          </div>

          <div className="hero__spotlight">
            {featuredListing ? (
              <article className="spotlight-card">
                <img src={featuredListing.image} alt={featuredListing.title} />
                <div className="spotlight-card__body">
                  <span className="pill">{featuredListing.badge}</span>
                  <h2>{featuredListing.title}</h2>
                  <p>{featuredListing.description}</p>
                  <div className="spotlight-card__meta">
                    <strong>{currency.format(featuredListing.price)}</strong>
                    <span>{featuredListing.city}</span>
                    <span>{featuredListing.sellerName}</span>
                  </div>
                </div>
              </article>
            ) : (
              <div className="spotlight-card spotlight-card--empty">Загрузка витрины...</div>
            )}
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel panel--filters">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Фильтры</p>
              <h2>Гибкий поиск по каталогу</h2>
            </div>
            <span className="result-chip">{visibleListings.length} результатов</span>
          </div>

          <div className="filters">
            <label>
              Категория
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="Все">Все</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Город
              <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Верхняя цена: {currency.format(priceLimit)}
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
                <span>{item.category}</span>
                <strong>{item.count}</strong>
                <small>активных объявлений</small>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog">
          {loading ? <div className="panel">Загружаем объявления...</div> : null}

          {status.text ? (
            <div className={`notice notice--${status.type}`}>{status.text}</div>
          ) : null}

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
                    {favorites.includes(listing.id) ? 'В избранном' : 'Сохранить'}
                  </button>
                </div>
                <div className="listing-card__content">
                  <div className="listing-card__topline">
                    <span className="pill pill--soft">{listing.category}</span>
                    <span>{listing.city}</span>
                  </div>
                  <h3>{listing.title}</h3>
                  <strong>{currency.format(listing.price)}</strong>
                  <p>{listing.description}</p>
                  <div className="listing-card__footer">
                    <span>{listing.sellerName}</span>
                    <span>{listing.badge}</span>
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
                <p className="eyebrow">Кабинет продавца</p>
                <h2>Публикация новых объявлений</h2>
              </div>
            </div>

            <form className="composer" onSubmit={handleCreateListing}>
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                placeholder="Заголовок объявления"
                required
              />
              <input
                value={draft.price}
                onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                placeholder="Цена"
                type="number"
                required
              />
              <input
                value={draft.city}
                onChange={(event) => setDraft({ ...draft, city: event.target.value })}
                placeholder="Город"
                required
              />
              <select
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                value={draft.sellerName}
                onChange={(event) => setDraft({ ...draft, sellerName: event.target.value })}
                placeholder="Имя продавца"
                required
              />
              <input
                value={draft.image}
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                placeholder="URL изображения"
                required
              />
              <input
                value={draft.badge}
                onChange={(event) => setDraft({ ...draft, badge: event.target.value })}
                placeholder="Бейдж"
              />
              <textarea
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                placeholder="Подробное описание предложения"
                rows="5"
                required
              />
              <button type="submit" className="primary-btn">
                Опубликовать объявление
              </button>
            </form>
          </section>

          <section className="panel panel--chat">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Сообщения</p>
                <h2>Переписка с покупателями</h2>
              </div>
            </div>

            <div className="chat-layout">
              <div className="chat-list">
                {conversations.map((conversation) => (
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
                          className={`message ${
                            message.author === 'Покупатель' ? 'message--buyer' : ''
                          }`}
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
                        placeholder="Ответьте покупателю..."
                      />
                      <button type="submit">Отправить</button>
                    </form>
                  </>
                ) : (
                  <div className="chat-window__empty">Выберите диалог слева.</div>
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
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
