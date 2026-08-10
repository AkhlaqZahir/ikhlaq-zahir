document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       GET ELEMENTS
       ========================================= */

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const navigationMenu =
        document.getElementById(
            "navigationMenu"
        );


    /* =========================================
       SAFETY CHECK
       ========================================= */

    if (
        !menuButton ||
        !navigationMenu
    ) {

        console.error(
            "Mobile navigation elements were not found."
        );

        return;

    }


    /* =========================================
       OPEN / CLOSE MOBILE MENU
       ========================================= */

    menuButton.addEventListener(
        "click",
        function () {


            const isOpen =
                navigationMenu.classList.toggle(
                    "mobile-open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        }
    );


    /* =========================================
       CLOSE MENU AFTER CLICKING LINK
       ========================================= */

    const navigationLinks =
        navigationMenu.querySelectorAll(
            "a"
        );


    navigationLinks.forEach(
        function (link) {


            link.addEventListener(
                "click",
                function () {


                    navigationMenu.classList.remove(
                        "mobile-open"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        }
    );


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================= */

    document.addEventListener(
        "click",
        function (event) {


            const clickedInsideMenu =
                navigationMenu.contains(
                    event.target
                );


            const clickedButton =
                menuButton.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {


                navigationMenu.classList.remove(
                    "mobile-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );



    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const revealTargets = document.querySelectorAll(
        ".reveal, .section-header, .research-card, " +
        ".skill-group, .education-item, .about-grid, " +
        ".contact-content"
    );

    revealTargets.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));


    /* =========================================
       BUTTON RIPPLE EFFECT
       ========================================= */

    document.querySelectorAll(".button").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement("span");
            const size = Math.max(rect.width, rect.height);

            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = e.clientX - rect.left - size / 2 + "px";
            ripple.style.top = e.clientY - rect.top - size / 2 + "px";

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });


    /* =========================================
       SCREENSHOT GALLERY MODAL
       ========================================= */

    const GALLERY_DATA = {
        wordle: { name: "Wordle World", count: 4 },
        numatrix: { name: "Numatrix", count: 4 },
        memword: { name: "MemWord", count: 4 },
        hsk: { name: "HSK Vocabulary", count: 4 },
    };

    const overlay = document.getElementById("galleryOverlay");
    const track = document.getElementById("galleryTrack");
    const titleEl = document.getElementById("galleryTitle");
    const counterEl = document.getElementById("galleryCounter");
    const closeBtn = document.getElementById("galleryClose");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");

    let currentSlide = 0;
    let currentCount = 0;

    function openGallery(projectKey) {
        const data = GALLERY_DATA[projectKey];
        if (!data) return;

        titleEl.textContent = data.name + " - Screenshots";
        currentCount = data.count;
        currentSlide = 0;

        track.innerHTML = "";
        for (let i = 1; i <= data.count; i++) {
            const slide = document.createElement("div");
            slide.className = "gallery-slide";

            const img = document.createElement("img");
            img.src = "assets/" + projectKey + "-" + i + ".jpg";
            img.alt = data.name + " screenshot " + i;
            img.loading = "lazy";

            // If the file isn't there yet, fall back to a labeled placeholder
            // instead of a broken image icon.
            img.onerror = function () {
                this.remove();
                slide.textContent = data.name + " - Screenshot " + i + " (missing)";
            };

            slide.appendChild(img);
            track.appendChild(slide);
        }

        updateGalleryPosition();
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
    }

    function closeGallery() {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
    }

    function updateGalleryPosition() {
        track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
        counterEl.textContent = (currentSlide + 1) + " / " + currentCount;
    }

    document.querySelectorAll("[data-gallery-trigger]").forEach((el) => {
        el.addEventListener("click", function () {
            const card = this.closest("[data-project]");
            if (card) openGallery(card.dataset.project);
        });
    });

    closeBtn.addEventListener("click", closeGallery);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeGallery();
    });

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + currentCount) % currentCount;
        updateGalleryPosition();
    });

    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % currentCount;
        updateGalleryPosition();
    });

    document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });


    /* =========================================
       HERO PARTICLE BACKGROUND
       ========================================= */

    const canvas = document.getElementById("heroParticles");

    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let width, height;

        function resize() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        }

        function initParticles() {
            const count = Math.min(60, Math.floor(width / 20));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.6,
            }));
        }

        function tick() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(124, 156, 255, 0.45)";
                ctx.fill();
            });

            requestAnimationFrame(tick);
        }

        resize();
        initParticles();
        tick();

        window.addEventListener("resize", () => {
            resize();
            initParticles();
        });
    }


/* =========================================
   SHRINKING NAVBAR ON SCROLL
   ========================================= */

const SCROLL_DOWN_THRESHOLD = 60;   // collapse past this
const SCROLL_UP_THRESHOLD   = 20;   // re-expand only near the very top
const NAV_LOCK_MS           = 500;  // ignore scroll events during the transition

let navTicking = false;
let navLocked  = false;

function updateNavbarState() {
    if (navLocked) {
        navTicking = false;
        return;
    }

    const isCompact = document.body.classList.contains("navbar-compact");
    const y = window.scrollY;

    if (!isCompact && y > SCROLL_DOWN_THRESHOLD) {
        document.body.classList.add("navbar-compact");
        navLocked = true;
        setTimeout(() => { navLocked = false; }, NAV_LOCK_MS);
    } else if (isCompact && y < SCROLL_UP_THRESHOLD) {
        document.body.classList.remove("navbar-compact");
        navLocked = true;
        setTimeout(() => { navLocked = false; }, NAV_LOCK_MS);
    }

    navTicking = false;
}

// Run once immediately so a mid-page reload starts in the right state
updateNavbarState();

window.addEventListener(
    "scroll",
    function () {
        if (!navTicking) {
            requestAnimationFrame(updateNavbarState);
            navTicking = true;
        }
    },
    { passive: true }
);

});
