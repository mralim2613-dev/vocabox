export const normalizeTerm = value => String(value ?? '').normalize('NFKC').replace(/’/g, "'").trim().replace(/\s+/g, ' ').toLocaleLowerCase();
const keyOf = card => `${card.deckId}|${card.type}|${normalizeTerm(card.term)}`;

// Repair only known bundled duplicates. User-created duplicates still go through
// the normal validator, rather than being silently discarded.
export function repairBundledDuplicates(value, originals) {
  if (!value || !Array.isArray(value.items)) return value;
  const result = structuredClone(value);
  const bundled = new Map(originals.map(card => [card.id, keyOf(card)]));
  const groups = new Map();
  const aliases = new Map();
  result.items = result.items.filter(card => {
    const key = keyOf(card);
    if (bundled.get(card.id) !== key) return true;
    const first = groups.get(key);
    if (!first) { groups.set(key, card); return true; }
    aliases.set(card.id, first.id);
    for (const field of ['translation', 'definition', 'example', 'source']) {
      const parts = [...new Set([...(first[field] || '').split('\n'), ...(card[field] || '').split('\n')].filter(Boolean))];
      first[field] = parts.join('\n');
    }
    first.cefrLevels = [...new Set([...(first.cefrLevels || []), ...(card.cefrLevels || [])])];
    return false;
  });
  result.progress ||= {};
  for (const [oldId, id] of aliases) {
    const old = result.progress[oldId], current = result.progress[id];
    if (old) {
      // A duplicate card represents the same learning unit; keep the most
      // recent box and the largest recorded totals without double-counting.
      result.progress[id] = current ? {
        ...(old.last > current.last ? old : current),
        reviews: Math.max(old.reviews, current.reviews),
        correct: Math.max(old.correct, current.correct)
      } : old;
      delete result.progress[oldId];
    }
  }
  return result;
}
