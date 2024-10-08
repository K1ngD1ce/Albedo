document.addEventListener('DOMContentLoaded', function () {
  const swipers = {};
  const categories = ['busts', 'figures', 'animals', 'compositions', 'other'];

  categories.forEach(category => {
      const swiperContainer = document.querySelector(`.catalog__swiper-${category}`);
      if (!swiperContainer) {
          console.warn(`Слайдер для категории ${category} не найден`);
          return;
      }
      
      swipers[category] = new Swiper(swiperContainer, {
          loop: false,
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 32,
          pagination: {
              el: '.swiper-pagination',
              clickable: false,
          },
          navigation: {
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
          },
      });

      updatePageIndicator(category);
      
      swipers[category].on('slideChange', () => updatePageIndicator(category));
  });

  function updatePageIndicator(category) {
      const currentIndex = swipers[category].activeIndex;
      const totalSlides = swipers[category].slides.length;
      const slidesPerView = swipers[category].params.slidesPerView; 

      const totalGroups = Math.ceil(totalSlides / slidesPerView); 
      const currentGroup = Math.ceil((currentIndex + 1) / slidesPerView);

      const groupsText = totalGroups > 0 ? `${currentGroup} из ${totalGroups}` : '1 из 1';
      document.querySelector('.page-indicator').textContent = groupsText;
  }

  function switchSlider(category) {
      categories.forEach(cat => {
          const swiperContainer = document.querySelector(`.catalog__swiper-${cat}`);
          if (swiperContainer) {
              swiperContainer.style.display = cat === category ? 'block' : 'none';
          }
      });

      if (swipers[category]) {
          swipers[category].update(); 
          updatePageIndicator(category); 
      }
  }

  document.querySelectorAll('.slider__nav-item').forEach(item => {
      item.addEventListener('click', function (event) {
          event.preventDefault();
          const category = this.getAttribute('data-category');
          console.log(`Переключение на категорию: ${category}`);
          switchSlider(category); 
      });
  });

  switchSlider('busts');
});