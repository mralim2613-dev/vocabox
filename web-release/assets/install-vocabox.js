const button = document.querySelector('#installVocabox');
const instructions = document.querySelector('#installVocaboxInstructions');
const standalone = matchMedia('(display-mode: standalone)');
const appleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let installPrompt;

function updateButton() {
  button.hidden = standalone.matches || navigator.standalone === true ||
    (!installPrompt && !appleMobile);
  if (button.hidden) instructions.hidden = true;
}

addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  updateButton();
});

addEventListener('appinstalled', () => {
  installPrompt = undefined;
  button.hidden = true;
  instructions.hidden = true;
});

standalone.addEventListener('change', updateButton);
button.addEventListener('click', async () => {
  if (!installPrompt) {
    instructions.hidden = !instructions.hidden;
    button.setAttribute('aria-expanded', String(!instructions.hidden));
    return;
  }
  const prompt = installPrompt;
  button.disabled = true;
  try {
    await prompt.prompt();
  } catch {
    instructions.textContent = 'Brauzerin menyusundan “Tətbiqi quraşdır” seç.';
    instructions.hidden = false;
  } finally {
    installPrompt = undefined;
    button.disabled = false;
    button.hidden = true;
  }
});
updateButton();
