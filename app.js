let players = [];

fetch('players.json')
  .then(response => response.json())
  .then(data => {
    players = data;
    showHome();
  });

const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  sideMenu.classList.toggle('active');
  overlay.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  const isClickInside = sideMenu.contains(e.target) || menuToggle.contains(e.target);
  if (!isClickInside) {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  }
});

function showHome() {
  const homePage = document.getElementById('homePage');
  const featuredPage = document.getElementById('featuredPage');

  featuredPage.classList.remove('active');
  
  setTimeout(() => {
    featuredPage.style.display = 'none';
    homePage.style.display = 'flex';
    setTimeout(() => homePage.classList.add('active'), 10);
  }, 300);

  const main = document.getElementById('playerOfWeek');
  if (players.length > 0) {
    const bestPlayer = players[0];
    main.innerHTML = `
      <div class="home-content">
        <h2>${bestPlayer.name}</h2>
        <div class="player-background">
          <img src="images/placeholder-bg.jpg" class="placeholder-bg" alt="Background">
          <img src="images/${bestPlayer.playerImage}" class="player-photo" alt="${bestPlayer.name}">
        </div>
        <img src="images/${bestPlayer.teamLogo}" class="team-logo" alt="${bestPlayer.team}">
        <div class="player-stats">
          <span class="stat">${bestPlayer.points}<span class="stat-label">PTS</span></span>
          <span class="stat">${bestPlayer.assists}<span class="stat-label">AST</span></span>
          <span class="stat">${bestPlayer.blocks}<span class="stat-label">BLK</span></span>
        </div>
      </div>`;
  } else {
    main.innerHTML = '<p>Loading...</p>';
  }
}

function closeMenu() {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
}

function showFeatured() {
  const homePage = document.getElementById('homePage');
  const featuredPage = document.getElementById('featuredPage');

  homePage.classList.remove('active');
  setTimeout(() => {
    homePage.style.display = 'none';
    featuredPage.style.display = 'block';
    setTimeout(() => featuredPage.classList.add('active'), 10);
  }, 300);

  const featured = document.getElementById('featuredPlayers');
  featured.innerHTML = '';

  const backgrounds = ['yellow.png', 'green.png', 'orange.png'];

  for (let i = 1; i <= 3; i++) {
    const p = players[i];
    const bgImage = backgrounds[i - 1];
    featured.innerHTML += `
    <div class="featured-card" style="background-image: url('images/${bgImage}');">
      <div class="featured-image-container">
        <img src="images/${p.teamLogo}" class="team-logo-bg" alt="${p.team}">
        <img src="images/${p.playerImage}" class="featured-player-photo" alt="${p.name}">
      </div>
      <div class="featured-stats">
        <h5>${p.name}</h5>
        <div class="stat-line">${p.points} PTS • ${p.assists} AST  ${p.blocks} BLK</div>
      </div>
    </div>`;
  }
}