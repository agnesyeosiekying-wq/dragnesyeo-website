(() => {
  // A normal link works without JavaScript; preserve in-page position when available.
  document.querySelectorAll('.site-language a').forEach(link => {
    if (location.hash) link.hash = location.hash;
  });
  // Existing FAQ handlers remain responsible for opening/closing answers.
  document.querySelectorAll('.faq-question').forEach(question => {
    if (question.tagName === 'BUTTON' || question.hasAttribute('role')) return;
    question.setAttribute('role', 'button');
    question.tabIndex = 0;
    const item = question.closest('.faq-item');
    if (!item) return;
    const sync = () => question.setAttribute('aria-expanded', String(item.classList.contains('active')));
    sync();
    new MutationObserver(sync).observe(item, {attributes:true, attributeFilter:['class']});
    question.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        question.click();
      }
    });
  });
})();
