(function(){
  const storageKey = 'theme';
  const toggleId = 'theme-toggle';
  const root = document.documentElement;

  function setButtonState(btn, theme){
    if(!btn) return;
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.innerHTML = theme === 'dark' ? '<i class="bi-sun-fill" aria-hidden="true"></i>' : '<i class="bi-moon-fill" aria-hidden="true"></i>';
  }

  function applyTheme(theme){
    if(theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    const btn = document.getElementById(toggleId);
    setButtonState(btn, theme);
  }

  function attachClickHandler(){
    const btn = document.getElementById(toggleId);
    if(btn && !btn.dataset.hasListener){
      btn.dataset.hasListener = 'true';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
        try{ localStorage.setItem(storageKey, newTheme); }catch(e){}
      });
    }
  }

  function init(){
    const saved = (()=>{ try{ return localStorage.getItem(storageKey); }catch(e){ return null; }})();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
    attachClickHandler();
    
    // Re-check for button after short delays (in case it's dynamically moved/created)
    setTimeout(attachClickHandler, 100);
    setTimeout(attachClickHandler, 500);
    setTimeout(attachClickHandler, 1000);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  
  // Also watch for DOM changes in case button is added later
  if(window.MutationObserver){
    const observer = new MutationObserver(function(){
      attachClickHandler();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
