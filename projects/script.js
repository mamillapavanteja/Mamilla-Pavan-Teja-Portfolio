$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        if (window.scrollY > 60) $('#scroll-top').addClass('active');
        else $('#scroll-top').removeClass('active');
    });

    getProjects().then(showProjects).catch(error => {
        console.error(error);
        $(".work .box-container").html("<p style='font-size:1.6rem;color:#fff;'>Projects could not be loaded.</p>");
    });
});

function getProjects() {
    return fetch("./projects.json").then(response => {
        if (!response.ok) throw new Error("Unable to load projects.json");
        return response.json();
    });
}

function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    projectsContainer.innerHTML = projects.map(project => `
        <div class="grid-item ${project.category}">
            <div class="box tilt">
                <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="${project.name}">
                <div class="content">
                    <div class="tag"><h3>${project.name}</h3></div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            ${project.links.view !== "#" ? `<a href="${project.links.view}" class="btn" target="_blank" rel="noopener"><i class="fas fa-eye"></i> View</a>` : ""}
                            ${project.links.code !== "#" ? `<a href="${project.links.code}" class="btn" target="_blank" rel="noopener">Code <i class="fas fa-code"></i></a>` : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }

    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal().reveal('.work .box', { interval: 150 });
    }

    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        $grid.isotope({ filter: $(this).attr('data-filter') });
    });
}
