/**
 * AniVault - Dynamic Anime Catalog & Side Drawer System
 */

window.FALLBACK_COVER = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22450%22%20viewBox%3D%220%200%20300%20450%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2248%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2248%22%20fill%3D%22%2300d2d3%22%20text-anchor%3D%22middle%22%3E%F0%9F%8D%AC%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2258%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22bold%22%20fill%3D%22%2394a3b8%22%20text-anchor%3D%22middle%22%3EAniVault%3C%2Ftext%3E%3C%2Fsvg%3E";
const FALLBACK_COVER = window.FALLBACK_COVER;

let searchTimeout = null;

const INITIAL_ANIMES = [
  { mal_id: 52991, title: "Sousou no Frieren", score: 9.3, episodes: 28, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg" } } },
  { mal_id: 61316, title: "Re:Zero kara Hajimeru Isekai", score: 9.2, episodes: 19, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1522/128039.jpg" } } },
  { mal_id: 5114, title: "Fullmetal Alchemist: Brotherhood", score: 9.1, episodes: 64, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg" } } },
  { mal_id: 26087, title: "Steel Ball Run: JoJo", score: 9.1, episodes: null, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1739/140683.jpg" } } },
  { mal_id: 9253, title: "Steins;Gate", score: 9.1, episodes: 24, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg" } } }
];

const SHONEN_ANIMES = [
  { mal_id: 20, title: "Naruto Shippuden", score: 8.3, episodes: 500, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1565/111305.jpg" } } },
  { mal_id: 40748, title: "Jujutsu Kaisen", score: 8.6, episodes: 24, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg" } } },
  { mal_id: 38000, title: "Demon Slayer: Kimetsu no Yaiba", score: 8.5, episodes: 26, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg" } } },
  { mal_id: 11061, title: "Hunter x Hunter (2011)", score: 9.0, episodes: 148, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg" } } },
  { mal_id: 813, title: "Dragon Ball Z", score: 8.2, episodes: 291, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1607/117212.jpg" } } },
  { mal_id: 21, title: "One Piece", score: 8.7, episodes: 1100, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg" } } },
  { mal_id: 31964, title: "Boku no Hero Academia", score: 7.9, episodes: 13, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/10/78745.jpg" } } },
  { mal_id: 30276, title: "One Punch Man", score: 8.5, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/12/76049.jpg" } } },
  { mal_id: 34572, title: "Black Clover", score: 8.1, episodes: 170, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/2/88336.jpg" } } },
  { mal_id: 269, title: "Bleach", score: 7.9, episodes: 366, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/3/40451.jpg" } } },
  { mal_id: 44511, title: "Chainsaw Man", score: 8.5, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg" } } },
  { mal_id: 16498, title: "Shingeki no Kyojin", score: 8.5, episodes: 25, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg" } } },
  { mal_id: 32182, title: "Mob Psycho 100", score: 8.5, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1918/96303.jpg" } } },
  { mal_id: 1535, title: "Death Note", score: 8.6, episodes: 37, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/9/9444.jpg" } } },
  { mal_id: 22319, title: "Tokyo Ghoul", score: 7.8, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/5/64449.jpg" } } },
  { mal_id: 48583, title: "Shingeki no Kyojin Final", score: 8.8, episodes: 16, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg" } } },
  { mal_id: 50265, title: "Spy x Family", score: 8.5, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg" } } },
  { mal_id: 20583, title: "Haikyuu!!", score: 8.4, episodes: 25, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/7/76014.jpg" } } },
  { mal_id: 49596, title: "Blue Lock", score: 8.2, episodes: 24, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg" } } },
  { mal_id: 11771, title: "Kuroko no Basket", score: 8.0, episodes: 25, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/11/50837.jpg" } } },
  { mal_id: 6702, title: "Fairy Tail", score: 7.6, episodes: 175, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/6/73249.jpg" } } },
  { mal_id: 3588, title: "Soul Eater", score: 7.8, episodes: 51, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/9/75438.jpg" } } },
  { mal_id: 14719, title: "JoJo no Kimyou na Bouken", score: 8.1, episodes: 26, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/3/40409.jpg" } } },
  { mal_id: 20507, title: "Noragami", score: 7.9, episodes: 12, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/11/59385.jpg" } } },
  { mal_id: 38691, title: "Dr. STONE", score: 8.3, episodes: 24, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1613/102576.jpg" } } },
  { mal_id: 39535, title: "Mushoku Tensei", score: 8.4, episodes: 11, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1530/117776.jpg" } } },
  { mal_id: 29803, title: "Overlord", score: 7.9, episodes: 13, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1079/138694.jpg" } } },
  { mal_id: 37430, title: "Slime Datta Ken", score: 8.1, episodes: 24, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/1183/102874.jpg" } } },
  { mal_id: 918, title: "Gintama", score: 8.9, episodes: 201, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/10/73274.jpg" } } },
  { mal_id: 19, title: "Monster", score: 8.9, episodes: 74, images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/10/18793.jpg" } } }
];

const ACTION_ANIMES = [...SHONEN_ANIMES];
const FANTASY_ANIMES = [...SHONEN_ANIMES];
const MYSTERY_ANIMES = [...SHONEN_ANIMES];
const SCIFI_ANIMES = [...SHONEN_ANIMES];
const ROMANCE_ANIMES = [...SHONEN_ANIMES];
const COMEDY_ANIMES = [...SHONEN_ANIMES];
const SPORTS_ANIMES = [...SHONEN_ANIMES];
const SUPERNATURAL_ANIMES = [...SHONEN_ANIMES];

window.convertAnimeToPosterLi = function convertAnimeToPosterLi(anime) {
  const imageUrl = anime.images?.jpg?.image_url || window.FALLBACK_COVER;
  const scoreFormatted = anime.score ? anime.score.toFixed(1) : '--';
  const episodesText = anime.episodes ? `${anime.episodes} eps` : '? eps';

  return `
    <li class="carousel-card" onclick="handleCardClick(${anime.mal_id})">
      <div class="poster-container">
        <img src="${imageUrl}" alt="${anime.title}" class="poster-img" loading="lazy" onerror="this.onerror=null; this.src=window.FALLBACK_COVER;">
        <div class="rating-badge">★ ${scoreFormatted}</div>
      </div>
      <div class="card-info">
        <h4 class="card-title">${anime.title}</h4>
        <span class="card-episodes">${episodesText}</span>
      </div>
    </li>
  `;
};
const convertAnimeToPosterLi = window.convertAnimeToPosterLi;

// RESTAURAR PÁGINA INICIAL COMPLETA (HOME)
window.resetToHomePage = function resetToHomePage() {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const searchInput = document.getElementById('search-input');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (searchInput) searchInput.value = '';
    if (heroBanner) heroBanner.style.display = 'flex';
    if (detailsDrawer) detailsDrawer.classList.remove('active');

    if (mainPageTitle) mainPageTitle.textContent = 'AniVault';
    if (mainPageSubtitle) mainPageSubtitle.textContent = 'Do clássico ao lançamento: monte sua lista e ative o modo maratona!';

    document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
    const homeBtn = document.getElementById('navHome') || document.querySelector('.nav-home-btn');
    if (homeBtn) homeBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!mainContentContainer) return;

    mainContentContainer.innerHTML = `
      <section class="category-section">
        <h3 class="category-title">Em Alta no Momento</h3>
        <ul class="animes-row" id="topAnimesRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Shonen & Seinen</h3>
        <ul class="animes-row" id="shonenRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Animes de Ação</h3>
        <ul class="animes-row" id="actionRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Fantasia & Isekai</h3>
        <ul class="animes-row" id="fantasyRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Mistério e Psicológicos</h3>
        <ul class="animes-row" id="mysteryRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Ficção Científica</h3>
        <ul class="animes-row" id="scifiRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Romance e Drama</h3>
        <ul class="animes-row" id="romanceRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Comédia</h3>
        <ul class="animes-row" id="comedyRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Esportes</h3>
        <ul class="animes-row" id="sportsRow"></ul>
      </section>
      <section class="category-section">
        <h3 class="category-title">Sobrenatural</h3>
        <ul class="animes-row" id="supernaturalRow"></ul>
      </section>
    `;

    loadCategoryRows();
  } catch (err) {
    console.error('Erro ao restaurar home:', err);
  }
};
const resetToHomePage = window.resetToHomePage;

// VISUALIZAÇÃO DA BIBLIOTECA
window.loadLibraryView = function loadLibraryView(filter = 'all') {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (heroBanner) heroBanner.style.display = 'none';
    if (detailsDrawer) detailsDrawer.classList.remove('active');
    if (mainPageTitle) mainPageTitle.textContent = '🩵 Minha Biblioteca';
    if (mainPageSubtitle) mainPageSubtitle.textContent = 'Gerencie seus animes salvos e progresso de episódios assistidos.';

    document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
    const libBtn = document.getElementById('navLibrary');
    if (libBtn) libBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mainContentContainer) {
      mainContentContainer.innerHTML = `
        <section class="category-section" style="width: 100%;">
          <ul class="animes-grid-full" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; padding: 1rem 0; list-style: none; margin: 0;">
            ${SHONEN_ANIMES.slice(0, 30).map(convertAnimeToPosterLi).join('')}
          </ul>
        </section>
      `;
    }
  } catch (err) {
    console.error('Erro biblioteca:', err);
  }
};

// VISUALIZAÇÃO DE DESCOBRIR
window.loadDiscoverView = function loadDiscoverView() {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (heroBanner) heroBanner.style.display = 'none';
    if (detailsDrawer) detailsDrawer.classList.remove('active');
    if (mainPageTitle) mainPageTitle.textContent = '🧭 Descobrir Animes';
    if (mainPageSubtitle) mainPageSubtitle.textContent = 'Recomendações aleatórias e destaques da temporada para você explorar.';

    document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
    const discBtn = document.getElementById('navDiscover');
    if (discBtn) discBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mainContentContainer) {
      mainContentContainer.innerHTML = `
        <section class="category-section" style="width: 100%;">
          <ul class="animes-grid-full" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; padding: 1rem 0; list-style: none; margin: 0;">
            ${SHONEN_ANIMES.slice(0, 30).map(convertAnimeToPosterLi).join('')}
          </ul>
        </section>
      `;
    }
  } catch (err) {
    console.error('Erro descobrir:', err);
  }
};

// VISUALIZAÇÃO DE COMUNIDADE
window.loadCommunityView = function loadCommunityView() {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (heroBanner) heroBanner.style.display = 'none';
    if (detailsDrawer) detailsDrawer.classList.remove('active');
    if (mainPageTitle) mainPageTitle.textContent = '👥 Comunidade AniVault';
    if (mainPageSubtitle) mainPageSubtitle.textContent = 'Veja a opinião de outros otakus e compartilhe suas análises.';

    document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
    const commBtn = document.getElementById('navCommunity');
    if (commBtn) commBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mainContentContainer) {
      mainContentContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(0, 210, 211, 0.2); padding: 2.5rem; border-radius: 16px; text-align: center;">
          <h3 style="color: #00d2d3; font-size: 1.5rem; margin-top: 0;">💬 Mural da Comunidade AniVault</h3>
          <p style="color: #94a3b8; font-size: 1rem;">Conecte-se com outros otakus, troque recomendações e participe dos debates sobre os episódios da semana!</p>
        </div>
      `;
    }
  } catch (err) {
    console.error('Erro comunidade:', err);
  }
};

// VISUALIZAÇÃO DE PERFIL
window.loadProfileView = function loadProfileView() {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (heroBanner) heroBanner.style.display = 'none';
    if (detailsDrawer) detailsDrawer.classList.remove('active');
    if (mainPageTitle) mainPageTitle.textContent = '👤 Meu Perfil';
    if (mainPageSubtitle) mainPageSubtitle.textContent = 'Estatísticas de maratona, nível e preferências.';

    document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
    const profBtn = document.getElementById('navProfile');
    if (profBtn) profBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mainContentContainer) {
      mainContentContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(0, 210, 211, 0.2); padding: 2rem; border-radius: 16px; display: flex; gap: 2rem; align-items: center;">
          <div style="font-size: 4rem; background: rgba(0,210,211,0.1); padding: 1rem; border-radius: 50%;">👤</div>
          <div>
            <h3 style="color: #ffffff; font-size: 1.5rem; margin: 0 0 0.5rem 0;">Otaku Member</h3>
            <p style="color: #00d2d3; font-size: 1rem; font-weight: 600; margin: 0;">⚡ Maratonista de Nível 5</p>
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Erro perfil:', err);
  }
};

// Carregador das categorias na Home
window.loadCategoryRows = function loadCategoryRows() {
  const categories = [
    { id: 'topAnimesRow', localData: INITIAL_ANIMES },
    { id: 'shonenRow', localData: SHONEN_ANIMES.slice(0, 10) },
    { id: 'actionRow', localData: ACTION_ANIMES.slice(0, 10) },
    { id: 'fantasyRow', localData: FANTASY_ANIMES.slice(0, 10) },
    { id: 'mysteryRow', localData: MYSTERY_ANIMES.slice(0, 10) },
    { id: 'scifiRow', localData: SCIFI_ANIMES.slice(0, 10) },
    { id: 'romanceRow', localData: ROMANCE_ANIMES.slice(0, 10) },
    { id: 'comedyRow', localData: COMEDY_ANIMES.slice(0, 10) },
    { id: 'sportsRow', localData: SPORTS_ANIMES.slice(0, 10) },
    { id: 'supernaturalRow', localData: SUPERNATURAL_ANIMES.slice(0, 10) }
  ];

  categories.forEach(cat => {
    const row = document.getElementById(cat.id);
    if (row) {
      row.innerHTML = cat.localData.map(convertAnimeToPosterLi).join('');
    }
  });
};
const loadCategoryRows = window.loadCategoryRows;

// DESENHADOR DE PAGINAÇÃO DINÂMICA DESLIZANTE (SEM LIMITE FIXO DE 50)
function renderPaginationControls(genreId, categoryName, currentPage, totalPages) {
  let html = `<div class="pagination-container">`;

  // 1. Botão Anterior
  if (currentPage > 1) {
    html += `<button onclick="loadCategoryView('${genreId}', '${categoryName}', ${currentPage - 1})" class="page-btn">◀ Anterior</button>`;
  }

  // 2. Cálculo da Janela Deslizante Infinita (gera sempre páginas para frente)
  const maxVis = totalPages ? Math.min(totalPages, currentPage + 4) : currentPage + 4;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = totalPages ? Math.min(totalPages, startPage + 4) : startPage + 4;

  if (endPage - startPage < 4 && startPage > 1) {
    startPage = Math.max(1, endPage - 4);
  }

  // Mostra o botão página 1 se estiver em outras páginas
  if (startPage > 1) {
    html += `<button onclick="loadCategoryView('${genreId}', '${categoryName}', 1)" class="page-btn">1</button>`;
    if (startPage > 2) html += `<span style="color:#94a3b8; padding:0 0.3rem;">...</span>`;
  }

  // Renderiza as 5 páginas deslizantes ativas (ex: se currentPage = 50, gera 48, 49, 50, 51, 52)
  for (let i = startPage; i <= endPage; i++) {
    const activeClass = (i === currentPage) ? 'active' : '';
    html += `<button onclick="loadCategoryView('${genreId}', '${categoryName}', ${i})" class="page-btn ${activeClass}">${i}</button>`;
  }

  // Se houver um limite total informado pela API e estiver longe dele, mostra o atalho final
  if (totalPages && endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span style="color:#94a3b8; padding:0 0.3rem;">...</span>`;
    html += `<button onclick="loadCategoryView('${genreId}', '${categoryName}', ${totalPages})" class="page-btn">${totalPages}</button>`;
  }

  // 3. Botão Próximo (Gera continuamente enquanto o usuário clicar para avançar)
  if (!totalPages || currentPage < totalPages) {
    html += `<button onclick="loadCategoryView('${genreId}', '${categoryName}', ${currentPage + 1})" class="page-btn">Próximo ▶</button>`;
  }

  html += `</div>`;
  return html;
}

// FUNÇÃO PARA CARREGAR A GRADE DE UMA CATEGORIA ESPECÍFICA CLICADA NA SIDEBAR
window.loadCategoryView = async function loadCategoryView(genreId, categoryName, page = 1) {
  try {
    const mainPageTitle = document.getElementById('mainPageTitle');
    const mainPageSubtitle = document.getElementById('mainPageSubtitle');
    const mainContentContainer = document.getElementById('mainContentContainer');
    const heroBanner = document.getElementById('heroBanner');
    const detailsDrawer = document.getElementById('detailsDrawer');

    if (heroBanner) heroBanner.style.display = 'none';
    if (detailsDrawer) detailsDrawer.classList.remove('active');

    if (!mainContentContainer) return;

    if (mainPageTitle) mainPageTitle.textContent = `Animes de ${categoryName}`;
    if (mainPageSubtitle) mainPageSubtitle.textContent = `Explorando o catálogo da categoria ${categoryName}.`;

    mainContentContainer.innerHTML = `<div class="empty-msg" style="padding: 3rem; text-align: center; color: #00d2d3; font-size: 1.1rem; font-weight: 600;">⏳ Carregando catálogo de ${categoryName} (Página ${page})...</div>`;

    let animesList = [];
    let totalPagesReal = null;
    try {
      if (window.animeApi && window.animeApi.getAnimesByGenre) {
        const res = await window.animeApi.getAnimesByGenre(genreId, page, 30);
        if (res && res.data && res.data.length > 0) {
          animesList = res.data;
          totalPagesReal = res.totalPages || null;
        }
      }
    } catch (e) {
      console.warn('Erro ao buscar API, usando dados locais:', e);
    }

    if (!animesList || animesList.length === 0) {
      animesList = SHONEN_ANIMES.slice(0, 30);
    }

    mainContentContainer.innerHTML = `
      <section class="category-section" style="width: 100%;">
        <ul class="animes-grid-full" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; padding: 1rem 0; list-style: none; margin: 0;">
          ${animesList.map(convertAnimeToPosterLi).join('')}
        </ul>
      </section>
    `;

    mainContentContainer.innerHTML += renderPaginationControls(genreId, categoryName, page, totalPagesReal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Erro ao carregar categoria:', err);
  }
};
const loadCategoryView = window.loadCategoryView;

// Clique no card de um anime na grade
window.handleCardClick = function handleCardClick(malId) {
  let anime = SHONEN_ANIMES.find(a => a.mal_id === malId) || INITIAL_ANIMES.find(a => a.mal_id === malId);

  if (anime) {
    openAnimeDrawer(anime);
  } else {
    openAnimeDrawer({
      mal_id: malId,
      title: 'Anime Selecionado',
      score: 8.5,
      episodes: 12
    });
  }
};
const handleCardClick = window.handleCardClick;

// Abre a Gaveta Lateral com os Episódios
window.openAnimeDrawer = function openAnimeDrawer(anime) {
  const detailsDrawer = document.getElementById('detailsDrawer');
  const drawerCover = document.getElementById('drawerCover');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerRating = document.getElementById('drawerRating');
  const episodesList = document.getElementById('episodesList');

  if (!detailsDrawer) return;

  if (drawerCover) drawerCover.src = anime.images?.jpg?.image_url || window.FALLBACK_COVER;
  if (drawerTitle) drawerTitle.textContent = anime.title;
  if (drawerRating) drawerRating.textContent = `★ ${anime.score ? anime.score.toFixed(1) : '--'}/10`;

  if (episodesList) {
    const totalEps = anime.episodes || 12;
    const savedWatched = JSON.parse(localStorage.getItem(`anivault_watched_${anime.mal_id}`) || '[]');

    let epsHtml = '';
    for (let i = 1; i <= totalEps; i++) {
      const isChecked = savedWatched.includes(i) ? 'checked' : '';
      epsHtml += `
        <li>
          <label style="display: flex; align-items: center; gap: 0.8rem; cursor: pointer;">
            <input type="checkbox" ${isChecked} onchange="updateProgress(${anime.mal_id}, ${totalEps})" style="accent-color: #00d2d3; width: 18px; height: 18px;">
            <span>Episódio ${i}</span>
          </label>
        </li>
      `;
    }
    episodesList.innerHTML = epsHtml;
    updateProgress(anime.mal_id, totalEps);
  }

  detailsDrawer.classList.add('active');
};
const openAnimeDrawer = window.openAnimeDrawer;

// Atualiza progresso dos episódios
window.updateProgress = function updateProgress(malId, totalEps) {
  const episodesList = document.getElementById('episodesList');
  const progressText = document.getElementById('progressText');
  const remainingText = document.getElementById('remainingText');
  const progressBarFill = document.getElementById('progressBarFill');

  if (!episodesList) return;
  const checkboxes = episodesList.querySelectorAll('input[type="checkbox"]');
  let checkedCount = 0;
  const watchedEps = [];

  checkboxes.forEach((cb, index) => {
    if (cb.checked) {
      checkedCount++;
      watchedEps.push(index + 1);
    }
  });

  localStorage.setItem(`anivault_watched_${malId}`, JSON.stringify(watchedEps));

  const percentage = totalEps > 0 ? Math.round((checkedCount / totalEps) * 100) : 0;
  const remaining = totalEps - checkedCount;

  if (progressText) progressText.textContent = `${checkedCount} de ${totalEps} assistidos (${percentage}%)`;
  if (remainingText) remainingText.textContent = `${remaining} eps restantes`;
  if (progressBarFill) progressBarFill.style.width = `${percentage}%`;
};
const updateProgress = window.updateProgress;

// Executa o carregamento inicial ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const detailsDrawer = document.getElementById('detailsDrawer');
  const searchInputElement = document.getElementById('search-input');

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      if (detailsDrawer) detailsDrawer.classList.remove('active');
    });
  }

  // Interceptador Global de Cliques na Sidebar (Funciona perfeitamente com spans, botões e links)
  const sidebarEl = document.querySelector('.sidebar');
  if (sidebarEl) {
    sidebarEl.addEventListener('click', (e) => {
      const link = e.target.closest('a') || e.target.closest('.logo');
      if (!link) return;

      const text = link.textContent.trim();
      const genreId = link.getAttribute('data-genre');

      // 1. Clique em INÍCIO ou LOGO -> Volta para a Home (Foto 2)
      if (text.includes('Início') || link.classList.contains('logo') || link.id === 'navHome' || link.id === 'logoBtn' || link.classList.contains('nav-home-btn')) {
        e.preventDefault();
        resetToHomePage();
        return;
      }

      // 2. Clique em CATEGORIA com ID de Gênero
      if (genreId || link.classList.contains('category-item')) {
        e.preventDefault();
        document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        loadCategoryView(genreId || '1', text);
        return;
      }

      // 3. Clique em BIBLIOTECA ou seus sub-itens (Minha Lista, Assistindo, etc.)
      if (text.includes('Biblioteca') || text.includes('Minha Lista') || text.includes('Assistindo') || text.includes('Concluídos') || text.includes('Planejo Assistir')) {
        e.preventDefault();
        document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        loadLibraryView(text);
        return;
      }

      // 4. Clique em DESCOBRIR
      if (text.includes('Descobrir')) {
        e.preventDefault();
        document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        loadDiscoverView();
        return;
      }

      // 5. Clique em COMUNIDADE
      if (text.includes('Comunidade')) {
        e.preventDefault();
        document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        loadCommunityView();
        return;
      }

      // 6. Clique em PERFIL
      if (text.includes('Perfil')) {
        e.preventDefault();
        document.querySelectorAll('.nav-item, .sub-item').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        loadProfileView();
        return;
      }
    });
  }

    // 6. EVENTO DA BARRA DE PESQUISA GLOBAL (API DO JIKAN + BUSCA LOCAL DE RESERVA)
  if (searchInputElement) {
    searchInputElement.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      const mainPageTitle = document.getElementById('mainPageTitle');
      const mainPageSubtitle = document.getElementById('mainPageSubtitle');
      const mainContentContainer = document.getElementById('mainContentContainer');
      const heroBanner = document.getElementById('heroBanner');

      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(async () => {
        if (query.length > 1) {
          if (heroBanner) heroBanner.style.display = 'none';

          if (mainPageTitle) mainPageTitle.textContent = `Resultados para "${query}"`;
          if (mainPageSubtitle) mainPageSubtitle.textContent = `Buscando animes relacionados a "${query}".`;
          if (mainContentContainer) {
            mainContentContainer.innerHTML = `<div style="padding: 3rem; text-align: center; color: #00d2d3; font-weight: 600;">🔍 Buscando "${query}"...</div>`;
          }

          let results = [];
          try {
            if (window.animeApi && window.animeApi.searchAnimes) {
              const data = await window.animeApi.searchAnimes(query);
              if (data && data.length > 0) {
                results = data;
              }
            }
          } catch (error) {
            console.error('Erro na busca da API:', error);
          }

          // Se a API pública oscilar ou demorar, busca instantaneamente nos animes cadastrados:
          if (!results || results.length === 0) {
            results = SHONEN_ANIMES.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
          }

          if (results && results.length > 0) {
            mainContentContainer.innerHTML = `
              <section class="category-section" style="width: 100%;">
                <ul class="animes-grid-full" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; padding: 1rem 0; list-style: none; margin: 0;">
                  ${results.map(convertAnimeToPosterLi).join('')}
                </ul>
              </section>
            `;
          } else if (mainContentContainer) {
            mainContentContainer.innerHTML = `<p style="padding: 2rem; color: #94a3b8; text-align: center;">Nenhum anime encontrado para "${query}". Tente outro nome!</p>`;
          }
        } else if (query.length === 0) {
          resetToHomePage();
        }
      }, 300);
    });
  }

  // Carrega os trilhos/categorias iniciais da Home
  loadCategoryRows();
});
    
 

 