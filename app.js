document.addEventListener("DOMContentLoaded", () => {
    
    // --- Preloader Functionality ---
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.main-container');

    function hidePreloader() {
        preloader.classList.add('fade-out');
        preloader.addEventListener('transitionend', () => {
            preloader.style.display = 'none';
        });
        mainContainer.style.opacity = 1;
    }

    // Function to fetch and inject content from config.json
    async function loadContent() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const config = await response.json();

            // Inject content into the respective containers
            document.querySelector('header .font-syne').textContent = config.siteName;
            
            const navContainer = document.querySelector('header ul');
            navContainer.innerHTML = config.navigation.map(item => `<li><a href="${item.href}" class="hover:text-indigo-400 transition-colors">${item.name}</a></li>`).join('');

            const socialContainer = document.querySelector('.social-sidebar');
            socialContainer.innerHTML = config.socialLinks.map(link => `<a href="${link.url}"><i class="${link.icon}"></i></a>`).join('');

            // Inject all sections into the main container
            mainContainer.innerHTML += generateSections(config);
            
            // Initialize animations and carousels after content is in the DOM
            initializeContentAnimations();
            initializeCarousels();
            
            // Hide preloader after everything is set up
            hidePreloader();

        } catch (error) {
            console.error('Failed to load page content:', error);
            hidePreloader(); // Still hide preloader on error
        }
    }

    // Function to generate all sections from config
    function generateSections(config) {
        return `
            ${generateBanner(config.banner)}
            ${generateAbout(config.about)}
            ${generatePartners(config.partners)}
            ${generateStartups(config.startups)}
            ${generateManagement(config.management)}
            ${generateMentorship(config.mentorship)}
            ${generateVideoAddress(config.videoAddress)}
            ${generateContact(config.contact)}
            ${generateFooter(config.footer)}
        `;
    }

    // --- Template functions for each section ---
    const generateBanner = ({ title, subtitle, buttons }) => `
        <section id="banner" class="content-section h-screen flex items-center justify-center">
            <div class="glass-container text-center">
                <h1 class="text-5xl md:text-7xl font-bold mb-4">${title}</h1>
                <p class="text-xl md:text-2xl mb-8 text-center mx-auto">${subtitle}</p>
                <div>${buttons.map(btn => `<a href="${btn.href}" class="${btn.primary ? 'cta-button' : 'cta-button cta-button-secondary'}">${btn.text}</a>`).join('')}</div>
            </div>
        </section>`;

    const generateAbout = ({ title, description, cards }) => `
        <section id="about" class="content-section">
            <div class="glass-container">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <p class="text-center max-w-4xl mx-auto mb-16">${description}</p>
                <div class="grid md:grid-cols-3 gap-8 text-left">
                    ${cards.map(card => `
                        <div class="about-card">
                            <i class="${card.icon} text-4xl text-indigo-400 mb-4"></i>
                            <h3 class="text-2xl font-bold mb-2">${card.title}</h3>
                            ${card.points ? `<ul class="list-disc list-inside">${card.points.map(p => `<li>${p}</li>`).join('')}</ul>` : `<p>${card.text}</p>`}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

    const generateStartups = ({ title, items }) => `
        <section id="startups" class="content-section">
            <div class="glass-container">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <div class="scrolling-gallery">
                    <div class="scrolling-gallery-inner">
                        ${items.map(item => `
                            <div class="team-card text-center">
                                <img src="${item.logo}" alt="${item.name} Logo" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-600 object-cover">
                                <h3 class="text-xl font-bold">${item.name}</h3>
                                <p class="text-gray-400">${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>`;

    const generateManagement = ({ title, members }) => `
        <section id="management" class="content-section">
            <div class="glass-container">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <div class="scrolling-gallery">
                    <div class="scrolling-gallery-inner">
                        ${members.map(member => `
                            <div class="team-card text-center">
                                <img src="${member.image}" alt="${member.name}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                                <h3 class="text-xl font-bold">${member.name}</h3>
                                <p class="text-indigo-400">${member.position}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>`;

    const generateMentorship = ({ title, mentors }) => `
        <section id="mentorship" class="content-section">
            <div class="glass-container">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <div class="scrolling-gallery">
                    <div class="scrolling-gallery-inner">
                        ${mentors.map(mentor => `
                            <div class="team-card text-center">
                                <img src="${mentor.image}" alt="${mentor.name}" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                                <h3 class="text-xl font-bold">${mentor.name}</h3>
                                <p class="text-purple-400">${mentor.expertise}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>`;

    const generateVideoAddress = ({ videoUrl, title, address, phone, email }) => `
        <section id="video-address" class="content-section">
            <div class="glass-container grid md:grid-cols-2 gap-16 items-center">
                <div class="video-container">
                    <iframe class="w-full h-80 rounded-lg shadow-lg" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="address-container text-left">
                    <h3 class="text-3xl font-bold mb-4">${title}</h3>
                    <p class="mb-2 flex items-center"><i class="ph-map-pin-line mr-3 text-2xl text-indigo-400"></i>${address}</p>
                    <p class="mb-2 flex items-center"><i class="ph-phone-call mr-3 text-2xl text-indigo-400"></i>${phone}</p>
                    <p class="flex items-center"><i class="ph-envelope-simple mr-3 text-2xl text-indigo-400"></i>${email}</p>
                </div>
            </div>
        </section>`;

    const generatePartners = ({ title, logos }) => `
        <section id="partners" class="content-section">
            <div class="glass-container">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <div class="swiper-container">
                     <div class="swiper-wrapper">
                        ${logos.map(p => `<div class="swiper-slide"><img src="${p.logo}" alt="${p.name}" class="partner-logo" onerror="this.style.display='none'"></div>`).join('')}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </section>`;

    const generateContact = ({ title }) => `
        <section id="contact" class="content-section">
            <div class="glass-container max-w-4xl mx-auto">
                <h2 class="text-4xl md:text-5xl mb-12 text-center">${title}</h2>
                <form class="contact-form text-left">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                    </div>
                    <textarea placeholder="Your Message" rows="6" required></textarea>
                    <div class="text-center mt-6">
                        <button type="submit" class="cta-button">Send Message</button>
                    </div>
                </form>
            </div>
        </section>`;
    
    const generateFooter = ({ copyright, credit }) => {
        const currentYear = new Date().getFullYear();
        const finalCopyright = copyright.replace('{{YEAR}}', currentYear);
        return `
            <footer class="p-8 flex flex-col items-center justify-center">
                <p class="mb-2">${finalCopyright}</p>
                <p class="text-gray-500">${credit}</p>
            </footer>`;
    };

    // --- Initialization Functions ---
    function initializeContentAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            gsap.fromTo(section.querySelector('.glass-container'), {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        });
        document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function initializeCarousels() {
        if (document.querySelector('#partners .swiper-container')) {
            new Swiper('#partners .swiper-container', {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '#partners .swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 }
                }
            });
        }
    }

    loadContent();
});