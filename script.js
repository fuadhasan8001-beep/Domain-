(() => {
  const phone = '6283189578421';
  const contactUrl = (subject = 'Konsultasi F Hasan Production') => `https://wa.me/${phone}?text=${encodeURIComponent(subject)}`;

  document.querySelectorAll('footer').forEach((footer) => {
    footer.innerHTML = footer.innerHTML.replace(/©\s*2024/g, `© ${new Date().getFullYear()}`);
  });

  document.querySelectorAll('nav').forEach((nav) => {
    const toggle = nav.querySelector('button.md\\:hidden');
    const desktopLinks = nav.querySelector('.hidden.md\\:flex, ul.hidden.md\\:flex');
    if (!toggle || !desktopLinks) return;
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Buka menu navigasi');
    toggle.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = 'hidden absolute left-4 right-4 top-full mt-2 rounded-2xl border border-white/10 bg-[#131b2e]/95 p-4 shadow-2xl backdrop-blur-xl md:hidden';
    menu.innerHTML = desktopLinks.innerHTML;
    menu.querySelectorAll('a').forEach((link) => link.className = 'block rounded-xl px-4 py-3 text-[#dae2fd] hover:bg-white/10');
    nav.append(menu);
    toggle.addEventListener('click', () => {
      const open = !menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(open));
      const icon = toggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = open ? 'close' : 'menu';
    });
  });

  document.querySelectorAll('button').forEach((button) => {
    const label = button.textContent.replace(/\s+/g, ' ').trim();
    if (/konsultasi|pesan sekarang|book an upgrade|lihat layanan/i.test(label)) {
      button.addEventListener('click', () => {
        location.href = /lihat layanan/i.test(label) ? 'layanan.html' : contactUrl(label);
      });
    }
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    if (/Email:|WhatsApp:|hubungi|konsultasi/i.test(link.textContent)) link.href = contactUrl(link.textContent.trim());
  });

  const grid = document.querySelector('.masonry-grid');
  if (grid) {
    const filters = [...document.querySelectorAll('button')].filter((button) => /All Works|Website Development|Creative Design|Live Streaming/.test(button.textContent));
    filters.forEach((button) => button.addEventListener('click', () => {
      const filter = button.textContent.trim().replace(' Development', '');
      grid.querySelectorAll('.masonry-item').forEach((item) => {
        item.hidden = filter !== 'All Works' && item.querySelector('span')?.textContent.trim() !== filter;
      });
      filters.forEach((item) => item.classList.remove('border-primary', 'text-primary', 'neon-glow-primary'));
      button.classList.add('border-primary', 'text-primary', 'neon-glow-primary');
    }));
  }
})();
