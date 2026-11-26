const table = 'vocabox_account_state';

export function connectAccountStorage(client, auth) {
  let initialUserId;
  let resolveReady;
  const ready = new Promise((resolve) => { resolveReady = resolve; });
  let generation = 0;
  let activeUserId;
  let timer;
  let pending;
  let writing = false;
  let revision = 0;
  let blocked = false;
  let readError = false;

  function showStatus(message) {
    const target = document.getElementById('accountStorageStatus');
    if (target) target.textContent = message;
  }

  auth.onAuthStateChange((event, session) => {
    const userId = session?.user?.id || null;
    if (event === 'INITIAL_SESSION') {
      initialUserId = userId;
      activeUserId = userId;
      resolveReady(userId);
    } else if (initialUserId !== undefined && userId !== activeUserId) {
      activeUserId = userId;
      generation += 1;
      clearTimeout(timer);
      location.reload();
    }
  });

  async function load(userId, local) {
    if (!userId || userId !== activeUserId) return local;
    const key = 'vocabox.cloud-revision.' + userId;
    revision = Number(localStorage.getItem(key)) || 0;
    try {
      const { data, error } = await client.from(table).select('snapshot,revision')
        .eq('user_id', userId).abortSignal(AbortSignal.timeout(6500)).maybeSingle();
      if (error) throw error;
      const dirty = localStorage.getItem(key + '.pending') === '1';
      if (dirty && revision !== (data?.revision || 0)) {
        blocked = true;
        showStatus('Başqa cihazda dəyişiklik var. Bu cihazdakı məlumatı qorumaq üçün ehtiyat nüsxə endir.');
        return local;
      }
      revision = data?.revision || 0;
      localStorage.setItem(key, String(revision));
      return dirty ? local : data?.snapshot || local;
    } catch {
      readError = true;
      showStatus('Bulud məlumatına qoşulmaq mümkün olmadı. Bu cihazdakı nüsxə açıldı.');
      return local;
    }
  }

  function save(userId, serialized) {
    if (!userId || userId !== activeUserId) return;
    const key = 'vocabox.cloud-revision.' + userId;
    if (!localStorage.getItem(key + '.pending') && serialized === lastSaved) return;
    localStorage.setItem(key + '.pending', '1');
    pending = { userId, serialized };
    clearTimeout(timer);
    if (!blocked && !readError) timer = setTimeout(flush, 900);
  }

  let lastSaved;
  function markLoaded(snapshot) {
    lastSaved = snapshot;
  }

  async function flush() {
    if (writing || blocked || readError || !pending || !navigator.onLine) return;
    const change = pending;
    const id = generation;
    const nextRevision = revision + 1;
    const key = 'vocabox.cloud-revision.' + change.userId;
    writing = true;
    try {
      const snapshot = JSON.parse(change.serialized);
      const rows = client.from(table);
      const request = revision === 0
        ? rows.insert({ user_id: change.userId, snapshot, revision: nextRevision })
        : rows.update({ snapshot, revision: nextRevision })
          .eq('user_id', change.userId).eq('revision', revision);
      const { data, error } = await request.select('revision')
        .abortSignal(AbortSignal.timeout(8000)).maybeSingle();
      if (id !== generation) return;
      if (error && error.code !== '23505') throw error;
      if (!data) {
        blocked = true;
        showStatus('Başqa cihazda dəyişiklik var. Bu cihazdakı məlumatı qorumaq üçün ehtiyat nüsxə endir.');
        return;
      }
      revision = data.revision;
      lastSaved = change.serialized;
      localStorage.setItem(key, String(revision));
      if (pending === change) {
        pending = undefined;
        localStorage.removeItem(key + '.pending');
      }
      showStatus('Hesabın məlumatları buludda saxlanılıb.');
    } catch {
      if (id === generation) showStatus('Buluda yazmaq mümkün olmadı. Məlumat bu cihazda saxlanılıb.');
    } finally {
      writing = false;
      if (pending && pending !== change && !blocked && !readError) timer = setTimeout(flush, 900);
    }
  }

  addEventListener('online', () => {
    if (readError && activeUserId) location.reload();
    else void flush();
  });
  addEventListener('focus', () => void flush());
  return { ready, load, save, markLoaded, flush };
}
