export function goToSearch(profession) {
  const query = profession ? `?profession=${encodeURIComponent(profession)}` : '';
  window.location.assign(`/search${query}`);
}

export function getSearchProfessionFromUrl() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('profession') || '';
}
