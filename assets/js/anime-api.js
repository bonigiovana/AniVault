/**
 * AniVault - Anime API Manager (Jikan API v4 / MyAnimeList)
 * Com Fila de Requisições, Cache de 24h, Timeout Seguro e Suporte a Paginação Total Real
 */
window.animeApi = {};
const animeApi = window.animeApi;

let lastApiCallTime = 0;
const API_DELAY_MS = 400;

async function throttledFetch(url, signal) {
  const now = Date.now();
  const timeSinceLast = now - lastApiCallTime;
  if (timeSinceLast < API_DELAY_MS) {
    await new Promise(resolve => setTimeout(resolve, API_DELAY_MS - timeSinceLast));
  }
  lastApiCallTime = Date.now();
  return fetch(url, { signal });
}

window.fetchWithRetry = async function fetchWithRetry(url, retries = 2, delayMs = 1000) {
  const cacheKey = `anivault_cache_${url}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < 86400000 && data && data.length > 0) {
        return data;
      }
    }
  } catch (e) {}

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const response = await throttledFetch(url, controller.signal);
      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result && result.data && result.data.length > 0) {
          try {
            localStorage.setItem(cacheKey, JSON.stringify({
              timestamp: Date.now(),
              data: result.data
            }));
          } catch (e) {}
          return result.data;
        }
      }
    } catch (e) {}
    if (i < retries - 1) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  return null;
};
const fetchWithRetry = window.fetchWithRetry;

window.fetchWithRetryFull = async function fetchWithRetryFull(url, retries = 2, delayMs = 1000) {
  const cacheKey = `anivault_cache_full_${url}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < 86400000 && data && data.data) {
        return data;
      }
    }
  } catch (e) {}

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const response = await throttledFetch(url, controller.signal);
      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result && result.data && result.data.length > 0) {
          const payload = {
            data: result.data,
            totalPages: result.pagination?.last_visible_page || 50
          };
          try {
            localStorage.setItem(cacheKey, JSON.stringify({
              timestamp: Date.now(),
              data: payload
            }));
          } catch (e) {}
          return payload;
        }
      }
    } catch (e) {}
    if (i < retries - 1) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  return null;
};

animeApi.getTopAnimes = async () => fetchWithRetry('https://api.jikan.moe/v4/top/anime?limit=12');
animeApi.getAnimesByGenre = async (genreId, page = 1, limit = 30) => window.fetchWithRetryFull(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&page=${page}&limit=${limit}`);
animeApi.searchAnimes = async (query) => fetchWithRetry(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=24`);
animeApi.getAnimeEpisodes = async (animeId) => fetchWithRetry(`https://api.jikan.moe/v4/anime/${animeId}/episodes`);