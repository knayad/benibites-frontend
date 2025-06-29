// Cuisine emoji mapping utility
// This allows for dynamic addition of new cuisines while maintaining consistency

const CUISINE_EMOJI_MAP = {
  american: '🍔',
  italian: '🍝',
  mexican: '🌮',
  chinese: '🥢',
  japanese: '🍣',
  thai: '🍜',
  indian: '🍛',
  french: '🥖',
  mediterranean: '🥙',
  greek: '🥗',
  spanish: '🥘',
  korean: '🍲',
  vietnamese: '🍜',
  middle_eastern: '🍢',
  caribbean: '🍤',
  african: '🍲',
  fusion: '🍽️',
  // Add more cuisines as they're discovered
};

// Standardize cuisine input (lowercase, trim, etc.)
export const standardizeCuisine = (cuisine) => {
  if (!cuisine) return '';
  return cuisine.toLowerCase().trim().replace(/\s+/g, '_');
};

// Get emoji for cuisine, with fallback
export const getCuisineEmoji = (cuisine) => {
  const standardized = standardizeCuisine(cuisine);
  return CUISINE_EMOJI_MAP[standardized] || '🍽️';
};

// Add new cuisine to the map
export const addCuisine = (cuisine, emoji) => {
  const standardized = standardizeCuisine(cuisine);
  CUISINE_EMOJI_MAP[standardized] = emoji;
  return standardized;
};

// Get all available cuisines
export const getAllCuisines = () => {
  return Object.keys(CUISINE_EMOJI_MAP).map(cuisine => ({
    value: cuisine,
    label: cuisine.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    emoji: CUISINE_EMOJI_MAP[cuisine]
  }));
};

// Check if cuisine exists
export const cuisineExists = (cuisine) => {
  const standardized = standardizeCuisine(cuisine);
  return standardized in CUISINE_EMOJI_MAP;
};

export default CUISINE_EMOJI_MAP; 