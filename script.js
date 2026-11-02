(function () {
  function initTheme() {
    const button = document.getElementById('theme-toggle');
    if (!button || !document.body) return;

    const storageKey = 'player-theme';
    let storedTheme = null;

    try {
      storedTheme = window.localStorage.getItem(storageKey);
    } catch (error) {
      // Тема продолжит переключаться, даже если localStorage недоступен.
    }

    const systemPrefersDark = typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(isDark) {
      document.body.classList.toggle('dark', isDark);
      button.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
      button.setAttribute('aria-pressed', String(isDark));
    }

    applyTheme(storedTheme === 'dark' ||
      (storedTheme !== 'light' && systemPrefersDark));

    // Повторный запуск JS в редакторе не создаёт лишних обработчиков.
    button.onclick = function () {
      const isDark = !document.body.classList.contains('dark');
      applyTheme(isDark);

      try {
        window.localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
      } catch (error) {
        // Сохранение темы необязательно.
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme, { once: true });
  } else {
    initTheme();
  }
})();
