import metadata from '../data/catalog-meta.json';

export const catalogLanguages = ['en', 'ru', 'de', 'es'];
export async function loadCatalog(language) {
  if (!catalogLanguages.includes(language)) return [];
  const response = await fetch(`${import.meta.env.BASE_URL}catalog/${language}.json`);
  if (!response.ok) throw new Error('Lüğət yüklənmədi. İnternet bağlantısını yoxlayıb yenidən cəhd et.');
  return response.json();
}
export const catalogMetadata = metadata;
