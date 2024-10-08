document.addEventListener('DOMContentLoaded', function () {
    const accordionItem = document.querySelector('.accordion-item');
    const accordionHeader = document.querySelector('.accordion-header');
    const infoSection = document.querySelector('.services__accordion-info');
    const accordionLinks = document.querySelector('.accordion__links');

    // Toggle the accordion when header is clicked
    accordionHeader.addEventListener('click', function () {
        const isActive = accordionHeader.classList.contains('active');

        // If the header is active, remove 'active' class and hide all info contents
        if (isActive) {
            accordionHeader.classList.remove('active');
            accordionLinks.classList.remove('active');
            infoSection.classList.remove('active');
            document.querySelectorAll('.accordion__info-content').forEach(content => {
                content.classList.remove('active');
            });
        } else {
            // If not active, add 'active' class and show all contents
            accordionHeader.classList.add('active');
            accordionLinks.classList.add('active');
            infoSection.classList.add('active');
        }
    });

    // Show content based on link click
    document.querySelectorAll('.accordion__links a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-info');

            // Hide all info content
            document.querySelectorAll('.accordion__info-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected info content
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Close the accordion when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!accordionItem.contains(event.target)) {
            if (accordionHeader.classList.contains('active')) {
                accordionHeader.classList.remove('active');
                accordionLinks.classList.remove('active');
                infoSection.classList.remove('active');

                // Hide all info contents
                document.querySelectorAll('.accordion__info-content').forEach(content => {
                    content.classList.remove('active');
                });
            }
        }
    });
    document.querySelectorAll('.slider__nav-list .slider__nav-item').forEach(item => {
        item.addEventListener('click', activateItem);
    });

    document.querySelector('.link-reset').addEventListener('click', function(event) {
        // Проверяем, является ли кликнутый элемент ссылкой
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            console.log("Ссылка нажата, но не произошло прокрутки.");
        }
    });

    function activateItem(event) {
        const items = document.querySelectorAll('.slider__nav-list .slider__nav-item');
        items.forEach(item => {
            item.classList.remove('active__link'); 
        });
    
        event.currentTarget.classList.add('active__link'); 
    }

    
});