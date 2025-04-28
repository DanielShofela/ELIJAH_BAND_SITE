document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour initialiser un carrousel
    function initializeCarousel(container) {
        const carousel = container.querySelector('.event-carousel');
        const items = carousel.querySelectorAll('.event-carousel-item');
        const prevButton = container.querySelector('.event-carousel-button.prev');
        const nextButton = container.querySelector('.event-carousel-button.next');
        const dotsContainer = container.querySelector('.event-carousel-dots');
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        // Créer les points de navigation
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('event-carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = container.querySelectorAll('.event-carousel-dot');
        
        // Fonction pour aller à une diapositive spécifique
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        // Fonction pour mettre à jour l'affichage du carrousel
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Mettre à jour les points
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Fonction pour aller à la diapositive suivante
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
        
        // Fonction pour aller à la diapositive précédente
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
        
        // Ajouter les écouteurs d'événements pour les boutons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }
        
        // Défilement automatique
        let autoSlide = setInterval(nextSlide, 5000);
        
        // Arrêter le défilement automatique au survol
        container.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        // Reprendre le défilement automatique quand la souris quitte le carrousel
        container.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        // Gestion du swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // Initialiser tous les carrousels d'événements
    document.querySelectorAll('.event-carousel-container').forEach(container => {
        initializeCarousel(container);
    });

    // Initialiser le carousel principal
    const mainCarousels = document.querySelectorAll('.carousel-container');
    
    mainCarousels.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const slides = carousel.querySelectorAll('.carousel-item');
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');
        const dotsContainer = container.querySelector('.carousel-dots');
        
        let currentSlide = 0;
        
        // Créer les points de navigation
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Fonction pour aller à un slide spécifique
        function goToSlide(index) {
            currentSlide = index;
            carousel.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        }
        
        // Mettre à jour les points
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Gestionnaires d'événements pour les boutons
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        });
        
        // Défilement automatique
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    });

    // Menu Burger
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    const body = document.body;

    burgerMenu?.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burgerMenu.contains(e.target) && nav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Animation d'apparition des membres au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const memberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                memberObserver.unobserve(entry.target); // On arrête d'observer une fois visible
            }
        });
    }, observerOptions);

    // Observer toutes les cartes de membres et les membres de la direction
    const memberCards = document.querySelectorAll('.membre-card, .leadership-member');
    memberCards.forEach(card => {
        memberObserver.observe(card);
    });

    // Variables globales pour la gestion des vidéos
    let currentVideoIndex = 0;
    const videoSources = [
        "Vidéos/RAWEEK.mp4",
        "Vidéos/RAWEEK1.mp4",
        "Vidéos/RAWEEK2.mp4",
        "Vidéos/RAWEEK3.mp4"
    ];

    // Fonctions de gestion du lecteur vidéo modal
    window.openVideoModal = function(index) {
        currentVideoIndex = index;
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        modal.style.display = 'block';
        modalVideo.src = videoSources[index];
        modalVideo.play();
    }

    window.closeVideoModal = function() {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        modalVideo.pause();
        modalVideo.src = '';
        modal.style.display = 'none';
    }

    window.navigateVideo = function(direction) {
        currentVideoIndex = (currentVideoIndex + direction + videoSources.length) % videoSources.length;
        const modalVideo = document.getElementById('modalVideo');
        modalVideo.src = videoSources[currentVideoIndex];
        modalVideo.play();
    }

    // Initialisation au chargement du document
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Gestion de la lecture exclusive
        video.addEventListener('play', function() {
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });
        });

        // Passage en plein écran lors du double-clic
        video.addEventListener('dblclick', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });

        // Ajout d'un bouton plein écran dans les contrôles
        video.setAttribute('controlsList', 'nodownload');
        video.setAttribute('disablePictureInPicture', '');
    });

    // Gestionnaires d'événements pour le modal
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('videoModal');
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closeVideoModal();
            } else if (event.key === 'ArrowLeft') {
                navigateVideo(-1);
            } else if (event.key === 'ArrowRight') {
                navigateVideo(1);
            }
        }
    });

    document.querySelector('.modal-content')?.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.getElementById('videoModal')?.addEventListener('click', function(event) {
        if (event.target === this) {
            closeVideoModal();
        }
    });

    // Variables globales pour la gestion des images
    let currentImageIndex = 0;
    const imageSources = [
        "images/fond.jpg",
        "images/RAWEEK.jpg",
        "images/RAWEEK1.jpg",
        "images/RAWEEK2.jpg",
        "images/repriseBETHEL1.jpg",
        "images/repriseBETHEL2.jpg",
        "images/repriseBETHEL3.jpg",
        "images/repriseBETHEL4.jpg"
    ];

    // Fonctions pour le modal des images
    window.openImageModal = function(index) {
        currentImageIndex = index;
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        modal.style.display = 'block';
        modalImage.src = imageSources[index];
    }

    window.closeImageModal = function() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
    }

    window.navigateImage = function(direction) {
        currentImageIndex = (currentImageIndex + direction + imageSources.length) % imageSources.length;
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imageSources[currentImageIndex];
    }

    // Gestionnaires d'événements pour le modal des images
    document.addEventListener('DOMContentLoaded', function() {
        // Fermer le modal avec Echap
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeImageModal();
            }
        });

        // Navigation avec les flèches
        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('imageModal');
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    navigateImage(-1);
                } else if (event.key === 'ArrowRight') {
                    navigateImage(1);
                }
            }
        });

        // Fermer en cliquant en dehors de l'image
        document.getElementById('imageModal')?.addEventListener('click', function(event) {
            if (event.target === this) {
                closeImageModal();
            }
        });

        // Empêcher la fermeture lors du clic sur l'image
        document.querySelector('#imageModal .modal-content')?.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});
