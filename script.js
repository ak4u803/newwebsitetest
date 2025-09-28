// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Theme Customizer
const themeCustomizer = document.getElementById('theme-customizer');
const customizerToggle = document.getElementById('customizer-toggle');
const primaryColorInput = document.getElementById('primary-color');
const secondaryColorInput = document.getElementById('secondary-color');
const accentColorInput = document.getElementById('accent-color');
const resetThemeBtn = document.getElementById('reset-theme');

// Toggle customizer panel
customizerToggle.addEventListener('click', () => {
    themeCustomizer.classList.toggle('active');
});

// Close customizer when clicking outside
document.addEventListener('click', (e) => {
    if (!themeCustomizer.contains(e.target)) {
        themeCustomizer.classList.remove('active');
    }
});

// Color change handlers
primaryColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
    saveThemeToStorage();
});

secondaryColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--secondary-color', e.target.value);
    updateGradients();
    saveThemeToStorage();
});

accentColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent-color', e.target.value);
    updateGradients();
    saveThemeToStorage();
});

// Update gradient variables
function updateGradients() {
    const primary = primaryColorInput.value;
    const secondary = secondaryColorInput.value;
    const accent = accentColorInput.value;
    
    document.documentElement.style.setProperty('--gradient-primary', 
        `linear-gradient(135deg, ${primary}, ${secondary})`);
    document.documentElement.style.setProperty('--gradient-secondary', 
        `linear-gradient(135deg, ${secondary}, ${accent})`);
    document.documentElement.style.setProperty('--shadow-glow', 
        `0 0 20px ${primary}30`);
}

// Save theme to localStorage
function saveThemeToStorage() {
    const theme = {
        primary: primaryColorInput.value,
        secondary: secondaryColorInput.value,
        accent: accentColorInput.value
    };
    localStorage.setItem('streamer-theme', JSON.stringify(theme));
}

// Load theme from localStorage
function loadThemeFromStorage() {
    const savedTheme = localStorage.getItem('streamer-theme');
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        primaryColorInput.value = theme.primary;
        secondaryColorInput.value = theme.secondary;
        accentColorInput.value = theme.accent;
        
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        updateGradients();
    }
}

// Reset theme to default
resetThemeBtn.addEventListener('click', () => {
    primaryColorInput.value = '#ff6b9d';
    secondaryColorInput.value = '#a855f7';
    accentColorInput.value = '#06d6a0';
    
    document.documentElement.style.setProperty('--primary-color', '#ff6b9d');
    document.documentElement.style.setProperty('--secondary-color', '#a855f7');
    document.documentElement.style.setProperty('--accent-color', '#06d6a0');
    updateGradients();
    
    localStorage.removeItem('streamer-theme');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

// Gallery item click handler (for future image modal implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Future: Open image in modal
        console.log('Gallery item clicked - implement modal here');
    });
});

// Stream status checker (mock implementation)
function updateStreamStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = statusIndicator.nextElementSibling;
    
    // Mock API call - replace with actual Twitch API
    // This is just for demonstration
    const isLive = Math.random() > 0.7; // 30% chance of being "live"
    
    if (isLive) {
        statusIndicator.classList.remove('offline');
        statusIndicator.classList.add('live');
        statusText.textContent = 'Currently Live!';
    } else {
        statusIndicator.classList.remove('live');
        statusIndicator.classList.add('offline');
        statusText.textContent = 'Currently Offline';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.stat-item, .gallery-item, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic Twitch Embed Parent Parameter Handler
function updateTwitchEmbeds() {
    // Get current hostname
    const hostname = window.location.hostname;
    let parentDomain = hostname;
    
    // Handle different local development scenarios
    if (hostname === '127.0.0.1' || hostname === 'localhost' || hostname.startsWith('192.168.')) {
        parentDomain = hostname;
    }
    // Handle file:// protocol (though Twitch embeds won't work with file://)
    else if (window.location.protocol === 'file:') {
        parentDomain = 'localhost'; // Fallback, but won't work
        console.warn('Twitch embeds require a web server. Please use http://localhost or similar.');
    }
    
    console.log('Setting Twitch embed parent to:', parentDomain);
    
    // Update all Twitch stream embeds
    const streamEmbeds = document.querySelectorAll('.stream-embed iframe[src*="player.twitch.tv"]');
    streamEmbeds.forEach(iframe => {
        const currentSrc = iframe.src;
        const url = new URL(currentSrc);
        
        // Remove existing parent parameters
        url.searchParams.delete('parent');
        
        // Add current domain as parent
        url.searchParams.set('parent', parentDomain);
        
        iframe.src = url.toString();
    });
    
    // Update all Twitch clip embeds
    const clipEmbeds = document.querySelectorAll('.clip-item iframe[src*="clips.twitch.tv"]');
    clipEmbeds.forEach(iframe => {
        const currentSrc = iframe.src;
        const url = new URL(currentSrc);
        
        // Remove existing parent parameters
        url.searchParams.delete('parent');
        
        // Add current domain as parent
        url.searchParams.set('parent', parentDomain);
        
        iframe.src = url.toString();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadThemeFromStorage();
    updateStreamStatus();
    updateTwitchEmbeds(); // Set correct parent parameters
    
    // Update stream status every 5 minutes
    setInterval(updateStreamStatus, 300000);
});

// Particle effect for hero section (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Admin System
class AdminSystem {
    constructor() {
        this.isLoggedIn = false;
        this.clips = this.loadClips();
        this.siteData = this.loadSiteData();
        
        // Only load default clips if this is the very first visit (no saved data at all)
        if (this.clips.length === 0 && !localStorage.getItem('streamer-clips')) {
            this.loadDefaultClips();
        }
        
        // Load default site data if none exists
        if (!localStorage.getItem('site-data')) {
            this.loadDefaultSiteData();
        }
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderClips();
        this.renderSiteContent();
    }

    bindEvents() {
        // Admin link click
        document.getElementById('admin-link').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.isLoggedIn) {
                this.showAdminPanel();
            } else {
                this.showLoginModal();
            }
        });

        // Login modal events
        document.getElementById('admin-modal-close').addEventListener('click', () => {
            this.hideLoginModal();
        });

        document.getElementById('admin-modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideLoginModal();
            }
        });

        // Login form
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Admin panel events
        document.getElementById('admin-panel-close').addEventListener('click', () => {
            this.hideAdminPanel();
        });

        document.getElementById('admin-logout').addEventListener('click', () => {
            this.logout();
        });

        // Add clip form
        document.getElementById('add-clip-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addClip();
        });

        // Admin tab navigation
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Site content forms
        document.getElementById('site-info-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSiteInfo();
        });

        document.getElementById('hero-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveHeroSection();
        });

        document.getElementById('about-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAboutSection();
        });

        document.getElementById('schedule-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSchedule();
        });

        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContactInfo();
        });

        // Schedule management
        document.getElementById('add-schedule-item').addEventListener('click', () => {
            this.addScheduleItem();
        });
    }

    showLoginModal() {
        document.getElementById('admin-modal-overlay').classList.add('active');
    }

    hideLoginModal() {
        document.getElementById('admin-modal-overlay').classList.remove('active');
        document.getElementById('admin-login-form').reset();
    }

    showAdminPanel() {
        document.getElementById('admin-panel').classList.add('active');
        this.renderAdminClips();
        this.populateAdminForms();
        this.renderScheduleItems();
    }

    hideAdminPanel() {
        document.getElementById('admin-panel').classList.remove('active');
    }

    handleLogin() {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        // Simple authentication (in production, use proper authentication)
        if (username === 'admin' && password === 'admin123') {
            this.isLoggedIn = true;
            this.hideLoginModal();
            this.showAdminPanel();
            this.showMessage('Login successful!', 'success');
        } else {
            this.showMessage('Invalid credentials!', 'error');
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.hideAdminPanel();
        this.showMessage('Logged out successfully!', 'success');
    }

    extractClipId(url) {
        // Extract clip ID from various Twitch clip URL formats
        const patterns = [
            /clips\.twitch\.tv\/([A-Za-z0-9_-]+)/,
            /clips\.twitch\.tv\/embed\?clip=([A-Za-z0-9_-]+)/,
            /twitch\.tv\/\w+\/clip\/([A-Za-z0-9_-]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    addClip() {
        const url = document.getElementById('clip-url').value;
        const title = document.getElementById('clip-title').value;
        const description = document.getElementById('clip-description').value;

        const clipId = this.extractClipId(url);
        if (!clipId) {
            this.showMessage('Invalid Twitch clip URL! Please check the URL format.', 'error');
            return;
        }

        const newClip = {
            id: Date.now().toString(),
            clipId: clipId,
            title: title,
            description: description,
            url: url,
            embedUrl: `https://clips.twitch.tv/embed?clip=${clipId}&parent=${window.location.hostname}`
        };

        this.clips.push(newClip);
        this.saveClips();
        this.renderClips();
        this.renderAdminClips();
        
        // Reset form
        document.getElementById('add-clip-form').reset();
        this.showMessage('Clip added successfully!', 'success');
    }

    editClip(clipId) {
        const clip = this.clips.find(c => c.id === clipId);
        if (!clip) return;

        // Show edit form
        const editForm = document.querySelector(`[data-clip-id="${clipId}"] .edit-form`);
        editForm.classList.add('active');

        // Populate form
        editForm.querySelector('.edit-title').value = clip.title;
        editForm.querySelector('.edit-description').value = clip.description;
        editForm.querySelector('.edit-url').value = clip.url;
    }

    saveEdit(clipId) {
        const editForm = document.querySelector(`[data-clip-id="${clipId}"] .edit-form`);
        const title = editForm.querySelector('.edit-title').value;
        const description = editForm.querySelector('.edit-description').value;
        const url = editForm.querySelector('.edit-url').value;

        const newClipId = this.extractClipId(url);
        if (!newClipId) {
            this.showMessage('Invalid Twitch clip URL!', 'error');
            return;
        }

        const clipIndex = this.clips.findIndex(c => c.id === clipId);
        if (clipIndex !== -1) {
            this.clips[clipIndex] = {
                ...this.clips[clipIndex],
                clipId: newClipId,
                title: title,
                description: description,
                url: url,
                embedUrl: `https://clips.twitch.tv/embed?clip=${newClipId}&parent=${window.location.hostname}`
            };

            this.saveClips();
            this.renderClips();
            this.renderAdminClips();
            this.showMessage('Clip updated successfully!', 'success');
        }
    }

    cancelEdit(clipId) {
        const editForm = document.querySelector(`[data-clip-id="${clipId}"] .edit-form`);
        editForm.classList.remove('active');
    }

    deleteClip(clipId) {
        console.log('Delete clip called for ID:', clipId);
        if (confirm('Are you sure you want to delete this clip?')) {
            console.log('User confirmed deletion');
            const beforeCount = this.clips.length;
            this.clips = this.clips.filter(c => c.id !== clipId);
            const afterCount = this.clips.length;
            console.log(`Clips count: ${beforeCount} -> ${afterCount}`);
            
            this.saveClips();
            this.renderClips();
            this.renderAdminClips();
            this.showMessage('Clip deleted successfully!', 'success');
            console.log('Delete operation completed');
        } else {
            console.log('User cancelled deletion');
        }
    }

    renderClips() {
        const clipsGrid = document.querySelector('.clips-grid');
        if (!clipsGrid) return;

        // If no clips, show empty state message
        if (this.clips.length === 0) {
            clipsGrid.innerHTML = `
                <div class="no-clips-message">
                    <div class="empty-state">
                        <i class="fas fa-video" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--text-primary); margin-bottom: 1rem;">No Clips Available</h3>
                        <p style="color: var(--text-secondary); text-align: center;">
                            No clips have been added yet. Use the admin panel to add your first clip!
                        </p>
                    </div>
                </div>
            `;
            return;
        }

        clipsGrid.innerHTML = this.clips.map(clip => `
            <div class="clip-item">
                <iframe
                    src="${clip.embedUrl}"
                    height="360"
                    width="640"
                    allowfullscreen
                    title="Twitch Clip - ${clip.title}">
                </iframe>
                <div class="clip-info">
                    <h3>${clip.title}</h3>
                    <p>${clip.description}</p>
                </div>
            </div>
        `).join('');

        // Update Twitch embeds with correct parent parameter
        this.updateClipEmbeds();
    }

    renderAdminClips() {
        const clipsList = document.getElementById('admin-clips-list');
        if (!clipsList) return;

        if (this.clips.length === 0) {
            clipsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No clips added yet. Add your first clip above!</p>';
            return;
        }

        clipsList.innerHTML = this.clips.map(clip => `
            <div class="clip-admin-item" data-clip-id="${clip.id}">
                <div class="clip-admin-info">
                    <h4>${clip.title}</h4>
                    <p>${clip.description}</p>
                    <div class="clip-url">${clip.url}</div>
                </div>
                <div class="clip-admin-actions">
                    <button class="btn btn-edit btn-small" onclick="adminSystem.editClip('${clip.id}')">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="adminSystem.deleteClip('${clip.id}')">Delete</button>
                </div>
                <div class="edit-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Clip URL:</label>
                            <input type="url" class="edit-url" value="${clip.url}" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Title:</label>
                            <input type="text" class="edit-title" value="${clip.title}" required>
                        </div>
                        <div class="form-group">
                            <label>Description:</label>
                            <input type="text" class="edit-description" value="${clip.description}">
                        </div>
                    </div>
                    <div class="edit-form-actions">
                        <button class="btn btn-primary btn-small" onclick="adminSystem.saveEdit('${clip.id}')">Save</button>
                        <button class="btn btn-secondary btn-small" onclick="adminSystem.cancelEdit('${clip.id}')">Cancel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateClipEmbeds() {
        // Update clip embeds with correct parent parameter
        const hostname = window.location.hostname;
        const clipEmbeds = document.querySelectorAll('.clip-item iframe[src*="clips.twitch.tv"]');
        
        clipEmbeds.forEach(iframe => {
            const currentSrc = iframe.src;
            const url = new URL(currentSrc);
            url.searchParams.delete('parent');
            url.searchParams.set('parent', hostname);
            iframe.src = url.toString();
        });
    }

    loadDefaultClips() {
        // Load default clips if none exist
        this.clips = [
            {
                id: '1',
                clipId: 'AwkwardHelplessSalamanderSwiftRage',
                title: 'Amazing Skill Level',
                description: 'Watch this epic gameplay moment!',
                url: 'https://clips.twitch.tv/AwkwardHelplessSalamanderSwiftRage',
                embedUrl: `https://clips.twitch.tv/embed?clip=AwkwardHelplessSalamanderSwiftRage&parent=${window.location.hostname}`
            },
            {
                id: '2',
                clipId: 'BetterNaiveMarrowWow',
                title: 'Epic Moment',
                description: 'Check out this incredible play!',
                url: 'https://clips.twitch.tv/BetterNaiveMarrowWow',
                embedUrl: `https://clips.twitch.tv/embed?clip=BetterNaiveMarrowWow&parent=${window.location.hostname}`
            },
            {
                id: '3',
                clipId: 'TameIntelligentSamosaArgieB8',
                title: 'Funny Fail',
                description: 'Hilarious moments from stream!',
                url: 'https://clips.twitch.tv/TameIntelligentSamosaArgieB8',
                embedUrl: `https://clips.twitch.tv/embed?clip=TameIntelligentSamosaArgieB8&parent=${window.location.hostname}`
            },
            {
                id: '4',
                clipId: 'BoredHelplessBorkTwitchRaid',
                title: 'Best Play',
                description: 'Watch the most amazing plays!',
                url: 'https://clips.twitch.tv/BoredHelplessBorkTwitchRaid',
                embedUrl: `https://clips.twitch.tv/embed?clip=BoredHelplessBorkTwitchRaid&parent=${window.location.hostname}`
            }
        ];
        this.saveClips();
    }

    loadClips() {
        const saved = localStorage.getItem('streamer-clips');
        return saved ? JSON.parse(saved) : [];
    }

    saveClips() {
        localStorage.setItem('streamer-clips', JSON.stringify(this.clips));
    }

    // Tab Management
    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Site Data Management
    loadSiteData() {
        const saved = localStorage.getItem('site-data');
        return saved ? JSON.parse(saved) : {};
    }

    saveSiteData() {
        localStorage.setItem('site-data', JSON.stringify(this.siteData));
    }

    loadDefaultSiteData() {
        this.siteData = {
            siteInfo: {
                title: 'StreamerName - Egirl Streamer',
                description: 'Welcome to StreamerName\'s official website - Gaming, streaming, and vibes!',
                streamerName: 'StreamerName',
                twitchChannel: 'kvrtez'
            },
            hero: {
                greeting: 'Hey Gamers!',
                name: 'I\'m StreamerName',
                subtitle: 'Your favorite egirl streamer bringing you the best gaming content, cozy vibes, and epic moments!',
                button1Text: 'Watch Live',
                button1Url: 'https://twitch.tv/kvrtez',
                button2Text: 'Get to Know Me',
                imageUrl: ''
            },
            about: {
                title: 'Welcome to my world! 💜',
                bio: 'I\'m a passionate gamer and content creator who loves connecting with amazing people like you! When I\'m not streaming, you can find me exploring new games, creating content, or just vibing with my community.',
                stats: {
                    followers: '500K+',
                    views: '2M+',
                    years: '3+'
                },
                social: {
                    twitch: 'https://twitch.tv/kvrtez',
                    twitter: 'https://twitter.com/username',
                    instagram: 'https://instagram.com/username',
                    discord: 'https://discord.gg/server',
                    youtube: 'https://youtube.com/@username',
                    tiktok: 'https://tiktok.com/@username'
                }
            },
            schedule: [
                { day: 'Monday', time: '7:00 PM - 11:00 PM EST' },
                { day: 'Wednesday', time: '7:00 PM - 11:00 PM EST' },
                { day: 'Friday', time: '8:00 PM - 12:00 AM EST' },
                { day: 'Saturday', time: '2:00 PM - 6:00 PM EST' }
            ],
            contact: {
                title: 'Let\'s Connect!',
                subtitle: 'Get in Touch',
                description: 'Want to collaborate, have business inquiries, or just want to say hi? I\'d love to hear from you!',
                email: 'business@streamername.com',
                discordText: 'Join my Discord Server'
            }
        };
        this.saveSiteData();
    }

    // Form Population
    populateAdminForms() {
        // Site Info
        document.getElementById('site-title').value = this.siteData.siteInfo?.title || '';
        document.getElementById('site-description').value = this.siteData.siteInfo?.description || '';
        document.getElementById('streamer-name').value = this.siteData.siteInfo?.streamerName || '';
        document.getElementById('twitch-channel').value = this.siteData.siteInfo?.twitchChannel || '';

        // Hero Section
        document.getElementById('hero-greeting').value = this.siteData.hero?.greeting || '';
        document.getElementById('hero-name').value = this.siteData.hero?.name || '';
        document.getElementById('hero-subtitle').value = this.siteData.hero?.subtitle || '';
        document.getElementById('hero-button1-text').value = this.siteData.hero?.button1Text || '';
        document.getElementById('hero-button1-url').value = this.siteData.hero?.button1Url || '';
        document.getElementById('hero-button2-text').value = this.siteData.hero?.button2Text || '';
        document.getElementById('hero-image-url').value = this.siteData.hero?.imageUrl || '';

        // About Section
        document.getElementById('about-title').value = this.siteData.about?.title || '';
        document.getElementById('about-bio').value = this.siteData.about?.bio || '';
        document.getElementById('stat-followers').value = this.siteData.about?.stats?.followers || '';
        document.getElementById('stat-views').value = this.siteData.about?.stats?.views || '';
        document.getElementById('stat-years').value = this.siteData.about?.stats?.years || '';
        document.getElementById('social-twitch').value = this.siteData.about?.social?.twitch || '';
        document.getElementById('social-twitter').value = this.siteData.about?.social?.twitter || '';
        document.getElementById('social-instagram').value = this.siteData.about?.social?.instagram || '';
        document.getElementById('social-discord').value = this.siteData.about?.social?.discord || '';
        document.getElementById('social-youtube').value = this.siteData.about?.social?.youtube || '';
        document.getElementById('social-tiktok').value = this.siteData.about?.social?.tiktok || '';

        // Contact
        document.getElementById('contact-title').value = this.siteData.contact?.title || '';
        document.getElementById('contact-subtitle').value = this.siteData.contact?.subtitle || '';
        document.getElementById('contact-description').value = this.siteData.contact?.description || '';
        document.getElementById('contact-email').value = this.siteData.contact?.email || '';
        document.getElementById('contact-discord-text').value = this.siteData.contact?.discordText || '';
    }

    // Save Methods
    saveSiteInfo() {
        this.siteData.siteInfo = {
            title: document.getElementById('site-title').value,
            description: document.getElementById('site-description').value,
            streamerName: document.getElementById('streamer-name').value,
            twitchChannel: document.getElementById('twitch-channel').value
        };
        this.saveSiteData();
        this.renderSiteContent();
        this.showMessage('Site information saved successfully!', 'success');
    }

    saveHeroSection() {
        this.siteData.hero = {
            greeting: document.getElementById('hero-greeting').value,
            name: document.getElementById('hero-name').value,
            subtitle: document.getElementById('hero-subtitle').value,
            button1Text: document.getElementById('hero-button1-text').value,
            button1Url: document.getElementById('hero-button1-url').value,
            button2Text: document.getElementById('hero-button2-text').value,
            imageUrl: document.getElementById('hero-image-url').value
        };
        this.saveSiteData();
        this.renderSiteContent();
        this.showMessage('Hero section saved successfully!', 'success');
    }

    saveAboutSection() {
        this.siteData.about = {
            title: document.getElementById('about-title').value,
            bio: document.getElementById('about-bio').value,
            stats: {
                followers: document.getElementById('stat-followers').value,
                views: document.getElementById('stat-views').value,
                years: document.getElementById('stat-years').value
            },
            social: {
                twitch: document.getElementById('social-twitch').value,
                twitter: document.getElementById('social-twitter').value,
                instagram: document.getElementById('social-instagram').value,
                discord: document.getElementById('social-discord').value,
                youtube: document.getElementById('social-youtube').value,
                tiktok: document.getElementById('social-tiktok').value
            }
        };
        this.saveSiteData();
        this.renderSiteContent();
        this.showMessage('About section saved successfully!', 'success');
    }

    saveContactInfo() {
        this.siteData.contact = {
            title: document.getElementById('contact-title').value,
            subtitle: document.getElementById('contact-subtitle').value,
            description: document.getElementById('contact-description').value,
            email: document.getElementById('contact-email').value,
            discordText: document.getElementById('contact-discord-text').value
        };
        this.saveSiteData();
        this.renderSiteContent();
        this.showMessage('Contact information saved successfully!', 'success');
    }

    // Schedule Management
    renderScheduleItems() {
        const container = document.getElementById('schedule-items');
        if (!this.siteData.schedule) this.siteData.schedule = [];

        container.innerHTML = this.siteData.schedule.map((item, index) => `
            <div class="schedule-item-form">
                <button type="button" class="remove-schedule" onclick="adminSystem.removeScheduleItem(${index})">&times;</button>
                <div class="form-row">
                    <div class="form-group">
                        <label>Day:</label>
                        <input type="text" class="schedule-day" value="${item.day}" placeholder="Monday">
                    </div>
                    <div class="form-group">
                        <label>Time:</label>
                        <input type="text" class="schedule-time" value="${item.time}" placeholder="7:00 PM - 11:00 PM EST">
                    </div>
                </div>
            </div>
        `).join('');
    }

    addScheduleItem() {
        if (!this.siteData.schedule) this.siteData.schedule = [];
        this.siteData.schedule.push({ day: '', time: '' });
        this.renderScheduleItems();
    }

    removeScheduleItem(index) {
        this.siteData.schedule.splice(index, 1);
        this.renderScheduleItems();
    }

    saveSchedule() {
        const scheduleItems = document.querySelectorAll('.schedule-item-form');
        this.siteData.schedule = Array.from(scheduleItems).map(item => ({
            day: item.querySelector('.schedule-day').value,
            time: item.querySelector('.schedule-time').value
        })).filter(item => item.day && item.time);

        this.saveSiteData();
        this.renderSiteContent();
        this.showMessage('Schedule saved successfully!', 'success');
    }

    // Site Content Rendering
    renderSiteContent() {
        this.updatePageTitle();
        this.updateHeroSection();
        this.updateAboutSection();
        this.updateScheduleSection();
        this.updateContactSection();
        this.updateNavigation();
        this.updateStreamEmbed();
    }

    updatePageTitle() {
        if (this.siteData.siteInfo?.title) {
            document.title = this.siteData.siteInfo.title;
            document.querySelector('meta[name="description"]').content = this.siteData.siteInfo.description;
        }
    }

    updateNavigation() {
        if (this.siteData.siteInfo?.streamerName) {
            document.querySelector('.nav-logo h2').textContent = this.siteData.siteInfo.streamerName;
            document.querySelectorAll('.footer-section h3').forEach(el => {
                if (el.textContent.includes('StreamerName')) {
                    el.textContent = this.siteData.siteInfo.streamerName;
                }
            });
        }
    }

    updateHeroSection() {
        const hero = this.siteData.hero;
        if (!hero) return;

        if (hero.greeting) {
            document.querySelector('.gradient-text').textContent = hero.greeting;
        }
        if (hero.name) {
            document.querySelector('.hero-title').innerHTML = `<span class="gradient-text">${hero.greeting || 'Hey Gamers!'}</span><br>${hero.name}`;
        }
        if (hero.subtitle) {
            document.querySelector('.hero-subtitle').textContent = hero.subtitle;
        }
        if (hero.button1Text && hero.button1Url) {
            const btn1 = document.querySelector('.hero-buttons .btn-primary');
            btn1.innerHTML = `<i class="fab fa-twitch"></i>${hero.button1Text}`;
            btn1.href = hero.button1Url;
        }
        if (hero.button2Text) {
            const btn2 = document.querySelector('.hero-buttons .btn-secondary');
            btn2.innerHTML = `<i class="fas fa-heart"></i>${hero.button2Text}`;
        }
        if (hero.imageUrl) {
            const imageContainer = document.querySelector('.hero-image');
            imageContainer.innerHTML = `<img src="${hero.imageUrl}" alt="Profile" style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover;">`;
        }
    }

    updateAboutSection() {
        const about = this.siteData.about;
        if (!about) return;

        if (about.title) {
            document.querySelector('.about-text h3').textContent = about.title;
        }
        if (about.bio) {
            document.querySelector('.about-text p').textContent = about.bio;
        }
        if (about.stats) {
            const statItems = document.querySelectorAll('.stat-item');
            if (statItems[0] && about.stats.followers) statItems[0].querySelector('h4').textContent = about.stats.followers;
            if (statItems[1] && about.stats.views) statItems[1].querySelector('h4').textContent = about.stats.views;
            if (statItems[2] && about.stats.years) statItems[2].querySelector('h4').textContent = about.stats.years;
        }
        if (about.social) {
            this.updateSocialLinks(about.social);
        }
    }

    updateSocialLinks(social) {
        const socialLinks = {
            '.social-link.twitch': social.twitch,
            '.social-link.twitter': social.twitter,
            '.social-link.instagram': social.instagram,
            '.social-link.discord': social.discord,
            '.social-link.youtube': social.youtube,
            '.social-link.tiktok': social.tiktok
        };

        Object.entries(socialLinks).forEach(([selector, url]) => {
            const links = document.querySelectorAll(selector);
            links.forEach(link => {
                if (url) {
                    link.href = url;
                    link.style.display = '';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    }

    updateScheduleSection() {
        if (!this.siteData.schedule) return;

        const scheduleContainer = document.querySelector('.schedule');
        scheduleContainer.innerHTML = this.siteData.schedule.map(item => `
            <div class="schedule-item">
                <span class="day">${item.day}</span>
                <span class="time">${item.time}</span>
            </div>
        `).join('');
    }

    updateContactSection() {
        const contact = this.siteData.contact;
        if (!contact) return;

        if (contact.title) {
            document.querySelector('#contact .section-title').textContent = contact.title;
        }
        if (contact.subtitle) {
            document.querySelector('.contact-info h3').textContent = contact.subtitle;
        }
        if (contact.description) {
            document.querySelector('.contact-info p').textContent = contact.description;
        }
        if (contact.email) {
            document.querySelector('.contact-method span').textContent = contact.email;
        }
        if (contact.discordText) {
            const discordMethod = document.querySelectorAll('.contact-method')[1];
            if (discordMethod) discordMethod.querySelector('span').textContent = contact.discordText;
        }
    }

    updateStreamEmbed() {
        if (this.siteData.siteInfo?.twitchChannel) {
            const streamEmbed = document.querySelector('.stream-embed iframe');
            if (streamEmbed) {
                const currentSrc = streamEmbed.src;
                const url = new URL(currentSrc);
                url.searchParams.set('channel', this.siteData.siteInfo.twitchChannel);
                streamEmbed.src = url.toString();
            }

            // Update Twitch links
            document.querySelectorAll('a[href*="twitch.tv"]').forEach(link => {
                if (link.href.includes('twitch.tv/') && !link.href.includes('clips')) {
                    link.href = `https://twitch.tv/${this.siteData.siteInfo.twitchChannel}`;
                }
            });
        }
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert at the top of admin content or modal body
        const target = document.querySelector('.admin-content') || document.querySelector('.modal-body');
        if (target) {
            target.insertBefore(message, target.firstChild);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 5000);
        }
    }
}

// Initialize admin system
const adminSystem = new AdminSystem();
