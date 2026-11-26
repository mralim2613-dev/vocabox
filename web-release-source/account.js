import { createClient } from '@supabase/supabase-js';
import './account.css';
import { connectAccountStorage } from './account-storage.js';

const project = 'https://mhegdrwpqtemmsxemyql.supabase.co';
const publishableKey = 'sb_publishable_Ox0qNdr4xuGdmMOeU-h4Vg_jIqU0Vji';
const client = createClient(project, publishableKey, {
  auth: { flowType: 'pkce', storageKey: 'vocabox-mhegdrwpqtemmsxemyql-session' },
});
const { auth } = client;
window.vocaboxAccountStorage = connectAccountStorage(client, auth);
const returnUrl = new URL('/', location.origin).href;
const trigger = document.querySelector('#accountButton');
const dialog = document.createElement('dialog');
dialog.id = 'vocaboxAccount';
dialog.setAttribute('aria-labelledby', 'accountTitle');
dialog.innerHTML = `
  <div class="row between">
    <h2 id="accountTitle">Vocabox hesabı</h2>
    <button type="button" class="small" data-dismiss>Bağla</button>
  </div>
  <div data-guest>
    <form data-email-form>
      <div class="field">
        <label for="accountIdentity">İstifadəçi adı və ya e-poçt</label>
        <input id="accountIdentity" name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required>
      </div>
      <div class="field">
        <label for="accountPassword">Şifrə</label>
        <input id="accountPassword" name="password" type="password" autocomplete="current-password" required>
      </div>
      <div class="row">
        <button type="submit" class="primary" data-submit>Daxil ol</button>
        <button type="button" data-register>Hesab yarat</button>
      </div>
    </form>
  </div>
  <div data-member hidden>
    <p data-member-email></p>
    <button type="button" data-sign-out>Hesabdan çıx</button>
  </div>
  <p class="helper" data-status role="status"></p>
`;
document.body.append(dialog);

const find = (selector) => dialog.querySelector(selector);
const emailForm = find('[data-email-form]');
const password = find('#accountPassword');
const identity = find('#accountIdentity');
const identityLabel = find('label[for="accountIdentity"]');
const accountDomain = '@vocabox-account.example';
const usernamePattern = /^[a-z0-9_]{3,24}$/;
const registration = find('[data-register]');
const submit = find('[data-submit]');
const status = find('[data-status]');
let registering = false;
let busy = false;
let settings;

function updateAvailability() {
  registration.disabled = busy || settings?.external?.email === false;
  submit.disabled = busy || settings?.external?.email === false;
  find('[data-sign-out]').disabled = busy;
}

async function refreshAvailability() {
  try {
    const response = await fetch(`${project}/auth/v1/settings`, {
      headers: { apikey: publishableKey },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Auth settings unavailable');
    settings = await response.json();

  } catch {
    settings = undefined;
  }
  updateAvailability();
}

function setRegistration(enabled) {
  registering = enabled;
  submit.textContent = enabled ? 'Qeydiyyatdan keç' : 'Daxil ol';
  registration.textContent = enabled ? 'Girişə qayıt' : 'Hesab yarat';
  identityLabel.textContent = enabled ? 'İstifadəçi adı' : 'İstifadəçi adı və ya e-poçt';
  password.autocomplete = enabled ? 'new-password' : 'current-password';
  password.minLength = enabled ? 8 : 0;
}

function displaySession(session) {
  const user = session?.user;
  find('[data-guest]').hidden = Boolean(user);
  find('[data-member]').hidden = !user;
  const email = user?.email || '';
  find('[data-member-email]').textContent = email.endsWith(accountDomain)
    ? email.slice(0, -accountDomain.length)
    : email;
  trigger.textContent = user ? 'Hesabım' : 'Daxil ol';
  if (user) {
    emailForm.reset();
    setRegistration(false);
  }
}

function errorText(error) {
  const messages = {
    invalid_credentials: 'İstifadəçi adı, e-poçt və ya şifrə yanlışdır.',
    invalid_signup: 'İstifadəçi adı 3–24 latın hərfi, rəqəm və ya alt xətdən ibarət olmalıdır. Şifrə ən azı 8 simvol və ən çoxu 72 bayt olmalıdır.',
    username_taken: 'Bu istifadəçi adı artıq götürülüb.',
    signup_unavailable: 'Qeydiyyat hazırda mümkün deyil. Bir qədər sonra yenidən cəhd edin.',
    email_not_confirmed: 'Əvvəlcə e-poçt ünvanınızı təsdiqləyin.',
    email_address_not_authorized: 'Bu ünvana təsdiq e-poçtu göndərilə bilmədi.',
    weak_password: 'Daha güclü şifrə seçin.',
    over_email_send_rate_limit: 'Bir qədər gözləyib yenidən cəhd edin.',
    over_request_rate_limit: 'Bir qədər gözləyib yenidən cəhd edin.',
  };
  return messages[error?.code] || 'Əməliyyat tamamlanmadı. Yenidən cəhd edin.';
}

async function run(action) {
  if (busy) return;
  busy = true;
  status.textContent = '';
  updateAvailability();
  try {
    await action();
  } catch (error) {
    status.textContent = errorText(error);
  } finally {
    busy = false;
    updateAvailability();
  }
}

function openAccount() {
  if (!dialog.open) dialog.showModal();
  void refreshAvailability();
}

trigger.addEventListener('click', openAccount);
find('[data-dismiss]').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  password.value = '';
  status.textContent = '';
});
registration.addEventListener('click', () => {
  setRegistration(!registering);
  status.textContent = '';
});
emailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (registering && registration.disabled) return;
  const login = identity.value.trim().toLowerCase();
  const creating = registering;
  const credentials = {
    email: login.includes('@') ? login : login + accountDomain,
    password: password.value,
  };
  void run(async () => {
    if (creating) {
      if (!usernamePattern.test(login) || new TextEncoder().encode(credentials.password).length > 72) {
        throw { code: 'invalid_signup' };
      }
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password: credentials.password }),
      });
      if (!response.ok) throw await response.json();
      setRegistration(false);
    }
    const { error } = await auth.signInWithPassword(credentials);
    if (error) throw error;
  });
});
find('[data-sign-out]').addEventListener('click', () => void run(async () => {
  await window.vocaboxAccountStorage.flush();
  const { error } = await auth.signOut({ scope: 'local' });
  if (error) throw error;
}));

auth.onAuthStateChange((event, session) => {
  displaySession(session);
  if (event === 'INITIAL_SESSION' && !session && !dialog.open) openAccount();
});
const callback = new URL(location.href);
const callbackError = callback.searchParams.get('error_code') ||
  new URLSearchParams(callback.hash.slice(1)).get('error_code');
if (callbackError) {
  status.textContent = errorText({ code: callbackError });
  openAccount();
  history.replaceState(null, '', returnUrl);
}
