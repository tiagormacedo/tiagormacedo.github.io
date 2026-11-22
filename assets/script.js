document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const button = document.querySelector('.sidebarButton');
  const footer = document.querySelector('footer');
  const main = document.querySelector('main');
  const mq = window.matchMedia('(max-width: 960px)');
  const sidebar = document.getElementById('sidebar');

  const setInert = on => [main, footer].forEach(el => el && el.toggleAttribute('inert', on));

  function openDrawer() {
    if (!mq.matches) return;
    body.classList.add('sidebar-open');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close navigation menu');
    setInert(true);
    (sidebar.querySelector('a, button') || button).focus();
  }

  function closeDrawer({ restoreFocus = false } = {}) {
    // if (!body.classList.contains('sidebar-open')) return;
    body.classList.remove('sidebar-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
    setInert(false);
    if (restoreFocus) button.focus();
  }

  button.addEventListener('click', () => {
    if (body.classList.contains('sidebar-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  sidebar.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    closeDrawer();
    const target = link.hash ? document.getElementById(link.hash.slice(1)) : null;
    if (target) target.focus({ preventScroll: true });
  });

  document.addEventListener('click', e => {
    if (body.classList.contains('sidebar-open') &&
        !e.target.closest('#sidebar') && !e.target.closest('.sidebarButton')) closeDrawer();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && body.classList.contains('sidebar-open')) {
      closeDrawer({ restoreFocus: true });
    }
  });

  const onMq = () => {
    if (!mq.matches) closeDrawer({ restoreFocus: sidebar.contains(document.activeElement) });
  };

  if (mq.addEventListener) {
      mq.addEventListener('change', onMq);
  } else {
      mq.addListener(onMq);
  }

  document.querySelectorAll('.tabs_wrap').forEach(wrap => {
    const tabs = Array.from(wrap.querySelectorAll('[role="tab"]'));
    const panelFor = t => document.getElementById(t.dataset.target || t.id.replace(/Button$/, ''));

    function select(tab, focus = false) {
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const p = panelFor(t);
        if (p) p.classList.toggle('active', p === panelFor(tab));
      });
      if (focus) tab.focus();
    }
    tabs.forEach(t => {
      t.tabIndex = t.classList.contains('active') ? 0 : -1;
      t.addEventListener('click', () => select(t));
    });
    wrap.addEventListener('keydown', e => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      const i = tabs.indexOf(document.activeElement);
      if (i === -1) return;
      let j = i;
      if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = tabs.length - 1;
      else j = (i + (['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 1) + tabs.length) % tabs.length;
      e.preventDefault();
      select(tabs[j], true);
    });
  });

  const indicators = Array.from(document.querySelectorAll('#sidebar .menu a.indicator'));

  const sections = Array.from(document.querySelectorAll('main > section[id]'));

  const visible = new Map();

  const setActive = link => indicators.forEach(a => a.classList.toggle('active', a === link));

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target.id, e.isIntersecting));
    let active = sections.filter(s => visible.get(s.id)).pop();
    if (!active && window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1];
    }
    if (active) {
      const link = indicators.find(a => a.hash === '#' + active.id);
      if (link) setActive(link);
    }
  }, { rootMargin: '-25% 0px -25% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));
});
