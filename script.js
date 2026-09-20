const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const openButton = document.getElementById('openInvitation');
const soundButton = document.getElementById('soundToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

let isPlaying = false;
let trackIndex = 0;
const musicTracks = [
  'assets/mobile-audio/part-00.mp3',
  'assets/mobile-audio/part-01.mp3',
  'assets/mobile-audio/part-02.mp3',
  'assets/mobile-audio/part-03.mp3',
  'assets/mobile-audio/part-04.mp3'
];
backgroundMusic.src = musicTracks[trackIndex];

backgroundMusic.addEventListener('ended', async () => {
  trackIndex = (trackIndex + 1) % musicTracks.length;
  backgroundMusic.src = musicTracks[trackIndex];
  if (isPlaying) await backgroundMusic.play();
});

async function startMusic() {
  backgroundMusic.volume = .58;
  try {
    await backgroundMusic.play();
    isPlaying = true;
  } catch (_) {
    isPlaying = false;
  }
  soundButton.classList.remove('muted');
  soundButton.setAttribute('aria-label', 'Couper la musique');
}

function stopMusic() {
  isPlaying = false;
  backgroundMusic.pause();
  soundButton.classList.add('muted');
  soundButton.setAttribute('aria-label', 'Activer la musique');
}

openButton.addEventListener('click', () => {
  cover.classList.add('opened');
  invitation.classList.add('visible');
  invitation.setAttribute('aria-hidden', 'false');
  soundButton.classList.add('visible');
  startMusic();
  window.setTimeout(() => document.querySelector('.hero .reveal').classList.add('in'), 250);
});

soundButton.addEventListener('click', () => {
  if (isPlaying) stopMusic();
  else startMusic();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function updateCountdown() {
  const wedding = new Date('2026-10-31T14:00:00+01:00').getTime();
  const distance = Math.max(0, wedding - Date.now());
  document.getElementById('days').textContent = Math.floor(distance / 86400000);
  document.getElementById('hours').textContent = String(Math.floor(distance % 86400000 / 3600000)).padStart(2,'0');
  document.getElementById('minutes').textContent = String(Math.floor(distance % 3600000 / 60000)).padStart(2,'0');
  document.getElementById('seconds').textContent = String(Math.floor(distance % 60000 / 1000)).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
