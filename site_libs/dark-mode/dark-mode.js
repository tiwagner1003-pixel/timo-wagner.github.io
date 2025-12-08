(function(){
  const storageKey = 'theme';
  const toggleId = 'theme-toggle';
  const root = document.documentElement;

  function setButtonState(btn, theme){
    if(!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', theme === 'dark');
  }

  function applyTheme(theme){
    if(theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    const btn = document.getElementById(toggleId);
    setButtonState(btn, theme);
  }

  function init(){
    const saved = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    document.addEventListener('click', function(e){
      const target = e.target.closest && e.target.closest('#' + toggleId);
      if(!target) return;
      const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
      try{ localStorage.setItem(storageKey, newTheme); }catch(e){}
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
