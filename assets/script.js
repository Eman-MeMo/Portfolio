fetch('assets/data.json')
    .then(response => response.json())
    .then(data => {
        renderSkills(data.skills);
        renderInternships(data.internships);
        renderProjects(data.projects);
    });

function renderSkills(skills) {
    const container = document.querySelector('.skills-main');
    container.innerHTML = '';

    skills.forEach(skill => {
        container.innerHTML += `
        <div class="skills-bar">
            <div class="info">
            <p>${skill.name}</p>
            <p>${skill.value}</p>
            </div>
            <div class="bar">
                <span style="width: 0%" data-target="${skill.value}"></span>
            </div>
        </div>`;
    });

    animateBarsTogether();
}

function animateBarsTogether() {
    const spans = document.querySelectorAll('.skills-bar .bar span');

    spans.forEach(span => {
        const targetWidth = span.getAttribute('data-target');
        setTimeout(() => {
            span.style.width = targetWidth;
        }, 1000);
    });
}

function renderInternships(internships) {
    const container = document.querySelector('.internship-timeline');
    container.innerHTML = '';
    internships.forEach((item, index) => {
        const position = index % 2 === 0 ? 'internship-left' : 'internship-right';
        container.innerHTML += `
        <div class="internship-item ${position}">
            <div class="internship-date">${item.date}</div>
            <div class="internship-content">
            <h3>${item.title}</h3>
            <h4>${item.place}</h4>
            <p>${item.desc}</p>
            <a href="${item.link}" target="_blank">See The Certification <i class="fa-regular fa-file"></i></a>
            </div>
        </div>`;
    });
}

function renderProjects(projects) {
    const container = document.querySelector('#project-list');
    container.innerHTML = '';
    projects.forEach(project => {
        container.innerHTML += `
        <div class="project" data-category="${project.category.toLowerCase()}">
            <img src="${project.image}" alt="${project.name}">
            <h3><a href="${project.github}" target="_blank">${project.name}</a></h3>
            <p>${project.desc}</p>
            <p><strong>Technologies <br></strong> ${project.tech}</p>
            <div class="links">
            <a href="${project.demo}" target="_blank">Demo</a>
            </div>
        </div>`;
    });
    enableProjectFiltering();
}

var typed = new Typed(".typing", {
    strings: [
        "",
        "Full Stack Developer",
        "Front-End Developer",
        "Back-End Developer",
        "Web Developer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
});

function enableProjectFiltering() {
    const filterButtons = document.querySelectorAll(".filter button");
    const projectItems = document.querySelectorAll(".project");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.id.toLowerCase();

            projectItems.forEach(project => {
                const projectCategory = project.getAttribute("data-category");

                if (category === "all" || projectCategory === category) {
                    project.style.display = "block";
                }
                else {
                    project.style.display = "none";
                }
            });
        });
    });
}
