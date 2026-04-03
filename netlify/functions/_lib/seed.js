export const seed = {
  categories: [
    { id: 'real-estate', name: 'Недвижимость' },
    { id: 'cars', name: 'Авто' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'services', name: 'Услуги' },
    { id: 'jobs', name: 'Работа' },
  ],
  favorites: ['listing-2', 'listing-5'],
  listings: [
    {
      id: 'listing-1',
      title: 'Панорамный пентхаус с террасой',
      price: 24500000,
      city: 'Москва',
      category: 'Недвижимость',
      sellerName: 'Prime Urban',
      badge: 'Премиум',
      image:
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80',
      description:
        'Двухуровневый пентхаус с дизайнерской отделкой, private lounge-зоной и smart-home системой.',
      createdAt: '2026-04-03T12:00:00.000Z',
    },
    {
      id: 'listing-2',
      title: 'Tesla Model 3 Long Range',
      price: 3890000,
      city: 'Санкт-Петербург',
      category: 'Авто',
      sellerName: 'Volt Garage',
      badge: 'Горячее предложение',
      image:
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
      description:
        'Электромобиль с полным приводом, автопилотом и запасом хода до 602 км. Один владелец.',
      createdAt: '2026-04-03T13:00:00.000Z',
    },
    {
      id: 'listing-3',
      title: 'MacBook Pro 16 M4 Max',
      price: 429000,
      city: 'Казань',
      category: 'Электроника',
      sellerName: 'Pixel District',
      badge: 'Проверенный продавец',
      image:
        'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      description:
        'Новый ноутбук в полной комплектации для дизайнеров и разработчиков, гарантия 12 месяцев.',
      createdAt: '2026-04-03T14:00:00.000Z',
    },
    {
      id: 'listing-4',
      title: 'Ремонт квартир под ключ',
      price: 9500,
      city: 'Екатеринбург',
      category: 'Услуги',
      sellerName: 'Studio Renovation',
      badge: 'Быстрый выезд',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      description:
        'Смета за 24 часа, прозрачный договор, дизайн-проект и контроль сроков в личном кабинете.',
      createdAt: '2026-04-03T15:00:00.000Z',
    },
    {
      id: 'listing-5',
      title: 'Senior Product Designer',
      price: 320000,
      city: 'Новосибирск',
      category: 'Работа',
      sellerName: 'Northstar Tech',
      badge: 'Удаленно',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      description:
        'Продуктовая команда ищет senior-дизайнера для B2C платформы с сильной культурой и опционами.',
      createdAt: '2026-04-03T16:00:00.000Z',
    },
    {
      id: 'listing-6',
      title: 'Лофт-студия для съемок и ивентов',
      price: 180000,
      city: 'Москва',
      category: 'Недвижимость',
      sellerName: 'Scene House',
      badge: 'Новая подборка',
      image:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      description:
        'Пространство с циклорамой, гримеркой и доступом 24/7. Подойдет для съемок, подкастов и брендов.',
      createdAt: '2026-04-03T17:00:00.000Z',
    },
  ],
  conversations: [
    {
      id: 'conversation-1',
      participant: 'Илья Никитин',
      listingTitle: 'Tesla Model 3 Long Range',
      messages: [
        {
          id: 'message-1',
          author: 'Покупатель',
          text: 'Добрый день! Можно посмотреть авто завтра вечером?',
        },
        {
          id: 'message-2',
          author: 'Продавец',
          text: 'Да, конечно. Могу отправить VIN и видеообзор перед встречей.',
        },
      ],
    },
    {
      id: 'conversation-2',
      participant: 'Марина Орлова',
      listingTitle: 'Панорамный пентхаус с террасой',
      messages: [
        {
          id: 'message-3',
          author: 'Покупатель',
          text: 'Подскажите, есть ли парковочное место и какой вид из окон?',
        },
        {
          id: 'message-4',
          author: 'Продавец',
          text: 'Есть 2 машиноместа, а панорама выходит на центр и набережную.',
        },
      ],
    },
  ],
};
