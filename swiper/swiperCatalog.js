document.addEventListener('DOMContentLoaded', function () {
    const swipers = {};
    const categories = ['busts', 'figures', 'animals', 'compositions', 'other'];

    // Инициализация слайдеров
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
                nextEl: swiperContainer.querySelector('.custom-swiper-button-next'),
                prevEl: swiperContainer.querySelector('.custom-swiper-button-prev'),
            },
        });

        updatePageIndicator(category); // Обновляем индикатор при инициализации

        swipers[category].on('slideChange', () => updatePageIndicator(category)); // Обновляем индикатор при смене слайда
    });

    // Обновление индикатора для каждого слайдера
    function updatePageIndicator(category) {
        const currentIndex = swipers[category].activeIndex;
        const totalSlides = swipers[category].slides.length;
        const slidesPerView = swipers[category].params.slidesPerView;

        const totalGroups = Math.ceil(totalSlides / slidesPerView);
        const currentGroup = Math.ceil((currentIndex + 1) / slidesPerView);

        const groupsText = totalGroups > 0 ? `${currentGroup} из ${totalGroups}` : '1 из 1';

        // Обновляем индикатор для конкретного слайдера
        const pageIndicator = document.querySelector(`.catalog__swiper-${category} .page-indicator`);
        if (pageIndicator) {
            pageIndicator.textContent = groupsText;
        } else {
            console.warn(`Индикатор для категории ${category} не найден`);
        }

        // Скрываем или показываем кнопки навигации в зависимости от количества групп слайдов
        const nextButton = document.querySelector(`.catalog__swiper-${category} .custom-swiper-button-next`);
        const prevButton = document.querySelector(`.catalog__swiper-${category} .custom-swiper-button-prev`);
        if (totalGroups <= 1) {
            nextButton.style.display = 'none';
            prevButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
            prevButton.style.display = 'block';
        }
    }

    // Переключение слайдера
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

    // Обработчик клика по навигационным ссылкам
    document.querySelectorAll('.slider__nav-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            if (category) {
                switchSlider(category);  // Переключаем слайдер при нажатии
            }
        });
    });

    // Добавляем активный класс при клике по навигационным ссылкам
    function activateItem(event) {
        document.querySelectorAll('.slider__nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    // Инициализируем первый слайдер
    switchSlider('busts');
});
