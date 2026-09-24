const tokenKey = 'realness-studio-token';
const rememberedKey = 'realness-studio-session';
const identifierKey = 'realness-studio-identifier';

export const studioSession = {
  token() {
    try {
      const saved = JSON.parse(localStorage.getItem(rememberedKey) || 'null');
      if (saved?.token && saved.expiresAt > Date.now()) return saved.token;
      if (saved) localStorage.removeItem(rememberedKey);
      return sessionStorage.getItem(tokenKey) || '';
    } catch { return sessionStorage.getItem(tokenKey) || ''; }
  },
  save(token, remember, expiresAt, identifier) {
    this.clear();
    if (remember) {
      localStorage.setItem(rememberedKey, JSON.stringify({ token, expiresAt: Date.parse(expiresAt) || Date.now() + 30 * 86400000 }));
      localStorage.setItem(identifierKey, identifier.trim());
    } else {
      sessionStorage.setItem(tokenKey, token);
      localStorage.removeItem(identifierKey);
    }
  },
  clear() {
    sessionStorage.removeItem(tokenKey);
    localStorage.removeItem(rememberedKey);
  },
  identifier() { return localStorage.getItem(identifierKey) || ''; },
};
