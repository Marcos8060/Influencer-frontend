// utils/cookies.js
export function setAuthCookie(token) {
    document.cookie = `tmp_tiktok_auth=${token}; path=/; max-age=300; secure; samesite=strict`;
  }