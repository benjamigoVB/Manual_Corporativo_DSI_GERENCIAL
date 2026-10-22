document.addEventListener('DOMContentLoaded', () => {
  // 1. Acordeón Colapsable del Sidebar
  const categoryToggles = document.querySelectorAll('.category-toggle');

  categoryToggles.forEach(button => {
    button.addEventListener('click', () => {
      const parentCategory = button.closest('.nav-category');
      const targetId = parentCategory.getAttribute('data-group');
      const linksList = document.getElementById(targetId);
      const arrow = button.querySelector('.toggle-arrow');

      const isHidden = linksList.style.display === 'none';
      linksList.style.display = isHidden ? 'block' : 'none';
      button.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      
      if (arrow) {
        arrow.textContent = isHidden ? '▼' : '▶';
      }
    });
  });

  // 2. Filtro en Tiempo Real del Sidebar (#sidebarFilter)
  const sidebarFilter = document.getElementById('sidebarFilter');
  if (sidebarFilter) {
    sidebarFilter.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const categories = document.querySelectorAll('.nav-category');

      categories.forEach(category => {
        const items = category.querySelectorAll('.category-links li');
        let hasMatch = false;

        items.forEach(item => {
          const itemText = item.textContent.toLowerCase();
          if (itemText.includes(searchTerm)) {
            item.style.display = 'block';
            hasMatch = true;
          } else {
            item.style.display = 'none';
          }
        });

        // Si se está buscando, asegurar que el grupo esté desplegado si tiene coincidencias
        const linksList = category.querySelector('.category-links');
        const arrow = category.querySelector('.toggle-arrow');
        if (searchTerm.length > 0) {
          category.style.display = hasMatch ? 'block' : 'none';
          if (hasMatch) {
            linksList.style.display = 'block';
            if (arrow) arrow.textContent = '▼';
          }
        } else {
          category.style.display = 'block';
        }
      });
    });
  }

  // 3. Atajo de Teclado (Ctrl+K) para enfocar el buscador
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const globalSearch = document.getElementById('globalSearch');
      const sidebarInput = document.getElementById('sidebarFilter');

      // Si está en desktop enfoca el buscador de la barra superior; de lo contrario el del sidebar
      if (window.innerWidth > 992 && globalSearch) {
        globalSearch.focus();
      } else if (sidebarInput) {
        sidebarInput.focus();
      }
    }
  });

  // 4. Toggle Menú Móvil (Hamburguesa)
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('active');
  }

  if (mobileBtn && sidebar && backdrop) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
    backdrop.addEventListener('click', toggleMobileMenu);
  }
});