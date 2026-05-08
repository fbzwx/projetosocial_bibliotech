      // Custom cursor
      const cursor = document.getElementById('cursor');
      const ring = document.getElementById('cursorRing');
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
          ring.style.left = e.clientX + 'px';
          ring.style.top = e.clientY + 'px';
        }, 80);
      });
      document.querySelectorAll('a, button, input').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(2)';
          cursor.style.background = 'transparent';
          cursor.style.border = '1px solid var(--green)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(1)';
          cursor.style.background = 'var(--green)';
          cursor.style.border = 'none';
        });
      });

      // Sticky header
      const header = document.getElementById('header');
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
      });

      // Scroll reveal
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      reveals.forEach(r => observer.observe(r));