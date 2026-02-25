(() => {
  const focusables = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
  const lockScroll = (lock) => { document.body.style.overflow = lock ? 'hidden' : ''; };

  document.querySelectorAll('[data-lang]').forEach((wrap) => {
    const btn = wrap.querySelector('.lang-toggle');
    const menu = wrap.querySelector('.lang-menu');
    btn?.addEventListener('click', () => {
      const open = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) { wrap.classList.remove('open'); btn?.setAttribute('aria-expanded', 'false'); }
    });
  });

  const drawer = document.getElementById('mobileDrawer');
  const drawerOpen = document.getElementById('drawerOpen');
  const drawerClose = document.getElementById('drawerClose');
  const drawerPanel = drawer?.querySelector('.drawer-panel');

  const trapFocus = (root, e) => {
    const items = [...root.querySelectorAll(focusables)];
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    lockScroll(true);
    drawerPanel.querySelector(focusables)?.focus();
  };
  const closeDrawer = () => { drawer.classList.remove('open'); lockScroll(false); };

  drawerOpen?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });

  const modal = document.getElementById('privacyModal');
  const modalDialog = modal?.querySelector('.modal');
  const openModalBtn = document.querySelectorAll('[data-open-privacy]');
  const closeModalBtn = modal?.querySelectorAll('[data-close-privacy]');
  const openModal = () => { modal.classList.add('open'); lockScroll(true); modalDialog.querySelector(focusables)?.focus(); };
  const closeModal = () => { modal.classList.remove('open'); lockScroll(false); };
  openModalBtn.forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeModalBtn?.forEach((b) => b.addEventListener('click', closeModal));
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer?.classList.contains('open')) closeDrawer();
      if (modal?.classList.contains('open')) closeModal();
      document.querySelectorAll('.lang.open').forEach(el => el.classList.remove('open'));
    }
    if (e.key === 'Tab') {
      if (drawer?.classList.contains('open')) trapFocus(drawerPanel, e);
      if (modal?.classList.contains('open')) trapFocus(modalDialog, e);
    }
  });

  document.querySelectorAll('.faq-item .faq-q').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wrap = item.parentElement;
      wrap.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
      item.classList.add('open');
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
