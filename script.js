document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-active');
        });
    }

    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // VIP Form submission
    const vipForm = document.getElementById('vip-form');
    if (vipForm) {
        vipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Symulacja wysyłki formularza
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wysyłanie...';
            
            setTimeout(() => {
                const formElements = this.elements;
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].type !== 'submit') {
                        formElements[i].value = '';
                    }
                }
                
                submitBtn.textContent = 'Wysłano!';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
                
                // Wyświetl potwierdzenie
                const confirmationMsg = document.createElement('div');
                confirmationMsg.className = 'confirmation-message';
                confirmationMsg.textContent = 'Dziękujemy za dołączenie do VIP Famiglia!';
                
                this.parentNode.appendChild(confirmationMsg);
                
                setTimeout(() => {
                    confirmationMsg.remove();
                }, 5000);
                
            }, 1500);
        });
    }

    // Lazy loading obrazów
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback dla przeglądarek bez wsparcia lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Obsługa przewijania do sekcji po kliknięciu w link nawigacyjny
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Zamknij menu mobilne jeśli jest otwarte
                if (body.classList.contains('mobile-menu-active')) {
                    body.classList.remove('mobile-menu-active');
                }
            }
        });
    });

    // Aktualna data w stopce
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Na Okrągło - Wszelkie prawa zastrzeżone`;
    }
});

// Optymalizacja wydajności - ładowanie czcionek
document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
});
// Inicjalizacja slidera pizzy
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.pizza-slider')) {
        const pizzaSlider = new Swiper('.pizza-slider', {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // Gdy szerokość okna < 768px (mobile)
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                // Gdy szerokość okna >= 768px (desktop)
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }
        });
    }
});

// Obsługa schema.org dla SEO
function addJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Na Okrągło",
        "image": "logo.png",
        "url": "https://madeinitaly.pl",
        "telephone": "123456789",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ul. Włoska 123",
            "addressLocality": "Warszawa",
            "postalCode": "00-001",
            "addressCountry": "PL"
        },
        "servesCuisine": "Italian",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "12:00",
                "closes": "22:00"
            }
        ],
        "menu": "https://madeinitaly.pl/menu",
        "acceptsReservations": "True"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
}

// Sticky header z logo pojawiającym się po zescrollowaniu
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');
const logoInHeader = document.querySelector('header .logo');

window.addEventListener('scroll', function() {
  if (heroSection) {
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > (heroHeight * 0.7)) {
      header.classList.add('sticky-active');
      if (window.innerWidth > 768) {
        logoInHeader.style.display = 'block';
      }
    } else {
      header.classList.remove('sticky-active');
      logoInHeader.style.display = 'none';
    }
  }
});


// Inicjalizacja mapy Google
function initMap() {
    const pizzeriaLocation = { lat: 52.2297, lng: 21.0122 }; // Współrzędne Warszawy (przykład)
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: pizzeriaLocation,
    });
    
    const marker = new google.maps.Marker({
        position: pizzeriaLocation,
        map: map,
        title: "Na Okrągło",
        animation: google.maps.Animation.DROP
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>Na Okrągło</h3>
                <p>ul. Włoska 123, Warszawa</p>
                <p><a href="tel:123456789">123 456 789</a></p>
            </div>
        `
    });
    
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Inicjalizacja widgetu opinii Google
document.addEventListener('DOMContentLoaded', function() {
    // Przełączanie kategorii menu
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuContainers = document.querySelectorAll('.menu-items-container');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Usuń aktywną klasę z wszystkich przycisków i kontenerów
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            menuContainers.forEach(container => container.classList.remove('active'));
            
            // Dodaj aktywną klasę do klikniętego przycisku i odpowiedniego kontenera
            button.classList.add('active');
            document.getElementById(`${category}-menu`).classList.add('active');
        });
    });
    
    // Inicjalizacja widgetu opinii Google
    if (document.getElementById('google-reviews')) {
        jQuery(document).ready(function() {
            $("#google-reviews").googlePlaces({
                placeId: 'YOUR_PLACE_ID', // Zastąp swoim ID miejsca z Google
                render: ['reviews'],
                min_rating: 4,
                max_rows: 4
            });
        });
    }
});


// Wywołanie funkcji po załadowaniu strony
window.addEventListener('load', addJsonLd);
