const copy = value => structuredClone(value);
const dict = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
export function stampChanges(previous, next, now = Date.now()) {
  next.modified = copy(dict(previous.modified));
  next.deleted = copy(dict(previous.deleted));
  for (const field of ['decks', 'items']) {
    const before = new Map(previous[field].map(row => [row.id, row]));
    const after = new Map(next[field].map(row => [row.id, row]));
    for (const [id, row] of after) {
      if (JSON.stringify(before.get(id)) !== JSON.stringify(row)) {
        next.modified[`${field}:${id}`] = now;
        delete next.deleted[`${field}:${id}`];
      }
    }
    for (const id of before.keys()) if (!after.has(id)) next.deleted[`${field}:${id}`] = now;
  }
  next.cloudRevision = previous.cloudRevision || 0;
  next.cloudDirty = true;
  return next;
}
export function mergeCloudState(local, remote) {
  const merged = copy(local);
  merged.modified = {};
  merged.deleted = {};
  for (const key of new Set([...Object.keys(dict(local.modified)), ...Object.keys(dict(remote.modified))])) {
    merged.modified[key] = Math.max(local.modified?.[key] || 0, remote.modified?.[key] || 0);
  }
  for (const key of new Set([...Object.keys(dict(local.deleted)), ...Object.keys(dict(remote.deleted))])) {
    merged.deleted[key] = Math.max(local.deleted?.[key] || 0, remote.deleted?.[key] || 0);
  }
  for (const field of ['decks', 'items']) {
    const a = new Map(local[field].map(row => [row.id, row]));
    const b = new Map(remote[field].map(row => [row.id, row]));
    merged[field] = [];
    for (const id of new Set([...a.keys(), ...b.keys()])) {
      const key = `${field}:${id}`;
      if (merged.deleted[key] && merged.deleted[key] >= (merged.modified[key] || 0)) continue;
      const useRemote = b.has(id) && (!a.has(id) || ((remote.modified?.[key] || 0) > (local.modified?.[key] || 0)));
      merged[field].push(copy(useRemote ? b.get(id) : a.get(id)));
    }
  }
  const decks = new Set(merged.decks.map(d => d.id));
  merged.items = merged.items.filter(i => decks.has(i.deckId));
  const items = new Set(merged.items.map(i => i.id));
  merged.progress = {};
  for (const id of items) {
    const a=local.progress[id],b=remote.progress[id];
    const p=(a?.last||0)>=(b?.last||0)?(a||b):b;
    if(p)merged.progress[id]=copy(p);
  }
  merged.licenses = [...new Map([...local.licenses, ...remote.licenses].map(l => [`${l.resource}|${l.text}`, l])).values()];
  return merged;
}
