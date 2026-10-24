const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton =
  document.querySelector<HTMLButtonElement>('.motion-toggle');
const motionAllowed = () =>
  !reducedMotion.matches && root.dataset.motion !== 'paused';

function updateMotionButton() {
  const paused = root.dataset.motion === 'paused';
  motionButton?.setAttribute('aria-pressed', String(paused));
  const label = paused ? '恢复装饰动效' : '暂停装饰动效';
  motionButton?.setAttribute('aria-label', label);
  motionButton?.setAttribute('title', label);
}
updateMotionButton();
motionButton?.addEventListener('click', () => {
  const paused = root.dataset.motion !== 'paused';
  root.dataset.motion = paused ? 'paused' : 'running';
  try {
    sessionStorage.setItem('ltyyb-motion', paused ? 'paused' : 'running');
  } catch {
    /* Storage is optional. */
  }
  updateMotionButton();
});

// Content remains visible without JavaScript or when motion is reduced.
if ('IntersectionObserver' in window) {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.removeAttribute('data-pending');
        element.setAttribute('data-visible', '');
        revealObserver.unobserve(element);
      });
    },
    { threshold: 0.08 },
  );
  reveals.forEach((element) => {
    if (
      motionAllowed() &&
      element.getBoundingClientRect().top > window.innerHeight
    )
      element.setAttribute('data-pending', '');
    revealObserver.observe(element);
  });
  const decorationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle('offscreen', !entry.isIntersecting),
      );
    },
    { rootMargin: '80px' },
  );
  document
    .querySelectorAll(
      '.hero-visual, .playground-art, .rhythm-strip, .values-star',
    )
    .forEach((element) => decorationObserver.observe(element));
}

reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  document
    .querySelectorAll('[data-pending]')
    .forEach((element) => element.removeAttribute('data-pending'));
});

const playground = document.querySelector<HTMLElement>('.playground');
const copy = document.querySelector<HTMLElement>('.mode-copy');
const descriptions: Record<string, string> = {
  touch: '点、划、长按。小小的屏幕，也装得下整首歌的起伏。',
  keys: '跟着节拍落下的指尖，把每一串配置变成熟悉的手感。',
  arcade: '接住向外延伸的音符，跟着星星划过轨迹。双手之间，都是节奏。',
};
document
  .querySelectorAll<HTMLButtonElement>('.mode-buttons button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      if (!mode || !playground || !copy || !descriptions[mode]) return;
      playground.dataset.mode = mode;
      copy.textContent = descriptions[mode];
      document
        .querySelectorAll('.mode-buttons button')
        .forEach((item) =>
          item.setAttribute('aria-pressed', String(item === button)),
        );
    });
  });

const beatButton = document.querySelector<HTMLButtonElement>('.beat-trigger');
const heroVisual = document.querySelector<HTMLElement>('.hero-visual');
const feedback = document.querySelector<HTMLElement>('.beat-feedback');
let beatCount = 0;
let resetFeedback: ReturnType<typeof setTimeout>;
beatButton?.addEventListener('click', () => {
  if (!heroVisual || !feedback) return;
  beatCount += 1;
  feedback.textContent = ['IN SYNC.', 'NICE BEAT.', 'ONE MORE?'][
    (beatCount - 1) % 3
  ];
  feedback.setAttribute('aria-label', `已回应 ${beatCount} 次节拍`);
  if (motionAllowed()) {
    heroVisual.classList.remove('is-beating');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => heroVisual.classList.add('is-beating')),
    );
  }
  clearTimeout(resetFeedback);
  resetFeedback = setTimeout(() => {
    feedback.textContent = '';
    heroVisual.classList.remove('is-beating');
  }, 1200);
});
