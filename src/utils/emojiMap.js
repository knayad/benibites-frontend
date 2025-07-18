export const getSearchEmoji = (query) => {
  const queryLower = query.toLowerCase();
  const emojiMap = {
    coffee: '☕',
    pizza: '🍕',
    burger: '🍔',
    sushi: '🍣',
    pasta: '🍝',
    taco: '🌮',
    salad: '🥗',
    steak: '🥩',
    chicken: '🍗',
    fish: '🐟',
    ice: '🍦',
    cake: '🍰',
    bread: '🥖',
    soup: '🍲',
    rice: '🍚',
    noodle: '🍜',
    sandwich: '🥪',
    hotdog: '🌭',
    fries: '🍟',
    donut: '🍩',
    cupcake: '🧁',
    cookie: '🍪',
    waffle: '🧇',
    pancake: '🥞',
    omelette: '🍳',
    bacon: '🥓',
    egg: '🥚',
    milk: '🥛',
    juice: '🧃',
    soda: '🥤',
    beer: '🍺',
    wine: '🍷',
    cocktail: '🍸',
    tea: '🫖',
    water: '💧',
    smoothie: '🥤',
    shake: '🥤',
    dessert: '🍰',
    breakfast: '🍳',
    lunch: '🥪',
    dinner: '🍽️',
    snack: '🍿',
    candy: '🍬',
    chocolate: '🍫',
    fruit: '🍎',
    vegetable: '🥬',
    meat: '🥩',
    seafood: '🦐',
    vegan: '🌱',
    vegetarian: '🥬',
    gluten: '🌾',
    dairy: '🥛',
    organic: '🌿',
    farm: '🚜',
    market: '🛒',
    store: '🏪',
    restaurant: '🍽️',
    cafe: '☕',
    bar: '🍺',
    pub: '🍺',
    diner: '🍽️',
    bistro: '🍽️',
    grill: '🔥',
    bbq: '🔥',
    smoke: '💨',
    fresh: '🌱',
    local: '🏘️',
    fast: '⚡',
    slow: '🐌',
    spicy: '🌶️',
    sweet: '🍯',
    sour: '🍋',
    salty: '🧂',
    bitter: '☕',
    hot: '🔥',
    cold: '❄️',
    frozen: '🧊',
    baked: '🔥',
    fried: '🍳',
    grilled: '🔥',
    roasted: '🔥',
    steamed: '💨',
    boiled: '💧',
    raw: '🥗',
    cooked: '🍳',
    healthy: '💚',
    junk: '🍟',
    gourmet: '👨‍🍳',
    fancy: '💎',
    casual: '👕',
    formal: '👔',
    family: '👨‍👩‍👧‍👦',
    romantic: '💕',
    business: '💼',
    party: '🎉',
    celebration: '🎊',
    birthday: '🎂',
    anniversary: '💍',
    date: '💕',
    friends: '👥',
    group: '👥',
    solo: '👤',
    quiet: '🤫',
    loud: '🔊',
    music: '🎵',
    live: '🎤',
    outdoor: '🌳',
    indoor: '🏠',
    rooftop: '🏢',
    garden: '🌺',
    patio: '🏡',
    terrace: '🏢',
    beach: '🏖️',
    mountain: '⛰️',
    city: '🏙️',
    downtown: '🏢',
    uptown: '🏘️',
    suburb: '🏘️',
    rural: '🌾',
    urban: '🏙️',
    modern: '🏢',
    vintage: '📻',
    retro: '📺',
    classic: '📚',
    traditional: '🏛️',
    ethnic: '🌍',
    fusion: '🍽️',
    american: '🇺🇸',
    italian: '🇮🇹',
    mexican: '🇲🇽',
    chinese: '🇨🇳',
    japanese: '🇯🇵',
    thai: '🇹🇭',
    indian: '🇮🇳',
    french: '🇫🇷',
    greek: '🇬🇷',
    spanish: '🇪🇸',
    korean: '🇰🇷',
    vietnamese: '🇻🇳',
    mediterranean: '🌊',
    middle: '🏺',
    eastern: '🌅',
    caribbean: '🏝️',
    african: '🌍',
    european: '🇪🇺',
    asian: '🌏',
    latin: '🌎'
  };

  // Check for exact matches first
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (queryLower.includes(key)) {
      return emoji;
    }
  }

  // Default emoji - brown girl shrugging
  return '🤷🏾‍♀️';
}; 