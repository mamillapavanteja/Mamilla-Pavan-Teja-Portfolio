$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        $('section').each(function () {
            const height = $(this).outerHeight();
            const offset = $(this).offset().top - 200;
            const top = $(window).scrollTop();
            const id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`a[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target && target !== '#') {
            const element = $(target);
            if (element.length) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: element.offset().top }, 500, 'linear');
            }
        }
    });

    if (typeof emailjs !== 'undefined') {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        $("#contact-form").submit(function (event) {
            event.preventDefault();
            emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById("contact-form").reset();
                    alert("Form submitted successfully.");
                }, function (error) {
                    console.log('FAILED...', error);
                    alert("Form submission failed. Please email mamillapavanteja9182@gmail.com directly.");
                });
        });
    }

    fetchSkills();
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Mamilla Pavan Teja";
        $("#favicon").attr("href", "./assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "./assets/images/favhand.png");
    }
});

const typedElement = document.querySelector(".typing-text");
if (typedElement && typeof Typed !== "undefined") {
    new Typed(".typing-text", {
        strings: [
            "software development",
            "Java development",
            "Python programming",
            "SQL & database development",
            "web development",
            "IoT & embedded systems"
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 700
    });
}

async function fetchSkills() {
    try {
        const response = await fetch("./skills.json");
        if (!response.ok) throw new Error("Unable to load skills.json");
        const skills = await response.json();
        showSkills(skills);
    } catch (error) {
        console.error(error);
        const container = document.getElementById("skillsContainer");
        if (container) {
            container.innerHTML = '<p style="font-size:1.6rem;text-align:center;width:100%;">Skills could not be loaded. Please run the website using Live Server.</p>';
        }
    }
}

function showSkills(skills) {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}">
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
}

if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
}

if (typeof ScrollReveal !== "undefined") {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h2', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.skills .container .bar', { interval: 80 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.work .box', { interval: 200 });
    srtop.reveal('.cert-card', { interval: 100 });
    srtop.reveal('.experience .timeline .container', { interval: 300 });
    srtop.reveal('.contact .container', { delay: 300 });
}
