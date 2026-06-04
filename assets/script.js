// ============================================================
//  EMAN RAMADAN PORTFOLIO — script.js
// ============================================================

// ---- Dark Mode ----
(function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
})();

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

// ---- Hamburger Menu ----
(function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu   = document.querySelector('nav ul');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.classList.toggle('active');
    });
    menu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            menu.classList.remove('open');
            toggle.classList.remove('active');
        }
    });
})();

// ---- Scroll Reveal ----
function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // stagger siblings
                const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                siblings.forEach((el, idx) => {
                    if (el === entry.target) {
                        setTimeout(() => el.classList.add('visible'), idx * 80);
                    }
                });
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- Load & Render ----
fetch('assets/data.json')
    .then(r => r.json())
    .then(data => {
        renderNav(data.profile);
        renderHome(data.profile);
        renderAbout(data.profile, data.about);
        renderSkills(data.skillGroups);
        renderExperience(data.experience);
        renderInternships(data.internships);
        renderProjects(data.projects);
        renderContact(data.contact);
        renderFooter(data.profile);
        initTyped(data.profile.typingTitles);
        initReveal();
        initScrollSpy();
    });

// ---- NAV ----
function renderNav(profile) {
    document.title = `${profile.name} | Portfolio`;
    const links = [
        { href: '#home',        label: 'Home' },
        { href: '#about',       label: 'About' },
        { href: '#skills',      label: 'Skills' },
        { href: '#experience',  label: 'Experience' },
        { href: '#internships', label: 'Internships' },
        { href: '#projects',    label: 'Projects' },
        { href: '#contact',     label: 'Contact' },
    ];
    document.getElementById('nav-links').innerHTML = links.map(l =>
        `<li><a href="${l.href}">${l.label}</a></li>`
    ).join('');
}

// ---- HOME ----
const SOCIAL_ICONS = {
    linkedin: 'fa-brands fa-linkedin',
    github:   'fa-brands fa-github',
    email:    'fa-regular fa-envelope',
    facebook: 'fa-brands fa-facebook',
};

function renderHome(profile) {
    const socialLinks = Object.entries(profile.social).map(([k, v]) => {
        const href = k === 'email' ? `mailto:${v}` : v;
        return `<a href="${href}" target="_blank"><i class="${SOCIAL_ICONS[k]} fa-2x"></i></a>`;
    }).join('');

    document.getElementById('home-info').innerHTML = `
        <span class="tagline">${profile.tagline}</span>
        <h2>Hello, I'm <span class="name">${profile.name}</span></h2>
        <h2>I'm a <span class="typing"></span></h2>
        <p>${profile.bio}</p>
        <div class="icons">${socialLinks}</div>
        <a href="${profile.resume}" target="_blank" class="resume">Resume</a>
        <a href="#contact" class="contactME">Hire Me</a>
    `;

    const photo = document.getElementById('profile-photo');
    photo.src = profile.photo;
    photo.alt = profile.name;

    const imgWrap = document.getElementById('home-img');
    profile.stats.forEach(s => {
        const box = document.createElement('div');
        box.className = `boxInfo ${s.boxClass}`;
        box.innerHTML = `<i class="fa-solid ${s.icon}"></i>${s.label}`;
        imgWrap.appendChild(box);
    });
}

// ---- TYPED ----
var typedInstance = null;
function initTyped(strings) {
    if (typedInstance) typedInstance.destroy();
    typedInstance = new Typed('.typing', { strings, typeSpeed: 100, backSpeed: 60, loop: true });
}

// ---- ABOUT ----
function renderAbout(profile, about) {
    const highlights = about.highlights.map(h => `
        <div class="highlight-item">
            <i class="fa-solid ${h.icon}"></i>
            <span>${h.label}</span>
        </div>`
    ).join('');

    document.getElementById('about-content').innerHTML = `
        <div class="about-photo-wrap">
            <img src="${profile.photo}" alt="${profile.name}">
        </div>
        <div class="about-text">
            <h3>Who am <span>I?</span></h3>
            <p>${about.summary}</p>
            <div class="about-highlights">${highlights}</div>
        </div>
    `;
}

// ---- SKILLS (grouped tags) ----
function renderSkills(skillGroups) {
    document.getElementById('skills-groups').innerHTML = skillGroups.map(g => `
        <div class="skill-group">
            <div class="skill-group-title">
                <i class="fa-solid ${g.icon}"></i>
                ${g.group}
            </div>
            <div class="skill-tags">
                ${g.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
        </div>`
    ).join('');
}

// ---- EXPERIENCE ----
function renderExperience(experiences) {
    const container = document.querySelector('.experience-list');
    if (!container || !experiences?.length) return;
    container.innerHTML = experiences.map(exp => {
        const badge = exp.current
            ? `<div class="experience-badge"><span class="dot"></span>${exp.date}</div>`
            : `<div class="experience-badge experience-badge--past">${exp.date}</div>`;
        return `
        <div class="experience-card">
            <div class="experience-card-header">
                <div>
                    <h3 class="experience-job-title">${exp.title}</h3>
                    <p class="experience-company">${exp.company}</p>
                </div>
                ${badge}
            </div>
            <ul class="experience-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <div class="experience-tech-tags">
                ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>`;
    }).join('');
}

// ---- INTERNSHIPS ----
function renderInternships(internships) {
    document.querySelector('.internship-timeline').innerHTML = internships.map((item, i) => `
        <div class="internship-item ${i % 2 === 0 ? 'internship-left' : 'internship-right'}">
            <div class="internship-date">${item.date}</div>
            <div class="internship-content">
                <h3>${item.title}</h3>
                <h4>${item.place}</h4>
                <p>${item.desc}</p>
                <a href="${item.link}" target="_blank">See The Certification <i class="fa-regular fa-file"></i></a>
            </div>
        </div>`
    ).join('');
}

// ---- PROJECTS ----
function renderProjects(projects) {
    // Featured strip
    const featured = projects.filter(p => p.featured);
    document.getElementById('featured-projects').innerHTML = featured.map(p => `
        <div class="project-featured">
            <div class="feat-badge">⭐ FEATURED</div>
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="feat-body">
                <h3><a href="${p.github}" target="_blank">${p.name}</a></h3>
                <p>${p.desc}</p>
                <p class="feat-tech"><strong>Tech:</strong> ${p.tech}</p>
                <div class="links">
                    ${p.demo ? `<a href="${p.demo}" target="_blank">▶ Demo</a>` : ''}
                    <a href="${p.github}" target="_blank">⌥ Source Code</a>
                </div>
            </div>
        </div>`
    ).join('');

    // All projects grid (exclude featured from initial render, still show all)
    const container = document.getElementById('project-list');
    const nonFeatured = projects.filter(p => !p.featured);
    container.innerHTML = nonFeatured.map(p => `
        <div class="project" data-category="${p.category.toLowerCase()}">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <h3><a href="${p.github}" target="_blank">${p.name}</a></h3>
            <p>${p.desc}</p>
            <p><strong>Tech</strong><br>${p.tech}</p>
            <div class="links">
                ${p.demo ? `<a href="${p.demo}" target="_blank">Demo</a>` : ''}
                <a href="${p.github}" target="_blank">Source Code</a>
            </div>
        </div>`
    ).join('');

    enableProjectFiltering(projects);
}

function enableProjectFiltering(allProjects) {
    const buttons   = document.querySelectorAll('.filter button');
    const featuredEl = document.getElementById('featured-projects');
    const gridEl     = document.getElementById('project-list');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.id.toLowerCase();

            if (cat === 'all') {
                // Show featured strip + non-featured grid
                featuredEl.style.display = '';
                const nonFeatured = allProjects.filter(p => !p.featured);
                gridEl.innerHTML = nonFeatured.map(p => projectCardHTML(p)).join('');
            } else {
                // Hide featured strip, show filtered grid of ALL projects
                featuredEl.style.display = 'none';
                const filtered = allProjects.filter(p => p.category.toLowerCase() === cat);
                gridEl.innerHTML = filtered.map(p => projectCardHTML(p)).join('');
            }

            // fade in
            gridEl.querySelectorAll('.project').forEach((el, i) => {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.transition = 'opacity 0.3s ease';
                    el.style.opacity = '1';
                }, i * 50);
            });
        });
    });
}

function projectCardHTML(p) {
    return `
    <div class="project" data-category="${p.category.toLowerCase()}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h3><a href="${p.github}" target="_blank">${p.name}</a></h3>
        <p>${p.desc}</p>
        <p><strong>Tech</strong><br>${p.tech}</p>
        <div class="links">
            ${p.demo ? `<a href="${p.demo}" target="_blank">Demo</a>` : ''}
            <a href="${p.github}" target="_blank">Source Code</a>
        </div>
    </div>`;
}

// ---- CONTACT ----
function renderContact(contact) {
    const items = [
        { icon: 'fa fa-envelope',       label: 'Email',      href: `mailto:${contact.email}`,  display: contact.email },
        { icon: 'fa fa-phone',          label: 'Call Me On', href: null,                        display: contact.phone },
        { icon: 'fa-brands fa-github',  label: 'GitHub',     href: contact.github,              display: 'github.com/Eman-MeMo' },
        { icon: 'fa-brands fa-linkedin',label: 'LinkedIn',   href: contact.linkedin,            display: 'linkedin.com/in/eman--ramadan/' },
    ];
    document.getElementById('contact-info').innerHTML = items.map(item => `
        <div class="contact-info-item">
            <div class="icon"><i class="${item.icon}"></i></div>
            <h4>${item.label}</h4>
            <p>${item.href ? `<a href="${item.href}" target="_blank">${item.display}</a>` : item.display}</p>
        </div>`
    ).join('');
}

// ---- FOOTER ----
function renderFooter(profile) {
    const { social, resume, name } = profile;
    const socialLinks = Object.entries(social).map(([k, v]) => {
        const href = k === 'email' ? `mailto:${v}` : v;
        return `<a href="${href}" target="_blank"><i class="${SOCIAL_ICONS[k]} fa-2x"></i></a>`;
    }).join('');

    document.getElementById('footer-content').innerHTML = `
        <div class="footerBox">
            <span>Projects</span>
            <p>Featured work including full-stack apps, design concepts, and scalable solutions.</p>
        </div>
        <div class="footerBox">
            <span>Services</span>
            <p>UI/UX design, frontend and backend development, branding, and consulting.</p>
        </div>
        <div class="footerBox">
            <span>Quick Links</span>
            <p>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
                <a href="${resume}" target="_blank">Resume</a>
            </p>
        </div>
        <div class="footerBox">
            <span>Follow Me</span>
            <div class="footerImg"><div class="icons">${socialLinks}</div></div>
        </div>`;

    document.getElementById('footer-copyright').innerHTML =
        `<p>&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>`;
}

// ---- SCROLL SPY ----
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links    = () => document.querySelectorAll('nav ul li a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links().forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}