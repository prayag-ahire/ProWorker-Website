export function goToSearch(profession) {
  const query = profession ? `?profession=${encodeURIComponent(profession)}` : '';
  window.location.hash = `#search${query}`;
}

export function getSearchProfessionFromHash() {
  const hash = window.location.hash || '';
  const query = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';
  return new URLSearchParams(query).get('profession') || '';
}
