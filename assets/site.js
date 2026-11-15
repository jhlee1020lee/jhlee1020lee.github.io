(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.innerHTML = open ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
    nav.dataset.open = String(open);
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  const demo = document.querySelector('[data-demo]');
  if (!demo) return;
  const runs = [
    {context: 'Two files are available for the first download.', output: 'added=2 updated=0 unchanged=0\nrepaired=0 failed=0 planned=0\n\nadded: demo-course/lesson-01.txt\nadded: demo-course/lesson-02.txt'},
    {context: 'The same two files are checked again. Neither has changed.', output: 'added=0 updated=0 unchanged=2\nrepaired=0 failed=0 planned=0\n\nunchanged: demo-course/lesson-01.txt\nunchanged: demo-course/lesson-02.txt'},
    {context: 'The second file has been revised. The first file is unchanged.', output: 'added=0 updated=1 unchanged=1\nrepaired=0 failed=0 planned=0\n\nunchanged: demo-course/lesson-01.txt\nupdated: demo-course/lesson-02.txt'}
  ];
  const output = demo.querySelector('.demo-output');
  const copy = demo.querySelector('[data-copy]');
  const status = demo.querySelector('[data-copy-status]');
  demo.querySelectorAll('[data-run]').forEach(button => button.addEventListener('click', () => {
    demo.querySelectorAll('[data-run]').forEach(other => other.setAttribute('aria-pressed', String(button === other)));
    const run = runs[Number(button.dataset.run)];
    demo.querySelector('.demo-context').textContent = run.context;
    output.textContent = run.output;
    status.textContent = '';
    copy.textContent = 'Copy output';
  }));
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      copy.textContent = 'Copied';
      status.textContent = 'Recorded output copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(output);
      selection.removeAllRanges();
      selection.addRange(range);
      output.focus();
      copy.textContent = 'Text selected';
      status.textContent = 'Clipboard access was unavailable. The output is selected for manual copying.';
    }
  });
})();
